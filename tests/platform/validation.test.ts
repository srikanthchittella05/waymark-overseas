import { test } from "node:test";
import assert from "node:assert/strict";
import { buildCatalog } from "../../scripts/export-catalog";
import { announcementInputSchema, deadlineValueSchema, isCalendarDate, legacyImportSchema, parseGuideContent,
  stepWriteSchema, targetSchema, validateRevision } from "../../src/lib/platform/validation";
import { assertSameOrigin, readJsonBody } from "../../src/lib/platform/http";
import { databaseError, RequestError } from "../../src/lib/platform/errors";

test("all 104 existing guides satisfy strict publication validation", async () => {
  const catalog = await buildCatalog();
  assert.equal(catalog.guides.length, 104);
  assert.equal(catalog.milestones.length, 104);
  assert.equal(catalog.countries.length, 7);
  assert.equal(catalog.intakes.length, 28);
});

test("date validation rejects normalized impossible dates", () => {
  assert.equal(isCalendarDate("2028-02-29"), true);
  for (const date of ["2027-02-29", "2026-04-31", "2026-13-01", "2026-1-01", "garbage"]) assert.equal(isCalendarDate(date), false);
});

test("target input rejects mismatched countries, unknown stages and owner spoofing", () => {
  const valid = { countryCode: "US", intakeId: "us-fall-2027", stage: "exploring" };
  assert.equal(targetSchema.safeParse(valid).success, true);
  assert.equal(targetSchema.safeParse({ ...valid, countryCode: "GB" }).success, false);
  assert.equal(targetSchema.safeParse({ ...valid, stage: "admin" }).success, false);
  assert.equal(targetSchema.safeParse({ ...valid, userId: "attacker" }).success, false);
});

test("step updates require booleans, valid steps and an optimistic version", () => {
  const valid = { planId: "11111111-1111-4111-8111-111111111111", milestoneId: "us-profile-cv", done: true, expectedVersion: 0 };
  assert.equal(stepWriteSchema.safeParse(valid).success, true);
  assert.equal(stepWriteSchema.safeParse({ ...valid, done: "true" }).success, false);
  assert.equal(stepWriteSchema.safeParse({ ...valid, expectedVersion: -1 }).success, false);
  assert.equal(stepWriteSchema.safeParse({ ...valid, milestoneId: "not-a-milestone" }).success, false);
});

test("legacy import requires explicit review and unique country-specific steps", () => {
  const valid = { target: { countryCode: "US", intakeId: "us-fall-2027", stage: "exploring" }, completedIds: ["us-profile-cv"], confirmed: true };
  assert.equal(legacyImportSchema.safeParse(valid).success, true);
  assert.equal(legacyImportSchema.safeParse({ ...valid, confirmed: false }).success, false);
  assert.equal(legacyImportSchema.safeParse({ ...valid, completedIds: ["gb-profile-cv"] }).success, false);
  assert.equal(legacyImportSchema.safeParse({ ...valid, completedIds: ["us-profile-cv", "us-profile-cv"] }).success, false);
});

test("guide publication rejects extra/missing sections and dangerous resource URLs", async () => {
  const baseline = (await buildCatalog()).guides[0];
  const missing = structuredClone(baseline.payload);
  delete missing.sections[Object.keys(missing.sections)[0]];
  assert.throws(() => parseGuideContent(baseline.milestone_id, missing));
  const extra = structuredClone(baseline.payload);
  extra.sections.injected = { body: "Unrecognized content" };
  assert.throws(() => parseGuideContent(baseline.milestone_id, extra));
  const badUrl = structuredClone(baseline.payload);
  badUrl.sections[Object.keys(badUrl.sections)[0]].resources = [{ title: "Bad link", kind: "official", why: "Testing", url: "javascript:alert(1)", verifiedOn: "2026-10-20" }];
  assert.throws(() => parseGuideContent(baseline.milestone_id, badUrl));
});

test("deadline publishing rejects invalid dates, insecure sources and scope mismatches", () => {
  const payload = { offsetDays: 100, hardDeadline: true, source: "https://www.gov.uk/student-visa", confidence: "verified", verifiedOn: "2026-10-20" };
  assert.equal(deadlineValueSchema.safeParse(payload).success, true);
  assert.equal(deadlineValueSchema.safeParse({ ...payload, offsetDays: NaN }).success, false);
  assert.equal(deadlineValueSchema.safeParse({ ...payload, source: "https://user:password@example.com" }).success, false);
  assert.equal(deadlineValueSchema.safeParse({ ...payload, source: "http://example.com" }).success, false);
  const revision = { kind: "deadline", milestoneId: "gb-visa-apply", intakeId: null, payload, reason: "Checked official guidance.", expectedLatestId: null };
  assert.doesNotThrow(() => validateRevision(revision));
  assert.throws(() => validateRevision({ ...revision, payload: { ...payload, dueDate: "2027-06-01" } }));
  assert.throws(() => validateRevision({ ...revision, intakeId: "us-fall-2027" }));
});

test("announcements reject unsupported audiences and unexpected privileged fields", () => {
  const valid = { title: "Update", body: "A useful update.", countryCode: null, targetUserId: null };
  assert.equal(announcementInputSchema.safeParse(valid).success, true);
  assert.equal(announcementInputSchema.safeParse({ ...valid, countryCode: "XX" }).success, false);
  assert.equal(announcementInputSchema.safeParse({ ...valid, createdBy: "attacker" }).success, false);
});

test("JSON mutation endpoints reject cross-origin, absent-origin and cross-site requests", () => {
  assert.doesNotThrow(() => assertSameOrigin(new Request("https://waymark.example/api/workspace", { headers: { origin: "https://waymark.example" } }), "https://waymark.example"));
  const crossOrigins = [
    new Headers({}), new Headers({ origin: "https://attacker.example" }),
    new Headers({ origin: "https://waymark.example", "sec-fetch-site": "cross-site" }),
  ];
  for (const headers of crossOrigins) {
    assert.throws(() => assertSameOrigin(new Request("https://waymark.example/api/workspace", { headers }), "https://waymark.example"), RequestError);
  }
});

test("JSON reader enforces actual byte limits, type and encoding", async () => {
  const request = (body: string, type = "application/json") => new Request("https://waymark.example/api/test", { method: "POST", body, headers: new Headers({ "content-type": type }) });
  assert.deepEqual(await readJsonBody(request('{"ok":true}')), { ok: true });
  await assert.rejects(readJsonBody(request("not json")), { status: 400 });
  await assert.rejects(readJsonBody(request("{}", "text/plain")), { status: 415 });
  await assert.rejects(readJsonBody(request('{"large":"123456789"}'), 8), { status: 413 });
});

test("database errors never expose raw SQL and conflict is distinct from outage", () => {
  assert.throws(() => databaseError({ code: "40001" }), { status: 409, code: "conflict" });
  assert.throws(() => databaseError({ code: "42501" }), { status: 403, code: "forbidden" });
  assert.throws(() => databaseError({ code: "23514" }), { status: 422, code: "invalid_input" });
  assert.throws(() => databaseError({ code: "XX000" }), { status: 503, code: "unavailable" });
});
