"use client";

import { useEffect, useRef, type RefObject } from "react";
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

function isAvailable(element: HTMLElement): boolean {
  if (element.matches(":disabled") || element.closest("[hidden]") ||
      !element.getClientRects().length || getComputedStyle(element).visibility !== "visible") return false;
  // showModal escapes inherited inertness, but never explicit inertness inside
  // the dialog. Do not mistake an outside ancestor for a disabled panel.
  for (let node: HTMLElement | null = element; node; node = node.parentElement) {
    if (node.inert) return false;
    if (node.matches("dialog:modal")) break;
  }
  // Closed-details descendants can retain layout boxes in some engines. Only
  // the first summary (and its contents) participates in keyboard navigation.
  for (let details = element.closest("details:not([open])"); details; details = details.parentElement?.closest("details:not([open])") ?? null) {
    const summary = Array.from(details.children).find((child) => child.tagName === "SUMMARY");
    if (!summary?.contains(element)) return false;
  }
  return true;
}

function tabStops(panel: HTMLElement): HTMLElement[] {
  return Array.from(panel.querySelectorAll<HTMLElement>(
    'a[href], button, input, select, textarea, summary, [tabindex]',
  )).filter((element) => element.tabIndex >= 0 && isAvailable(element));
}

function focusInside(target: HTMLElement, scroll: HTMLElement) {
  target.focus({ preventScroll: true });
  if (!scroll.contains(target)) return;
  const bounds = scroll.getBoundingClientRect();
  const box = target.getBoundingClientRect();
  if (box.top < bounds.top) scroll.scrollTop += box.top - bounds.top;
  else if (box.bottom > bounds.bottom) scroll.scrollTop += box.bottom - bounds.bottom;
}

export default function GuideSheet({
  open,
  guide,
  loading,
  steps,
  onClose,
  onSelectSection,
  returnFocusRef,
}: {
  open: { milestoneId: string; sectionId: string | null } | null;
  guide: Guide | null;
  loading: boolean;
  steps: PlanStep[];
  onClose: () => void;
  onSelectSection: (milestoneId: string, sectionId: string) => void;
  returnFocusRef: RefObject<HTMLElement | null>;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { shouldAnimate } = useMotionPreferences();
  const isOpen = Boolean(open);
  const sectionId = open?.sectionId;

  const step = open ? steps.find((item) => item.id === open.milestoneId) : undefined;

  // The native top layer isolates *all* background content, even though this
  // provider is nested inside main/animated ancestors. Never inert an ancestor
  // of the sheet, which would also disable the sheet and its controls.
  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    const panel = panelRef.current;
    const scroll = scrollRef.current;
    if (!dialog || !panel || !scroll) return;
    const opener = returnFocusRef.current;
    const overflow = [document.documentElement, document.body].flatMap((element) =>
      ["overflow-x", "overflow-y"].map((property) => {
        const value = element.style.getPropertyValue(property);
        const priority = element.style.getPropertyPriority(property);
        element.style.setProperty(property, "hidden", "important");
        return { element, property, value, priority };
      }),
    );
    // Restore explicitly with preventScroll, not the UA's potentially stale
    // previously-focused element (notably pointer activation in Safari).
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    dialog.showModal();
    panel.focus({ preventScroll: true });
    let lastFocus: HTMLElement = panel;

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
      const stops = tabStops(panel);
      const index = stops.findIndex((element) => element === document.activeElement);
      const active = document.activeElement;
      // Section headings are intentionally focusable only programmatically.
      // Continue from their DOM position rather than restarting at the header.
      if (index === -1 && active && active !== panel && panel.contains(active)) {
        const direction = event.shiftKey ? Node.DOCUMENT_POSITION_PRECEDING : Node.DOCUMENT_POSITION_FOLLOWING;
        const adjacent = stops.filter((element) => (active.compareDocumentPosition(element) & direction) !== 0);
        const target = event.shiftKey ? adjacent.at(-1) : adjacent[0];
        event.preventDefault();
        focusInside(target ?? (event.shiftKey ? stops.at(-1) : stops[0]) ?? panel, scroll);
        return;
      }
      // Own the entire Tab sequence, not just its endpoints. Engines differ
      // in which links native Tab visits; none may escape a modal to chrome.
      event.preventDefault();
      const next = index === -1 ? (event.shiftKey ? stops.at(-1) : stops[0])
        : stops[(index + (event.shiftKey ? -1 : 1) + stops.length) % stops.length];
      focusInside(next ?? panel, scroll);
    };
    const onFocus = (event: FocusEvent) => {
      if (event.target instanceof HTMLElement && panel.contains(event.target)) {
        lastFocus = event.target;
      } else {
        // Covers programmatic focus, the initial container, and controls removed
        // while loading or collapsing a disclosure. Native inert blocks most
        // outside attempts before they reach this defensive guard.
        focusInside(panel.contains(lastFocus) && isAvailable(lastFocus) ? lastFocus : panel, scroll);
      }
    };
    document.addEventListener("keydown", onKey, true);
    document.addEventListener("focusin", onFocus, true);
    return () => {
      document.removeEventListener("keydown", onKey, true);
      document.removeEventListener("focusin", onFocus, true);
      if (dialog.open) dialog.close();
      overflow.forEach(({ element, property, value, priority }) => {
        if (value) element.style.setProperty(property, value, priority);
        else element.style.removeProperty(property);
      });
      const active = document.activeElement;
      // Navigation/unmount must not steal meaningful focus on a new page or
      // attempt to focus a removed, disabled, hidden or already-inert opener.
      if (opener?.isConnected && isAvailable(opener) &&
          (!active || active === document.body || active === document.documentElement || dialog.contains(active))) {
        opener.focus({ preventScroll: true });
      }
    };
  }, [isOpen, returnFocusRef]);

  // Wait for the validated response and committed layout. Only this scroll
  // region moves; scrollIntoView could also move main/Lenis ancestors. Offset
  // geometry ignores the sheet/section entrance transforms. Immediate jumps
  // work identically with reduced motion and never leave a smooth-scroll job.
  useEffect(() => {
    if (!open) return;
    const scroll = scrollRef.current;
    const panel = panelRef.current;
    if (!scroll || !panel) return;
    if (loading || !guide || !open.sectionId) {
      if (guide && !open.sectionId) panel.focus({ preventScroll: true });
      scroll.scrollTop = 0;
      return;
    }
    const frame = requestAnimationFrame(() => {
      const section = Array.from(scroll.querySelectorAll<HTMLElement>("[data-guide-section]"))
        .find((element) => element.dataset.guideSection === open.sectionId);
      if (!section) {
        panel.focus({ preventScroll: true });
        scroll.scrollTop = 0;
        return;
      }
      section.querySelector<HTMLElement>("h3")?.focus({ preventScroll: true });
      scroll.scrollTop = Math.max(0, section.offsetTop - 16);
    });
    return () => cancelAnimationFrame(frame);
  }, [open, guide, loading]);

  if (!open) return null;

  const active = guide?.sections.find((section) => section.id === open.sectionId);

  return (
    <dialog
      className="guide-overlay"
      ref={dialogRef}
      aria-modal="true"
      aria-label={step ? `Guide: ${step.title}` : "Guide"}
      data-guide-motion={shouldAnimate ? "on" : "off"}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
    >
      <div
        className="guide-scrim"
        role="presentation"
        onClick={onClose}
        data-guide-scrim
      />
      <div
        className="guide-panel"
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

        <div className="guide-body-scroll" data-guide-scroll data-lenis-prevent ref={scrollRef} aria-busy={loading}>
          {loading ? <p className="guide-loading" role="status">Opening the guide…</p> : null}

          {!loading && !guide ? (
            <p className="guide-loading" role="alert">
              This guide could not be loaded. Close it and try again. The plan and
              its source remain available; no unpublished guide is shown.
            </p>
          ) : null}

          {guide ? (
            <>
              <p className="guide-intro">{guide.intro}</p>

              {sectionId && !active ? (
                <p className="guide-loading" role="status">That section is not available in this guide. The published sections are shown below.</p>
              ) : null}
              <nav className="guide-links guide-section-links" aria-label="Sections in this guide">
                {guide.sections.map((section) => (
                  <button
                    className="guide-link"
                    key={section.id}
                    type="button"
                    aria-current={active?.id === section.id ? "location" : undefined}
                    onClick={() => onSelectSection(open.milestoneId, section.id)}
                  >
                    {section.navLabel}
                  </button>
                ))}
              </nav>

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
                  <h3 className="guide-section-title" tabIndex={-1}>{section.title}</h3>
                  <SectionBody content={section.content} />
                </section>
              ))}
            </>
          ) : null}
        </div>
      </div>
    </dialog>
  );
}
