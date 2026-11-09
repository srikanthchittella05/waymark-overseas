import { test } from "node:test";
import assert from "node:assert/strict";
import { getSupabaseConfig } from "../../src/lib/supabase/config";

// Deliberately non-working test fixture; no request uses this value.
const base = {
  SUPABASE_URL: "https://example.supabase.co", SUPABASE_PUBLISHABLE_KEY: "sb_publishable_nonworking_test_fixture_only",
  WAYMARK_SITE_URL: "https://waymark.example", NODE_ENV: "production",
};

test("missing configuration stays explicitly unconfigured", () => {
  assert.equal(getSupabaseConfig({}), null);
  for (const key of ["SUPABASE_URL", "SUPABASE_PUBLISHABLE_KEY", "WAYMARK_SITE_URL"]) assert.equal(getSupabaseConfig({ ...base, [key]: undefined }), null);
});

test("publishable config normalizes origins and Google is opt-in", () => {
  const value = getSupabaseConfig({ ...base, SUPABASE_URL: `${base.SUPABASE_URL}/`, WAYMARK_SITE_URL: `${base.WAYMARK_SITE_URL}/` });
  assert.deepEqual(value, { url: base.SUPABASE_URL, key: base.SUPABASE_PUBLISHABLE_KEY, siteUrl: base.WAYMARK_SITE_URL, googleEnabled: false, appleEnabled: false });
  assert.equal(getSupabaseConfig({ ...base, WAYMARK_GOOGLE_AUTH_ENABLED: "true" })?.googleEnabled, true);
  assert.equal(getSupabaseConfig({ ...base, WAYMARK_APPLE_AUTH_ENABLED: "true" })?.appleEnabled, true);
  assert.equal(getSupabaseConfig({ ...base, WAYMARK_GOOGLE_AUTH_ENABLED: "yes" }), null);
  assert.equal(getSupabaseConfig({ ...base, WAYMARK_APPLE_AUTH_ENABLED: "yes" }), null);
});

test("secret keys and malformed or credential-bearing URLs are rejected", () => {
  for (const key of ["sb_secret_nonworking_test_fixture_only", "eyJ.not-a-publishable-key", "", " sb_publishable_nonworking_test_fixture_only"]) {
    assert.equal(getSupabaseConfig({ ...base, SUPABASE_PUBLISHABLE_KEY: key }), null);
  }
  for (const url of ["http://waymark.example", "https://user:password@waymark.example", "https://waymark.example/path", "https://waymark.example/?token=secret", "https://waymark.example/#fragment", "not a url"]) {
    assert.equal(getSupabaseConfig({ ...base, WAYMARK_SITE_URL: url }), null);
  }
});

test("HTTP local development is loopback-only and forbidden in production", () => {
  const local = { ...base, SUPABASE_URL: "http://127.0.0.1:54321", WAYMARK_SITE_URL: "http://localhost:3200", NODE_ENV: "test" };
  assert.ok(getSupabaseConfig(local));
  assert.equal(getSupabaseConfig({ ...local, NODE_ENV: "production" }), null);
  assert.equal(getSupabaseConfig({ ...local, WAYMARK_SITE_URL: "http://192.168.1.2:3200" }), null);
});
