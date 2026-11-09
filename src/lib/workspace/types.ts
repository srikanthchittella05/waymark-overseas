import { z } from "zod";
import { COUNTRY_CYCLES } from "@/lib/engine/country-cycles";
import { deadlineValueSchema, httpsUrlSchema, milestoneIdSchema, targetSchema, dateSchema } from "@/lib/platform/validation";

export const viewerSchema = z.object({
  id: z.uuid(), email: z.string().max(320), displayName: z.string().max(200),
  isAdmin: z.boolean(), aal: z.enum(["aal1", "aal2"]),
});
export type WorkspaceViewer = z.infer<typeof viewerSchema>;

export const publishedDeadlineSchema = z.object({
  id: z.uuid(), milestone_id: milestoneIdSchema, intake_id: z.string().nullable(), payload: deadlineValueSchema,
});
export type PublishedDeadline = z.infer<typeof publishedDeadlineSchema>;

export const checkpointStatusSchema = z.enum([
  "not_started", "in_progress", "evidence_submitted", "complete", "skipped_with_reason", "blocked",
]);
// Blocked is derived from unmet dependencies, never accepted as stored progress.
const storedCheckpointStatusSchema = checkpointStatusSchema.exclude(["blocked"]);
export const checkpointEvidenceSchema = z.object({
  title: z.string().trim().min(1).max(300),
  url: httpsUrlSchema.optional(),
  note: z.string().trim().max(4000).optional(),
  verifiedOn: dateSchema.optional(),
}).strict();

export const checkpointProgressSchema = z.object({
  status: storedCheckpointStatusSchema,
  startedAt: z.string().optional(),
  completedAt: z.string().optional(),
  skippedReason: z.string().trim().min(1).max(2000).optional(),
  evidence: z.array(checkpointEvidenceSchema).max(50).default([]),
  history: z.array(z.object({
    at: z.string(),
    status: storedCheckpointStatusSchema,
    note: z.string().max(4000).optional(),
  })).max(100).default([]),
  updatedAt: z.string().optional(),
}).strict();
export type CheckpointStatus = z.infer<typeof checkpointStatusSchema>;
export type CheckpointProgress = z.infer<typeof checkpointProgressSchema>;

const checkpointRequestBase = z.object({
  planId: z.uuid(), milestoneId: milestoneIdSchema,
  expectedVersion: z.number().int().nonnegative(),
});
export const checkpointActionSchema = z.discriminatedUnion("action", [
  checkpointRequestBase.extend({ action: z.literal("start") }).strict(),
  checkpointRequestBase.extend({ action: z.literal("evidence"), evidence: checkpointEvidenceSchema }).strict(),
  checkpointRequestBase.extend({ action: z.literal("complete"), evidence: checkpointEvidenceSchema.optional() }).strict(),
  checkpointRequestBase.extend({ action: z.literal("skip"), reason: z.string().trim().min(1).max(2000) }).strict(),
]);

export const workspaceDataSchema = z.object({
  configured: z.boolean(), user: viewerSchema.nullable(), profile: targetSchema,
  done: z.record(milestoneIdSchema, z.boolean()),
  checkpoints: z.record(milestoneIdSchema, checkpointProgressSchema).optional(),
  planId: z.uuid().nullable(),
  planVersion: z.number().int().nonnegative(), hasSavedTarget: z.boolean(),
  deadlineRevisions: z.array(publishedDeadlineSchema).max(4000),
}).superRefine((workspace, context) => {
  const country = COUNTRY_CYCLES.find((item) => item.code === workspace.profile.countryCode);
  if ((!workspace.user && (workspace.planId || workspace.hasSavedTarget || Object.keys(workspace.done).length)) ||
      (workspace.hasSavedTarget && !workspace.planId) ||
      Object.keys(workspace.done).some((id) => !country?.milestones.some((step) => step.id === id)) ||
      Object.entries(workspace.checkpoints ?? {}).some(([id, progress]) =>
        !country?.milestones.some((step) => step.id === id) ||
        Boolean(workspace.done[id]) !== (progress.status === "complete"))) {
    context.addIssue({ code: "custom", message: "The workspace ownership state is not valid." });
  }
});
export type WorkspaceData = z.infer<typeof workspaceDataSchema>;

export function resolveDeadlineOverrides(revisions: PublishedDeadline[], intakeId: string) {
  const applicable = [...revisions].sort((a, b) => Number(a.intake_id !== null) - Number(b.intake_id !== null));
  return Object.fromEntries(applicable.filter((revision) => revision.intake_id === null || revision.intake_id === intakeId)
    .map((revision) => [revision.milestone_id, revision.payload]));
}
