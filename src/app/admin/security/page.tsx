import type { Metadata } from "next";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import AuthShell, { AuthSetupNotice, LogoutForm } from "@/components/auth/AuthShell";
import AuthForm from "@/components/auth/AuthForm";
import EnrollmentForm from "@/components/auth/EnrollmentForm";
import styles from "@/components/auth/auth.module.css";
import { getAuthContext, AuthError } from "@/lib/auth/session";
import { discardEnrollmentAction, verifyTotpAction } from "@/lib/auth/actions";
import { loginPath, safeNext } from "@/lib/auth/redirects";
import { providerActionError } from "@/lib/auth/errors";

export const metadata: Metadata = { title: "Administrator security — Waymark", robots: { index: false, follow: false } };
export const instant = false;

export default async function AdminSecurityPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  await connection();
  const next = safeNext((await searchParams).next, "/admin");
  let context;
  try {
    context = await getAuthContext();
  } catch (error) {
    if (!(error instanceof AuthError)) throw error;
    return <AuthShell title="Administrator security." description="Administrator access requires an active account and an authenticator."><p className={styles.notice} role="alert">{error.message}</p><LogoutForm /></AuthShell>;
  }
  if (!context.configured || !context.client) return <AuthShell title="Administrator security." description="Invite-only access. Authentication is not configured yet."><AuthSetupNotice /></AuthShell>;
  if (!context.user) redirect(loginPath("/admin/security"));
  if (!context.user.isAdmin) return <AuthShell title="Administrator access only." description="This account is not an invited Waymark administrator."><p>Administrator membership is provisioned by an operator, never through public signup.</p><LogoutForm /></AuthShell>;
  const { data, error } = await context.client.auth.mfa.listFactors();
  if (error) return <AuthShell title="Administrator security." description="Authenticator status could not be checked."><p className={styles.notice} role="alert">{providerActionError(error).message}</p><LogoutForm /></AuthShell>;
  const pending = data.all.filter((factor) => factor.factor_type === "totp" && factor.status === "unverified");
  const verified = data.totp;
  const needsStepUp = context.user.aal !== "aal2" && data.all.some((factor) => factor.status === "verified");
  return <AuthShell title="One more check." description="Only invited administrators can enroll an authenticator. Every admin operation checks your database membership and MFA level again."
    aside={<><h2>Protect your administrator account.</h2><p>Use a TOTP authenticator app. Scanning a QR code is not enough: verify a code to finish enrollment.</p><p>Setup keys are private and are never saved to browser storage. Keep your authenticator backed up securely.</p><p>Lost your authenticator? Contact your operator. Email recovery alone never removes this requirement.</p><LogoutForm /></>}>
    <div className={styles.stack}>
      <p className={styles.notice} role="status">{context.user.aal === "aal2" ? "This session has completed MFA." : "Your identity is signed in, but administrator operations are locked until MFA is verified."}</p>
      {context.user.aal === "aal2" && <a className={styles.link} href={next}>Continue to administration</a>}
      {verified.length > 0 && <section aria-labelledby="verify-title"><h2 id="verify-title">Verify an authenticator</h2><AuthForm action={verifyTotpAction} hidden={{ next }} submitLabel="Verify authenticator" fields={[
        { name: "factorId", label: "Authenticator", type: "select", options: verified.map((factor) => ({ value: factor.id, label: factor.friendly_name ?? "Waymark authenticator" })) },
        { name: "code", label: "Authenticator code", autoComplete: "one-time-code", inputMode: "numeric", pattern: "[0-9]{6}", minLength: 6, maxLength: 6 },
      ]} /></section>}
      {pending.length > 0 && <section aria-labelledby="unfinished-title"><h2 id="unfinished-title">Unfinished setups</h2><p className={styles.hint}>If a setup was interrupted, its QR secret cannot be retrieved. Remove only that unfinished setup, then start again. Verified authenticators are not removed here.</p>{pending.map((factor) => <div className={styles.factor} key={factor.id}><p>{factor.friendly_name ?? "Unfinished authenticator"}</p><AuthForm action={discardEnrollmentAction} hidden={{ factorId: factor.id }} disabled={needsStepUp} submitLabel="Remove this unfinished setup" secondary /></div>)}</section>}
      <section aria-labelledby="enroll-title"><h2 id="enroll-title">Add an authenticator</h2>{needsStepUp && <p className={styles.hint}>Verify your existing authenticator before adding or removing a setup.{verified.length === 0 ? " No verified TOTP authenticator is available here; contact your operator for help with your other MFA factor." : ""}</p>}<EnrollmentForm next={next} disabled={pending.length > 0 || needsStepUp} /></section>
    </div>
  </AuthShell>;
}
