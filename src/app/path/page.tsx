import type { Metadata } from "next";
import { connection } from "next/server";
import { countryOptions } from "@/lib/engine/plan";
import PageTransition from "@/components/ui/PageTransition";
import PathForm from "./path-form";
import "./path.css";

export const metadata: Metadata = {
  title: "Your Path — Waymark",
  description: "Change your target and the whole plan rebuilds.",
};

// Link choices are previews, never writes to the stored profile.
export const instant = false;

export default async function Page({ searchParams }: {
  searchParams: Promise<{ country?: string | string[]; intake?: string | string[] }>;
}) {
  await connection();
  const query = await searchParams;
  const country = countryOptions().find((option) => option.code === query.country);
  const today = new Date().toISOString().slice(0, 10);
  const intake = country?.intakes.find((option) => option.id === query.intake)
    ?? country?.intakes.find((option) => option.startDate >= today) ?? country?.intakes[0];
  const initialTarget = country && intake ? { countryCode: country.code, intakeId: intake.id } : undefined;
  // App Router can preserve a prior /path tree while home is active. A new
  // linked target must initialize a new draft, not revive that tree's old state.
  return <PageTransition><PathForm key={initialTarget ? `${initialTarget.countryCode}:${initialTarget.intakeId}` : "saved"} initialTarget={initialTarget} /></PageTransition>;
}
