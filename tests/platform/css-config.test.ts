import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { sep } from "node:path";
import nextConfig from "../../next.config";

test("Tailwind transforms only the global entry, leaving CSS modules to Turbopack", () => {
  // The basename is unique in source and remains stable across inferred roots.
  // Do not apply `as: "*.css"` to *.module.css: it changes the output type.
  assert.deepEqual(nextConfig.turbopack?.rules, {
    "globals.css": {
      condition: { not: "foreign" },
      loaders: ["@tailwindcss/turbopack"],
      as: "*.css",
    },
  });
});

test("globals.css is the only source stylesheet requiring Tailwind processing", () => {
  const sourceRoot = new URL("../../src/", import.meta.url);
  const cssPaths = readdirSync(sourceRoot, { recursive: true, encoding: "utf8" })
    .filter((path) => path.endsWith(".css"))
    .map((path) => path.split(sep).join("/"))
    .sort();
  const tailwindSyntax = /@(?:reference|theme|apply|utility|custom-variant|variant|source|config|plugin|tailwind)\b|@import\s+["']tailwindcss(?:\/[^"']*)?["']|\b(?:theme|--theme|--alpha|--spacing)\(/;
  const tailwindEntries = cssPaths.filter((path) => {
    const css = readFileSync(new URL(path, sourceRoot), "utf8")
      .replace(/\/\*[\s\S]*?\*\//g, "");
    return tailwindSyntax.test(css);
  });

  // New Tailwind entrypoints need an explicit rule; never broaden to *.css.
  assert.deepEqual(tailwindEntries, ["app/globals.css"]);
  assert.deepEqual(cssPaths.filter((path) => path.split("/").at(-1) === "globals.css"), ["app/globals.css"]);
});

test("the root layout still imports the global Tailwind stylesheet", () => {
  const layout = readFileSync(new URL("../../src/app/layout.tsx", import.meta.url), "utf8");
  assert.match(layout, /import\s+["']\.\/globals\.css["']/);
});

test("verification output remains isolated by WAYMARK_BUILD_DIR", () => {
  assert.equal(nextConfig.distDir, process.env.WAYMARK_BUILD_DIR || ".next");
});
