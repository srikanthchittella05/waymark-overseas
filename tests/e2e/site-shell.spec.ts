import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
});

test("compact navigation keeps lime primary and sky blue secondary", async ({ page }) => {
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/today");
    await expect(page.locator(".nav-index")).toHaveCount(0);
    const menu = page.getByRole("button", { name: "Open navigation" });
    await expect(menu).toBeVisible();
    expect(await menu.evaluate((el) => el.getBoundingClientRect().width)).toBeLessThanOrEqual(88);
    expect(await menu.evaluate((el) => el.getBoundingClientRect().height)).toBeGreaterThanOrEqual(44);
    if (width > 600) {
      await expect(page.locator(".nav-roadmap")).toHaveCSS("background-color", "rgb(177, 190, 106)");
    }
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/path");
  const mutedSky = await page.evaluate(() => {
    const swatch = document.createElement("span");
    swatch.style.color = "var(--color-sky-on-forest)";
    document.body.append(swatch);
    const color = getComputedStyle(swatch).color;
    swatch.remove();
    return color;
  });
  await expect(page.locator(".pa-preview > .eyebrow")).toHaveCSS("color", mutedSky);
  await expect(page.locator(".footer-directory-group:last-child .footer-label")).toHaveCSS("color", mutedSky);
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
});

test("save-status guidance is readable below the header, never a clipped box", async ({ page }) => {
  for (const width of [1440, 320]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/today", "/steps", "/route", "/path"]) {
      await page.goto(route);
      const notice = page.getByText("Preview only · changes are temporary and are not uploaded.", { exact: false }).first();
      await expect(notice).toBeVisible();
      await expect.poll(() => notice.evaluate((el) => {
        const header = document.querySelector(".site-header")!.getBoundingClientRect();
        const box = el.getBoundingClientRect();
        const style = getComputedStyle(el);
        return { visible: box.top >= header.bottom, border: style.borderTopWidth, background: style.backgroundColor };
      })).toEqual({ visible: true, border: "0px", background: "rgba(0, 0, 0, 0)" });
    }
  }
});

test("one site footer connects every page without replacing its local next steps", async ({ page }) => {
  for (const route of ["/", "/today", "/steps", "/route", "/path", "/login", "/signup", "/account", "/showcase"]) {
    await page.goto(route);
    const footer = page.getByRole("contentinfo");
    await expect(footer, route).toHaveCount(1);
    await expect(footer.getByRole("navigation", { name: "Footer navigation" })).toBeVisible();
    for (const [name, href] of [
      ["Today", "/today"], ["The Route", "/route"], ["The Steps", "/steps"],
      ["Your Path", "/path"], ["Back to the idea", "/#vision"], ["Your account", "/account"],
    ]) {
      await expect(footer.getByRole("link", { name }), route).toHaveAttribute("href", href);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth), route).toBeLessThanOrEqual(1);
  }
  await page.getByRole("contentinfo").getByRole("link", { name: "Back to the idea" }).click();
  await expect(page).toHaveURL(/\/#vision$/);
  await expect(page.getByRole("heading", { name: /Less circling\. More going\./ })).toBeVisible();
});

test("compact navigation keeps a scrollable, modal menu and releases its lock before travel", async ({ page, browserName }) => {
  await page.setViewportSize({ width: 320, height: 480 });
  await page.goto("/today");
  const toggle = page.getByRole("button", { name: "Open navigation" });
  const priorOverflow = await page.evaluate(() => [document.documentElement.style.overflowY, document.body.style.overflowY]);
  await toggle.click();
  const menu = page.getByRole("dialog", { name: "Navigation" });
  await expect(menu).toBeVisible();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  expect(await menu.evaluate((el) => el.scrollHeight - el.clientHeight)).toBeGreaterThan(0);
  if (browserName === "webkit" && test.info().project.name.includes("mobile")) {
    // Mobile WebKit's Playwright backend does not implement mouse.wheel.
    await menu.evaluate((el) => { el.scrollTop = 550; });
  } else {
    await menu.hover();
    await page.mouse.wheel(0, 550);
  }
  await expect.poll(() => menu.evaluate((el) => el.scrollTop)).toBeGreaterThan(0);
  await menu.getByRole("link", { name: "The Steps" }).click();
  await expect(page).toHaveURL(/\/steps$/);
  await expect(menu).not.toBeVisible();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  expect(await page.evaluate(() => [document.documentElement.style.overflowY, document.body.style.overflowY])).toEqual(priorOverflow);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
});

test("Escape closes navigation and restores keyboard focus and scrolling", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  for (const reducedMotion of ["reduce", "no-preference"] as const) {
    await page.emulateMedia({ reducedMotion });
    await page.goto("/today");
    const toggle = page.getByRole("button", { name: "Open navigation" });
    const previousOverflow = await page.evaluate(() => [document.documentElement.style.overflowY, document.body.style.overflowY]);
    await toggle.click();
    const menu = page.getByRole("dialog", { name: "Navigation" });
    await expect(menu).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menu).not.toBeVisible();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toBeFocused();
    expect(await page.evaluate(() => [document.documentElement.style.overflowY, document.body.style.overflowY])).toEqual(previousOverflow);
  }
});

test("a blocked past-date milestone presents a usable prerequisite route, not a false completion", async ({ page }) => {
  await page.goto("/today");
  const risk = page.locator(".today-risk");
  await expect(risk.getByRole("heading", { name: "Past its date." })).toBeVisible();
  const blocked = risk.locator(".today-risk-item").filter({ has: page.locator(".today-risk-gate") }).first();
  await expect(blocked.getByRole("button", { name: /Mark done/ })).toBeDisabled();
  await expect(blocked.getByRole("link", { name: "See prerequisites" })).toHaveAttribute("href", "/steps");
  await expect(blocked.locator("time[datetime]")).toHaveCount(1);
  await blocked.getByRole("link", { name: "See prerequisites" }).click();
  await expect(page).toHaveURL(/\/steps$/);
});
