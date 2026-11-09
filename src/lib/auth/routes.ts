import "server-only";

import { NextResponse, type NextRequest } from "next/server";
import { AUTH_CACHE_HEADERS, RECOVERY_COOKIE } from "@/lib/supabase/cookies";
import type { RecoveryProof } from "./validation";
import { flowIdSchema, isRecoveryExchange, recoveryProofSchema, tokenSchema } from "./validation";
import { getSupabaseConfig } from "@/lib/supabase/config";
import { createSupabaseRouteClient } from "@/lib/supabase/route";
import { getViewerForClient } from "./session";
import { assertUser } from "./session-core";
import { afterLogin } from "./redirects";
import { AuthError, providerActionError } from "./errors";

export function authRedirect(request: NextRequest, path: string) {
  const origin = getSupabaseConfig()?.siteUrl ?? request.nextUrl.origin;
  const response = NextResponse.redirect(new URL(path, origin), 303);
  Object.entries(AUTH_CACHE_HEADERS).forEach(([name, value]) => response.headers.set(name, value));
  response.headers.set("Referrer-Policy", "no-referrer");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export function stageRecovery(request: NextRequest, proof: RecoveryProof) {
  const context = createSupabaseRouteClient(request);
  const checked = recoveryProofSchema.safeParse(proof);
  if (!checked.success) return context.respond(authRedirect(request, "/forgot-password?error=invalid_link"));
  context.bridge.setAll([{ name: RECOVERY_COOKIE, value: JSON.stringify(checked.data), options: { maxAge: 600 } }], {});
  return context.respond(authRedirect(request, "/reset-password"));
}

export async function completeCodeExchange(request: NextRequest) {
  if (!getSupabaseConfig()) return authRedirect(request, "/login?error=unconfigured");
  const context = createSupabaseRouteClient(request);
  try {
    const parsed = tokenSchema.safeParse(request.nextUrl.searchParams.get("code"));
    if (!parsed.success || request.nextUrl.searchParams.has("error")) return context.respond(authRedirect(request, "/login?error=invalid_link"));
    const flow = request.nextUrl.searchParams.get("sb_flow_id");
    const parsedFlow = flow === null ? undefined : flowIdSchema.safeParse(flow);
    if (parsedFlow && !parsedFlow.success) throw new AuthError(400, "invalid_link");
    const flowId = parsedFlow?.success ? parsedFlow.data : undefined;
    const { data, error } = await context.client.auth.exchangeCodeForSession(parsed.data, flowId ? { flowId } : undefined);
    if (error) throw providerActionError(error, "invalid_link");
    // Recovery proofs must be consumed by the password action, not a GET URL.
    if (isRecoveryExchange(data)) {
      context.bridge.clearAuth();
      return context.respond(authRedirect(request, "/forgot-password?error=invalid_link"));
    }
    const user = await getViewerForClient(context.client);
    assertUser(user);
    return context.respond(authRedirect(request, afterLogin(request.nextUrl.searchParams.get("next"), user)));
  } catch (error) {
    const safe = providerActionError(error, "invalid_link");
    context.bridge.clearAuth();
    return context.respond(authRedirect(request, `/login?${new URLSearchParams({ error: safe.code })}`));
  }
}
