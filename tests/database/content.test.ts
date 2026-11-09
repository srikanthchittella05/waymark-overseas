import assert from "node:assert/strict";
import { admin, anon, deadline, ids, jsonSql, latest, plan, quote, record, saveSql, scalar, user, type Database } from "./support";

function minimalGuide(db: Database, milestone: string): Record<string, unknown> {
  const catalog = record(db, `select to_jsonb(m) from public.catalog_milestones m where id = ${quote(milestone)};`, anon);
  assert(Array.isArray(catalog.section_ids));
  return { archetype: catalog.archetype, intro: "Reviewed, source-backed guidance.",
    sections: Object.fromEntries(catalog.section_ids.map((id: unknown) => {
      assert.equal(typeof id, "string");
      return [String(id), { body: "Useful reviewed guidance." }];
    })) };
}

export async function testContent(db: Database): Promise<void> {
  const base = minimalGuide(db, "us-profile-cv");
  const sections = base.sections as Record<string, Record<string, unknown>>;
  const firstSection = Object.keys(sections)[0];
  assert(firstSection);
  const originalLatest = latest(db, "guide", "us-profile-cv", null);
  assert(originalLatest);
  let guideDraft: Record<string, unknown> = {};
  let nextGuideDraft: Record<string, unknown> = {};

  for (const [label, actor] of [["non-admin", user("alice", "aal2")], ["admin at aal1", user("admin")]] as const) {
    for (const statement of [
      saveSql("guide", "us-profile-cv", null, base, originalLatest),
      `select public.admin_publish_revision(${quote(originalLatest)},${quote(originalLatest)});`,
      "select public.admin_publish_announcement('Reviewed update','This is a plain-text update.',null,null);",
      `select public.admin_archive_announcement(${quote(ids.missing)});`,
    ]) {
      await db.test(`${label} cannot mutate administrative content: ${statement.split("(")[0]}`, () => db.reject(statement, "42501", actor));
    }
  }
  await db.test("first revision requires null latest token; seeded scopes require their existing latest id", () => {
    db.reject(saveSql("guide", "us-profile-cv", null, base), "40001", admin);
    db.reject(saveSql("deadline", "us-sop", null, deadline, originalLatest), "40001", admin);
  });
  await db.test("aal2 admin can append a validated immutable guide draft", () => {
    guideDraft = record(db, saveSql("guide", "us-profile-cv", null, base, originalLatest), admin);
    assert.equal(guideDraft.state, "draft");
    assert.equal(guideDraft.created_by, ids.admin);
    assert.equal(guideDraft.published_at, null);
  });
  await db.test("drafts and history remain invisible to anon and non-admins, visible to aal2 admins", () => {
    for (const actor of [anon, user("alice"), user("admin")]) {
      assert.equal(scalar(db, `select count(*) from public.content_revisions where id = ${quote(String(guideDraft.id))};`, actor), "0");
    }
    assert.equal(scalar(db, `select count(*) from public.content_revisions where id = ${quote(String(guideDraft.id))};`, admin), "1");
  });
  await db.test("stale draft save does not append another revision", () => {
    db.reject(saveSql("guide", "us-profile-cv", null, base, originalLatest), "40001", admin);
    assert.equal(latest(db, "guide", "us-profile-cv", null), guideDraft.id);
  });

  const validResource = { title: "Official source", kind: "official", why: "Read the provider's current requirements.", verifiedOn: "2026-10-20", url: "https://www.example.edu/admissions" };
  const validExam = { name: "A verified exam", accepted: true, verifiedOn: "2026-10-20" };
  const invalidGuides: [string, unknown][] = [
    ["unknown root field", { ...base, owner: ids.alice }],
    ["missing intro", { archetype: base.archetype, sections }],
    ["wrong archetype", { ...base, archetype: "visa" }],
    ["empty intro", { ...base, intro: "  " }],
    ["null intro", { ...base, intro: null }],
    ["overlong intro", { ...base, intro: "x".repeat(16001) }],
    ["unknown section", { ...base, sections: { ...sections, extra: { body: "Not canonical." } } }],
    ["missing section", { ...base, sections: Object.fromEntries(Object.entries(sections).slice(1)) }],
    ["null sections", { ...base, sections: null }],
  ];
  const invalidSections: [string, unknown][] = [
    ["empty section", {}], ["only empty arrays", { points: [], resources: [] }],
    ["unknown section field", { body: "Useful", html: "<script>bad()</script>" }],
    ["null body", { body: null }], ["non-text body", { body: false }], ["overlong body", { body: "x".repeat(40001) }],
    ["empty point", { points: [""] }], ["too many points", { points: Array(101).fill("Useful") }],
    ["non-array resources", { resources: validResource }], ["too many resources", { resources: Array(201).fill(validResource) }],
    ["resource missing why", { resources: [{ title: "Source", kind: "site", verifiedOn: "2026-10-20" }] }],
    ["resource unknown field", { resources: [{ ...validResource, owner: ids.alice }] }],
    ["invalid resource kind", { resources: [{ ...validResource, kind: "script" }] }],
    ["invalid free flag", { resources: [{ ...validResource, free: "true" }] }],
    ["null optional cost", { resources: [{ ...validResource, cost: null }] }],
    ["invalid source date", { resources: [{ ...validResource, verifiedOn: "2026-02-30" }] }],
    ["javascript URL", { resources: [{ ...validResource, url: "javascript:alert(1)" }] }],
    ["http URL", { resources: [{ ...validResource, url: "http://www.example.edu/" }] }],
    ["credential URL", { resources: [{ ...validResource, url: "https://name:password@example.edu/" }] }],
    ["backslash URL", { resources: [{ ...validResource, url: "https://example.edu\\@evil.example/" }] }],
    ["whitespace URL", { resources: [{ ...validResource, url: "https://example.edu/a b" }] }],
    ["invalid URL port", { resources: [{ ...validResource, url: "https://example.edu:99999/" }] }],
    ["nonboolean accepted", { exams: [{ ...validExam, accepted: "true" }] }],
    ["missing exam verification", { exams: [{ name: "Exam", accepted: true }] }],
    ["exam javascript URL", { exams: [{ ...validExam, url: "javascript:alert(1)" }] }],
    ["invalid exam array", { exams: Array(51).fill(validExam) }],
    ["unknown subsection field", { subsections: [{ title: "Subsection", secret: true }] }],
    ["nontext topic", { subsections: [{ title: "Subsection", topics: [1] }] }],
    ["nested resource URL", { subsections: [{ title: "Subsection", resources: [{ ...validResource, url: "javascript:alert(1)" }] }] }],
    ["roadmap empty focus", { roadmap: [{ label: "Week 1", title: "Prepare", goal: "Prepare well.", focus: [] }] }],
    ["roadmap missing goal", { roadmap: [{ label: "Week 1", title: "Prepare", focus: ["Useful"] }] }],
    ["roadmap nested URL", { roadmap: [{ label: "Week 1", title: "Prepare", goal: "Prepare well.", focus: ["Useful"], resources: [{ ...validResource, url: "javascript:alert(1)" }] }] }],
    ["callout invalid tone", { callout: { tone: "danger", title: "Watch", body: "Useful" } }],
    ["callout extra field", { callout: { tone: "watch", title: "Watch", body: "Useful", html: true } }],
  ];
  for (const [label, value] of invalidSections) invalidGuides.push([label, { ...base, sections: { ...sections, [firstSection]: value } }]);
  for (const [label, payload] of invalidGuides) {
    await db.test(`guide validation rejects ${label}`, () => {
      db.reject(saveSql("guide", "us-profile-cv", null, payload, String(guideDraft.id)), "22023", admin);
      assert.equal(latest(db, "guide", "us-profile-cv", null), guideDraft.id);
    });
  }
  await db.test("all supported nested guide content accepts valid values", () => {
    const payload = { ...base, sections: { ...sections, [firstSection]: {
      body: "Useful text.", points: ["Useful point."],
      resources: [{ ...validResource, free: false, cost: "Check the provider's current fee." }],
      exams: [{ ...validExam, requiredScore: "Provider-defined", note: "Check acceptance.", validity: "Provider-defined", howToBook: "Use the official portal.", leadTime: "Book early.", cost: "Check current fees.", url: "https://example.edu/" }],
      subsections: [{ title: "Inside", what: "What to do.", format: "The format.", score: "The score.", topics: ["A topic"], tip: "A useful tip.", resources: [validResource] }],
      roadmap: [{ label: "Week 1", title: "Prepare", goal: "Prepare well.", focus: ["A focused task"], hours: "Your own pace", checkpoint: "Check readiness.", resources: [validResource] }],
      callout: { tone: "good", title: "A useful note", body: "Check the provider's current information." },
    } } };
    nextGuideDraft = record(db, saveSql("guide", "us-profile-cv", null, payload, String(guideDraft.id)), admin);
  });
  await db.test("stale publish rejects both old draft and mismatched latest token", () => {
    db.reject(`select public.admin_publish_revision(${quote(String(guideDraft.id))},${quote(String(guideDraft.id))});`, "40001", admin);
    db.reject(`select public.admin_publish_revision(${quote(String(guideDraft.id))},${quote(String(nextGuideDraft.id))});`, "40001", admin);
    db.reject(`select public.admin_publish_revision(${quote(String(nextGuideDraft.id))},${quote(String(guideDraft.id))});`, "40001", admin);
  });
  const progressBefore = scalar(db, "select jsonb_agg(to_jsonb(s) order by milestone_id) from public.step_progress s;", user("alice"));
  await db.test("publishing latest draft archives prior publication, audits, notifies and preserves progress atomically", () => {
    db.sql(`select public.admin_publish_revision(${quote(String(nextGuideDraft.id))},${quote(String(nextGuideDraft.id))});`, admin);
    assert.equal(scalar(db, "select id from public.content_revisions where kind = 'guide' and milestone_id = 'us-profile-cv';", anon), nextGuideDraft.id);
    assert.equal(scalar(db, `select state from public.content_revisions where id = ${quote(originalLatest)};`, admin), "archived");
    assert.equal(scalar(db, "select jsonb_agg(to_jsonb(s) order by milestone_id) from public.step_progress s;", user("alice")), progressBefore);
    assert.equal(scalar(db, `select count(*) from public.audit_events where action = 'content.published' and subject_id = ${quote(String(nextGuideDraft.id))};`, admin), "1");
    assert.equal(scalar(db, "select count(*) from public.announcements where title = 'Guide updated';", user("alice")), "1");
    assert.equal(scalar(db, "select count(*) from public.announcements where title = 'Guide updated';", user("bob")), "0");
  });
  await db.test("re-publishing a published revision fails rather than duplicating notices", () => {
    db.reject(`select public.admin_publish_revision(${quote(String(nextGuideDraft.id))},${quote(String(nextGuideDraft.id))});`, "40001", admin);
    assert.equal(scalar(db, "select count(*) from public.announcements where title = 'Guide updated';", admin), "1");
  });
  await db.test("rollback appends a new revision, never edits/deletes history", () => {
    const oldPayload = JSON.parse(scalar(db, `select payload from public.content_revisions where id = ${quote(originalLatest)};`, admin)) as unknown;
    const rollback = record(db, saveSql("guide", "us-profile-cv", null, oldPayload, String(nextGuideDraft.id)), admin);
    db.sql(`select public.admin_publish_revision(${quote(String(rollback.id))},${quote(String(rollback.id))});`, admin);
    assert.equal(scalar(db, `select count(*) from public.content_revisions where milestone_id = 'us-profile-cv' and kind = 'guide';`, admin), "4");
  });
  await db.test("operator seed cannot overwrite admin publication or optimistic latest token", () => {
    const before = scalar(db, "select jsonb_agg(to_jsonb(r) order by sequence) from public.content_revisions r;");
    db.sql(db.seed);
    assert.equal(scalar(db, "select jsonb_agg(to_jsonb(r) order by sequence) from public.content_revisions r;"), before);
  });
  await db.test("operator cannot mutate or delete revision history or truncate it", () => {
    db.reject(`update public.content_revisions set reason = 'Forged revision reason' where id = ${quote(originalLatest)};`, "42501");
    db.reject(`delete from public.content_revisions where id = ${quote(originalLatest)};`, "42501");
    db.reject("truncate public.content_revisions;", "42501");
    assert.equal(scalar(db, `select count(*) from public.content_revisions where id = ${quote(originalLatest)};`, anon), "0");
  });

  for (const [kind, milestone, intake, payload] of [
    ["unknown", "us-sop", null, deadline], ["guide", "missing", null, base],
    ["guide", "us-profile-cv", "us-fall-2027", base], ["guide", "us-profile-cv", "", base],
    ["deadline", "us-sop", "gb-sep-2027", deadline], ["deadline", "us-sop", "missing", deadline],
  ] as const) {
    await db.test(`revision scope ${kind}/${milestone}/${intake} is rejected`, () => db.reject(saveSql(kind, milestone, intake, payload), "22023", admin));
  }
  const badDeadlines: [string, unknown][] = [
    ["unknown fields", { ...deadline, owner: ids.alice }], ["missing source", { offsetDays: 1, hardDeadline: true, confidence: "verified", verifiedOn: "2026-10-20" }],
    ["null payload", null], ["array payload", []], ["NaN string offset", { ...deadline, offsetDays: "NaN" }],
    ["infinite string offset", { ...deadline, offsetDays: "Infinity" }], ["null offset", { ...deadline, offsetDays: null }],
    ["decimal offset", { ...deadline, offsetDays: 1.5 }], ["high offset", { ...deadline, offsetDays: 1461 }],
    ["low offset", { ...deadline, offsetDays: -366 }], ["nonboolean hardDeadline", { ...deadline, hardDeadline: "true" }],
    ["invalid confidence", { ...deadline, confidence: "certain" }], ["javascript source", { ...deadline, source: "javascript:alert(1)" }],
    ["HTTP source", { ...deadline, source: "http://example.edu/" }], ["credentials source", { ...deadline, source: "https://user:password@example.edu/" }],
    ["invalid date", { ...deadline, verifiedOn: "2026-02-29" }], ["noncanonical date", { ...deadline, verifiedOn: "2026-1-01" }],
    ["year zero", { ...deadline, verifiedOn: "0000-01-01" }], ["intake-free exact date", { ...deadline, dueDate: "2027-01-10" }],
  ];
  for (const [label, payload] of badDeadlines) {
    await db.test(`deadline validation rejects ${label}`, () => db.reject(saveSql("deadline", "us-sop", null, payload), "22023", admin));
  }
  await db.test("invalid exact calendar deadline is rejected even with a valid intake", () => {
    db.reject(saveSql("deadline", "us-sop", "us-fall-2027", { ...deadline, dueDate: "2027-02-30" }), "22023", admin);
  });
  await db.test("valid leap day and timing boundary offsets are accepted", () => {
    for (const [milestone, offset] of [["us-gre", -365], ["us-english", 1460]] as const) {
      record(db, saveSql("deadline", milestone, null, { ...deadline, offsetDays: offset, verifiedOn: "2024-02-29" }), admin);
    }
  });
  let exactDeadline: Record<string, unknown> = {};
  await db.test("intake-specific exact deadline can be drafted and published", () => {
    exactDeadline = record(db, saveSql("deadline", "us-sop", "us-fall-2027", { ...deadline, dueDate: "2027-01-10" }), admin);
    db.sql(`select public.admin_publish_revision(${quote(String(exactDeadline.id))},${quote(String(exactDeadline.id))});`, admin);
    assert.equal(scalar(db, `select id from public.content_revisions where id = ${quote(String(exactDeadline.id))};`, anon), exactDeadline.id);
  });
  await db.test("deadline publication notice is visible only to plans in its specific intake", () => {
    plan(db, "noPlan", "us-spring-2028");
    assert.equal(scalar(db, "select count(*) from public.announcements where title = 'Planning deadline updated';", user("alice")), "1");
    assert.equal(scalar(db, "select count(*) from public.announcements where title = 'Planning deadline updated';", user("noPlan")), "0");
    assert.equal(scalar(db, "select count(*) from public.announcements where title = 'Planning deadline updated';", user("bob")), "0");
  });
  await db.test("failed notice insertion rolls the entire publication back", () => {
    const draft = record(db, saveSql("deadline", "us-sop", "us-fall-2027", { ...deadline, dueDate: "2027-01-11" }, String(exactDeadline.id)), admin);
    const auditBefore = scalar(db, "select count(*) from public.audit_events;", admin);
    const noticesBefore = scalar(db, "select count(*) from public.announcements;", admin);
    db.sql(`create schema test_faults;
      create function test_faults.fail_notice() returns trigger language plpgsql as $$
      begin raise exception using errcode = '23514', message = 'Injected notice failure'; end; $$;
      create trigger fail_notice before insert on public.announcements for each row execute function test_faults.fail_notice();`);
    try {
      db.reject(`select public.admin_publish_revision(${quote(String(draft.id))},${quote(String(draft.id))});`, "23514", admin);
    } finally {
      db.sql("drop trigger fail_notice on public.announcements; drop function test_faults.fail_notice(); drop schema test_faults;");
    }
    assert.equal(scalar(db, `select state from public.content_revisions where id = ${quote(String(draft.id))};`, admin), "draft");
    assert.equal(scalar(db, `select state from public.content_revisions where id = ${quote(String(exactDeadline.id))};`, admin), "published");
    assert.equal(scalar(db, "select count(*) from public.audit_events;", admin), auditBefore);
    assert.equal(scalar(db, "select count(*) from public.announcements;", admin), noticesBefore);
  });
  await db.test("unknown and non-draft publish requests fail without publication changes", () => {
    db.reject(`select public.admin_publish_revision(${quote(ids.missing)},${quote(ids.missing)});`, "22023", admin);
    db.reject(`select public.admin_publish_revision(${quote(originalLatest)},${quote(originalLatest)});`, "40001", admin);
  });
  await db.test("null/short/overlong reasons are rejected by DB, not only the form validator", () => {
    for (const reason of ["null", "'short'", quote("x".repeat(2001))]) {
      db.reject(`select public.admin_save_revision('deadline','us-sop',null,${jsonSql(deadline)},${reason},null);`, "22023", admin);
    }
  });

  let globalNotice: Record<string, unknown> = {};
  let countryNotice: Record<string, unknown> = {};
  let targetedNotice: Record<string, unknown> = {};
  let intersectedNotice: Record<string, unknown> = {};
  await db.test("admin publishes audited global, country, targeted and intersected announcements", () => {
    globalNotice = record(db, "select public.admin_publish_announcement('Global update','A useful plain-text update.',null,null);", admin);
    countryNotice = record(db, "select public.admin_publish_announcement('Country update','A useful US update.','US',null);", admin);
    targetedNotice = record(db, `select public.admin_publish_announcement('Personal update','A useful personal update.',null,${quote(ids.bob)});`, admin);
    intersectedNotice = record(db, `select public.admin_publish_announcement('Scoped personal update','A useful scoped update.','US',${quote(ids.bob)});`, admin);
    for (const notice of [globalNotice, countryNotice, targetedNotice, intersectedNotice]) {
      assert.equal(notice.created_by, ids.admin);
      assert.equal(scalar(db, `select count(*) from public.audit_events where subject_id = ${quote(String(notice.id))} and action = 'announcement.published';`, admin), "1");
    }
  });
  await db.test("notice audiences use country/target intersection, never union", () => {
    assert.equal(scalar(db, `select count(*) from public.announcements where id = ${quote(String(globalNotice.id))};`, user("bob")), "1");
    assert.equal(scalar(db, `select count(*) from public.announcements where id = ${quote(String(countryNotice.id))};`, user("bob")), "0");
    assert.equal(scalar(db, `select count(*) from public.announcements where id = ${quote(String(targetedNotice.id))};`, user("alice")), "0");
    assert.equal(scalar(db, `select count(*) from public.announcements where id = ${quote(String(targetedNotice.id))};`, user("bob")), "1");
    assert.equal(scalar(db, `select count(*) from public.announcements where id = ${quote(String(intersectedNotice.id))};`, user("bob")), "0");
    assert.equal(scalar(db, `select count(*) from public.announcements where id = ${quote(String(intersectedNotice.id))};`, user("alice")), "0");
  });
  await db.test("mark_notification_read is idempotent and owner-derived", () => {
    db.sql(`select public.mark_notification_read(${quote(String(globalNotice.id))});`, user("alice"));
    db.sql(`select public.mark_notification_read(${quote(String(globalNotice.id))});`, user("alice"));
    assert.equal(scalar(db, "select count(*) from public.notification_reads;", user("alice")), "1");
    assert.equal(scalar(db, "select count(*) from public.notification_reads;", user("bob")), "0");
    assert.equal(scalar(db, "select user_id from public.notification_reads;", user("alice")), ids.alice);
  });
  await db.test("knowing a notification UUID does not authorize a read marker", () => {
    for (const notice of [targetedNotice.id, intersectedNotice.id, ids.missing]) db.reject(`select public.mark_notification_read(${quote(String(notice))});`, "42501", user("alice"));
    db.reject(`select public.mark_notification_read(${quote(String(countryNotice.id))});`, "42501", user("bob"));
    db.reject(`select public.mark_notification_read(${quote(String(globalNotice.id))});`, "42501", user("revoked"));
  });
  for (const [label, title, body, country, target] of [
    ["empty title", "'  '", "'Useful update'", "null", "null"],
    ["overlong title", quote("x".repeat(201)), "'Useful update'", "null", "null"],
    ["empty body", "'Useful title'", "null", "null", "null"],
    ["overlong body", "'Useful title'", quote("x".repeat(10001)), "null", "null"],
    ["HTML", "'Useful title'", "'<script>alert(1)</script>'", "null", "null"],
    ["unknown country", "'Useful title'", "'Useful update'", "'ZZ'", "null"],
    ["unknown target", "'Useful title'", "'Useful update'", "null", quote(ids.missing)],
  ]) {
    await db.test(`announcement validation rejects ${label}`, () => db.reject(`select public.admin_publish_announcement(${title},${body},${country},${target});`, "22023", admin));
  }
  await db.test("archive is audited/idempotent and hides notification plus old read marker", () => {
    db.sql(`select public.admin_archive_announcement(${quote(String(globalNotice.id))});`, admin);
    db.sql(`select public.admin_archive_announcement(${quote(String(globalNotice.id))});`, admin);
    assert.equal(scalar(db, `select count(*) from public.announcements where id = ${quote(String(globalNotice.id))};`, user("alice")), "0");
    assert.equal(scalar(db, "select count(*) from public.notification_reads;", user("alice")), "0");
    db.reject(`select public.mark_notification_read(${quote(String(globalNotice.id))});`, "42501", user("alice"));
    assert.equal(scalar(db, `select count(*) from public.audit_events where action = 'announcement.archived' and subject_id = ${quote(String(globalNotice.id))};`, admin), "1");
    assert.equal(scalar(db, `select count(*) from public.announcements where id = ${quote(String(globalNotice.id))};`, admin), "1");
    db.reject(`select public.admin_archive_announcement(${quote(ids.missing)});`, "22023", admin);
  });

  await db.test("catalog definition validates strict fields, canonical sections and offsets even for operator seed", () => {
    db.reject("update public.catalog_milestones set definition = definition || '{\"owner\":\"forged\"}' where id = 'us-profile-cv';", "22023");
    db.reject("update public.catalog_milestones set definition = jsonb_set(definition,'{offsetDays}','\"NaN\"') where id = 'us-profile-cv';", "22023");
    db.reject("update public.catalog_milestones set section_ids = array['forged'] where id = 'us-profile-cv';", "22023");
    db.reject("update public.catalog_milestones set definition = jsonb_set(definition,'{source}','\"javascript:alert(1)\"') where id = 'us-profile-cv';", "22023");
    db.reject("update public.catalog_milestones set archetype = 'standardised-test', section_ids = array['choose','format','roadmap','resources'] where id = 'us-profile-cv';", "22023");
  });
  await db.test("catalog dependencies reject invalid, wrong-country, self and cyclic dependencies", () => {
    for (const dependency of ["missing-step", "gb-profile-cv", "us-profile-cv", "us-shortlist"]) {
      db.reject(`update public.catalog_milestones set definition = jsonb_set(definition,'{dependsOn}',${jsonSql([dependency])}) where id = 'us-profile-cv';`, "22023");
    }
  });
  await db.test("database progress-scope trigger protects even operator imports", () => {
    const ownedPlan = scalar(db, "select id from public.plans where intake_id = 'us-fall-2027';", user("alice"));
    db.reject(`insert into public.step_progress (plan_id,milestone_id,done) values (${quote(ownedPlan)},'gb-profile-cv',true);`, "22023");
  });
}
