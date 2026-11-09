import { createHash } from "node:crypto";
import { authorizeWorkspaceWrite, readWorkspace } from "@/lib/workspace/server";
import { errorResponse, privateJson, readJsonBody } from "@/lib/platform/http";
import { legacyImportSchema } from "@/lib/platform/validation";
import { databaseError } from "@/lib/platform/errors";

export async function POST(request: Request) {
  try {
    const { client, user } = await authorizeWorkspaceWrite(request);
    const input = legacyImportSchema.parse(await readJsonBody(request));
    const ids = [...input.completedIds].sort();
    const key = createHash("sha256").update(JSON.stringify({ ...input.target, completedIds: ids })).digest("hex");
    const { error } = await client.rpc("import_legacy_plan", { p_country_code: input.target.countryCode,
      p_intake_id: input.target.intakeId, p_stage: input.target.stage, p_completed_ids: ids, p_import_key: key });
    if (error) databaseError(error);
    return privateJson(await readWorkspace(client, user));
  } catch (error) { return errorResponse(error); }
}
