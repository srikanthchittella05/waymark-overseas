"use client";

import { useCallback, useSyncExternalStore } from "react";
import { buildPlan, getCountry, getIntake, type Completion, type Plan, type Profile, type Stage } from "./plan";

/*
 * Local-first persistence. No account, no server: a student's plan is theirs,
 * it stays in their browser, and it works offline. The cost is stated plainly
 * in the UI — see ConfidenceBanner.
 */

const PROFILE_KEY = "waymark.profile.v1";
const DONE_KEY = "waymark.done.v1";

export const DEFAULT_PROFILE: Profile = {
  stage: "exploring",
  countryCode: "US",
  intakeId: "us-fall-2027",
};

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Private mode or a full quota: the session still works in memory.
  }
}

// ---------------------------------------------------------------- listeners
type Snapshot = { version: number; profile: Profile; done: Completion };

const listeners = new Set<() => void>();
let snapshotVersion = 0;
let cached: Snapshot | null = null;

function emit() {
  snapshotVersion += 1;
  cached = null;
  listeners.forEach((fn) => fn());
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  // Keep multiple tabs in step without any server.
  const onStorage = (event: StorageEvent) => {
    if (event.key === PROFILE_KEY || event.key === DONE_KEY) emit();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

/**
 * A single frozen constant. React requires getServerSnapshot to return a
 * cached value; building a fresh object per call triggers a warning and
 * defeats the hydration-time equality check.
 */
const SERVER_SNAPSHOT: Snapshot = Object.freeze({
  profile: DEFAULT_PROFILE,
  done: {},
  version: 0,
});

/** Server render and first client paint always agree. */
function getServerSnapshot(): Snapshot {
  return SERVER_SNAPSHOT;
}

function getSnapshot(): Snapshot {
  if (typeof window === "undefined") return getServerSnapshot();
  if (!cached || cached.version !== snapshotVersion) {
    const storedProfile = readJson<Profile>(PROFILE_KEY, DEFAULT_PROFILE);
    const country = getCountry(storedProfile.countryCode ?? DEFAULT_PROFILE.countryCode);
    cached = {
      version: snapshotVersion,
      profile: {
        stage: storedProfile.stage ?? DEFAULT_PROFILE.stage,
        countryCode: country.code,
        intakeId: getIntake(country, storedProfile.intakeId ?? "").id,
      },
      done: readJson<Completion>(DONE_KEY, {}),
    };
  }
  return cached;
}

function read(): { profile: Profile; done: Completion } {
  const snapshot = getSnapshot();
  return { profile: snapshot.profile, done: snapshot.done };
}

// ------------------------------------------------------------------- hooks
export function useProfile() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return {
    profile: snapshot.profile,
    done: snapshot.done,
    ready: typeof window !== "undefined",
  };
}

/**
 * The plan for the current profile. `today` is passed in so callers can make
 * it deterministic in tests rather than reading the clock inside the store.
 */
export function usePlan(now?: Date): Plan {
  const { profile, done } = useProfile();
  return buildPlan(profile, done, now);
}

export function usePlanActions() {
  const setStage = useCallback((stage: Stage) => {
    const { profile } = read();
    writeJson(PROFILE_KEY, { ...profile, stage });
    emit();
  }, []);

  const setTarget = useCallback((countryCode: string, intakeId?: string) => {
    const { profile } = read();
    const country = getCountry(countryCode);
    writeJson(PROFILE_KEY, {
      ...profile,
      countryCode: country.code,
      intakeId: intakeId ?? getIntake(country, "").id,
    });
    emit();
  }, []);

  const toggleStep = useCallback((id: string) => {
    const { done } = read();
    const next = { ...done };
    if (next[id]) delete next[id];
    else next[id] = true;
    writeJson(DONE_KEY, next);
    emit();
  }, []);

  const resetProgress = useCallback(() => {
    writeJson(DONE_KEY, {});
    emit();
  }, []);

  const resetAll = useCallback(() => {
    writeJson(DONE_KEY, {});
    writeJson(PROFILE_KEY, DEFAULT_PROFILE);
    emit();
  }, []);

  return { setStage, setTarget, toggleStep, resetProgress, resetAll };
}