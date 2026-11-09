import { COUNTRY_CYCLES } from "@/lib/engine/country-cycles";
import { targetSchema } from "@/lib/platform/validation";
import type { Profile } from "@/lib/engine/plan";

export type LegacyCandidate = { target: Profile; completedIds: string[]; excludedEntries: number };
export type LegacyRead = { kind: "none" } | { kind: "invalid"; message: string } | { kind: "present"; value: LegacyCandidate };

export function readLegacyCandidate(storage: Pick<Storage, "getItem">): LegacyRead {
  try {
    const rawProfile = storage.getItem("waymark.profile.v1");
    const rawDone = storage.getItem("waymark.done.v1");
    if (!rawProfile && !rawDone) return { kind: "none" };
    const profile: unknown = rawProfile ? JSON.parse(rawProfile) : null;
    const target = targetSchema.safeParse(profile);
    const done: unknown = rawDone ? JSON.parse(rawDone) : {};
    if (!target.success || !done || typeof done !== "object" || Array.isArray(done)) {
      return { kind: "invalid", message: "The older browser data is not a valid plan. The original data has not been changed." };
    }
    const ids = new Set(COUNTRY_CYCLES.find((country) => country.code === target.data.countryCode)?.milestones.map((step) => step.id));
    const completedIds: string[] = [];
    let excludedEntries = 0;
    for (const [id, value] of Object.entries(done)) {
      if (value === true && ids.has(id)) completedIds.push(id);
      else if (value !== false) excludedEntries += 1;
    }
    return { kind: "present", value: { target: target.data, completedIds, excludedEntries } };
  } catch {
    return { kind: "invalid", message: "Older browser storage could not be read. No original data has been changed." };
  }
}
