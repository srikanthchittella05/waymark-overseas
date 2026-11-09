import { adminPageAccess } from "@/lib/admin/access";
import { adminUsers } from "@/lib/admin/data";
import { pageNumber, searchText } from "@/lib/admin/input";
import type { AdminSearchParams } from "@/lib/admin/types";
import { AdminAccessState, AdminDataProblem, AdminHeading, Pagination, Timestamp } from "@/components/admin/chrome";
import { UserActions } from "@/components/admin/user-actions";
import s from "@/components/admin/admin.module.css";

export const instant = false;

export default async function AdminUsersPage({ searchParams }: { searchParams: AdminSearchParams }) {
  const access = await adminPageAccess();
  if (access.state !== "ready") return <AdminAccessState state={access.state} />;
  const params = await searchParams;
  const page = pageNumber(params.page);
  const query = searchText(params.q);
  const status = params.status === "active" || params.status === "suspended" ? params.status : "";
  let users;
  try { users = await adminUsers(access.context.client, page, query, status); }
  catch (error) { return <><AdminHeading title="Users">Manage account access without viewing private plans or progress.</AdminHeading><AdminDataProblem error={error} /></>; }
  return <>
    <AdminHeading title="Users">Manage account access without viewing private plans or progress. Every change requires a reason and is audited.</AdminHeading>
    <form className={s.filters} action="/admin/users" method="get">
      <div className={s.field}><label htmlFor="user-search">Email contains</label><input className={s.input} id="user-search" name="q" type="search" defaultValue={query} maxLength={80} /></div>
      <div className={s.field}><label htmlFor="user-status-filter">Account status</label><select className={s.select} id="user-status-filter" name="status" defaultValue={status}><option value="">All statuses</option><option value="active">Active</option><option value="suspended">Suspended</option></select></div>
      <button className={s.button}>Filter users</button>
    </form>
    <div className={s.stack}>
      {!users.rows.length && <p className={s.empty}>No accounts on this page match these filters. No sample users are shown.</p>}
      {users.rows.map((profile) => <article className={s.card} key={profile.id}>
        <div className={s.row}><h2>{profile.display_name || profile.email || "Unnamed account"}</h2><span className={s.badge}>{profile.status}{profile.id === access.context.user.id ? " · You" : ""}</span></div>
        <dl className={s.metadata}>
          <dt>Email</dt><dd>{profile.email || "Not available"}</dd><dt>User ID</dt><dd>{profile.id}</dd>
          <dt>Created</dt><dd><Timestamp value={profile.created_at} /></dd>
          <dt>Sessions revoked before</dt><dd><Timestamp value={profile.sessions_revoked_before} /></dd>
        </dl>
        <UserActions profile={profile} currentUserId={access.context.user.id} />
      </article>)}
    </div>
    <Pagination page={page} hasMore={users.hasMore} path="/admin/users" params={{ q: query, status }} />
  </>;
}
