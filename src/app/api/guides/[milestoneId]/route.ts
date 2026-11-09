import { getSupabaseConfig } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { guideFor } from "@/lib/engine/guides/content";
import { ARCHETYPE_SECTIONS } from "@/lib/engine/guides/archetypes";
import { milestoneIdSchema, parseGuideContent } from "@/lib/platform/validation";
import { errorResponse, privateJson } from "@/lib/platform/http";
import { databaseError, RequestError } from "@/lib/platform/errors";

export async function GET(_request: Request, { params }: { params: Promise<{ milestoneId: string }> }) {
  try {
    const { milestoneId } = await params;
    if (!milestoneIdSchema.safeParse(milestoneId).success) throw new RequestError(404, "not_found", "This guide does not exist.");
    if (!getSupabaseConfig()) return privateJson({ guide: await guideFor(milestoneId), revision: "bundled", source: "bundled" });
    const client = await createSupabaseServerClient();
    const { data, error } = await client.from("content_revisions").select("id,payload")
      .eq("kind", "guide").eq("milestone_id", milestoneId).eq("state", "published").is("intake_id", null).maybeSingle();
    if (error) databaseError(error);
    if (!data) throw new RequestError(503, "catalog_not_ready", "The published guide catalog has not been initialized.");
    const content = parseGuideContent(milestoneId, data.payload);
    return privateJson({ guide: { archetype: content.archetype, intro: content.intro,
      sections: ARCHETYPE_SECTIONS[content.archetype].map((section) => ({ ...section, content: content.sections[section.id] })) },
      revision: data.id, source: "published" });
  } catch (error) { return errorResponse(error); }
}
