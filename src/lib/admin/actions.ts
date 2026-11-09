"use server";

import { revalidatePath } from "next/cache";
import { AuthError, requireAdmin } from "@/lib/auth/session";
import { validateRevision, validationMessage, type RevisionInput } from "@/lib/platform/validation";
import { z } from "zod";
import {
  AdminInputError, confirmed, ensureLatestRevision, field, optionalUuid, parseAnnouncementForm,
  parseDeadlineForm, parseGuideForm, parseJsonPayload, parseRevokeForm, parseUserStatusForm, uuid,
} from "./input";
import { adminErrorMessage } from "./presentation";
import { checkDatabase, latestRevision, revisionById } from "./data";
import { announcementSchema, revisionSchema, type AdminActionState } from "./types";
import { publicationImpact } from "./impact";

function failure(error: unknown): AdminActionState {
  if (error instanceof AdminInputError) return { status: "error", message: error.message };
  if (error instanceof z.ZodError) return { status: "error", message: validationMessage(error) };
  if (error instanceof AuthError) {
    return { status: "error", message: error.status === 401
      ? "Your session expired. Sign in again before continuing."
      : error.status === 503 ? "Authentication is unavailable or not configured. No change was made."
      : "Administrator access with two-factor verification is required. Recheck your access before retrying." };
  }
  const conflict = typeof error === "object" && error !== null && "code" in error && error.code === "40001";
  return { status: conflict ? "conflict" : "error", message: adminErrorMessage(error) };
}

function refresh(path: string) {
  revalidatePath(path);
  revalidatePath("/admin");
  revalidatePath("/admin/audit");
}

async function saveRevision(input: RevisionInput, client: Awaited<ReturnType<typeof requireAdmin>>["client"]) {
  const { data, error } = await client.rpc("admin_save_revision", {
    p_kind: input.kind, p_milestone_id: input.milestoneId, p_intake_id: input.intakeId,
    p_payload: input.payload, p_reason: input.reason, p_expected_latest_id: input.expectedLatestId,
  });
  checkDatabase(error);
  const saved = revisionSchema.safeParse(data);
  if (!saved.success || saved.data.state !== "draft" || saved.data.kind !== input.kind ||
      saved.data.milestone_id !== input.milestoneId || saved.data.intake_id !== input.intakeId ||
      saved.data.id === input.expectedLatestId) {
    return { status: "error", message: "The server response could not be verified. Reload before saving again." } satisfies AdminActionState;
  }
  const path = `/admin/${input.kind === "guide" ? "guides" : "deadlines"}/${input.milestoneId}`;
  refresh(path);
  return { status: "success", message: "New draft saved. It is not public until you publish it.", revisionId: saved.data.id } satisfies AdminActionState;
}

export async function saveGuideAction(_previous: AdminActionState, form: FormData): Promise<AdminActionState> {
  try {
    const { client } = await requireAdmin();
    return await saveRevision(parseGuideForm(form), client);
  } catch (error) { return failure(error); }
}

export async function saveDeadlineAction(_previous: AdminActionState, form: FormData): Promise<AdminActionState> {
  try {
    const { client } = await requireAdmin();
    return await saveRevision(parseDeadlineForm(form), client);
  } catch (error) { return failure(error); }
}

export async function publishRevisionAction(_previous: AdminActionState, form: FormData): Promise<AdminActionState> {
  try {
    const { client } = await requireAdmin();
    confirmed(form);
    const revisionId = uuid(field(form, "revisionId", 100));
    const expectedLatestId = uuid(field(form, "expectedLatestId", 100));
    const revision = await revisionById(client, revisionId);
    if (!revision || revision.state !== "draft") throw new AdminInputError("Choose a current saved draft to publish.");
    validateRevision({
      kind: revision.kind, milestoneId: revision.milestone_id, intakeId: revision.intake_id,
      payload: parseJsonPayload(JSON.stringify(revision.payload)), reason: revision.reason, expectedLatestId,
    });
    const latest = await latestRevision(client, revision.kind, revision.milestone_id, revision.intake_id);
    ensureLatestRevision(expectedLatestId, latest?.id ?? null, revision.id);
    const impact = await publicationImpact();
    if (!impact.available) throw new AdminInputError("Publication is blocked: a privacy-safe affected-plan preview is not available yet. The draft remains saved and unpublished.");
    const { error } = await client.rpc("admin_publish_revision", {
      p_revision_id: revisionId, p_expected_latest_id: expectedLatestId,
    });
    checkDatabase(error);
    refresh(`/admin/${revision.kind === "guide" ? "guides" : "deadlines"}/${revision.milestone_id}`);
    revalidatePath("/admin/guides");
    revalidatePath("/admin/deadlines");
    revalidatePath("/today");
    revalidatePath("/route");
    revalidatePath("/steps");
    return { status: "success", message: "Revision published. Existing completions are retained; the database creates the relevant in-app notice." };
  } catch (error) { return failure(error); }
}

export async function rollbackRevisionAction(_previous: AdminActionState, form: FormData): Promise<AdminActionState> {
  try {
    const { client } = await requireAdmin();
    confirmed(form);
    const source = await revisionById(client, uuid(field(form, "sourceRevisionId", 100)));
    if (!source || source.state === "draft") throw new AdminInputError("Choose a previously published revision from history.");
    const input = validateRevision({
      kind: source.kind, milestoneId: source.milestone_id, intakeId: source.intake_id, payload: parseJsonPayload(JSON.stringify(source.payload)),
      reason: field(form, "reason", 8000).trim(), expectedLatestId: optionalUuid(field(form, "expectedLatestId", 100)),
    });
    return await saveRevision(input, client);
  } catch (error) { return failure(error); }
}

export async function setUserStatusAction(_previous: AdminActionState, form: FormData): Promise<AdminActionState> {
  try {
    const { client, user } = await requireAdmin();
    const input = parseUserStatusForm(form);
    if (input.userId === user.id && input.status === "suspended") throw new AdminInputError("You cannot suspend your own account.");
    const { error } = await client.rpc("admin_set_user_status", {
      p_user_id: input.userId, p_status: input.status, p_reason: input.reason,
    });
    checkDatabase(error);
    refresh("/admin/users");
    return { status: "success", message: input.status === "suspended" ? "Account suspended. Waymark access is denied until reactivated." : "Account reactivated. The user may sign in again." };
  } catch (error) { return failure(error); }
}

export async function revokeSessionsAction(_previous: AdminActionState, form: FormData): Promise<AdminActionState> {
  try {
    const { client } = await requireAdmin();
    const input = parseRevokeForm(form);
    const { error } = await client.rpc("admin_revoke_sessions", { p_user_id: input.userId, p_reason: input.reason });
    checkDatabase(error);
    refresh("/admin/users");
    return { status: "success", message: "Existing sessions can no longer access Waymark. This is application access revocation, not provider-wide logout; a new sign-in is allowed." };
  } catch (error) { return failure(error); }
}

export async function publishAnnouncementAction(_previous: AdminActionState, form: FormData): Promise<AdminActionState> {
  try {
    const { client } = await requireAdmin();
    const input = parseAnnouncementForm(form);
    const { data, error } = await client.rpc("admin_publish_announcement", {
      p_title: input.title, p_body: input.body, p_country_code: input.countryCode, p_target_user_id: input.targetUserId,
    });
    checkDatabase(error);
    const saved = announcementSchema.safeParse(data);
    if (!saved.success || !saved.data.published_at || saved.data.country_code !== input.countryCode ||
        saved.data.target_user_id !== input.targetUserId) {
      return { status: "error", message: "The publication response could not be verified. Reload the list before retrying." };
    }
    refresh("/admin/updates");
    return { status: "success", message: "In-app announcement published to the selected audience. No email was sent." };
  } catch (error) { return failure(error); }
}

export async function archiveAnnouncementAction(_previous: AdminActionState, form: FormData): Promise<AdminActionState> {
  try {
    const { client } = await requireAdmin();
    confirmed(form);
    const { error } = await client.rpc("admin_archive_announcement", { p_announcement_id: uuid(field(form, "announcementId", 100)) });
    checkDatabase(error);
    refresh("/admin/updates");
    return { status: "success", message: "Announcement archived. It is no longer shown in the active in-app feed." };
  } catch (error) { return failure(error); }
}
