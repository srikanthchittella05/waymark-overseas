import { test, expect } from "@playwright/test";

test("overdue milestones fill their own editorial rows without an empty panel", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/today");
  // A stable layout fixture keeps this regression useful even after the sample
  // intake date changes and the real number of overdue milestones changes.
  await page.evaluate(() => {
    const wrapper = document.createElement("div");
    wrapper.className = "today";
    wrapper.innerHTML = `<section class="today-risk"><ul class="today-risk-list" id="risk-layout-fixture">
      <li class="today-risk-item">Overdue milestone</li></ul></section>`;
    document.body.append(wrapper);
  });
  const list = page.locator("#risk-layout-fixture");
  const one = await list.evaluate((element) => {
    const card = element.querySelector<HTMLElement>(".today-risk-item")!;
    const swatch = document.createElement("span");
    swatch.style.background = "var(--color-signal-wash)";
    document.body.append(swatch);
    const signalWash = getComputedStyle(swatch).backgroundColor;
    swatch.remove();
    return {
      background: getComputedStyle(element).backgroundColor,
      width: element.getBoundingClientRect().width,
      cardWidth: card.getBoundingClientRect().width,
      cardLeftRule: getComputedStyle(card).borderLeftWidth,
      cardBackground: getComputedStyle(card).backgroundColor,
      signalWash,
    };
  });
  expect(Math.abs(one.cardWidth - one.width)).toBeLessThanOrEqual(1);
  expect(one.background).toBe("rgba(0, 0, 0, 0)");
  expect(one.cardLeftRule).toBe("0px");
  expect(one.cardBackground).not.toBe(one.background);
  expect(one.cardBackground).toBe(one.signalWash);

  await list.evaluate((element) => {
    for (let index = 1; index < 4; index += 1) {
      const card = document.createElement("li");
      card.className = "today-risk-item";
      card.textContent = `Overdue milestone ${index + 1}`;
      element.append(card);
    }
  });
  for (const width of [320, 390, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await list.locator(".today-risk-item").count()).toBe(4);
    // vw-sized footer typography can lag a frame behind a scripted viewport resize.
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth), { message: `${width}px reflow` }).toBeLessThanOrEqual(1);
    expect(await list.locator(".today-risk-item").first().evaluate((card) => Math.abs(card.getBoundingClientRect().width - card.parentElement!.getBoundingClientRect().width)), `${width}px full-width row`).toBeLessThanOrEqual(1);
  }
});
