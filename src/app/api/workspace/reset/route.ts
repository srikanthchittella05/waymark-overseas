import { authorizeWorkspaceWrite, readWorkspace } from "@/lib/workspace/server";
import { errorResponse, privateJson, readJsonBody } from "@/lib/platform/http";
import { resetPlanSchema } from "@/lib/platform/validation";
import { databaseError } from "@/lib/platform/errors";

export async function POST(request: Request) {
  try {
    const { client, user } = await authorizeWorkspaceWrite(request);
    const plan = resetPlanSchema.parse(await readJsonBody(request));
    const { error } = await client.rpc("reset_plan", { p_plan_id: plan.planId, p_expected_version: plan.expectedVersion });
    if (error) databaseError(error);
    return privateJson(await readWorkspace(client, user));
  } catch (error) { return errorResponse(error); }
}
