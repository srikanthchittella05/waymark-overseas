import { notFound } from "next/navigation";
import { adminPageAccess } from "@/lib/admin/access";
import { revisionWorkspace } from "@/lib/admin/data";
import { publicationImpact } from "@/lib/admin/impact";
import { pageNumber } from "@/lib/admin/input";
import type { AdminSearchParams } from "@/lib/admin/types";
import { MILESTONE_ARCHETYPE } from "@/lib/engine/guides/archetypes";
import { guideFor } from "@/lib/engine/guides/content";
import { parseGuideContent } from "@/lib/platform/validation";
import { AdminAccessState, AdminDataProblem, AdminHeading, CatalogSetup } from "@/components/admin/chrome";
import { GuideEditor } from "@/components/admin/guide-editor";
import { GuidePreview } from "@/components/admin/guide-preview";
import { RevisionHistory, RevisionReview } from "@/components/admin/revision-history";
import s from "@/components/admin/admin.module.css";

export const instant = false;

export default async function AdminGuidePage({ params, searchParams }: {
  params: Promise<{ milestoneId: string }>; searchParams: AdminSearchParams;
}) {
  const access = await adminPageAccess();
  if (access.state !== "ready") return <AdminAccessState state={access.state} />;
  const { milestoneId } = await params;
  if (!Object.prototype.hasOwnProperty.call(MILESTONE_ARCHETYPE, milestoneId)) notFound();
  const page = pageNumber((await searchParams).history);
  let workspace;
  try { workspace = await revisionWorkspace(access.context.client, "guide", milestoneId, null, page); }
  catch (error) { return <><AdminHeading title="Guide editor" back={{ href: "/admin/guides", label: "All guides" }}>Only validated, database-backed guide revisions can be edited.</AdminHeading><AdminDataProblem error={error} /></>; }
  if (!workspace) return <><AdminHeading title="Guide editor" back={{ href: "/admin/guides", label: "All guides" }}>Catalog connection required.</AdminHeading><CatalogSetup /></>;
  const heading = <AdminHeading title={workspace.milestone.definition.title} back={{ href: "/admin/guides", label: "All guides" }}>{milestoneId} · Whole guide · {workspace.milestone.archetype}</AdminHeading>;
  if (!workspace.latest) {
    const baseline = await guideFor(milestoneId);
    const guide = baseline ? parseGuideContent(milestoneId, { archetype: baseline.archetype, intro: baseline.intro,
      sections: Object.fromEntries(baseline.sections.map((section) => [section.id, section.content])) }) : null;
    return <>{heading}<div className={s.stack}><CatalogSetup guide />{guide && <section className={s.card}><h2>Read-only static reference</h2><p className={s.muted}>This is the existing bundled guide, not a database draft. It cannot be saved from this setup state.</p><details className={s.details}><summary>Preview static guide baseline</summary><GuidePreview guide={guide} /></details></section>}</div></>;
  }
  let initial;
  try { initial = parseGuideContent(milestoneId, workspace.latest.payload); }
  catch (error) { return <>{heading}<AdminDataProblem error={error} /></>; }
  const impact = await publicationImpact();
  return <>{heading}<div className={s.stack}>
    <GuideEditor milestoneId={milestoneId} latestId={workspace.latest.id} initial={initial} />
    <RevisionReview revision={workspace.latest} impact={impact} />
    <RevisionHistory rows={workspace.history.rows} latestId={workspace.latest.id} page={page} hasMore={workspace.history.hasMore} path={`/admin/guides/${milestoneId}`} intakeId={null} />
  </div></>;
}
