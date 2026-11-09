import { z } from "zod";
import { MILESTONE_ARCHETYPE } from "@/lib/engine/guides/archetypes";
import {
  announcementInputSchema,
  userStatusInputSchema,
  validateRevision,
  type RevisionInput,
} from "@/lib/platform/validation";

export const ADMIN_PAGE_SIZE = 25;
export const MAX_GUIDE_BYTES = 500_000;

export class AdminInputError extends Error {}

export class AdminConflictError extends Error {
  readonly code = "40001";
  constructor() { super("A newer revision exists."); }
}

export function ensureLatestRevision(expected: string | null, actual: string | null, candidate?: string): void {
  if (expected !== actual || (candidate !== undefined && candidate !== expected)) throw new AdminConflictError();
}

/** Reject files, duplicated fields and oversized input before parsing JSON. */
export function field(form: FormData, name: string, maximum = 2000): string {
  const values = form.getAll(name);
  if (values.length > 1 || (values.length === 1 && typeof values[0] !== "string")) {
    throw new AdminInputError("Submit one text value for each field. File uploads are not supported.");
  }
  const value = (values[0] ?? "") as string;
  if (new TextEncoder().encode(value).length > maximum) {
    throw new AdminInputError(`${name === "payload" ? "Guide content" : "A submitted field"} is too large.`);
  }
  return value;
}

export function confirmed(form: FormData): void {
  if (field(form, "confirmed", 10) !== "yes") {
    throw new AdminInputError("Confirm the action before continuing.");
  }
}

export const uuid = (value: unknown) => z.uuid().parse(value);
export const optionalUuid = (value: string) => value === "" ? null : uuid(value);

export function parseJsonPayload(value: string): unknown {
  if (new TextEncoder().encode(value).length > MAX_GUIDE_BYTES) {
    throw new AdminInputError("Guide content is too large. Keep it below 500 KB.");
  }
  try {
    return JSON.parse(value) as unknown;
  } catch {
    throw new AdminInputError("The guide is not valid JSON. Fix it before saving or previewing.");
  }
}

function revisionFields(form: FormData) {
  const milestoneId = field(form, "milestoneId", 100);
  if (!Object.prototype.hasOwnProperty.call(MILESTONE_ARCHETYPE, milestoneId)) throw new AdminInputError("Choose a known milestone.");
  return {
    milestoneId,
    intakeId: field(form, "intakeId", 100) || null,
    reason: field(form, "reason", 8000).trim(),
    expectedLatestId: optionalUuid(field(form, "expectedLatestId", 100)),
  };
}

export function parseGuideForm(form: FormData): RevisionInput {
  return validateRevision({
    ...revisionFields(form), kind: "guide",
    payload: parseJsonPayload(field(form, "payload", MAX_GUIDE_BYTES)),
  });
}

export function parseDeadlineForm(form: FormData): RevisionInput {
  const offset = field(form, "offsetDays", 20).trim();
  if (!/^-?\d{1,4}$/.test(offset)) throw new AdminInputError("Use a whole number of days before the intake.");
  const hardDeadline = field(form, "hardDeadline", 10);
  if (hardDeadline !== "" && hardDeadline !== "on") throw new AdminInputError("Check the deadline type.");
  const dueDate = field(form, "dueDate", 20);
  return validateRevision({
    ...revisionFields(form), kind: "deadline",
    payload: {
      offsetDays: Number(offset), ...(dueDate ? { dueDate } : {}),
      hardDeadline: hardDeadline === "on", source: field(form, "source", 2048).trim(),
      confidence: field(form, "confidence", 20), verifiedOn: field(form, "verifiedOn", 20),
    },
  });
}

export function parseUserStatusForm(form: FormData) {
  confirmed(form);
  return userStatusInputSchema.parse({
    userId: field(form, "userId", 100), status: field(form, "status", 20),
    reason: field(form, "reason", 8000).trim(),
  });
}

export function parseRevokeForm(form: FormData) {
  confirmed(form);
  return z.object({ userId: z.uuid(), reason: z.string().trim().min(8).max(2000) }).strict().parse({
    userId: field(form, "userId", 100), reason: field(form, "reason", 8000),
  });
}

export function parseAnnouncementForm(form: FormData) {
  confirmed(form);
  const audience = z.enum(["all", "country", "user"]).parse(field(form, "audience", 20));
  const countryCode = field(form, "countryCode", 10);
  const targetUserId = field(form, "targetUserId", 100);
  if ((audience !== "country" && countryCode) || (audience !== "user" && targetUserId)) {
    throw new AdminInputError("Choose one audience only; clear the other audience fields.");
  }
  if ((audience === "country" && !countryCode) || (audience === "user" && !targetUserId)) {
    throw new AdminInputError("Complete the selected audience before publishing.");
  }
  const title = field(form, "title", 800).trim();
  const body = field(form, "body", 40_000).trim();
  if (/<[^>]*>/.test(title) || /<[^>]*>/.test(body)) throw new AdminInputError("Announcements use plain text only. Remove HTML tags.");
  return announcementInputSchema.parse({
    title, body,
    countryCode: countryCode || null, targetUserId: targetUserId || null,
  });
}

export function pageNumber(value: string | string[] | undefined): number {
  if (typeof value !== "string" || !/^[1-9]\d{0,3}$/.test(value)) return 1;
  const page = Number(value);
  return page <= 1000 ? page : 1;
}

export function searchText(value: string | string[] | undefined): string {
  return typeof value === "string" ? value.replace(/[\u0000-\u001f\u007f]/g, "").trim().slice(0, 80) : "";
}

export function literalSearch(value: string): string {
  return `%${value.replace(/[\\%_]/g, "\\$&")}%`;
}
