import { test, expect } from "@playwright/test";

test("artwork sky denotes information while suit red marks overdue risk", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/steps");
  const skyWash = await page.evaluate(() => {
    const swatch = document.createElement("span");
    swatch.style.background = "var(--color-sky-wash)";
    document.body.append(swatch);
    const color = getComputedStyle(swatch).backgroundColor;
    swatch.remove();
    return color;
  });
  await expect(page.locator(".steps-confidence-verified").first()).toHaveCSS("background-color", skyWash);

  await page.goto("/today");
  const redWash = await page.evaluate(() => {
    const swatch = document.createElement("span");
    swatch.style.background = "var(--color-signal-wash)";
    document.body.append(swatch);
    const color = getComputedStyle(swatch).backgroundColor;
    swatch.remove();
    const fixture = document.createElement("div");
    fixture.className = "today-risk-item";
    fixture.textContent = "Past its date";
    document.body.append(fixture);
    return color;
  });
  await expect(page.locator(".today-risk-item").last()).toHaveCSS("background-color", redWash);
  await expect(page.locator(".today-honest strong").first()).toHaveCSS("color", await page.evaluate(() => {
    const swatch = document.createElement("span");
    swatch.style.color = "var(--color-sky-on-forest)";
    document.body.append(swatch);
    const color = getComputedStyle(swatch).color;
    swatch.remove();
    return color;
  }));
});
