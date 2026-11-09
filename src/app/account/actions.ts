"use server";

import { z } from "zod";
import { requireUser } from "@/lib/auth/session";
import { databaseError } from "@/lib/platform/errors";
import { revalidatePath } from "next/cache";

export async function markRead(_previous: { message: string; ok: boolean }, formData: FormData) {
  try {
    const { client } = await requireUser();
    const id = z.uuid().parse(formData.get("announcementId"));
    const { error } = await client.rpc("mark_notification_read", { p_announcement_id: id });
    if (error) databaseError(error);
    revalidatePath("/account");
    return { message: "Marked as read.", ok: true };
  } catch {
    return { message: "This update could not be marked as read. Reload and try again.", ok: false };
  }
}
