const paths = new Set([
  "/", "/today", "/route", "/steps", "/path", "/account", "/notifications",
  "/admin", "/admin/users", "/admin/guides", "/admin/deadlines", "/admin/updates", "/admin/audit", "/admin/security",
]);
const pathQueryKeys = new Set(["country", "intake", "stage"]);

/** Accept only local application destinations, never credentials or nested URLs. */
export function safeNext(value: unknown, fallback = "/today"): string {
  if (typeof value !== "string" || value.length > 1000 || !value.startsWith("/") ||
    value.startsWith("//") || /[\\\u0000-\u0020\u007f%#]/.test(value.split("?")[0])) return fallback;
  try {
    const url = new URL(value, "https://waymark.invalid");
    if (url.origin !== "https://waymark.invalid" || url.hash || !paths.has(url.pathname)) return fallback;
    if (url.pathname !== "/path") return url.pathname;
    const query = new URLSearchParams();
    for (const [key, entry] of url.searchParams) {
      if (!pathQueryKeys.has(key) || query.has(key) || !/^[a-z0-9-]{1,100}$/.test(entry)) return fallback;
      query.set(key, entry);
    }
    return `${url.pathname}${query.size ? `?${query}` : ""}`;
  } catch {
    return fallback;
  }
}

export function loginPath(next: unknown): string {
  return `/login?${new URLSearchParams({ next: safeNext(next) })}`;
}

export function afterLogin(next: unknown, user: { isAdmin: boolean; aal: string }): string {
  const target = safeNext(next);
  return user.isAdmin && user.aal !== "aal2" && target.startsWith("/admin")
    ? `/admin/security?${new URLSearchParams({ next: target === "/admin/security" ? "/admin" : target })}`
    : target;
}
