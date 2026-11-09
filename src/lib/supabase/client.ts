import "server-only";

import { createServerClient, type CookieMethodsServer } from "@supabase/ssr";
import { AUTH_COOKIE, sessionCookieOptions } from "./cookies";
import type { SupabaseConfig } from "./config";

export function createSessionClient(config: SupabaseConfig, cookies: CookieMethodsServer) {
  return createServerClient(config.url, config.key, {
    cookieOptions: { name: AUTH_COOKIE, ...sessionCookieOptions(config.siteUrl) },
    cookies,
    global: {
      fetch(input, init) {
        const timeout = AbortSignal.timeout(12_000);
        return fetch(input, {
          ...init,
          cache: "no-store",
          signal: init?.signal ? AbortSignal.any([init.signal, timeout]) : timeout,
        });
      },
    },
  });
}
