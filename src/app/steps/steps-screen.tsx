"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import { useMotionPreferences } from "@/components/providers/MotionProvider";
import { usePlan, usePlanActions } from "@/lib/engine/profile";
import { CONFIDENCE_LABELS, type Plan, type PlanStep } from "@/lib/engine/plan";
import type { Confidence } from "@/lib/engine/country-cycles";
import { formatPlanDate } from "@/lib/format-date";
import GuideProvider from "@/components/guide/GuideProvider";
import GuideLinks from "@/components/guide/GuideLinks";
import PlanPersistenceNotice, { usePlanWriteDisabled } from "@/components/account/PlanPersistenceNotice";
import CheckpointPanel from "@/components/checkpoint/CheckpointPanel";

/*
 * /steps is the whole plan as a checklist: grouped by phase, every date derived
 * backwards from the intake, every dependency named, every source linked.
 *
 * Three things this screen refuses to do — hide a confidence value, hide a
 * source, or let a status be carried by colour alone. Every status ships a shape
 * and a word next to its colour, and every blocked row explains why a tick
 * cannot bypass its prerequisites.
 *
 * Like /today, the server hands us a derived plan for the first paint and the
 * live store takes over once the screen has mounted.
 */

gsap.registerPlugin(useGSAP, ScrollTrigger, CustomEase);

/* Mirrors --dur-slow / --dur and --ease-brand from globals.css. */
const BRAND_EASE = CustomEase.create("waymark-brand", "M0,0 C0.65,0.05 0,1 1,1");
const REVEAL = 0.75;
const SETTLE = 0.6;
const STAGGER = 0.06;

const STATUS_LABELS: Record<PlanStep["status"], string> = {
  now: "Do now",
  next: "Next up",
  later: "Later",
  risk: "Past its date",
  done: "Done",
};

/*
 * Four segments, not six pills. "Open" is everything that is neither settled nor
 * past its date — which is the only split a student actually reads the list by.
 * The old now/next/later trio was three names for the same answer.
 */
const FILTERS = [
  { key: "all", label: "All", statuses: null },
  {
    key: "open",
    label: "Open",
    statuses: ["now", "next", "later"] as const,
  },
  { key: "risk", label: "Past its date", statuses: ["risk"] as const },
  { key: "done", label: "Done", statuses: ["done"] as const },
] as const;

type Filter = (typeof FILTERS)[number]["key"];

const FILTER_LABELS: Record<Filter, string> = {
  all: "All milestones",
  open: "Open milestones",
  risk: "Past its date",
  done: "Done",
};

function matches(filter: Filter, step: PlanStep): boolean {
  const entry = FILTERS.find((candidate) => candidate.key === filter);
  if (!entry || !entry.statuses) return true;
  return (entry.statuses as readonly PlanStep["status"][]).includes(step.status);
}

const CONFIDENCE_NOTES: Record<Confidence, string> = {
  verified: "An official source states this rule, figure or date.",
  typical:
    "A widely reported pattern or a per-university convention — not one central publication.",
  estimate: "Our own planning default. No published deadline exists; check it yourself.",
};

/*
 * What a fixed "hard deadline" flag does and does not mean here: the deadline
 * behind the milestone is not the student's to move, but the date on screen is
 * still intake start minus our own offset. Say so rather than "it does not move".
 */
const HARD_DEADLINE_NOTE =
  "Hard deadline: the date behind this milestone is set by the school or the authority, not by you. Ours is counted back from your intake start — confirm it against the source.";

const EMPTY_COPY: Record<Filter, string> = {
  all: "This intake has no milestones.",
  open: "Nothing open: every milestone is settled or past its date.",
  risk: "Nothing is past its date.",
  done: "Nothing ticked yet.",
};

function countdown(step: PlanStep): string {
  const days = step.daysUntil;
  if (days < 0) {
    const late = Math.abs(days);
    return `${late} ${late === 1 ? "day" : "days"} late`;
  }
  if (days === 0) return "due today";
  if (days === 1) return "due tomorrow";
  return `in ${days} days`;
}

/** Phase names carry spaces and "&"; ids must not. */
function slug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function host(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M4 12h16m-7-7 7 7-7 7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/*
 * "Have we mounted yet?" without a setState-in-effect: the server snapshot is
 * false, so hydration renders exactly the plan the server computed, and the
 * first client snapshot swaps in the live store.
 */
function subscribeToNothing() {
  return () => {};
}
function getMounted() {
  return true;
}
function getServerMounted() {
  return false;
}

/** The store, read after mount only: the live half of the screen. */
function LiveSteps({ today }: { today: Date }) {
  const plan = usePlan(today);
  return <StepsBody plan={plan} />;
}

export default function StepsScreen({
  today,
  initialPlan,
}: {
  today: Date;
  initialPlan: Plan;
}) {
  const { shouldAnimate } = useMotionPreferences();
  const root = useRef<HTMLDivElement>(null);
  const mounted = useSyncExternalStore(subscribeToNothing, getMounted, getServerMounted);

  const { contextSafe } = useGSAP(
    () => {
      if (!shouldAnimate) return;
      gsap.from(".steps-head .steps-mask-inner", {
        yPercent: 112,
        duration: REVEAL,
        stagger: STAGGER,
        ease: BRAND_EASE,
      });
      // Masked lines further down the page reveal when they arrive, not on load.
      gsap.utils.toArray<HTMLElement>("[data-mask-reveal]").forEach((element) => {
        gsap.from(element, {
          yPercent: 112,
          duration: REVEAL,
          ease: BRAND_EASE,
          scrollTrigger: { trigger: element, start: "top 95%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 30,
          duration: SETTLE,
          ease: BRAND_EASE,
          scrollTrigger: { trigger: element, start: "top 94%", once: true },
        });
      });
    },
    { scope: root, dependencies: [shouldAnimate], revertOnUpdate: true },
  );

  const animateFilterResults = contextSafe(() => {
    if (!shouldAnimate) return;
    gsap.fromTo(
      ".steps-results",
      { y: 10 },
      { y: 0, duration: 0.4, ease: BRAND_EASE, overwrite: true, clearProps: "transform" },
    );
  });

  return (
    <div
      className="steps"
      ref={root}
      data-motion={shouldAnimate ? "on" : "off"}
      onClickCapture={(event) => {
        if (!(event.target instanceof Element)) return;
        const button = event.target.closest<HTMLButtonElement>(".steps-filter");
        if (button && button.dataset.active !== "true") animateFilterResults();
      }}
    >
      {mounted ? <LiveSteps today={today} /> : <StepsBody plan={initialPlan} />}
    </div>
  );
}

function StepsBody({ plan }: { plan: Plan }) {
  const { toggleStep } = usePlanActions();
  const writeDisabled = usePlanWriteDisabled();
  const [filter, setFilter] = useState<Filter>("all");
  const [message, setMessage] = useState("");
  const lastFilter = useRef<Filter>(filter);
  const phaseHeadings = useRef(new Map<string, HTMLHeadingElement>());
  const activeFilter = useRef<HTMLButtonElement | null>(null);
  const pendingFocus = useRef<string | null>(null);

  const stepById = useMemo(() => new Map(plan.steps.map((step) => [step.id, step])), [plan.steps]);

  const dependents = useMemo(() => {
    const map = new Map<string, PlanStep[]>();
    for (const step of plan.steps) {
      for (const dependency of step.dependsOn) {
        const existing = map.get(dependency);
        if (existing) existing.push(step);
        else map.set(dependency, [step]);
      }
    }
    return map;
  }, [plan.steps]);

  const openCount = plan.counts.now + plan.counts.next + plan.counts.later;

  const filterCounts = useMemo(
    () =>
      Object.fromEntries(
        FILTERS.map((entry) => [
          entry.key,
          plan.steps.filter((step) => matches(entry.key, step)).length,
        ]),
      ) as Record<Filter, number>,
    [plan.steps],
  );

  const phases = useMemo(
    () =>
      plan.phases
        .map((group) => ({
          phase: group.phase,
          steps: group.steps.filter((step) => matches(filter, step)),
          /*
           * The header counts real progress, so its denominator is the whole
           * phase — under "Open" a filtered list would otherwise claim a phase
           * with seven milestones and one done is "0/1 done".
           */
          total: group.steps.length,
          done: group.steps.filter((step) => step.status === "done").length,
        }))
        .filter((group) => group.steps.length > 0),
    [plan.phases, filter],
  );

  const visible = phases.reduce((total, group) => total + group.steps.length, 0);

  /*
   * The lead is the engine's own ranking — plan.nextStep, the same step /today
   * puts on its card. Deriving it from the list instead (first non-done row in
   * phase order) made this screen contradict /today: it promoted a blocked
   * milestone the engine had already ranked behind an unblocked one.
   */
  const leadId = plan.nextStep?.id ?? null;
  const lead = leadId ? (stepById.get(leadId) ?? null) : null;
  const leadVisible = phases.some((group) => group.steps.some((step) => step.id === leadId));

  /* Only a change of filter announces; a tick has its own message. */
  useEffect(() => {
    if (lastFilter.current === filter) return;
    lastFilter.current = filter;
    setMessage(
      `Showing ${visible} of ${plan.counts.total} milestones — ${FILTER_LABELS[filter]}.` +
        (lead && !leadVisible
          ? ` The step to do next, ${lead.title}, is not in this view.`
          : ""),
    );
  }, [filter, visible, lead, leadVisible, plan.counts.total, stepById]);

  /*
   * Focus repair. Ticking a row can remove it from the list — under "Open" the
   * row leaves, and under "Done" unticking removes it — which leaves the browser
   * focused on <body>. Hand focus to the phase it belonged to, or to the filter
   * that produced the list, so a keyboard user keeps their place.
   */
  useEffect(() => {
    const phase = pendingFocus.current;
    if (!phase) return;
    pendingFocus.current = null;
    const active = document.activeElement;
    // WebKit can move focus to the skip-link target <main> when a focused row
    // disappears; that is also a lost control, not an intentional next step.
    if (active && active !== document.body && active !== document.documentElement && active.id !== "main-content") return;
    const target = phaseHeadings.current.get(phase) ?? activeFilter.current;
    if (!target) return;
    const box = target.getBoundingClientRect();
    const offScreen =
      box.bottom <= 0 ||
      box.top >= window.innerHeight ||
      box.right <= 0 ||
      box.left >= window.innerWidth;
    target.focus({ preventScroll: true });
    if (offScreen) target.scrollIntoView({ block: "nearest" });
  });

  return (
  <GuideProvider steps={plan.steps}>
      <>
        <p className="sr-only" role="status">
          {message}
        </p>

        <section className="steps-head" aria-labelledby="steps-title">
          <h1 className="steps-title" id="steps-title">
            <span className="steps-mask">
              <span className="steps-mask-inner">Every step,</span>
            </span>
            <span className="steps-mask">
              <span className="steps-mask-inner serif">dated backwards.</span>
            </span>
          </h1>

          {/* One context line. "Change target" lives here, quiet. */}
          <p className="steps-context">
            {plan.country.name} · {plan.intake.label} · dated back from{" "}
            <time dateTime={plan.intake.startDate}>{formatPlanDate(plan.intake.startDate)}</time> ·{" "}
            <Link className="steps-underline steps-target" href="/path">
              Change target <Arrow />
            </Link>
          </p>

          {/*
            One number, then one demoted row of small text. Four equal tiles gave
            every fact the same weight, so nothing led. The facts that are not
            progress survive as text, not as a second row of boxes.
          */}
          <p className="steps-figure">
            <span className="steps-figure-number">{openCount}</span>
            <span className="steps-figure-unit">open of {plan.counts.total} milestones</span>
          </p>

          <p className="steps-micro">
            {/*
              "0 done" reports nothing a student can act on, so it only appears
              once there is progress to report. The filter counts carry the rest.
            */}
            {plan.counts.done > 0 ? (
              <>
                <span>
                  <strong>{plan.counts.done}</strong> done
                </span>
                <span aria-hidden="true">·</span>
              </>
            ) : null}
            <span data-signal={plan.counts.risk > 0 || undefined}>
              <strong>{plan.counts.risk}</strong> past {plan.counts.risk === 1 ? "its date" : "their date"}
            </span>
            <span aria-hidden="true">·</span>
            <span>
              <strong>{plan.counts.verified}</strong> of {plan.counts.total} verified — an official
              source states the rule, figure or date
            </span>
            <span aria-hidden="true">·</span>
            <span>
              {plan.country.name} admission is {plan.country.admission === "rolling" ? "rolling" : "fixed"}
              {" — "}
              {plan.country.admission === "rolling"
                ? "earlier is better, but the selective programmes inside it still publish one late deadline for their main intake"
                : "one deadline closes the round"}
            </span>
          </p>
        </section>
        <PlanPersistenceNotice />

        <section className="steps-filterbar" aria-labelledby="filter-title" data-reveal>
          <h2 className="sr-only" id="filter-title">
            Filter milestones
          </h2>
          {/* One segmented object, not six pills. */}
          <div className="steps-filters" role="group" aria-label="Filter milestones by status">
            {FILTERS.map((entry) => {
              const active = filter === entry.key;
              return (
                <button
                  key={entry.key}
                  type="button"
                  className="steps-filter"
                  aria-pressed={active}
                  data-active={active}
                  data-kind={entry.key}
                  ref={active ? activeFilter : undefined}
                  onClick={() => setFilter(entry.key)}
                >
                  <span className="steps-filter-label">{entry.label}</span>
                  <span className="steps-filter-count" key={`${active}-${filterCounts[entry.key]}`}>
                    {filterCounts[entry.key]}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* The result surface stays mounted: filtering keeps surviving disclosures
            open and leaves keyboard focus on the chosen segment. */}
        <div className="steps-results">
          {phases.length === 0 ? (
            <p className="steps-empty">
              {filter === "all" ? "This intake has no milestones." : EMPTY_COPY[filter]}
            </p>
          ) : (
            phases.map((group) => (
              <section className="steps-phase" key={group.phase} aria-labelledby={`phase-${slug(group.phase)}`}>
                <div className="steps-phase-head">
                  <h2
                    className="steps-phase-title"
                    id={`phase-${slug(group.phase)}`}
                    tabIndex={-1}
                    ref={(element) => {
                      if (element) phaseHeadings.current.set(group.phase, element);
                      else phaseHeadings.current.delete(group.phase);
                    }}
                  >
                    {group.phase}
                  </h2>
                  <p className="steps-phase-count">
                    {group.done}/{group.total} done
                  </p>
                </div>

                <ul className="steps-list">
                  {group.steps.map((step) => {
                    const isDone = step.status === "done";
                    const isLead = step.id === leadId;
                    const waitingOn = step.blockers
                      .map((id) => stepById.get(id))
                      .filter((dependency): dependency is PlanStep => Boolean(dependency));
                    const opens = dependents.get(step.id) ?? [];
                    const completedDependents = opens.filter((dependent) => dependent.status === "done");
                    return (
                      <li
                        className="steps-row"
                        key={step.id}
                        data-status={step.status}
                        data-done={isDone}
                        data-lead={isLead || undefined}
                      >
                        <div className="steps-row-head">
                          <input
                            className="steps-box"
                            type="checkbox"
                            id={`step-${step.id}`}
                            checked={isDone}
                            disabled={writeDisabled || (!isDone && waitingOn.length > 0) || (isDone && completedDependents.length > 0)}
                            aria-describedby={waitingOn.length > 0 ? `step-gate-${step.id}` : completedDependents.length > 0 ? `step-gate-dependents-${step.id}` : undefined}
                            onChange={async () => {
                              /*
                               * A tick can remove this row from the current filter,
                               * so the phase it belonged to takes the focus back.
                               */
                              if (!await toggleStep(step.id)) return;
                              pendingFocus.current = group.phase;
                              setMessage(isDone ? `Reopened ${step.title}.` : `Marked ${step.title} done.`);
                            }}
                          />
                          <h3 className="steps-row-title">
                            {isLead ? <span className="steps-row-lead">Do this next</span> : null}
                            <label htmlFor={`step-${step.id}`}>{step.title}</label>
                          </h3>
                          <p className="steps-row-state">
                            <span className="steps-mark" data-status={step.status} aria-hidden="true" />
                            <span className="steps-mark-word">{STATUS_LABELS[step.status]}</span>
                            <span className="steps-mark-when">{countdown(step)}</span>
                          </p>
                        </div>

                        <p className="steps-row-summary">{step.summary}</p>

                        <GuideLinks milestoneId={step.id} className="steps-row-guides" />

                        <div className="steps-row-meta" id={`step-meta-${step.id}`}>
                          <p className="steps-meta">
                            <span className="steps-meta-key">Due</span>
                            <span className="steps-meta-value">
                              {formatPlanDate(step.dueDate)}
                              {step.hardDeadline ? (
                                <span className="steps-flag steps-flag-hard">hard deadline</span>
                              ) : null}
                            </span>
                          </p>
                          <p className="steps-meta">
                            <span className="steps-meta-key">Source</span>
                            <span className="steps-meta-value">
                              <span className={`steps-confidence steps-confidence-${step.confidence}`}>
                                {CONFIDENCE_LABELS[step.confidence]}
                              </span>
                              <a
                                className="steps-underline"
                                href={step.source}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={step.source}
                                aria-label={`${CONFIDENCE_LABELS[step.confidence]} source at ${host(step.source)}: ${step.source} — opens in a new tab`}
                              >
                                {host(step.source)} <Arrow />
                              </a>
                            </span>
                          </p>
                          <p className="steps-confidence-note">{CONFIDENCE_NOTES[step.confidence]}</p>
                          {step.hardDeadline ? (
                            <p className="steps-confidence-note">{HARD_DEADLINE_NOTE}</p>
                          ) : null}
                          {waitingOn.length > 0 ? (
                            <p className="steps-waiting" id={`step-gate-${step.id}`}>
                              <span className="steps-mark" data-status="later" aria-hidden="true" />
                              <span>
                                <strong className="steps-waiting-key">
                                  Waiting on{waitingOn.length === 1 ? "" : ` ${waitingOn.length}`}:
                                </strong>{" "}
                                {waitingOn.map((dependency, index) => (
                                  <span key={dependency.id}>
                                    {index > 0 ? ", " : ""}
                                    {dependency.title}
                                  </span>
                                ))}
                                {". Finish the prerequisites before marking this milestone done. You can still prepare and record evidence."}
                              </span>
                            </p>
                          ) : null}
                          {completedDependents.length > 0 ? <p className="steps-waiting" id={`step-gate-dependents-${step.id}`}>
                            Reopen {completedDependents.map((dependent) => dependent.title).join(", ")} first before reopening this prerequisite.
                          </p> : null}
                          {waitingOn.length === 0 && opens.length > 0 ? (
                            <p className="steps-waiting">
                              <span className="steps-mark" data-status="next" aria-hidden="true" />
                              <span>
                                {opens.length} {opens.length === 1 ? "milestone is" : "milestones are"}{" "}
                                dated from this one:{" "}
                                {opens.map((open, index) => (
                                  <span key={open.id}>
                                    {index > 0 ? ", " : ""}
                                    {open.title}
                                  </span>
                                ))}
                              </span>
                            </p>
                          ) : null}
                        </div>

                        <details className="steps-tasks">
                          <summary className="steps-tasks-summary">
                            <span className="steps-tasks-chevron" aria-hidden="true">→</span>
                            The steps, in order
                          </summary>
                          <ol className="steps-task-list">
                            {step.tasks.map((task, index) => (
                              <li key={`${step.id}-task-${index}`}>{task}</li>
                            ))}
                          </ol>
                        </details>
                        <div className="steps-checkpoint"><CheckpointPanel step={step}
                          lockedByDependents={completedDependents.length > 0}
                          onSkip={() => {
                            pendingFocus.current = group.phase;
                            setMessage(`Skipped ${step.title} with a reason. It does not count as done.`);
                          }} /></div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))
          )}
        </div>

        <section className="steps-band" aria-labelledby="steps-band-title" data-reveal>
          <h2 className="steps-band-title" id="steps-band-title">
            <span className="steps-mask">
              <span className="steps-mask-inner" data-mask-reveal>
                Read the source,
              </span>
            </span>
            <span className="steps-mask">
              <span className="steps-mask-inner serif" data-mask-reveal>
                then trust the date.
              </span>
            </span>
          </h2>
          {/* The verified/typical/estimate distinction itself. The mechanics of how
              to find them are already on every row, so they are not restated. */}
          <p className="steps-band-copy">
            <strong>Verified</strong> means an official source states the rule, figure or date.{" "}
            <strong>Typical</strong> means a reported pattern. <strong>Estimate</strong> means our own
            planning assumption.
          </p>
          <nav className="steps-next" aria-label="Where to go next">
            <Link className="steps-underline" href="/today">
              What should I do next <Arrow />
            </Link>
            <Link className="steps-underline" href="/route">
              See the route <Arrow />
            </Link>
          </nav>
        </section>
      </>
  </GuideProvider>
  );
}
