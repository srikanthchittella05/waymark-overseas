import "server-only";

import type { NextRequest, NextResponse } from "next/server";
import { createSessionClient } from "./client";
import { getSupabaseConfig } from "./config";
import { createCookieBridge } from "./cookies";
import { AuthError } from "@/lib/auth/errors";

export function createSupabaseRouteClient(request: NextRequest) {
  const config = getSupabaseConfig();
  if (!config) throw new AuthError(503, "unconfigured");
  const bridge = createCookieBridge(request.cookies.getAll(), config.siteUrl);
  return {
    config,
    client: createSessionClient(config, bridge),
    bridge,
    respond: (response: NextResponse) => bridge.apply(response),
  };
}
