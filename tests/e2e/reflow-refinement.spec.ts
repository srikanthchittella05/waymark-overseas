import { test, expect } from "@playwright/test";

test("the milestone action remains contained at 320px with expanded text spacing", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 812 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/today");
  await page.addStyleTag({ content: "* { line-height: 1.5 !important; letter-spacing: .12em !important; word-spacing: .16em !important; } p { margin-bottom: 2em !important; }" });
  // A wrapped inline/SR-only boundary contributes whitespace to the accessible name.
  const action = page.getByRole("button", { name: /Mark this milestone done\s*:/ });
  await expect(action).toBeVisible();
  // Today replaces its server snapshot with the live workspace after hydration.
  // Measure the enabled live control, not a snapshot node being detached.
  await expect(action).toBeEnabled();
  await page.evaluate(() => document.fonts.ready);
  await expect(async () => {
    const bounds = await action.evaluate((element) => {
      const action = element.getBoundingClientRect();
      const card = element.closest(".today-focus")!.getBoundingClientRect();
      return { connected: element.isConnected, right: action.right, cardRight: card.right, height: action.height, scrollWidth: element.scrollWidth, clientWidth: element.clientWidth };
    });
    expect(bounds.connected).toBe(true);
    expect(bounds.cardRight).toBeGreaterThan(0);
    expect(bounds.right).toBeLessThanOrEqual(bounds.cardRight - 8);
    expect(bounds.height).toBeGreaterThanOrEqual(44);
    expect(bounds.scrollWidth - bounds.clientWidth).toBeLessThanOrEqual(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  }).toPass({ timeout: 15000 });
});
