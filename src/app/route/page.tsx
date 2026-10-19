import type { Metadata } from "next";
import { connection } from "next/server";
import PageTransition from "@/components/ui/PageTransition";
import { buildPlan, type Plan } from "@/lib/engine/plan";
import { DEFAULT_PROFILE } from "@/lib/engine/profile";
import RouteGraph from "./route-graph";
import "./route.css";

/*
 * This route is allowed to block: every date on this screen is the intake start
 * minus an offset, and every status word is a function of today. Rendering per
 * request costs one clock read and returns the real, fully dated page immediately.
 */
export const instant = false;

export const metadata: Metadata = {
  title: "The Route — Waymark",
  description: "Every milestone, dated backwards from your intake.",
};

/*
 * The first paint is computed here, on the server, from exactly what the store
 * returns before it has read localStorage: the default profile, no ticks, and
 * the date read just now. Without the `connection()` below this page would be
 * prerendered once and every count, urgency and status word on it would be
 * frozen at build time forever. The client screen renders this same plan until
 * it has mounted, then swaps in the live one — see the two-beat guard in
 * route-graph.tsx — so hydration can never disagree with the server HTML.
 */
export default async function Page() {
  // Defer to request time, which is what `instant = false` above allows.
  await connection();
  const today = new Date();
  const initialPlan: Plan = buildPlan(DEFAULT_PROFILE, {}, today);

  return <PageTransition><RouteGraph today={today} initialPlan={initialPlan} /></PageTransition>;
}
