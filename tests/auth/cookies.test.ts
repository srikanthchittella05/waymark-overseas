import { test } from "node:test";
import assert from "node:assert/strict";
import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { AUTH_COOKIE, createCookieBridge, isOwnedAuthCookie, sessionCookieOptions } from "../../src/lib/supabase/cookies";

test("cookies are HttpOnly, host-only, same-site and secure on HTTPS", () => {
  const bridge = createCookieBridge([], "https://waymark.example");
  bridge.setAll([{ name: AUTH_COOKIE, value: "test-session", options: { httpOnly: false, domain: ".example", path: "/wrong", secure: false, sameSite: "none" } }], {});
  const response = bridge.apply(NextResponse.next());
  const cookie = response.cookies.get(AUTH_COOKIE);
  assert.equal(cookie?.httpOnly, true);
  assert.equal(cookie?.secure, true);
  assert.equal(cookie?.sameSite, "lax");
  assert.equal(cookie?.path, "/");
  assert.equal(cookie?.domain, undefined);
  assert.equal(sessionCookieOptions("http://localhost:3200").secure, false);
});

test("multiple setAll calls retain chunks and second-argument no-store headers", () => {
  const bridge = createCookieBridge([{ name: `${AUTH_COOKIE}.2`, value: "old" }], "https://waymark.example");
  bridge.setAll([{ name: `${AUTH_COOKIE}.0`, value: "one", options: {} }], { "Cache-Control": "private, no-store", Expires: "0", Pragma: "no-cache" });
  bridge.setAll([{ name: `${AUTH_COOKIE}.1`, value: "two", options: {} }, { name: `${AUTH_COOKIE}.2`, value: "", options: { maxAge: 0 } }], {});
  assert.deepEqual(bridge.getAll(), [{ name: `${AUTH_COOKIE}.0`, value: "one" }, { name: `${AUTH_COOKIE}.1`, value: "two" }]);
  const response = bridge.apply(NextResponse.redirect("https://waymark.example/today"));
  assert.equal(response.cookies.get(`${AUTH_COOKIE}.0`)?.value, "one");
  assert.equal(response.cookies.get(`${AUTH_COOKIE}.1`)?.value, "two");
  assert.equal(response.cookies.get(`${AUTH_COOKIE}.2`)?.maxAge, 0);
  assert.equal(response.headers.get("cache-control"), "private, no-store");
  assert.equal(response.headers.get("expires"), "0");
  assert.equal(response.headers.get("pragma"), "no-cache");
});

test("logout clears all owned chunks/PKCE flows but leaves planner cookies alone", () => {
  const names = [AUTH_COOKIE, `${AUTH_COOKIE}.0`, `${AUTH_COOKIE}-flow-12345678-code-verifier`, "waymark-recovery", "planner-preference"];
  const bridge = createCookieBridge(names.map((name) => ({ name, value: "test" })), "https://waymark.example");
  bridge.clearAuth();
  assert.deepEqual(bridge.getAll(), [{ name: "planner-preference", value: "test" }]);
  const response = bridge.apply(NextResponse.next());
  names.filter(isOwnedAuthCookie).forEach((name) => assert.equal(response.cookies.get(name)?.maxAge, 0));
  assert.equal(response.cookies.get("planner-preference"), undefined);
  assert.equal(isOwnedAuthCookie("waymark-authentication"), false);
});

test("writable cookie-adapter failures propagate; no false success", () => {
  const bridge = createCookieBridge([], "https://waymark.example");
  bridge.setAll([{ name: AUTH_COOKIE, value: "test", options: {} }], {});
  assert.throws(() => bridge.apply({ cookies: { set() { throw new Error("write failed"); } }, headers: new Headers() }), /write failed/);
});

test("real installed SSR OAuth initiation writes PKCE cookies without network", async () => {
  const bridge = createCookieBridge([], "http://localhost:3200");
  let networkCalls = 0;
  const client = createServerClient("http://127.0.0.1:54321", "sb_publishable_nonworking_test_fixture_only", {
    cookieOptions: { name: AUTH_COOKIE, ...sessionCookieOptions("http://localhost:3200") }, cookies: bridge,
    global: { fetch: async () => { networkCalls += 1; throw new Error("network forbidden in this test"); } },
  });
  const { data, error } = await client.auth.signInWithOAuth({ provider: "google", options: { redirectTo: "http://localhost:3200/auth/callback", skipBrowserRedirect: true } });
  assert.equal(error, null);
  assert.equal(networkCalls, 0);
  const authorize = new URL(data.url!);
  assert.equal(authorize.origin, "http://127.0.0.1:54321");
  // Appending the flow id is opt-in in 2.118.0, not the default SSR flow.
  assert.equal(new URL(authorize.searchParams.get("redirect_to")!).searchParams.get("sb_flow_id"), null);
  assert.ok(authorize.searchParams.get("code_challenge"));
  assert.equal(authorize.searchParams.get("code_challenge_method"), "s256");
  assert.ok(bridge.getAll().some(({ name }) => name.startsWith(`${AUTH_COOKIE}-flow-`) && name.endsWith("-code-verifier")));
  const response = bridge.apply(NextResponse.next());
  assert.ok(response.cookies.getAll().every((cookie) => cookie.httpOnly && cookie.path === "/"));
  assert.ok(response.headers.get("cache-control")?.includes("no-store"));
});

test("installed SDK can round-trip an explicitly enabled PKCE flow id", async () => {
  const bridge = createCookieBridge([], "http://localhost:3200");
  const client = createServerClient("http://127.0.0.1:54321", "sb_publishable_nonworking_test_fixture_only", {
    cookieOptions: { name: AUTH_COOKIE, ...sessionCookieOptions("http://localhost:3200") }, cookies: bridge,
    auth: { experimental: { appendPkceFlowIdToRedirects: true } },
    global: { fetch: async () => { throw new Error("network forbidden in this test"); } },
  });
  const { data, error } = await client.auth.signInWithOAuth({ provider: "google", options: { redirectTo: "http://localhost:3200/auth/callback", skipBrowserRedirect: true } });
  assert.equal(error, null);
  const flowId = new URL(new URL(data.url!).searchParams.get("redirect_to")!).searchParams.get("sb_flow_id");
  assert.match(flowId!, /^[A-Za-z0-9_-]{8,64}$/);
  assert.ok(bridge.getAll().some(({ name }) => name === `${AUTH_COOKIE}-flow-${flowId}-code-verifier`));
});
