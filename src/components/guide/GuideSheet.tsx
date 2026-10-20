"use client";

import { useEffect, useRef } from "react";
import { useMotionPreferences } from "@/components/providers/MotionProvider";
import type { PlanStep } from "@/lib/engine/plan";
import { CONFIDENCE_LABELS } from "@/lib/engine/plan";
import type {
  ExamOption,
  Guide,
  GuideSubsection,
  Resource,
  ResourceKind,
  RoadmapStage,
  SectionContent,
} from "@/lib/engine/guides/types";
import "./guide.css";

/*
 * The dossier.
 *
 * A sheet over the page, not an expansion inside it: the ladder stays
 * scannable, and the depth has room to breathe. One column, generous measure,
 * numbered eyebrows in the same language the rest of the site uses.
 *
 * Everything the student is promised is here — which test and which score,
 * when to book, what is inside, a roadmap, and materials that each say why
 * they are on the list. And at the foot of it, where the source is and how
 * fresh it is, because a confident number with no provenance is worse than
 * no number.
 */

const RESOURCE_ORDER: ResourceKind[] = [
  "official",
  "book",
  "video",
  "channel",
  "practice",
  "site",
  "app",
  "tool",
  "cost",
];

const RESOURCE_LABELS: Record<ResourceKind, string> = {
  official: "Official",
  book: "Books",
  video: "Video",
  channel: "Channels",
  practice: "Practice tests",
  site: "Sites and courses",
  app: "Apps",
  tool: "Tools",
  cost: "Costs",
};

function host(url?: string): string {
  if (!url) return "";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function Resources({ resources }: { resources: Resource[] }) {
  const grouped = RESOURCE_ORDER.map((kind) => ({
    kind,
    items: resources.filter((resource) => resource.kind === kind),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="guide-resources">
      {grouped.map((group) => (
        <section className="guide-resource-group" key={group.kind}>
          <h4 className="guide-subhead">{RESOURCE_LABELS[group.kind]}</h4>
          <ul className="guide-resource-list">
            {group.items.map((resource) => (
              <li className="guide-resource" key={`${resource.title}-${resource.url ?? ""}`}>
                <p className="guide-resource-title">
                  {resource.url ? (
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                      {resource.title}
                      <span className="guide-resource-host" aria-hidden="true">
                        {host(resource.url)}
                      </span>
                    </a>
                  ) : (
                    resource.title
                  )}
                  {resource.free ? <span className="guide-flag guide-flag-free">free</span> : null}
                  {resource.cost ? <span className="guide-flag">{resource.cost}</span> : null}
                </p>
                <p className="guide-resource-why">{resource.why}</p>
                {resource.verifiedOn ? (
                  <p className="guide-resource-verified">checked {resource.verifiedOn}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function Exams({ exams }: { exams: ExamOption[] }) {
  return (
    <ul className="guide-exams">
      {exams.map((exam) => (
        <li className={`guide-exam${exam.accepted ? "" : " guide-exam-not"}`} key={exam.name}>
          <p className="guide-exam-name">
            {exam.name}
            <span className={`guide-flag${exam.accepted ? "" : " guide-flag-off"}`}>
              {exam.accepted ? "accepted here" : "not accepted here"}
            </span>
          </p>
          {exam.requiredScore ? (
            <p className="guide-exam-row">
              <span className="guide-exam-key">Required score</span>
              <span className="guide-exam-value">{exam.requiredScore}</span>
            </p>
          ) : null}
          {exam.note ? <p className="guide-exam-note">{exam.note}</p> : null}
          {exam.validity ? (
            <p className="guide-exam-row">
              <span className="guide-exam-key">Valid for</span>
              <span className="guide-exam-value">{exam.validity}</span>
            </p>
          ) : null}
          {exam.leadTime ? (
            <p className="guide-exam-row">
              <span className="guide-exam-key">Book it</span>
              <span className="guide-exam-value">{exam.leadTime}</span>
            </p>
          ) : null}
          {exam.howToBook ? (
            <p className="guide-exam-row">
              <span className="guide-exam-key">How to book</span>
              <span className="guide-exam-value">{exam.howToBook}</span>
            </p>
          ) : null}
          {exam.cost ? (
            <p className="guide-exam-row">
              <span className="guide-exam-key">Cost</span>
              <span className="guide-exam-value">{exam.cost}</span>
            </p>
          ) : null}
          {exam.url ? (
            <p className="guide-exam-source">
              <a href={exam.url} target="_blank" rel="noopener noreferrer">
                The official page for {exam.name}
                <span aria-hidden="true"> ↗</span>
              </a>
            </p>
          ) : null}
          {exam.verifiedOn ? (
            <p className="guide-resource-verified">checked {exam.verifiedOn}</p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

function Subsections({ subsections }: { subsections: GuideSubsection[] }) {
  return (
    <div className="guide-subsections">
      {subsections.map((subsection) => (
        <details className="guide-subsection" key={subsection.title}>
          <summary>
            <span className="guide-subsection-title">{subsection.title}</span>
            {subsection.what ? <span className="guide-subsection-what">{subsection.what}</span> : null}
          </summary>
          <div className="guide-subsection-body">
            {subsection.format ? (
              <p className="guide-exam-row">
                <span className="guide-exam-key">Format</span>
                <span className="guide-exam-value">{subsection.format}</span>
              </p>
            ) : null}
            {subsection.score ? (
              <p className="guide-exam-row">
                <span className="guide-exam-key">Scored</span>
                <span className="guide-exam-value">{subsection.score}</span>
              </p>
            ) : null}
            {subsection.topics?.length ? (
              <>
                <h5 className="guide-subhead">What is in it</h5>
                <ul className="guide-topics">
                  {subsection.topics.map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>
              </>
            ) : null}
            {subsection.tip ? <p className="guide-tip">{subsection.tip}</p> : null}
            {subsection.resources?.length ? <Resources resources={subsection.resources} /> : null}
          </div>
        </details>
      ))}
    </div>
  );
}

function Roadmap({ roadmap }: { roadmap: RoadmapStage[] }) {
  return (
    <ol className="guide-roadmap">
      {roadmap.map((stage) => (
        <li className="guide-roadmap-stage" key={stage.label}>
          <p className="guide-roadmap-label">{stage.label}</p>
          <h5 className="guide-roadmap-title">{stage.title}</h5>
          <p className="guide-roadmap-goal">{stage.goal}</p>
          {stage.hours ? <p className="guide-roadmap-hours">{stage.hours}</p> : null}
          {stage.focus.length ? (
            <ul className="guide-roadmap-focus">
              {stage.focus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          {stage.checkpoint ? (
            <p className="guide-roadmap-check">
              <span className="guide-mark" aria-hidden="true" />
              {stage.checkpoint}
            </p>
          ) : null}
          {stage.resources?.length ? <Resources resources={stage.resources} /> : null}
        </li>
      ))}
    </ol>
  );
}

function SectionBody({ content }: { content: SectionContent }) {
  return (
    <>
      {content.body ? <p className="guide-body">{content.body}</p> : null}
      {content.points?.length ? (
        <ul className="guide-points">
          {content.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      ) : null}
      {content.exams ? <Exams exams={content.exams} /> : null}
      {content.subsections ? <Subsections subsections={content.subsections} /> : null}
      {content.roadmap ? <Roadmap roadmap={content.roadmap} /> : null}
      {content.resources ? <Resources resources={content.resources} /> : null}
      {content.callout ? (
        <aside className={`guide-callout guide-callout-${content.callout.tone}`}>
          <p className="guide-callout-title">{content.callout.title}</p>
          <p className="guide-callout-body">{content.callout.body}</p>
        </aside>
      ) : null}
    </>
  );
}

export default function GuideSheet({
  open,
  guide,
  loading,
  steps,
  onClose,
}: {
  open: { milestoneId: string; sectionId: string | null } | null;
  guide: Guide | null;
  loading: boolean;
  steps: PlanStep[];
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const { shouldAnimate } = useMotionPreferences();

  const step = open ? steps.find((item) => item.id === open.milestoneId) : undefined;

  // Focus the panel, keep focus inside it, and close on Escape.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;
    panel.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const active = guide?.sections.find((section) => section.id === open.sectionId);

  return (
    <div className="guide-overlay" data-guide-motion={shouldAnimate ? "on" : "off"}>
      <div
        className="guide-scrim"
        role="presentation"
        onClick={onClose}
        data-guide-scrim
      />
      <div
        className="guide-panel"
        role="dialog"
        aria-modal="true"
        aria-label={step ? `Guide: ${step.title}` : "Guide"}
        tabIndex={-1}
        ref={panelRef}
        data-guide-panel
      >
        <header className="guide-head">
          <p className="guide-eyebrow">
            {step ? `${step.phase} · due ${step.dueDate}` : "Guide"}
          </p>
          <h2 className="guide-title">{step ? step.title : "Guide"}</h2>
          {step ? (
            <p className="guide-meta">
              <span className={`guide-confidence guide-confidence-${step.confidence}`}>
                {CONFIDENCE_LABELS[step.confidence]}
              </span>
              {step.source ? (
                <a href={step.source} target="_blank" rel="noopener noreferrer">
                  The official source
                  <span aria-hidden="true"> ↗</span>
                </a>
              ) : null}
            </p>
          ) : null}
          <button type="button" className="guide-close" onClick={onClose} data-guide-close>
            Close
            <span aria-hidden="true"> ✕</span>
          </button>
        </header>

        <div className="guide-body-scroll" data-guide-scroll>
          {loading ? <p className="guide-loading">Opening the guide…</p> : null}

          {!loading && !guide ? (
            <p className="guide-loading">
              There is no written guide for this milestone yet. The plan, the date and the source
              are still here.
            </p>
          ) : null}

          {guide ? (
            <>
              <p className="guide-intro">{guide.intro}</p>

              {step?.tasks.length ? (
                <section className="guide-section" data-guide-section="tasks">
                  <p className="guide-eyebrow">WHAT THIS INVOLVES</p>
                  <h3 className="guide-section-title">The steps, in order</h3>
                  <ol className="guide-tasks">
                    {step.tasks.map((task) => (
                      <li key={task}>{task}</li>
                    ))}
                  </ol>
                </section>
              ) : null}

              {guide.sections.map((section) => (
                <section
                  className="guide-section"
                  key={section.id}
                  id={`guide-${section.id}`}
                  data-guide-section={section.id}
                  data-guide-active={active?.id === section.id ? "true" : undefined}
                >
                  <p className="guide-eyebrow">{section.eyebrow}</p>
                  <h3 className="guide-section-title">{section.title}</h3>
                  <SectionBody content={section.content} />
                </section>
              ))}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
