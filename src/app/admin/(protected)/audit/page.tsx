import { Fragment } from "react";
import { adminPageAccess } from "@/lib/admin/access";
import { adminAudit } from "@/lib/admin/data";
import { pageNumber, searchText } from "@/lib/admin/input";
import { auditDetails } from "@/lib/admin/presentation";
import type { AdminSearchParams } from "@/lib/admin/types";
import { AdminAccessState, AdminDataProblem, AdminHeading, Pagination, Timestamp } from "@/components/admin/chrome";
import s from "@/components/admin/admin.module.css";

export const instant = false;

export default async function AdminAuditPage({ searchParams }: { searchParams: AdminSearchParams }) {
  const access = await adminPageAccess();
  if (access.state !== "ready") return <AdminAccessState state={access.state} />;
  const params = await searchParams;
  const page = pageNumber(params.page);
  const action = searchText(params.action);
  let events;
  try { events = await adminAudit(access.context.client, page, action); }
  catch (error) { return <><AdminHeading title="Audit log">An append-only record of administrative changes.</AdminHeading><AdminDataProblem error={error} /></>; }
  return <>
    <AdminHeading title="Audit log">An append-only record of administrative changes. This view shows reviewed metadata fields, not arbitrary payloads, credentials or private student progress.</AdminHeading>
    <form className={s.filters} action="/admin/audit" method="get"><div className={s.field}><label htmlFor="audit-action">Action contains</label><input className={s.input} id="audit-action" name="action" type="search" maxLength={80} defaultValue={action} /></div><button className={s.button}>Filter events</button></form>
    <div className={s.stack}>
      {!events.rows.length && <p className={s.empty}>No audit events on this page match this filter. No activity has been fabricated.</p>}
      {events.rows.map((event) => <article className={s.card} key={event.id}>
        <div className={s.row}><h2>{event.action}</h2><Timestamp value={event.created_at} /></div>
        <dl className={s.metadata}><dt>Actor</dt><dd>{event.actor_id ?? "System / catalog seed"}</dd><dt>Subject</dt><dd>{event.subject_type} / {event.subject_id ?? "Not recorded"}</dd><dt>Event ID</dt><dd>{event.id}</dd>
          {auditDetails(event.details).map(([key, value]) => <Fragment key={key}><dt>{key}</dt><dd>{value}</dd></Fragment>)}
        </dl>
      </article>)}
    </div>
    <Pagination page={page} hasMore={events.hasMore} path="/admin/audit" params={{ action }} />
  </>;
}
