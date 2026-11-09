import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { admin, anon, claims, ids, jsonSql, plan, quote, record, scalar, sessionId, user, type Database, type Query } from "./support";

export async function testAccounts(db: Database): Promise<void> {
  await db.test("all public business tables have RLS enabled", () => {
    assert.equal(scalar(db, "select count(*) from pg_class c join pg_namespace n on n.oid = c.relnamespace where n.nspname = 'public' and c.relkind = 'r' and not c.relrowsecurity;"), "0");
  });
  await db.test("canonical seed exposes 7 countries, 28 intakes, 104 milestones and 104 guides to anon", () => {
    assert.equal(scalar(db, "select (select count(*) from public.catalog_countries) || ',' || (select count(*) from public.catalog_intakes) || ',' || (select count(*) from public.catalog_milestones) || ',' || (select count(*) from public.content_revisions);", anon), "7,28,104,104");
  });
  await db.test("repeating the seed is idempotent", () => {
    const before = scalar(db, "select jsonb_agg(to_jsonb(r) order by sequence) from public.content_revisions r;");
    db.sql(db.seed);
    assert.equal(scalar(db, "select jsonb_agg(to_jsonb(r) order by sequence) from public.content_revisions r;"), before);
    assert.equal(scalar(db, "select count(*) from public.audit_events where action = 'catalog.guide_seeded';"), "104");
  });
  await db.test("guest get_access is null", () => {
    assert.equal(scalar(db, "select public.get_access() is null;", anon), "t");
  });
  for (const table of ["profiles", "admin_members", "plans", "step_progress", "legacy_imports", "announcements", "notification_reads", "audit_events"]) {
    await db.test(`anon cannot read ${table}`, () => db.reject(`select * from public.${table};`, "42501", anon));
  }
  await db.test("anon cannot call a saving RPC", () => {
    db.reject("select public.select_plan('US','us-fall-2027','exploring');", "42501", anon);
  });
  await db.test("valid account access is snake_case and contains no metadata privileges", () => {
    const access = record(db, "select public.get_access();", user("alice"));
    assert.deepEqual(Object.keys(access).sort(), ["aal", "display_name", "email", "is_admin", "status", "user_id"]);
    assert.equal(access.status, "active");
    assert.equal(access.is_admin, false);
    assert.equal(access.user_id, ids.alice);
  });
  await db.test("forged signup role cannot grant administration", () => {
    assert.equal(record(db, "select public.get_access();", user("forged", "aal2")).is_admin, false);
    assert.equal(scalar(db, "select count(*) from public.admin_members;", user("forged", "aal2")), "0");
    db.reject(`insert into public.admin_members (user_id) values (${quote(ids.forged)});`, "42501", user("forged", "aal2"));
  });
  await db.test("invited admin is discoverable at aal1 without privileged reads", () => {
    assert.equal(record(db, "select public.get_access();", user("admin")).is_admin, true);
    assert.equal(scalar(db, "select count(*) from public.profiles;", user("admin")), "1");
    assert.equal(scalar(db, "select count(*) from public.audit_events;", user("admin")), "0");
  });
  await db.test("profile emails and counts are owner-only for non-admins", () => {
    assert.equal(scalar(db, "select count(*) from public.profiles;", user("alice")), "1");
    assert.equal(scalar(db, `select email from public.profiles where id = ${quote(ids.bob)};`, user("alice")), "");
    assert.equal(scalar(db, "select count(*) from public.profiles;", admin), "9");
  });
  await db.test("profile email follows Auth changes; metadata still does not grant a role", () => {
    db.sql(`update auth.users set email = 'updated@waymark.example' where id = ${quote(ids.forged)};`);
    assert.equal(record(db, "select public.get_access();", user("forged")).email, "updated@waymark.example");
    assert.equal(record(db, "select public.get_access();", user("forged")).is_admin, false);
  });
  await db.test("unverified email cannot use cloud saving or read a profile", () => {
    assert.equal(scalar(db, "select public.get_access() is null;", user("unverified")), "t");
    assert.equal(scalar(db, "select count(*) from public.profiles;", user("unverified")), "0");
    db.reject("select public.select_plan('US','us-fall-2027','exploring');", "42501", user("unverified"));
  });
  const invalidClaims: [string, Record<string, unknown>][] = [
    ["missing session", { ...claims("alice"), session_id: undefined }],
    ["unknown session", { ...claims("alice"), session_id: ids.missing }],
    ["malformed session", { ...claims("alice"), session_id: "not-a-uuid" }],
    ["another user's session", { ...claims("alice"), session_id: sessionId("bob") }],
    ["expired JWT", { ...claims("alice"), exp: 1 }],
    ["missing exp", { ...claims("alice"), exp: undefined }],
    ["NaN exp", { ...claims("alice"), exp: "NaN" }],
    ["malformed exp", { ...claims("alice"), exp: "invalid" }],
    ["wrong JWT role", { ...claims("alice"), role: "anon" }],
  ];
  for (const [label, jwt] of invalidClaims) {
    await db.test(`${label} fails closed in RPC and direct RLS reads`, () => {
      const options: Query = { role: "authenticated", claims: jwt };
      if (label === "wrong JWT role") assert.equal(scalar(db, "select public.get_access() is null;", options), "t");
      else assert.equal(record(db, "select public.get_access();", options).status, "revoked");
      assert.equal(scalar(db, "select count(*) from public.profiles;", options), "0");
      db.reject("select public.select_plan('US','us-fall-2027','exploring');", "42501", options);
    });
  }
  await db.test("provider ban, deletion, missing session, null session creation and not_after deny access", () => {
    for (const mutation of [
      `update auth.users set banned_until = now() + interval '1 hour' where id = ${quote(ids.forged)}`,
      `update auth.users set deleted_at = now() where id = ${quote(ids.forged)}`,
      `delete from auth.sessions where id = ${quote(sessionId("forged"))}`,
      `update auth.sessions set created_at = null where id = ${quote(sessionId("forged"))}`,
      `update auth.sessions set not_after = now() - interval '1 second' where id = ${quote(sessionId("forged"))}`,
    ]) {
      // Keep each emulated provider mutation and assertion in one transaction;
      // rollback ensures later account tests still see the original fixture.
      const result = scalar(db, `begin; ${mutation}; set role authenticated;
        set request.jwt.claims = ${quote(JSON.stringify(claims("forged")))};
        select (select count(*) from public.profiles) = 0; rollback;`);
      assert.equal(result, "t");
      db.reject(`begin; ${mutation}; set role authenticated;
        set request.jwt.claims = ${quote(JSON.stringify(claims("forged")))};
        select public.select_plan('US','us-fall-2027','exploring');`, "42501");
    }
  });

  let alicePlan = plan(db, "alice");
  const bobPlan = plan(db, "bob", "gb-sep-2027", "GB");
  await db.test("plan ownership comes exclusively from auth.uid and active plan is atomic", () => {
    assert.equal(alicePlan.user_id, ids.alice);
    assert.equal(scalar(db, "select active_plan_id from public.profiles;", user("alice")), alicePlan.id);
    assert.equal(scalar(db, "select count(*) from public.plans;", user("alice")), "1");
  });
  for (const [country, intake, stage] of [
    ["US", "gb-sep-2027", "exploring"], ["ZZ", "us-fall-2027", "exploring"],
    ["US", "missing-intake", "exploring"], ["US", "us-fall-2027", "admin"],
  ]) {
    await db.test(`invalid target ${country}/${intake}/${stage} is rejected`, () => {
      db.reject(`select public.select_plan(${quote(country)},${quote(intake)},${quote(stage)});`, "22023", user("alice"));
    });
  }
  await db.test("restoring a plan is idempotent; changing stage increments its version", () => {
    const restored = plan(db, "alice");
    assert.deepEqual(restored, alicePlan);
    alicePlan = plan(db, "alice", "us-fall-2027", "US", "testing");
    assert.equal(alicePlan.version, 1);
  });
  await db.test("set_step increments version atomically and exposes own progress", () => {
    alicePlan = record(db, `select public.set_step(${quote(String(alicePlan.id))},'us-profile-cv',true,1);`, user("alice"));
    assert.equal(alicePlan.version, 2);
    assert.equal(scalar(db, "select milestone_id || ':' || done from public.step_progress;", user("alice")), "us-profile-cv:true");
  });
  await db.test("progress cannot be changed through a stale version", () => {
    db.reject(`select public.set_step(${quote(String(alicePlan.id))},'us-profile-cv',false,1);`, "40001", user("alice"));
    assert.equal(scalar(db, "select done from public.step_progress;", user("alice")), "t");
  });
  await db.test("reset cannot use a stale version", () => {
    db.reject(`select public.reset_plan(${quote(String(alicePlan.id))},1);`, "40001", user("alice"));
  });
  for (const statement of [
    `select public.set_step(${quote(String(alicePlan.id))},'gb-profile-cv',true,2);`,
    `select public.set_step(${quote(String(alicePlan.id))},'missing-step',true,2);`,
    `select public.set_step(${quote(String(alicePlan.id))},'us-profile-cv',null,2);`,
    `select public.set_step(${quote(String(alicePlan.id))},'us-profile-cv',true,null);`,
    `select public.reset_plan(${quote(String(alicePlan.id))},-1);`,
  ]) {
    await db.test(`invalid progress input is rejected: ${statement}`, () => db.reject(statement, "22023", user("alice")));
  }
  await db.test("cross-user plan/progress/import reads reveal no rows", () => {
    assert.equal(scalar(db, `select count(*) from public.plans where id = ${quote(String(alicePlan.id))};`, user("bob")), "0");
    assert.equal(scalar(db, `select count(*) from public.step_progress where plan_id = ${quote(String(alicePlan.id))};`, user("bob")), "0");
    assert.equal(scalar(db, `select count(*) from public.legacy_imports where user_id = ${quote(ids.alice)};`, user("bob")), "0");
  });
  for (const actor of [user("bob"), admin]) {
    await db.test(`${actor === admin ? "admin" : "other user"} cannot modify another user's plan`, () => {
      db.reject(`select public.set_step(${quote(String(alicePlan.id))},'us-profile-cv',false,2);`, "42501", actor);
      db.reject(`select public.reset_plan(${quote(String(alicePlan.id))},2);`, "42501", actor);
    });
  }
  await db.test("aal2 admin has no general private-plan/progress read access", () => {
    assert.equal(scalar(db, "select count(*) from public.plans;", admin), "0");
    assert.equal(scalar(db, "select count(*) from public.step_progress;", admin), "0");
    assert.equal(scalar(db, "select count(*) from public.legacy_imports;", admin), "0");
  });
  await db.test("another intake starts empty and restoring the first keeps its progress", () => {
    const spring = plan(db, "alice", "us-spring-2028");
    assert.notEqual(spring.id, alicePlan.id);
    assert.equal(scalar(db, `select count(*) from public.step_progress where plan_id = ${quote(String(spring.id))};`, user("alice")), "0");
    const restored = plan(db, "alice", "us-fall-2027", "US", "testing");
    assert.equal(restored.version, 2);
    assert.equal(scalar(db, `select done from public.step_progress where plan_id = ${quote(String(restored.id))};`, user("alice")), "t");
  });
  await db.test("legacy import merges true completions without erasing cloud data", () => {
    alicePlan = record(db, "select public.import_legacy_plan('US','us-fall-2027','testing',array['us-english'],'reviewed-import-001');", user("alice"));
    assert.equal(alicePlan.version, 3);
    assert.equal(scalar(db, `select count(*) from public.step_progress where plan_id = ${quote(String(alicePlan.id))} and done;`, user("alice")), "2");
  });
  await db.test("legacy import retry is idempotent and key is bound to reviewed destination/data", () => {
    const retried = record(db, "select public.import_legacy_plan('US','us-fall-2027','testing',array['us-english'],'reviewed-import-001');", user("alice"));
    assert.deepEqual(retried, alicePlan);
    db.reject("select public.import_legacy_plan('US','us-spring-2028','testing',array['us-english'],'reviewed-import-001');", "22023", user("alice"));
    db.reject("select public.import_legacy_plan('US','us-fall-2027','testing',array['us-gre'],'reviewed-import-001');", "22023", user("alice"));
    assert.equal(scalar(db, "select count(*) from public.legacy_imports;", user("alice")), "1");
    assert.equal(scalar(db, `select count(*) from public.legacy_imports where user_id = ${quote(ids.alice)};`, user("bob")), "0");
    assert.equal(scalar(db, "select count(*) from public.legacy_imports;", admin), "0");
  });
  const invalidImports = [
    "array['gb-profile-cv']", "array['missing-step']", "array['us-english','us-english']", "array[null]::text[]", "null::text[]",
    "array[['us-english','us-gre'],['us-profile-cv','us-sop']]", "array_fill('us-english'::text,array[105])",
  ];
  for (const completed of invalidImports) {
    await db.test(`invalid legacy completion list rejects atomically: ${completed}`, () => {
      db.reject(`select public.import_legacy_plan('US','us-spring-2027','exploring',${completed},'reviewed-import-bad');`, "22023", user("alice"));
      assert.equal(scalar(db, "select count(*) from public.plans where intake_id = 'us-spring-2027';", user("alice")), "0");
    });
  }
  await db.test("legacy import requires an idempotency key and preserves an empty existing import", () => {
    db.reject("select public.import_legacy_plan('US','us-fall-2027','testing','{}',null);", "22023", user("alice"));
    db.reject("select public.import_legacy_plan('US','us-fall-2027','testing','{}','short');", "22023", user("alice"));
    const empty = record(db, "select public.import_legacy_plan('US','us-fall-2027','testing','{}','reviewed-import-empty');", user("alice"));
    assert.equal(empty.version, alicePlan.version);
  });
  await db.test("reset affects exactly one owned plan and increments version", () => {
    const reset = record(db, `select public.reset_plan(${quote(String(alicePlan.id))},3);`, user("alice"));
    assert.equal(reset.version, 4);
    assert.equal(scalar(db, `select count(*) from public.step_progress where plan_id = ${quote(String(alicePlan.id))};`, user("alice")), "0");
    assert.equal(scalar(db, `select count(*) from public.plans where id = ${quote(String(bobPlan.id))};`, user("bob")), "1");
    // Keep one completion for publication-preserves-progress tests.
    db.sql(`select public.set_step(${quote(String(alicePlan.id))},'us-profile-cv',true,4);`, user("alice"));
  });

  const noMfa = user("admin");
  const nonAdmin = user("alice", "aal2");
  for (const [label, actor] of [["admin without aal2", noMfa], ["non-admin at aal2", nonAdmin]] as const) {
    for (const statement of [
      `select public.admin_set_user_status(${quote(ids.suspension)},'suspended','Reviewed policy incident');`,
      `select public.admin_revoke_sessions(${quote(ids.revoked)},'Reviewed security incident');`,
    ]) {
      await db.test(`${label} cannot call ${statement.includes("set_user_status") ? "suspension" : "session revocation"}`, () => db.reject(statement, "42501", actor));
    }
  }
  await db.test("admin cannot suspend self or another administrator", () => {
    for (const target of [ids.admin, ids.admin2]) db.reject(`select public.admin_set_user_status(${quote(target)},'suspended','Reviewed policy incident');`, "42501", admin);
  });
  await db.test("status/revoke reject missing users, status and insufficient reasons", () => {
    db.reject(`select public.admin_set_user_status(${quote(ids.missing)},'suspended','Reviewed policy incident');`, "22023", admin);
    db.reject(`select public.admin_set_user_status(${quote(ids.suspension)},'owner','Reviewed policy incident');`, "22023", admin);
    db.reject(`select public.admin_set_user_status(${quote(ids.suspension)},'suspended','short');`, "22023", admin);
    db.reject(`select public.admin_revoke_sessions(${quote(ids.revoked)},null);`, "22023", admin);
    db.reject(`select public.admin_revoke_sessions(${quote(ids.missing)},'Reviewed security incident');`, "22023", admin);
  });
  const suspensionPlan = plan(db, "suspension");
  await db.test("suspension denies existing token RPCs and direct private-data reads", () => {
    db.sql(`select public.admin_set_user_status(${quote(ids.suspension)},'suspended','Reviewed policy incident');`, admin);
    assert.equal(record(db, "select public.get_access();", user("suspension")).status, "suspended");
    assert.equal(scalar(db, "select count(*) from public.profiles;", user("suspension")), "0");
    assert.equal(scalar(db, "select count(*) from public.plans;", user("suspension")), "0");
    db.reject(`select public.set_step(${quote(String(suspensionPlan.id))},'us-profile-cv',true,0);`, "42501", user("suspension"));
    db.reject("select public.select_plan('US','us-fall-2027','exploring');", "42501", user("suspension"));
  });
  await db.test("unsuspending does not revive old sessions", () => {
    db.sql(`select public.admin_set_user_status(${quote(ids.suspension)},'active','Reviewed account appeal');`, admin);
    assert.equal(record(db, "select public.get_access();", user("suspension")).status, "revoked");
    db.reject("select public.select_plan('US','us-fall-2027','exploring');", "42501", user("suspension"));
  });
  await db.test("application session revocation does not mutate provider internal rows", () => {
    plan(db, "revoked");
    const sessionsBefore = scalar(db, `select to_jsonb(s) from auth.sessions s where id = ${quote(sessionId("revoked"))};`);
    db.sql(`select public.admin_revoke_sessions(${quote(ids.revoked)},'Reviewed security incident');`, admin);
    assert.equal(scalar(db, `select to_jsonb(s) from auth.sessions s where id = ${quote(sessionId("revoked"))};`), sessionsBefore);
    assert.equal(record(db, "select public.get_access();", user("revoked")).status, "revoked");
    assert.equal(scalar(db, "select count(*) from public.plans;", user("revoked")), "0");
    db.reject("select public.select_plan('US','us-fall-2027','exploring');", "42501", user("revoked"));
  });
  await db.test("refreshing an old session with a newer JWT iat still cannot regain app access", () => {
    db.sql(`update auth.sessions set updated_at = now() where id = ${quote(sessionId("revoked"))};`);
    const refreshed: Query = { role: "authenticated", claims: { ...claims("revoked"), iat: Math.floor(Date.now() / 1000) + 100 } };
    assert.equal(record(db, "select public.get_access();", refreshed).status, "revoked");
    assert.equal(scalar(db, "select count(*) from public.profiles;", refreshed), "0");
    db.reject("select public.select_plan('US','us-fall-2027','exploring');", "42501", refreshed);
  });
  await db.test("a newly authenticated session after revocation can log in", () => {
    const freshSession = "30000000-0000-4000-8000-000000000008";
    db.sql(`insert into auth.sessions (id,user_id,created_at) values (${quote(freshSession)},${quote(ids.revoked)},clock_timestamp());`);
    const fresh: Query = { role: "authenticated", claims: { ...claims("revoked"), session_id: freshSession } };
    assert.equal(record(db, "select public.get_access();", fresh).status, "active");
    assert.equal(record(db, "select public.select_plan('US','us-fall-2027','exploring');", fresh).user_id, ids.revoked);
  });
  await db.test("suspension and revocation actions are audited without tokens or passwords", () => {
    assert.equal(scalar(db, "select count(*) from public.audit_events where action in ('user.status_changed','user.sessions_revoked');", admin), "3");
    assert.equal(scalar(db, "select count(*) from public.audit_events where details::text ~* '(password|refresh_token|access_token)';", admin), "0");
  });

  const directWrites = [
    "insert into public.profiles (id) values ('10000000-0000-4000-8000-000000000099')",
    "update public.profiles set status = 'active', sessions_revoked_before = '-infinity'",
    "update public.profiles set active_plan_id = null",
    "delete from public.profiles",
    "insert into public.admin_members (user_id) values ('10000000-0000-4000-8000-000000000001')",
    "insert into public.plans (user_id,country_code,intake_id,stage) values ('10000000-0000-4000-8000-000000000002','US','us-fall-2027','exploring')",
    "update public.plans set user_id = '10000000-0000-4000-8000-000000000002'",
    "insert into public.step_progress (plan_id,milestone_id,done) values ('10000000-0000-4000-8000-000000000099','us-profile-cv',true)",
    "delete from public.step_progress",
    "delete from public.legacy_imports",
    "update public.catalog_countries set name = 'Forged'",
    "update public.catalog_intakes set country_code = 'GB'",
    "update public.catalog_milestones set section_ids = array['forged']",
    "delete from public.content_revisions",
    "insert into public.announcements (title,body) values ('Forged','Forged')",
    "insert into public.notification_reads (user_id,announcement_id) values ('10000000-0000-4000-8000-000000000002','10000000-0000-4000-8000-000000000099')",
    "insert into public.audit_events (action,subject_type,subject_id) values ('Forged','user','Forged')",
    "update public.audit_events set action = 'Forged'",
  ];
  for (const [index, statement] of directWrites.entries()) {
    await db.test(`direct business write ${index + 1} is denied for user AND aal2 admin`, () => {
      db.reject(`${statement};`, "42501", user("alice"));
      db.reject(`${statement};`, "42501", admin);
      db.reject(`${statement};`, "42501", anon);
    });
  }
  await db.test("private Auth tables and helper mutators cannot be accessed directly", () => {
    db.reject("select * from auth.sessions;", "42501", admin);
    db.reject("select * from auth.users;", "42501", user("alice"));
    db.reject("select private.require_admin();", "42501", user("alice"));
    db.reject("select private.require_user();", "42501", user("alice"));
    db.reject("select private.audit(null,'fake','fake','fake','{}');", "42501", admin);
  });
  await db.test("empty definer search paths and least-privilege helper execute grants are actually installed", () => {
    assert.equal(scalar(db, "select count(*) from pg_proc p join pg_namespace n on n.oid = p.pronamespace where n.nspname in ('public','private') and p.prosecdef and not coalesce(p.proconfig @> array['search_path=\"\"'],false);"), "0");
    assert.equal(scalar(db, "select has_schema_privilege('authenticated','public','create');"), "f");
    assert.equal(scalar(db, "select count(*) from pg_proc p join pg_namespace n on n.oid = p.pronamespace where n.nspname = 'private' and has_function_privilege('authenticated',p.oid,'execute') and p.proname not in ('active_user_id','is_admin','announcement_visible');"), "0");
    assert.equal(scalar(db, "select count(*) from pg_proc p join pg_namespace n on n.oid = p.pronamespace where n.nspname = 'private' and has_function_privilege('anon',p.oid,'execute');"), "0");
  });
  await db.test("an operator-suspended administrator loses aal2 reads AND writes", () => {
    const setup = `begin; update public.profiles set status = 'suspended' where id = ${quote(ids.admin2)};
      set role authenticated; set request.jwt.claims = ${quote(JSON.stringify(claims("admin2", "aal2")))};`;
    assert.equal(scalar(db, `${setup} select count(*) from public.audit_events; rollback;`), "0");
    db.reject(`${setup} select public.admin_publish_announcement('Test update','Useful test update.',null,null);`, "42501");
  });
  await db.test("even an operator cannot update/delete/truncate audit history", () => {
    for (const statement of ["update public.audit_events set action = 'fake'", "delete from public.audit_events", "truncate public.audit_events"]) db.reject(`${statement};`, "42501");
  });

  const checkpointPlan = plan(db, "alice", "us-spring-2028");
  const checkpointId = quote(String(checkpointPlan.id));
  let checkpointVersion = Number(checkpointPlan.version);
  const save = (milestone: string, action: string, evidence: unknown = null, reason: string | null = null,
    version: number | null = checkpointVersion) =>
    `select public.set_checkpoint(${checkpointId},${quote(milestone)},${quote(action)},
      ${evidence === null ? "null" : jsonSql(evidence)},${reason === null ? "null" : quote(reason)},${version});`;
  const progress = (milestone: string) => record(db,
    `select to_jsonb(s) from public.step_progress s where plan_id = ${checkpointId} and milestone_id = ${quote(milestone)};`, user("alice"));
  const advance = (milestone: string, action: string, evidence: unknown = null, reason: string | null = null) => {
    const saved = record(db, save(milestone, action, evidence, reason), user("alice"));
    checkpointVersion += 1;
    assert.equal(saved.version, checkpointVersion);
    return progress(milestone);
  };

  await db.test("checkpoint RPC is authenticated-only, owner-only and rejects inactive sessions", () => {
    const statement = save("us-profile-cv", "start");
    for (const actor of [anon, user("bob"), admin, user("unverified"),
      { role: "authenticated", claims: { ...claims("alice"), exp: 1 } } as Query]) {
      db.reject(statement, "42501", actor);
    }
    assert.equal(scalar(db, `select count(*) from public.step_progress where plan_id = ${checkpointId};`, user("alice")), "0");
    assert.equal(scalar(db, "select has_function_privilege('anon','public.set_checkpoint(uuid,text,text,jsonb,text,integer)','execute');"), "f");
    assert.equal(scalar(db, "select has_function_privilege('authenticated','public.set_checkpoint(uuid,text,text,jsonb,text,integer)','execute');"), "t");
    db.reject(`update public.step_progress set status = 'complete' where plan_id = ${checkpointId};`, "42501", user("alice"));
    for (const helper of ["validate_checkpoint_evidence(jsonb)", "validate_checkpoint_history(jsonb)",
      "check_checkpoint_dependencies(uuid,text,boolean)", "append_checkpoint_history(jsonb,timestamptz,text,text)"]) {
      assert.equal(scalar(db, `select has_function_privilege('authenticated','private.${helper}','execute');`), "f");
    }
  });
  await db.test("checkpoint inputs fail closed without partial progress or a version change", () => {
    const badEvidence: [string, unknown][] = [
      ["missing title", { url: "https://example.edu" }], ["unknown field", { title: "Proof", at: "2026-10-28" }],
      ["invalid title", { title: " ".repeat(301) }], ["long title", { title: "x".repeat(301) }],
      ["invalid URL", { title: "Proof", url: "http://example.edu/" }],
      ["credential URL", { title: "Proof", url: "https://user:secret@example.edu/" }],
      ["URL with backslash", { title: "Proof", url: "https://example.edu\\@evil.example/" }],
      ["long note", { title: "Proof", note: "x".repeat(4001) }],
      ["invalid verification date", { title: "Proof", verifiedOn: "2026-02-30" }],
      ["wrong date type", { title: "Proof", verifiedOn: 20261028 }],
      ["array envelope", [{ title: "Proof" }]], ["null JSON", "null"],
    ];
    for (const [label, evidence] of badEvidence) {
      const value = label === "null JSON" ? "'null'::jsonb" : jsonSql(evidence);
      db.reject(`select public.set_checkpoint(${checkpointId},'us-profile-cv','evidence',${value},null,${checkpointVersion});`, "22023", user("alice"));
    }
    for (const statement of [
      save("gb-profile-cv", "start"), save("missing-step", "start"), save("us-profile-cv", "unknown"),
      save("us-profile-cv", "start", { title: "Unexpected" }), save("us-profile-cv", "start", null, "Unexpected"),
      save("us-profile-cv", "evidence"), save("us-profile-cv", "complete", null, "Unexpected"),
      save("us-profile-cv", "skip"), save("us-profile-cv", "skip", { title: "Unexpected" }, "Reason"),
      save("us-profile-cv", "skip", null, "  "), save("us-profile-cv", "skip", null, "x".repeat(2001)),
      save("us-profile-cv", "start", null, null, -1), save("us-profile-cv", "start", null, null, null),
    ]) db.reject(statement, "22023", user("alice"));
    assert.equal(scalar(db, `select version from public.plans where id = ${checkpointId};`, user("alice")), String(checkpointVersion));
    assert.equal(scalar(db, `select count(*) from public.step_progress where plan_id = ${checkpointId};`, user("alice")), "0");
  });
  await db.test("start/evidence/skip transitions use server times and preserve a single completion truth", () => {
    const started = advance("us-profile-cv", "start");
    assert.equal(started.status, "in_progress");
    assert.equal(started.done, false);
    assert.equal(typeof started.started_at, "string");
    assert.equal(started.completed_at, null);
    assert.deepEqual(started.history, [{ at: started.started_at, status: "in_progress" }]);
    const added = advance("us-english", "evidence", { title: "Test booked", url: "https://example.edu/booking",
      note: "Booking confirmation", verifiedOn: "2024-02-29" });
    assert.equal(added.status, "evidence_submitted");
    assert.equal(added.started_at, null);
    assert.deepEqual(added.evidence, [{ title: "Test booked", url: "https://example.edu/booking",
      note: "Booking confirmation", verifiedOn: "2024-02-29" }]);
    assert.equal((added.history as Array<{ note: string }>)[0]?.note, "Test booked");
    const skipped = advance("us-english", "skip", null, "  Not required for my programme  ");
    assert.equal(skipped.status, "skipped_with_reason");
    assert.equal(skipped.done, false);
    assert.equal(skipped.completed_at, null);
    assert.equal(skipped.skipped_reason, "Not required for my programme");
    assert.equal((skipped.history as Array<{ note: string }>)[1]?.note, "Not required for my programme");
    const restarted = advance("us-english", "start");
    assert.equal(restarted.status, "in_progress");
    assert.equal(restarted.skipped_reason, null);
    assert.equal(typeof restarted.started_at, "string");
  });
  await db.test("completion requires all dependencies, and a completed dependent prevents reopening", () => {
    db.reject(save("us-sop", "complete"), "22023", user("alice"));
    db.reject(save("us-english", "complete", { title: "Invalid", url: "https://example.edu/" }, null,
      checkpointVersion - 1), "40001", user("alice"));
    const root = advance("us-profile-cv", "complete");
    assert.equal(root.done, true);
    assert.equal(root.status, "complete");
    assert.equal(typeof root.completed_at, "string");
    assert.equal(root.started_at, (root.history as Array<{ at: string }>)[0]?.at);
    db.reject(save("us-sop", "complete"), "22023", user("alice")); // shortlist is still missing
    const english = advance("us-english", "complete", { title: "Test result" });
    assert.equal(english.done, true);
    assert.equal(english.skipped_reason, null);
    assert.equal(typeof english.completed_at, "string");
    assert.equal(typeof english.started_at, "string");
    const before = JSON.stringify(root);
    db.reject(save("us-profile-cv", "start"), "22023", user("alice"));
    db.reject(save("us-profile-cv", "skip", null, "No longer needed"), "22023", user("alice"));
    db.reject(`select public.set_step(${checkpointId},'us-profile-cv',false,${checkpointVersion});`, "22023", user("alice"));
    assert.equal(JSON.stringify(progress("us-profile-cv")), before);
    assert.equal(scalar(db, `select version from public.plans where id = ${checkpointId};`, user("alice")), String(checkpointVersion));
    const linked = advance("us-english", "evidence", { title: "Score report" });
    assert.equal(linked.status, "complete");
    assert.equal(linked.done, true);
    assert.equal(linked.completed_at, english.completed_at);
    assert.equal((linked.history as Array<{ status: string }>).at(-1)?.status, "evidence_submitted");
    record(db, `select public.set_step(${checkpointId},'us-english',false,${checkpointVersion});`, user("alice"));
    checkpointVersion += 1;
    assert.equal(progress("us-english").status, "not_started");
    const reopened = advance("us-profile-cv", "skip", null, "Prerequisite no longer relevant");
    assert.equal(reopened.done, false);
    assert.equal(reopened.completed_at, null);
    db.reject(save("us-english", "complete"), "22023", user("alice"));
  });
  await db.test("legacy boolean progress and historical imports never fabricate timestamps for old records", () => {
    const imported = record(db, "select public.import_legacy_plan('US','us-spring-2027','testing',array['us-profile-cv','us-english'],'reviewed-checkpoint-legacy');", user("alice"));
    assert.equal(imported.version, 1);
    for (const milestone of ["us-profile-cv", "us-english"]) {
      const row = record(db, `select to_jsonb(s) from public.step_progress s where plan_id = ${quote(String(imported.id))} and milestone_id = ${quote(milestone)};`, user("alice"));
      assert.equal(row.status, "complete");
      assert.equal(row.done, true);
      assert.equal(row.started_at, null);
      assert.equal(row.completed_at, null);
      assert.deepEqual(row.history, []);
    }
    const legacy = record(db, `select public.set_step(${checkpointId},'us-profile-cv',true,${checkpointVersion});`, user("alice"));
    checkpointVersion += 1;
    assert.equal(legacy.version, checkpointVersion);
    const row = progress("us-profile-cv");
    assert.equal(row.status, "complete");
    assert.equal(row.skipped_reason, null);
    assert.equal(typeof row.completed_at, "string");
  });
  await db.test("legacy import rejects incomplete dependency closure without creating its destination", () => {
    const intake = "us-spring-2028";
    const other = plan(db, "forged", intake);
    assert.equal(other.version, 0);
    db.reject(`select public.import_legacy_plan('US','us-fall-2028','exploring',array['us-english'],'unclosed-import-01');`, "22023", user("forged"));
    assert.equal(scalar(db, "select count(*) from public.plans where intake_id = 'us-fall-2028';", user("forged")), "0");
    db.reject(`select public.import_legacy_plan('US',${quote(intake)},'testing',array['us-sop'],'unclosed-import-02');`, "22023", user("forged"));
    assert.equal(scalar(db, `select version from public.plans where id = ${quote(String(other.id))};`, user("forged")), "0");
    assert.equal(scalar(db, "select count(*) from public.legacy_imports where import_key like 'unclosed-import-%';", user("forged")), "0");
    record(db, `select public.set_step(${quote(String(other.id))},'us-profile-cv',true,0);`, user("forged"));
    const withExistingDependency = record(db, `select public.import_legacy_plan('US',${quote(intake)},'exploring',array['us-english'],'closed-import-01');`, user("forged"));
    assert.equal(withExistingDependency.version, 2);
  });
  await db.test("operator writes also respect status consistency and evidence/history validation", () => {
    const where = `where plan_id = ${checkpointId} and milestone_id = 'us-profile-cv'`;
    const before = JSON.stringify(progress("us-profile-cv"));
    for (const [statement, state] of [
       [`update public.step_progress set status = 'skipped_with_reason' ${where};`, "23514"],
       [`update public.step_progress set done = false, status = 'blocked' ${where};`, "23514"],
      [`update public.step_progress set done = false ${where};`, "23514"],
      [`update public.step_progress set status = 'complete', skipped_reason = 'forged' ${where};`, "23514"],
      [`update public.step_progress set done = false, status = 'not_started' ${where};`, "23514"],
      [`update public.step_progress set evidence = ${jsonSql([{ title: "Evidence", url: "https://u:p@example.edu/" }])} ${where};`, "22023"],
      [`update public.step_progress set evidence = ${jsonSql([{ title: "Evidence", verifiedOn: "2026-02-30" }])} ${where};`, "22023"],
      [`update public.step_progress set evidence = ${jsonSql(Array(51).fill({ title: "Evidence" }))} ${where};`, "22023"],
       [`update public.step_progress set history = ${jsonSql([{ at: "yesterday", status: "complete" }])} ${where};`, "22023"],
       [`update public.step_progress set history = ${jsonSql([{ at: "2026-10-28T12:00:00Z", status: "blocked" }])} ${where};`, "22023"],
      [`update public.step_progress set history = ${jsonSql([{ at: "2026-02-30T12:00:00Z", status: "complete" }])} ${where};`, "22023"],
      [`update public.step_progress set history = ${jsonSql([{ at: "2026-10-28T12:00:00+99:99", status: "complete" }])} ${where};`, "22023"],
      [`update public.step_progress set history = ${jsonSql(Array(101).fill({ at: "2026-10-28T12:00:00Z", status: "complete" }))} ${where};`, "22023"],
    ] as const) db.reject(statement, state);
    assert.equal(JSON.stringify(progress("us-profile-cv")), before);
    // A recorded offset belongs to the event, not the current session's zone.
    assert.equal(db.sql(`begin; set time zone 'UTC';
      update public.step_progress set history = ${jsonSql([{ at: "2026-10-28T00:30:00+05:30", status: "complete" }])} ${where};
      set time zone 'America/Los_Angeles';
      update public.step_progress set evidence = ${jsonSql([{ title: "Valid evidence" }])} ${where};
      select history->0->>'at' from public.step_progress ${where}; rollback;`), "2026-10-28T00:30:00+05:30");
    assert.equal(JSON.stringify(progress("us-profile-cv")), before);
  });
  await db.test("migration backfill statement marks old done rows complete without inventing events or times", () => {
    const migration = readFileSync(resolve("supabase/migrations/202610280001_checkpoint_progress.sql"), "utf8");
    const backfill = /^update public\.step_progress set status = 'complete' where done;$/m.exec(migration)?.[0];
    assert(backfill, "Exercise the actual migration backfill statement, not a test copy.");
    const result = db.sql(`begin;
      alter table public.step_progress drop constraint step_progress_status_consistency;
      insert into public.step_progress (plan_id,milestone_id,done) values
        (${checkpointId},'us-recommendations',true), (${checkpointId},'us-sop',false);
      select status from public.step_progress where plan_id = ${checkpointId} and milestone_id = 'us-recommendations';
      ${backfill}
      select status || ',' || (started_at is null) || ',' || (completed_at is null) || ',' ||
        (history = '[]'::jsonb) || ',' || (evidence = '[]'::jsonb)
        from public.step_progress where plan_id = ${checkpointId} and milestone_id = 'us-recommendations';
      select status from public.step_progress where plan_id = ${checkpointId} and milestone_id = 'us-sop';
      rollback;`);
    assert.equal(result, "not_started\ncomplete,true,true,true,true\nnot_started");
    assert.equal(scalar(db, `select count(*) from public.step_progress where plan_id = ${checkpointId} and milestone_id in ('us-recommendations','us-sop');`, user("alice")), "0");
  });
  await db.test("history retains only the newest 100 events and evidence stops at 50", () => {
    const target = plan(db, "bob", "gb-sep-2027", "GB");
    let version = Number(target.version);
    const id = quote(String(target.id));
    let firstAt = "";
    for (let index = 0; index < 102; index += 1) {
      const result = record(db, `select public.set_checkpoint(${id},'gb-english','start',null,null,${version});`, user("bob"));
      version += 1;
      assert.equal(result.version, version);
      if (index === 0) firstAt = scalar(db, `select history->0->>'at' from public.step_progress where plan_id = ${id} and milestone_id = 'gb-english';`, user("bob"));
    }
    assert.equal(scalar(db, `select jsonb_array_length(history) from public.step_progress where plan_id = ${id} and milestone_id = 'gb-english';`, user("bob")), "100");
    assert.notEqual(scalar(db, `select history->0->>'at' from public.step_progress where plan_id = ${id} and milestone_id = 'gb-english';`, user("bob")), firstAt);
    for (let index = 0; index < 50; index += 1) {
      const result = record(db, `select public.set_checkpoint(${id},'gb-english','evidence',${jsonSql({ title: `Proof ${index}` })},null,${version});`, user("bob"));
      version += 1;
      assert.equal(result.version, version);
    }
    assert.equal(scalar(db, `select jsonb_array_length(history) || ',' || jsonb_array_length(evidence) from public.step_progress where plan_id = ${id} and milestone_id = 'gb-english';`, user("bob")), "100,50");
    db.reject(`select public.set_checkpoint(${id},'gb-english','evidence','{"title":"Overflow"}',null,${version});`, "22023", user("bob"));
    assert.equal(scalar(db, `select version from public.plans where id = ${id};`, user("bob")), String(version));
    const reset = record(db, `select public.reset_plan(${id},${version});`, user("bob"));
    assert.equal(reset.version, version + 1);
    assert.equal(scalar(db, `select count(*) from public.step_progress where plan_id = ${id};`, user("bob")), "0");
    record(db, `select public.set_checkpoint(${id},'gb-english','start',null,null,${version + 1});`, user("bob"));
    assert.equal(scalar(db, `select jsonb_array_length(history) || ',' || jsonb_array_length(evidence)
      from public.step_progress where plan_id = ${id} and milestone_id = 'gb-english';`, user("bob")), "1,0");
  });
}
