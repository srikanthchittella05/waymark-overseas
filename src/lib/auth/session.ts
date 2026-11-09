import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AuthError } from "./errors";
import { assertAdmin, assertUser, resolveViewer, type Viewer } from "./session-core";

export { AuthError } from "./errors";
export type { Viewer } from "./session-core";

export async function getViewerForClient(client: SupabaseClient): Promise<Viewer | null> {
  return resolveViewer({
    getUser: () => client.auth.getUser(),
    getAccess: async () => {
      const { data, error } = await client.rpc("get_access");
      return { data, error };
    },
  });
}

export async function getAuthContext({ writable = false }: { writable?: boolean } = {}): Promise<{
  configured: boolean; client: SupabaseClient | null; user: Viewer | null;
}> {
  if (!getSupabaseConfig()) return { configured: false, client: null, user: null };
  try {
    const client = await createSupabaseServerClient({ readOnly: !writable });
    return { configured: true, client, user: await getViewerForClient(client) };
  } catch (error) {
    if (error instanceof AuthError) throw error;
    throw new AuthError(503, "unavailable");
  }
}

export async function requireUser({ writable = false }: { writable?: boolean } = {}): Promise<{ client: SupabaseClient; user: Viewer }> {
  const context = await getAuthContext({ writable });
  if (!context.configured || !context.client) throw new AuthError(503, "unconfigured");
  assertUser(context.user);
  return { client: context.client, user: context.user };
}

export async function requireAdmin({ writable = false }: { writable?: boolean } = {}): Promise<{ client: SupabaseClient; user: Viewer }> {
  const context = await requireUser({ writable });
  assertAdmin(context.user);
  return context;
}
