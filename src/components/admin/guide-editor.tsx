"use client";

import { useActionState, useId, useMemo, useState } from "react";
import { saveGuideAction } from "@/lib/admin/actions";
import { AdminInputError } from "@/lib/admin/input";
import { editGuideProse, guideProse, previewGuide } from "@/lib/admin/presentation";
import { initialActionState } from "@/lib/admin/types";
import type { GuideContent } from "@/lib/engine/guides/types";
import { validationMessage } from "@/lib/platform/validation";
import { FormFeedback } from "./form-feedback";
import { GuidePreview } from "./guide-preview";
import s from "./admin.module.css";

const errorText = (error: unknown) => error instanceof AdminInputError ? error.message : validationMessage(error);

export function GuideEditor({ milestoneId, latestId, initial }: { milestoneId: string; latestId: string; initial: GuideContent }) {
  const [raw, setRaw] = useState(() => JSON.stringify(initial, null, 2));
  const [showPreview, setShowPreview] = useState(false);
  const [state, action, pending] = useActionState(saveGuideAction, initialActionState);
  const id = useId();
  const prose = useMemo(() => {
    try { return { value: guideProse(raw, milestoneId), error: "" }; }
    catch (error) { return { value: null, error: errorText(error) }; }
  }, [raw, milestoneId]);
  const preview = useMemo(() => {
    try { return { value: previewGuide(raw, milestoneId), error: "" }; }
    catch (error) { return { value: null, error: errorText(error) }; }
  }, [raw, milestoneId]);
  const change = (sectionId: string | null, text: string) => setRaw((value) => editGuideProse(value, milestoneId, sectionId, text));
  return <section className={`${s.card} ${s.stack}`} aria-labelledby={`${id}-title`}>
    <div><h2 id={`${id}-title`}>Edit a new draft</h2><p className={s.muted}>Prose edits retain every nested field. Advanced JSON covers test options, subsections, roadmaps, resources, costs and callouts. Nothing is public until the saved draft is published below.</p></div>
    <form className={s.stack} action={action} aria-describedby={`${id}-feedback`}>
      <fieldset className={s.fieldset} disabled={pending}>
        <input type="hidden" name="milestoneId" value={milestoneId} /><input type="hidden" name="intakeId" value="" />
        <input type="hidden" name="expectedLatestId" value={state.revisionId ?? latestId} />
        {prose.value ? <>
          <div className={s.field}><label htmlFor={`${id}-intro`}>Guide introduction</label><textarea className={s.textarea} id={`${id}-intro`} value={prose.value.intro} maxLength={16000} rows={4} onChange={(event) => change(null, event.target.value)} /></div>
          {prose.value.sections.map((section) => <details className={s.details} key={section.id}>
            <summary>{section.title}</summary><div className={s.field}><label htmlFor={`${id}-${section.id}`}>Section body · {section.id}</label>
              <textarea className={s.textarea} id={`${id}-${section.id}`} value={section.body} maxLength={40000} rows={6} onChange={(event) => change(section.id, event.target.value)} />
              <p className={s.muted}>Clearing prose does not remove this section’s other details. Every section must still have useful content.</p>
            </div>
          </details>)}
        </> : <p className={`${s.feedback} ${s.error}`} role="alert">{prose.error} Correct the advanced JSON to re-enable prose editing.</p>}
        <details className={s.details}>
          <summary>Advanced: full guide JSON</summary><div className={s.field}>
            <label htmlFor={`${id}-json`}>Complete guide document</label>
            <textarea className={`${s.textarea} ${s.code}`} id={`${id}-json`} name="payload" value={raw} rows={24} maxLength={500000} spellCheck={false} onChange={(event) => setRaw(event.target.value)} aria-describedby={`${id}-json-help`} />
            <p id={`${id}-json-help`} className={s.muted}>Keep the archetype and all canonical section IDs. Plain text only; unknown fields are rejected. Maximum 500 KB. The JSON is the submitted document and always includes the prose edits above.</p>
          </div>
        </details>
        {!preview.value && <p className={`${s.feedback} ${s.error}`} role="alert">Cannot save or preview: {preview.error}</p>}
        <div className={s.field}><label htmlFor={`${id}-reason`}>Why is this guide changing? (required for audit)</label><textarea className={s.textarea} id={`${id}-reason`} name="reason" rows={3} required minLength={8} maxLength={2000} /></div>
        <div className={s.row}><button className={s.button} disabled={!preview.value || pending}>{pending ? "Saving draft…" : "Save new draft"}</button>
          <button className={`${s.button} ${s.secondary}`} type="button" disabled={!preview.value} aria-expanded={showPreview} aria-controls={`${id}-preview`} onClick={() => setShowPreview((value) => !value)}>{showPreview ? "Hide" : "Preview"} unsaved guide</button></div>
      </fieldset>
      <FormFeedback state={state} id={`${id}-feedback`} />
    </form>
    <div id={`${id}-preview`} hidden={!showPreview}>
      {showPreview && preview.value && <><h2>Unsaved guide preview</h2><p className={s.muted}>This is the current editor document, not a publication.</p><GuidePreview guide={preview.value} /></>}
    </div>
  </section>;
}
