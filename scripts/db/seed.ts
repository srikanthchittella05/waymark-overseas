import { writeFile } from "node:fs/promises";
import { buildCatalog } from "../export-catalog";

function literal(value: string): string {
  if (value.includes("\0")) throw new Error("SQL values cannot contain a NUL byte.");
  return `'${value.replaceAll("'", "''")}'`;
}

function json(value: unknown): string {
  const encoded = JSON.stringify(value);
  if (encoded === undefined) throw new Error("Catalog contains an undefined value.");
  return `${literal(encoded)}::jsonb`;
}

/** Generate SQL only. No database connection, provider credentials or network I/O. */
export async function buildSeedSql(): Promise<string> {
  const catalog = await buildCatalog();
  const lines = [
    "-- Waymark canonical catalog. Apply after migrations, as the postgres operator.",
    "-- Re-runs update baseline catalog metadata, never admin revisions/publications.",
    "-- Initial guides are bootstrap publications: audited, without 104 update notices.",
    "begin;",
    "set local standard_conforming_strings = on;",
  ];

  for (const country of catalog.countries) {
    lines.push(`insert into public.catalog_countries (code, name, admission, notes) values (${[
      country.code, country.name, country.admission, country.notes,
    ].map(literal).join(", ")}) on conflict (code) do update set name = excluded.name, admission = excluded.admission, notes = excluded.notes;`);
  }
  for (const intake of catalog.intakes) {
    lines.push(`insert into public.catalog_intakes (id, country_code, label, start_date) values (${[
      intake.id, intake.country_code, intake.label, intake.start_date,
    ].map(literal).join(", ")}) on conflict (id) do update set country_code = excluded.country_code, label = excluded.label, start_date = excluded.start_date;`);
  }
  for (const milestone of catalog.milestones) {
    lines.push(`insert into public.catalog_milestones (id, country_code, definition, archetype, section_ids) values (${literal(milestone.id)}, ${literal(milestone.country_code)}, ${json(milestone.definition)}, ${literal(milestone.archetype)}, array[${milestone.section_ids.map(literal).join(", ")}]) on conflict (id) do update set country_code = excluded.country_code, definition = excluded.definition, archetype = excluded.archetype, section_ids = excluded.section_ids;`);
  }
  for (const guide of catalog.guides) {
    // Skip even an unpublished admin scope. Seeding must not invalidate an
    // administrator's optimistic latest-id token or change publication history.
    lines.push(`with seeded as (
  insert into public.content_revisions (kind, milestone_id, payload, state, reason, published_at)
  select 'guide', ${literal(guide.milestone_id)}, ${json(guide.payload)}, 'published', 'Canonical catalog bootstrap', now()
  where not exists (select 1 from public.content_revisions where kind = 'guide' and milestone_id = ${literal(guide.milestone_id)} and intake_id is null)
  returning id, milestone_id
)
insert into public.audit_events (action, subject_type, subject_id, details)
select 'catalog.guide_seeded', 'revision', id::text, jsonb_build_object('milestone_id', milestone_id) from seeded;`);
  }
  lines.push("commit;", "");
  return lines.join("\n");
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  if (args.length !== 0 && (args.length !== 2 || args[0] !== "--output" || !args[1])) {
    throw new Error("Usage: npx tsx scripts/db/seed.ts [--output path.sql]");
  }
  const sql = await buildSeedSql();
  if (args[1]) await writeFile(args[1], sql, { encoding: "utf8" });
  else process.stdout.write(sql);
}

if (process.argv[1]?.replaceAll("\\", "/").endsWith("/db/seed.ts")) {
  main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : "Catalog seed generation failed.");
    process.exitCode = 1;
  });
}
