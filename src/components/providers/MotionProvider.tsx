"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type MotionPreferences = {
  shouldAnimate: boolean;
  reducedMotion: boolean;
};

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const MotionContext = createContext<MotionPreferences | null>(null);

function subscribeToReducedMotion(onChange: () => void) {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return () => {};
  }

  const query = window.matchMedia(reducedMotionQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getReducedMotionSnapshot() {
  return (
    typeof window === "undefined" ||
    typeof window.matchMedia !== "function" ||
    window.matchMedia(reducedMotionQuery).matches
  );
}

// Server rendering and the first hydration pass both start with static content.
function getServerReducedMotionSnapshot() {
  return true;
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot,
  );
  /*
   * Motion follows the operating system. There is deliberately no in-page
   * pause control any more: prefers-reduced-motion is the single switch, and
   * it is honoured from the very first paint.
   */
  const preferences = useMemo(
    () => ({ shouldAnimate: !reducedMotion, reducedMotion }),
    [reducedMotion],
  );

  return <MotionContext.Provider value={preferences}>{children}</MotionContext.Provider>;
}

export function useMotionPreferences(): MotionPreferences {
  const preferences = useContext(MotionContext);

  if (!preferences) {
    throw new Error("useMotionPreferences must be used within a MotionProvider");
  }

  return preferences;
}

export default MotionProvider;
