import type { Metadata } from "next";
import { connection } from "next/server";
import PageTransition from "@/components/ui/PageTransition";
import { buildPlan, type Plan } from "@/lib/engine/plan";
import { DEFAULT_PROFILE } from "@/lib/engine/profile";
import "./steps.css";
import StepsScreen from "./steps-screen";

/*
 * This route is allowed to block: the whole screen is a function of today's date,
 * so streaming a date-free skeleton first would mean showing the student a plan
 * with no dates in it. Rendering per request costs one clock read and returns the
 * real, fully dated page immediately.
 */
export const instant = false;

export const metadata: Metadata = {
  title: "The Steps — Waymark",
  description: "Your checklist, derived from the route.",
};

/*
 * The checklist is computed here on the server for the first paint — same plan the
 * store returns before localStorage is read — and the client screen swaps in the
 * live one once it has mounted. That keeps hydration honest (same HTML, same
 * dates) and keeps the clock out of the Client Component's render.
 */
export default async function Page() {
  // The whole screen is a function of today's date, so it is rendered per request
  // rather than baked into a static prerender.
  await connection();
  const today = new Date();
  const initialPlan: Plan = buildPlan(DEFAULT_PROFILE, {}, today);

  return <PageTransition><StepsScreen today={today} initialPlan={initialPlan} /></PageTransition>;
}
