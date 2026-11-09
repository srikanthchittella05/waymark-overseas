import assert from "node:assert/strict";

export type Role = "anon" | "authenticated";
export type Claims = Record<string, unknown>;
export type Query = { role?: Role; claims?: Claims };

export interface Database {
  sql(statement: string, options?: Query): string;
  sqlAsync(statement: string, options?: Query): Promise<string>;
  reject(statement: string, sqlstate: string, options?: Query): void;
  test(name: string, run: () => void | Promise<void>): Promise<void>;
  seed: string;
}

export class DatabaseError extends Error {
  readonly sqlstate: string | undefined;
  constructor(readonly stderr: string) {
    super(stderr.trim());
    this.name = "DatabaseError";
    this.sqlstate = /ERROR:\s+([0-9A-Z]{5}):/.exec(stderr)?.[1];
  }
}

export function quote(value: string): string {
  assert(!value.includes("\0"));
  return `'${value.replaceAll("'", "''")}'`;
}

export const ids = {
  alice: "10000000-0000-4000-8000-000000000001",
  bob: "10000000-0000-4000-8000-000000000002",
  admin: "10000000-0000-4000-8000-000000000003",
  admin2: "10000000-0000-4000-8000-000000000004",
  unverified: "10000000-0000-4000-8000-000000000005",
  suspension: "10000000-0000-4000-8000-000000000006",
  forged: "10000000-0000-4000-8000-000000000007",
  revoked: "10000000-0000-4000-8000-000000000008",
  noPlan: "10000000-0000-4000-8000-000000000009",
  missing: "10000000-0000-4000-8000-000000000099",
} as const;
export type Person = Exclude<keyof typeof ids, "missing">;

export function sessionId(person: Person): string {
  return ids[person].replace(/^1/, "2");
}

export function claims(person: Person, aal: "aal1" | "aal2" = "aal1"): Claims {
  return { sub: ids[person], role: "authenticated", session_id: sessionId(person), aal,
    exp: Math.floor(Date.now() / 1000) + 3600, iat: Math.floor(Date.now() / 1000) };
}

export function user(person: Person, aal: "aal1" | "aal2" = "aal1"): Query {
  return { role: "authenticated", claims: claims(person, aal) };
}

export const anon: Query = { role: "anon", claims: { role: "anon" } };
export const admin = user("admin", "aal2");
export const admin2 = user("admin2", "aal2");

export function scalar(db: Database, statement: string, options?: Query): string {
  return db.sql(statement, options).trim();
}

export function record(db: Database, statement: string, options?: Query): Record<string, unknown> {
  const value: unknown = JSON.parse(scalar(db, statement, options));
  assert(value !== null && typeof value === "object" && !Array.isArray(value));
  return value as Record<string, unknown>;
}

export function plan(db: Database, person: Person, intake = "us-fall-2027", country = "US", stage = "exploring") {
  return record(db, `select public.select_plan(${quote(country)}, ${quote(intake)}, ${quote(stage)});`, user(person));
}

export function jsonSql(value: unknown): string {
  return `${quote(JSON.stringify(value))}::jsonb`;
}

export const deadline = {
  offsetDays: 240, hardDeadline: false, source: "https://www.example.edu/admissions",
  confidence: "typical", verifiedOn: "2026-10-20",
};

export function saveSql(kind: string, milestone: string, intake: string | null, payload: unknown, expected: string | null = null): string {
  return `select public.admin_save_revision(${quote(kind)}, ${quote(milestone)}, ${intake === null ? "null" : quote(intake)}, ${jsonSql(payload)}, 'Reviewed source update', ${expected === null ? "null" : `${quote(expected)}::uuid`});`;
}

export function latest(db: Database, kind: string, milestone: string, intake: string | null): string | null {
  return scalar(db, `select id from public.content_revisions where kind = ${quote(kind)} and milestone_id = ${quote(milestone)} and intake_id is not distinct from ${intake === null ? "null" : quote(intake)} order by sequence desc limit 1;`, admin) || null;
}

export function seedAccounts(db: Database): void {
  for (const person of Object.keys(ids).filter((name) => name !== "missing") as Person[]) {
    db.sql(`insert into auth.users (id, email, email_confirmed_at, raw_user_meta_data) values
      (${quote(ids[person])}, ${quote(`${person}@waymark.example`)}, ${person === "unverified" ? "null" : "now()"},
      '{"full_name":"Database test account","role":"admin","is_admin":true,"status":"active"}');
      insert into auth.sessions (id, user_id, created_at, updated_at)
      values (${quote(sessionId(person))}, ${quote(ids[person])}, now() - interval '1 hour', now());`);
  }
  db.sql(`insert into public.admin_members (user_id) values (${quote(ids.admin)}), (${quote(ids.admin2)});`);
}
