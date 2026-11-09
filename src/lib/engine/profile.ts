"use client";

import { createContext, createElement, useContext, useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { buildPlan, type Plan } from "./plan";
import { createWorkspaceStore, type WorkspaceStore } from "@/lib/workspace/store";
import { resolveDeadlineOverrides } from "@/lib/workspace/types";

const WorkspaceContext = createContext<WorkspaceStore | null>(null);

/** Per-mounted application state, never a server-global authenticated snapshot. */
export function ProfileProvider({ children }: { children: ReactNode }) {
  const [store] = useState(() => createWorkspaceStore());
  useEffect(() => { void store.refresh(); }, [store]);
  useEffect(() => {
    const refresh = () => { if (!document.hidden) void store.refresh(); };
    const clear = () => { store.clear(); };
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refresh);
    window.addEventListener("waymark:session-ended", clear);
    return () => {
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", refresh);
      window.removeEventListener("waymark:session-ended", clear);
    };
  }, [store]);
  return createElement(WorkspaceContext.Provider, { value: store }, children);
}

function useStore() {
  const store = useContext(WorkspaceContext);
  if (!store) throw new Error("Waymark planner hooks require ProfileProvider.");
  return store;
}

export function useProfile() {
  const store = useStore();
  return useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
}

export function usePlan(now?: Date): Plan {
  const workspace = useProfile();
  const plan = buildPlan(workspace.profile, workspace.done, now,
    resolveDeadlineOverrides(workspace.deadlineRevisions, workspace.profile.intakeId));
  return { ...plan, untouched: !workspace.targetChosen };
}

export function usePlanActions() {
  const store = useStore();
  return { setTarget: store.setTarget, toggleStep: store.toggleStep, resetProgress: store.resetProgress,
    refresh: store.refresh, importLegacy: store.importLegacy,
    startCheckpoint: store.startCheckpoint, addCheckpointEvidence: store.addCheckpointEvidence,
    skipCheckpoint: store.skipCheckpoint, completeCheckpoint: store.completeCheckpoint };
}
