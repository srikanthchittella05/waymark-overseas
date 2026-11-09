"use server";

import "server-only";
import { z } from "zod";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseConfig } from "@/lib/supabase/config";
import { RECOVERY_COOKIE, sessionCookieOptions } from "@/lib/supabase/cookies";
import type { AuthActionState } from "./action-state";
import type { RecoveryProof } from "./validation";
import { AuthError, errorDetails, providerActionError } from "./errors";
import { assertSameOrigin } from "./origin";
import { afterLogin, safeNext } from "./redirects";
import { getViewerForClient, requireUser } from "./session";
import { assertAdmin, assertUser } from "./session-core";
import { factorSchema, forgotPasswordSchema, formValues, isRecoveryExchange, loginSchema, recoveryProofSchema, resetPasswordSchema, signupSchema, totpSchema } from "./validation";

async function actionConfig() {
  const config = getSupabaseConfig();
  if (!config) throw new AuthError(503, "unconfigured");
  assertSameOrigin((await headers()).get("origin"), config.siteUrl);
  return config;
}

function failure(error: unknown, fallback: "invalid_credentials" | "invalid_link" | "invalid_input" = "invalid_input"): AuthActionState {
  if (error instanceof z.ZodError) {
    const fields: Record<string, string> = {};
    for (const issue of error.issues) {
      const name = String(issue.path[0] ?? "form");
      fields[name] ??= issue.message;
    }
    return { status: "error", message: "Check the highlighted fields and try again.", fields };
  }
  return { status: "error", message: providerActionError(error, fallback).message };
}

export async function loginAction(_previous: AuthActionState, form: FormData): Promise<AuthActionState> {
  try {
    await actionConfig();
    const input = loginSchema.parse(formValues(form, ["email", "password"]));
    const client = await createSupabaseServerClient();
    const { error } = await client.auth.signInWithPassword(input);
    if (error) throw error;
    const user = await getViewerForClient(client);
    assertUser(user);
    return { status: "success", message: "Signed in. Opening your plan…", redirectTo: afterLogin(form.get("next"), user) };
  } catch (error) {
    return failure(error, "invalid_credentials");
  }
}

export async function signupAction(_previous: AuthActionState, form: FormData): Promise<AuthActionState> {
  try {
    const config = await actionConfig();
    const input = signupSchema.parse(formValues(form, ["displayName", "email", "password", "confirmPassword"]));
    const client = await createSupabaseServerClient();
    const next = safeNext(form.get("next"));
    const { data, error } = await client.auth.signUp({
      email: input.email, password: input.password,
      options: {
        data: { display_name: input.displayName },
        emailRedirectTo: `${config.siteUrl}/auth/callback?${new URLSearchParams({ next })}`,
      },
    });
    if (error && !["email_exists", "user_already_exists"].includes(errorDetails(error).code)) throw error;
    // Never treat disabled provider email-confirmation settings as verification.
    if (data.session) {
      const result = await client.auth.signOut({ scope: "local" });
      if (result.error) throw result.error;
    }
    return { status: "success", message: "If this address can be registered, a confirmation email will arrive. Check your inbox before signing in. Already registered? Use sign in or password reset." };
  } catch (error) {
    return failure(error);
  }
}

export async function forgotPasswordAction(_previous: AuthActionState, form: FormData): Promise<AuthActionState> {
  try {
    const config = await actionConfig();
    const { email } = forgotPasswordSchema.parse(formValues(form, ["email"]));
    const client = await createSupabaseServerClient();
    const { error } = await client.auth.resetPasswordForEmail(email, { redirectTo: `${config.siteUrl}/auth/recovery` });
    if (error) throw error;
    return { status: "success", message: "If an eligible account exists for this address, a password-reset email will arrive. Follow its link in this browser; check spam too." };
  } catch (error) {
    return failure(error);
  }
}

export async function startGoogleAction(_previous: AuthActionState, form: FormData): Promise<AuthActionState> {
  let destination: string;
  try {
    const config = await actionConfig();
    if (!config.googleEnabled) throw new AuthError(503, "unconfigured", "Google sign-in is not enabled yet. Use email sign-in when available.");
    const client = await createSupabaseServerClient();
    const next = safeNext(form.get("next"));
    const { data, error } = await client.auth.signInWithOAuth({
      provider: "google", options: { redirectTo: `${config.siteUrl}/auth/callback?${new URLSearchParams({ next })}`, skipBrowserRedirect: true },
    });
    if (error) throw error;
    const url = new URL(data.url ?? "");
    if (url.origin !== config.url || url.pathname !== "/auth/v1/authorize" || url.searchParams.get("provider") !== "google") throw new AuthError(503, "unavailable");
    destination = url.href;
  } catch (error) {
    return failure(error);
  }
  // Outside catch: Next redirects throw, and must not become a false form error.
  redirect(destination);
}

export async function startAppleAction(_previous: AuthActionState, form: FormData): Promise<AuthActionState> {
  let destination: string;
  try {
    const config = await actionConfig();
    if (!config.appleEnabled) throw new AuthError(503, "unconfigured", "Apple sign-in is not enabled yet. Use email sign-in when available.");
    const client = await createSupabaseServerClient();
    const next = safeNext(form.get("next"));
    const { data, error } = await client.auth.signInWithOAuth({
      provider: "apple", options: { redirectTo: `${config.siteUrl}/auth/callback?${new URLSearchParams({ next })}`, skipBrowserRedirect: true },
    });
    if (error) throw error;
    const url = new URL(data.url ?? "");
    if (url.origin !== config.url || url.pathname !== "/auth/v1/authorize" || url.searchParams.get("provider") !== "apple") throw new AuthError(503, "unavailable");
    destination = url.href;
  } catch (error) {
    return failure(error);
  }
  // Outside catch: Next redirects throw, and must not become a false form error.
  redirect(destination);
}

export async function resetPasswordAction(_previous: AuthActionState, form: FormData): Promise<AuthActionState> {
  try {
    const config = await actionConfig();
    const input = resetPasswordSchema.parse(formValues(form, ["password", "confirmPassword", "code"]));
    const store = await cookies();
    const raw = store.get(RECOVERY_COOKIE)?.value;
    // This cookie carries an UNVERIFIED provider proof, not recovery authority.
    store.set(RECOVERY_COOKIE, "", { ...sessionCookieOptions(config.siteUrl), maxAge: 0 });
    let proof: RecoveryProof;
    try {
      proof = recoveryProofSchema.parse(JSON.parse(raw ?? "null"));
    } catch {
      throw new AuthError(400, "invalid_link");
    }
    const client = await createSupabaseServerClient();
    if (proof.kind === "token_hash") {
      const { error } = await client.auth.verifyOtp({ token_hash: proof.value, type: "recovery" });
      if (error) throw providerActionError(error, "invalid_link");
    } else {
      const { data, error } = await client.auth.exchangeCodeForSession(proof.value, proof.flowId ? { flowId: proof.flowId } : undefined);
      if (error) throw providerActionError(error, "invalid_link");
      if (!isRecoveryExchange(data)) {
        const result = await client.auth.signOut({ scope: "local" });
        if (result.error) throw result.error;
        throw new AuthError(400, "invalid_link");
      }
    }
    let user = await getViewerForClient(client);
    assertUser(user);
    if (user.isAdmin && user.aal !== "aal2") {
      const factors = await client.auth.mfa.listFactors();
      if (factors.error) throw factors.error;
      const factor = factors.data.totp[0];
      if (!factor || !input.code) throw new AuthError(403, "mfa_required", "Administrator recovery also requires an authenticator code. Request a fresh reset link and include your code. If you have lost your authenticator, contact your operator.");
      const result = await client.auth.mfa.challengeAndVerify({ factorId: factor.id, code: input.code });
      if (result.error) throw result.error;
      user = await getViewerForClient(client);
      assertAdmin(user);
    }
    const update = await client.auth.updateUser({ password: input.password });
    if (update.error) throw update.error;
    const logout = await client.auth.signOut({ scope: "local" });
    if (logout.error) throw new AuthError(503, "unavailable", "Your password changed, but sign-out could not be confirmed. Use Sign out, then sign in with your new password.");
    return { status: "success", message: "Password updated. Sign in with your new password.", redirectTo: "/login?notice=password-updated" };
  } catch (error) {
    return failure(error, "invalid_link");
  }
}

async function adminMfaContext() {
  await actionConfig();
  const context = await requireUser({ writable: true });
  if (!context.user.isAdmin) throw new AuthError(403, "forbidden");
  const { data, error } = await context.client.auth.mfa.listFactors();
  if (error) throw error;
  return { ...context, factors: data, hasVerifiedFactor: data.all.some((factor) => factor.status === "verified") };
}

export async function enrollTotpAction(): Promise<AuthActionState> {
  try {
    const { client, user, factors, hasVerifiedFactor } = await adminMfaContext();
    if (hasVerifiedFactor && user.aal !== "aal2") throw new AuthError(403, "mfa_required");
    if (factors.all.some((factor) => factor.factor_type === "totp" && factor.status === "unverified")) {
      throw new AuthError(409, "invalid_input", "An unfinished authenticator setup already exists. Remove that unfinished setup below before creating a new QR code. Verified authenticators will not be removed.");
    }
    const { data, error } = await client.auth.mfa.enroll({ factorType: "totp", issuer: "Waymark", friendlyName: `Waymark ${new Date().toISOString()}` });
    if (error) throw error;
    if (!data.totp.qr_code.startsWith("data:image/svg+xml;utf-8,") || data.totp.qr_code.length > 100_000 || !data.totp.secret) throw new AuthError(503, "unavailable");
    return { status: "success", message: "Scan the QR code, then verify a code to finish setup. Leaving this page does not complete enrollment.", enrollment: { factorId: data.id, qrCode: data.totp.qr_code, secret: data.totp.secret } };
  } catch (error) {
    return failure(error);
  }
}

export async function verifyTotpAction(_previous: AuthActionState, form: FormData): Promise<AuthActionState> {
  try {
    const input = totpSchema.parse(formValues(form, ["factorId", "code"]));
    const { client, factors } = await adminMfaContext();
    if (!factors.all.some((factor) => factor.id === input.factorId && factor.factor_type === "totp")) throw new AuthError(403, "forbidden");
    const { error } = await client.auth.mfa.challengeAndVerify(input);
    if (error) throw error;
    const user = await getViewerForClient(client);
    assertAdmin(user);
    return { status: "success", message: "Authenticator verified. Opening administration…", redirectTo: safeNext(form.get("next"), "/admin") };
  } catch (error) {
    return failure(error);
  }
}

export async function discardEnrollmentAction(_previous: AuthActionState, form: FormData): Promise<AuthActionState> {
  try {
    const { factorId } = factorSchema.parse(formValues(form, ["factorId"]));
    const { client, user, factors, hasVerifiedFactor } = await adminMfaContext();
    if (hasVerifiedFactor && user.aal !== "aal2") throw new AuthError(403, "mfa_required");
    if (!factors.all.some((factor) => factor.id === factorId && factor.factor_type === "totp" && factor.status === "unverified")) throw new AuthError(403, "forbidden");
    const { error } = await client.auth.mfa.unenroll({ factorId });
    if (error) throw error;
    return { status: "success", message: "Unfinished setup removed. You can start again.", redirectTo: "/admin/security" };
  } catch (error) {
    return failure(error);
  }
}
