import Link from "next/link";
import { adminPageAccess } from "@/lib/admin/access";
import { adminDashboard } from "@/lib/admin/data";
import { AdminAccessState, AdminDataProblem, AdminHeading, CatalogSetup } from "@/components/admin/chrome";
import s from "@/components/admin/admin.module.css";

export const instant = false;

export default async function AdminOverview() {
  const access = await adminPageAccess();
  if (access.state !== "ready") return <AdminAccessState state={access.state} />;
  let counts;
  try { counts = await adminDashboard(access.context.client); }
  catch (error) { return <><AdminHeading title="Overview">Maintain the people and information behind every route.</AdminHeading><AdminDataProblem error={error} /></>; }
  return <>
    <AdminHeading title="Overview">Maintain the people and information behind every route. Counts below come from the connected database, not the sample planner.</AdminHeading>
    <div className={s.stack}>
      {counts.milestones === 0 && <CatalogSetup />}
      <div className={s.stats}>
        {[["Users", counts.users, "/admin/users"], ["Saved draft revisions", counts.drafts, "/admin/guides"], ["Active in-app announcements", counts.announcements, "/admin/updates"]].map(([label, count, href]) =>
          <section className={s.card} key={label}><p className={s.eyebrow}>{label}</p><p className={s.stat}>{count}</p><Link href={String(href)}>Manage {String(label).toLowerCase()}</Link></section>)}
      </div>
      <section className={s.card}><h2>Publish with a paper trail</h2><p>Save a draft, preview the whole guide or the changed intake dates, then publish the saved revision. History is retained. Restoring an earlier publication creates a new draft instead of rewriting the past.</p>
        <div className={s.row}><Link href="/admin/guides">Edit guides</Link><Link href="/admin/deadlines">Review deadlines</Link><Link href="/admin/audit">Read the audit log</Link></div>
      </section>
      <section className={s.note}><h2 className={s.sectionTitle}>A deliberately narrow admin area</h2><p>These tools do not expose private plans or completed steps. User actions are limited to suspension, reactivation and Waymark session revocation. Announcements are in-app only: no email, billing, uploads or impersonation.</p></section>
    </div>
  </>;
}
