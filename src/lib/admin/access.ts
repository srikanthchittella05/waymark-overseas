import "server-only";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { AuthError, getAuthContext, requireAdmin } from "@/lib/auth/session";

export type AdminPageAccess =
  | { state: "ready"; context: Awaited<ReturnType<typeof requireAdmin>> }
  | { state: "setup" | "denied" | "unavailable" };

/** No cross-request cache: layouts are not the authorization boundary for pages. */
export async function adminPageAccess(): Promise<AdminPageAccess> {
  await connection();
  try {
    const context = await getAuthContext();
    if (!context.configured) return { state: "setup" };
    try {
      return { state: "ready", context: await requireAdmin() };
    } catch (error) {
      if (!(error instanceof AuthError)) throw error;
      if (error.status === 401) redirect("/login?next=/admin");
      if (error.status === 503) return { state: "unavailable" };
      if (context.user?.isAdmin && context.user.aal !== "aal2") redirect("/admin/security");
      return { state: "denied" };
    }
  } catch (error) {
    if (!(error instanceof AuthError)) throw error;
    if (error.status === 401) redirect("/login?next=/admin");
    return { state: error.status === 503 ? "unavailable" : "denied" };
  }
}
