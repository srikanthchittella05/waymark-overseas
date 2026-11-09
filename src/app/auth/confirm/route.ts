import type { NextRequest } from "next/server";
import { authRedirect, stageRecovery } from "@/lib/auth/routes";
import { getSupabaseConfig } from "@/lib/supabase/config";
import { createSupabaseRouteClient } from "@/lib/supabase/route";
import { tokenSchema } from "@/lib/auth/validation";
import { afterLogin } from "@/lib/auth/redirects";
import { getViewerForClient } from "@/lib/auth/session";
import { assertUser } from "@/lib/auth/session-core";
import { providerActionError } from "@/lib/auth/errors";

export async function GET(request: NextRequest) {
  if (!getSupabaseConfig()) return authRedirect(request, "/login?error=unconfigured");
  const token = tokenSchema.safeParse(request.nextUrl.searchParams.get("token_hash"));
  const type = request.nextUrl.searchParams.get("type");
  if (!token.success || !["email", "signup", "invite", "recovery"].includes(type ?? "")) return authRedirect(request, "/login?error=invalid_link");
  if (type === "recovery") return stageRecovery(request, { kind: "token_hash", value: token.data });
  const context = createSupabaseRouteClient(request);
  try {
    if (type !== "email" && type !== "signup" && type !== "invite") return context.respond(authRedirect(request, "/login?error=invalid_link"));
    const { error } = await context.client.auth.verifyOtp({ token_hash: token.data, type });
    if (error) throw providerActionError(error, "invalid_link");
    const user = await getViewerForClient(context.client);
    assertUser(user);
    return context.respond(authRedirect(request, afterLogin(request.nextUrl.searchParams.get("next"), user)));
  } catch (error) {
    const safe = providerActionError(error, "invalid_link");
    context.bridge.clearAuth();
    return context.respond(authRedirect(request, `/login?${new URLSearchParams({ error: safe.code })}`));
  }
}
