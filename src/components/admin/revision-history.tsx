import { Fragment } from "react";
import { parseGuideContent, deadlineValueSchema } from "@/lib/platform/validation";
import { formatPlanDate } from "@/lib/format-date";
import type { AdminRevision } from "@/lib/admin/types";
import { deadlineImpact } from "@/lib/admin/presentation";
import type { Intake, Milestone } from "@/lib/engine/country-cycles";
import type { DeadlineValue } from "@/lib/platform/validation";
import type { PublicationImpact } from "@/lib/admin/impact";
import { GuidePreview } from "./guide-preview";
import { DeadlineImpactTable } from "./deadline-editor";
import { PublishRevisionForm, RollbackRevisionForm } from "./revision-actions";
import { Pagination, Timestamp } from "./chrome";
import s from "./admin.module.css";

function RevisionPayload({ revision }: { revision: AdminRevision }) {
  if (revision.kind === "guide") {
    let guide;
    try { guide = parseGuideContent(revision.milestone_id, revision.payload); }
    catch { return <InvalidPayload />; }
    return <GuidePreview guide={guide} />;
  }
  const parsed = deadlineValueSchema.safeParse(revision.payload);
  if (!parsed.success) return <InvalidPayload />;
  const value = parsed.data;
  const entries = [["Days before intake", String(value.offsetDays)], ["Exact date", value.dueDate ? formatPlanDate(value.dueDate) : "Intake-relative"], ["Hard deadline", value.hardDeadline ? "Yes" : "No"], ["Confidence", value.confidence], ["Source verified", formatPlanDate(value.verifiedOn)]];
  return <div className={s.stack}><dl className={s.metadata}>{entries.map(([label, content]) => <Fragment key={label}><dt>{label}</dt><dd>{content}</dd></Fragment>)}</dl><a href={value.source} target="_blank" rel="noopener noreferrer">Review source (new tab)</a></div>;
}

function InvalidPayload() {
  return <p className={`${s.feedback} ${s.error}`}>This historical payload does not match the current validated schema. It cannot be restored or published without correction.</p>;
}

export function RevisionReview({ revision, impact, deadline }: {
  revision: AdminRevision | null; impact: PublicationImpact;
  deadline?: { milestone: Pick<Milestone, "offsetDays">; intakes: Intake[]; published: Array<{ intakeId: string | null; value: DeadlineValue }> };
}) {
  if (!revision) return <section className={s.card}><h2>Nothing saved in this scope yet</h2><p>Save a draft above to enable revision review. No default or static content has been published by this page.</p></section>;
  let datePreview = null;
  if (deadline && revision.kind === "deadline") {
    const value = deadlineValueSchema.safeParse(revision.payload);
    if (value.success) datePreview = <DeadlineImpactTable rows={deadlineImpact(deadline.milestone, deadline.intakes, value.data, revision.intake_id, deadline.published)} />;
  }
  return <section className={`${s.card} ${s.stack}`}>
    <div className={s.row}><h2>Review saved revision #{revision.sequence}</h2><span className={s.badge}>{revision.state}</span></div>
    <dl className={s.metadata}><dt>Saved</dt><dd><Timestamp value={revision.created_at} /></dd><dt>Reason</dt><dd>{revision.reason}</dd><dt>Published</dt><dd><Timestamp value={revision.published_at} /></dd></dl>
    <details className={s.details}><summary>Preview complete saved payload</summary><RevisionPayload revision={revision} /></details>
    {datePreview}
    {impact.available ? <p className={s.note}><strong>{impact.affectedPlans} saved plans in the affected scope.</strong> This is an aggregate count only; no private plan or progress data is exposed. Counts may change before publication.</p> : <p className={s.note}>{impact.reason} No plan counts are guessed.</p>}
    {revision.state === "draft" ? <PublishRevisionForm revisionId={revision.id} impactAvailable={impact.available} /> : <p className={s.muted}>To change a publication, save a new draft or restore a published history entry as a new draft.</p>}
  </section>;
}

export function RevisionHistory({ rows, latestId, page, hasMore, path, intakeId }: {
  rows: AdminRevision[]; latestId: string | null; page: number; hasMore: boolean; path: string; intakeId: string | null;
}) {
  return <section className={`${s.card} ${s.stack}`}>
    <div><h2>Revision history</h2><p className={s.muted}>Append-only history for this exact scope. Restoring creates a new draft; it never removes the current publication or audit trail.</p></div>
    {!rows.length && <p>No saved revisions in this scope.</p>}
    {rows.map((revision) => <details className={s.details} key={revision.id}>
      <summary>#{revision.sequence} · {revision.state} · <Timestamp value={revision.created_at} /></summary>
      <div className={s.stack}><dl className={s.metadata}><dt>Reason</dt><dd>{revision.reason}</dd><dt>Author</dt><dd>{revision.created_by ?? "Catalog seed"}</dd><dt>Published by</dt><dd>{revision.published_by ?? "Not recorded"}</dd></dl>
        <RevisionPayload revision={revision} />
        {revision.state !== "draft" && <RollbackRevisionForm sourceId={revision.id} latestId={latestId} />}
      </div>
    </details>)}
    <Pagination page={page} hasMore={hasMore} path={path} params={intakeId ? { intake: intakeId } : {}} keyName="history" />
  </section>;
}
