"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import {
  addDays,
  buildPlan,
  countryOptions,
  daysBetween,
  STAGES,
  STAGE_LABELS,
  type Plan,
  type Profile,
  type Stage,
} from "@/lib/engine/plan";
import { usePlan, usePlanActions, useProfile } from "@/lib/engine/profile";
import { formatPlanDate } from "@/lib/format-date";
import { useMotionPreferences } from "@/components/providers/MotionProvider";
import CountryGallery from "./CountryGallery";

/*
 * Four questions, and the reason the screen exists: making the consequence of
 * an answer visible *before* it is committed. The draft target goes through the
 * same engine as the saved one, so the panel is the real plan rather than a
 * summary of one.
 */

type DraftTarget = { stage: Stage; countryCode: string; intakeId: string };

/* Unsaved answers are held against the exact profile they were made from. When
   the store commits or is reset it hands back a new profile object, the hold
   stops matching and the draft silently falls back to what is saved — no effect,
   no cascading render, and no way to end up previewing a stale answer. */
type PendingEdits = { base: Profile; value: Partial<DraftTarget> };

function countdown(offsetDays: number): string {
  if (offsetDays === 0) return "T";
  return offsetDays > 0 ? `T−${offsetDays}` : `T+${Math.abs(offsetDays)}`;
}

function firstDueOf(plan: Plan): string {
  const sorted = [...plan.steps].sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  return sorted[0]?.dueDate ?? "";
}

function daysWord(count: number): string {
  return count === 1 ? "1 day" : `${Math.abs(count)} days`;
}

function movedBy(delta: number, noun: string): string {
  if (delta === 0) return "Unchanged.";
  return `${daysWord(delta)} ${delta > 0 ? "later" : "earlier"} than the one you have saved${noun}.`;
}

const CONFIDENCE_VERIFIED =
  "An official admissions or immigration page states the rule, the figure or the date quoted.";
const CONFIDENCE_OTHER =
  "A widely reported pattern, a per-university convention, or our own inference. No single central page publishes it — treat it as a target to check, not a fact.";

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

function CheckMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
      <path
        d="M1.6 7.4 5.2 11 12.4 3.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WarnMark() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
      <path d="M7 0.8 13.6 13.2H0.4Z" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M7 5.4v3.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="7" cy="10.8" r="0.8" fill="currentColor" />
    </svg>
  );
}

function CloseMark() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
      <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function RotateMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
      <path
        d="M12 7a5 5 0 1 1-1.6-3.7M12 1.6V4.6H9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PathForm({ initialTarget }: {
  initialTarget?: Pick<DraftTarget, "countryCode" | "intakeId">;
}) {
  const screenRef = useRef<HTMLDivElement | null>(null);
  const { shouldAnimate } = useMotionPreferences();
  const { profile, done } = useProfile();
  const savedPlan = usePlan();
  const { setStage, setTarget, resetProgress, resetAll } = usePlanActions();

  const options = useMemo(() => countryOptions(), []);
  /* The engine's "today", recovered from its own arithmetic rather than read
     off a clock: dueDate minus daysUntil is exactly the date it used. */
  const today = useMemo(() => {
    const anchor = savedPlan.steps[0];
    return anchor ? addDays(anchor.dueDate, -anchor.daysUntil) : "1970-01-01";
  }, [savedPlan]);

  const [pending, setPending] = useState<PendingEdits | null>(null);
  const [linkedTarget, setLinkedTarget] = useState(initialTarget);
  const edits = useMemo(() => ({ ...linkedTarget,
    ...(pending && pending.base === profile ? pending.value : {}) }), [linkedTarget, pending, profile]);

  const draft = useMemo<DraftTarget>(
    () => ({
      stage: edits?.stage ?? profile.stage,
      countryCode: edits?.countryCode ?? profile.countryCode,
      intakeId: edits?.intakeId ?? profile.intakeId,
    }),
    [edits, profile],
  );

  const activeOption =
    options.find((option) => option.code === draft.countryCode) ?? options[0];
  const activeIntake =
    activeOption.intakes.find((intake) => intake.id === draft.intakeId) ??
    activeOption.intakes[0];

  const draftPlan = useMemo(() => buildPlan(draft, done), [draft, done]);
  const dirty =
    draft.stage !== profile.stage ||
    draft.countryCode !== profile.countryCode ||
    draft.intakeId !== profile.intakeId;

  const intakeRows = useMemo(
    () =>
      activeOption.intakes.map((intake) => {
        const plan = buildPlan({ ...draft, intakeId: intake.id }, done);
        return {
          intake,
          first: firstDueOf(plan),
          daysToStart: daysBetween(today, intake.startDate),
        };
      }),
    [activeOption, draft, done, today],
  );

  const [notice, setNotice] = useState("");
  const [resetNotice, setResetNotice] = useState("");
  const [confirming, setConfirming] = useState<"progress" | "all" | null>(null);

  /* Every confirmation on this screen replaces the button that was pressed: the
     submit turns into a disabled "already saved", Discard unmounts, and each
     destructive pair swaps question for button and back. Left alone, keyboard
     focus falls to <body> and the next Tab starts the page over. Each handler
     names where focus should land and the effect below puts it there once the
     new DOM exists. */
  const confirmStatus = useRef<HTMLParagraphElement>(null);
  const resetStatus = useRef<HTMLParagraphElement>(null);
  const dangerAsk = useRef<HTMLParagraphElement>(null);
  const clearAgain = useRef<HTMLButtonElement>(null);
  const eraseAgain = useRef<HTMLButtonElement>(null);
  const focusNext = useRef<"confirm" | "reset" | "ask" | "clear" | "erase" | null>(null);

  useEffect(() => {
    const wanted = focusNext.current;
    if (!wanted) return;
    focusNext.current = null;
    const target =
      wanted === "confirm"
        ? confirmStatus.current
        : wanted === "reset"
          ? resetStatus.current
          : wanted === "ask"
            ? dangerAsk.current
            : wanted === "clear"
              ? clearAgain.current
              : eraseAgain.current;
    target?.focus({ preventScroll: true });
  });

  /* Masked reveals only, and nothing is hidden unless the tween runs: the
     from-state is set inside the effect, so a reduced-motion preference
     simply leaves the page fully drawn. */
  useGSAP(
    () => {
      if (!shouldAnimate) return;
      gsap.registerPlugin(CustomEase);
      CustomEase.create("brand", "M0,0 C0.65,0.05 0,1 1,1");
      gsap
        .timeline({ defaults: { duration: 0.75, ease: "brand" } })
        .fromTo(".pa-line > span", { yPercent: 110 }, { yPercent: 0, stagger: 0.085 }, 0.04)
        .fromTo(
          ".pa-preview-head",
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.4, clearProps: "clipPath" },
          0.12,
        );
    },
    { scope: screenRef, dependencies: [shouldAnimate], revertOnUpdate: true },
  );

  const edit = (patch: Partial<DraftTarget>) =>
    setPending((prev) => ({
      base: profile,
      value: { ...(prev && prev.base === profile ? prev.value : {}), ...patch },
    }));

  const pickStage = (stage: Stage) => edit({ stage });

  const pickCountry = (code: string) => {
    const option = options.find((candidate) => candidate.code === code);
    if (!option) return;
    const keepsIntake = option.intakes.some((intake) => intake.id === draft.intakeId);
    edit({
      countryCode: option.code,
      intakeId: keepsIntake ? draft.intakeId : option.intakes[0].id,
    });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!dirty) return;
    focusNext.current = "confirm";
    setStage(draft.stage);
    setTarget(draft.countryCode, draft.intakeId);
    setLinkedTarget(undefined);
    setNotice(
      `Saved: ${activeOption.name} · ${activeIntake.label}, starting ${formatPlanDate(
        activeIntake.startDate,
      )}. The route has been rebuilt from that date.`,
    );
  };

  const ticked = useMemo(() => Object.values(done).filter(Boolean).length, [done]);

  const draftFirst = firstDueOf(draftPlan);
  const savedFirst = firstDueOf(savedPlan);
  const daysToStart = daysBetween(today, activeIntake.startDate);
  const deltaFirst = draftFirst && savedFirst ? daysBetween(savedFirst, draftFirst) : 0;
  const deltaStart =
    daysToStart - daysBetween(today, savedPlan.intake.startDate);
  const deltaMilestones = draftPlan.counts.total - savedPlan.counts.total;
  const deltaVerified = draftPlan.counts.verified - savedPlan.counts.verified;

  const verifiedPct =
    draftPlan.counts.total === 0
      ? 0
      : (draftPlan.counts.verified / draftPlan.counts.total) * 100;
  const targetKey = `${draft.countryCode}-${draft.intakeId}`;

  const openingSteps = useMemo(
    () =>
      [...draftPlan.steps]
        .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
        .slice(0, 4),
    [draftPlan],
  );

  const deltas = [
    {
      key: "First deadline",
      from: savedFirst ? formatPlanDate(savedFirst) : "—",
      to: draftFirst ? formatPlanDate(draftFirst) : "—",
      move: movedBy(deltaFirst, ""),
    },
    {
      key: "Departure",
      from: formatPlanDate(savedPlan.intake.startDate),
      to: formatPlanDate(activeIntake.startDate),
      move: movedBy(deltaStart, ""),
    },
    {
      key: "Milestones",
      from: String(savedPlan.counts.total),
      to: String(draftPlan.counts.total),
      move:
        deltaMilestones === 0
          ? "The same number of steps, at different dates."
          : `${Math.abs(deltaMilestones)} ${
              deltaMilestones > 0 ? "more" : "fewer"
            } steps to work through.`,
    },
    {
      key: "Verified dates",
      from: String(savedPlan.counts.verified),
      to: String(draftPlan.counts.verified),
      move:
        deltaVerified === 0
          ? "The same number we could confirm officially."
          : `${Math.abs(deltaVerified)} ${
              deltaVerified > 0 ? "more" : "fewer"
            } dates we could confirm from an official page.`,
    },
  ];

  return (
    <div className="path-screen" ref={screenRef} data-motion={shouldAnimate ? "on" : "off"}>
      <header className="path-hero">
        <h1>
          <span className="pa-line">
            <span>Four answers.</span>
          </span>
          <span className="pa-line">
            <span>
              The whole plan <span className="serif">redraws</span>.
            </span>
          </span>
        </h1>

        {/* One context line: the privacy fact, not a paragraph about the page. */}
        <p className="path-context">Four questions · no account · nothing leaves this browser</p>
        {linkedTarget && <p className="pa-help">Your preview selection is here. It is not saved until you confirm.</p>}
      </header>

      <section className="path-section" aria-labelledby="path-questions">
        <h2 id="path-questions">The four questions</h2>

        <form className="path-form" onSubmit={onSubmit}>
          <div className="path-questions">
            <fieldset className="pa-field">
              <legend>01 — Where you are now</legend>
              {/* The one thing a student actually worries about here. */}
              <p className="pa-help" id="path-help-stage">
                Saved on this device. It does not move a single date.
              </p>
              <div className="pa-stage-rail">
                {STAGES.map((stage) => (
                  <label
                    key={stage}
                    className="pa-choice"
                    data-checked={draft.stage === stage || undefined}
                  >
                    <input
                      type="radio"
                      name="stage"
                      value={stage}
                      checked={draft.stage === stage}
                      aria-describedby="path-help-stage"
                      onChange={() => pickStage(stage)}
                    />
                    <span className="pa-choice-name">{STAGE_LABELS[stage]}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="pa-field">
              <legend>02 — Where you are going</legend>
              <p className="pa-help" id="path-help-country">
                Rolling means earlier is better, but the selective programmes inside it
                still publish one late deadline for their main intake. Fixed means one
                deadline closes the round.
              </p>
              <div className="pa-country-grid">
                {options.map((option) => (
                  <label
                    key={option.code}
                    className="pa-choice"
                    data-checked={draft.countryCode === option.code || undefined}
                  >
                    <input
                      type="radio"
                      name="country"
                      value={option.code}
                      checked={draft.countryCode === option.code}
                      aria-describedby="path-help-country"
                      onChange={() => pickCountry(option.code)}
                    />
                    <span className="pa-choice-name">{option.name}</span>
                    <span className="pa-choice-meta">
                      <span className="pa-badge" data-model={option.admission}>
                        {option.admission === "rolling" ? "Rolling" : "Fixed"}
                      </span>
                      <span>
                        {option.intakes.length} intakes · earliest{" "}
                        {option.intakes[0].label}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <CountryGallery key={draft.countryCode} code={draft.countryCode} name={activeOption.name} />

            <fieldset className="pa-field">
              <legend>03 — Which round</legend>
              <label className="pa-select-label" htmlFor="path-intake">
                Intake for {activeOption.name}
              </label>
              <span className="pa-select-wrap">
                <select
                  id="path-intake"
                  name="intake"
                  className="pa-select"
                  value={draft.intakeId}
                  aria-describedby="path-help-intake"
                  onChange={(event) => edit({ intakeId: event.target.value })}
                >
                  {activeOption.intakes.map((intake) => (
                    <option key={intake.id} value={intake.id}>
                      {intake.label} — course starts {formatPlanDate(intake.startDate)}
                    </option>
                  ))}
                </select>
                <span className="pa-select-caret" aria-hidden="true">
                  <svg viewBox="0 0 14 14" focusable="false">
                    <path
                      d="M2.5 5.5 7 10l4.5-4.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </span>

              <div className="pa-table-wrap">
                <table className="pa-table">
                  <caption id="path-help-intake">
                    Every {activeOption.name} intake, and what choosing it does to
                    the plan.
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Intake</th>
                      <th scope="col">Course starts</th>
                      <th scope="col">First deadline</th>
                    </tr>
                  </thead>
                  <tbody>
                    {intakeRows.map((row) => (
                      <tr
                        key={row.intake.id}
                        data-selected={row.intake.id === draft.intakeId || undefined}
                      >
                        <th scope="row">
                          {row.intake.label}
                          {row.intake.id === draft.intakeId ? (
                            <span className="pa-flag">Using this one</span>
                          ) : null}
                        </th>
                        <td>{formatPlanDate(row.intake.startDate)}</td>
                        <td>
                          {row.first ? formatPlanDate(row.first) : "—"}
                          <span className="pa-flag">{daysWord(row.daysToStart)} out</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </fieldset>

            <fieldset className="pa-field pa-confirm">
              <legend>04 — Confirm</legend>
              <div className="pa-confirm-body">
                <div>
                  <p className="pa-help">
                    {dirty
                      ? "You have unsaved answers. Confirming replaces your saved target; the milestones you have already ticked off stay."
                      : "These answers match your saved route. Change anything above and this comes back."}
                  </p>
                  <p className="pa-status" role="status" ref={confirmStatus} tabIndex={-1}>
                    {notice}
                  </p>
                </div>
                <div className="pa-actions">
                  <button type="submit" className="pa-button" disabled={!dirty}>
                    <span aria-hidden="true">
                      <CheckMark />
                    </span>
                    {dirty ? "Confirm this route" : "Route already saved"}
                  </button>
                  {dirty ? (
                    <button
                      type="button"
                      className="pa-button pa-button-quiet"
                      onClick={() => {
                        focusNext.current = "confirm";
                        setPending(null);
                        setLinkedTarget(undefined);
                        setNotice("Back to your saved route.");
                      }}
                    >
                      <span aria-hidden="true">
                        <RotateMark />
                      </span>
                      Discard changes
                    </button>
                  ) : null}
                </div>
              </div>
            </fieldset>
          </div>

          <aside className="pa-preview" aria-label="What this target produces">
            <p className="eyebrow">
              {dirty ? "If you confirm" : "Your current route"} · built by the
              engine
            </p>

            {/* Key only the changed facts, keeping the caveat and link mounted. */}
            <div className="pa-preview-head pa-consequence-update" key={`${targetKey}-${draft.stage}`}>
              <p className="pa-preview-where">
                {activeOption.name} <span className="serif">·</span>{" "}
                {activeIntake.label}
              </p>
              <p className="pa-preview-count">{STAGE_LABELS[draft.stage]}</p>
            </div>

            <dl className="pa-big pa-consequence-update" key={`days-${targetKey}`}>
              <dt>
                {daysToStart >= 0 ? "Days until you start" : "Days since you started"}
              </dt>
              <dd>
                {Math.abs(daysToStart)} <span className="pa-big-unit">days</span>
                <span className="pa-big-sub">Counting down to {formatPlanDate(activeIntake.startDate)}.</span>
              </dd>
            </dl>

            {/* Everything else, demoted to one inline row of small text. */}
            <p className="pa-micro pa-consequence-update" key={`facts-${targetKey}`}>
              <span>
                <strong>{draftPlan.counts.total}</strong> milestones
              </span>
              <span aria-hidden="true">·</span>
              <span>
                first deadline {draftFirst ? formatPlanDate(draftFirst) : "—"}
              </span>
              <span aria-hidden="true">·</span>
              <span data-risk={draftPlan.counts.risk > 0 || undefined}>
                <strong>{draftPlan.counts.risk}</strong> already past{" "}
                {draftPlan.counts.risk === 1 ? "its date" : "their date"}
              </span>
            </p>

            <div className="pa-conf">
              <div className="pa-conf-bar" aria-hidden="true">
                <span style={{ transform: `scaleX(${verifiedPct / 100})` }} />
              </div>
              <p>
                <strong>
                  {draftPlan.counts.verified} of {draftPlan.counts.total} verified
                </strong>{" "}
                — an official source states the rule, figure or date. The other{" "}
                {draftPlan.counts.unverified} are a typical pattern or our own estimate —
                labelled on the route and linked to the page each came from.
              </p>
            </div>

            <div className="pa-admission">
              <span className="pa-badge" data-model={draftPlan.country.admission}>
                {draftPlan.country.admission === "rolling" ? "Rolling" : "Fixed"}
              </span>
              <h3>
                {draftPlan.country.admission === "rolling"
                  ? "No single cliff to miss."
                  : "One deadline closes the round."}
              </h3>
              <p>
                {draftPlan.country.admission === "rolling"
                  ? "Places fill as applications arrive, so earlier really is better — but the selective programmes inside this system still publish one late deadline for their main intake, and that date is real."
                  : "Admissions close on a published date. Everything behind it — documents, tests, references, funding, the visa appointment — is yours to control."}
              </p>
              <details className="pa-preview-caveat">
                <summary>
                  <span className="pa-preview-caveat-plus" aria-hidden="true">
                    +
                  </span>
                  Read the full {draftPlan.country.name} caveat
                </summary>
                <p className="pa-preview-caveat-body">{draftPlan.country.notes}</p>
              </details>
            </div>

            <div className="pa-preview-foot">
              <p className="eyebrow">The first stretch</p>
              <ul className="pa-open-milestones pa-consequence-update" key={`opening-${targetKey}`}>
                {openingSteps.map((step) => (
                  <li key={step.id}>
                    <span className="pa-open-count">{countdown(step.offsetDays)}</span>
                    <span>{step.title}</span>
                  </li>
                ))}
              </ul>
              <Link className="pa-preview-link" href="/route">
                <span aria-hidden="true">
                  <ArrowRight />
                </span>
                See the full route
              </Link>
            </div>
          </aside>
        </form>

        {dirty ? (
          <div className="pa-delta">
            <p className="eyebrow">What confirming changes</p>
            <ul className="pa-delta-list">
              {deltas.map((delta) => (
                <li className="pa-consequence-update" key={`${targetKey}-${delta.key}`}>
                  <span className="pa-delta-key">{delta.key}</span>
                  <span className="pa-delta-from">{delta.from}</span>
                  <span className="pa-delta-to">{delta.to}</span>
                  <span className="pa-delta-move">{delta.move}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>

      <section className="path-section" aria-labelledby="path-honesty">
        <h2 id="path-honesty">How honest are these dates?</h2>

        {/* The distinction itself, kept as two plain definitions — not two boxes. */}
        <ul className="pa-ledger">
          <li className="pa-ledger-item">
            <span className="pa-ledger-count">{draftPlan.counts.verified}</span>
            <h3>Verified</h3>
            <p>{CONFIDENCE_VERIFIED}</p>
          </li>
          <li className="pa-ledger-item" data-tone="signal">
            <span className="pa-ledger-count">{draftPlan.counts.unverified}</span>
            <h3>Not verified</h3>
            <p>{CONFIDENCE_OTHER}</p>
          </li>
        </ul>

        <p className="path-intro is-spaced">
          Even a verified date is a starting point, not a promise: universities set
          their own deadlines per programme, official pages change, and the research
          behind these figures is dated October 2026. Every milestone on the route
          links to the page its rule came from — read it, then decide.
        </p>
      </section>

      <section className="path-section" aria-labelledby="path-data">
        <h2 id="path-data">Where your data lives</h2>
        <div className="pa-privacy">
          <div>
            <p className="path-intro">
              There is no account here and no server holding your answers. Your
              stage, your target and every milestone you tick off are read from and
              written to this browser&rsquo;s local storage, on this device.
            </p>
            <ul className="pa-privacy-points">
              <li>
                <span>
                  Nothing is uploaded, nobody else can see it, and there is no third
                  party anywhere in the loop.
                </span>
              </li>
              <li>
                <span>It works offline, and no cookie or tracker is involved in reading it.</span>
              </li>
            </ul>
          </div>
          <div>
            {/* The honest cost of that privacy. None of this is decoration. */}
            <p className="path-intro">
              It stays on your device — which cuts both ways.
            </p>
            <ul className="pa-privacy-points">
              <li>
                <span>
                  It is one device. Your phone, your laptop&rsquo;s other browser
                  profile or a shared computer starts completely empty.
                </span>
              </li>
              <li>
                <span>
                  There is no sync and no backup. Clearing your browsing data erases
                  the plan, and there is nothing left to restore it from.
                </span>
              </li>
            </ul>
            <p className="pa-privacy-caveat">
              Take a screenshot of your route before you clear anything. That is
              the only copy that exists.
            </p>
          </div>
        </div>

        <div className="pa-danger">
          <div className="pa-danger-row">
            <div>
              <span className="pa-danger-tag">
                <span aria-hidden="true">
                  <WarnMark />
                </span>
                Destructive · cannot be undone
              </span>
              <h3>Clear your progress</h3>
              <p>
                Unticks the {ticked} milestone{ticked === 1 ? "" : "s"} you have
                already ticked off, and touches nothing else. Your target stays at{" "}
                {savedPlan.country.name} · {savedPlan.intake.label}.
              </p>
            </div>
            <div>
              {confirming === "progress" ? (
                <>
                  <p className="pa-confirm-ask" role="alert" ref={dangerAsk} tabIndex={-1}>
                    Clear {ticked} ticked milestone{ticked === 1 ? "" : "s"}? This
                    cannot be undone.
                  </p>
                  <div className="pa-danger-actions">
                    <button
                      type="button"
                      className="pa-button-danger pa-button-danger-solid"
                      onClick={() => {
                        focusNext.current = "clear";
                        resetProgress();
                        setConfirming(null);
                        setResetNotice("Progress cleared. Your target is unchanged.");
                      }}
                    >
                      <span aria-hidden="true">
                        <CloseMark />
                      </span>
                      Yes, clear progress
                    </button>
                    <button
                      type="button"
                      className="pa-button-danger"
                      onClick={() => {
                        focusNext.current = "clear";
                        setConfirming(null);
                      }}
                    >
                      Keep them
                    </button>
                  </div>
                </>
              ) : (
                <div className="pa-danger-actions">
                  <button
                    type="button"
                    className="pa-button-danger"
                    ref={clearAgain}
                    onClick={() => {
                      focusNext.current = "ask";
                      setResetNotice("");
                      setConfirming("progress");
                    }}
                  >
                    <span aria-hidden="true">
                      <WarnMark />
                    </span>
                    Clear progress
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="pa-danger-row">
            <div>
              <span className="pa-danger-tag">
                <span aria-hidden="true">
                  <WarnMark />
                </span>
                Destructive · erases your target too
              </span>
              <h3>Erase everything</h3>
              <p>
                Resets your target as well as your progress, back to the default
                United States · Fall 2027. Every date you chose by hand goes with
                it.
              </p>
            </div>
            <div>
              {confirming === "all" ? (
                <>
                  <p className="pa-confirm-ask" role="alert" ref={dangerAsk} tabIndex={-1}>
                    Erase your target and all progress? This cannot be undone.
                  </p>
                  <div className="pa-danger-actions">
                    <button
                      type="button"
                      className="pa-button-danger pa-button-danger-solid"
                      onClick={() => {
                        focusNext.current = "erase";
                        resetAll();
                        setLinkedTarget(undefined);
                        setConfirming(null);
                        setResetNotice(
                          "Everything erased — your target and every ticked milestone are gone.",
                        );
                      }}
                    >
                      <span aria-hidden="true">
                        <CloseMark />
                      </span>
                      Yes, erase everything
                    </button>
                    <button
                      type="button"
                      className="pa-button-danger"
                      onClick={() => {
                        focusNext.current = "erase";
                        setConfirming(null);
                      }}
                    >
                      Keep it
                    </button>
                  </div>
                </>
              ) : (
                <div className="pa-danger-actions">
                  <button
                    type="button"
                    className="pa-button-danger"
                    ref={eraseAgain}
                    onClick={() => {
                      focusNext.current = "ask";
                      setResetNotice("");
                      setConfirming("all");
                    }}
                  >
                    <span aria-hidden="true">
                      <WarnMark />
                    </span>
                    Erase everything
                  </button>
                </div>
              )}
            </div>
          </div>

          <p className="pa-danger-status" role="status" ref={resetStatus} tabIndex={-1}>
            {resetNotice}
          </p>
        </div>
      </section>
    </div>
  );
}
