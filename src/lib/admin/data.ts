import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";
import { deadlineValueSchema } from "@/lib/platform/validation";
import { ADMIN_PAGE_SIZE, literalSearch } from "./input";
import {
  announcementSchema, auditSchema, catalogIntakeSchema, catalogMilestoneSchema,
  profileSchema, revisionSchema,
} from "./types";

export const PROFILE_FIELDS = "id,email,display_name,status,sessions_revoked_before,created_at,updated_at";
export const REVISION_FIELDS = "id,sequence,kind,milestone_id,intake_id,payload,state,reason,created_by,created_at,published_by,published_at";
const CATALOG_FIELDS = "id,country_code,definition,archetype,section_ids";
const ANNOUNCEMENT_FIELDS = "id,title,body,country_code,target_user_id,created_by,published_at,created_at,archived_at";

export class AdminDataError extends Error {
  constructor(readonly code: string) { super("Administration data could not be read."); }
}

export function checkDatabase(error: { code?: string } | null): void {
  if (error) throw new AdminDataError(error.code ?? "unavailable");
}

function parseRows<T>(schema: z.ZodType<T>, value: unknown): T[] {
  const parsed = z.array(schema).safeParse(value);
  if (!parsed.success) throw new AdminDataError("unavailable");
  return parsed.data;
}

function pageRows<T>(rows: T[]) {
  return { rows: rows.slice(0, ADMIN_PAGE_SIZE), hasMore: rows.length > ADMIN_PAGE_SIZE };
}

function range(page: number): [number, number] {
  const start = (page - 1) * ADMIN_PAGE_SIZE;
  return [start, start + ADMIN_PAGE_SIZE];
}

export async function adminDashboard(client: SupabaseClient) {
  const results = await Promise.all([
    client.from("profiles").select("id", { count: "exact", head: true }),
    client.from("content_revisions").select("id", { count: "exact", head: true }).eq("state", "draft"),
    client.from("announcements").select("id", { count: "exact", head: true }).is("archived_at", null),
    client.from("catalog_milestones").select("id", { count: "exact", head: true }),
  ]);
  const counts = results.map((result) => {
    checkDatabase(result.error);
    if (typeof result.count !== "number") throw new AdminDataError("unavailable");
    return result.count;
  });
  return { users: counts[0], drafts: counts[1], announcements: counts[2], milestones: counts[3] };
}

export async function adminUsers(client: SupabaseClient, page: number, query: string, status: string) {
  let request = client.from("profiles").select(PROFILE_FIELDS)
    .order("created_at", { ascending: false }).order("id").range(...range(page));
  if (query) request = request.ilike("email", literalSearch(query));
  if (status === "active" || status === "suspended") request = request.eq("status", status);
  const result = await request;
  checkDatabase(result.error);
  return pageRows(parseRows(profileSchema, result.data));
}

export async function adminCatalog(client: SupabaseClient, page: number, country: string) {
  let request = client.from("catalog_milestones").select(CATALOG_FIELDS)
    .order("country_code").order("id").range(...range(page));
  if (country) request = request.eq("country_code", country);
  const result = await request;
  checkDatabase(result.error);
  return pageRows(parseRows(catalogMilestoneSchema, result.data));
}

export async function revisionById(client: SupabaseClient, id: string) {
  const result = await client.from("content_revisions").select(REVISION_FIELDS).eq("id", id).maybeSingle();
  checkDatabase(result.error);
  if (!result.data) return null;
  const parsed = revisionSchema.safeParse(result.data);
  if (!parsed.success) throw new AdminDataError("unavailable");
  return parsed.data;
}

export async function latestRevision(client: SupabaseClient, kind: string, milestoneId: string, intakeId: string | null) {
  let request = client.from("content_revisions").select(REVISION_FIELDS)
    .eq("kind", kind).eq("milestone_id", milestoneId).order("sequence", { ascending: false }).limit(1);
  request = intakeId === null ? request.is("intake_id", null) : request.eq("intake_id", intakeId);
  const result = await request;
  checkDatabase(result.error);
  return parseRows(revisionSchema, result.data)[0] ?? null;
}

export async function revisionWorkspace(
  client: SupabaseClient, kind: "guide" | "deadline", milestoneId: string, intakeId: string | null, page: number,
) {
  const catalog = await client.from("catalog_milestones").select(CATALOG_FIELDS).eq("id", milestoneId).maybeSingle();
  checkDatabase(catalog.error);
  if (!catalog.data) return null;
  const milestone = catalogMilestoneSchema.safeParse(catalog.data);
  if (!milestone.success) throw new AdminDataError("unavailable");
  let historyRequest = client.from("content_revisions").select(REVISION_FIELDS)
    .eq("kind", kind).eq("milestone_id", milestoneId)
    .order("sequence", { ascending: false }).range(...range(page));
  historyRequest = intakeId === null ? historyRequest.is("intake_id", null) : historyRequest.eq("intake_id", intakeId);
  const [latest, history, intakes, published] = await Promise.all([
    latestRevision(client, kind, milestoneId, intakeId),
    historyRequest,
    client.from("catalog_intakes").select("id,country_code,label,start_date")
      .eq("country_code", milestone.data.country_code).order("start_date").limit(50),
    client.from("content_revisions").select(REVISION_FIELDS).eq("kind", "deadline")
      .eq("milestone_id", milestoneId).eq("state", "published").limit(51),
  ]);
  for (const result of [history, intakes, published]) checkDatabase(result.error);
  const intakeRows = parseRows(catalogIntakeSchema, intakes.data);
  if (intakeRows.length === 50 || (intakeId !== null && !intakeRows.some((intake) => intake.id === intakeId))) {
    throw new AdminDataError("22023");
  }
  const publishedRows = parseRows(revisionSchema, published.data);
  if (publishedRows.length > 50) throw new AdminDataError("unavailable");
  const deadlines = publishedRows.map((revision) => {
    const value = deadlineValueSchema.safeParse(revision.payload);
    if (!value.success) throw new AdminDataError("unavailable");
    return { intakeId: revision.intake_id, value: value.data };
  });
  return {
    milestone: milestone.data, latest, history: pageRows(parseRows(revisionSchema, history.data)),
    intakes: intakeRows.map((intake) => ({ id: intake.id, label: intake.label, startDate: intake.start_date })),
    publishedDeadlines: deadlines,
  };
}

export async function adminAnnouncements(client: SupabaseClient, page: number, archived: boolean) {
  let request = client.from("announcements").select(ANNOUNCEMENT_FIELDS)
    .order("created_at", { ascending: false }).order("id").range(...range(page));
  request = archived ? request.not("archived_at", "is", null) : request.is("archived_at", null);
  const result = await request;
  checkDatabase(result.error);
  return pageRows(parseRows(announcementSchema, result.data));
}

export async function adminAudit(client: SupabaseClient, page: number, action: string) {
  let request = client.from("audit_events").select("id,actor_id,action,subject_type,subject_id,details,created_at")
    .order("created_at", { ascending: false }).order("id", { ascending: false }).range(...range(page));
  if (action) request = request.ilike("action", literalSearch(action));
  const result = await request;
  checkDatabase(result.error);
  return pageRows(parseRows(auditSchema, result.data));
}
