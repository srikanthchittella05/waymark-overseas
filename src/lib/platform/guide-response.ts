import { z } from "zod";
import { ARCHETYPE_SECTIONS } from "@/lib/engine/guides/archetypes";
import type { Guide } from "@/lib/engine/guides/types";
import { parseGuideContent } from "./validation";

export function parseGuideResponse(milestoneId: string, input: unknown): Guide {
  const response = z.object({ guide: z.object({
    archetype: z.string(), intro: z.string(), sections: z.array(z.object({ id: z.string(), content: z.unknown() })).max(20),
  }) }).parse(input);
  if (new Set(response.guide.sections.map((section) => section.id)).size !== response.guide.sections.length) {
    throw new Error("Duplicate guide sections.");
  }
  const content = parseGuideContent(milestoneId, { archetype: response.guide.archetype, intro: response.guide.intro,
    sections: Object.fromEntries(response.guide.sections.map((section) => [section.id, section.content])) });
  return { archetype: content.archetype, intro: content.intro,
    sections: ARCHETYPE_SECTIONS[content.archetype].map((section) => ({ ...section, content: content.sections[section.id] })) };
}
