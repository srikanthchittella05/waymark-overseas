import { z } from "zod";
import { COUNTRY_CYCLES } from "@/lib/engine/country-cycles";
import { STAGES } from "@/lib/engine/plan";
import { ARCHETYPE_SECTIONS, MILESTONE_ARCHETYPE } from "@/lib/engine/guides/archetypes";
import type { GuideContent } from "@/lib/engine/guides/types";

const text = (maximum = 4000) => z.string().trim().min(1).max(maximum);

export function isCalendarDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export const dateSchema = z.string().refine(isCalendarDate, "Use a real date in YYYY-MM-DD format.");
export const httpsUrlSchema = z.string().max(2048).refine((value) => {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password && Boolean(url.hostname);
  } catch {
    return false;
  }
}, "Use a complete HTTPS URL without embedded credentials.");

const resourceSchema = z.object({
  title: text(300),
  kind: z.enum(["official", "book", "video", "channel", "practice", "site", "app", "tool", "cost"]),
  url: httpsUrlSchema.optional(),
  why: text(8000),
  free: z.boolean().optional(),
  cost: text(4000).optional(),
  verifiedOn: dateSchema,
}).strict();

const examSchema = z.object({
  name: text(300), accepted: z.boolean(), requiredScore: text().optional(),
  note: text(12000).optional(), validity: text().optional(), howToBook: text(12000).optional(),
  leadTime: text().optional(), cost: text().optional(), url: httpsUrlSchema.optional(),
  verifiedOn: dateSchema,
}).strict();

const subsectionSchema = z.object({
  title: text(300), what: text(12000).optional(), format: text(12000).optional(),
  score: text(12000).optional(), topics: z.array(text()).max(100).optional(),
  tip: text(12000).optional(), resources: z.array(resourceSchema).max(100).optional(),
}).strict();

const roadmapSchema = z.object({
  label: text(300), title: text(300), goal: text(12000), hours: text().optional(),
  focus: z.array(text(12000)).min(1).max(100), checkpoint: text(12000).optional(),
  resources: z.array(resourceSchema).max(100).optional(),
}).strict();

export const sectionContentSchema = z.object({
  body: text(40000).optional(), points: z.array(text(12000)).max(100).optional(),
  exams: z.array(examSchema).max(50).optional(),
  subsections: z.array(subsectionSchema).max(100).optional(),
  roadmap: z.array(roadmapSchema).max(100).optional(),
  resources: z.array(resourceSchema).max(200).optional(),
  callout: z.object({ tone: z.enum(["watch", "good"]), title: text(300), body: text(12000) }).strict().optional(),
}).strict().refine((section) => Object.values(section).some((value) =>
  typeof value === "string" ? value.trim().length > 0 : Array.isArray(value) ? value.length > 0 : Boolean(value)),
"Every guide section must contain useful content.");

export const milestoneIdSchema = z.string().refine((id) => Boolean(MILESTONE_ARCHETYPE[id]), "Unknown milestone.");

export function guideContentSchemaFor(milestoneId: string) {
  const archetype = MILESTONE_ARCHETYPE[milestoneId];
  const expected = archetype ? ARCHETYPE_SECTIONS[archetype].map((section) => section.id) : [];
  return z.object({
    archetype: z.literal(archetype ?? "unknown"), intro: text(16000),
    sections: z.record(z.string(), sectionContentSchema),
  }).strict().superRefine((guide, context) => {
    const actual = Object.keys(guide.sections);
    if (!archetype || actual.length !== expected.length || expected.some((id) => !actual.includes(id))) {
      context.addIssue({ code: "custom", path: ["sections"], message: "Use exactly this milestone's canonical guide sections." });
    }
  });
}

export function parseGuideContent(milestoneId: string, input: unknown): GuideContent {
  milestoneIdSchema.parse(milestoneId);
  return guideContentSchemaFor(milestoneId).parse(input) as GuideContent;
}

export const deadlineValueSchema = z.object({
  offsetDays: z.number().int().min(-365).max(1460),
  dueDate: dateSchema.optional(), hardDeadline: z.boolean(), source: httpsUrlSchema,
  confidence: z.enum(["verified", "typical", "estimate"]), verifiedOn: dateSchema,
}).strict();
export type DeadlineValue = z.infer<typeof deadlineValueSchema>;
export type DeadlineOverrides = Record<string, DeadlineValue>;

export const targetSchema = z.object({
  countryCode: text(2), intakeId: text(100), stage: z.enum(STAGES),
}).strict().superRefine((target, context) => {
  const country = COUNTRY_CYCLES.find((item) => item.code === target.countryCode);
  if (!country?.intakes.some((item) => item.id === target.intakeId)) {
    context.addIssue({ code: "custom", path: ["intakeId"], message: "Choose an intake belonging to this country." });
  }
});

export const stepWriteSchema = z.object({
  planId: z.uuid(), milestoneId: milestoneIdSchema, done: z.boolean(),
  expectedVersion: z.number().int().nonnegative(),
}).strict();
export const resetPlanSchema = z.object({ planId: z.uuid(), expectedVersion: z.number().int().nonnegative() }).strict();

export const legacyImportSchema = z.object({
  target: targetSchema, completedIds: z.array(milestoneIdSchema).max(104), confirmed: z.literal(true),
}).strict().superRefine((input, context) => {
  const country = COUNTRY_CYCLES.find((item) => item.code === input.target.countryCode);
  if (new Set(input.completedIds).size !== input.completedIds.length ||
      input.completedIds.some((id) => !country?.milestones.some((milestone) => milestone.id === id))) {
    context.addIssue({ code: "custom", path: ["completedIds"], message: "Only unique steps for the selected country can be imported." });
  }
});

export const revisionInputSchema = z.object({
  kind: z.enum(["guide", "deadline"]), milestoneId: milestoneIdSchema,
  intakeId: z.string().max(100).nullable(), payload: z.unknown(), reason: text(2000).min(8),
  expectedLatestId: z.uuid().nullable(),
}).strict();

export type RevisionInput = Omit<z.infer<typeof revisionInputSchema>, "payload"> & { payload: GuideContent | DeadlineValue };

export function validateRevision(input: unknown): RevisionInput {
  const value = revisionInputSchema.parse(input);
  const country = COUNTRY_CYCLES.find((item) => item.milestones.some((milestone) => milestone.id === value.milestoneId));
  if ((value.kind === "guide" && value.intakeId !== null) ||
      (value.intakeId !== null && !country?.intakes.some((item) => item.id === value.intakeId))) {
    throw new z.ZodError([{ code: "custom", path: ["intakeId"], message: "Choose a valid intake for this milestone; guides are not intake-specific." }]);
  }
  const payload = value.kind === "guide" ? parseGuideContent(value.milestoneId, value.payload) : deadlineValueSchema.parse(value.payload);
  if (value.kind === "deadline" && "dueDate" in payload && payload.dueDate && value.intakeId === null) {
    throw new z.ZodError([{ code: "custom", path: ["payload", "dueDate"], message: "An exact deadline requires a specific intake." }]);
  }
  return { ...value, payload };
}

export const announcementInputSchema = z.object({
  title: text(200), body: text(10000), countryCode: z.string().nullable(), targetUserId: z.uuid().nullable(),
}).strict().refine((value) => value.countryCode === null || COUNTRY_CYCLES.some((country) => country.code === value.countryCode),
"Choose a supported audience country.");

export const userStatusInputSchema = z.object({
  userId: z.uuid(), status: z.enum(["active", "suspended"]), reason: text(2000).min(8),
}).strict();

export const planRecordSchema = z.object({
  id: z.uuid(), user_id: z.uuid(), country_code: z.string(), intake_id: z.string(),
  stage: z.enum(STAGES), version: z.number().int().nonnegative(),
  created_at: z.string(), updated_at: z.string(),
});
export type PlanRecord = z.infer<typeof planRecordSchema>;

export function validationMessage(error: unknown): string {
  return error instanceof z.ZodError ? error.issues[0]?.message ?? "Check the submitted fields." : "Check the submitted fields.";
}
