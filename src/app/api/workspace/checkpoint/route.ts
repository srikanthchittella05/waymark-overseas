import { authorizeWorkspaceWrite, readWorkspace } from "@/lib/workspace/server";
import { errorResponse, privateJson, readJsonBody } from "@/lib/platform/http";
import { databaseError } from "@/lib/platform/errors";
import { checkpointActionSchema } from "@/lib/workspace/types";

export async function PUT(request: Request) {
  try {
    const { client, user } = await authorizeWorkspaceWrite(request);
    const action = checkpointActionSchema.parse(await readJsonBody(request));
    const { error } = await client.rpc("set_checkpoint", {
      p_plan_id: action.planId, p_milestone_id: action.milestoneId,
      p_action: action.action, p_evidence: "evidence" in action ? action.evidence ?? null : null,
      p_reason: "reason" in action ? action.reason : null,
      p_expected_version: action.expectedVersion,
    });
    if (error) databaseError(error);
    return privateJson(await readWorkspace(client, user));
  } catch (error) { return errorResponse(error); }
}
