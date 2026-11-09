import { test, expect, type Locator, type Page } from "@playwright/test";
import { ARCHETYPE_SECTIONS } from "../../src/lib/engine/guides/archetypes";
import type { Guide } from "../../src/lib/engine/guides/types";

// HTTP-boundary fixtures isolate modal/navigation behavior, not hosted guide
// publication or authorization. Run against an already-running preview with
// PLAYWRIGHT_BASE_URL=http://127.0.0.1:3200 playwright test guide-refinements.
const guideUrl = "**/api/guides/us-english";
const resourceTitle = "Independent practice paper";

function publishedGuide(intro = "The published preparation guide."): Guide {
  return {
    archetype: "language-test",
    intro,
    sections: ARCHETYPE_SECTIONS["language-test"].map((section) => ({
      ...section,
      content: section.id === "resources" ? {
        body: "Materials selected for a specific purpose, with their original source.",
        resources: [
          { kind: "official", title: "Official preparation handbook", url: "https://example.test/handbook", why: "Check the original format and scoring rules.", verifiedOn: "2026-10-26" },
          { kind: "practice", title: resourceTitle, url: "https://example.test/practice", why: "Attempt a timed paper before booking the test.", verifiedOn: "2026-10-26" },
        ],
      } : {
        body: `Published guidance for ${section.title}.`,
        points: Array.from({ length: 18 }, (_, index) =>
          `${index + 1}. Check your programme's current requirements, record the source and leave enough time for preparation. Repeat with the exact course you intend to apply for.`,
        ),
        ...(section.id === "inside" ? {
          subsections: [{ title: "Reading practice details", resources: [
            { kind: "official", title: "Hidden reading supplement", url: "https://example.test/reading", why: "Extra guidance inside a closed disclosure.", verifiedOn: "2026-10-26" },
          ] }],
        } : {}),
      },
    })),
  };
}

function deferred() {
  let resolve = () => {};
  const promise = new Promise<void>((done) => { resolve = done; });
  return { promise, resolve };
}

function resourceOpener(page: Page): Locator {
  return page.locator('.steps-row:has(#step-us-english) [data-guide-link="resources"]');
}

async function expectSectionInView(page: Page, id: string) {
  const section = page.locator(`[data-guide-section="${id}"]`);
  const heading = section.locator("h3");
  await expect(section).toHaveAttribute("data-guide-active", "true");
  await expect(heading).toBeFocused();
  await expect(heading).toBeInViewport({ ratio: 0.99 });
  // toBeVisible alone does NOT prove visibility inside an overflow region.
  await expect.poll(() => heading.evaluate((element) => {
    const scroll = element.closest("[data-guide-scroll]")!;
    const box = element.getBoundingClientRect();
    const bounds = scroll.getBoundingClientRect();
    return box.top >= bounds.top - 1 && box.bottom <= bounds.bottom + 1 &&
      box.left >= bounds.left - 1 && box.right <= bounds.right + 1;
  })).toBe(true);
}

async function expectFocusContained(page: Page) {
  await expect.poll(() => page.locator("[data-guide-panel]").evaluate((panel) => panel.contains(document.activeElement))).toBe(true);
}

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.route("**/api/workspace", (route) => route.fulfill({ json: {
    configured: false, user: null,
    profile: { countryCode: "US", intakeId: "us-fall-2027", stage: "exploring" },
    done: {}, planId: null, planVersion: 0, hasSavedTarget: false, deadlineRevisions: [],
  } }));
});

test("initial container, both Tab boundaries and outside focus remain inside the guide", async ({ page }) => {
  const response = deferred();
  await page.route(guideUrl, async (route) => {
    await response.promise;
    await route.fulfill({ json: { guide: publishedGuide() } });
  });
  try {
    await page.goto("/steps");
    const opener = resourceOpener(page);
    await expect(opener).toBeEnabled();
    await opener.focus();
    await page.keyboard.press("Enter");
    const panel = page.locator("[data-guide-panel]");
    const first = panel.getByRole("link", { name: "The official source" });
    const close = panel.getByRole("button", { name: "Close", exact: true });
    await expect(panel).toBeFocused();
    expect(await page.locator("dialog.guide-overlay").evaluate((dialog) => dialog.matches(":modal"))).toBe(true);
    expect(await panel.evaluate((element) => element.closest("[inert]") === null)).toBe(true);

    await page.keyboard.press("Shift+Tab");
    await expect(close).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(first).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(close).toBeFocused();
    await page.locator(".steps-next a").last().evaluate((element) => (element as HTMLElement).focus());
    await expect(close).toBeFocused();
    await expectFocusContained(page);

    response.resolve();
    await expectSectionInView(page, "resources");
    const last = panel.getByRole("link", { name: new RegExp(resourceTitle) });
    await expect(panel.getByRole("link", { name: /Hidden reading supplement/ })).toHaveCount(0);
    await panel.focus();
    await page.keyboard.press("Shift+Tab");
    await expect(last).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(first).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(last).toBeFocused();
    await panel.focus();
    await page.keyboard.press("Tab");
    await expect(first).toBeFocused();
    for (let index = 0; index < 14; index++) {
      await page.keyboard.press("Tab");
      await expectFocusContained(page);
    }
    await page.keyboard.press("Escape");
    await expect(panel).toHaveCount(0);
    await expect(opener).toBeFocused();
  } finally {
    response.resolve();
  }
});

for (const action of ["Escape", "Close button", "Back"] as const) {
  test(`${action} restores the true opener and releases page modality`, async ({ page }) => {
    await page.route(guideUrl, (route) => route.fulfill({ json: { guide: publishedGuide() } }));
    await page.goto("/steps");
    const opener = resourceOpener(page);
    await expect(opener).toBeEnabled();
    if (action === "Close button") {
      // Pointer activation need not move focus in Safari. An unrelated old
      // focus target must not become the return target.
      await page.locator(".steps-target").focus();
      await opener.click();
    } else {
      await opener.focus();
      await page.keyboard.press("Enter");
    }
    await expectSectionInView(page, "resources");
    if (action === "Escape") await page.keyboard.press("Escape");
    else if (action === "Close button") await page.locator("[data-guide-close]").click();
    else await page.evaluate(() => window.history.back());
    await expect(page.locator("[data-guide-panel]")).toHaveCount(0);
    await expect(opener).toBeFocused();
    await expect(page).toHaveURL(/\/steps$/);
    expect(await page.evaluate(() => document.querySelector(":modal") === null)).toBe(true);
    expect(await page.evaluate(() => document.documentElement.style.overflowY)).not.toBe("hidden");
    expect(await page.evaluate(() => document.body.style.overflowY)).not.toBe("hidden");

    if (action === "Back") {
      await page.evaluate(() => window.history.forward());
      await expectSectionInView(page, "resources");
      await page.keyboard.press("Escape");
      await expect(page.locator("[data-guide-panel]")).toHaveCount(0);
      await expect(opener).toBeFocused();
      await expect(page).toHaveURL(/\/steps$/);
    }
  });
}

for (const reducedMotion of ["reduce", "no-preference"] as const) {
  test(`shared section waits for content and enters its own viewport (${reducedMotion})`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion });
    const response = deferred();
    await page.route(guideUrl, async (route) => {
      await response.promise;
      await route.fulfill({ json: { guide: publishedGuide() } });
    });
    try {
      await page.goto("/steps?guide-test=shared#m=us-english&s=resources");
      await expect(page.locator("[data-guide-panel]")).toBeVisible();
      await expect(page.getByRole("status").filter({ hasText: "Opening the guide" })).toBeVisible();
      await expect(page.locator('[data-guide-section="resources"]')).toHaveCount(0);
      const mainY = await page.evaluate(() => window.scrollY);
      response.resolve();
      await expectSectionInView(page, "resources");
      expect(await page.locator("[data-guide-scroll]").evaluate((scroll) => scroll.scrollTop)).toBeGreaterThan(1000);
      expect(await page.evaluate(() => window.scrollY)).toBe(mainY);
      await page.keyboard.press("Escape");
      await expect(page.locator("[data-guide-panel]")).toHaveCount(0);
      await expect(page).toHaveURL(/\/steps\?guide-test=shared$/);
    } finally {
      response.resolve();
    }
  });
}

test("keyboard section changes/reselection reuse content and one Back restores the original opener", async ({ page }) => {
  let requests = 0;
  await page.route(guideUrl, (route) => {
    requests++;
    return route.fulfill({ json: { guide: publishedGuide() } });
  });
  await page.goto("/steps");
  const opener = resourceOpener(page);
  await expect(opener).toBeEnabled();
  await opener.focus();
  const mainY = await page.evaluate(() => window.scrollY);
  await page.keyboard.press("Enter");
  await expectSectionInView(page, "resources");
  const initialRequests = requests;
  const entries = await page.evaluate(() => window.history.length);
  const nav = page.getByRole("navigation", { name: "Sections in this guide" });
  for (const id of ["exams", "timing", "resources", "resources"]) {
    const label = ARCHETYPE_SECTIONS["language-test"].find((section) => section.id === id)!.navLabel;
    await nav.getByRole("button", { name: label, exact: true }).focus();
    await page.keyboard.press("Enter");
    await expectSectionInView(page, id);
    await expect(nav.getByRole("button", { name: label, exact: true })).toHaveAttribute("aria-current", "location");
    expect(requests).toBe(initialRequests);
    expect(await page.evaluate(() => window.history.length)).toBe(entries);
    expect(await page.evaluate(() => window.scrollY)).toBe(mainY);
  }
  // Hash-driven selection changes while already open also wait for/target the
  // same content; they must not remount the modal or replace the return target.
  await page.evaluate(() => {
    window.history.replaceState(window.history.state, "", "#m=us-english&s=timing");
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  });
  await expectSectionInView(page, "timing");
  expect(requests).toBe(initialRequests);
  await page.evaluate(() => window.history.back());
  await expect(page.locator("[data-guide-panel]")).toHaveCount(0);
  await expect(opener).toBeFocused();
});

test("live motion changes do not reset focus, scroll or modal cleanup", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.route(guideUrl, (route) => route.fulfill({ json: { guide: publishedGuide() } }));
  await page.goto("/steps");
  const opener = resourceOpener(page);
  await expect(opener).toBeEnabled();
  await opener.focus();
  await page.keyboard.press("Enter");
  await expectSectionInView(page, "resources");
  const close = page.locator("[data-guide-close]");
  await close.focus();
  await page.locator("[data-guide-scroll]").evaluate((scroll) => { scroll.scrollTop = 1000; });
  for (const motion of ["reduce", "no-preference", "reduce"] as const) {
    await page.emulateMedia({ reducedMotion: motion });
    await expect(page.locator("dialog.guide-overlay")).toHaveAttribute("data-guide-motion", motion === "reduce" ? "off" : "on");
    await expect(close).toBeFocused();
    expect(await page.locator("[data-guide-scroll]").evaluate((scroll) => scroll.scrollTop)).toBe(1000);
    await expectFocusContained(page);
  }
  await page.keyboard.press("Escape");
  await expect(opener).toBeFocused();
  await expect(page.locator("[data-guide-panel]")).toHaveCount(0);
});

test("reopening fetches afresh and reports failure instead of displaying the old guide", async ({ page }) => {
  let fail = false;
  const response = deferred();
  await page.route(guideUrl, async (route) => {
    if (!fail) return route.fulfill({ json: { guide: publishedGuide("Previously published content.") } });
    await response.promise;
    await route.fulfill({ status: 503, json: { error: { message: "The guide catalog is unavailable." } } });
  });
  try {
    await page.goto("/steps");
    const opener = resourceOpener(page);
    await opener.click();
    await expectSectionInView(page, "resources");
    await page.keyboard.press("Escape");
    await expect(opener).toBeFocused();
    fail = true;
    await page.keyboard.press("Enter");
    await expect(page.locator("[data-guide-panel]")).toBeFocused();
    await expect(page.locator(".guide-intro")).toHaveCount(0);
    await expect(page.locator("[data-guide-scroll]")).toHaveAttribute("aria-busy", "true");
    response.resolve();
    await expect(page.getByRole("alert").filter({ hasText: "This guide could not be loaded" })).toBeVisible();
    await expect(page.locator("[data-guide-scroll]")).toHaveAttribute("aria-busy", "false");
    await expect(page.locator(".guide-intro")).toHaveCount(0);
    await expect(page.locator("[data-guide-section]")).toHaveCount(0);
    await page.locator("[data-guide-panel]").focus();
    await page.keyboard.press("Shift+Tab");
    await expect(page.locator("[data-guide-close]")).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(opener).toBeFocused();
  } finally {
    response.resolve();
  }
});

test("close/reopen ignores a late response even when a transport ignores abort", async ({ page }) => {
  // Deliberately hostile transport: the first response resolves AFTER abort.
  // This proves cancellation/request identity, not only AbortController's happy path.
  await page.addInitScript(({ guide }) => {
    const originalFetch = window.fetch.bind(window);
    let first = true;
    window.fetch = (input, init) => {
      const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
      if (first && new URL(url, location.href).pathname === "/api/guides/us-english") {
        first = false;
        return new Promise<Response>((resolve) => {
          window.addEventListener("guide-test:late-response", () => {
            resolve(new Response(JSON.stringify({ guide }), { status: 200, headers: { "content-type": "application/json" } }));
          }, { once: true });
        });
      }
      return originalFetch(input, init);
    };
  }, { guide: publishedGuide("Stale response from a dismissed guide.") });
  await page.route(guideUrl, (route) => route.fulfill({ json: { guide: publishedGuide("Fresh response from the new opening.") } }));
  await page.goto("/steps");
  const opener = resourceOpener(page);
  await expect(opener).toBeEnabled();
  await opener.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("[data-guide-scroll]")).toHaveAttribute("aria-busy", "true");
  await page.keyboard.press("Escape");
  await expect(opener).toBeFocused();
  await page.keyboard.press("Enter");
  await expectSectionInView(page, "resources");
  const top = await page.locator("[data-guide-scroll]").evaluate((scroll) => scroll.scrollTop);
  await page.evaluate(async () => {
    window.dispatchEvent(new Event("guide-test:late-response"));
    await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
  });
  await expect(page.locator(".guide-intro")).toHaveText("Fresh response from the new opening.");
  await expectSectionInView(page, "resources");
  expect(await page.locator("[data-guide-scroll]").evaluate((scroll) => scroll.scrollTop)).toBe(top);
  await page.keyboard.press("Escape");
  await expect(opener).toBeFocused();
});

for (const invalid of ["missing section", "unsafe resource"] as const) {
  test(`malformed published data is visible as an error (${invalid})`, async ({ page }) => {
    const guide = publishedGuide();
    if (invalid === "missing section") guide.sections.pop();
    else guide.sections.at(-1)!.content.resources![0].url = "javascript:alert('invalid')";
    await page.route(guideUrl, (route) => route.fulfill({ json: { guide } }));
    await page.goto("/steps");
    const opener = resourceOpener(page);
    await expect(opener).toBeEnabled();
    await opener.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("alert").filter({ hasText: "This guide could not be loaded" })).toBeVisible();
    await expect(page.locator("[data-guide-section]")).toHaveCount(0);
    await expect(page.locator("[data-guide-panel] a[href^='javascript:']")).toHaveCount(0);
    await page.keyboard.press("Escape");
    await expect(opener).toBeFocused();
  });
}

test("an unknown shared section is explained without hiding the published guide", async ({ page }) => {
  await page.route(guideUrl, (route) => route.fulfill({ json: { guide: publishedGuide() } }));
  await page.goto("/steps#m=us-english&s=retired-section");
  await expect(page.getByRole("status").filter({ hasText: "That section is not available" })).toBeVisible();
  await expect(page.locator(".guide-intro")).toHaveText("The published preparation guide.");
  await expect(page.locator("[data-guide-active='true']")).toHaveCount(0);
  expect(await page.locator("[data-guide-scroll]").evaluate((scroll) => scroll.scrollTop)).toBe(0);
  await page.keyboard.press("Escape");
  await expect(page).toHaveURL(/\/steps$/);
});

test("unmount releases native isolation and restores overflow longhands/priorities", async ({ page }) => {
  await page.route(guideUrl, (route) => route.fulfill({ json: { guide: publishedGuide() } }));
  await page.goto("/steps");
  const opener = resourceOpener(page);
  await expect(opener).toBeEnabled();
  await opener.focus();
  await page.evaluate(() => {
    document.body.style.setProperty("overflow-x", "clip", "important");
    document.documentElement.style.setProperty("overflow-y", "auto", "important");
  });
  await page.keyboard.press("Enter");
  await expectSectionInView(page, "resources");
  // Deliberate client navigation simulates a parent removing the provider. This
  // synthetic click is not a user bypass of native background inertness.
  await page.locator(".steps-target").evaluate((element) => (element as HTMLElement).click());
  await expect(page).toHaveURL(/\/path$/);
    // Next Cache Components retains hidden route DOM through React Activity.
    // It must release modality/side effects, not necessarily delete that DOM.
    await expect(page.locator("[data-guide-panel]").filter({ visible: true })).toHaveCount(0);
    expect(await page.evaluate(() => document.querySelector(":modal") === null)).toBe(true);
    expect(await page.evaluate(() => [
    document.body.style.getPropertyValue("overflow-x"), document.body.style.getPropertyPriority("overflow-x"),
    document.documentElement.style.getPropertyValue("overflow-y"), document.documentElement.style.getPropertyPriority("overflow-y"),
  ])).toEqual(["clip", "important", "auto", "important"]);
    const heading = page.getByRole("heading", { level: 1 });
    await heading.evaluate((element) => { element.setAttribute("tabindex", "-1"); (element as HTMLElement).focus(); });
    await expect(heading).toBeFocused();
});

test("a removed opener is never focused and dismissal still releases the page", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => { errors.push(error.message); });
  await page.route(guideUrl, (route) => route.fulfill({ json: { guide: publishedGuide() } }));
  await page.goto("/steps");
  const opener = resourceOpener(page);
  await expect(opener).toBeEnabled();
  await opener.focus();
  await page.keyboard.press("Enter");
  await expectSectionInView(page, "resources");
  await opener.evaluate((element) => element.remove());
  await page.keyboard.press("Escape");
  await expect(page.locator("[data-guide-panel]")).toHaveCount(0);
  expect(await page.evaluate(() => document.querySelector(":modal") === null)).toBe(true);
  await page.locator(".steps-target").focus();
  await expect(page.locator(".steps-target")).toBeFocused();
  expect(errors).toEqual([]);
});

test("guide links retain compact 24px targets, with 44px coarse-pointer and close targets", async ({ page }) => {
  await page.route(guideUrl, (route) => route.fulfill({ json: { guide: publishedGuide() } }));
  await page.goto("/steps");
  await expect(resourceOpener(page)).toBeEnabled();
  await page.evaluate(() => document.fonts.ready);
  const minimum = await page.evaluate(() => matchMedia("(pointer: coarse)").matches ? 44 : 24);
  // Steps also replaces its server body at hydration. Re-resolve all targets
  // while checking layout; never accept a detached/zero-sized snapshot.
  await expect(async () => {
    const sizes = await page.locator("[data-guide-link]").evaluateAll((links) => links.map((link) => {
      const box = link.getBoundingClientRect();
      return { width: box.width, height: box.height };
    }));
    expect(sizes.length).toBeGreaterThan(0);
    expect(sizes.every((size) => size.width >= 24 && size.height >= minimum)).toBe(true);
  }).toPass({ timeout: 15000 });
  await resourceOpener(page).click();
  await expectSectionInView(page, "resources");
  const close = await page.locator("[data-guide-close]").boundingBox();
  expect(close!.width).toBeGreaterThanOrEqual(44);
  expect(close!.height).toBeGreaterThanOrEqual(44);
});
