"use client";

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { CSSProperties, KeyboardEvent } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import {
  CONFIDENCE_LABELS,
  daysBetween,
  todayIso,
  type Plan,
  type PlanStep,
} from "@/lib/engine/plan";
import { usePlan, usePlanActions, useProfile } from "@/lib/engine/profile";
import { formatPlanDate } from "@/lib/format-date";
import GuideProvider from "@/components/guide/GuideProvider";
import GuideLinks from "@/components/guide/GuideLinks";
import { useMotionPreferences } from "@/components/providers/MotionProvider";

/*
 * The graph, drawn by hand rather than with a node-graph library.
 *
 * Every milestone already carries a date, and exactly one date — the intake
 * start — is the thing the whole plan radiates backwards from. So position
 * here means a date, not a layout slot, and each edge is a date-to-date
 * relationship. A generic node library would throw the dating away, ship its
 * own chrome and hand us a keyboard model we would then have to fight.
 */

/** T-300 / T / T+60, with a real minus sign rather than a hyphen. */
function countdown(offsetDays: number): string {
  if (offsetDays === 0) return "T";
  return offsetDays > 0 ? `T−${offsetDays}` : `T+${Math.abs(offsetDays)}`;
}

function countdownWords(step: PlanStep): string {
  if (step.offsetDays === 0) return "on the intake start date";
  if (step.offsetDays > 0) return `${step.offsetDays} days before departure`;
  return `${Math.abs(step.offsetDays)} days after the intake starts`;
}

const STATUS_WORD: Record<PlanStep["status"], string> = {
  done: "Done",
  now: "Now",
  next: "Next",
  later: "Later",
  risk: "At risk",
};

const CONFIDENCE_NOTE: Record<PlanStep["confidence"], string> = {
  verified:
    "An official admissions or immigration page states the rule, the figure or the date quoted here. Read it yourself before you rely on it — official pages change.",
  typical:
    "A widely reported pattern, or a per-university convention, with no single central publication. Treat this date as a planning default.",
  estimate:
    "We inferred this. No official page publishes this date, or the rule is institution-specific and cannot be generalised. Treat it as a target to check, not as a fact.",
};

/*
 * One wording for the flag everywhere it appears. The date itself is always
 * arithmetic — intake start minus an offset — and country-cycles.ts is explicit
 * that `verified` never means "this offset is officially published". So the chip
 * says what the app actually knows: this is the date to treat as immovable when
 * planning, not a published cliff date.
 */
const HARD_LABEL = "Hard target";

const HARD_NOTE =
  "Hard target — plan to this date and work back from it. It is counted back from your intake start rather than published, so check the source before you rely on it.";

/* Glyphs are the redundant channel beside the status word, so status is never
   carried by colour alone. */
function StatusGlyph({ status }: { status: PlanStep["status"] }) {
  const box = { width: 16, height: 16, viewBox: "0 0 16 16", "aria-hidden": true } as const;
  if (status === "done") {
    return (
      <svg {...box}>
        <circle cx="8" cy="8" r="7" fill="var(--color-forest)" />
        <path
          d="M4.6 8.3 6.9 10.6 11.4 5.8"
          fill="none"
          stroke="var(--color-halfwhite)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (status === "now") {
    return (
      <svg {...box}>
        <path d="M8 0.6 15.4 8 8 15.4 0.6 8Z" fill="var(--color-forest)" />
      </svg>
    );
  }
  if (status === "next") {
    return (
      <svg {...box}>
        <circle cx="8" cy="8" r="6.4" fill="none" stroke="var(--color-ink-soft)" strokeWidth="2" />
      </svg>
    );
  }
  if (status === "risk") {
    return (
      <svg {...box}>
        <path d="M8 0.8 15.5 14.8H0.5Z" fill="var(--color-signal)" />
        <path d="M8 5.6v4.2" stroke="var(--color-halfwhite)" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="8" cy="12.1" r="0.95" fill="var(--color-halfwhite)" />
      </svg>
    );
  }
  return (
    <svg {...box}>
      <path d="M8 2 14 8 8 14 2 8Z" fill="none" stroke="var(--color-ink-soft)" strokeWidth="1.7" />
    </svg>
  );
}

function ExternalArrow() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
      <path
        d="M2.5 9.5 9.5 2.5M4.4 2.5h5.1v5.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
      <path
        d="M1 7h11M8 2.6 12.4 7 8 11.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TickMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <rect x="1" y="1" width="3" height="14" fill="var(--color-signal)" />
      <rect x="6" y="1" width="3" height="14" fill="var(--color-signal)" />
    </svg>
  );
}

type Point = { x: number; y: number };
type Box = { w: number; h: number; originX: number; trackLeft: number };
type Edge = { key: string; from: string; to: string; d: string; met: boolean };

function tickStyle(percent: number): CSSProperties {
  return { "--tick": `${percent}%` } as CSSProperties;
}

/*
 * Two beats, identical to /today and /steps: the server snapshot is false, so
 * hydration renders exactly the plan and date the server used, and the first
 * client snapshot flips it to true. The clock is only ever read on the client —
 * `mounted` is false for the whole server render — which is also what keeps
 * `new Date()` out of the prerender path.
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

export default function RouteGraph({
  today,
  initialPlan,
}: {
  today: Date;
  initialPlan: Plan;
}) {
  const { toggleStep } = usePlanActions();
  const { shouldAnimate } = useMotionPreferences();

  const mounted = useSyncExternalStore(subscribeToNothing, getMounted, getServerMounted);
  /* The server's clock for the first paint and for hydration; the browser's own
     clock from the first post-mount render on, so a stale server status can
     never be the one that stays on screen. */
  const now = useMemo(() => (mounted ? new Date() : today), [mounted, today]);
  const livePlan = usePlan(now);
  /* The object the server computed is what hydrates, so the DOM cannot disagree
     with the HTML that was sent. */
  const plan = mounted ? livePlan : initialPlan;
  const { done } = useProfile();

  const screenRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLOListElement | null>(null);
  const measureRef = useRef<() => void>(() => undefined);
  /* Motion targets are refs, not selector strings: they resolve on the frame
     the effect runs and cannot be scoped away by a context that was created
     before the tree existed. */
  const lineRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const rulerRef = useRef<HTMLSpanElement | null>(null);
  const edgesRef = useRef<SVGSVGElement | null>(null);

  const [picked, setPicked] = useState<string | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const [points, setPoints] = useState<Record<string, Point>>({});
  const [box, setBox] = useState<Box | null>(null);
  const [announcement, setAnnouncement] = useState("");

  /* Ticking a milestone off is the only source of "done" — never a date. */
  const ordered = useMemo(
    () =>
      [...plan.steps].sort(
        (a, b) => a.dueDate.localeCompare(b.dueDate) || a.id.localeCompare(b.id),
      ),
    [plan.steps],
  );
  const byId = useMemo(() => new Map(ordered.map((step) => [step.id, step])), [ordered]);
  const orderKey = useMemo(() => ordered.map((step) => step.id).join("|"), [ordered]);

  const selectedId =
    picked && byId.has(picked) ? picked : (plan.nextStep?.id ?? ordered[0]?.id ?? null);
  const selected = selectedId ? (byId.get(selectedId) ?? null) : null;
  // Keep the chosen relationship visible after the pointer or focus leaves.
  const relationshipId = active ?? selectedId;
  const blockers = useMemo(
    () => (selected ? selected.dependsOn.map((id) => byId.get(id)).filter(isStep) : []),
    [selected, byId],
  );

  const total = ordered.length;
  const firstDue = ordered[0] ?? null;
  const afterIntake = useMemo(() => ordered.filter((s) => s.offsetDays < 0), [ordered]);
  const daysToStart = daysBetween(todayIso(now), plan.intake.startDate);

  /*
   * The detail region is ~1000 characters and four headings, so announcing it
   * wholesale re-reads the whole thing on every arrow key. The live region below
   * says only what a selection changed: which milestone, when it is due, where it
   * stands. It is written in the handler rather than in an effect, so it speaks
   * only when the reader actually chose something — never on the first paint and
   * never when the live plan swaps in underneath them.
   */

  /* ---------------------------------------------------------------- edges
   * Geometry is read back from the DOM rather than guessed from a row height,
   * so the lines stay correct whatever the text wraps into — and the whole
   * layer switches itself off when the axis gets too narrow to be honest. */
  useLayoutEffect(() => {
    const measure = () => {
      const list = listRef.current;
      if (!list) return;
      const listRect = list.getBoundingClientRect();
      const trackEl = list.querySelector<HTMLElement>("[data-track]");
      const trackRect = trackEl ? trackEl.getBoundingClientRect() : null;
      /* The axis column is display:none below the graph breakpoint, so a zero
         track rect IS the signal to drop the geometry. Measuring beats a
         hardcoded breakpoint here: the two can never drift apart. */
      if (!trackRect || trackRect.width < 1 || listRect.width < 1) {
        setPoints({});
        setBox(null);
        return;
      }
      const next: Record<string, Point> = {};
      list.querySelectorAll<HTMLElement>("[data-tick]").forEach((tick) => {
        const id = tick.dataset.tick;
        if (!id) return;
        const r = tick.getBoundingClientRect();
        next[id] = {
          x: Math.round(r.left - listRect.left + r.width / 2),
          y: Math.round(r.top - listRect.top + r.height / 2),
        };
      });
      setPoints(next);
      setBox({
        w: Math.round(listRect.width),
        h: Math.round(listRect.height),
        originX: Math.round(trackRect.right - listRect.left),
        trackLeft: Math.round(trackRect.left - listRect.left),
      });
    };

    measureRef.current = measure;
    measure();

    const list = listRef.current;
    if (!list) return;
    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(list);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [orderKey]);

  useEffect(() => {
    // Web fonts settle after first paint and change every row's height.
    document.fonts?.ready
      .then(() => measureRef.current())
      .catch(() => undefined);
  }, []);

  const edges = useMemo<Edge[]>(() => {
    if (!box) return [];
    const list: Edge[] = [];
    for (const step of ordered) {
      const to = points[step.id];
      if (!to) continue;
      for (const depId of step.dependsOn) {
        const from = points[depId];
        if (!from) continue;
        list.push({
          key: `${depId}->${step.id}`,
          from: depId,
          to: step.id,
          d: `M${from.x} ${from.y} V${to.y} H${to.x}`,
          met: Boolean(done[depId]),
        });
      }
    }
    return list;
  }, [box, points, ordered, done]);

  /* -------------------------------------------------------------- motion
   * Masked reveals only. Nothing is hidden unless the tween actually runs: the
   * from-state is set inside the effect, so a reduced-motion preference leaves
   * the page fully drawn and fully readable. */
  useGSAP(
    () => {
      if (!shouldAnimate) return;
      gsap.registerPlugin(CustomEase);
      CustomEase.create("brand", "M0,0 C0.65,0.05 0,1 1,1");
      const lines = lineRefs.current.filter(
        (line): line is HTMLSpanElement => line !== null,
      );
      if (rulerRef.current) {
        gsap.fromTo(
          rulerRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.6, ease: "brand", transformOrigin: "0% 50%", delay: 0.12 },
        );
      }
      if (edgesRef.current) {
        gsap.fromTo(
          edgesRef.current,
          { clipPath: "inset(0% 100% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "brand", delay: 0.12 },
        );
      }
      gsap.fromTo(
        lines,
        { yPercent: 110 },
        { yPercent: 0, duration: 0.75, ease: "brand", stagger: 0.085, delay: 0.04 },
      );
    },
    { scope: screenRef, dependencies: [shouldAnimate], revertOnUpdate: true },
  );

  /* Every path that moves the selection goes through here, so the announcement
     and the selection can never disagree about what the reader just did. */
  const selectNode = (id: string) => {
    setPicked(id);
    const step = byId.get(id);
    if (!step) return;
    setAnnouncement(
      `${step.title} selected. Due ${formatPlanDate(step.dueDate)}. ${STATUS_WORD[step.status]}.`,
    );
  };

  /*
   * Radio-group keyboard model: arrows, Home and End move the selection *and*
   * the focus, which is what makes the arrow key useful — one keypress shows the
   * detail. Roving tabindex means the group is a single Tab stop, so Tab still
   * walks straight out of the list and never traps anyone here.
   */
  const onListKeyDown = (event: KeyboardEvent<HTMLOListElement>) => {
    const keys = ["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft", "Home", "End"];
    if (!keys.includes(event.key)) return;
    const nodes = Array.from(
      listRef.current?.querySelectorAll<HTMLButtonElement>("[data-node]") ?? [],
    );
    if (nodes.length === 0) return;
    const current = nodes.indexOf(document.activeElement as HTMLButtonElement);
    if (current === -1 && event.key !== "Home" && event.key !== "End") return;
    event.preventDefault();
    const forward = event.key === "ArrowDown" || event.key === "ArrowRight";
    const nextIndex =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? nodes.length - 1
          : (current + (forward ? 1 : -1) + nodes.length) % nodes.length;
    const next = nodes[nextIndex];
    if (!next) return;
    const id = next.dataset.node;
    if (id) selectNode(id);
    next.focus();
  };

  const focusNode = (id: string) => {
    selectNode(id);
    window.requestAnimationFrame(() => {
      listRef.current?.querySelector<HTMLButtonElement>(`[data-node="${id}"]`)?.focus();
    });
  };

  return (
  <GuideProvider steps={plan.steps}>
      <div className="route-screen" ref={screenRef} data-motion={shouldAnimate ? "on" : "off"}>
        <header className="route-hero">
          <h1>
            <span className="rt-line">
              <span ref={(el) => void (lineRefs.current[0] = el)}>Every deadline,</span>
            </span>
            <span className="rt-line">
              <span ref={(el) => void (lineRefs.current[1] = el)}>
                counted back from <span className="serif">departure</span>.
              </span>
            </span>
          </h1>

          {/* One context line. "Change target" lives here, quiet. */}
          <p className="rt-context">
            {plan.country.name} · {plan.intake.label} · course starts{" "}
            <time dateTime={plan.intake.startDate}>{formatPlanDate(plan.intake.startDate)}</time> ·{" "}
            <Link className="rt-underline rt-target" href="/path">
              Change target <ArrowRight />
            </Link>
          </p>

          {/*
            One number, then one demoted row of small text. The count of days is
            the axis the whole graph is drawn against, so it is the one thing on
            this screen that orients everything else.
          */}
          <p className="rt-figure">
            <span className="rt-figure-number">{Math.abs(daysToStart)}</span>
            <span className="rt-figure-unit">
              days {daysToStart >= 0 ? "until you start" : "since you started"}
            </span>
          </p>

          <p className="rt-micro">
            <span>
              <strong>{plan.counts.total}</strong> dated milestones
            </span>
            <span aria-hidden="true">·</span>
            <span>
              <strong>{plan.counts.verified}</strong> of {plan.counts.total} verified — an
              official source states the rule, figure or date
            </span>
            <span aria-hidden="true">·</span>
            <span>
              {plan.country.name} admission is{" "}
              {plan.country.admission === "rolling" ? "rolling" : "fixed"} —{" "}
              {plan.country.admission === "rolling"
                ? "earlier is better, but selective programmes inside it still publish one late deadline"
                : "one deadline closes the round"}
            </span>
          </p>
        </header>

        <section className="route-section" aria-labelledby="rt-graph">
          <div className="rt-section-head">
            <h2 id="rt-graph">The graph</h2>
            {/* The one honest caveat this drawing needs: the axis is ordered, not measured. */}
            <p>Milestones in date order. The axis is ordered, not to scale — each row states its own date.</p>
          </div>

          {/* Glyph + word only: every row already prints its own status beside the shape. */}
          <ul className="route-legend">
            <li>
              <StatusGlyph status="done" />
              <span className="rt-legend-key">Done</span>
            </li>
            <li>
              <StatusGlyph status="now" />
              <span className="rt-legend-key">Now</span>
            </li>
            <li>
              <StatusGlyph status="next" />
              <span className="rt-legend-key">Next</span>
            </li>
            <li>
              <StatusGlyph status="later" />
              <span className="rt-legend-key">Later</span>
            </li>
            <li>
              <StatusGlyph status="risk" />
              <span className="rt-legend-key">At risk</span>
            </li>
            <li>
              <TickMark />
              <span className="rt-legend-key">{HARD_LABEL}</span>
            </li>
          </ul>

          <div className="route-graph-wrap">
            <div className="route-ruler" aria-hidden="true">
              <span className="rt-ruler-mark" />
              <span className="rt-ruler-body">Milestone</span>
              <span className="rt-ruler-track" ref={rulerRef}>
                <span className="rt-ruler-first">
                  {firstDue ? formatPlanDate(firstDue.dueDate) : ""}
                </span>
                <span
                  className="rt-ruler-last"
                  style={
                    box
                      ? { left: box.originX - box.trackLeft - 6 }
                      : { right: 0 }
                  }
                >
                  T · intake starts
                </span>
              </span>
              <span className="rt-ruler-date">Due</span>
            </div>

            <div className="route-rows-wrap">
              <svg
                ref={edgesRef}
                className="route-edges"
                width={box?.w ?? 0}
                height={box?.h ?? 0}
                viewBox={box ? `0 0 ${box.w} ${box.h}` : "0 0 0 0"}
                aria-hidden="true"
                focusable="false"
              >
                <defs>
                  <marker
                    id="rt-arrow"
                    viewBox="0 0 6 6"
                    refX="5.2"
                    refY="3"
                    markerWidth="5"
                    markerHeight="5"
                    orient="auto"
                  >
                    <path d="M0 0.7 5.4 3 0 5.3Z" fill="var(--color-forest)" opacity="0.38" />
                  </marker>
                  <marker
                    id="rt-arrow-live"
                    viewBox="0 0 6 6"
                    refX="5.2"
                    refY="3"
                    markerWidth="5"
                    markerHeight="5"
                    orient="auto"
                  >
                    <path d="M0 0.7 5.4 3 0 5.3Z" fill="var(--color-forest)" />
                  </marker>
                  <marker
                    id="rt-arrow-risk"
                    viewBox="0 0 6 6"
                    refX="5.2"
                    refY="3"
                    markerWidth="5"
                    markerHeight="5"
                    orient="auto"
                  >
                    <path d="M0 0.7 5.4 3 0 5.3Z" fill="var(--color-signal)" />
                  </marker>
                </defs>

                {box ? (
                  <line
                    className="rt-origin-rule"
                    x1={box.originX - 0.5}
                    y1={0}
                    x2={box.originX - 0.5}
                    y2={box.h}
                  />
                ) : null}

                {edges.map((edge) => {
                  const live = edge.from === relationshipId || edge.to === relationshipId;
                  const risk =
                    (byId.get(edge.from)?.status === "risk" && !done[edge.from]) ||
                    (byId.get(edge.to)?.status === "risk" && !done[edge.to]);
                  return (
                    <path
                      key={edge.key}
                      className="rt-edge"
                      d={edge.d}
                      data-met={edge.met}
                      data-live={live || undefined}
                      data-risk={risk || undefined}
                      markerEnd={`url(#${
                        risk ? "rt-arrow-risk" : live ? "rt-arrow-live" : "rt-arrow"
                      })`}
                    />
                  );
                })}

                {/* A separate trace preserves the unmet edge's dashed semantics.
                    It is decorative, finite, and keyed only to the relationship. */}
                {edges
                  .filter((edge) => edge.from === relationshipId || edge.to === relationshipId)
                  .map((edge) => (
                    <path
                      key={`${relationshipId}-${edge.key}`}
                      className="rt-edge-trace"
                      d={edge.d}
                      pathLength={1}
                      data-risk={
                        byId.get(edge.from)?.status === "risk" ||
                        byId.get(edge.to)?.status === "risk" || undefined
                      }
                    />
                  ))}
              </svg>

              {/*
                A radiogroup, not a set of disclosure buttons: these rows are not
                expanders, they are one-of-many selection, and exactly one detail
                panel below belongs to the selected one. `aria-controls` on a radio
                is the documented way to name that panel, and the `li` wrappers are
                presentational so the radios are owned by the group rather than by
                a listitem sitting in the middle of it.
              */}
              <ol
                className="route-rows"
                ref={listRef}
                role="radiogroup"
                aria-label="Milestones in date order"
                onKeyDown={onListKeyDown}
              >
                {ordered.map((step, index) => {
                  const isSelected = step.id === selectedId;
                  const open = step.blockers
                    .map((id) => byId.get(id))
                    .filter(isStep);
                  return (
                    <li
                      key={step.id}
                      className="route-row"
                      role="presentation"
                      data-selected={isSelected || undefined}
                    >
                      <button
                        type="button"
                        role="radio"
                        className="route-node"
                        data-node={step.id}
                        aria-checked={isSelected}
                        aria-controls="route-detail"
                        tabIndex={isSelected ? 0 : -1}
                        onClick={() => selectNode(step.id)}
                        onMouseEnter={() => setActive(step.id)}
                        onMouseLeave={() => setActive(null)}
                        onFocus={() => setActive(step.id)}
                        onBlur={() => setActive(null)}
                      >
                        <span className="rt-mark">
                          <StatusGlyph status={step.status} />
                        </span>

                        <span className="rt-body">
                          <span className="rt-meta">
                            <span className="rt-phase">{step.phase}</span>
                            <span className="rt-chip" data-kind="status">
                              {STATUS_WORD[step.status]}
                            </span>
                            {step.hardDeadline ? (
                              <span className="rt-chip" data-kind="hard">
                                {HARD_LABEL}
                              </span>
                            ) : null}
                            {step.confidence !== "verified" ? (
                              <span className="rt-chip" data-kind="conf">
                                {CONFIDENCE_LABELS[step.confidence]}
                              </span>
                            ) : null}
                          </span>
                          <span className="rt-title">{step.title}</span>
                          {open.length > 0 ? (
                            <span className="rt-waits">
                              {open.map((dep) => dep.title).join(" · ")}
                            </span>
                          ) : null}
                        </span>

                        <span className="rt-track" data-track aria-hidden="true">
                          <span
                            className="rt-tick"
                            data-tick={step.id}
                            data-status={step.status}
                            data-hard={step.hardDeadline || undefined}
                            style={tickStyle(((index + 0.5) / Math.max(total, 1)) * 100)}
                          />
                        </span>

                        <span className="rt-date">
                          <span className="rt-count">{countdown(step.offsetDays)}</span>
                          <time dateTime={step.dueDate}>{formatPlanDate(step.dueDate)}</time>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>

            <p className="rt-narrow-note">
              On a narrow screen the connecting lines are dropped. Each row states what
              it waits on.
            </p>

            {/*
              The one live region on this screen, and it is deliberately tiny: the
              selection changed, so name the milestone that changed. The detail
              panel below is a plain labelled region — it is a thousand characters
              and four headings, and re-reading all of it on every arrow keypress
              is noise, not information.
            */}
            <p className="sr-only" role="status">
              {announcement}
            </p>

            {selected ? (
              <div
                className="route-detail"
                id="route-detail"
                role="region"
                aria-label="Milestone detail"
                tabIndex={-1}
              >
                {/* The selected text changes without remounting the action button. */}
                <div className="rt-detail-head rt-selection-update" key={`${selected.id}-${selected.status}`}>
                  <p className="eyebrow">{selected.phase}</p>
                  <h3>{selected.title}</h3>
                  <p className="rt-detail-chips">
                    <span className="rt-mark">
                      <StatusGlyph status={selected.status} />
                    </span>
                    <span className="rt-chip" data-kind="status">
                      {STATUS_WORD[selected.status]}
                    </span>
                    {selected.hardDeadline ? (
                      <span className="rt-chip" data-kind="hard">
                        {HARD_LABEL}
                      </span>
                    ) : null}
                    <span className="rt-chip" data-kind="conf">
                      {CONFIDENCE_LABELS[selected.confidence]} date
                    </span>
                  </p>
                  <p className="rt-detail-due">
                    Due <strong>{formatPlanDate(selected.dueDate)}</strong> —{" "}
                    <strong>{countdown(selected.offsetDays)}</strong>,{" "}
                    {countdownWords(selected)}
                    {selected.offsetDays < 0 ? ", after your course has started" : ""}.
                  </p>
                </div>

                <p className="rt-detail-summary">{selected.summary}</p>

                <GuideLinks milestoneId={selected.id} className="rt-detail-guides" />

                {selected.hardDeadline ? <p className="rt-detail-note">{HARD_NOTE}</p> : null}

                <div className="rt-detail-cols">
                  <div>
                    <h4>What it involves</h4>
                    <ul className="rt-task-list">
                      {selected.tasks.map((task) => (
                        <li key={task}>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4>Depends on</h4>
                    {blockers.length > 0 ? (
                      <div className="rt-deps">
                        {blockers.map((dep) => (
                          <button
                            key={dep.id}
                            type="button"
                            className="rt-dep"
                            data-met={Boolean(done[dep.id])}
                            onClick={() => focusNode(dep.id)}
                          >
                            <span className="rt-dep-arrow" aria-hidden="true">
                              ↳
                            </span>
                            <span>{dep.title}</span>
                            <span className="rt-legend-key">
                              {done[dep.id] ? "done" : "not done"}
                            </span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="rt-none">Nothing — this one has no prerequisites.</p>
                    )}

                    <div className="rt-trust">
                      <h4>Where this number comes from</h4>
                      <p>
                        <span className="rt-trust-level">
                          {CONFIDENCE_LABELS[selected.confidence]}.
                        </span>{" "}
                        {CONFIDENCE_NOTE[selected.confidence]}
                      </p>
                      <a
                        className="rt-trust-source"
                        href={selected.source}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="rt-trust-url">{selected.source}</span>
                        <span className="rt-trust-newtab">
                          <span className="rt-trust-arrow" aria-hidden="true">
                            <ExternalArrow />
                          </span>
                          opens in a new tab
                        </span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="rt-detail-actions">
                  <button
                    type="button"
                    className="rt-button"
                    onClick={() => toggleStep(selected.id)}
                  >
                    <span aria-hidden="true">
                      <StatusGlyph status={done[selected.id] ? "later" : "done"} />
                    </span>
                    {done[selected.id] ? "Undo — mark this not done" : "Mark this done"}
                  </button>
                </div>
              </div>
            ) : (
              <p className="route-empty">
                Select any milestone above to see its summary, its tasks and the
                official page its dates were checked against.
              </p>
            )}
          </div>
        </section>

        <section className="route-section" aria-labelledby="rt-admission">
          <div className="rt-section-head">
            <h2 id="rt-admission">
              {plan.country.name} admission, stated plainly
            </h2>
          </div>

          <div className="route-admission">
            <p className="rt-admission-flag">
              <svg viewBox="0 0 12 12" aria-hidden="true" focusable="false">
                {plan.country.admission === "rolling" ? (
                  <path
                    d="M6 0.7c2.9 0 5.3 2.4 5.3 5.3S8.9 11.3 6 11.3 0.7 8.9 0.7 6 3.1 0.7 6 0.7Zm0 2.7a2.6 2.6 0 1 0 0 5.2 2.6 2.6 0 0 0 0-5.2Z"
                    fill="currentColor"
                  />
                ) : (
                  <path
                    d="M6 0.7c2.9 0 5.3 2.4 5.3 5.3S8.9 11.3 6 11.3 0.7 8.9 0.7 6 3.1 0.7 6 0.7Z"
                    fill="currentColor"
                  />
                )}
              </svg>
              {plan.country.admission === "rolling" ? "Rolling admission" : "Fixed admission"}
            </p>

            <div className="rt-admission-copy">
              <h3>
                {plan.country.admission === "rolling"
                  ? "Rolling — but not open-ended."
                  : "One deadline closes the round."}
              </h3>
              <p>
                {plan.country.admission === "rolling"
                  ? "Places fill as applications arrive, so there is no date on which the door visibly closes — earlier really is better. Selective programmes inside a rolling system still publish one late deadline for their main intake, and that date is real."
                  : "Admissions close on a published date. Everything behind it is yours to control: documents, tests, references, funding, the visa appointment. Work back from the deadline itself, not from the start of term."}
              </p>

              <details className="rt-caveat">
                <summary>
                  <span className="rt-caveat-plus" aria-hidden="true">
                    +
                  </span>
                  Read the full {plan.country.name} caveat, in the researcher&rsquo;s words
                </summary>
                <p className="rt-caveat-body">
                  {plan.country.notes}
                  <span className="rt-caveat-source">
                    Verified research window: October 2026.
                  </span>
                </p>
              </details>
            </div>
          </div>
        </section>

        <section className="route-section">
          <div className="route-footnote">
            <p className="eyebrow">Honesty</p>
            <p>
              <strong>
                {plan.counts.verified} of {plan.counts.total} dates verified.
              </strong>{" "}
              The other {plan.counts.unverified} are a planning default, labelled on
              their row and linked to the page they came from — read it before you
              rely on it. Nothing is stored on a server; your plan lives in this
              browser only.
              {afterIntake.length > 0 ? (
                <>
                  {" "}
                  {afterIntake.length === 1 ? "One milestone sits" : `${afterIntake.length} milestones sit`}{" "}
                  to the right of the intake line, because {afterIntake.length === 1 ? "it falls" : "they fall"}{" "}
                  after your course has already started.
                </>
              ) : null}
            </p>
          </div>
        </section>
      </div>
  </GuideProvider>
  );
}

function isStep(step: PlanStep | undefined): step is PlanStep {
  return step !== undefined;
}
