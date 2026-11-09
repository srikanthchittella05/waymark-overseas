import assert from "node:assert/strict";
import test from "node:test";
import { ARCHETYPE_SECTIONS } from "../../src/lib/engine/guides/archetypes";
import type { GuideContent } from "../../src/lib/engine/guides/types";
import {
  AdminConflictError, AdminInputError, MAX_GUIDE_BYTES, ensureLatestRevision, field, literalSearch, pageNumber, parseAnnouncementForm,
  parseDeadlineForm, parseGuideForm, parseJsonPayload, parseRevokeForm, parseUserStatusForm, searchText,
} from "../../src/lib/admin/input";

const ID = "3b20dabc-1e05-4539-88be-02bf61877f43";
const form = (values: Record<string, string | undefined>) => {
  const result = new FormData();
  for (const [key, value] of Object.entries(values)) if (value !== undefined) result.set(key, value);
  return result;
};
const guide: GuideContent = {
  archetype: "language-test", intro: "A full guide, not only a text field.",
  sections: Object.fromEntries(ARCHETYPE_SECTIONS["language-test"].map(({ id }) => [id, { body: "Useful section content." }])),
};
const revision = { milestoneId: "us-english", intakeId: "", reason: "Reviewed source and clarified the guidance.", expectedLatestId: ID };
const deadline = { ...revision, offsetDays: "120", dueDate: "", hardDeadline: "on", source: "https://example.org/source", confidence: "typical", verifiedOn: "2026-10-20" };

test("guide writes preserve scope and the expected latest revision", () => {
  const parsed = parseGuideForm(form({ ...revision, payload: JSON.stringify(guide) }));
  assert.equal(parsed.kind, "guide");
  assert.equal(parsed.expectedLatestId, ID);
  assert.equal(parsed.intakeId, null);
  assert.deepEqual(parsed.payload, guide);
});

test("revision review rejects stale, missing and non-latest publication candidates", () => {
  ensureLatestRevision(ID, ID, ID);
  ensureLatestRevision(null, null);
  for (const [expected, actual, candidate] of [[ID, null, ID], [null, ID, undefined], [ID, ID, "another-revision"]] as const) {
    assert.throws(() => ensureLatestRevision(expected, actual, candidate), (error: unknown) => {
      assert.ok(error instanceof AdminConflictError);
      assert.equal(error.code, "40001");
      return true;
    });
  }
});

test("guide writes reject missing canonical sections, extra nested fields and wrong archetypes", () => {
  const missing = structuredClone(guide);
  delete missing.sections.exams;
  for (const payload of [missing, { ...guide, archetype: "visa" }, { ...guide, admin: true },
    { ...guide, sections: { ...guide.sections, exams: { body: "Body", unknown: "not allowed" } } }]) {
    assert.throws(() => parseGuideForm(form({ ...revision, payload: JSON.stringify(payload) })));
  }
});

test("untrusted inputs cannot use prototype milestone names, intake-scoped guides or invalid revision IDs", () => {
  for (const change of [{ milestoneId: "__proto__" }, { milestoneId: "constructor" }, { intakeId: "us-fall-2027" }, { expectedLatestId: "not-a-uuid" }]) {
    assert.throws(() => parseGuideForm(form({ ...revision, payload: JSON.stringify(guide), ...change })));
  }
});

test("field boundaries reject duplicates, files and byte-sized oversize input", () => {
  const duplicated = form({ reason: "First reason" });
  duplicated.append("reason", "Second reason");
  assert.throws(() => field(duplicated, "reason"), AdminInputError);
  const file = new FormData();
  file.set("reason", new Blob(["not accepted"]), "reason.txt");
  assert.throws(() => field(file, "reason"), AdminInputError);
  assert.throws(() => field(form({ value: "é".repeat(11) }), "value", 20), AdminInputError);
});

test("JSON is capped before parsing and parsing errors never echo payload text", () => {
  assert.throws(() => parseJsonPayload("x".repeat(MAX_GUIDE_BYTES + 1)), /too large/);
  assert.throws(() => parseJsonPayload('{"credential":"do-not-echo"'), (error: unknown) => {
    assert.ok(error instanceof AdminInputError);
    assert.ok(!error.message.includes("do-not-echo"));
    return true;
  });
});

test("deadline writes reject invalid calendar dates, nonintegers and unsafe sources", () => {
  const valid = parseDeadlineForm(form(deadline));
  assert.equal(valid.kind, "deadline");
  for (const change of [{ verifiedOn: "2026-02-29" }, { offsetDays: "1.5" }, { offsetDays: "1e2" }, { offsetDays: "1461" },
    { source: "javascript:alert(1)" }, { source: "https://user:password@example.org" }, { hardDeadline: "true" },
    { intakeId: "gb-autumn-2027" }, { dueDate: "2027-12-01" }]) {
    assert.throws(() => parseDeadlineForm(form({ ...deadline, ...change })));
  }
});

test("exact deadline dates require the correct specific intake", () => {
  const parsed = parseDeadlineForm(form({ ...deadline, intakeId: "us-fall-2027", dueDate: "2027-02-28" }));
  assert.equal(parsed.intakeId, "us-fall-2027");
  assert.equal((parsed.payload as { dueDate: string }).dueDate, "2027-02-28");
});

test("user actions require confirmation, UUIDs, allowlisted statuses and meaningful reasons", () => {
  const input = { userId: ID, status: "suspended", reason: "Investigated an access abuse report.", confirmed: "yes" };
  assert.equal(parseUserStatusForm(form(input)).status, "suspended");
  assert.equal(parseRevokeForm(form(input)).userId, ID);
  for (const change of [{ userId: "other" }, { status: "admin" }, { confirmed: "on" }, { reason: "short" }]) {
    assert.throws(() => parseUserStatusForm(form({ ...input, ...change })));
  }
  assert.throws(() => parseRevokeForm(form({ ...input, reason: "no" })));
  assert.throws(() => parseRevokeForm(form({ ...input, confirmed: "" })));
});

test("announcement writes select exactly one validated audience and reject markup", () => {
  const base = { title: "Deadline reviewed", body: "Review your route and the authoritative source.", audience: "all", confirmed: "yes" };
  assert.equal(parseAnnouncementForm(form(base)).targetUserId, null);
  assert.equal(parseAnnouncementForm(form({ ...base, audience: "country", countryCode: "US" })).countryCode, "US");
  assert.equal(parseAnnouncementForm(form({ ...base, audience: "user", targetUserId: ID })).targetUserId, ID);
  for (const change of [{ confirmed: "" }, { audience: "everyone" }, { audience: "country" }, { audience: "user" },
    { audience: "country", countryCode: "XX" }, { audience: "user", targetUserId: "bad" },
    { countryCode: "US" }, { audience: "country", countryCode: "US", targetUserId: ID },
    { body: "<script>bad()</script>" }, { title: " " }, { body: "x".repeat(10001) }]) {
    assert.throws(() => parseAnnouncementForm(form({ ...base, ...change })));
  }
});

test("pagination and list filters are bounded and literal wildcard characters are escaped", () => {
  assert.equal(pageNumber("2"), 2);
  for (const value of ["0", "-1", "1.5", "1001", "999999999", "1e2", ["2", "3"], undefined]) assert.equal(pageNumber(value), 1);
  assert.equal(searchText("  hello\nworld  "), "helloworld");
  assert.equal(searchText("x".repeat(1000)).length, 80);
  assert.equal(searchText(["a", "b"]), "");
  assert.equal(literalSearch("a%_\\b"), "%a\\%\\_\\\\b%");
});
