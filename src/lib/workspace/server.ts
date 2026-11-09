import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";
import { DEFAULT_PROFILE } from "@/lib/engine/defaults";
import { getAuthContext, requireUser } from "@/lib/auth/session";
import { getSupabaseConfig } from "@/lib/supabase/config";
import { assertSameOrigin } from "@/lib/platform/http";
import { databaseError, RequestError } from "@/lib/platform/errors";
import { planRecordSchema } from "@/lib/platform/validation";
import { checkpointProgressSchema, publishedDeadlineSchema, workspaceDataSchema, type WorkspaceData, type WorkspaceViewer } from "./types";

export async function readPublishedDeadlines(client: SupabaseClient) {
  const { data, error } = await client.from("content_revisions")
    .select("id,milestone_id,intake_id,payload").eq("kind", "deadline").eq("state", "published").limit(4000);
  if (error) databaseError(error);
  return z.array(publishedDeadlineSchema).parse(data ?? []);
}

export async function readWorkspace(client: SupabaseClient | null, user: WorkspaceViewer | null): Promise<WorkspaceData> {
  const base: WorkspaceData = {
    configured: getSupabaseConfig() !== null, user, profile: { ...DEFAULT_PROFILE }, done: {}, checkpoints: {},
    planId: null, planVersion: 0, hasSavedTarget: false,
    deadlineRevisions: client ? await readPublishedDeadlines(client) : [],
  };
  if (!user || !client) return base;
  const profileResult = await client.from("profiles").select("active_plan_id").eq("id", user.id).single();
  if (profileResult.error) databaseError(profileResult.error);
  const profile = z.object({ active_plan_id: z.uuid().nullable() }).parse(profileResult.data);
  if (!profile.active_plan_id) return base;
  const result = await client.from("plans").select("*").eq("id", profile.active_plan_id).eq("user_id", user.id).single();
  if (result.error) databaseError(result.error);
  const plan = planRecordSchema.parse(result.data);
  const progressResult = await client.from("step_progress")
    .select("milestone_id,done,status,started_at,completed_at,skipped_reason,evidence,history,updated_at")
    .eq("plan_id", plan.id);
  if (progressResult.error) databaseError(progressResult.error);
  const progress = z.array(z.object({
    milestone_id: z.string(), done: z.boolean(), status: checkpointProgressSchema.shape.status,
    started_at: z.string().nullable(), completed_at: z.string().nullable(),
    skipped_reason: z.string().nullable(), evidence: checkpointProgressSchema.shape.evidence,
    history: checkpointProgressSchema.shape.history, updated_at: z.string(),
  })).parse(progressResult.data ?? []);
  const latestPlan = await client.from("plans").select("version").eq("id", plan.id).eq("user_id", user.id).single();
  if (latestPlan.error) databaseError(latestPlan.error);
  const latestProfile = await client.from("profiles").select("active_plan_id").eq("id", user.id).single();
  if (latestProfile.error) databaseError(latestProfile.error);
  if (z.object({ version: z.number().int() }).parse(latestPlan.data).version !== plan.version ||
      z.object({ active_plan_id: z.uuid().nullable() }).parse(latestProfile.data).active_plan_id !== plan.id) {
    throw new RequestError(409, "conflict", "Your active plan changed. Reload before saving.");
  }
  return workspaceDataSchema.parse({ ...base,
    profile: { countryCode: plan.country_code, intakeId: plan.intake_id, stage: plan.stage },
    done: Object.fromEntries(progress.filter((step) => step.done).map((step) => [step.milestone_id, true])),
    checkpoints: Object.fromEntries(progress.map((step) => [step.milestone_id, {
      status: step.status, evidence: step.evidence, history: step.history,
      ...(step.started_at ? { startedAt: step.started_at } : {}),
      ...(step.completed_at ? { completedAt: step.completed_at } : {}),
      ...(step.skipped_reason ? { skippedReason: step.skipped_reason } : {}),
      updatedAt: step.updated_at,
    }])),
    planId: plan.id, planVersion: plan.version, hasSavedTarget: true,
  });
}

export async function getWorkspace() {
  const context = await getAuthContext();
  return readWorkspace(context.client, context.user);
}

export async function authorizeWorkspaceWrite(request: Request) {
  const config = getSupabaseConfig();
  if (!config) throw new RequestError(503, "unconfigured", "Cloud saving is not configured yet. Your preview is not being uploaded.");
  assertSameOrigin(request, config.siteUrl);
  const context = await requireUser();
  if (request.headers.get("x-waymark-account") !== context.user.id) {
    throw new RequestError(409, "account_changed", "Your signed-in account changed. Reload before saving.");
  }
  return context;
}
