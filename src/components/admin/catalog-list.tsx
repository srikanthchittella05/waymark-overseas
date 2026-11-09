import Link from "next/link";
import { COUNTRY_CYCLES } from "@/lib/engine/country-cycles";
import { adminPageAccess } from "@/lib/admin/access";
import { adminCatalog } from "@/lib/admin/data";
import { pageNumber } from "@/lib/admin/input";
import type { AdminSearchParams } from "@/lib/admin/types";
import { AdminAccessState, AdminDataProblem, AdminHeading, Pagination } from "./chrome";
import s from "./admin.module.css";

export async function AdminCatalogList({ kind, searchParams }: { kind: "guides" | "deadlines"; searchParams: AdminSearchParams }) {
  const access = await adminPageAccess();
  if (access.state !== "ready") return <AdminAccessState state={access.state} />;
  const params = await searchParams;
  const page = pageNumber(params.page);
  const country = typeof params.country === "string" && COUNTRY_CYCLES.some((item) => item.code === params.country) ? params.country : "";
  const title = kind === "guides" ? "Guides" : "Deadlines";
  let catalog;
  try { catalog = await adminCatalog(access.context.client, page, country); }
  catch (error) { return <><AdminHeading title={title}>Reviewed information, versioned changes and a retained history.</AdminHeading><AdminDataProblem error={error} /></>; }
  return <>
    <AdminHeading title={title}>{kind === "guides" ? "Edit complete guide drafts without losing test options, resources, roadmaps or nested details. Publishing is a separate, reviewed action." : "Review sourced timing rules for a country or one intake. Preview the date impact before publishing; existing completions are not removed."}</AdminHeading>
    <form action={`/admin/${kind}`} method="get" className={s.filters}>
      <div className={s.field}><label htmlFor="catalog-country">Destination</label><select className={s.select} id="catalog-country" name="country" defaultValue={country}><option value="">All destinations</option>{COUNTRY_CYCLES.map((item) => <option key={item.code} value={item.code}>{item.name}</option>)}</select></div>
      <button className={s.button}>Filter milestones</button>
    </form>
    {!catalog.rows.length ? <section className={s.empty}><h2 className={s.sectionTitle}>No catalog milestones on this page</h2><p>Check the filter or ask the operator to apply the dedicated Waymark catalog seed. Nothing is being substituted from a sample database.</p></section> :
      <div className={s.tableWrap} tabIndex={0} role="region" aria-label={`${title} catalog, scroll horizontally if needed`}>
        <table className={s.table}><caption>Database-backed milestones. Open one to see its current revision and history.</caption>
          <thead><tr><th scope="col">Milestone</th><th scope="col">Destination</th><th scope="col">{kind === "guides" ? "Guide structure" : "Scope"}</th></tr></thead>
          <tbody>{catalog.rows.map((item) => <tr key={item.id}>
            <td><Link href={`/admin/${kind}/${encodeURIComponent(item.id)}`} prefetch={false}>{item.definition.title}</Link><p className={s.muted}>{item.id}</p></td>
            <td>{COUNTRY_CYCLES.find((value) => value.code === item.country_code)?.name ?? item.country_code}</td>
            <td>{kind === "guides" ? `${item.archetype} · ${item.section_ids.length} sections` : "Country default or specific intake"}</td>
          </tr>)}</tbody>
        </table>
      </div>}
    <Pagination page={page} hasMore={catalog.hasMore} path={`/admin/${kind}`} params={{ country }} />
  </>;
}
