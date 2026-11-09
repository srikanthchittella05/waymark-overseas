import assert from "node:assert/strict";
import test from "node:test";
import { ARCHETYPE_SECTIONS } from "../../src/lib/engine/guides/archetypes";
import type { GuideContent } from "../../src/lib/engine/guides/types";
import type { DeadlineValue } from "../../src/lib/platform/validation";
import { adminErrorMessage, auditDetails, deadlineDate, deadlineImpact, editGuideProse, guideProse, previewGuide } from "../../src/lib/admin/presentation";

const resource = { title: "Authority", kind: "official" as const, url: "https://example.org/authority", why: "Primary source for the rule.", verifiedOn: "2026-10-20", free: true };
const guide: GuideContent = {
  archetype: "language-test", intro: "The whole existing guide.",
  sections: Object.fromEntries(ARCHETYPE_SECTIONS["language-test"].map(({ id }) => [id, {
    body: "Existing body", points: ["A useful point"], resources: [resource],
    exams: [{ name: "Language test", accepted: true, requiredScore: "Check programme", note: "Nuance", validity: "Two years", howToBook: "Book directly", leadTime: "Allow time", cost: "Check provider", url: "https://example.org/exam", verifiedOn: "2026-10-20" }],
    subsections: [{ title: "Inside", what: "What it covers", format: "Format", score: "Score", topics: ["Topic"], tip: "A helpful tip", resources: [resource] }],
    roadmap: [{ label: "Week 1", title: "Begin", goal: "Prepare", hours: "Two hours", focus: ["Focus"], checkpoint: "Check readiness", resources: [resource] }],
    callout: { tone: "watch" as const, title: "Read carefully", body: "A meaningful warning." },
  }])),
};
const raw = JSON.stringify(guide);
const deadline: DeadlineValue = { offsetDays: 100, hardDeadline: true, confidence: "typical", source: "https://example.org/source", verifiedOn: "2026-10-20" };
const intakes = [{ id: "a", label: "Autumn", startDate: "2027-08-23" }, { id: "b", label: "Spring", startDate: "2028-01-17" }];

test("friendly guide edits preserve every nested content field", () => {
  const changed = editGuideProse(editGuideProse(raw, "us-english", null, "New introduction"), "us-english", "exams", "New section body");
  const parsed = previewGuide(changed, "us-english");
  const expected = structuredClone(guide);
  expected.intro = "New introduction";
  expected.sections.exams.body = "New section body";
  assert.deepEqual(parsed, expected);
});

test("empty prose is editable without destroying structured details", () => {
  const changed = editGuideProse(raw, "us-english", "exams", "");
  const parsed = previewGuide(changed, "us-english");
  assert.equal(parsed.sections.exams.body, undefined);
  assert.deepEqual(parsed.sections.exams.roadmap, guide.sections.exams.roadmap);
  const emptyIntro = editGuideProse(changed, "us-english", null, "");
  assert.equal(guideProse(emptyIntro, "us-english").intro, "");
  assert.throws(() => previewGuide(emptyIntro, "us-english"));
  assert.equal(previewGuide(editGuideProse(emptyIntro, "us-english", null, "Fixed intro"), "us-english").intro, "Fixed intro");
});

test("guide prose helpers reject malformed structures and unrecognized section IDs", () => {
  assert.throws(() => editGuideProse(raw, "us-english", "__proto__", "Bad write"));
  assert.throws(() => guideProse("null", "us-english"));
  assert.throws(() => guideProse(JSON.stringify({ ...guide, sections: [] }), "us-english"));
  assert.throws(() => guideProse(JSON.stringify({ ...guide, sections: { ...guide.sections, extras: {} } }), "us-english"));
  assert.throws(() => previewGuide(raw, "gb-cas"));
});

test("nested unsafe resource URLs and missing nested facts cannot pass preview validation", () => {
  const unsafe = structuredClone(guide);
  unsafe.sections.exams.roadmap![0].resources![0].url = "javascript:alert(1)";
  assert.throws(() => previewGuide(JSON.stringify(unsafe), "us-english"));
  const missingWhy = structuredClone(guide);
  missingWhy.sections.exams.subsections![0].resources![0].why = "";
  assert.throws(() => previewGuide(JSON.stringify(missingWhy), "us-english"));
});

test("deadline calculation is UTC, supports post-intake offsets and rejects invalid dates", () => {
  assert.equal(deadlineDate(intakes[0], deadline), "2027-05-15");
  assert.equal(deadlineDate(intakes[0], { offsetDays: -7 }), "2027-08-30");
  assert.equal(deadlineDate(intakes[0], { offsetDays: 7, dueDate: "2027-07-01" }), "2027-07-01");
  assert.throws(() => deadlineDate({ ...intakes[0], startDate: "2027-02-29" }, deadline));
  assert.throws(() => deadlineDate(intakes[0], { offsetDays: 1.5 }));
  assert.throws(() => deadlineDate(intakes[0], { offsetDays: 7, dueDate: "2027-02-30" }));
});

test("country default previews retain published intake overrides", () => {
  const specific = { ...deadline, dueDate: "2027-06-01" };
  const rows = deadlineImpact({ offsetDays: 100 }, intakes, { ...deadline, offsetDays: 120 }, null, [{ intakeId: "a", value: specific }]);
  assert.equal(rows.length, 2);
  assert.equal(rows[0].shadowed, true);
  assert.equal(rows[0].after, "2027-06-01");
  assert.equal(rows[0].differenceDays, 0);
  assert.equal(rows[1].differenceDays, -20);
});

test("specific intake previews touch only that scope and start from the published default", () => {
  const rows = deadlineImpact({ offsetDays: 1 }, intakes, { ...deadline, offsetDays: 50 }, "a", [{ intakeId: null, value: deadline }]);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].before, "2027-05-15");
  assert.equal(rows[0].differenceDays, 50);
});

test("audit rendering uses a narrow metadata allowlist and caps strings", () => {
  const details = auditDetails({ reason: "Reviewed access", status: "suspended", password: "never show", token: "never show", payload: { secret: "never show" }, unknown: "never show", revision_id: "r", country_code: null });
  assert.deepEqual(details, [["reason", "Reviewed access"], ["status", "suspended"], ["revision id", "r"], ["country code", "None"]]);
  assert.equal(auditDetails({ reason: "x".repeat(9000) })[0][1].length, 2000);
  assert.deepEqual(auditDetails(null), []);
  assert.deepEqual(auditDetails({ reason: { password: "nested" } }), []);
});

test("database failures never reveal raw SQL, tokens, provider text or stack traces", () => {
  const secret = "private SQL and a provider token";
  for (const code of ["40001", "42501", "23503", "22023", "unknown"]) {
    const message = adminErrorMessage({ code, message: secret, details: secret, stack: secret });
    assert.ok(!message.includes(secret));
  }
  assert.match(adminErrorMessage({ code: "40001" }), /another session/);
  assert.match(adminErrorMessage(new Error(secret)), /No success was confirmed/);
});
