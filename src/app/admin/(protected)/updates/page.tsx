import Link from "next/link";
import { adminPageAccess } from "@/lib/admin/access";
import { adminAnnouncements } from "@/lib/admin/data";
import { pageNumber } from "@/lib/admin/input";
import type { AdminSearchParams } from "@/lib/admin/types";
import { COUNTRY_CYCLES } from "@/lib/engine/country-cycles";
import { AdminAccessState, AdminDataProblem, AdminHeading, Pagination, Timestamp } from "@/components/admin/chrome";
import { AnnouncementComposer, ArchiveAnnouncementForm } from "@/components/admin/announcement-forms";
import s from "@/components/admin/admin.module.css";

export const instant = false;

export default async function AdminUpdatesPage({ searchParams }: { searchParams: AdminSearchParams }) {
  const access = await adminPageAccess();
  if (access.state !== "ready") return <AdminAccessState state={access.state} />;
  const params = await searchParams;
  const page = pageNumber(params.page);
  const archived = params.view === "archived";
  let announcements;
  try { announcements = await adminAnnouncements(access.context.client, page, archived); }
  catch (error) { return <><AdminHeading title="In-app announcements">Publish plain-text updates to a deliberately selected audience.</AdminHeading><AdminDataProblem error={error} /></>; }
  return <>
    <AdminHeading title="In-app announcements">Publish plain-text updates to all active accounts, one destination or one account. Announcements are visible after sign-in; this tool never sends email.</AdminHeading>
    <div className={s.stack}>
      {!archived && <AnnouncementComposer />}
      <section className={s.stack} aria-labelledby="announcement-list-title">
        <div className={s.row}><h2 className={s.sectionTitle} id="announcement-list-title">{archived ? "Archived" : "Active"} announcements</h2><Link href={archived ? "/admin/updates" : "/admin/updates?view=archived"}>{archived ? "Show active announcements" : "Show archive"}</Link></div>
        {!announcements.rows.length && <p className={s.empty}>No {archived ? "archived" : "active"} announcements on this page.</p>}
        {announcements.rows.map((announcement) => <article className={s.card} key={announcement.id}>
          <h3>{announcement.title}</h3><p className={s.prose}>{announcement.body}</p>
          <dl className={s.metadata}>
            <dt>Audience</dt><dd>{announcement.target_user_id ? `Account ${announcement.target_user_id}${announcement.country_code ? ` · ${announcement.country_code}` : ""}` : announcement.country_code ? `Accounts with a saved ${COUNTRY_CYCLES.find((country) => country.code === announcement.country_code)?.name ?? announcement.country_code} plan` : "All active accounts"}</dd>
            <dt>Published</dt><dd><Timestamp value={announcement.published_at} /></dd>
            {announcement.archived_at && <><dt>Archived</dt><dd><Timestamp value={announcement.archived_at} /></dd></>}
          </dl>
          <p className={s.muted}>Automatic content-change notices may have a narrower intake scope enforced by the database.</p>
          {!announcement.archived_at && <ArchiveAnnouncementForm announcementId={announcement.id} />}
        </article>)}
      </section>
      <Pagination page={page} hasMore={announcements.hasMore} path="/admin/updates" params={archived ? { view: "archived" } : {}} />
    </div>
  </>;
}
