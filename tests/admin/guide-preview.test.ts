import assert from "node:assert/strict";
import test, { after } from "node:test";
import { createRequire } from "node:module";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ARCHETYPE_SECTIONS } from "../../src/lib/engine/guides/archetypes";
import { guideFor, milestonesWithGuides } from "../../src/lib/engine/guides/content";
import type { GuideContent } from "../../src/lib/engine/guides/types";
import { parseGuideContent } from "../../src/lib/platform/validation";

// These assertions cover markup/content, not CSS or browser accessibility.
const require = createRequire(import.meta.url);
const originalCssLoader = require.extensions[".css"];
require.extensions[".css"] = (module) => { module.exports = {}; };
after(() => {
  if (originalCssLoader) require.extensions[".css"] = originalCssLoader;
  else delete require.extensions[".css"];
});

test("the meaningful guide preview includes all supported nested details", async () => {
  const { GuidePreview } = await import("../../src/components/admin/guide-preview");
  const resource = { title: "Nested authority", kind: "official" as const, url: "https://example.org/nested", why: "A specific reason", free: false, cost: "Resource cost", verifiedOn: "2026-10-20" };
  const guide: GuideContent = {
    archetype: "language-test", intro: "Guide introduction",
    sections: Object.fromEntries(ARCHETYPE_SECTIONS["language-test"].map(({ id }) => [id, { body: `Section ${id} body` }])),
  };
  guide.sections.exams = {
    body: "Readable prose", points: ["A precise point"],
    exams: [{ name: "Exam name", accepted: false, requiredScore: "Required score value", note: "Exam note", validity: "Exam validity", howToBook: "Booking instructions", leadTime: "Exam lead time", cost: "Exam cost", url: "https://example.org/exam", verifiedOn: "2026-10-20" }],
    subsections: [{ title: "Subsection title", what: "What value", format: "Format value", score: "Score value", topics: ["A detailed topic"], tip: "Subsection tip", resources: [resource] }],
    roadmap: [{ label: "Weeks one to two", title: "Roadmap title", goal: "Roadmap goal", hours: "Study hours", focus: ["A specific focus"], checkpoint: "Roadmap checkpoint", resources: [resource] }],
    resources: [resource], callout: { tone: "watch", title: "Callout title", body: "Callout body" },
  };
  const html = renderToStaticMarkup(createElement(GuidePreview, { guide: parseGuideContent("us-english", guide) }));
  for (const text of [guide.intro, "Readable prose", "A precise point", "Exam name", "Not accepted", "Required score value", "Exam note", "Exam validity", "Booking instructions", "Exam lead time", "Exam cost", "Subsection title", "What value", "Format value", "Score value", "A detailed topic", "Subsection tip", "Weeks one to two", "Roadmap title", "Roadmap goal", "Study hours", "A specific focus", "Roadmap checkpoint", "Nested authority", "A specific reason", "Resource cost", "Callout title", "Callout body", "20 Oct 2026"]) {
    assert.ok(html.includes(text), `Preview omitted ${text}`);
  }
  assert.match(html, /rel="noopener noreferrer"/);
});

test("guide preview escapes text instead of executing content as HTML", async () => {
  const { GuidePreview } = await import("../../src/components/admin/guide-preview");
  const guide: GuideContent = { archetype: "language-test", intro: '<img src=x onerror="bad()">',
    sections: Object.fromEntries(ARCHETYPE_SECTIONS["language-test"].map(({ id }) => [id, { body: "Safe section" }])),
  };
  const html = renderToStaticMarkup(createElement(GuidePreview, { guide }));
  assert.ok(!html.includes("<img"));
  assert.ok(html.includes("&lt;img"));
});

test("all bundled guide baselines pass the same schema used by the editor", async () => {
  const ids = milestonesWithGuides();
  assert.ok(ids.length > 0);
  for (const id of ids) {
    const guide = await guideFor(id);
    assert.ok(guide, `Missing baseline ${id}`);
    const value = parseGuideContent(id, { archetype: guide.archetype, intro: guide.intro,
      sections: Object.fromEntries(guide.sections.map((section) => [section.id, section.content])) });
    assert.equal(Object.keys(value.sections).length, ARCHETYPE_SECTIONS[value.archetype].length);
  }
});
