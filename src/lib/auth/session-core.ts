import { z } from "zod";
import { AuthError, errorDetails } from "./errors";

export type Viewer = { id: string; email: string; displayName: string; isAdmin: boolean; aal: "aal1" | "aal2" };
export type SessionPort = {
  getUser(): Promise<{ data: { user: { id: string; email_confirmed_at?: string } | null }; error: unknown }>;
  getAccess(): Promise<{ data: unknown; error: unknown }>;
};

const accessSchema = z.object({
  user_id: z.uuid(), email: z.email(), display_name: z.string().max(200).nullable(),
  status: z.enum(["active", "suspended", "revoked"]), is_admin: z.boolean(), aal: z.enum(["aal1", "aal2"]),
});

/** Pure orchestration seam: tests substitute transport, not authorization rules. */
export async function resolveViewer(port: SessionPort): Promise<Viewer | null> {
  try {
    const result = await port.getUser();
    if (result.error) {
      const { code, name, status } = errorDetails(result.error);
      if (code === "user_banned") throw new AuthError(403, "suspended");
      if (["session_not_found", "refresh_token_already_used", "refresh_token_not_found"].includes(code)) throw new AuthError(403, "revoked");
      if (name === "AuthSessionMissingError" || name === "AuthInvalidJwtError" || status === 401 ||
        ["bad_jwt", "jwt_expired", "user_not_found", "refresh_token_expired"].includes(code)) return null;
      throw new AuthError(503, "unavailable");
    }
    if (!result.data.user) return null;
    if (!result.data.user.email_confirmed_at) throw new AuthError(403, "email_unverified");
    const access = await port.getAccess();
    if (access.error) {
      const { code } = errorDetails(access.error);
      if (code === "42501") throw new AuthError(403, "revoked");
      throw new AuthError(503, "unavailable");
    }
    if (access.data === null) throw new AuthError(403, "revoked");
    const parsed = accessSchema.safeParse(access.data);
    if (!parsed.success || parsed.data.user_id !== result.data.user.id) throw new AuthError(503, "unavailable");
    const account = parsed.data;
    if (account.status === "suspended") throw new AuthError(403, "suspended");
    if (account.status !== "active") throw new AuthError(403, "revoked");
    return { id: account.user_id, email: account.email, displayName: account.display_name ?? "Your account", isAdmin: account.is_admin, aal: account.aal };
  } catch (error) {
    if (error instanceof AuthError) throw error;
    throw new AuthError(503, "unavailable");
  }
}

export function assertUser(user: Viewer | null): asserts user is Viewer {
  if (!user) throw new AuthError(401, "unauthorized");
}

export function assertAdmin(user: Viewer | null): asserts user is Viewer {
  assertUser(user);
  if (!user.isAdmin) throw new AuthError(403, "forbidden");
  if (user.aal !== "aal2") throw new AuthError(403, "mfa_required");
}
