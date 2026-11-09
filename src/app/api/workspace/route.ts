import { getWorkspace } from "@/lib/workspace/server";
import { errorResponse, privateJson } from "@/lib/platform/http";

export async function GET() {
  try { return privateJson(await getWorkspace()); } catch (error) { return errorResponse(error); }
}
