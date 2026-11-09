import { test, expect } from "@playwright/test";

// This isolates planner UI behavior at its HTTP boundary. It is not a real
// Supabase login or hosted authorization test; database policies have a separate suite.
test("mocked account save failures never show a completed checkbox", async ({ page }) => {
  const user = { id: "11111111-1111-4111-8111-111111111111", email: "student@example.test", displayName: "Student", isAdmin: false, aal: "aal1" };
  const workspace = { configured: true, user, profile: { countryCode: "US", intakeId: "us-fall-2027", stage: "exploring" },
    done: {}, planId: "22222222-2222-4222-8222-222222222222", planVersion: 0, hasSavedTarget: true, deadlineRevisions: [] };
  await page.route("**/api/workspace", (route) => route.fulfill({ json: workspace }));
  await page.route("**/api/workspace/progress", (route) => route.fulfill({ status: 409, json: { error: { code: "conflict", message: "This plan changed elsewhere. Reload before trying again." } } }));
  await page.goto("/steps");
  const first = page.locator("input.steps-box").first();
  await expect(first).toBeEnabled();
  await first.click();
  await expect(page.getByRole("alert").filter({ hasText: "This plan changed elsewhere" })).toBeVisible();
  await expect(first).not.toBeChecked();
  await expect(page.locator(".steps-row[data-done='true']")).toHaveCount(0);
});

test("mocked account-switch denial clears the previous account's private plan", async ({ page }) => {
  const workspace = { configured: true, user: { id: "11111111-1111-4111-8111-111111111111", email: "student@example.test", displayName: "Student", isAdmin: false, aal: "aal1" },
    profile: { countryCode: "US", intakeId: "us-fall-2027", stage: "exploring" }, done: { "us-profile-cv": true },
    planId: "22222222-2222-4222-8222-222222222222", planVersion: 1, hasSavedTarget: true, deadlineRevisions: [] };
  await page.route("**/api/workspace", (route) => route.fulfill({ json: workspace }));
  await page.route("**/api/workspace/progress", (route) => route.fulfill({ status: 409, json: { error: { code: "account_changed", message: "Your signed-in account changed. Reload before saving." } } }));
  await page.goto("/steps");
  await expect(page.locator(".steps-row[data-done='true']")).toHaveCount(1);
  // The second row is gated by another prerequisite; shortlist is actionable
  // after the fixture's profile milestone has been completed.
  const actionable = page.locator("#step-us-shortlist");
  await expect(actionable).toBeEnabled();
  await actionable.click();
  await expect(page.getByRole("alert").filter({ hasText: "Your signed-in account changed" })).toBeVisible();
  await expect(page.locator(".steps-row[data-done='true']")).toHaveCount(0);
  await expect(page.locator("input.steps-box").first()).toBeDisabled();
});
