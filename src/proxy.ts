import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseConfig } from "@/lib/supabase/config";
import { createSessionClient } from "@/lib/supabase/client";
import { AUTH_CACHE_HEADERS, createCookieBridge, isOwnedAuthCookie } from "@/lib/supabase/cookies";

export async function proxy(request: NextRequest) {
  const config = getSupabaseConfig();
  if (!config) {
    const response = NextResponse.next();
    for (const [name, value] of Object.entries(AUTH_CACHE_HEADERS)) response.headers.set(name, value);
    response.headers.set("Referrer-Policy", "no-referrer");
    return response;
  }
  const bridge = createCookieBridge(request.cookies.getAll(), config.siteUrl);
  const client = createSessionClient(config, {
    getAll: bridge.getAll,
    setAll(cookiesToSet, cacheHeaders) {
      bridge.setAll(cookiesToSet, cacheHeaders);
      for (const { name, value, options } of cookiesToSet) {
        if (options.maxAge === 0) request.cookies.delete(name);
        else request.cookies.set(name, value);
      }
    },
  });
  // Do not refresh during logout: a broken provider must not prevent clearing
  // browser credentials. No other auth decision is entrusted to Proxy alone.
  if (request.nextUrl.pathname !== "/auth/logout" && request.cookies.getAll().some(({ name }) => isOwnedAuthCookie(name))) {
    try {
      await client.auth.getClaims();
    } catch {
      // Includes writable cookie-adapter failures: do not continue rendering
      // with a refreshed server session that the browser never received.
      return bridge.apply(NextResponse.json({ error: "unavailable", message: "Account services are temporarily unavailable. Please try again." }, { status: 503 }));
    }
  }
  return bridge.apply(NextResponse.next({ request: { headers: request.headers } }));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|mp4|glb)$).*)"],
};
