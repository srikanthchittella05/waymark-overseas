import { test, expect } from "@playwright/test";
import type { AxeResults } from "axe-core";

const routes = ["/", "/today", "/steps", "/route", "/path", "/login", "/signup", "/forgot-password", "/reset-password", "/account", "/admin"];

for (const route of routes) {
  test(`${route} has accessible document structure without overflow`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => { if (!/_rsc=.*access control checks/i.test(error.message)) errors.push(error.message); });
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("main")).toHaveCount(1);
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
    expect(errors).toEqual([]);
  });
}

test("unconfigured account endpoints deny cloud writes and keep private responses uncached", async ({ request }) => {
  const workspace = await request.get("/api/workspace");
  expect(workspace.status()).toBe(200);
  expect(workspace.headers()["cache-control"]).toContain("no-store");
  const data = await workspace.json();
  expect(data.configured).toBe(false);
  expect(data.user).toBeNull();
  for (const endpoint of ["target", "reset", "import"]) {
    const result = await request.post(`/api/workspace/${endpoint}`, { data: {} });
    expect(result.status()).toBe(503);
    expect((await result.json()).error.code).toBe("unconfigured");
  }
  expect((await request.put("/api/workspace/progress", { data: {} })).status()).toBe(503);
  expect((await request.get("/api/guides/not-a-step")).status()).toBe(404);
});

test("guest checklist changes are temporary and legacy data is not silently imported", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("waymark.profile.v1", JSON.stringify({ stage: "visa", countryCode: "US", intakeId: "us-fall-2027" }));
    localStorage.setItem("waymark.done.v1", JSON.stringify({ "us-profile-cv": true }));
  });
  await page.goto("/steps");
  const first = page.locator("input.steps-box").first();
  await expect(first).toBeEnabled();
  await expect(first).not.toBeChecked();
  await first.check();
  await expect(first).toBeChecked();
  await expect(page.getByText(/Preview only · changes are temporary/)).toBeVisible();
  await page.reload();
  await expect(first).toBeEnabled();
  await expect(first).not.toBeChecked();
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem("waymark.done.v1") || "{}"))).toEqual({ "us-profile-cv": true });
});

test("guests can change the preview without a fake saved confirmation", async ({ page }) => {
  await page.goto("/path");
  await expect(page.getByText(/Checking plan save status/)).toHaveCount(0);
  await page.locator('input[name="country"][value="GB"]').check();
  await page.getByRole("button", { name: "Preview this route", exact: true }).click();
  await expect(page.getByRole("status").filter({ hasText: /Preview updated:/ })).toBeVisible();
  await expect(page.getByRole("status").filter({ hasText: /Preview updated:/ })).toContainText("Sign in to save this route");
  await page.getByRole("link", { name: "See preview plan", exact: true }).click();
  await expect(page.locator(".today-context")).toContainText("United Kingdom");
});

test("published guide boundary opens useful content and Escape closes it", async ({ page }) => {
  await page.goto("/steps");
  await page.locator("[data-guide-link]").first().click();
  const panel = page.locator("[data-guide-panel]");
  await expect(panel).toBeVisible();
  await expect(panel.locator("[data-guide-section]")).not.toHaveCount(0);
  await expect(panel.locator(".guide-resource").first()).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(panel).toHaveCount(0);
});

test("auth and admin setup screens pass automated WCAG checks", async ({ page }) => {
  const axe = require.resolve("axe-core/axe.min.js");
  for (const route of ["/login", "/signup", "/admin", "/account"]) {
    await page.goto(route);
    await page.addScriptTag({ path: axe });
    const results = await page.evaluate(async () => {
      const axeModule = (window as unknown as { axe: { run: (context: Document, options: object) => Promise<AxeResults> } }).axe;
      return axeModule.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"] } });
    });
    expect(results.violations.map((item) => ({ id: item.id, targets: item.nodes.map((node) => node.target) })), route).toEqual([]);
  }
});

test("landing retains its infinity artwork and refresh entrance", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".sculpture-fallback")).toHaveAttribute("src", /journey-infinity\.webp/);
  await page.reload({ waitUntil: "domcontentloaded" });
  const arrival = await page.locator("html").getAttribute("data-waymark-arrival");
  expect(["pending", "running"]).toContain(arrival);
  await expect(page.locator(".arrival-intro")).not.toBeVisible({ timeout: 12000 });
});
