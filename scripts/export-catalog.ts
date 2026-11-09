import { COUNTRY_CYCLES } from "../src/lib/engine/country-cycles";
import { ARCHETYPE_SECTIONS, MILESTONE_ARCHETYPE } from "../src/lib/engine/guides/archetypes";
import { guideFor } from "../src/lib/engine/guides/content";
import { parseGuideContent } from "../src/lib/platform/validation";

export async function buildCatalog() {
  const countries = COUNTRY_CYCLES.map(({ code, name, admission, notes }) => ({ code, name, admission, notes }));
  const intakes = COUNTRY_CYCLES.flatMap((country) => country.intakes.map((intake) => ({
    id: intake.id, country_code: country.code, label: intake.label, start_date: intake.startDate,
  })));
  const milestones = COUNTRY_CYCLES.flatMap((country) => country.milestones.map((definition) => {
    const archetype = MILESTONE_ARCHETYPE[definition.id];
    return { id: definition.id, country_code: country.code, definition, archetype,
      section_ids: ARCHETYPE_SECTIONS[archetype].map((section) => section.id) };
  }));
  const guides = await Promise.all(milestones.map(async (milestone) => {
    const guide = await guideFor(milestone.id);
    if (!guide) throw new Error(`Missing guide: ${milestone.id}`);
    const payload = parseGuideContent(milestone.id, { archetype: guide.archetype, intro: guide.intro,
      sections: Object.fromEntries(guide.sections.map((section) => [section.id, section.content])) });
    return { milestone_id: milestone.id, payload };
  }));
  return { countries, intakes, milestones, guides };
}

if (process.argv[1]?.endsWith("export-catalog.ts")) {
  buildCatalog().then((catalog) => process.stdout.write(`${JSON.stringify(catalog)}\n`)).catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : "Catalog export failed.");
    process.exitCode = 1;
  });
}
