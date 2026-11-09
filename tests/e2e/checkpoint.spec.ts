import { test, expect } from "@playwright/test";

test("guest can track a checkpoint, see a revised pace, and cannot bypass prerequisites", async ({ page }) => {
  await page.goto("/steps");
  const profile = page.locator(".steps-row").filter({ has: page.locator("#step-us-profile-cv") });
  const shortlist = page.locator("#step-us-shortlist");
  await expect(shortlist).toBeDisabled();
  await expect(profile.getByText("Checkpoint · Not started · plan and history")).toBeVisible();
  await profile.getByText("Checkpoint · Not started · plan and history").click();
  await expect(profile.getByText("Suggested pace")).toBeVisible();
  await profile.getByRole("button", { name: "Start checkpoint" }).click();
  await expect(profile.getByText("Checkpoint · In progress · plan and history")).toBeVisible();
  await profile.getByLabel("Evidence title").fill("Transcript requested");
  await profile.getByRole("button", { name: "Add evidence" }).click();
  await expect(profile.getByText("Transcript requested").first()).toBeVisible();
  await profile.getByLabel(/Reason to skip/).fill("Programme exempt");
  await profile.getByRole("button", { name: "Skip with reason" }).click();
  await expect(profile.getByText("Checkpoint · Skipped with reason · plan and history")).toBeVisible();
  await expect(shortlist).toBeDisabled();
  await profile.locator("#step-us-profile-cv").check();
  await expect(shortlist).toBeEnabled();
  await expect(profile.getByText("Checkpoint · Complete · plan and history")).toBeVisible();
  await expect(profile.getByText("Progress history")).toBeVisible();
  await page.getByRole("link", { name: /What should I do next/ }).click();
  await expect(page.locator(".today-focus").getByText(/Checkpoint · .* · plan and history/)).toBeVisible();
  await page.getByRole("link", { name: "See the route" }).click();
  await expect(page.locator(".route-detail").getByText(/Checkpoint · .* · plan and history/)).toBeVisible();
});

test("failed account checkpoint save keeps the prior status and reports an error", async ({ page }) => {
  const workspace = { configured: true,
    user: { id: "11111111-1111-4111-8111-111111111111", email: "student@example.test", displayName: "Student", isAdmin: false, aal: "aal1" },
    profile: { countryCode: "US", intakeId: "us-fall-2027", stage: "exploring" }, done: {}, checkpoints: {},
    planId: "22222222-2222-4222-8222-222222222222", planVersion: 0, hasSavedTarget: true, deadlineRevisions: [] };
  await page.route("**/api/workspace", (route) => route.fulfill({ json: workspace }));
  await page.route("**/api/workspace/checkpoint", (route) => route.fulfill({ status: 409,
    json: { error: { code: "conflict", message: "This plan changed elsewhere. Reload before trying again." } } }));
  await page.goto("/steps");
  const profile = page.locator(".steps-row").filter({ has: page.locator("#step-us-profile-cv") });
  await profile.getByText("Checkpoint · Not started · plan and history").click();
  await profile.getByRole("button", { name: "Start checkpoint" }).click();
  await expect(page.getByRole("alert").filter({ hasText: "This plan changed elsewhere" })).toBeVisible();
  await expect(profile.getByText("Checkpoint · Not started · plan and history")).toBeVisible();
  await expect(profile.getByText("This change could not be confirmed.", { exact: false })).toBeVisible();
});

test("skipping a completed item in the Done filter restores keyboard focus", async ({ page }) => {
  await page.goto("/steps");
  await page.locator("#step-us-profile-cv").check();
  const doneFilter = page.locator('.steps-filter[data-kind="done"]');
  await doneFilter.click();
  const profile = page.locator(".steps-row").filter({ has: page.locator("#step-us-profile-cv") });
  await profile.getByText("Checkpoint · Complete · plan and history").click();
  await profile.getByLabel(/Reason to skip/).fill("Programme exempt");
  await profile.getByRole("button", { name: "Skip with reason" }).click();
  await expect(profile).toHaveCount(0);
  await expect(doneFilter).toBeFocused();
  await expect(page.getByRole("status").filter({ hasText: "Skipped Build the core academic record" })).toBeVisible();
});
