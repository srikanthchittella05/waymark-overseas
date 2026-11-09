import { Fragment } from "react";
import { ARCHETYPE_SECTIONS } from "@/lib/engine/guides/archetypes";
import type { ExamOption, GuideContent, GuideSubsection, Resource, RoadmapStage, SectionContent } from "@/lib/engine/guides/types";
import { formatPlanDate } from "@/lib/format-date";
import s from "./admin.module.css";

function Details({ entries }: { entries: Array<[string, string | undefined]> }) {
  return <dl className={s.metadata}>{entries.filter(([, value]) => Boolean(value)).map(([label, value]) =>
    <Fragment key={label}><dt>{label}</dt><dd>{value}</dd></Fragment>)}</dl>;
}

function Resources({ resources }: { resources?: Resource[] }) {
  if (!resources?.length) return null;
  return <div className={s.stack}>{resources.map((resource, index) => <article className={s.inset} key={`${resource.title}-${index}`}>
    <h4>{resource.title}</h4><p className={s.prose}>{resource.why}</p>
    <Details entries={[["Type", resource.kind], ["Free to use", resource.free === undefined ? undefined : resource.free ? "Yes" : "No"], ["Cost", resource.cost], ["Verified", formatPlanDate(resource.verifiedOn)]]} />
    {resource.url && <a href={resource.url} target="_blank" rel="noopener noreferrer">Open {resource.title} (new tab)</a>}
  </article>)}</div>;
}

function Exams({ exams }: { exams?: ExamOption[] }) {
  return exams?.map((exam, index) => <article className={s.inset} key={`${exam.name}-${index}`}>
    <h4>{exam.name}</h4><p><strong>{exam.accepted ? "Accepted option" : "Not accepted"}</strong></p>
    <Details entries={[["Required score", exam.requiredScore], ["Note", exam.note], ["Validity", exam.validity], ["How to book", exam.howToBook], ["Lead time", exam.leadTime], ["Cost", exam.cost], ["Verified", formatPlanDate(exam.verifiedOn)]]} />
    {exam.url && <a href={exam.url} target="_blank" rel="noopener noreferrer">Official {exam.name} page (new tab)</a>}
  </article>);
}

function Subsections({ subsections }: { subsections?: GuideSubsection[] }) {
  return subsections?.map((subsection, index) => <article className={s.inset} key={`${subsection.title}-${index}`}>
    <h4>{subsection.title}</h4>
    <Details entries={[["What", subsection.what], ["Format", subsection.format], ["Score", subsection.score], ["Tip", subsection.tip]]} />
    {!!subsection.topics?.length && <><p><strong>Topics</strong></p><ul>{subsection.topics.map((topic, i) => <li key={i}>{topic}</li>)}</ul></>}
    <Resources resources={subsection.resources} />
  </article>);
}

function Roadmap({ stages }: { stages?: RoadmapStage[] }) {
  if (!stages?.length) return null;
  return <ol>{stages.map((stage, index) => <li className={s.inset} key={`${stage.label}-${index}`}>
    <h4>{stage.label} / {stage.title}</h4><p className={s.prose}>{stage.goal}</p>
    <Details entries={[["Effort", stage.hours], ["Checkpoint", stage.checkpoint]]} />
    <ul>{stage.focus.map((focus, i) => <li key={i}>{focus}</li>)}</ul><Resources resources={stage.resources} />
  </li>)}</ol>;
}

function SectionPreview({ content }: { content: SectionContent }) {
  return <>
    {content.body && <p className={s.prose}>{content.body}</p>}
    {!!content.points?.length && <ul>{content.points.map((point, index) => <li key={index}>{point}</li>)}</ul>}
    <Exams exams={content.exams} /><Subsections subsections={content.subsections} /><Roadmap stages={content.roadmap} />
    <Resources resources={content.resources} />
    {content.callout && <aside className={s.note}><p className={s.eyebrow}>{content.callout.tone === "watch" ? "Watch out" : "Good to know"}</p><h4>{content.callout.title}</h4><p className={s.prose}>{content.callout.body}</p></aside>}
  </>;
}

/** All GuideContent fields are represented; no markdown/HTML is executed. */
export function GuidePreview({ guide }: { guide: GuideContent }) {
  return <div className={s.preview}><p className={s.prose}>{guide.intro}</p>
    {ARCHETYPE_SECTIONS[guide.archetype].map((spec) => <section key={spec.id}>
      <p className={s.eyebrow}>{spec.eyebrow}</p><h3>{spec.title}</h3>
      <SectionPreview content={guide.sections[spec.id]} />
    </section>)}
  </div>;
}
