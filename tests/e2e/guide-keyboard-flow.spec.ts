import { test, expect } from "@playwright/test";

// Uses the actual bundled guide endpoint in the unconfigured local preview.
test("Tab from a requested guide heading continues into that section", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/steps");
  await page.locator('.steps-row:has(#step-us-english) [data-guide-link="resources"]').click();
  const section = page.locator('[data-guide-section="resources"]');
  await expect(section.locator("h3")).toBeFocused();
  const firstResource = section.locator("a[href]").first();
  await expect(firstResource).toBeAttached();
  await page.keyboard.press("Tab");
  await expect(firstResource).toBeFocused();
  await expect(firstResource).toBeInViewport();
});
