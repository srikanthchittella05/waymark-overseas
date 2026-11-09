import { AuthError } from "./errors";

export function assertSameOrigin(origin: string | null, siteUrl: string): void {
  if (!origin || origin !== new URL(siteUrl).origin) throw new AuthError(403, "forbidden");
}
