import { authorizeWorkspaceWrite, readWorkspace } from "@/lib/workspace/server";
import { errorResponse, privateJson, readJsonBody } from "@/lib/platform/http";
import { stepWriteSchema } from "@/lib/platform/validation";
import { databaseError } from "@/lib/platform/errors";

export async function PUT(request: Request) {
  try {
    const { client, user } = await authorizeWorkspaceWrite(request);
    const step = stepWriteSchema.parse(await readJsonBody(request));
    const { error } = await client.rpc("set_step", { p_plan_id: step.planId, p_milestone_id: step.milestoneId, p_done: step.done, p_expected_version: step.expectedVersion });
    if (error) databaseError(error);
    return privateJson(await readWorkspace(client, user));
  } catch (error) { return errorResponse(error); }
}
