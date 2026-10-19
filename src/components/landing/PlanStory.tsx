"use client";

import { useId, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useMotionPreferences } from "@/components/providers/MotionProvider";
import {
  buildPlan, CONFIDENCE_LABELS, countryOptions, getCountry,
  type PlanStep, type Profile,
} from "@/lib/engine/plan";
import "./plan-story.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Beat = 0 | 1 | 2;
const BEATS = [
  { key: "target", title: "Choose a horizon.", copy: "A destination. An intake.", caption: "Give the possibility a starting point." },
  { key: "dates", title: "Find your bearings.", copy: "The dates count backwards.", caption: "The start date becomes an ordered plan." },
  { key: "next", title: "Make a move.", copy: "One next action, with evidence.", caption: "Know what to pick up first — and why." },
] as const;
const SEEK = [0, 1.5, 2.25] as const;
const COUNTRIES = countryOptions();
const SAMPLE_PROFILE: Profile = { stage: "exploring", countryCode: "US", intakeId: "us-fall-2027" };
const SAMPLE_DATE = "2026-10-18";
const CURVE = "M28 20C92 20 -36 100 28 100C92 100 -36 180 28 180";
const ORDERED = "M28 20C28 47 28 73 28 100C28 127 28 153 28 180";
const PIN_QUERY = "(min-width: 1000px) and (min-height: 740px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const subscribe = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

function subscribeToPinQuery(onChange: () => void) {
  const query = window.matchMedia(PIN_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function pinQueryMatches() {
  return window.matchMedia(PIN_QUERY).matches;
}

// This pin can be created after its downstream gallery has already measured.
// Refresh the whole document, in pin order, rather than just this one trigger.
// A native RAF does not enter any GSAP context (or create a context cycle).
let pendingLayoutRefresh = 0;
function refreshPinLayout() {
  if (pendingLayoutRefresh) return;
  pendingLayoutRefresh = requestAnimationFrame(() => {
    pendingLayoutRefresh = 0;
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
  });
}

function dateLabel(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric", timeZone: "UTC",
  });
}

function Source({ step }: { step: PlanStep }) {
  return (
    <p className="ps-source">
      <span className="ps-confidence">Confidence: {CONFIDENCE_LABELS[step.confidence]}</span>
      <a href={step.source} title={step.source} aria-label={`View source for ${step.title}`}>View source <span aria-hidden="true">↗</span></a>
    </p>
  );
}

/** Self-contained sample; no profile store or persistence is involved. */
export default function PlanStory() {
  const root = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const scene = useRef<gsap.core.Timeline | null>(null);
  const inspection = useRef<gsap.core.Tween | null>(null);
  const manual = useRef(false);
  const beatRef = useRef<Beat>(2);
  const [beat, setBeat] = useState<Beat>(2);
  const [profile, setProfile] = useState<Profile>(SAMPLE_PROFILE);
  const [pinFits, setPinFits] = useState(false);
  const ready = useSyncExternalStore(subscribe, clientReady, serverReady);
  const canPin = useSyncExternalStore(subscribeToPinQuery, pinQueryMatches, serverReady);
  const { shouldAnimate } = useMotionPreferences();
  const id = useId();
  // A labelled snapshot, not a live clock: SSR and hydration always agree.
  const plan = useMemo(() => buildPlan(profile, {}, new Date(2026, 9, 18, 12)), [profile]);
  const next = plan.nextStep;
  const candidates = [next, plan.steps.find((step) => step.phase === "Application Submission"),
    plan.steps.find((step) => step.phase === "Visa & Permits")]
    .filter((step): step is PlanStep => Boolean(step));
  const ledger = [...new Map(candidates.map((step) => [step.id, step])).values()]
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  useGSAP(() => {
    const element = root.current;
    const panel = frame.current;
    if (!shouldAnimate || !element || !panel) return;
    const headerGap = () => parseFloat(getComputedStyle(element).scrollMarginTop) || 96;
    const fits = () => Math.max(panel.offsetHeight, panel.scrollHeight) + headerGap() + 24 <= window.innerHeight;
    const pinning = canPin && pinFits && fits();

    const sequence = gsap.timeline({ paused: true, defaults: { duration: 0.75, ease: "power3.inOut" } });
    // On short/touch layouts this is a native, complete example—not a tall
    // blank stage waiting for a button above the viewport to reveal its text.
    if (pinning) {
      sequence.fromTo(".ps-timeline", { clipPath: "inset(0 100% 0 0)", x: 24 },
        { clipPath: "inset(0 0% 0 0)", x: 0 }, 0.75)
        .fromTo(".ps-next", { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)" }, 1.5);
    }
    sequence
      .fromTo(".ps-route-track, .ps-route-ink", { attr: { d: CURVE } }, { attr: { d: ORDERED } }, 0.75)
      .fromTo(".ps-route-ink", { strokeDashoffset: 1 }, { strokeDashoffset: 0 }, 0.75)
      .fromTo(".ps-next-wash", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)" }, 1.5);
    sequence.time(SEEK[beatRef.current]);
    scene.current = sequence;

    const syncBeat = (progress: number) => {
      const value: Beat = progress < 1 / 3 ? 0 : progress < 2 / 3 ? 1 : 2;
      if (beatRef.current === value) return;
      beatRef.current = value;
      setBeat(value);
    };
    let disposed = false;
    let pendingResize = 0;
    let lastScroll = window.scrollY;
    // Both GSAP objects are created synchronously in this one useGSAP context.
    // Native media subscriptions rebuild it; callbacks never re-enter an ancestor context.
    const trigger = pinning ? ScrollTrigger.create({
      trigger: panel,
      animation: sequence,
      start: () => `top top+=${headerGap()}`,
      end: () => `+=${Math.round(window.innerHeight * 1.4)}`,
      pin: true,
      refreshPriority: 10,
      scrub: true,
      invalidateOnRefresh: true,
      onRefresh: (self) => {
        lastScroll = self.scroll();
        if (manual.current) sequence.time(SEEK[beatRef.current]);
        else syncBeat(self.progress);
      },
      onUpdate: (self) => {
        // Layout changes and remaining Lenis inertia must not undo a choice.
        if (manual.current) {
          lastScroll = self.scroll();
          sequence.time(SEEK[beatRef.current]);
          return;
        }
        if (self.scroll() === lastScroll) return;
        lastScroll = self.scroll();
        syncBeat(self.progress);
      },
    }) : null;
    let lastWidth = panel.offsetWidth;
    let lastHeight = Math.max(panel.offsetHeight, panel.scrollHeight);
    let lastViewportHeight = window.innerHeight;
    const syncPin = () => {
      if (disposed) return;
      const nextFits = fits();
      const width = panel.offsetWidth;
      const height = Math.max(panel.offsetHeight, panel.scrollHeight);
      const layoutChanged = width !== lastWidth || height !== lastHeight ||
        window.innerHeight !== lastViewportHeight;
      lastWidth = width;
      lastHeight = height;
      lastViewportHeight = window.innerHeight;
      // Fit changes rebuild synchronously through React/useGSAP, never in this callback.
      setPinFits(nextFits);
      if (nextFits && trigger && layoutChanged) refreshPinLayout();
    };
    // Async work only updates this existing trigger; it creates no GSAP objects/contexts.
    const resize = () => {
      if (disposed || pendingResize) return;
      pendingResize = requestAnimationFrame(() => { pendingResize = 0; syncPin(); });
    };
    const observer = canPin ? new ResizeObserver(resize) : null;
    const resumeScroll = (event: Event) => {
      // Lenis prevents native wheel scrolling while still honoring the input.
      if (!manual.current || (event instanceof KeyboardEvent && event.defaultPrevented)) return;
      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest("input, select, textarea, [contenteditable]")) return;
      if (event instanceof KeyboardEvent && (
        !["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key) ||
        (event.key === " " && target?.closest("button"))
      )) return;
      manual.current = false;
      inspection.current?.kill();
      if (trigger) {
        sequence.progress(trigger.progress);
        syncBeat(trigger.progress);
      }
    };
    observer?.observe(panel);
    const stage = element.querySelector(".ps-stage");
    if (stage) observer?.observe(stage);
    if (canPin) {
      window.addEventListener("resize", resize);
      resize();
      document.fonts.ready.then(resize);
    }
    if (trigger) {
      refreshPinLayout();
      window.addEventListener("wheel", resumeScroll, { passive: true });
      window.addEventListener("touchmove", resumeScroll, { passive: true });
      window.addEventListener("keydown", resumeScroll);
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(pendingResize);
      observer?.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("wheel", resumeScroll);
      window.removeEventListener("touchmove", resumeScroll);
      window.removeEventListener("keydown", resumeScroll);
      inspection.current?.kill();
      inspection.current = null;
      scene.current = null;
      trigger?.kill(true, true);
      if (trigger) refreshPinLayout();
      // useGSAP also restores the timeline's animated SVG/clip-path attributes.
    };
  }, { scope: root, dependencies: [shouldAnimate, plan, canPin, pinFits], revertOnUpdate: true });

  function inspect(value: Beat) {
    manual.current = true;
    beatRef.current = value;
    setBeat(value);
    inspection.current?.kill();
    // This event-owned tween is explicitly killed before replacement and on cleanup.
    if (scene.current) {
      inspection.current = scene.current.tweenTo(SEEK[value], { duration: 0.75, ease: "power3.inOut" });
    }
  }

  function chooseCountry(code: string) {
    const country = getCountry(code);
    const intake = country.intakes.find((item) => item.startDate >= SAMPLE_DATE) ?? country.intakes[0];
    if (!intake) return;
    inspect(0);
    setProfile({ stage: "exploring", countryCode: country.code, intakeId: intake.id });
  }

  return (
    <section className="ps-story" id="plan" ref={root} aria-labelledby={`${id}-title`}>
      <div className="ps-frame" ref={frame}>
        <header className="ps-heading">
          <div><p className="ps-eyebrow">02 / POSSIBILITY, MEET PLAN.</p><h2 id={`${id}-title`}>A plan to <em>match.</em></h2></div>
          <p className="ps-intro">Scroll through the plan.<br />Or choose a chapter below.</p>
        </header>

        <div className="ps-beats" role="group" aria-label="Inspect the sample plan">
          {BEATS.map((item, index) => (
            <button className="ps-beat" type="button" key={item.key} id={`${id}-beat-${index}`}
              aria-pressed={beat === index} aria-controls={`${id}-panel`} disabled={!ready}
              onClick={() => inspect(index as Beat)}>
              <span className="ps-beat-number" aria-hidden="true">0{index + 1}</span>
              <span><span className="ps-beat-title">{item.title}</span><span className="ps-beat-copy">{item.copy}</span></span>
              <span className="ps-beat-arrow" aria-hidden="true">↘</span>
            </button>
          ))}
        </div>

        <div className="ps-stage" data-state={BEATS[beat].key} id={`${id}-panel`}
          role="region" aria-labelledby={`${id}-beat-${beat}`}>
          <div className="ps-stage-top">
            <p className="ps-eyebrow">Sample snapshot · <time dateTime={SAMPLE_DATE}>{dateLabel(SAMPLE_DATE)}</time></p>
            <p className="ps-stage-caption" role="status">{BEATS[beat].caption}</p>
          </div>
          <div className="ps-stage-grid">
            <div className="ps-target">
              <h3 className="ps-eyebrow">The starting point</h3>
              <div className="ps-pickers">
                <label className="ps-field"><span>Destination</span>
                  <select value={profile.countryCode} disabled={!ready} onChange={(event) => chooseCountry(event.target.value)}>
                    {COUNTRIES.map((country) => <option value={country.code} key={country.code}>{country.name}</option>)}
                  </select>
                </label>
                <label className="ps-field"><span>Intake</span>
                  <select value={profile.intakeId} disabled={!ready} onChange={(event) => {
                    const intakeId = event.currentTarget.value;
                    inspect(0); setProfile((current) => ({ ...current, intakeId }));
                  }}>
                    {plan.country.intakes.map((intake) => <option value={intake.id} key={intake.id}>{intake.label}</option>)}
                  </select>
                </label>
              </div>
              <p className="ps-start"><span>Sample intake start</span><time dateTime={plan.intake.startDate}>{dateLabel(plan.intake.startDate)}</time></p>
            </div>

            <div className="ps-timeline" inert={shouldAnimate && canPin && pinFits && beat === 0}>
              <div className="ps-ledger-heading"><h3>Dates, counted back</h3><span>{ledger.length} of {plan.counts.total} milestones</span></div>
              <div className="ps-ledger-body">
                <svg className="ps-route-art" viewBox="0 0 64 240" preserveAspectRatio="none" fill="none" aria-hidden="true" focusable="false">
                  <path className="ps-route-track" d={ORDERED} vectorEffect="non-scaling-stroke" />
                  <path className="ps-route-ink" d={ORDERED} pathLength="1" vectorEffect="non-scaling-stroke" />
                  {[20, 100, 180].map((cy, index) => <circle key={cy} cx="28" cy={cy} r={index === 0 ? 5 : 3} vectorEffect="non-scaling-stroke" />)}
                </svg>
                <ol className="ps-ledger">
                  {ledger.map((step) => (
                    <li key={step.id} data-next={step.id === next?.id}>
                      <div className="ps-date"><time dateTime={step.dueDate}>{dateLabel(step.dueDate)}</time>
                        <span>{Math.abs(step.offsetDays)}d {step.offsetDays < 0 ? "after" : "before"} start</span></div>
                      <div className="ps-entry"><p className="ps-entry-title">{step.title}</p><Source step={step} /></div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {next && <div className="ps-next" inert={shouldAnimate && canPin && pinFits && beat !== 2}>
            <span className="ps-next-wash" aria-hidden="true" />
            <div className="ps-next-copy"><p className="ps-eyebrow">One next action{next.urgency === "overdue" ? " · catch up" : " · start here"}</p>
              <h3>{next.title}</h3><p className="ps-next-task">{next.summary}</p></div>
            <div className="ps-next-evidence"><p className="ps-next-date">Planning target: <time dateTime={next.dueDate}>{dateLabel(next.dueDate)}</time></p><Source step={next} /></div>
          </div>}
          <p className="ps-caveat">Dates = sample intake start − planning offsets, not published deadlines. Source confidence is not date certainty. Confirm with your school.</p>
        </div>

        <div className="ps-footer"><Link className="ps-route-link" href="/route">Explore your route <span aria-hidden="true">↗</span></Link>
          <Link className="ps-cta" href={`/path?country=${profile.countryCode}&intake=${profile.intakeId}`}>Build my route <span aria-hidden="true">↗</span></Link></div>
      </div>
    </section>
  );
}
