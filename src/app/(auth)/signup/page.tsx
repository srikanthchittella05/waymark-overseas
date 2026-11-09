import type { Metadata } from "next";
import { connection } from "next/server";
import AuthShell, { AuthSetupNotice } from "@/components/auth/AuthShell";
import AuthForm from "@/components/auth/AuthForm";
import styles from "@/components/auth/auth.module.css";
import { signupAction } from "@/lib/auth/actions";
import { getSupabaseConfig } from "@/lib/supabase/config";
import { safeNext } from "@/lib/auth/redirects";

export const metadata: Metadata = { title: "Create an account — Waymark" };
export const instant = false;

export default async function SignupPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  await connection();
  const next = safeNext((await searchParams).next);
  const configured = Boolean(getSupabaseConfig());
  return <AuthShell title="A path of your own." description="Create an account for cloud saving. Confirm your email before signing in.">
    {!configured && <AuthSetupNotice />}
    <AuthForm action={signupAction} disabled={!configured} hidden={{ next }} submitLabel="Create account" fields={[
      { name: "displayName", label: "Your name", autoComplete: "name", maxLength: 100 },
      { name: "email", label: "Email address", type: "email", autoComplete: "email", maxLength: 254 },
      { name: "password", label: "Password", type: "password", autoComplete: "new-password", minLength: 12, maxLength: 72, hint: "At least 12 characters; at most 72 UTF-8 bytes. Spaces are preserved." },
      { name: "confirmPassword", label: "Confirm password", type: "password", autoComplete: "new-password", minLength: 12, maxLength: 72 },
    ]} />
    <nav className={styles.links} aria-label="Account help"><a href={`/login?${new URLSearchParams({ next })}`}>Already have an account? Sign in</a></nav>
  </AuthShell>;
}
