import { z } from "zod";

export type AdminActionState = {
  status: "idle" | "success" | "error" | "conflict";
  message: string;
  revisionId?: string;
};

export const initialActionState: AdminActionState = { status: "idle", message: "" };

export const profileSchema = z.object({
  id: z.uuid(), email: z.string().nullable(), display_name: z.string().nullable(),
  status: z.enum(["active", "suspended"]), sessions_revoked_before: z.string().nullable(),
  created_at: z.string(), updated_at: z.string(),
});
export type AdminProfile = z.infer<typeof profileSchema>;

export const revisionSchema = z.object({
  id: z.uuid(), sequence: z.union([z.number().int().positive().max(Number.MAX_SAFE_INTEGER), z.string().regex(/^[1-9]\d*$/)]), kind: z.enum(["guide", "deadline"]),
  milestone_id: z.string(), intake_id: z.string().nullable(), payload: z.unknown(),
  state: z.enum(["draft", "published", "archived"]), reason: z.string(),
  created_by: z.string().nullable(), created_at: z.string(),
  published_by: z.string().nullable(), published_at: z.string().nullable(),
});
export type AdminRevision = z.infer<typeof revisionSchema>;

export const catalogMilestoneSchema = z.object({
  id: z.string(), country_code: z.string(), archetype: z.string(), section_ids: z.array(z.string()),
  definition: z.object({ title: z.string(), offsetDays: z.number().int(), hardDeadline: z.boolean(),
    source: z.string(), confidence: z.enum(["verified", "typical", "estimate"]) }),
});
export type AdminMilestone = z.infer<typeof catalogMilestoneSchema>;

export const catalogIntakeSchema = z.object({
  id: z.string(), country_code: z.string(), label: z.string(), start_date: z.string(),
});

export const announcementSchema = z.object({
  id: z.uuid(), title: z.string(), body: z.string(), country_code: z.string().nullable(),
  target_user_id: z.string().nullable(), created_by: z.string().nullable(),
  published_at: z.string().nullable(), created_at: z.string(), archived_at: z.string().nullable(),
});
export type AdminAnnouncement = z.infer<typeof announcementSchema>;

export const auditSchema = z.object({
  id: z.union([z.string(), z.number()]), actor_id: z.string().nullable(), action: z.string(),
  subject_type: z.string(), subject_id: z.string().nullable(), details: z.unknown(), created_at: z.string(),
});
export type AdminAuditEvent = z.infer<typeof auditSchema>;

export type AdminSearchParams = Promise<Record<string, string | string[] | undefined>>;
