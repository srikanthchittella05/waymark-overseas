import type { Metadata } from "next";
import { connection } from "next/server";
import AuthShell, { AuthSetupNotice, LogoutForm } from "@/components/auth/AuthShell";
import AuthForm from "@/components/auth/AuthForm";
import styles from "@/components/auth/auth.module.css";
import { loginAction, startAppleAction, startGoogleAction } from "@/lib/auth/actions";
import { authPageState, queryNotice } from "@/lib/auth/page-state";
import { safeNext } from "@/lib/auth/redirects";

export const metadata: Metadata = { title: "Sign in — Waymark" };
export const instant = false;

export default async function LoginPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  await connection();
  const query = await searchParams;
  const state = await authPageState();
  const next = safeNext(query.next);
  const notice = queryNotice(query.notice) ?? queryNotice(query.error);
  return <AuthShell title="Pick up your path." description="Sign in to save your plan and return to it on any device.">
    {!state.configured && <AuthSetupNotice />}
    {(state.problem || notice) && <p className={styles.notice} role="status">{state.problem ?? notice}</p>}
    {state.user && <div className={styles.notice}><p>Currently signed in as {state.user.email}.</p><a href={next} className={styles.link}>Continue to your plan</a><LogoutForm /></div>}
    <AuthForm action={loginAction} disabled={!state.configured} hidden={{ next }} submitLabel="Sign in with email" fields={[
      { name: "email", label: "Email address", type: "email", autoComplete: "email", maxLength: 254 },
      { name: "password", label: "Password", type: "password", autoComplete: "current-password", maxLength: 1024 },
    ]} />
    <AuthForm action={startGoogleAction} disabled={!state.configured || !state.googleEnabled} hidden={{ next }} submitLabel="Continue with Google" secondary />
    {!state.googleEnabled && <p className={styles.hint}>Google sign-in has not been enabled in this environment.</p>}
    <AuthForm action={startAppleAction} disabled={!state.configured || !state.appleEnabled} hidden={{ next }} submitLabel="Continue with Apple" secondary />
    {!state.appleEnabled && <p className={styles.hint}>Apple sign-in has not been enabled in this environment.</p>}
    <nav className={styles.links} aria-label="Account help"><a href={`/signup?${new URLSearchParams({ next })}`}>Create an account</a><a href="/forgot-password">Forgot password?</a></nav>
    {state.problem && <LogoutForm />}
  </AuthShell>;
}
