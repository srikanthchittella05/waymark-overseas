import type { Metadata } from "next";
import LandingExperience from "@/components/landing/LandingExperience";
import PageTransition from "@/components/ui/PageTransition";

export const metadata: Metadata = {
  title: "Waymark — A dated plan for studying abroad",
  description:
    "Turn I want to study abroad into an actionable route. Choose a destination and intake; every deadline is counted back from departure, with sources and confidence labels.",
};

export default function Home() {
  return <PageTransition><LandingExperience /></PageTransition>;
}
