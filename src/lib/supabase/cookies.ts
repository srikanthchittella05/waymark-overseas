import type { CookieOptions } from "@supabase/ssr";

export const AUTH_COOKIE = "waymark-auth";
export const RECOVERY_COOKIE = "waymark-recovery";
export const AUTH_CACHE_HEADERS = {
  "Cache-Control": "private, no-cache, no-store, must-revalidate, max-age=0",
  Expires: "0",
  Pragma: "no-cache",
} as const;

export type CookieWrite = { name: string; value: string; options: CookieOptions };
type CookieResponse = {
  cookies: { set(name: string, value: string, options: CookieOptions): unknown };
  headers: { set(name: string, value: string): unknown };
};

export function sessionCookieOptions(siteUrl: string): CookieOptions {
  return { httpOnly: true, secure: new URL(siteUrl).protocol === "https:", sameSite: "lax", path: "/" };
}

export function isOwnedAuthCookie(name: string): boolean {
  return name === RECOVERY_COOKIE || name === AUTH_COOKIE || name.startsWith(`${AUTH_COOKIE}.`) || name.startsWith(`${AUTH_COOKIE}-`);
}

/** One request's cookie jar. Repeated SSR writes retain earlier cookies/headers. */
export function createCookieBridge(initial: { name: string; value: string }[], siteUrl: string) {
  const jar = new Map(initial.map(({ name, value }) => [name, value]));
  const writes = new Map<string, CookieWrite>();
  const headers = new Headers(AUTH_CACHE_HEADERS);
  const fixedOptions = sessionCookieOptions(siteUrl);

  const setAll = (cookies: CookieWrite[], cacheHeaders: Record<string, string>) => {
    for (const cookie of cookies) {
      // No domain-scoped or JS-readable session cookies, including deletion writes.
      const options = { ...cookie.options, ...fixedOptions };
      delete options.domain;
      writes.set(cookie.name, { ...cookie, options });
      if (options.maxAge === 0) jar.delete(cookie.name);
      else jar.set(cookie.name, cookie.value);
    }
    for (const [name, value] of Object.entries(cacheHeaders)) {
      if (["cache-control", "expires", "pragma"].includes(name.toLowerCase())) headers.set(name, value);
    }
    // Even a malformed/less restrictive adapter header must never enable caching.
    if (!headers.get("cache-control")?.includes("no-store")) headers.set("Cache-Control", AUTH_CACHE_HEADERS["Cache-Control"]);
  };

  return {
    getAll: () => Array.from(jar, ([name, value]) => ({ name, value })),
    setAll,
    clearAuth() {
      const names = new Set([...jar.keys(), ...writes.keys(), RECOVERY_COOKIE]);
      setAll(Array.from(names).filter(isOwnedAuthCookie).map((name) => ({ name, value: "", options: { maxAge: 0 } })), {});
    },
    apply<T extends CookieResponse>(response: T): T {
      for (const { name, value, options } of writes.values()) response.cookies.set(name, value, options);
      headers.forEach((value, name) => response.headers.set(name, value));
      response.headers.set("Referrer-Policy", "no-referrer");
      return response;
    },
  };
}
