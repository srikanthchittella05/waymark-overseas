import type { NextRequest } from "next/server";
import { completeCodeExchange } from "@/lib/auth/routes";

export async function GET(request: NextRequest) {
  return completeCodeExchange(request);
}
