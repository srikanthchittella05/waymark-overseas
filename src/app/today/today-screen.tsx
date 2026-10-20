"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import { useMotionPreferences } from "@/components/providers/MotionProvider";
import { usePlan, usePlanActions } from "@/lib/engine/profile";
import type { Plan, PlanStep } from "@/lib/engine/plan";
import { formatPlanDate } from "@/lib/format-date";

/*
 * /today answers exactly one question: what should I do next, and why now.
 *
 * Every date, status and dependency on this screen is derived by the engine from
 * the student's country + intake. Nothing here invents urgency, and nothing is
 * carried by colour alone: each status also ships a word and a shape.
 *
 * The screen mounts in two beats. The server hands us a fully derived plan (see
 * page.tsx) and we render that on the first paint. Once mounted we swap in the
 * live store, so hydration always agrees with the HTML and a returning student
 * never sees an empty dashboard.
 */

gsap.registerPlugin(useGSAP, ScrollTrigger, CustomEase);

/* Mirrors of the CSS aliases in globals.css: --dur-slow / --dur and --ease-brand. */
const BRAND_EASE = CustomEase.create("waymark-brand", "M0,0 C0.65,0.05 0,1 1,1");
const REVEAL = 0.75;
const SETTLE = 0.6;
const STAGGER = 0.06;

const STATUS_WORDS: Record<PlanStep["status"], string> = {
  now: "Do now",
  next: "Next up",
  later: "Later",
  risk: "Past its date",
  done: "Done",
};

/** "in 47 days" / "due today" / "12 days late" — the human form of daysUntil. */
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

function countLabel(count: number, singular: string, plural: string): string {
  return `${count} ${count === 1 ? singular : plural}`;
}

/*
 * A hyphen is a legal line-break opportunity in Unicode line breaking, so in a
 * narrow column "I-20" renders as "I-" / "20" and the identifier stops reading as
 * one thing. No CSS value removes a break at a hyphen — `word-break: keep-all`
 * and `overflow-wrap` both leave it alone in Chromium — so the token is wrapped
 * instead and `.today-token` is what makes that one token unbreakable. The copy
 * is untouched and the whitespace around each token is preserved verbatim.
 */
function unbreakableTokens(text: string) {
  return text.split(/(\S+-\S+)/).map((part, index) =>
    /\S+-\S+/.test(part) ? (
      <span className="today-token" key={index}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}

/*
 * Where focus goes when a state change unmounts the control that was just used.
 * Marking a milestone done replaces the hero card, so the browser drops focus on
 * <body> and a keyboard user is dropped at the top of the document. Every action
 * on this screen therefore names a target that is still mounted afterwards.
 */
type FocusRequest = "hero" | "complete" | "blocked" | "risk";

function moveFocus(element: HTMLElement | null) {
  if (!element) return;
  const box = element.getBoundingClientRect();
  const offScreen =
    box.bottom <= 0 ||
    box.top >= window.innerHeight ||
    box.right <= 0 ||
    box.left >= window.innerWidth;
  element.focus({ preventScroll: true });
  // Never leave focus parked somewhere the user cannot see it.
  if (offScreen) element.scrollIntoView({ block: "nearest" });
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
function LiveToday({ today }: { today: Date }) {
  const plan = usePlan(today);
  return <TodayBody plan={plan} />;
}

export default function TodayScreen({
  today,
  initialPlan,
}: {
  today: Date;
  initialPlan: Plan;
}) {
  const { shouldAnimate } = useMotionPreferences();
  const root = useRef<HTMLDivElement>(null);
  const mounted = useSyncExternalStore(subscribeToNothing, getMounted, getServerMounted);

  useGSAP(
    () => {
      if (!shouldAnimate) return;
      // Masked line reveal: each line leaves its own box from one line-box below.
      gsap.from(".today-mask-inner", {
        yPercent: 112,
        duration: REVEAL,
        stagger: STAGGER,
        ease: BRAND_EASE,
      });
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 34,
          duration: SETTLE,
          ease: BRAND_EASE,
          scrollTrigger: { trigger: element, start: "top 92%", once: true },
        });
      });
    },
    { scope: root, dependencies: [shouldAnimate], revertOnUpdate: true },
  );

  return (
    <div className="today" ref={root} data-motion={shouldAnimate ? "on" : "off"}>
      {mounted ? <LiveToday today={today} /> : <TodayBody plan={initialPlan} />}
    </div>
  );
}

function TodayBody({ plan }: { plan: Plan }) {
  const { toggleStep, resetProgress } = usePlanActions();
  const blockedPanel = useRef<HTMLDivElement>(null);
  const heroPanel = useRef<HTMLElement>(null);
  const completePanel = useRef<HTMLElement>(null);
  const riskPanel = useRef<HTMLElement>(null);
  const bandPanel = useRef<HTMLElement>(null);
  const pendingFocus = useRef<FocusRequest | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);

  /*
   * The engine only ever promotes an *unblocked* step to plan.nextStep, so its own
   * blockers array is empty by construction. The blocking chain a student actually
   * feels is the soonest step they cannot start yet — that is what we surface here.
   */
  const blocked = useMemo(() => {
    const hero = plan.nextStep;
    if (hero && hero.blockers.length > 0) {
      return { subject: hero, blockerIds: hero.blockers };
    }
    const waiting = plan.steps
      .filter((step) => step.status !== "done" && !step.unblocked)
      .sort((a, b) => a.daysUntil - b.daysUntil);
    const subject = waiting[0];
    return subject ? { subject, blockerIds: subject.blockers } : null;
  }, [plan.nextStep, plan.steps]);

  const atRisk = useMemo(
    () =>
      plan.steps
        .filter((step) => step.status === "risk" && step.id !== plan.nextStep?.id)
        .sort((a, b) => a.daysUntil - b.daysUntil),
    [plan.steps, plan.nextStep],
  );

  const visibleRisk = atRisk.slice(0, 4);
  const hiddenRisk = atRisk.length - visibleRisk.length;

  const stepById = useMemo(() => new Map(plan.steps.map((step) => [step.id, step])), [plan.steps]);

  const dependentsOf = (id: string) => plan.steps.filter((step) => step.dependsOn.includes(id)).length;

  /*
   * Focus repair. Every action here re-derives the plan, and the control that was
   * just used is often part of what the new plan removes — the hero card is
   * replaced by the next milestone, a settled row leaves "Past its date", the
   * confirm button leaves the finished panel. When that happens the browser drops
   * focus on <body>, so each action names a target that is still mounted and this
   * hands focus over. If the control survived, focus is left exactly where it is.
   */
  useEffect(() => {
    const request = pendingFocus.current;
    if (!request) return;
    pendingFocus.current = null;
    const active = document.activeElement;
    if (active && active !== document.body && active !== document.documentElement) return;
    const target =
      request === "blocked"
        ? (blockedPanel.current ?? bandPanel.current)
        : request === "risk"
          ? (riskPanel.current ?? bandPanel.current)
          : request === "complete"
            ? (completePanel.current ?? heroPanel.current)
            : (heroPanel.current ?? completePanel.current);
    moveFocus(target);
  });

  useEffect(() => {
    if (!confirmReset) return;
    const timer = window.setTimeout(() => setConfirmReset(false), 6000);
    return () => window.clearTimeout(timer);
  }, [confirmReset]);

  const hero = plan.nextStep;
  const progressRatio = plan.counts.total === 0 ? 0 : plan.counts.done / plan.counts.total;

  const markSettled = (id: string) => {
    const step = stepById.get(id);
    if (!step) return;
    toggleStep(id);
    setAnnouncement(
      `Marked ${step.title} done.${blocked?.subject ? ` ${blocked.subject.title} is no longer waiting on it.` : ""}`,
    );
  };

  const resolveBlocker = (id: string) => {
    pendingFocus.current = "blocked";
    markSettled(id);
  };

  /*
   * The whole plan is keyed by milestone id: the store keeps no per-task state,
   * so one button settles the milestone and the tasks above it stay guidance.
   * Anything else would advertise tracking this app does not do.
   */
  const settleHero = (id: string) => {
    pendingFocus.current = "hero";
    markSettled(id);
  };

  return (
    <>
      <p className="sr-only" role="status">
        {announcement}
      </p>

      <section className="today-head" aria-labelledby="today-title">
        <h1 className="today-title" id="today-title">
          <span className="today-mask">
            <span className="today-mask-inner">
              {hero ? "Do this next." : "That is all of it."}
            </span>
          </span>
        </h1>

        {/* One context line. Everything else the page can say, it says in the card. */}
        <p className="today-context">
          {plan.country.name} · {plan.intake.label} · counted back from{" "}
          <time dateTime={plan.intake.startDate}>{formatPlanDate(plan.intake.startDate)}</time> ·{" "}
          <Link className="today-underline today-target" href="/path">
            Change target <Arrow />
          </Link>
        </p>
      </section>

      {plan.untouched ? (
        <aside className="today-firstrun" aria-labelledby="firstrun-title" data-reveal>
          <h2 className="today-firstrun-title" id="firstrun-title">
            Sample target, empty checklist.
          </h2>
          {/* Not decoration: every date here is derived from a target nobody chose. */}
          <p>Every date on this page rebuilds from the target you set.</p>
          <Link className="today-underline" href="/path">
            Set my real target <Arrow />
          </Link>
        </aside>
      ) : null}

      {hero ? (
        <section
          className="today-focus"
          data-reveal
          data-tone={hero.status === "risk" ? "late" : "live"}
          data-step-id={hero.id}
          aria-labelledby="focus-title"
          ref={heroPanel}
          tabIndex={-1}
        >
          {/* Only the answer remounts: the card and its focused controls survive. */}
          <div className="today-focus-head today-step-update" key={`head-${hero.id}`}>
            <p className="today-focus-phase">
              <span className="today-focus-mark" data-status={hero.status} aria-hidden="true" />
              {hero.phase} · {STATUS_WORDS[hero.status]}
            </p>
            <h2 className="today-focus-title" id="focus-title">
              {hero.title}
            </h2>
            <p className="today-focus-summary">{unbreakableTokens(hero.summary)}</p>
          </div>

          <div className="today-clock today-step-update" key={`clock-${hero.id}`}>
            <p className="today-clock-line">
              <span className="today-clock-number">{Math.abs(hero.daysUntil)}</span>
              <span className="today-clock-unit">
                {Math.abs(hero.daysUntil) === 1 ? "day" : "days"}{" "}
                {hero.daysUntil < 0 ? "late" : hero.daysUntil === 0 ? "left" : "to go"}
              </span>
            </p>
            <p className="today-clock-date">
              {hero.daysUntil === 0
                ? `Due today · ${formatPlanDate(hero.dueDate)}`
                : `${countdown(hero)} · due ${formatPlanDate(hero.dueDate)}`}
              {hero.hardDeadline ? " · hard deadline, dated by the school or authority" : ""}
            </p>
          </div>

          <div className="today-why">
            <h3 className="today-why-title">Why now</h3>
            <ul className="today-why-list">
              {hero.status === "risk" ? (
                <li>
                  The date passed {countLabel(Math.abs(hero.daysUntil), "day", "days")} ago and it is
                  still open, so nothing dated after it can be trusted yet.
                </li>
              ) : hero.daysUntil === 0 ? (
                <li>It is due today. Nothing else in the plan moves before this one.</li>
              ) : (
                <li>
                  It is the soonest milestone with nothing standing in front of it —{" "}
                  {countdown(hero)}.
                </li>
              )}
              {hero.hardDeadline ? (
                <li>
                  The deadline behind this milestone is fixed by the school or the authority, not by
                  you. Our date is counted back from your intake start, so confirm it against the
                  source before you rely on it.
                </li>
              ) : null}
              <li>
                {dependentsOf(hero.id) > 0
                  ? `${countLabel(dependentsOf(hero.id), "milestone is", "milestones are")} dated from this one.`
                  : "Nothing else in the plan is dated from this one."}
              </li>
            </ul>
          </div>

          {/*
            The engine stores one tick per milestone, so the tasks are listed, not
            checked: four boxes that all move the same milestone advertised tracking
            the app does not have. The single button below is the real control.
          */}
          <div className="today-work">
            <h3 className="today-work-title">
              The work in this milestone
              <span className="today-work-count">
                {countLabel(hero.tasks.length, "task", "tasks")}
              </span>
            </h3>
            <ul className="today-tasks">
              {hero.tasks.map((task, index) => (
                <li className="today-task" key={`${hero.id}-${index}`}>
                  {task}
                </li>
              ))}
            </ul>
            <p className="today-work-foot">
              These are the pieces, not separate ticks. Only the milestone is kept, and only in this
              browser.
            </p>
            <button
              type="button"
              className="today-pill today-pill-quiet"
              data-focus="mark-done"
              onClick={() => settleHero(hero.id)}
            >
              <span className="today-pill-arrow"><Arrow /></span>
              Mark this milestone done<span className="sr-only">: {hero.title}</span>
            </button>
          </div>
        </section>
      ) : (
        <section
          className="today-focus today-complete"
          data-reveal
          aria-labelledby="complete-title"
          ref={completePanel}
          tabIndex={-1}
        >
          <h2 className="today-complete-title today-step-update" id="complete-title">
            Nothing left on the plan.
          </h2>
          <p>
            {plan.counts.total} milestones for {plan.country.name} {plan.intake.label}, all ticked.
            If that is not true — or you are planning a second application — clear the ticks and
            start the clock again.
          </p>
          <button
            type="button"
            className="today-pill today-pill-quiet"
            onClick={() => {
              if (!confirmReset) {
                setConfirmReset(true);
                return;
              }
              setConfirmReset(false);
              pendingFocus.current = "hero";
              resetProgress();
              setAnnouncement("All ticks cleared. Your plan is back to the start.");
            }}
          >
            <span className="today-pill-arrow"><Arrow /></span>
            {confirmReset ? "Tap again to clear every tick" : "Clear all ticks"}
          </button>
        </section>
      )}

      {blocked ? (
        <section
          className="today-blocked"
          data-reveal
          aria-labelledby="blocked-title"
          ref={blockedPanel}
          tabIndex={-1}
        >
          <div
            className="today-blocked-head today-step-update"
            key={`${blocked.subject.id}-${blocked.blockerIds.join("-")}`}
          >
            <h2 className="today-blocked-title" id="blocked-title">
              Blocked: {blocked.subject.title}
            </h2>
            <p className="today-blocked-copy">
              Due {formatPlanDate(blocked.subject.dueDate)} — {countdown(blocked.subject)}. It cannot
              start until the {countLabel(blocked.blockerIds.length, "step", "steps")} below{" "}
              {blocked.blockerIds.length === 1 ? "is" : "are"} settled.
            </p>
          </div>
          <ul className="today-chips">
            {blocked.blockerIds.map((id) => {
              const dependency = stepById.get(id);
              if (!dependency) return null;
              return (
                <li key={id}>
                  <button
                    type="button"
                    className="today-chip"
                    aria-label={`${dependency.title} Mark done, which unblocks ${blocked.subject.title}`}
                    onClick={() => resolveBlocker(id)}
                  >
                    <span className="today-chip-text">{dependency.title}</span>{" "}
                    <span className="today-chip-action">
                      Mark done <Arrow />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="today-blocked-foot">
            Settling one of these re-derives the plan.{" "}
            <Link className="today-underline" href="/steps">
              See the whole checklist <Arrow />
            </Link>
          </p>
        </section>
      ) : null}

      {atRisk.length > 0 ? (
        <section className="today-risk" data-reveal aria-labelledby="risk-title" ref={riskPanel} tabIndex={-1}>
          <div className="today-risk-head">
            <h2 className="today-section-title" id="risk-title">
              Past its date
            </h2>
            <p className="today-section-note">
              {countLabel(atRisk.length, "milestone", "milestones")} past the date this plan
              derived, still open.
            </p>
          </div>
          <ul className="today-risk-list">
            {visibleRisk.map((step) => (
              <li className="today-risk-item" key={step.id}>
                <p className="today-risk-phase">
                  {step.phase} · <span className="today-risk-late">{countdown(step)}</span>
                </p>
                <h3 className="today-risk-title">{step.title}</h3>
                <p className="today-risk-date">
                  Due {formatPlanDate(step.dueDate)} · {Math.abs(step.daysUntil)}{" "}
                  {Math.abs(step.daysUntil) === 1 ? "day" : "days"} past
                </p>
                <button
                  type="button"
                  className="today-risk-done"
                  onClick={() => {
                    // Settling a row removes it from this list, so focus has to land here.
                    pendingFocus.current = "risk";
                    toggleStep(step.id);
                    setAnnouncement(`Marked ${step.title} done.`);
                  }}
                >
                  <span className="today-risk-done-mark" aria-hidden="true">✓</span>
                  Mark done<span className="sr-only">: {step.title}</span>
                </button>
              </li>
            ))}
          </ul>
          {hiddenRisk > 0 ? (
            <p className="today-risk-more">
              <Link className="today-underline" href="/steps">
                {countLabel(hiddenRisk, "more milestone", "more milestones")} past its date{" "}
                <Arrow />
              </Link>
            </p>
          ) : null}
        </section>
      ) : null}

      <section className="today-band" aria-label="Where you are" data-reveal ref={bandPanel} tabIndex={-1}>
        <p className="today-micro">
          {/*
            "0 of 16 done" reports nothing a student can act on, so it only
            appears once there is progress to report. The meter carries the same
            fact for everyone.
          */}
          {plan.counts.done > 0 ? (
            <>
              <span>
                <strong>{plan.counts.done}</strong> of {plan.counts.total} done
              </span>
              <span aria-hidden="true">·</span>
            </>
          ) : null}
          <span>
            <strong>{plan.counts.risk}</strong> past {plan.counts.risk === 1 ? "its date" : "their date"}
          </span>
          <span aria-hidden="true">·</span>
          <span>stored in this browser only</span>
        </p>

        <div
          className="today-meter"
          role="progressbar"
          aria-label="Milestones completed"
          aria-valuemin={0}
          aria-valuemax={plan.counts.total}
          aria-valuenow={plan.counts.done}
          aria-valuetext={`${plan.counts.done} of ${plan.counts.total} milestones done`}
        >
          <span className="today-meter-fill" style={{ transform: `scaleX(${progressRatio})` }} />
        </div>

        <p className="today-honest">
          {/*
            `verified` is the engine's word for "an official source states this
            rule, figure or date" — not "we found an official page". Every
            milestone links a source, verified or not, so that is what this says.
          */}
          <strong>{plan.counts.verified}</strong> of {plan.counts.total} milestones are verified: an
          official source states the rule, figure or date. The other{" "}
          <strong>{plan.counts.unverified}</strong> are a reported pattern or our own planning
          estimate — read the source before you trust the date.{" "}
          <Link className="today-underline" href="/steps">
            Every source is linked in the checklist <Arrow />
          </Link>
        </p>

        <nav className="today-next" aria-label="Where to go next">
          <Link className="today-underline" href="/steps">
            The full checklist <Arrow />
          </Link>
          <Link className="today-underline" href="/route">
            See the route <Arrow />
          </Link>
        </nav>
      </section>
    </>
  );
}
