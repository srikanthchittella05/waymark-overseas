import assert from "node:assert/strict";
import { admin, admin2, DatabaseError, deadline, latest, plan, quote, record, saveSql, scalar, user, type Database } from "./support";

function assertOneWinner(results: PromiseSettledResult<string>[]): string {
  const wins = results.filter((result) => result.status === "fulfilled");
  const losses = results.filter((result) => result.status === "rejected");
  assert.equal(wins.length, 1);
  assert.equal(losses.length, 1);
  assert(losses[0].status === "rejected");
  assert(losses[0].reason instanceof DatabaseError);
  assert.equal(losses[0].reason.sqlstate, "40001", losses[0].reason.message);
  assert(wins[0].status === "fulfilled");
  return wins[0].value;
}

export async function testConcurrency(db: Database): Promise<void> {
  await db.test("concurrent plan writes have exactly one winner and one real SQLSTATE 40001", async () => {
    const target = plan(db, "alice", "gb-sep-2027", "GB");
    const version = Number(target.version);
    const results = await Promise.allSettled([
      db.sqlAsync(`select public.set_step(${quote(String(target.id))},'gb-profile-cv',true,${version});`, user("alice")),
      db.sqlAsync(`select public.set_step(${quote(String(target.id))},'gb-english',true,${version});`, user("alice")),
    ]);
    const winning: unknown = JSON.parse(assertOneWinner(results));
    assert(winning !== null && typeof winning === "object" && "version" in winning);
    assert.equal(winning.version, version + 1);
    assert.equal(scalar(db, `select count(*) from public.step_progress where plan_id = ${quote(String(target.id))};`, user("alice")), "1");
  });
  await db.test("concurrent set/reset cannot silently overwrite each other", async () => {
    const target = plan(db, "alice", "gb-sep-2027", "GB");
    const results = await Promise.allSettled([
      db.sqlAsync(`select public.set_step(${quote(String(target.id))},'gb-profile-cv',true,${Number(target.version)});`, user("alice")),
      db.sqlAsync(`select public.reset_plan(${quote(String(target.id))},${Number(target.version)});`, user("alice")),
    ]);
    assertOneWinner(results);
  });
  await db.test("concurrent checkpoint and legacy step writes share the same plan lock and version", async () => {
    const target = plan(db, "alice", "us-fall-2028");
    const version = Number(target.version);
    const results = await Promise.allSettled([
      db.sqlAsync(`select public.set_checkpoint(${quote(String(target.id))},'us-profile-cv','start',null,null,${version});`, user("alice")),
      db.sqlAsync(`select public.set_step(${quote(String(target.id))},'us-profile-cv',true,${version});`, user("alice")),
    ]);
    assertOneWinner(results);
    assert.equal(scalar(db, `select version from public.plans where id = ${quote(String(target.id))};`, user("alice")), String(version + 1));
    assert.equal(scalar(db, `select (done = (status = 'complete')) and jsonb_array_length(history) = 1 from public.step_progress where plan_id = ${quote(String(target.id))};`, user("alice")), "t");
  });
  await db.test("concurrent checkpoint mutations cannot lose a history event or evidence entry", async () => {
    const target = plan(db, "alice", "us-fall-2028");
    const version = Number(target.version);
    const statements = ["First", "Second"].map((title) =>
      `select public.set_checkpoint(${quote(String(target.id))},'us-profile-cv','evidence','{"title":"${title}"}'::jsonb,null,${version});`);
    assertOneWinner(await Promise.allSettled(statements.map((sql) => db.sqlAsync(sql, user("alice")))));
    assert.equal(scalar(db, `select jsonb_array_length(history) || ',' || jsonb_array_length(evidence)
      from public.step_progress where plan_id = ${quote(String(target.id))};`, user("alice")), "2,1");
  });
  await db.test("two distinct administrators saving one scope cannot lose a revision", async () => {
    const initial = latest(db, "deadline", "us-recommendations", null);
    assert.equal(initial, null);
    const statement = saveSql("deadline", "us-recommendations", null, deadline);
    const results = await Promise.allSettled([db.sqlAsync(statement, admin), db.sqlAsync(statement, admin2)]);
    assertOneWinner(results);
    assert.equal(scalar(db, "select count(*) from public.content_revisions where kind = 'deadline' and milestone_id = 'us-recommendations' and intake_id is null;", admin), "1");
  });
  await db.test("concurrent publishers create exactly one publication, notice and audit event", async () => {
    const draft = record(db, saveSql("deadline", "us-documents-upload", null, deadline), admin);
    const statement = `select public.admin_publish_revision(${quote(String(draft.id))},${quote(String(draft.id))});`;
    const results = await Promise.allSettled([db.sqlAsync(statement, admin), db.sqlAsync(statement, admin2)]);
    assertOneWinner(results);
    assert.equal(scalar(db, `select count(*) from public.content_revisions where id = ${quote(String(draft.id))} and state = 'published';`, admin), "1");
    assert.equal(scalar(db, `select count(*) from public.audit_events where action = 'content.published' and subject_id = ${quote(String(draft.id))};`, admin), "1");
    assert.equal(scalar(db, "select count(*) from public.announcements where body like 'Updated us-documents-upload.%';", admin), "1");
  });
  await db.test("concurrent identical legacy imports merge once and keep one receipt", async () => {
    const statement = "select public.import_legacy_plan('US','us-spring-2027','applying',array['us-profile-cv','us-english'],'concurrent-import-01');";
    const results = await Promise.allSettled([db.sqlAsync(statement, user("alice")), db.sqlAsync(statement, user("alice"))]);
    assert(results.every((result) => result.status === "fulfilled"));
    const values = results.map((result) => result.status === "fulfilled" ? JSON.parse(result.value) as unknown : null);
    assert.deepEqual(values[0], values[1]);
    assert.equal(scalar(db, "select count(*) from public.legacy_imports where import_key = 'concurrent-import-01';", user("alice")), "1");
    assert.equal(scalar(db, "select count(*) from public.step_progress s join public.plans p on p.id = s.plan_id where p.intake_id = 'us-spring-2027' and s.done;", user("alice")), "2");
  });
}
