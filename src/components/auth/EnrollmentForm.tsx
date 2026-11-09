"use client";

import { useActionState } from "react";
import { enrollTotpAction, verifyTotpAction } from "@/lib/auth/actions";
import { INITIAL_AUTH_STATE } from "@/lib/auth/action-state";
import AuthForm, { ActionFeedback } from "./AuthForm";
import styles from "./auth.module.css";

export default function EnrollmentForm({ next, disabled }: { next: string; disabled: boolean }) {
  const [state, action, pending] = useActionState(enrollTotpAction, INITIAL_AUTH_STATE);
  return (
    <div>
      {!state.enrollment && <form action={action} className={styles.form} aria-busy={pending}><button disabled={disabled || pending} type="submit" className={styles.button}>{pending ? "Creating setup…" : "Set up an authenticator"}</button></form>}
      <ActionFeedback status={state.status} message={state.message} />
      {state.enrollment && <div className={styles.factor}>
        <h2>Connect your authenticator</h2>
        {/* SVG is rendered as an image, never injected as markup. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.qr} src={state.enrollment.qrCode} width={256} height={256} alt="Scan this Waymark setup QR code with your authenticator app." />
        <p className={styles.hint}>Cannot scan? Enter this setup key in your authenticator. Keep it private; it is shown only during this setup.</p>
        <p className={styles.secret}>{state.enrollment.secret}</p>
        <AuthForm action={verifyTotpAction} hidden={{ factorId: state.enrollment.factorId, next }} submitLabel="Verify and finish setup"
          fields={[{ name: "code", label: "Authenticator code", autoComplete: "one-time-code", inputMode: "numeric", pattern: "[0-9]{6}", minLength: 6, maxLength: 6 }]} />
      </div>}
    </div>
  );
}
