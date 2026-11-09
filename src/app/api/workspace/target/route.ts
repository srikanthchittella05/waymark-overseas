import { authorizeWorkspaceWrite, readWorkspace } from "@/lib/workspace/server";
import { errorResponse, privateJson, readJsonBody } from "@/lib/platform/http";
import { targetSchema } from "@/lib/platform/validation";
import { databaseError } from "@/lib/platform/errors";

export async function POST(request: Request) {
  try {
    const { client, user } = await authorizeWorkspaceWrite(request);
    const target = targetSchema.parse(await readJsonBody(request));
    const { error } = await client.rpc("select_plan", { p_country_code: target.countryCode, p_intake_id: target.intakeId, p_stage: target.stage });
    if (error) databaseError(error);
    return privateJson(await readWorkspace(client, user));
  } catch (error) { return errorResponse(error); }
}
