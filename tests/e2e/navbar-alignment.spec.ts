import { test, expect } from "@playwright/test";

test("header options stay at the right edge on home and planner layouts", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [1440, 1024, 900, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", "/path"]) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator(".nav-account")).toBeVisible();
      await expect(page.getByRole("button", { name: "Open navigation", exact: true })).toBeVisible();
      if (width > 600) await expect(page.locator(".nav-roadmap")).toBeVisible();
      else await expect(page.locator(".nav-roadmap")).toBeHidden();

      await expect(async () => {
        const position = await page.locator(".nav-inner").evaluate((nav) => {
          const bounds = nav.getBoundingClientRect();
          const style = getComputedStyle(nav);
          const brand = nav.querySelector(".brand")!.getBoundingClientRect();
          const actions = nav.querySelector(".nav-actions")!.getBoundingClientRect();
          const menu = nav.querySelector(".menu-toggle")!.getBoundingClientRect();
          return {
            right: bounds.right - parseFloat(style.paddingRight),
            left: bounds.left + parseFloat(style.paddingLeft),
            brandLeft: brand.left, brandRight: brand.right,
            actionsLeft: actions.left, actionsRight: actions.right,
            menuRight: menu.right, menuTop: menu.top,
          };
        });
        expect(Math.abs(position.actionsRight - position.right), `${route}, ${width}px: actions right edge`).toBeLessThanOrEqual(1);
        expect(Math.abs(position.menuRight - position.right), `${route}, ${width}px: menu right edge`).toBeLessThanOrEqual(1);
        expect(Math.abs(position.brandLeft - position.left)).toBeLessThanOrEqual(1);
        expect(position.actionsLeft).toBeGreaterThan(position.brandRight + 8);
        expect(position.menuTop).toBeGreaterThanOrEqual(0);
        expect(position.menuTop).toBeLessThan(32);
      }).toPass({ timeout: 3000 });
    }
  }
});
