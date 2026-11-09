import type { Metadata } from "next";
import { connection } from "next/server";
import AuthShell, { AuthSetupNotice } from "@/components/auth/AuthShell";
import AuthForm from "@/components/auth/AuthForm";
import styles from "@/components/auth/auth.module.css";
import { forgotPasswordAction } from "@/lib/auth/actions";
import { getSupabaseConfig } from "@/lib/supabase/config";
import { queryNotice } from "@/lib/auth/page-state";

export const metadata: Metadata = { title: "Reset your password — Waymark" };
export const instant = false;

export default async function ForgotPasswordPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  await connection();
  const configured = Boolean(getSupabaseConfig());
  const notice = queryNotice((await searchParams).error);
  return <AuthShell title="Find your way back." description="Request a secure, one-time link to choose a new password.">
    {!configured && <AuthSetupNotice />}
    {notice && <p className={styles.notice} role="status">{notice}</p>}
    <AuthForm action={forgotPasswordAction} disabled={!configured} submitLabel="Request reset link" fields={[{ name: "email", label: "Email address", type: "email", autoComplete: "email", maxLength: 254 }]} />
    <p className={styles.hint}>For your privacy, the response does not reveal whether an email address has an account.</p>
    <nav className={styles.links} aria-label="Account help"><a href="/login">Back to sign in</a></nav>
  </AuthShell>;
}
