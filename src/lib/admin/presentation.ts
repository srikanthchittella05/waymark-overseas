import { ARCHETYPE_SECTIONS, MILESTONE_ARCHETYPE } from "@/lib/engine/guides/archetypes";
import type { GuideContent } from "@/lib/engine/guides/types";
import type { Intake, Milestone } from "@/lib/engine/country-cycles";
import { isCalendarDate, parseGuideContent, type DeadlineValue } from "@/lib/platform/validation";
import { AdminInputError, parseJsonPayload } from "./input";

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** A lenient prose view allows editing empty prose without discarding nested data. */
export function guideProse(value: string, milestoneId: string) {
  const parsed = parseJsonPayload(value);
  const archetype = MILESTONE_ARCHETYPE[milestoneId];
  const sections = archetype ? ARCHETYPE_SECTIONS[archetype] : [];
  if (!record(parsed) || parsed.archetype !== archetype || typeof parsed.intro !== "string" ||
      !record(parsed.sections) || Object.keys(parsed.sections).length !== sections.length ||
      sections.some(({ id }) => !record((parsed.sections as Record<string, unknown>)[id]))) {
    throw new AdminInputError("Use the milestone's full guide structure before editing prose.");
  }
  return {
    document: parsed,
    intro: parsed.intro,
    sections: sections.map((spec) => {
      const section = (parsed.sections as Record<string, Record<string, unknown>>)[spec.id];
      return { ...spec, body: typeof section.body === "string" ? section.body : "" };
    }),
  };
}

export function editGuideProse(value: string, milestoneId: string, sectionId: string | null, text: string): string {
  const { document, sections } = guideProse(value, milestoneId);
  if (sectionId === null) document.intro = text;
  else {
    if (!sections.some((section) => section.id === sectionId)) throw new AdminInputError("Unknown guide section.");
    const section = (document.sections as Record<string, Record<string, unknown>>)[sectionId];
    if (text.trim()) section.body = text;
    else delete section.body;
  }
  return JSON.stringify(document, null, 2);
}

export function previewGuide(value: string, milestoneId: string): GuideContent {
  return parseGuideContent(milestoneId, parseJsonPayload(value));
}

export function deadlineDate(intake: Intake, value: Pick<DeadlineValue, "offsetDays" | "dueDate">): string {
  if (!isCalendarDate(intake.startDate) || (value.dueDate && !isCalendarDate(value.dueDate)) ||
      !Number.isInteger(value.offsetDays) || value.offsetDays < -365 || value.offsetDays > 1460) {
    throw new AdminInputError("A valid intake and deadline are required for the preview.");
  }
  if (value.dueDate) return value.dueDate;
  const date = new Date(`${intake.startDate}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() - value.offsetDays);
  return date.toISOString().slice(0, 10);
}

export function deadlineImpact(
  milestone: Pick<Milestone, "offsetDays">,
  intakes: Intake[],
  next: DeadlineValue,
  intakeId: string | null,
  published: Array<{ intakeId: string | null; value: DeadlineValue }>,
) {
  const countryDefault = published.find((item) => item.intakeId === null)?.value ?? milestone;
  return intakes.filter((intake) => intakeId === null || intake.id === intakeId).map((intake) => {
    const specific = published.find((item) => item.intakeId === intake.id)?.value;
    const before = deadlineDate(intake, specific ?? countryDefault);
    const shadowed = intakeId === null && Boolean(specific);
    const after = deadlineDate(intake, shadowed ? specific! : next);
    return {
      intakeId: intake.id, label: intake.label, before, after, shadowed,
      differenceDays: Math.round((Date.parse(`${after}T00:00:00Z`) - Date.parse(`${before}T00:00:00Z`)) / 86_400_000),
    };
  });
}

const AUDIT_KEYS = new Set([
  "reason", "status", "previous_status", "new_status", "kind", "milestone_id", "intake_id",
  "country_code", "revision_id", "previous_revision_id", "sequence", "announcement_id", "target_user_id",
]);

/** Deliberately do not render arbitrary JSON, session metadata or content payloads. */
export function auditDetails(input: unknown): Array<[string, string]> {
  if (!record(input)) return [];
  return Object.entries(input).flatMap(([key, value]) => {
    if (!AUDIT_KEYS.has(key) || (value !== null && !["string", "number", "boolean"].includes(typeof value))) return [];
    return [[key.replaceAll("_", " "), value === null ? "None" : String(value).slice(0, 2000)] as [string, string]];
  });
}

export function adminErrorMessage(error: unknown): string {
  const code = record(error) && typeof error.code === "string" ? error.code : "";
  if (code === "40001" || code === "conflict") return "This record changed in another session. Reload and review the latest revision before retrying.";
  if (code === "42501" || code === "forbidden") return "This action is not permitted. Your access may have changed, or this account is protected.";
  if (code === "23503" || code === "P0002") return "The selected record is no longer available. Reload and choose it again.";
  if (["22023", "23514", "23505", "22P02"].includes(code)) return "The submitted change was rejected. Check the fields and reload the current record.";
  return "Waymark could not complete this request. No success was confirmed; reload before retrying.";
}
