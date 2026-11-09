"use client";

import { useActionState, useId } from "react";
import { publishRevisionAction, rollbackRevisionAction } from "@/lib/admin/actions";
import { initialActionState } from "@/lib/admin/types";
import { FormFeedback } from "./form-feedback";
import s from "./admin.module.css";

export function PublishRevisionForm({ revisionId, impactAvailable }: { revisionId: string; impactAvailable: boolean }) {
  const [state, action, pending] = useActionState(publishRevisionAction, initialActionState);
  const id = useId();
  return <form action={action} className={s.stack} aria-describedby={`${id}-result`}>
    <input type="hidden" name="revisionId" value={revisionId} /><input type="hidden" name="expectedLatestId" value={revisionId} />
    <p className={s.muted}>Only this saved draft is published. Unsaved editor changes are not included. Publication archives the prior version and creates an in-app notice; completed steps are retained.</p>
    {!impactAvailable && <p className={s.note}>Affected-plan counts are not available. Publication is blocked until a privacy-safe admin impact preview is configured.</p>}
    <div className={s.check}><input id={`${id}-confirm`} type="checkbox" name="confirmed" value="yes" required disabled={!impactAvailable || pending} /><label htmlFor={`${id}-confirm`}>I reviewed the saved draft, sources and affected scope and want to make it public.</label></div>
    <button className={s.button} disabled={!impactAvailable || pending || state.status === "success"}>{pending ? "Publishing…" : "Publish saved draft"}</button>
    <FormFeedback state={state} id={`${id}-result`} />
  </form>;
}

export function RollbackRevisionForm({ sourceId, latestId }: { sourceId: string; latestId: string | null }) {
  const [state, action, pending] = useActionState(rollbackRevisionAction, initialActionState);
  const id = useId();
  return <form action={action} className={s.stack} aria-describedby={`${id}-result`}>
    <input type="hidden" name="sourceRevisionId" value={sourceId} /><input type="hidden" name="expectedLatestId" value={state.revisionId ?? latestId ?? ""} />
    <p className={s.muted}>Restoring creates a new draft from this revision’s complete payload. The current publication and all history remain intact until the new draft is reviewed and published.</p>
    <div className={s.field}><label htmlFor={`${id}-reason`}>Reason for restoring this revision</label><textarea className={s.textarea} id={`${id}-reason`} name="reason" required minLength={8} maxLength={2000} rows={3} /></div>
    <div className={s.check}><input id={`${id}-confirm`} type="checkbox" name="confirmed" value="yes" required /><label htmlFor={`${id}-confirm`}>Create a new draft from this history entry, without deleting anything.</label></div>
    <button className={`${s.button} ${s.secondary}`} disabled={pending}>{pending ? "Restoring…" : "Restore as a new draft"}</button>
    <FormFeedback state={state} id={`${id}-result`} />
  </form>;
}
