import "server-only";

import { AuthError } from "./errors";
import { getAuthContext } from "./session";
import { getSupabaseConfig } from "@/lib/supabase/config";

export async function authPageState() {
  const config = getSupabaseConfig();
  try {
    const context = await getAuthContext();
    return { configured: context.configured, googleEnabled: config?.googleEnabled ?? false, appleEnabled: config?.appleEnabled ?? false, user: context.user, problem: null };
  } catch (error) {
    if (!(error instanceof AuthError)) throw error;
    return { configured: Boolean(config), googleEnabled: config?.googleEnabled ?? false, appleEnabled: config?.appleEnabled ?? false, user: null, problem: error.message };
  }
}

export function queryNotice(value: unknown): string | null {
  const messages: Record<string, string> = {
    "signed-out": "Signed out of this browser.",
    "local-signout": "This browser's credentials were cleared. Server-side session revocation could not be confirmed; account services may be unavailable.",
    "password-updated": "Password updated. Sign in with your new password.",
    invalid_link: "The link was invalid, expired or already used. Request a new link and try again.",
    unconfigured: "Account setup is pending. You can still explore the public planner.",
    unavailable: "Account services are temporarily unavailable. Please try again.",
    suspended: "This account is suspended. Contact your Waymark administrator.",
    revoked: "This session no longer has access. Sign in again.",
    rate_limited: "Too many attempts. Please wait a few minutes and try again.",
    email_unverified: "Confirm your email before signing in.",
  };
  return typeof value === "string" ? messages[value] ?? null : null;
}
