import {
  COUNTRY_CYCLES,
  MILESTONE_PHASES,
  type Confidence,
  type CountryCycle,
  type Intake,
  type Milestone,
  type MilestonePhase,
} from "./country-cycles";

/*
 * The engine turns a target (country + intake) into an ordered, dated plan.
 *
 * Everything here is derived, never hardcoded: dates count back from the
 * intake start, and status is computed from today's date plus unmet
 * dependencies. That is what separates a plan from a diagram.
 */

export type Stage = "exploring" | "shortlisting" | "testing" | "applying" | "visa";

export const STAGES: readonly Stage[] = [
  "exploring",
  "shortlisting",
  "testing",
  "applying",
  "visa",
] as const;

export const STAGE_LABELS: Record<Stage, string> = {
  exploring: "Just exploring",
  shortlisting: "Building a shortlist",
  testing: "Sitting the tests",
  applying: "Applying",
  visa: "Visa & arrival",
};

/** The student's four inputs. This is the entire configuration surface. */
export type Profile = {
  stage: Stage;
  countryCode: string;
  intakeId: string;
};

/** Milestone + everything computed about it for this student, today. */
export type PlanStep = Milestone & {
  phase: MilestonePhase;
  /** ISO date this milestone is due, counted back from the intake start. */
  dueDate: string;
  /** Whole days from today until due. Negative means it has passed. */
  daysUntil: number;
  /** "overdue" | "today" | "soon" | "upcoming" — relative urgency band. */
  urgency: "overdue" | "today" | "soon" | "upcoming";
  /** Milestone ids from dependsOn that are not done yet. */
  blockers: string[];
  /** False when a dependency is still open. */
  unblocked: boolean;
  /**
   * done | now | next | later | risk — same vocabulary the UI already uses.
   *
   * `now` and `next` are single steps and are only ever awarded to a step a
   * student could pick up today: its date has not passed and nothing open
   * stands in front of it. A step past its date is `risk` until it is ticked,
   * and a step still waiting on an open dependency is `later`, not `now`.
   */
  status: "done" | "now" | "next" | "later" | "risk";
};

export type Plan = {
  country: CountryCycle;
  intake: Intake;
  steps: PlanStep[];
  /** Steps grouped by phase, in canonical phase order. */
  phases: Array<{ phase: MilestonePhase; steps: PlanStep[] }>;
  counts: {
    total: number;
    done: number;
    now: number;
    next: number;
    later: number;
    risk: number;
    verified: number;
    unverified: number;
  };
  /**
   * The single thing to do next, i.e. the step promoted to `status: "now"`:
   * the soonest milestone that is neither past its date nor waiting on an
   * open dependency. It is read from the same ranking the statuses come from,
   * so /today and the step list can never point at different steps.
   *
   * When that ranking is empty — every remaining step is late, or waiting on
   * something that is late — it falls back to the soonest unfinished step
   * that nothing blocks: the catch-up item everything else is queued behind,
   * rather than an empty page. Null only when every milestone is done.
   */
  nextStep: PlanStep | null;
  /** Finished steps the chosen steps depend on that are not yet done. */
  blockingSteps: PlanStep[];
  /** True when nothing is done yet and the user has never chosen a step. */
  untouched: boolean;
};

const DAY_MS = 86_400_000;

/**
 * "Today" is captured once at module load, not per render.
 *
 * Two reasons: reading the clock during render makes the result unstable
 * (Next flags it, and a plan that changes on every keystroke is wrong), and a
 * student mid-session should see one consistent "today" rather than a plan
 * that silently shifts. Server routes pass their own date when they need to.
 */
export const ENGINE_TODAY = new Date();

function toUtc(date: string): number {
  // Date-only strings are parsed as UTC midnight so day maths never drifts
  // with the machine's timezone.
  const [y, m, d] = date.split("-").map(Number);
  return Date.UTC(y ?? 1970, (m ?? 1) - 1, d ?? 1);
}

export function todayIso(now: Date = ENGINE_TODAY): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function daysBetween(fromIso: string, toIso: string): number {
  return Math.round((toUtc(toIso) - toUtc(fromIso)) / DAY_MS);
}

export function addDays(iso: string, days: number): string {
  const t = new Date(toUtc(iso) + days * DAY_MS);
  return t.toISOString().slice(0, 10);
}

export function getCountry(code: string): CountryCycle {
  return (
    COUNTRY_CYCLES.find((c) => c.code === code) ??
    (COUNTRY_CYCLES[0] as CountryCycle)
  );
}

export function getIntake(country: CountryCycle, intakeId: string): Intake {
  return (
    country.intakes.find((i) => i.id === intakeId) ??
    (country.intakes[0] as Intake)
  );
}

/** Milestone ids the student has ticked off. Persisted by the caller. */
export type Completion = Record<string, boolean>;

function urgencyFor(daysUntil: number): PlanStep["urgency"] {
  if (daysUntil < 0) return "overdue";
  if (daysUntil === 0) return "today";
  if (daysUntil <= 30) return "soon";
  return "upcoming";
}

/**
 * Build the plan. `done` is keyed by milestone id, so the student's own
 * progress is the only source of "done" — it is never inferred from dates.
 */
export function buildPlan(
  profile: Profile,
  done: Completion = {},
  now: Date = ENGINE_TODAY,
): Plan {
  const country = getCountry(profile.countryCode);
  const intake = getIntake(country, profile.intakeId);
  const today = todayIso(now);

  // 1. Date every milestone by counting back from the intake start.
  const dated = country.milestones.map((milestone) => {
    const dueDate = addDays(intake.startDate, -milestone.offsetDays);
    const daysUntil = daysBetween(today, dueDate);
    return { milestone, dueDate, daysUntil };
  });

  // 2. Resolve blockers against what the student has actually completed.
  const steps: PlanStep[] = dated.map(({ milestone, dueDate, daysUntil }) => {
    const blockers = milestone.dependsOn.filter((id) => !done[id]);
    const urgency = urgencyFor(daysUntil);
    return {
      ...milestone,
      phase: milestone.phase,
      dueDate,
      daysUntil,
      urgency,
      blockers,
      unblocked: blockers.length === 0,
      status: "later",
    };
  });
  const stepById = new Map(steps.map((s) => [s.id, s]));

  // 3. Rank once, then read a slot out of it. Only an actionable step — not past
  //    its date, nothing open in front of it — can hold a now/next slot. Ranking
  //    used to run over every open step including the overdue ones, and the loop
  //    below then skipped those as risk without giving the slot back, so a plan
  //    that was behind promoted nothing at all.
  const pending = steps.filter((s) => !done[s.id]);
  const unblockedFirst = (a: PlanStep, b: PlanStep) =>
    Number(b.unblocked) - Number(a.unblocked) || a.daysUntil - b.daysUntil;

  // Ordering is unchanged: unblocked before blocked, then soonest date first.
  // Filtering the blocked out up front is what applies that weighting, so every
  // member left here is unblocked and the sort is effectively soonest-first.
  const ranked = pending
    .filter((s) => s.urgency !== "overdue" && s.unblocked)
    .sort(unblockedFirst);

  // Slot per milestone id, so the loop below is a lookup rather than a scan of
  // `ranked` for every step.
  const slotById = new Map(ranked.map((step, position) => [step.id, position]));

  for (const step of steps) {
    if (done[step.id]) {
      step.status = "done";
      continue;
    }
    if (step.urgency === "overdue") {
      step.status = "risk";
      continue;
    }
    const slot = slotById.get(step.id);
    if (slot === 0) step.status = "now";
    else if (slot === 1) step.status = "next";
    else step.status = "later";
  }

  const counts = {
    total: steps.length,
    done: steps.filter((s) => s.status === "done").length,
    now: steps.filter((s) => s.status === "now").length,
    next: steps.filter((s) => s.status === "next").length,
    later: steps.filter((s) => s.status === "later").length,
    risk: steps.filter((s) => s.status === "risk").length,
    verified: steps.filter((s) => s.confidence === "verified").length,
    unverified: steps.filter((s) => s.confidence !== "verified").length,
  };

  const phases = MILESTONE_PHASES.map((phase) => ({
    phase,
    steps: steps.filter((s) => s.phase === phase),
  })).filter((group) => group.steps.length > 0);

// The promoted step is the head of the ranking above — the same object /today
  // and /steps read the status flags off. Only when nothing is actionable does
  // it fall back to the soonest unfinished step that nothing blocks, so a
  // student who is behind still gets the one thing worth starting (the step
  // everything else is waiting on) rather than an empty hero.
  const nextStep = ranked[0] ?? pending.sort(unblockedFirst)[0] ?? null;

  const blockingSteps: PlanStep[] = [];
  if (nextStep) {
    const seen = new Set<string>();
    const queue = [...nextStep.blockers];
    while (queue.length) {
      const id = queue.shift() as string;
      if (seen.has(id)) continue;
      seen.add(id);
      const step = stepById.get(id);
      if (!step) continue;
      if (!done[id]) blockingSteps.push(step);
      queue.push(...step.blockers);
    }
  }

  return {
    country,
    intake,
    steps,
    phases,
    counts,
    nextStep,
    blockingSteps,
    untouched: counts.done === 0,
  };
}

/** Options for the intake picker, across every supported country. */
export function countryOptions(): Array<{
  code: string;
  name: string;
  admission: CountryCycle["admission"];
  intakes: Intake[];
}> {
  return COUNTRY_CYCLES.map((c) => ({
    code: c.code,
    name: c.name,
    admission: c.admission,
    intakes: c.intakes,
  }));
}

export const CONFIDENCE_LABELS: Record<Confidence, string> = {
  verified: "Verified",
  typical: "Typical",
  estimate: "Estimate",
};