import type { Metadata } from "next";
import { connection } from "next/server";
import { cookies } from "next/headers";
import AuthShell, { AuthSetupNotice } from "@/components/auth/AuthShell";
import AuthForm from "@/components/auth/AuthForm";
import styles from "@/components/auth/auth.module.css";
import { resetPasswordAction } from "@/lib/auth/actions";
import { getSupabaseConfig } from "@/lib/supabase/config";
import { RECOVERY_COOKIE } from "@/lib/supabase/cookies";
import { recoveryProofSchema } from "@/lib/auth/validation";

export const metadata: Metadata = { title: "Choose a new password — Waymark" };
export const instant = false;

export default async function ResetPasswordPage() {
  await connection();
  const configured = Boolean(getSupabaseConfig());
  let hasProof = false;
  try {
    hasProof = recoveryProofSchema.safeParse(JSON.parse((await cookies()).get(RECOVERY_COOKIE)?.value ?? "null")).success;
  } catch { /* Malformed transport cookies are not recovery authority. */ }
  return <AuthShell title="A fresh start." description="Choose a new password using the one-time link from your email.">
    {!configured && <AuthSetupNotice />}
    {configured && !hasProof && <p className={styles.notice}>Open a fresh password-reset email first. Visiting this page alone does not verify your identity.</p>}
    <AuthForm action={resetPasswordAction} disabled={!configured || !hasProof} submitLabel="Update password" fields={[
      { name: "password", label: "New password", type: "password", autoComplete: "new-password", minLength: 12, maxLength: 72, hint: "At least 12 characters; at most 72 UTF-8 bytes. Spaces are preserved." },
      { name: "confirmPassword", label: "Confirm new password", type: "password", autoComplete: "new-password", minLength: 12, maxLength: 72 },
      { name: "code", label: "Administrator authenticator code", required: false, autoComplete: "one-time-code", inputMode: "numeric", pattern: "[0-9]{6}", minLength: 6, maxLength: 6, hint: "Administrators must include their current TOTP code. Other accounts can leave this blank." },
    ]} />
    <p className={styles.hint}>The link is verified with the account provider when you submit. A failed or expired attempt may require a new link.</p>
    <nav className={styles.links} aria-label="Account help"><a href="/forgot-password">Request a fresh reset link</a><a href="/login">Back to sign in</a></nav>
  </AuthShell>;
}
