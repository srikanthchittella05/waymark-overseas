import { notFound } from "next/navigation";
import { adminPageAccess } from "@/lib/admin/access";
import { revisionWorkspace } from "@/lib/admin/data";
import { publicationImpact } from "@/lib/admin/impact";
import { pageNumber } from "@/lib/admin/input";
import type { AdminSearchParams } from "@/lib/admin/types";
import { COUNTRY_CYCLES } from "@/lib/engine/country-cycles";
import { deadlineValueSchema } from "@/lib/platform/validation";
import { AdminAccessState, AdminDataProblem, AdminHeading, CatalogSetup } from "@/components/admin/chrome";
import { DeadlineEditor } from "@/components/admin/deadline-editor";
import { RevisionHistory, RevisionReview } from "@/components/admin/revision-history";
import s from "@/components/admin/admin.module.css";

export const instant = false;

export default async function AdminDeadlinePage({ params, searchParams }: {
  params: Promise<{ milestoneId: string }>; searchParams: AdminSearchParams;
}) {
  const access = await adminPageAccess();
  if (access.state !== "ready") return <AdminAccessState state={access.state} />;
  const { milestoneId } = await params;
  const country = COUNTRY_CYCLES.find((item) => item.milestones.some((milestone) => milestone.id === milestoneId));
  if (!country) notFound();
  const query = await searchParams;
  const intakeId = typeof query.intake === "string" && query.intake ? query.intake : null;
  if (intakeId !== null && !country.intakes.some((intake) => intake.id === intakeId)) notFound();
  const page = pageNumber(query.history);
  let workspace;
  try { workspace = await revisionWorkspace(access.context.client, "deadline", milestoneId, intakeId, page); }
  catch (error) { return <><AdminHeading title="Deadline editor" back={{ href: "/admin/deadlines", label: "All deadlines" }}>Only validated, database-backed timing rules can be edited.</AdminHeading><AdminDataProblem error={error} /></>; }
  if (!workspace) return <><AdminHeading title="Deadline editor" back={{ href: "/admin/deadlines", label: "All deadlines" }}>Catalog connection required.</AdminHeading><CatalogSetup /></>;
  const heading = <AdminHeading title={workspace.milestone.definition.title} back={{ href: "/admin/deadlines", label: "All deadlines" }}>{country.name} · {milestoneId} · {intakeId ? workspace.intakes.find((intake) => intake.id === intakeId)?.label : "Country-wide default"}</AdminHeading>;
  let initial;
  if (workspace.latest) {
    const value = deadlineValueSchema.safeParse(workspace.latest.payload);
    if (!value.success) return <>{heading}<AdminDataProblem error={value.error} /></>;
    initial = value.data;
  } else {
    const fallback = workspace.publishedDeadlines.find((revision) => revision.intakeId === null)?.value;
    initial = fallback ? { ...fallback, dueDate: undefined } : {
      offsetDays: workspace.milestone.definition.offsetDays, hardDeadline: workspace.milestone.definition.hardDeadline,
      source: workspace.milestone.definition.source, confidence: workspace.milestone.definition.confidence, verifiedOn: "",
    };
  }
  const impact = await publicationImpact();
  return <>{heading}<div className={s.stack}>
    <form className={s.filters} action={`/admin/deadlines/${milestoneId}`} method="get">
      <div className={s.field}><label htmlFor="deadline-scope">Revision scope</label><select className={s.select} id="deadline-scope" name="intake" defaultValue={intakeId ?? ""}><option value="">Country-wide planning default</option>{workspace.intakes.map((intake) => <option value={intake.id} key={intake.id}>{intake.label}</option>)}</select></div>
      <button className={`${s.button} ${s.secondary}`}>Open scope</button>
    </form>
    <p className={s.note}>Each intake override has independent revision history. A published intake override takes precedence over a country default. Changing scope navigates away: save any draft first.</p>
    <DeadlineEditor key={`${milestoneId}:${intakeId ?? "default"}`} milestoneId={milestoneId} intakeId={intakeId} latestId={workspace.latest?.id ?? null}
      initial={initial} milestone={workspace.milestone.definition} intakes={workspace.intakes} published={workspace.publishedDeadlines} />
    <RevisionReview revision={workspace.latest} impact={impact} deadline={{ milestone: workspace.milestone.definition, intakes: workspace.intakes, published: workspace.publishedDeadlines }} />
    <RevisionHistory rows={workspace.history.rows} latestId={workspace.latest?.id ?? null} page={page} hasMore={workspace.history.hasMore} path={`/admin/deadlines/${milestoneId}`} intakeId={intakeId} />
  </div></>;
}
