import type { Metadata } from "next";
import { connection } from "next/server";
import PageTransition from "@/components/ui/PageTransition";
import { buildPlan, type Plan } from "@/lib/engine/plan";
import { DEFAULT_PROFILE } from "@/lib/engine/defaults";
import "./today.css";
import TodayScreen from "./today-screen";

/*
 * This route is allowed to block: the whole screen is a function of today's date,
 * so streaming a date-free skeleton first would mean showing the student a plan
 * with no dates in it. Rendering per request costs one clock read and returns the
 * real, fully dated page immediately.
 */
export const instant = false;

export const metadata: Metadata = {
  title: "Today — Waymark",
  description: "The one thing to do next, and why now.",
};

/*
 * The first paint is computed here, on the server, from exactly what the store
 * returns before it has read localStorage: the default profile, no ticks. The
 * client screen renders this same object until it has mounted, then swaps in the
 * live plan. Two reasons, both about honesty:
 *
 *   1. The student's stored target can never arrive as a flash of empty state —
 *      they always see a real, fully derived plan immediately.
 *   2. Reading the clock here means no `new Date()` runs inside a Client
 *      Component during prerender (Next 16 rejects that), and the same date
 *      object is used for the server render and for hydration, so the countdown
 *      can never disagree across the boundary.
 */
export default async function Page() {
  // Defer to request time, which is what `instant = false` above allows.
  await connection();
  const today = new Date();
  const initialPlan: Plan = buildPlan(DEFAULT_PROFILE, {}, today);

  return <PageTransition><TodayScreen today={today} initialPlan={initialPlan} /></PageTransition>;
}
