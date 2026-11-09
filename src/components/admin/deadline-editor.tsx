"use client";

import { useActionState, useId, useMemo, useState } from "react";
import { saveDeadlineAction } from "@/lib/admin/actions";
import { deadlineImpact } from "@/lib/admin/presentation";
import { initialActionState } from "@/lib/admin/types";
import type { Intake, Milestone } from "@/lib/engine/country-cycles";
import { deadlineValueSchema, validationMessage, type DeadlineValue } from "@/lib/platform/validation";
import { formatPlanDate } from "@/lib/format-date";
import { FormFeedback } from "./form-feedback";
import s from "./admin.module.css";

export function DeadlineImpactTable({ rows }: { rows: ReturnType<typeof deadlineImpact> }) {
  return <div className={s.tableWrap} tabIndex={0} role="region" aria-label="Intake date impact, scroll horizontally if needed">
    <table className={s.table}><caption>Public catalog date preview only. This does not inspect any student’s plan or progress.</caption>
      <thead><tr><th scope="col">Intake</th><th scope="col">Current date</th><th scope="col">Proposed date</th><th scope="col">Change</th></tr></thead>
      <tbody>{rows.map((row) => <tr key={row.intakeId}><th scope="row">{row.label}</th><td>{formatPlanDate(row.before)}</td><td>{formatPlanDate(row.after)}</td>
        <td>{row.shadowed ? "Unchanged: a published intake override takes precedence" : row.differenceDays === 0 ? "No date change" : `${Math.abs(row.differenceDays)} days ${row.differenceDays < 0 ? "earlier" : "later"}`}</td></tr>)}</tbody>
    </table>
  </div>;
}

export function DeadlineEditor({ milestoneId, intakeId, latestId, initial, milestone, intakes, published }: {
  milestoneId: string; intakeId: string | null; latestId: string | null; initial: DeadlineValue;
  milestone: Pick<Milestone, "offsetDays">; intakes: Intake[];
  published: Array<{ intakeId: string | null; value: DeadlineValue }>;
}) {
  const [state, action, pending] = useActionState(saveDeadlineAction, initialActionState);
  const [offset, setOffset] = useState(String(initial.offsetDays));
  const [dueDate, setDueDate] = useState(initial.dueDate ?? "");
  const [hardDeadline, setHardDeadline] = useState(initial.hardDeadline);
  const [source, setSource] = useState(initial.source);
  const [confidence, setConfidence] = useState(initial.confidence);
  const [verifiedOn, setVerifiedOn] = useState(initial.verifiedOn);
  const id = useId();
  const preview = useMemo(() => {
    const value = deadlineValueSchema.safeParse({ offsetDays: /^-?\d+$/.test(offset) ? Number(offset) : NaN,
      ...(dueDate ? { dueDate } : {}), hardDeadline, source, confidence, verifiedOn });
    if (!value.success) return { rows: null, error: validationMessage(value.error) };
    if (dueDate && intakeId === null) return { rows: null, error: "An exact date requires a specific intake." };
    try { return { rows: deadlineImpact(milestone, intakes, value.data, intakeId, published), error: "" }; }
    catch { return { rows: null, error: "The catalog dates could not be verified. Reload before saving." }; }
  }, [offset, dueDate, hardDeadline, source, confidence, verifiedOn, milestone, intakes, intakeId, published]);
  return <section className={`${s.card} ${s.stack}`} aria-labelledby={`${id}-title`}>
    <div><h2 id={`${id}-title`}>Edit a new deadline draft</h2><p className={s.muted}>Positive offsets are days before intake; negative offsets are after intake. Exact dates override the offset for one intake only. A verified requirement does not automatically make its planning date official.</p></div>
    <form className={s.stack} action={action} aria-describedby={`${id}-result`}>
      <fieldset className={s.fieldset} disabled={pending}>
        <input type="hidden" name="milestoneId" value={milestoneId} /><input type="hidden" name="intakeId" value={intakeId ?? ""} />
        <input type="hidden" name="expectedLatestId" value={state.revisionId ?? latestId ?? ""} />
        <div className={s.grid}>
          <div className={s.field}><label htmlFor={`${id}-offset`}>Days before intake</label><input className={s.input} id={`${id}-offset`} name="offsetDays" type="number" min={-365} max={1460} step={1} required value={offset} onChange={(event) => setOffset(event.target.value)} /></div>
          <div className={s.field}><label htmlFor={`${id}-due`}>Exact deadline (optional, intake only)</label><input className={s.input} id={`${id}-due`} name="dueDate" type="date" value={dueDate} disabled={intakeId === null} onChange={(event) => setDueDate(event.target.value)} /><p className={s.muted}>{intakeId === null ? "Select a specific intake above to set an exact date." : "Leave blank to use the relative offset."}</p></div>
        </div>
        <div className={s.check}><input id={`${id}-hard`} name="hardDeadline" type="checkbox" checked={hardDeadline} onChange={(event) => setHardDeadline(event.target.checked)} /><label htmlFor={`${id}-hard`}>Hard deadline (missing it can block the route)</label></div>
        <div className={s.field}><label htmlFor={`${id}-source`}>Official or authoritative source (HTTPS)</label><input className={s.input} id={`${id}-source`} name="source" type="url" required maxLength={2048} value={source} onChange={(event) => setSource(event.target.value)} /></div>
        <div className={s.grid}>
          <div className={s.field}><label htmlFor={`${id}-confidence`}>Evidence confidence</label><select className={s.select} id={`${id}-confidence`} name="confidence" value={confidence} onChange={(event) => setConfidence(event.target.value as DeadlineValue["confidence"])}><option value="verified">Verified — primary source states the fact</option><option value="typical">Typical — a common planning pattern</option><option value="estimate">Estimate — inferred planning buffer</option></select></div>
          <div className={s.field}><label htmlFor={`${id}-verified`}>Date the source was actually verified</label><input className={s.input} id={`${id}-verified`} name="verifiedOn" type="date" required value={verifiedOn} onChange={(event) => setVerifiedOn(event.target.value)} /></div>
        </div>
        <div className={s.field}><label htmlFor={`${id}-reason`}>Why is this deadline changing? (required for audit)</label><textarea className={s.textarea} id={`${id}-reason`} name="reason" rows={3} minLength={8} maxLength={2000} required /></div>
        <button className={s.button} disabled={!preview.rows || pending}>{pending ? "Saving draft…" : "Save new draft"}</button>
      </fieldset>
      <FormFeedback state={state} id={`${id}-result`} />
    </form>
    <div className={s.stack}><h2>Unsaved intake date preview</h2>{preview.rows ? <DeadlineImpactTable rows={preview.rows} /> : <p className={s.note}>Complete the deadline fields to preview: {preview.error}</p>}</div>
  </section>;
}
