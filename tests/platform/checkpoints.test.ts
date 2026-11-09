import { test } from "node:test";
import assert from "node:assert/strict";
import { buildPlan, checkpointSchedule, daysBetween } from "../../src/lib/engine/plan";
import { DEFAULT_PROFILE } from "../../src/lib/engine/defaults";
import { createWorkspaceStore } from "../../src/lib/workspace/store";
import { checkpointActionSchema, workspaceDataSchema, type WorkspaceData } from "../../src/lib/workspace/types";

const now = new Date("2026-06-01T12:00:00Z");
const accountId = "11111111-1111-4111-8111-111111111111";
const planId = "22222222-2222-4222-8222-222222222222";

function guest(): WorkspaceData {
  return { configured: false, user: null, profile: { ...DEFAULT_PROFILE }, done: {},
    checkpoints: {}, planId: null, planVersion: 0, hasSavedTarget: false, deadlineRevisions: [] };
}

function account(): WorkspaceData {
  return { ...guest(), configured: true,
    user: { id: accountId, email: "student@example.test", displayName: "Student", isAdmin: false, aal: "aal1" },
    planId, hasSavedTarget: true };
}

test("schedule adapts to the supplied date and assigns each task exactly once", () => {
  const step = buildPlan(DEFAULT_PROFILE, {}, now).steps.find((item) => item.id === "us-profile-cv");
  assert.ok(step);
  const early = checkpointSchedule(step, new Date("2026-04-01T12:00:00Z"));
  const late = checkpointSchedule(step, new Date("2026-09-20T12:00:00Z"));
  assert.equal(early.daysRemaining, daysBetween("2026-04-01", step.dueDate));
  assert.equal(late.daysRemaining, daysBetween("2026-09-20", step.dueDate));
  assert.ok(early.weeksRemaining > late.weeksRemaining);
  assert.ok(early.stages.length <= step.tasks.length, "do not generate empty weekly tasks");
  assert.deepEqual(early.stages.flatMap((stage) => stage.focus), step.tasks);
  assert.deepEqual(late.stages.flatMap((stage) => stage.focus), step.tasks);
  assert.ok(early.stages.every((stage) => stage.focus.length > 0));
  assert.ok(late.stages.every((stage) => stage.focus.length > 0));
  assert.equal(late.stages.at(-1)?.week, late.weeksRemaining);
});

test("overdue checkpoint offers a one-week catch-up rather than an empty schedule", () => {
  const step = buildPlan(DEFAULT_PROFILE, {}, now).steps.find((item) => item.id === "us-profile-cv");
  assert.ok(step);
  const overdue = checkpointSchedule(step, new Date("2026-10-20T12:00:00Z"));
  assert.ok(overdue.daysRemaining < 0);
  assert.equal(overdue.weeksRemaining, 1);
  assert.deepEqual(overdue.stages, [{ week: 1, focus: step.tasks }]);
});

test("unknown milestones and unmet dependencies cannot be completed", async () => {
  const store = createWorkspaceStore(async () => Response.json(guest()));
  await store.refresh();
  assert.equal(store.canCompleteCheckpoint("unknown-step"), false);
  assert.equal(store.canCompleteCheckpoint("us-shortlist"), false);
  assert.equal(await store.completeCheckpoint("us-shortlist"), false);
  assert.equal(await store.toggleStep("us-shortlist"), false);
  assert.deepEqual(store.getSnapshot().done, {});
  assert.equal(await store.completeCheckpoint("us-profile-cv"), true);
  assert.equal(store.canCompleteCheckpoint("us-shortlist"), true);
  assert.equal(await store.completeCheckpoint("us-shortlist"), true);
  assert.equal(store.checkpointFor("us-shortlist").status, "complete");
  assert.equal(store.checkpointFor("us-shortlist").history.at(-1)?.status, "complete");
});

test("skip requires a reason, leaves dependent work blocked, and records history", async () => {
  const store = createWorkspaceStore(async () => Response.json(guest()));
  await store.refresh();
  assert.equal(await store.skipCheckpoint("us-profile-cv", "  "), false);
  assert.equal(await store.skipCheckpoint("us-profile-cv", "Not relevant to my programme"), true);
  assert.equal(store.checkpointFor("us-profile-cv").status, "skipped_with_reason");
  assert.equal(store.checkpointFor("us-profile-cv").skippedReason, "Not relevant to my programme");
  assert.equal(store.checkpointFor("us-profile-cv").history.at(-1)?.status, "skipped_with_reason");
  assert.equal(store.canCompleteCheckpoint("us-shortlist"), false);
});

test("completed dependent work cannot be orphaned by reopening or skipping its prerequisite", async () => {
  const store = createWorkspaceStore(async () => Response.json(guest()));
  await store.refresh();
  assert.equal(await store.toggleStep("us-profile-cv"), true);
  assert.equal(await store.toggleStep("us-shortlist"), true);
  assert.equal(await store.toggleStep("us-profile-cv"), false);
  assert.equal(await store.skipCheckpoint("us-profile-cv", "No longer needed"), false);
  assert.deepEqual(store.getSnapshot().done, { "us-profile-cv": true, "us-shortlist": true });
});

test("checkpoint input rejects unsafe evidence links, bad dates, empty titles, and oversized reasons", async () => {
  const store = createWorkspaceStore(async () => Response.json(guest()));
  await store.refresh();
  assert.equal(await store.addCheckpointEvidence("us-profile-cv", { title: "Injected", url: "javascript:alert(1)" }), false);
  assert.equal(await store.addCheckpointEvidence("us-profile-cv", { title: "   " }), false);
  assert.equal(await store.addCheckpointEvidence("us-profile-cv", { title: "Result", verifiedOn: "2026-02-30" }), false);
  assert.equal(await store.skipCheckpoint("us-profile-cv", "x".repeat(2001)), false);
  assert.equal(store.checkpointFor("us-profile-cv").status, "not_started");
  assert.equal(checkpointActionSchema.safeParse({ action: "complete", milestoneId: "us-profile-cv",
    planId, expectedVersion: 0, done: true }).success, false);
  assert.equal(checkpointActionSchema.safeParse({ action: "skip", milestoneId: "us-profile-cv",
    planId, expectedVersion: 0, reason: " " }).success, false);
});

test("workspace response rejects checkpoints belonging to another country or contradicting done", () => {
  const complete = { status: "complete", evidence: [], history: [] };
  assert.equal(workspaceDataSchema.safeParse({ ...account(), checkpoints: { "gb-profile-cv": complete } }).success, false);
  assert.equal(workspaceDataSchema.safeParse({ ...account(), checkpoints: { "us-profile-cv": complete } }).success, false);
  assert.equal(workspaceDataSchema.safeParse({ ...account(), checkpoints: {
    "us-profile-cv": { status: "blocked", evidence: [], history: [] },
  } }).success, false);
  assert.equal(workspaceDataSchema.safeParse({ ...account(), done: { "us-profile-cv": true }, checkpoints: {
    "us-profile-cv": { status: "skipped_with_reason", skippedReason: "Not relevant", evidence: [], history: [] },
  } }).success, false);
  assert.equal(workspaceDataSchema.safeParse({ ...account(), done: { "us-profile-cv": true },
    checkpoints: { "us-profile-cv": complete } }).success, true);
});

test("guest checkpoint history survives an account-status refresh without becoming cloud progress", async () => {
  const store = createWorkspaceStore(async () => Response.json(guest()));
  await store.refresh();
  await store.startCheckpoint("us-profile-cv");
  await store.addCheckpointEvidence("us-profile-cv", { title: "Transcript requested" });
  await store.refresh();
  assert.equal(store.checkpointFor("us-profile-cv").status, "evidence_submitted");
  assert.equal(store.checkpointFor("us-profile-cv").history.length, 2);
  assert.equal(store.getSnapshot().user, null);
});

test("account progress never leaks into a guest preview after sign-out", async () => {
  let signedIn = true;
  const store = createWorkspaceStore(async () => Response.json(signedIn ? {
    ...account(), done: { "us-profile-cv": true },
    checkpoints: { "us-profile-cv": { status: "complete", evidence: [], history: [] } },
  } : guest()));
  await store.refresh();
  signedIn = false;
  await store.refresh();
  await store.setTarget("US", "us-spring-2027");
  await store.setTarget("US", "us-fall-2027");
  assert.deepEqual(store.getSnapshot().done, {});
  assert.deepEqual(store.getSnapshot().checkpoints, {});
});

test("account checkpoint changes are not advertised as saved after a failed write", async () => {
  const store = createWorkspaceStore(async (_path, init) => init?.method
    ? Response.json({ error: { message: "Save failed" } }, { status: 409 }) : Response.json(account()));
  await store.refresh();
  assert.equal(await store.completeCheckpoint("us-profile-cv"), false);
  assert.equal(store.getSnapshot().done["us-profile-cv"], undefined);
  assert.equal(store.checkpointFor("us-profile-cv").status, "not_started");
});

test("account response without a matching checkpoint event is not accepted as a checkpoint save", async () => {
  const store = createWorkspaceStore(async (_path, init) => init?.method ? Response.json({
    ...account(), planVersion: 1,
  }) : Response.json(account()));
  await store.refresh();
  assert.equal(await store.startCheckpoint("us-profile-cv"), false);
  assert.equal(store.getSnapshot().sync, "error");
  assert.match(store.getSnapshot().error ?? "", /could not be confirmed/);
});

test("account checkpoint actions carry plan identity and version and use server-confirmed state", async () => {
  let data = account();
  const calls: Array<{ path: string; body: Record<string, unknown> }> = [];
  const store = createWorkspaceStore(async (path, init) => {
    if (!init?.method) return Response.json(data);
    const body = JSON.parse(String(init.body)) as Record<string, unknown>;
    calls.push({ path, body });
    const action = body.action;
    const prior = data.checkpoints?.["us-profile-cv"];
    const status = action === "start" ? "in_progress" : action === "evidence" ? "evidence_submitted"
      : action === "complete" ? "complete" : "skipped_with_reason";
    data = { ...data, planVersion: data.planVersion + 1,
      done: action === "complete" ? { "us-profile-cv": true } : {},
      checkpoints: { "us-profile-cv": { status, evidence: action === "evidence"
        ? [{ title: "Transcript requested" }] : (prior?.evidence ?? []),
      skippedReason: action === "skip" ? "Programme exempt" : undefined,
      history: [...(prior?.history ?? []), { at: "2026-10-28T00:00:00.000Z", status: action === "evidence" ? "evidence_submitted" : status }] } } } as WorkspaceData;
    return Response.json(data);
  });
  await store.refresh();
  assert.equal(await store.startCheckpoint("us-profile-cv"), true);
  assert.equal(await store.addCheckpointEvidence("us-profile-cv", { title: "Transcript requested" }), true);
  assert.equal(await store.completeCheckpoint("us-profile-cv"), true);
  assert.equal(store.getSnapshot().done["us-profile-cv"], true);
  assert.equal(await store.skipCheckpoint("us-profile-cv", "Programme exempt"), true);
  assert.equal(store.getSnapshot().done["us-profile-cv"], undefined);
  assert.equal(store.checkpointFor("us-profile-cv").status, "skipped_with_reason");
  assert.deepEqual(calls.map(({ path, body }) => [path, body.action, body.expectedVersion]), [
    ["/api/workspace/checkpoint", "start", 0],
    ["/api/workspace/checkpoint", "evidence", 1],
    ["/api/workspace/checkpoint", "complete", 2],
    ["/api/workspace/checkpoint", "skip", 3],
  ]);
  assert.ok(calls.every(({ body }) => body.planId === planId && body.milestoneId === "us-profile-cv"));
});
