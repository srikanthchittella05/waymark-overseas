import { defineConfig } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3214";

export default defineConfig({
  testDir: "./tests/e2e",
  workers: 2,
  timeout: 45000,
  expect: { timeout: 15000 },
  retries: process.env.CI ? 1 : 0,
  forbidOnly: Boolean(process.env.CI),
  use: { baseURL, trace: "retain-on-failure", screenshot: "only-on-failure" },
  projects: [
    { name: "chromium-desktop", use: { browserName: "chromium", viewport: { width: 1440, height: 900 } } },
    { name: "chromium-mobile", use: { browserName: "chromium", viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
    { name: "webkit-desktop", use: { browserName: "webkit", viewport: { width: 1440, height: 900 } } },
    { name: "webkit-mobile", use: { browserName: "webkit", viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ],
  webServer: process.env.PLAYWRIGHT_BASE_URL ? undefined : {
    command: "npm run build && npm run start -- --hostname 127.0.0.1 --port 3214",
    url: baseURL, reuseExistingServer: false, timeout: 120000,
  },
});
