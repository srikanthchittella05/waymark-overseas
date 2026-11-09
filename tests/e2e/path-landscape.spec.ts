import { test, expect } from "@playwright/test";

test("a chosen country has more than one locally served, accurately captioned view", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  const thirdPartyPhotos: string[] = [];
  const localPhotos: string[] = [];
  page.on("request", (request) => {
    if (request.resourceType() === "image" && new URL(request.url()).origin !== new URL(page.url()).origin) {
      thirdPartyPhotos.push(request.url());
    }
    if (request.url().includes("/destinations/views/")) localPhotos.push(new URL(request.url()).pathname);
  });
  await page.goto("/path?country=GB");
  const gallery = page.getByRole("region", { name: "United Kingdom, in focus." });
  await expect(page.getByRole("radio", { name: /United Kingdom/ })).toBeChecked();
  await expect(gallery.locator("img")).toBeVisible();
  await gallery.locator("img").scrollIntoViewIfNeeded();
  const first = await gallery.locator("img").getAttribute("src");
  const firstPlace = await gallery.locator(".pa-gallery-place").innerText();
  expect(new URL(first!).pathname).toMatch(/^\/destinations\/views\/gb-[\w-]+\.webp$/);
  await expect(gallery.locator("img")).toHaveJSProperty("complete", true);
  expect(await gallery.locator("img").evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
  await expect(gallery.getByRole("link", { name: /^Photo:/ })).toHaveAttribute("href", /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/);
  await gallery.getByRole("button", { name: "Next view of United Kingdom" }).focus();
  await page.keyboard.press("Enter");
  await expect(gallery.locator("img")).not.toHaveAttribute("src", first!);
  await expect(gallery.locator(".pa-gallery-place")).not.toHaveText(firstPlace);
  await expect(gallery.locator(".pa-gallery-count")).toHaveText("2 / 2");
  await expect(gallery.locator("img")).toHaveJSProperty("complete", true);
  expect(await gallery.locator("img").evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
  await gallery.getByRole("button", { name: "Previous view of United Kingdom" }).focus();
  await page.keyboard.press("Space");
  await expect(gallery.locator("img")).toHaveAttribute("src", first!);

  await page.getByRole("radio", { name: /Canada/ }).check();
  await expect(page.getByRole("region", { name: "Canada, in focus." }).locator("img"))
    .toHaveAttribute("src", /\/destinations\/views\/ca-[\w-]+\.webp$/);
  await expect(page.locator(".pa-preview-where")).toContainText("Canada");
  await expect(page.locator(".pa-preview img")).toHaveCount(0);
  expect(thirdPartyPhotos).toEqual([]);
  expect(localPhotos.length).toBeGreaterThanOrEqual(2);
  expect(localPhotos.every((path) => /\/views\/(gb|ca)-/.test(path))).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);
});

test("country gallery is usable at mobile size and handles one or all failed images", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/path?country=FR");
  const gallery = page.getByRole("region", { name: "France, in focus." });
  await expect(gallery).toBeVisible();
  expect(await gallery.locator("img").evaluate((image) => image.getBoundingClientRect().width)).toBeGreaterThan(250);
  await gallery.getByRole("button", { name: "Next view of France" }).click();
  await expect(gallery.locator(".pa-gallery-count")).toHaveText("2 / 2");
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);

  let failedRequests = 0;
  let succeedingRequests = 0;
  await page.route("**/destinations/views/*.webp", async (route) => {
    if (route.request().url().endsWith("/sg-marina-bay.webp")) {
      failedRequests += 1;
      await route.abort();
    } else {
      succeedingRequests += 1;
      await route.continue();
    }
  });
  await page.goto("/path?country=SG");
  const singleGallery = page.getByRole("region", { name: "Singapore, in focus." });
  await singleGallery.locator("img").scrollIntoViewIfNeeded();
  await expect(singleGallery.getByRole("button", { name: "Next view of Singapore" })).toHaveCount(0);
  await expect(singleGallery.locator("img")).toHaveJSProperty("complete", true);
  expect(await singleGallery.locator("img").evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
  expect(failedRequests).toBeGreaterThanOrEqual(1);
  expect(succeedingRequests).toBeGreaterThanOrEqual(1);

  await page.unrouteAll();
  await page.route("**/destinations/views/*.webp", (route) => route.abort());
  await page.goto("/path?country=DE");
  await page.evaluate(() => document.querySelector(".pa-gallery")?.scrollIntoView());
  await expect(page.locator(".pa-gallery")).toHaveCount(0);
  await expect(page.getByRole("radio", { name: /Germany/ })).toBeChecked();
  await expect(page.locator(".pa-preview-where")).toContainText("Germany");
});

test("all seven supported countries decode two different local scenes", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 800 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const code of ["US", "GB", "CA", "AU", "DE", "FR", "SG"]) {
    await page.goto(`/path?country=${code}`);
    const gallery = page.locator(".pa-gallery");
    await expect(gallery).toBeVisible();
    const first = gallery.locator("img");
    await first.scrollIntoViewIfNeeded();
    await expect.poll(() => first.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
    const firstLocation = await gallery.locator(".pa-gallery-place").innerText();
    await gallery.getByRole("button", { name: /^Next view of/ }).click();
    await expect(gallery.locator(".pa-gallery-place")).not.toHaveText(firstLocation);
    await expect.poll(() => gallery.locator("img").evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
    await expect(gallery.locator(".pa-gallery-count")).toHaveText("2 / 2");
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth), code).toBe(0);
  }
});

test("every country, including long Singapore intake names, reflows at 320px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const code of ["US", "GB", "CA", "AU", "DE", "FR", "SG"]) {
    await page.goto(`/path?country=${code}`);
    await expect(page.locator(".pa-gallery img")).toBeVisible();
    await expect.poll(async () => page.evaluate(() =>
      document.documentElement.scrollWidth - document.documentElement.clientWidth),
    { message: `${code}: no horizontal page scroll` }).toBe(0);
    expect(await page.locator(".pa-gallery img").evaluate((img) => img.getBoundingClientRect().width),
      `${code}: useful mobile image width`).toBeGreaterThan(250);
  }
});
