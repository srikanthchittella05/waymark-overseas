/*
 * Plain (server-safe) defaults.
 *
 * `DEFAULT_PROFILE` must be importable by server components without becoming a
 * client-reference proxy. `profile.ts` is a "use client" module, so anything
 * imported from it by a server component is remapped to a proxy whose fields
 * are `undefined` at prerender time — which silently made the server paint the
 * fallback intake instead of the default one.
 *
 * This module touches neither `window` nor `localStorage`, so it is safe on
 * both the server and the client.
 */

import type { Profile } from "./plan";

export const DEFAULT_PROFILE: Profile = {
  stage: "exploring",
  countryCode: "US",
  intakeId: "us-fall-2027",
};
