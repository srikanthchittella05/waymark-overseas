import { test } from "node:test";
import assert from "node:assert/strict";
import { factorSchema, forgotPasswordSchema, formValues, isRecoveryExchange, loginSchema, recoveryProofSchema, resetPasswordSchema, signupSchema, totpSchema } from "../../src/lib/auth/validation";

const signup = { displayName: " Student ", email: " student@example.com ", password: "  a long passphrase  ", confirmPassword: "  a long passphrase  " };

test("normalize names/email but never trim passwords", () => {
  const result = signupSchema.parse(signup);
  assert.equal(result.displayName, "Student");
  assert.equal(result.email, "student@example.com");
  assert.equal(result.password, signup.password);
  assert.equal(loginSchema.parse({ email: signup.email, password: " x " }).password, " x ");
});

test("new passwords enforce length, UTF-8 byte limit and confirmation", () => {
  for (const password of ["short", "x".repeat(73), "🌳".repeat(19), "🌳".repeat(6)]) {
    assert.equal(signupSchema.safeParse({ ...signup, password, confirmPassword: password }).success, false);
  }
  assert.equal(signupSchema.safeParse({ ...signup, confirmPassword: signup.password.trim() }).success, false);
  assert.ok(signupSchema.safeParse({ ...signup, password: "🌳".repeat(18), confirmPassword: "🌳".repeat(18) }).success);
});

test("invalid email and mass-assigned roles are rejected by auth schemas", () => {
  assert.equal(forgotPasswordSchema.safeParse({ email: "not-an-email" }).success, false);
  assert.equal(signupSchema.safeParse({ ...signup, role: "admin" }).success, false);
  assert.equal(loginSchema.safeParse({ email: signup.email, password: "abc", owner_id: "someone-else" }).success, false);
});

test("MFA requires a UUID factor and exactly six digits; leading zero survives", () => {
  const value = { factorId: "11111111-1111-4111-8111-111111111111", code: "012345" };
  assert.equal(totpSchema.parse(value).code, "012345");
  for (const code of ["12345", "1234567", " 123456", "12345x"]) assert.equal(totpSchema.safeParse({ ...value, code }).success, false);
  assert.equal(factorSchema.safeParse({ factorId: "not-a-uuid" }).success, false);
});

test("reset form alone and unsigned flags never establish recovery authority", () => {
  assert.equal(recoveryProofSchema.safeParse({ verified: true }).success, false);
  assert.equal(recoveryProofSchema.safeParse({ kind: "code", value: "" }).success, false);
  assert.equal(recoveryProofSchema.safeParse({ kind: "code", value: "a".repeat(32), flowId: "../../escape" }).success, false);
  assert.ok(recoveryProofSchema.safeParse({ kind: "token_hash", value: "a".repeat(64) }).success);
  assert.equal(isRecoveryExchange({ redirectType: "recovery" }), true);
  for (const value of [{}, { redirectType: "signup" }, { session: {} }, null]) assert.equal(isRecoveryExchange(value), false);
  assert.ok(resetPasswordSchema.safeParse({ password: signup.password, confirmPassword: signup.password, code: "" }).success);
});

test("duplicate fields and file-shaped form inputs are rejected", () => {
  const form = new FormData();
  form.append("email", "student@example.com");
  form.append("email", "other@example.com");
  assert.throws(() => formValues(form, ["email"]));
  const file = new FormData();
  file.append("password", new Blob(["password"]));
  assert.throws(() => formValues(file, ["password"]));
  assert.deepEqual(formValues(new FormData(), ["code"]), { code: "" });
});
