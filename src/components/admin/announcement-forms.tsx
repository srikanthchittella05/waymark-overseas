"use client";

import Link from "next/link";
import { useActionState, useId, useState } from "react";
import { archiveAnnouncementAction, publishAnnouncementAction } from "@/lib/admin/actions";
import { initialActionState } from "@/lib/admin/types";
import { COUNTRY_CYCLES } from "@/lib/engine/country-cycles";
import { FormFeedback } from "./form-feedback";
import s from "./admin.module.css";

export function AnnouncementComposer() {
  const [state, action, pending] = useActionState(publishAnnouncementAction, initialActionState);
  const [audience, setAudience] = useState("all");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const id = useId();
  return <section className={`${s.card} ${s.stack}`}>
    <h2>Publish an in-app announcement</h2>
    <form className={s.stack} action={action} aria-describedby={`${id}-result`}>
      <fieldset className={s.fieldset} disabled={pending || state.status === "success"}>
        <div className={s.field}><label htmlFor={`${id}-title`}>Title</label><input className={s.input} id={`${id}-title`} name="title" required maxLength={200} value={title} onChange={(event) => setTitle(event.target.value)} /></div>
        <div className={s.field}><label htmlFor={`${id}-body`}>Message (plain text)</label><textarea className={s.textarea} id={`${id}-body`} name="body" required maxLength={10000} rows={7} value={body} onChange={(event) => setBody(event.target.value)} /><p className={s.muted}>No HTML, email delivery, attachments or uploads. The message appears only in the relevant signed-in in-app feed.</p></div>
        <div className={s.field}><label htmlFor={`${id}-audience`}>Audience</label><select className={s.select} id={`${id}-audience`} name="audience" value={audience} onChange={(event) => setAudience(event.target.value)}><option value="all">All active accounts</option><option value="country">Accounts with a saved plan for one destination</option><option value="user">One specific account</option></select></div>
        {audience === "country" && <div className={s.field}><label htmlFor={`${id}-country`}>Destination</label><select className={s.select} id={`${id}-country`} name="countryCode" required defaultValue=""><option value="" disabled>Choose a destination</option>{COUNTRY_CYCLES.map((country) => <option value={country.code} key={country.code}>{country.name}</option>)}</select></div>}
        {audience === "user" && <div className={s.field}><label htmlFor={`${id}-target`}>Target account UUID</label><input className={s.input} id={`${id}-target`} name="targetUserId" required maxLength={36} autoComplete="off" /><p className={s.muted}>Use the exact account ID from <Link href="/admin/users" target="_blank" rel="noopener noreferrer">Users (new tab)</Link>. The database verifies that the account exists.</p></div>}
        <details className={s.details}><summary>Preview plain-text message</summary><article className={s.inset}><h3>{title || "Title is empty"}</h3><p className={s.prose}>{body || "Message is empty"}</p><p className={s.muted}>Audience: {audience === "all" ? "all active accounts" : audience === "country" ? "the selected destination" : "the selected account"}.</p></article></details>
        <div className={s.check}><input id={`${id}-confirm`} type="checkbox" name="confirmed" value="yes" required /><label htmlFor={`${id}-confirm`}>I reviewed the text and audience. Publish this announcement in-app only.</label></div>
        <button className={s.button} disabled={pending || state.status === "success"}>{pending ? "Publishing…" : "Publish announcement"}</button>
      </fieldset>
      <FormFeedback state={state} id={`${id}-result`} />
      {state.status === "success" && <a href="/admin/updates">Reload to compose another announcement</a>}
    </form>
  </section>;
}

export function ArchiveAnnouncementForm({ announcementId }: { announcementId: string }) {
  const [state, action, pending] = useActionState(archiveAnnouncementAction, initialActionState);
  const id = useId();
  return <details className={s.details}>
    <summary>Archive announcement</summary>
    <form className={s.stack} action={action} aria-describedby={`${id}-result`}>
      <input type="hidden" name="announcementId" value={announcementId} />
      <p className={s.muted}>Archiving removes this message from the active in-app feed. Its record and audit history remain. There is no email to recall.</p>
      <div className={s.check}><input id={`${id}-confirm`} type="checkbox" name="confirmed" value="yes" required /><label htmlFor={`${id}-confirm`}>Remove this announcement from the active feed.</label></div>
      <button className={`${s.button} ${s.secondary}`} disabled={pending || state.status === "success"}>{pending ? "Archiving…" : "Archive announcement"}</button>
      <FormFeedback state={state} id={`${id}-result`} />
    </form>
  </details>;
}
