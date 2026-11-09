import { test } from "node:test";
import assert from "node:assert/strict";
import { createWorkspaceStore } from "../../src/lib/workspace/store";
import { readLegacyCandidate } from "../../src/lib/workspace/legacy";
import { workspaceDataSchema, resolveDeadlineOverrides, type WorkspaceData } from "../../src/lib/workspace/types";
import { DEFAULT_PROFILE } from "../../src/lib/engine/defaults";
import { buildPlan } from "../../src/lib/engine/plan";

const id = "11111111-1111-4111-8111-111111111111";
const planId = "22222222-2222-4222-8222-222222222222";
function fixture(account = false): WorkspaceData {
  return { configured: account, user: account ? { id, email: "student@example.test", displayName: "Student", isAdmin: false, aal: "aal1" } : null,
    profile: { ...DEFAULT_PROFILE }, done: {}, planId: account ? planId : null, planVersion: 0,
    hasSavedTarget: account, deadlineRevisions: [] };
}

test("guests can preview without writing storage or making cloud mutations", async () => {
  const requests: string[] = [];
  const store = createWorkspaceStore(async (path) => { requests.push(path); return Response.json(fixture()); });
  await store.refresh();
  assert.equal(await store.toggleStep("us-profile-cv"), true);
  assert.equal(store.getSnapshot().done["us-profile-cv"], true);
  assert.equal(await store.setTarget("US", "us-spring-2027"), true);
  assert.deepEqual(store.getSnapshot().done, {});
  await store.toggleStep("us-shortlist");
  await store.setTarget("US", "us-fall-2027");
  assert.deepEqual(store.getSnapshot().done, { "us-profile-cv": true });
  assert.deepEqual(requests, ["/api/workspace"]);
  assert.equal(store.getSnapshot().hasSavedTarget, false);
});

test("a failed cloud save does not apply an optimistic tick or claim success", async () => {
  const store = createWorkspaceStore(async (_path, init) => init?.method
    ? Response.json({ error: { message: "This plan changed elsewhere." } }, { status: 409 }) : Response.json(fixture(true)));
  await store.refresh();
  assert.equal(await store.toggleStep("us-profile-cv"), false);
  assert.deepEqual(store.getSnapshot().done, {});
  assert.equal(store.getSnapshot().sync, "error");
  assert.match(store.getSnapshot().error ?? "", /changed elsewhere/);
});

test("cloud writes specify desired state, plan version and expected account", async () => {
  const calls: RequestInit[] = [];
  const store = createWorkspaceStore(async (_path, init) => {
    if (!init?.method) return Response.json(fixture(true));
    calls.push(init);
    return Response.json({ ...fixture(true), done: { "us-profile-cv": true }, planVersion: 1 });
  });
  await store.refresh();
  assert.equal(await store.toggleStep("us-profile-cv"), true);
  assert.deepEqual(JSON.parse(String(calls[0].body)), { planId, milestoneId: "us-profile-cv", done: true, expectedVersion: 0 });
  assert.equal(new Headers(calls[0].headers).get("x-waymark-account"), id);
  assert.equal(store.getSnapshot().planVersion, 1);
});

test("duplicate in-flight mutations are rejected rather than racing", async () => {
  let resolve!: (response: Response) => void;
  const pending = new Promise<Response>((done) => { resolve = done; });
  const store = createWorkspaceStore(async (_path, init) => init?.method ? pending : Response.json(fixture(true)));
  await store.refresh();
  const first = store.toggleStep("us-profile-cv");
  assert.equal(await store.toggleStep("us-profile-cv"), false);
  resolve(Response.json({ ...fixture(true), done: { "us-profile-cv": true }, planVersion: 1 }));
  assert.equal(await first, true);
});

test("unverified account refresh clears private state and disables changes", async () => {
  let allowed = true;
  const store = createWorkspaceStore(async () => allowed ? Response.json({ ...fixture(true), done: { "us-profile-cv": true } }) : Response.json({}, { status: 403 }));
  await store.refresh(); allowed = false; await store.refresh();
  assert.equal(store.getSnapshot().mode, "error");
  assert.equal(store.getSnapshot().user, null);
  assert.deepEqual(store.getSnapshot().done, {});
  assert.equal(await store.toggleStep("us-profile-cv"), false);
});

test("denied cloud writes clear the old private account snapshot", async () => {
  const store = createWorkspaceStore(async (_path, init) => init?.method
    ? Response.json({ error: { code: "account_changed", message: "Your account changed." } }, { status: 409 })
    : Response.json({ ...fixture(true), done: { "us-profile-cv": true } }));
  await store.refresh();
  assert.equal(await store.toggleStep("us-shortlist"), false);
  assert.equal(store.getSnapshot().user, null);
  assert.deepEqual(store.getSnapshot().done, {});
  assert.equal(store.getSnapshot().mode, "error");
});

test("late responses after a session reset cannot restore an old account", async () => {
  let finish!: (response: Response) => void;
  let count = 0;
  const store = createWorkspaceStore(async () => ++count === 1 ? new Promise<Response>((resolve) => { finish = resolve; }) : Response.json(fixture()));
  const old = store.refresh(); store.clear(); await store.refresh();
  finish(Response.json(fixture(true))); await old;
  assert.equal(store.getSnapshot().mode, "guest");
  assert.equal(store.getSnapshot().user, null);
});

test("one mounted store cannot read another store's account state", async () => {
  const first = createWorkspaceStore(async () => Response.json(fixture(true)));
  const second = createWorkspaceStore(async () => Response.json(fixture()));
  await Promise.all([first.refresh(), second.refresh()]);
  assert.equal(first.getSnapshot().user?.id, id);
  assert.equal(second.getSnapshot().user, null);
  assert.equal(second.getServerSnapshot().user, null);
});

test("saved target object identity survives a progress refresh so unsaved drafts are not dropped", async () => {
  const store = createWorkspaceStore(async () => Response.json(fixture(true)));
  await store.refresh(); const original = store.getSnapshot().profile; await store.refresh();
  assert.equal(store.getSnapshot().profile, original);
});

test("invalid/cross-country workspace responses are rejected", () => {
  assert.equal(workspaceDataSchema.safeParse({ ...fixture(true), done: { "gb-profile-cv": true } }).success, false);
  assert.equal(workspaceDataSchema.safeParse({ ...fixture(), planId }).success, false);
});

test("legacy storage parser rejects null, malformed and unavailable storage without writes", () => {
  assert.equal(readLegacyCandidate({ getItem: () => null }).kind, "none");
  assert.equal(readLegacyCandidate({ getItem: () => "null" }).kind, "invalid");
  assert.equal(readLegacyCandidate({ getItem: () => "{" }).kind, "invalid");
  assert.equal(readLegacyCandidate({ getItem: () => { throw new Error("Denied"); } }).kind, "invalid");
  const result = readLegacyCandidate({ getItem: (key) => JSON.stringify(key.includes("profile") ? DEFAULT_PROFILE : { "us-profile-cv": true, "gb-profile-cv": true, malicious: "true" }) });
  assert.equal(result.kind, "present");
  if (result.kind === "present") { assert.deepEqual(result.value.completedIds, ["us-profile-cv"]); assert.equal(result.value.excludedEntries, 2); }
});

test("intake-specific published deadlines override defaults without mutating the bundled catalog", () => {
  const base = { offsetDays: 100, hardDeadline: true, source: "https://www.gov.uk/student-visa", confidence: "verified" as const, verifiedOn: "2026-10-20" };
  const resolved = resolveDeadlineOverrides([
    { id, milestone_id: "us-profile-cv", intake_id: "us-fall-2027", payload: { ...base, dueDate: "2027-02-01" } },
    { id: planId, milestone_id: "us-profile-cv", intake_id: null, payload: base },
  ], "us-fall-2027");
  const changed = buildPlan(DEFAULT_PROFILE, {}, new Date("2026-10-20T12:00:00Z"), resolved);
  assert.equal(changed.steps[0].dueDate, "2027-02-01");
  assert.equal(buildPlan(DEFAULT_PROFILE, {}, new Date("2026-10-20T12:00:00Z")).steps[0].offsetDays, 330);
});
