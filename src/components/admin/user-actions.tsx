"use client";

import { useActionState, useId } from "react";
import { revokeSessionsAction, setUserStatusAction } from "@/lib/admin/actions";
import { initialActionState, type AdminProfile } from "@/lib/admin/types";
import { FormFeedback } from "./form-feedback";
import s from "./admin.module.css";

export function UserActions({ profile, currentUserId }: { profile: AdminProfile; currentUserId: string }) {
  const [statusState, statusAction, statusPending] = useActionState(setUserStatusAction, initialActionState);
  const [revokeState, revokeAction, revokePending] = useActionState(revokeSessionsAction, initialActionState);
  const id = useId();
  const nextStatus = profile.status === "active" ? "suspended" : "active";
  const ownAccount = profile.id === currentUserId;
  return <div>
    <details className={s.details}>
      <summary>{nextStatus === "suspended" ? "Suspend account" : "Reactivate account"}</summary>
      {ownAccount && nextStatus === "suspended" ? <p>You cannot suspend your own account. Other administrator accounts are protected by the database too.</p> :
        <form className={s.stack} action={statusAction} aria-describedby={`${id}-status-result`}>
          <input type="hidden" name="userId" value={profile.id} /><input type="hidden" name="status" value={nextStatus} />
          <p className={s.muted}>{nextStatus === "suspended" ? "Suspension blocks Waymark access, including existing sessions. It does not delete the account or its saved progress. Administrator accounts cannot be suspended." : "Reactivation permits the account to sign in again. Previously revoked sessions remain revoked."}</p>
          <div className={s.field}><label htmlFor={`${id}-status-reason`}>Reason for the audit log (required)</label><textarea className={s.textarea} id={`${id}-status-reason`} name="reason" minLength={8} maxLength={2000} required rows={3} /></div>
          <div className={s.check}><input id={`${id}-status-confirm`} type="checkbox" name="confirmed" value="yes" required /><label htmlFor={`${id}-status-confirm`}>I reviewed this account and want to {nextStatus === "suspended" ? "suspend" : "reactivate"} it.</label></div>
          <button className={`${s.button} ${nextStatus === "suspended" ? s.danger : ""}`} disabled={statusPending}>{statusPending ? "Saving…" : nextStatus === "suspended" ? "Suspend account" : "Reactivate account"}</button>
          <FormFeedback state={statusState} id={`${id}-status-result`} />
        </form>}
    </details>
    <details className={s.details}>
      <summary>Revoke existing Waymark sessions</summary>
      <form className={s.stack} action={revokeAction} aria-describedby={`${id}-revoke-result`}>
        <input type="hidden" name="userId" value={profile.id} />
        <p className={s.muted}>Blocks application access for existing sessions, including refreshed tokens. This does not sign the user out of Google or every Supabase client. A new sign-in is still allowed.{ownAccount ? " This is your own account: you will need to sign in again." : ""}</p>
        <div className={s.field}><label htmlFor={`${id}-revoke-reason`}>Reason for the audit log (required)</label><textarea className={s.textarea} id={`${id}-revoke-reason`} name="reason" minLength={8} maxLength={2000} required rows={3} /></div>
        <div className={s.check}><input id={`${id}-revoke-confirm`} type="checkbox" name="confirmed" value="yes" required /><label htmlFor={`${id}-revoke-confirm`}>I understand this revokes existing Waymark access, not the account itself.</label></div>
        <button className={`${s.button} ${s.danger}`} disabled={revokePending}>{revokePending ? "Revoking…" : "Revoke Waymark sessions"}</button>
        <FormFeedback state={revokeState} id={`${id}-revoke-result`} />
      </form>
    </details>
  </div>;
}
