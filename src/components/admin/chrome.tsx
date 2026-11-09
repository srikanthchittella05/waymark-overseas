import Link from "next/link";
import type { ReactNode } from "react";
import type { AdminPageAccess } from "@/lib/admin/access";
import { adminErrorMessage } from "@/lib/admin/presentation";
import s from "./admin.module.css";

export function AdminAccessState({ state }: { state: Exclude<AdminPageAccess["state"], "ready"> }) {
  const title = state === "setup" ? "Administration is not connected yet" : state === "denied" ? "Access restricted" : "Administration is temporarily unavailable";
  return <div className={s.standalone}><div className={`${s.card} ${s.stack}`}>
    <p className={s.eyebrow}>Waymark / Administration</p>
    <h1>{title}</h1>
    <p>{state === "setup"
      ? "A dedicated Waymark Supabase project has not been configured. No administrator session, user count or saved content is being simulated."
      : state === "denied" ? "This account cannot access this area. No administrative data is shown."
      : "Access could not be verified. No administrative data or editing controls are available. Try again later."}</p>
    {state === "setup" && <p className={s.muted}>An operator must configure the dedicated project, apply the database migrations and catalog seed, provision administrator membership, and complete two-factor enrollment before using these tools.</p>}
    <Link className={s.button} href="/today">Back to the planner</Link>
  </div></div>;
}

export function AdminHeading({ title, children, back }: { title: string; children: ReactNode; back?: { href: string; label: string } }) {
  return <header className={s.heading}>
    {back && <Link href={back.href}>{back.label}</Link>}
    <p className={s.eyebrow}>Waymark / Administration</p>
    <h1>{title}</h1><p>{children}</p>
  </header>;
}

export function AdminDataProblem({ error }: { error: unknown }) {
  return <section className={`${s.card} ${s.stack}`} aria-labelledby="admin-data-problem">
    <h2 id="admin-data-problem">Data could not be loaded</h2>
    <p role="alert">{adminErrorMessage(error)}</p>
    <p className={s.muted}>Nothing has been substituted with sample data. If setup is incomplete, apply the dedicated Waymark database migrations and catalog seed.</p>
  </section>;
}

export function CatalogSetup({ guide = false }: { guide?: boolean }) {
  return <section className={`${s.card} ${s.stack}`}>
    <h2>{guide ? "Guide baseline is not seeded" : "Catalog setup is incomplete"}</h2>
    <p>{guide ? "The database does not contain an editable guide baseline for this milestone. Static guide content has not been silently saved as an administrator revision."
      : "This milestone is not present in the connected database. Editing is unavailable until the Waymark catalog has been seeded."}</p>
    <p className={s.muted}>Ask the project operator to run the reviewed catalog/content seed, then reload this page. No draft or publication has been created here.</p>
  </section>;
}

export function Pagination({ page, hasMore, path, params = {}, keyName = "page" }: {
  page: number; hasMore: boolean; path: string; params?: Record<string, string>; keyName?: string;
}) {
  const href = (next: number) => {
    const query = new URLSearchParams(params);
    query.set(keyName, String(next));
    return `${path}?${query.toString()}`;
  };
  return <nav className={s.pagination} aria-label={keyName === "history" ? "Revision history pages" : "List pages"}>
    {page > 1 ? <Link href={href(page - 1)} prefetch={false}>Previous page</Link> : <span>Start of list</span>}
    <span>Page {page} · up to 25 records</span>
    {hasMore && page < 1000 ? <Link href={href(page + 1)} prefetch={false}>Next page</Link> : <span>End of list</span>}
  </nav>;
}

export function Timestamp({ value }: { value: string | null }) {
  if (!value) return <>Not recorded</>;
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return <>Date unavailable</>;
  return <time dateTime={date.toISOString()}>{date.toISOString().slice(0, 16).replace("T", " ")} UTC</time>;
}
