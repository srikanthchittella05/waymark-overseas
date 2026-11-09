export type SupabaseConfig = {
  url: string;
  key: string;
  siteUrl: string;
  googleEnabled: boolean;
  appleEnabled: boolean;
};

function origin(value: string | undefined, production: boolean): string | null {
  if (!value || value !== value.trim()) return null;
  try {
    const url = new URL(value);
    const loopback = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
    if (url.username || url.password || url.search || url.hash || url.pathname !== "/") return null;
    if (url.protocol !== "https:" && !(url.protocol === "http:" && loopback && !production)) return null;
    return url.origin;
  } catch {
    return null;
  }
}

/** Configuration presence/shape is not proof that provider credentials work. */
export function getSupabaseConfig(env: Record<string, string | undefined> = process.env): SupabaseConfig | null {
  const production = env.NODE_ENV === "production";
  const url = origin(env.SUPABASE_URL, production);
  const siteUrl = origin(env.WAYMARK_SITE_URL, production);
  const key = env.SUPABASE_PUBLISHABLE_KEY;
  const google = env.WAYMARK_GOOGLE_AUTH_ENABLED ?? "false";
  const apple = env.WAYMARK_APPLE_AUTH_ENABLED ?? "false";
  if (!url || !siteUrl || !key || !/^sb_publishable_[A-Za-z0-9_-]{16,480}$/.test(key)) return null;
  if (google !== "true" && google !== "false") return null;
  if (apple !== "true" && apple !== "false") return null;
  return { url, key, siteUrl, googleEnabled: google === "true", appleEnabled: apple === "true" };
}
