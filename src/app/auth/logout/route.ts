import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseConfig } from "@/lib/supabase/config";
import { createSupabaseRouteClient } from "@/lib/supabase/route";
import { createCookieBridge } from "@/lib/supabase/cookies";
import { assertSameOrigin } from "@/lib/auth/origin";
import { authRedirect } from "@/lib/auth/routes";

export async function POST(request: NextRequest) {
  const config = getSupabaseConfig();
  try {
    assertSameOrigin(request.headers.get("origin"), config?.siteUrl ?? request.nextUrl.origin);
  } catch {
    return NextResponse.json({ error: "forbidden" }, { status: 403, headers: { "Cache-Control": "private, no-store" } });
  }
  const bridge = createCookieBridge(request.cookies.getAll(), config?.siteUrl ?? request.nextUrl.origin);
  let confirmed = !config;
  if (config) {
    const context = createSupabaseRouteClient(request);
    try {
      const { error } = await context.client.auth.signOut({ scope: "local" });
      confirmed = !error;
    } catch {
      // Regardless of provider availability, clear this browser's credentials.
      // The notice distinguishes local clearing from confirmed Auth revocation.
      confirmed = false;
    }
  }
  bridge.clearAuth();
  return bridge.apply(authRedirect(request, `/login?notice=${confirmed ? "signed-out" : "local-signout"}`));
}
