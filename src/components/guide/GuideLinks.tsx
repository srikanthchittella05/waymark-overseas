"use client";

import { navLabelsFor } from "@/lib/engine/guides/archetypes";
import { useGuide } from "./GuideProvider";

/*
 * The named links under a milestone.
 *
 * Each label says what the student gets, so the row reads as a set of
 * promises rather than a set of counts. "3 tasks in this milestone" tells a
 * student nothing they can act on; "When to book it" tells them exactly what
 * is on the other side of the click.
 *
 * These are buttons, not links, because they open a dialog rather than move
 * the page — but the state lives in the URL, so the section is still
 * linkable, bookmarkable and shareable.
 */
export default function GuideLinks({
  milestoneId,
  className = "",
}: {
  milestoneId: string;
  className?: string;
}) {
  const { open, openGuide } = useGuide();
  const sections = navLabelsFor(milestoneId);
  if (!sections.length) return null;

  return (
    <nav className={`guide-links ${className}`.trim()} aria-label="Open a guide for this milestone">
      {sections.map((section) => {
        const isOpen = open?.milestoneId === milestoneId && open.sectionId === section.id;
        return (
          <button
            key={section.id}
            type="button"
            className="guide-link"
            data-guide-link={section.id}
            aria-expanded={isOpen}
            onClick={() => openGuide(milestoneId, section.id)}
          >
            <span className="guide-link-label">{section.navLabel}</span>
            <span className="guide-link-arrow" aria-hidden="true">
              →
            </span>
          </button>
        );
      })}
    </nav>
  );
}
