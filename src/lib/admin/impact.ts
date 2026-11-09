import "server-only";

export type PublicationImpact =
  | { available: true; affectedPlans: number }
  | { available: false; reason: string };

/**
 * The current platform contract has no aggregate impact RPC. Never work around
 * that boundary by selecting private plan rows through the session client.
 * Publication stays blocked until the database contract supplies that capability.
 */
export async function publicationImpact(): Promise<PublicationImpact> {
  return { available: false, reason: "A privacy-safe affected-plan count is not yet available in the platform contract." };
}
