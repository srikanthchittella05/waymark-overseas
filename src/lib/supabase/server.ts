import "server-only";

import { cookies } from "next/headers";
import { getSupabaseConfig } from "./config";
import { createSessionClient } from "./client";
import { sessionCookieOptions } from "./cookies";
import { AuthError } from "@/lib/auth/errors";

/** Default adapter is writable; renders must explicitly request readOnly. */
export async function createSupabaseServerClient({ readOnly = false }: { readOnly?: boolean } = {}) {
  const config = getSupabaseConfig();
  if (!config) throw new AuthError(503, "unconfigured");
  const store = await cookies();
  return createSessionClient(config, {
    getAll: () => store.getAll(),
    setAll(cookiesToSet) {
      // Server Components cannot write. Proxy performs refresh before rendering.
      // Actions/handlers use a writable adapter, where every failure propagates.
      if (readOnly) return;
      for (const { name, value, options } of cookiesToSet) {
        const safeOptions = { ...options, ...sessionCookieOptions(config.siteUrl) };
        delete safeOptions.domain;
        store.set(name, value, safeOptions);
      }
      // Server Actions have no mutable response-header API. Proxy sets all
      // three SSR no-store headers on every matched request, not only refreshes.
    },
  });
}
