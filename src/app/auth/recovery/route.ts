import type { NextRequest } from "next/server";
import { authRedirect, stageRecovery } from "@/lib/auth/routes";
import { getSupabaseConfig } from "@/lib/supabase/config";
import { flowIdSchema, tokenSchema } from "@/lib/auth/validation";

export async function GET(request: NextRequest) {
  if (!getSupabaseConfig()) return authRedirect(request, "/forgot-password?error=unconfigured");
  const code = tokenSchema.safeParse(request.nextUrl.searchParams.get("code"));
  if (!code.success || request.nextUrl.searchParams.has("error")) return authRedirect(request, "/forgot-password?error=invalid_link");
  const flow = request.nextUrl.searchParams.get("sb_flow_id");
  const parsed = flow === null ? undefined : flowIdSchema.safeParse(flow);
  if (parsed && !parsed.success) return authRedirect(request, "/forgot-password?error=invalid_link");
  return stageRecovery(request, { kind: "code", value: code.data, ...(parsed?.success ? { flowId: parsed.data } : {}) });
}
