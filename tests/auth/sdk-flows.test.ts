import { test } from "node:test";
import assert from "node:assert/strict";
import { createServerClient } from "@supabase/ssr";
import { AUTH_COOKIE, createCookieBridge, sessionCookieOptions } from "../../src/lib/supabase/cookies";
import { isRecoveryExchange } from "../../src/lib/auth/validation";

// These tests run the real installed SDK with an explicitly mocked Auth HTTP
// transport. The unsigned token fixture is not authentication/deployment proof.
function sdkFixture() {
  const id = "11111111-1111-4111-8111-111111111111";
  const token = [
    Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url"),
    Buffer.from(JSON.stringify({ sub: id, role: "authenticated", aal: "aal1", session_id: id, exp: Math.floor(Date.now() / 1000) + 3600 })).toString("base64url"),
    Buffer.from("unsigned-test-fixture-not-valid").toString("base64url"),
  ].join(".");
  const user = { id, email: "student@example.com", email_confirmed_at: "2026-10-20T00:00:00Z", aud: "authenticated", role: "authenticated", app_metadata: {}, user_metadata: {} };
  const session = { access_token: token, refresh_token: "nonworking-test-refresh-fixture", expires_in: 3600, token_type: "bearer", user };
  const requests: string[] = [];
  const bridge = createCookieBridge([], "http://localhost:3200");
  const client = createServerClient("http://127.0.0.1:54321", "sb_publishable_nonworking_test_fixture_only", {
    cookieOptions: { name: AUTH_COOKIE, ...sessionCookieOptions("http://localhost:3200") }, cookies: bridge,
    global: { fetch: async (input) => {
      const url = new URL(String(input));
      requests.push(url.pathname);
      if (url.pathname.endsWith("/recover")) return Response.json({});
      if (url.pathname.endsWith("/token") || url.pathname.endsWith("/verify")) return Response.json(session);
      throw new Error(`Unexpected mocked Auth endpoint: ${url.pathname}`);
    } },
  });
  return { client, requests, bridge };
}

test("SDK recovery exchange reports recovery and consumes the PKCE verifier", async () => {
  const { client, requests, bridge } = sdkFixture();
  const started = await client.auth.resetPasswordForEmail("student@example.com", { redirectTo: "http://localhost:3200/auth/recovery" });
  assert.equal(started.error, null);
  assert.ok(bridge.getAll().some(({ name }) => name === `${AUTH_COOKIE}-code-verifier`));
  const exchanged = await client.auth.exchangeCodeForSession("nonworking-test-recovery-code");
  assert.equal(exchanged.error, null);
  assert.equal(isRecoveryExchange(exchanged.data), true);
  assert.ok(bridge.getAll().some(({ name }) => name === AUTH_COOKIE || name.startsWith(`${AUTH_COOKIE}.`)));
  assert.equal(bridge.getAll().some(({ name }) => name === `${AUTH_COOKIE}-code-verifier`), false);
  const replayed = await client.auth.exchangeCodeForSession("nonworking-test-recovery-code");
  assert.ok(replayed.error);
  assert.deepEqual(requests, ["/auth/v1/recover", "/auth/v1/token"]);
});

test("an OAuth exchange is not accepted as password-recovery proof", async () => {
  const { client } = sdkFixture();
  await client.auth.signInWithOAuth({ provider: "google", options: { redirectTo: "http://localhost:3200/auth/callback", skipBrowserRedirect: true } });
  const exchanged = await client.auth.exchangeCodeForSession("nonworking-test-oauth-code");
  assert.equal(exchanged.error, null);
  assert.equal(isRecoveryExchange(exchanged.data), false);
});
