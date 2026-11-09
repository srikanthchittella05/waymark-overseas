import { test, expect, type Page } from "@playwright/test";

async function scrollTo(page: Page, top: number) {
  await page.evaluate((top) => {
    if (document.documentElement.classList.contains("lenis")) window.dispatchEvent(new CustomEvent("waymark:scroll-to", { detail: { top } }));
    else window.scrollTo({ top, behavior: "instant" });
  }, top);
  await expect.poll(() => page.evaluate((top) => Math.abs(scrollY - top), top)).toBeLessThan(2);
}

async function scrollRoute(page: Page, fraction: number) {
  const sample = await page.locator(".landing").evaluate((element, fraction) => {
    const start = Number((element as HTMLElement).dataset.flightHandoff);
    const end = Number((element as HTMLElement).dataset.flightEnd);
    // Native scrolling resolves to CSS pixels. On a shorter copy layout, a
    // half-pixel request can exceed the percentage tolerance even though the
    // plane is correctly aligned. Compare progress at the requested whole pixel;
    // routeError still enforces the original <2px path and <2° heading checks.
    const top = Math.round(start + fraction * (end - start));
    return { top, fraction: (top - start) / (end - start) };
  }, fraction);
  await scrollTo(page, sample.top);
  await expect.poll(() => page.locator(".hero-art-scroll").evaluate((element, fraction) => Math.abs(Number((element as HTMLElement).dataset.routeProgress) - fraction), sample.fraction)).toBeLessThan(0.001);
}

async function routeError(page: Page, fraction: number) {
  return page.evaluate((fraction) => {
    const path = document.querySelector<SVGPathElement>(".world-route-track")!;
    const target = path.getPointAtLength(path.getTotalLength() * fraction).matrixTransform(path.getScreenCTM()!);
    const box = document.querySelector(".hero-art-scroll")!.getBoundingClientRect();
    const matrix = new DOMMatrixReadOnly(getComputedStyle(document.querySelector(".hero-art-scroll")!).transform);
    const before = path.getPointAtLength(Math.max(0, path.getTotalLength() * fraction - 0.5)).matrixTransform(path.getScreenCTM()!);
    const after = path.getPointAtLength(Math.min(path.getTotalLength(), path.getTotalLength() * fraction + 0.5)).matrixTransform(path.getScreenCTM()!);
    const tangent = Math.atan2(after.y - before.y, after.x - before.x);
    const angle = Math.atan2(matrix.m12, matrix.m11);
    return { distance: Math.hypot(box.left + box.width / 2 - target.x, box.top + box.height / 2 - target.y),
      angle: Math.abs(Math.atan2(Math.sin(angle - tangent), Math.cos(angle - tangent))) * 180 / Math.PI,
      width: box.width, height: box.height, centerY: box.top + box.height / 2 };
  }, fraction);
}

test("the transitioned aircraft is a small traveller rather than a second hero sculpture", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "GPU shape captures run in Chromium; static fallback is checked across engines.");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator(".journey-sculpture")).toHaveAttribute("data-webgl-status", "ready", { timeout: 30000 });
  await expect(page.locator(".arrival-intro")).not.toBeVisible();
  await page.evaluate(() => {
    const top = document.querySelector(".world-opening")!.getBoundingClientRect().bottom + scrollY - innerHeight;
    window.dispatchEvent(new CustomEvent("waymark:scroll-to", { detail: { top } }));
    window.scrollTo({ top, behavior: "instant" });
  });
  await expect.poll(() => page.locator(".hero-art-scroll").evaluate((element) => element.getBoundingClientRect().width)).toBeLessThan(170);
});

test("the same small plane follows the line and its bends forward, backward and into the next section", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Actual mesh travel is checked in Chromium.");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator(".journey-sculpture")).toHaveAttribute("data-webgl-status", "ready", { timeout: 30000 });
  await expect(page.locator(".arrival-intro")).not.toBeVisible();
  const canvas = await page.locator(".journey-sculpture canvas").elementHandle();
  for (const fraction of [0.05, 0.25, 0.5, 0.75, 1, 0.75, 0.25, 0.05]) {
    await scrollRoute(page, fraction);
    await expect.poll(async () => (await routeError(page, fraction)).distance).toBeLessThan(2);
    const error = await routeError(page, fraction);
    expect(error.angle).toBeLessThan(2);
    expect(error.width).toBeLessThan(195);
    expect(error.height).toBeLessThan(195);
    expect(error.centerY).toBeLessThan((page.viewportSize()?.height ?? 900) - 50);
    expect(await canvas!.evaluate((element) => element === document.querySelector(".journey-sculpture canvas"))).toBe(true);
  }
  await scrollRoute(page, 1);
  const nextTop = await page.locator("#plan").evaluate((element) => element.getBoundingClientRect().top);
  const centerY = (await routeError(page, 1)).centerY;
  expect(centerY).toBeGreaterThan(nextTop + 2);
  const nextLabel = await page.locator(".ps-heading .ps-eyebrow").evaluate((element) => element.getBoundingClientRect().top);
  expect(centerY + ((page.viewportSize()?.width ?? 1440) < 900 ? 33 : 49)).toBeLessThan(nextLabel);
  await scrollTo(page, 0);
  await expect.poll(() => page.locator(".hero-art-scroll").evaluate((element) => Number((element as HTMLElement).dataset.morphProgress))).toBeLessThan(0.001);
});

test("route alignment survives a desktop-to-mobile resize and a return to desktop", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "GPU resize coverage uses Chromium.");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator(".journey-sculpture")).toHaveAttribute("data-webgl-status", "ready", { timeout: 30000 });
  await expect(page.locator(".arrival-intro")).not.toBeVisible();
  for (const viewport of [{ width: 390, height: 844 }, { width: 1440, height: 900 }]) {
    await page.setViewportSize(viewport);
    await expect.poll(() => page.locator(".world-route").evaluate((element) => Number(element.getAttribute("viewBox")!.split(" ")[2]))).toBe(viewport.width);
    await scrollRoute(page, 0.5);
    await expect.poll(async () => (await routeError(page, 0.5)).distance).toBeLessThan(2);
    expect((await routeError(page, 0.5)).angle).toBeLessThan(2);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  }
});

test("animated startup never paints the horizontal poster before the live infinity", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Cold GPU startup sampling is exercised in Chromium.");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.addInitScript(() => {
    const samples: boolean[] = [];
    Object.assign(window, { __posterSamples: samples });
    const sample = () => {
      const image = document.querySelector(".sculpture-fallback");
      if (image) {
        const style = getComputedStyle(image);
        samples.push(style.visibility === "visible" && Number(style.opacity) > 0.001);
      }
      if (samples.length < 500) requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
  });
  await page.goto("/");
  await expect(page.locator(".journey-sculpture")).toHaveAttribute("data-webgl-status", "ready", { timeout: 30000 });
  await expect(page.locator(".arrival-intro")).not.toBeVisible();
  const samples = await page.evaluate(() => (window as typeof window & { __posterSamples: boolean[] }).__posterSamples);
  expect(samples.length).toBeGreaterThan(0);
  expect(samples.some(Boolean)).toBe(false);
});

test("a shared second-section link initializes the same live traveller without visiting the hero first", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "GPU deep-link initialization uses Chromium.");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/#vision");
  await expect(page.locator(".journey-sculpture")).toHaveAttribute("data-webgl-status", "ready", { timeout: 30000 });
  await scrollRoute(page, 0.5);
  await expect.poll(async () => (await routeError(page, 0.5)).distance).toBeLessThan(2);
  await expect(page.locator(".flight-static")).toBeHidden();
});

test("a lost GPU context restores the static fallback, then recovers the scroll route", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Real WEBGL_lose_context recovery is exercised in Chromium.");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator(".journey-sculpture")).toHaveAttribute("data-webgl-status", "ready", { timeout: 30000 });
  await expect(page.locator(".arrival-intro")).not.toBeVisible();
  await scrollRoute(page, 0.4);
  await page.locator("canvas").evaluate((element) => {
    const gl = (element as HTMLCanvasElement).getContext("webgl2")!;
    const extension = gl.getExtension("WEBGL_lose_context");
    if (!extension) throw new Error("Context-loss extension unavailable");
    Object.assign(window, { __lostContext: extension });
    extension.loseContext();
  });
  await expect(page.locator(".journey-sculpture")).toHaveAttribute("data-webgl-status", "lost");
  await expect(page.locator(".flight-static")).toBeVisible();
  await page.evaluate(() => (window as typeof window & { __lostContext: WEBGL_lose_context }).__lostContext.restoreContext());
  await expect(page.locator(".journey-sculpture")).toHaveAttribute("data-webgl-status", "ready", { timeout: 30000 });
  await scrollRoute(page, 0.4);
  await expect.poll(async () => (await routeError(page, 0.4)).distance).toBeLessThan(2);
  await expect(page.locator(".flight-static")).toBeHidden();
});
