import { test, expect } from "@playwright/test";

test("the editorial navigation separates discovery from planning and exposes accounts", async ({ page }) => {
  await page.goto("/path");
  const toggle = page.getByRole("button", { name: "Open navigation", exact: true });
  await toggle.click();
  const menu = page.getByRole("dialog", { name: "Navigation", exact: true });
  await expect(menu).toBeVisible();
  await expect(menu.getByText("Discover Waymark", { exact: true })).toBeVisible();
  await expect(menu.getByText("Your planning space", { exact: true })).toBeVisible();
  await expect(menu.locator(".menu-links")).toHaveCSS("display", "grid");
  await expect(menu.getByRole("link", { name: "Your account", exact: true })).toHaveAttribute("href", "/account");
  await page.keyboard.press("Escape");
  await expect(menu).not.toBeVisible();
  await expect(toggle).toBeFocused();
  // Flex items blockify an authored inline-flex to computed display:flex.
  await expect(page.locator(".nav-account")).toHaveCSS("display", "flex");
});

for (const route of ["/login", "/signup", "/account", "/admin"]) {
  test(`${route} has real module styling and clears the fixed header`, async ({ page }) => {
    await page.goto(route);
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
    const layout = await heading.evaluate((el) => {
      const header = document.querySelector(".site-header");
      const owner = el.closest("section") || el.closest("main > div");
      return {
        top: el.getBoundingClientRect().top,
        headerBottom: header?.getBoundingClientRect().bottom ?? 0,
        fontSize: parseFloat(getComputedStyle(el).fontSize),
        containerClass: owner?.getAttribute("class"),
      };
    });
    expect(layout.top).toBeGreaterThanOrEqual(layout.headerBottom + 8);
    expect(layout.fontSize).toBeGreaterThan(24);
    expect(layout.containerClass).toBeTruthy();
  });
}

test("home presents honest preview persistence and a real closing heading", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".journey-local")).toContainText("Guest changes are temporary and reset on reload");
  await expect(page.locator(".closing-caption")).toContainText("Guest progress is temporary");
  await expect(page.getByRole("heading", { level: 2, name: "Somewhere new. Starts with you." })).toHaveCount(1);
  await expect(page.getByText("No account. Your plan stays in this browser.", { exact: true })).toHaveCount(0);
  await expect(page.locator(".aeroplane")).toHaveCount(0);
  await expect(page.locator(".ps-entry-guides button")).toHaveCount(3);
});

test("one canvas travels from infinity to the second-section aircraft position and back", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Actual WebGL motion is checked in Chromium; cross-engine fallback is separate.");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator(".journey-sculpture")).toHaveAttribute("data-webgl-status", "ready", { timeout: 25000 });
  await expect(page.locator(".arrival-intro")).not.toBeVisible();
  const canvas = await page.locator(".journey-sculpture canvas").elementHandle();
  expect(canvas).not.toBeNull();
  await page.evaluate(() => {
    const landing = document.querySelector<HTMLElement>(".landing");
    if (!landing?.dataset.flightEnd) throw new Error("Missing measured flight route");
    const top = Number(landing.dataset.flightEnd);
    if (document.documentElement.classList.contains("lenis")) {
      window.dispatchEvent(new CustomEvent("waymark:scroll-to", { detail: { top } }));
    } else window.scrollTo({ top, behavior: "instant" });
  });
  await expect.poll(() => page.evaluate(() => {
    const path = document.querySelector<SVGPathElement>(".world-route-track");
    const art = document.querySelector(".hero-art-scroll")?.getBoundingClientRect();
    if (!path || !art) return Number.POSITIVE_INFINITY;
    const target = path.getPointAtLength(path.getTotalLength()).matrixTransform(path.getScreenCTM()!);
    return Math.max(Math.abs(target.x - art.left - art.width / 2), Math.abs(target.y - art.top - art.height / 2));
  })).toBeLessThan(2);
  await expect(page.locator(".world-opening")).toHaveClass(/scene-can-fly/);
  await expect(page.locator(".flight-static")).toBeHidden();
  expect(await canvas?.evaluate((el) => el === document.querySelector(".journey-sculpture canvas"))).toBe(true);
  await page.evaluate(() => {
    window.dispatchEvent(new CustomEvent("waymark:scroll-to", { detail: { top: 0 } }));
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await expect.poll(() => page.locator(".hero-art-scroll").evaluate((el) => {
    const transform = getComputedStyle(el).transform;
    const matrix = new DOMMatrixReadOnly(transform === "none" ? undefined : transform);
    return Math.abs(matrix.m41) + Math.abs(matrix.m42);
  })).toBeLessThan(2);
  expect(await canvas?.evaluate((el) => el === document.querySelector(".journey-sculpture canvas"))).toBe(true);
});

test("reduced motion retains both static identities without an animated canvas", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(page.locator(".sculpture-fallback")).toBeVisible();
  await expect(page.locator(".flight-static")).toBeVisible();
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  expect(await page.locator("html").evaluate((el) => el.classList.contains("lenis"))).toBe(false);
});

test("destination buttons offer a native-scroll alternative to swiping", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const gallery = page.locator("#destination-gallery");
  await page.getByRole("button", { name: "Next destination", exact: true }).click();
  await expect.poll(() => gallery.evaluate((el) => el.scrollLeft)).toBeGreaterThan(100);
  await page.getByRole("button", { name: "Previous destination", exact: true }).click();
  await expect.poll(() => gallery.evaluate((el) => el.scrollLeft)).toBeLessThan(2);
});

test("live motion preference changes rebuild the canvas without retaining a false ready state", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Actual GPU reinitialization is exercised in Chromium.");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator(".journey-sculpture")).toHaveAttribute("data-webgl-status", "ready", { timeout: 25000 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(page.locator(".flight-static")).toBeVisible();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator(".journey-sculpture")).toHaveAttribute("data-webgl-status", "ready", { timeout: 25000 });
  await expect(page.locator(".flight-static")).toBeHidden();
  await expect(page.locator(".journey-sculpture canvas")).toHaveCount(1);
});

test("denied WebGL keeps the infinity poster and aircraft fallback available", async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, kind: string, ...args: unknown[]) {
      if (kind === "webgl" || kind === "webgl2" || kind === "experimental-webgl") return null;
      return Reflect.apply(original, this, [kind, ...args]);
    } as typeof original;
  });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator(".journey-sculpture")).toHaveAttribute("data-webgl-status", "unavailable", { timeout: 25000 });
  await expect(page.locator(".arrival-intro")).not.toBeVisible();
  await expect(page.locator(".sculpture-fallback")).toHaveCSS("opacity", "1");
  await expect(page.locator(".flight-static")).toBeVisible();
  await expect(page.locator(".hero-cta")).toBeVisible();
});

test("no-JavaScript landing retains useful content, artwork and route links", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  try {
    const page = await context.newPage();
    await page.goto(`${baseURL}/`);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator(".sculpture-fallback")).toBeVisible();
    await expect(page.locator(".flight-static")).toBeVisible();
    await expect(page.locator(".hero-cta")).toHaveAttribute("href", "/path");
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  } finally { await context.close(); }
});
