import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
});

test("home removes decorative filler but keeps the identity, useful controls and qualifications", async ({ page }) => {
  await page.goto("/");
  const home = page.locator(".landing");
  await expect(home.locator(".hero-rail, .art-coordinate, .art-annotation, .flight-caption")).toHaveCount(0);
  await expect(home).not.toContainText(/Every step, marked|SEVEN DESTINATIONS|MADE FOR WHAT’S NEXT|not a product mock-up/i);
  await expect(page.locator(".footer-bottom > span")).toHaveText("© 2026 Waymark.");
  await expect(home.locator(".hero-cta")).toHaveAttribute("href", "/path");
  await expect(home.getByRole("heading", { name: "Somewhere new. Starts with you.", exact: true })).toBeVisible();
  await expect(home.locator(".ps-caveat")).toContainText("not published deadlines");
  await expect(home.locator(".ps-caveat")).toContainText("Source confidence is not date certainty");
  await expect(home.locator(".journey-local")).toContainText("Guest changes are temporary and reset on reload");
  const cards = home.locator(".destination-card");
  await expect(cards).toHaveCount(7);
  await expect(cards.locator("h3")).toHaveText(["United States", "United Kingdom", "Canada", "Australia", "Germany", "France", "Singapore"]);
  await expect(cards.locator("p")).toHaveCount(0);
  for (const [index, code] of ["US", "GB", "CA", "AU", "DE", "FR", "SG"].entries()) {
    await expect(cards.nth(index)).toHaveAttribute("href", `/path?country=${code}`);
  }
  await expect(home.locator(".ps-beat")).toHaveCount(3);
  await expect(home.locator(".ps-beat-copy, .ps-stage-caption")).toHaveCount(0);
  for (const [index, title] of ["Choose a target.", "See the dates.", "Find the next step."].entries()) {
    const chapter = home.getByRole("button", { name: title, exact: true });
    await expect(chapter).toBeEnabled();
    await chapter.click();
    await expect(chapter).toHaveAttribute("aria-pressed", "true");
    await expect(home.locator(".ps-beat[aria-pressed='true']")).toHaveCount(1);
    await expect(home.locator(".ps-stage")).toHaveAttribute("data-state", ["target", "dates", "next"][index]);
    await expect(home.locator(".ps-stage [role='status']")).toHaveText(`Sample view: ${title}`);
  }
});

test("shared navigation prioritizes destinations over repeated slogans", async ({ page }) => {
  await page.goto("/path");
  await expect(page.locator(".nav-tagline")).toHaveCount(0);
  await page.getByRole("button", { name: "Open navigation", exact: true }).click();
  const menu = page.getByRole("dialog", { name: "Navigation", exact: true });
  await expect(menu).toBeVisible();
  await expect(menu).not.toContainText(/For the life you haven’t met yet|A bigger world\. A way that’s yours/);
  await expect(menu.locator(".menu-link")).toHaveCount(7);
  await expect(menu.getByRole("link", { name: "Your account", exact: true })).toHaveAttribute("href", "/account");
  await page.keyboard.press("Escape");
  await expect(menu).not.toBeVisible();
  await expect(page.getByRole("button", { name: "Open navigation", exact: true })).toBeFocused();
});

test("planner copy avoids repeated question counts and implementation jargon without hiding save or date limits", async ({ page }) => {
  await page.goto("/path?country=US&intake=us-spring-2027");
  const screen = page.locator(".path-screen");
  await expect(page.locator('input[name="country"]').first()).toBeEnabled();
  await expect(screen).not.toContainText(/Four answers|Four questions|built by the engine|Supabase/);
  await expect(screen.getByRole("heading", { level: 1 })).toContainText("Choose your target.");
  await expect(screen).toContainText("Preview only · changes are temporary and are not uploaded");
  await expect(screen).toContainText("October 2026");
  await expect(screen).toContainText("A failed save is shown as an error, never as success");
  await expect(screen).toContainText("Older browser-only progress is never imported automatically");
  // Use the real guest flow: the server clock is authoritative, and the guest
  // store deliberately ignores unsolicited target changes from HTTP refreshes.
  // This earlier intake has several overdue milestones in the current catalog.
  await page.getByRole("button", { name: "Preview this route", exact: true }).click();
  await expect(page.getByRole("status").filter({ hasText: /Preview updated:/ })).toBeVisible();
  await page.getByRole("link", { name: "See preview plan", exact: true }).click();
  await expect(page.locator(".today-context")).toContainText("Spring 2027");
  await expect(page.getByRole("button", { name: /Mark this milestone done/ })).toBeEnabled();
  await expect(page.locator(".today-clock-date")).toHaveText(/^Due (?:today · )?\d.*$/);
  await expect(page.locator(".today-blocked-foot")).not.toContainText("re-derives");
  await expect(page.locator(".today-risk-date").first()).toBeVisible();
  for (const date of await page.locator(".today-risk-date").allTextContents()) {
    expect(date).toMatch(/^Due \d/);
    expect(date).not.toContain("past");
  }
  await page.goto("/steps");
  await expect(page.locator(".steps-band-copy")).toContainText("our own planning assumption");
  await expect(page.locator(".steps-band-copy")).not.toContainText("because every row has one");
  await page.goto("/route");
  await page.locator(".route-node").last().click();
  await expect(page.locator(".rt-detail-due")).toContainText("days after the intake starts.");
  await expect(page.locator(".rt-detail-due")).not.toContainText("after your course has started");
});

test("account entry explains unavailable saving without exposing setup jargon or repeating the sales pitch", async ({ page }) => {
  for (const route of ["/login", "/signup", "/forgot-password", "/reset-password"]) {
    await page.goto(route);
    const main = page.locator("main");
    await expect(main).toContainText("The planner is available without an account.");
    await expect(main).toContainText("Browser progress is not automatically imported. You choose what to save.");
    await expect(main).toContainText("Sign-up, sign-in and cloud saving are disabled until account setup is complete.");
    await expect(main).not.toContainText(/Supabase|Your next step, saved/);
  }
  await page.goto("/account");
  await expect(page.locator("main")).toContainText("Account creation and cloud saving are not available yet. Preview changes are not uploaded.");
  await expect(page.locator("main")).not.toContainText("Supabase");
});
