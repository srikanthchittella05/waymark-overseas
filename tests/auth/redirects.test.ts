import { test } from "node:test";
import assert from "node:assert/strict";
import { afterLogin, loginPath, safeNext } from "../../src/lib/auth/redirects";
import { assertSameOrigin } from "../../src/lib/auth/origin";
import { AuthError } from "../../src/lib/auth/errors";

test("return destinations preserve linked planner drafts", () => {
  assert.equal(safeNext("/path?country=ca&intake=ca-fall-2027&stage=applying"), "/path?country=ca&intake=ca-fall-2027&stage=applying");
  assert.equal(safeNext("/admin/guides"), "/admin/guides");
  assert.equal(safeNext("/"), "/");
  assert.equal(loginPath("/path?country=ca&intake=ca-fall-2027"), "/login?next=%2Fpath%3Fcountry%3Dca%26intake%3Dca-fall-2027");
});

for (const value of ["https://evil.example", "//evil.example", "/\\evil.example", "/%2f%2fevil.example", "/auth/logout", "/login", "/reset-password", "/unknown", "/admin#fragment", "/path?next=https://evil.example", "/path?country=us&country=ca", "/path?country=%2F%2Fevil", "/path?password=do-not-copy", null, ["/admin"]]) {
  test(`unsafe/unknown next is denied: ${JSON.stringify(value)}`, () => assert.equal(safeNext(value), "/today"));
}

test("unrelated query strings cannot carry credentials into redirects", () => {
  assert.equal(safeNext("/today?access_token=secret&password=secret"), "/today");
});

test("only DB-known admins needing step-up are sent to security", () => {
  assert.equal(afterLogin("/admin/users", { isAdmin: true, aal: "aal1" }), "/admin/security?next=%2Fadmin%2Fusers");
  assert.equal(afterLogin("/admin/security", { isAdmin: true, aal: "aal1" }), "/admin/security?next=%2Fadmin");
  assert.equal(afterLogin("/admin/users", { isAdmin: true, aal: "aal2" }), "/admin/users");
  assert.equal(afterLogin("/path?country=us", { isAdmin: true, aal: "aal1" }), "/path?country=us");
  assert.equal(afterLogin("/today", { isAdmin: false, aal: "aal1" }), "/today");
});

test("state-changing requests require the canonical same origin", () => {
  assert.doesNotThrow(() => assertSameOrigin("https://waymark.example", "https://waymark.example"));
  for (const origin of [null, "null", "https://evil.example", "https://waymark.example.evil.example", "http://waymark.example"]) {
    assert.throws(() => assertSameOrigin(origin, "https://waymark.example"), (error) => error instanceof AuthError && error.status === 403);
  }
});
