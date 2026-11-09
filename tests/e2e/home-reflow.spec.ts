import { test, expect } from "@playwright/test";

test("home stays within the viewport while the destination gallery scrolls independently", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const [width, height] of [[1024, 768], [1024, 900], [320, 768], [390, 844],
    [600, 768], [768, 768], [900, 768], [1100, 900], [1200, 900], [1440, 900]]) {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const geometry = await page.evaluate(() => {
      const gallery = document.querySelector<HTMLElement>("#destination-gallery")!;
      const hero = document.querySelector<HTMLElement>(".world-opening .hero")!;
      return {
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        galleryScrollable: gallery.scrollWidth > gallery.clientWidth,
        galleryOverflowX: getComputedStyle(gallery).overflowX,
        heroOverflowY: getComputedStyle(hero).overflowY,
      };
    });
    expect(geometry.overflow, `${width}×${height}: page overflow`).toBeLessThanOrEqual(1);
    expect(geometry.galleryScrollable).toBe(true);
    expect(geometry.galleryOverflowX).toBe("auto");
    expect(geometry.heroOverflowY).toBe("visible");
  }
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto("/");
  const gallery = page.locator("#destination-gallery");
  await page.getByRole("button", { name: "Next destination" }).click();
  await expect.poll(() => gallery.evaluate((element) => element.scrollLeft)).toBeGreaterThan(100);
  await page.getByRole("button", { name: "Previous destination" }).click();
  await expect.poll(() => gallery.evaluate((element) => element.scrollLeft)).toBeLessThan(2);
});

test("home reflows without JavaScript at the desktop crossover", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1024, height: 768 }, reducedMotion: "reduce" });
  try {
    const page = await context.newPage();
    await page.goto(`${baseURL}/`);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator(".sculpture-fallback")).toBeVisible();
    await expect(page.locator(".flight-static")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
  } finally {
    await context.close();
  }
});

test("horizontal reflow keeps the live aircraft's vertical flight visible", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Live GPU flight is verified in Chromium; WebKit fallback has separate coverage.");
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator(".journey-sculpture")).toHaveAttribute("data-webgl-status", "ready", { timeout: 25000 });
  await expect(page.locator(".arrival-intro")).not.toBeVisible();
  await expect(page.locator(".world-opening .hero")).toHaveCSS("overflow-y", "visible");
  await page.evaluate(() => {
    const end = Number(document.querySelector<HTMLElement>(".landing")?.dataset.flightEnd);
    if (!end) throw new Error("Flight route has no measured end");
    window.dispatchEvent(new CustomEvent("waymark:scroll-to", { detail: { top: end } }));
    window.scrollTo({ top: end, behavior: "instant" });
  });
  await expect.poll(() => page.evaluate(() => {
    const path = document.querySelector<SVGPathElement>(".world-route-track");
    const art = document.querySelector<HTMLElement>(".hero-art-scroll")?.getBoundingClientRect();
    if (!path || !art) return Number.POSITIVE_INFINITY;
    const target = path.getPointAtLength(path.getTotalLength()).matrixTransform(path.getScreenCTM()!);
    return Math.max(Math.abs(target.x - art.left - art.width / 2), Math.abs(target.y - art.top - art.height / 2));
  })).toBeLessThan(2);
  await expect(page.locator(".hero-art-scroll")).toBeInViewport();
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
});
