import { DEFAULT_PROFILE } from "@/lib/engine/defaults";
import { COUNTRY_CYCLES } from "@/lib/engine/country-cycles";
import type { Completion, Profile } from "@/lib/engine/plan";
import { targetSchema } from "@/lib/platform/validation";
import { checkpointActionSchema, checkpointEvidenceSchema, workspaceDataSchema, type CheckpointProgress, type WorkspaceData } from "./types";

export type WorkspaceSnapshot = WorkspaceData & {
  ready: boolean; mode: "loading" | "guest" | "account" | "error";
  sync: "idle" | "saving" | "error"; error: string | null; targetChosen: boolean;
  checkpoints: Record<string, CheckpointProgress>;
};
export type WorkspaceTransport = (path: string, init?: RequestInit) => Promise<Response>;

function initialSnapshot(): WorkspaceSnapshot {
  return { configured: false, user: null, profile: { ...DEFAULT_PROFILE }, done: {}, checkpoints: {}, planId: null,
    planVersion: 0, hasSavedTarget: false, deadlineRevisions: [], ready: false,
    mode: "loading", sync: "idle", error: null, targetChosen: false };
}

function targetKey(profile: Profile) { return `${profile.countryCode}:${profile.intakeId}`; }

class WorkspaceResponseError extends Error {
  constructor(message: string, readonly status: number, readonly code: string) { super(message); }
}

async function responseData(response: Response): Promise<WorkspaceData> {
  const payload: unknown = await response.json();
  if (!response.ok) {
    const detail = payload && typeof payload === "object" && "error" in payload ? payload.error : null;
    const message = detail && typeof detail === "object" && "message" in detail && typeof detail.message === "string"
      ? detail.message : "Your plan could not be loaded or saved. Please try again.";
    const code = detail && typeof detail === "object" && "code" in detail && typeof detail.code === "string" ? detail.code : "request_failed";
    throw new WorkspaceResponseError(message, response.status, code);
  }
  const data = workspaceDataSchema.parse(payload);
  return { ...data, checkpoints: data.checkpoints ?? {} };
}

export function createWorkspaceStore(transport: WorkspaceTransport = fetch) {
  const serverSnapshot: WorkspaceSnapshot = { ...initialSnapshot(),
    mode: "guest", ready: true, checkpoints: {} };
  let snapshot = serverSnapshot;
  const listeners = new Set<() => void>();
  type GuestProgress = { done: Completion; checkpoints: Record<string, CheckpointProgress> };
  const guestProgress = new Map<string, GuestProgress>();
  let generation = 0;
  let loading: Promise<void> | null = null;

  function update(patch: Partial<WorkspaceSnapshot>) {
    if (patch.profile && patch.profile.countryCode === snapshot.profile.countryCode &&
        patch.profile.intakeId === snapshot.profile.intakeId && patch.profile.stage === snapshot.profile.stage) {
      patch.profile = snapshot.profile;
    }
    snapshot = { ...snapshot, ...patch };
    listeners.forEach((listener) => listener());
  }

  function persistGuestProgress() {
    guestProgress.set(targetKey(snapshot.profile), { done: { ...snapshot.done }, checkpoints: { ...snapshot.checkpoints } });
  }

  async function refresh() {
    if (snapshot.sync === "saving") return;
    if (loading) return loading;
    const token = ++generation;
    const operation = (async () => {
      try {
        const data = await responseData(await transport("/api/workspace", { cache: "no-store", credentials: "same-origin", signal: AbortSignal.timeout(15000) }));
        if (token !== generation) return;
        if ((snapshot.mode === "account") !== Boolean(data.user)) guestProgress.clear();
        const preservePreview = snapshot.mode === "guest" && !data.user;
        update({ ...data, ...(preservePreview ? { profile: snapshot.profile, done: snapshot.done, checkpoints: snapshot.checkpoints } : {}),
          ready: true, mode: data.user ? "account" : "guest", sync: "idle", error: null,
          targetChosen: preservePreview ? snapshot.targetChosen : data.hasSavedTarget });
      } catch {
        if (token !== generation) return;
        // An unconfigured auth provider is not an error for guests — the preview
        // keeps working from browser state. Only real failures disable writes.
        if (snapshot.mode === "guest") return;
        guestProgress.clear();
        update({ ...initialSnapshot(), ready: true, mode: "error", sync: "error",
          error: "Your account or plan could not be verified. Changes are disabled; reload to try again." });
      }
    })();
    loading = operation;
    void operation.then(() => { if (loading === operation) loading = null; });
    return operation;
  }

  async function mutate(path: string, method: string, payload: unknown): Promise<boolean> {
    if (!snapshot.ready || snapshot.mode === "error" || snapshot.sync === "saving" || !snapshot.user) return false;
    const userId = snapshot.user.id;
    const token = ++generation;
    update({ sync: "saving", error: null });
    try {
      const result = await responseData(await transport(path, {
        method, credentials: "same-origin", cache: "no-store", signal: AbortSignal.timeout(15000),
        headers: { "Content-Type": "application/json", "X-Waymark-Account": userId }, body: JSON.stringify(payload),
      }));
      if (token !== generation) return false;
      if (result.user?.id !== userId) throw new Error("Your account changed. Reload before saving.");
      update({ ...result, ready: true, mode: "account", sync: "idle", error: null, targetChosen: result.hasSavedTarget,
        checkpoints: result.checkpoints ?? snapshot.checkpoints });
      return true;
    } catch (error) {
      if (token !== generation) return false;
      const denied = error instanceof WorkspaceResponseError && ([401, 403].includes(error.status) || error.code === "account_changed");
      update({ ...(denied ? { ...initialSnapshot(), ready: true, mode: "error" as const } : {}), sync: "error",
        error: error instanceof Error ? error.message : "Your change was not confirmed. Please try again." });
      return false;
    }
  }

  function canEdit() { return snapshot.ready && snapshot.mode !== "error" && snapshot.sync !== "saving"; }

  function checkpointProgress(id: string): CheckpointProgress {
    return snapshot.checkpoints?.[id] ?? { status: "not_started", evidence: [], history: [] };
  }

  function checkpointFor(id: string): CheckpointProgress {
    return checkpointProgress(id);
  }

  function milestone(id: string) {
    return COUNTRY_CYCLES.find((country) => country.code === snapshot.profile.countryCode)?.milestones.find((step) => step.id === id);
  }

  function blockersFor(id: string): string[] {
    const step = milestone(id);
    if (!step) return [];
    return step.dependsOn.filter((dependency) => !snapshot.done[dependency]);
  }

  function canCompleteCheckpoint(id: string): boolean {
    return Boolean(milestone(id)) && blockersFor(id).length === 0;
  }

  async function saveCheckpoint(id: string, action: "start" | "evidence" | "complete" | "skip", extra: Record<string, unknown> = {}) {
    if (!snapshot.planId) {
      update({ sync: "error", error: "Choose and save your target on Your Path before changing checkpoints." });
      return false;
    }
    const request = checkpointActionSchema.safeParse({ planId: snapshot.planId, milestoneId: id,
      expectedVersion: snapshot.planVersion, action, ...extra });
    if (!request.success) return false;
    if (!await mutate("/api/workspace/checkpoint", "PUT", request.data)) return false;
    const current = snapshot.checkpoints[id];
    const expectedStatus = action === "start" ? "in_progress" : action === "skip" ? "skipped_with_reason"
      : action === "complete" || snapshot.done[id] ? "complete" : "evidence_submitted";
    const eventStatus = action === "evidence" ? "evidence_submitted" : expectedStatus;
    const suppliedEvidence = "evidence" in request.data ? request.data.evidence : undefined;
    const confirmedEvidence = current?.evidence.at(-1);
    if (snapshot.planId !== request.data.planId || snapshot.planVersion <= request.data.expectedVersion ||
        current?.status !== expectedStatus || current.history.at(-1)?.status !== eventStatus ||
        (suppliedEvidence && (confirmedEvidence?.title !== suppliedEvidence.title ||
          confirmedEvidence.url !== suppliedEvidence.url || confirmedEvidence.note !== suppliedEvidence.note ||
          confirmedEvidence.verifiedOn !== suppliedEvidence.verifiedOn)) ||
        (action === "complete" && !snapshot.done[id]) ||
        (request.data.action === "skip" && (snapshot.done[id] || current.skippedReason !== request.data.reason))) {
      update({ sync: "error", error: "The checkpoint change could not be confirmed. Reload your plan before retrying." });
      return false;
    }
    return true;
  }

  async function startCheckpoint(id: string): Promise<boolean> {
    if (!canEdit()) return false;
    const step = milestone(id);
    if (!step || snapshot.done[id]) return false;
    if (snapshot.user) return saveCheckpoint(id, "start");
    const now = new Date().toISOString();
    const current = checkpointProgress(id);
    update({
      checkpoints: { ...snapshot.checkpoints, [id]: {
        ...current, status: "in_progress", skippedReason: undefined, startedAt: current.startedAt ?? now, updatedAt: now,
        history: [...current.history.slice(-99), { at: now, status: "in_progress" }],
      } },
      sync: "idle", error: null,
    });
    persistGuestProgress();
    return true;
  }

  async function addCheckpointEvidence(id: string, evidence: { title: string; url?: string; note?: string; verifiedOn?: string }): Promise<boolean> {
    if (!canEdit()) return false;
    const step = milestone(id);
    const parsed = checkpointEvidenceSchema.safeParse(evidence);
    if (!step || !parsed.success || checkpointProgress(id).evidence.length >= 50) return false;
    if (snapshot.user) return saveCheckpoint(id, "evidence", { evidence: parsed.data });
    const now = new Date().toISOString();
    const current = checkpointProgress(id);
    update({
      checkpoints: { ...snapshot.checkpoints, [id]: {
        ...current, status: current.status === "complete" ? "complete" : "evidence_submitted", skippedReason: undefined,
        evidence: [...current.evidence, parsed.data], updatedAt: now,
        history: [...current.history.slice(-99), { at: now, status: "evidence_submitted", note: parsed.data.title }],
      } },
      sync: "idle", error: null,
    });
    persistGuestProgress();
    return true;
  }

  async function completeCheckpoint(id: string, evidence?: { title: string; url?: string; note?: string; verifiedOn?: string }): Promise<boolean> {
    if (!canEdit()) return false;
    const step = milestone(id);
    const parsed = evidence === undefined ? null : checkpointEvidenceSchema.safeParse(evidence);
    if (!step || !canCompleteCheckpoint(id) || (parsed && !parsed.success) ||
        (evidence && checkpointProgress(id).evidence.length >= 50)) return false;
    if (snapshot.user) return saveCheckpoint(id, "complete", parsed?.success ? { evidence: parsed.data } : {});
    const now = new Date().toISOString();
    const current = checkpointProgress(id);
    const nextEvidence = parsed?.success ? [...current.evidence, parsed.data] : current.evidence;
    update({
      done: { ...snapshot.done, [id]: true },
      checkpoints: { ...snapshot.checkpoints, [id]: {
        ...current, status: "complete", skippedReason: undefined, completedAt: now, updatedAt: now, evidence: nextEvidence,
        history: [...current.history.slice(-99), { at: now, status: "complete", note: parsed?.success ? parsed.data.title : undefined }],
      } },
      sync: "idle", error: null,
    });
    persistGuestProgress();
    return true;
  }

  async function skipCheckpoint(id: string, reason: string): Promise<boolean> {
    if (!canEdit()) return false;
    const step = milestone(id);
    const trimmed = reason.trim();
    if (!step || !trimmed || trimmed.length > 2000) return false;
    if (snapshot.done[id] && COUNTRY_CYCLES.find((country) => country.code === snapshot.profile.countryCode)
      ?.milestones.some((candidate) => candidate.dependsOn.includes(id) && snapshot.done[candidate.id])) return false;
    if (snapshot.user) return saveCheckpoint(id, "skip", { reason: trimmed });
    const now = new Date().toISOString();
    const current = checkpointProgress(id);
    const nextDone = { ...snapshot.done };
    delete nextDone[id];
    update({
      done: nextDone,
      checkpoints: { ...snapshot.checkpoints, [id]: {
        ...current, status: "skipped_with_reason", completedAt: undefined, skippedReason: trimmed, updatedAt: now,
        history: [...current.history.slice(-99), { at: now, status: "skipped_with_reason", note: trimmed }],
      } },
      sync: "idle", error: null,
    });
    persistGuestProgress();
    return true;
  }

  async function setTarget(countryCode: string, intakeId: string, stage = snapshot.profile.stage) {
    if (!canEdit()) return false;
    const target = targetSchema.safeParse({ countryCode, intakeId, stage });
    if (!target.success) { update({ sync: "error", error: "Choose a supported country and one of its intakes." }); return false; }
    if (snapshot.user) return mutate("/api/workspace/target", "POST", target.data);
    guestProgress.set(targetKey(snapshot.profile), { done: { ...snapshot.done }, checkpoints: { ...snapshot.checkpoints } });
    const key = targetKey(target.data);
    const saved = guestProgress.get(key) ?? { done: {}, checkpoints: {} };
    update({ profile: target.data, done: { ...saved.done }, checkpoints: { ...saved.checkpoints }, targetChosen: true, sync: "idle", error: null });
    return true;
  }

  async function toggleStep(id: string) {
    if (!canEdit()) return false;
    const country = COUNTRY_CYCLES.find((candidate) => candidate.code === snapshot.profile.countryCode);
    if (!country?.milestones.some((step) => step.id === id)) return false;
    const milestoneStep = country.milestones.find((step) => step.id === id);
    if (!snapshot.done[id] && milestoneStep?.dependsOn.some((dependency) => !snapshot.done[dependency])) return false;
    if (snapshot.done[id] && country.milestones.some((step) => step.dependsOn.includes(id) && snapshot.done[step.id])) return false;
    if (snapshot.user) {
      if (!snapshot.planId) { update({ sync: "error", error: "Choose and save your target on Your Path before ticking steps." }); return false; }
      return mutate("/api/workspace/progress", "PUT", { planId: snapshot.planId, milestoneId: id,
        done: !snapshot.done[id], expectedVersion: snapshot.planVersion });
    }
    const next = { ...snapshot.done };
    if (next[id]) delete next[id]; else next[id] = true;
    const checkpoints = { ...snapshot.checkpoints };
    if (next[id]) {
      const now = new Date().toISOString();
      const current = checkpoints[id] ?? { status: "not_started", evidence: [], history: [] };
      checkpoints[id] = { ...current, status: "complete", skippedReason: undefined, completedAt: now, updatedAt: now, history: [...current.history.slice(-99), { at: now, status: "complete" }] };
    } else {
      const current = checkpoints[id];
      if (current) { const now = new Date().toISOString(); checkpoints[id] = { ...current, status: "not_started", completedAt: undefined, updatedAt: now, history: [...current.history.slice(-99), { at: now, status: "not_started" }] }; }
    }
    guestProgress.set(targetKey(snapshot.profile), { done: next, checkpoints });
    update({ done: next, checkpoints, sync: "idle", error: null });
    return true;
  }

  async function resetProgress() {
    if (!canEdit()) return false;
    if (snapshot.user) {
      if (!snapshot.planId) return false;
      return mutate("/api/workspace/reset", "POST", { planId: snapshot.planId, expectedVersion: snapshot.planVersion });
    }
    guestProgress.set(targetKey(snapshot.profile), { done: {}, checkpoints: {} });
    update({ done: {}, checkpoints: {}, sync: "idle", error: null });
    return true;
  }

  return {
    subscribe(listener: () => void) { listeners.add(listener); return () => { listeners.delete(listener); }; },
    getSnapshot: () => snapshot,
    getServerSnapshot: () => serverSnapshot,
    refresh, setTarget, toggleStep, resetProgress,
    startCheckpoint, completeCheckpoint, skipCheckpoint, addCheckpointEvidence,
    checkpointFor, canCompleteCheckpoint,
    importLegacy: (input: unknown) => mutate("/api/workspace/import", "POST", input),
    clear() { ++generation; loading = null; guestProgress.clear(); update(initialSnapshot()); },
  };
}

export type WorkspaceStore = ReturnType<typeof createWorkspaceStore>;
