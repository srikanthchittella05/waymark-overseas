import { test } from "node:test";
import assert from "node:assert/strict";
import { assertAdmin, assertUser, resolveViewer, type SessionPort, type Viewer } from "../../src/lib/auth/session-core";
import { AuthError, providerActionError } from "../../src/lib/auth/errors";

const id = "11111111-1111-4111-8111-111111111111";
const access = { user_id: id, email: "student@example.com", display_name: "Student", status: "active", is_admin: false, aal: "aal1" };
const port = (overrides: Partial<SessionPort> = {}): SessionPort => ({
  getUser: async () => ({ data: { user: { id, email_confirmed_at: "2026-10-20T00:00:00Z" } }, error: null }),
  getAccess: async () => ({ data: access, error: null }),
  ...overrides,
});
const denies = (status: number, code: string) => (error: unknown) => error instanceof AuthError && error.status === status && error.code === code;

test("fresh identity is checked before snake-case DB access is mapped to Viewer", async () => {
  const calls: string[] = [];
  const value = await resolveViewer(port({
    getUser: async () => { calls.push("provider"); return { data: { user: { id, email_confirmed_at: "2026-10-20" } }, error: null }; },
    getAccess: async () => { calls.push("database"); return { data: access, error: null }; },
  }));
  assert.deepEqual(calls, ["provider", "database"]);
  assert.deepEqual(value, { id, email: access.email, displayName: "Student", isAdmin: false, aal: "aal1" });
});

test("missing/expired/invalid sessions are guests without a DB lookup", async () => {
  for (const error of [{ name: "AuthSessionMissingError", status: 400 }, { name: "AuthInvalidJwtError", status: 400 }, { code: "jwt_expired", status: 403 }, { status: 401 }]) {
    const value = await resolveViewer(port({
      getUser: async () => ({ data: { user: null }, error }),
      getAccess: async () => { throw new Error("must not read DB"); },
    }));
    assert.equal(value, null);
  }
});

for (const code of ["session_not_found", "refresh_token_not_found", "refresh_token_already_used"]) {
  test(`Auth revocation fails closed: ${code}`, async () => {
    await assert.rejects(resolveViewer(port({ getUser: async () => ({ data: { user: null }, error: { code, status: 403 } }) })), denies(403, "revoked"));
  });
}

test("provider bans and unverified emails cannot access accounts", async () => {
  await assert.rejects(resolveViewer(port({ getUser: async () => ({ data: { user: null }, error: { code: "user_banned", status: 403 } }) })), denies(403, "suspended"));
  await assert.rejects(resolveViewer(port({ getUser: async () => ({ data: { user: { id } }, error: null }) })), denies(403, "email_unverified"));
});

test("provider and database outages are 503, never guest or stale success", async () => {
  for (const input of [
    port({ getUser: async () => { throw new Error("network including sensitive internals"); } }),
    port({ getUser: async () => ({ data: { user: null }, error: { status: 503 } }) }),
    port({ getAccess: async () => ({ data: null, error: { code: "PGRST205" } }) }),
    port({ getAccess: async () => { throw new Error("database offline"); } }),
  ]) await assert.rejects(resolveViewer(input), denies(503, "unavailable"));
});

test("suspension, null access and revoked DB envelopes deny existing JWT holders", async () => {
  await assert.rejects(resolveViewer(port({ getAccess: async () => ({ data: { ...access, status: "suspended" }, error: null }) })), denies(403, "suspended"));
  for (const data of [null, { ...access, status: "revoked", is_admin: true, aal: "aal2" }]) {
    await assert.rejects(resolveViewer(port({ getAccess: async () => ({ data, error: null }) })), denies(403, "revoked"));
  }
});

test("mismatched identity and malformed access data fail closed", async () => {
  for (const data of [{ ...access, user_id: "22222222-2222-4222-8222-222222222222" }, { ...access, is_admin: "true" }, { ...access, aal: "aal3" }, {}, [access]]) {
    await assert.rejects(resolveViewer(port({ getAccess: async () => ({ data, error: null }) })), denies(503, "unavailable"));
  }
});

test("admin guard denies guests, regular users and AAL1, and rechecks each invocation", () => {
  const regular: Viewer = { id, email: access.email, displayName: "Student", isAdmin: false, aal: "aal2" };
  assert.throws(() => assertUser(null), denies(401, "unauthorized"));
  assert.throws(() => assertAdmin(regular), denies(403, "forbidden"));
  assert.throws(() => assertAdmin({ ...regular, isAdmin: true, aal: "aal1" }), denies(403, "mfa_required"));
  assert.doesNotThrow(() => assertAdmin({ ...regular, isAdmin: true }));
});

test("provider error text and account-discovery details are never shown", () => {
  for (const code of ["invalid_credentials", "email_not_confirmed", "user_not_found"]) {
    const error = providerActionError({ status: 400, code, message: "private diagnostic" }, "invalid_credentials");
    assert.equal(error.code, "invalid_credentials");
    assert.ok(!error.message.includes("private diagnostic"));
  }
  assert.equal(providerActionError({ status: 429 }).status, 429);
  assert.equal(providerActionError({ code: "over_email_send_rate_limit", status: 400 }).code, "rate_limited");
  assert.equal(providerActionError(new Error("network")).status, 503);
});
