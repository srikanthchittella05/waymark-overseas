"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { PlanStep } from "@/lib/engine/plan";
import type { Guide } from "@/lib/engine/guides/types";
import GuideSheet from "./GuideSheet";

/*
 * The dossier opener.
 *
 * A milestone row does not get one vague "Details" button. It gets named
 * links, each of which says what the student will get, and each of which opens
 * the dossier at that exact section. The names come from the milestone's
 * archetype, so an English test offers "Which test, and which score" and a
 * visa offers "Proving money".
 *
 * The URL carries the state, so a section can be linked, bookmarked and sent
 * to somebody else, and the browser's back button closes the sheet.
 */

type Open = { milestoneId: string; sectionId: string | null };

type GuideContextValue = {
  open: Open | null;
  openGuide: (milestoneId: string, sectionId?: string | null) => void;
  closeGuide: () => void;
};

import { createContext, useContext } from "react";

const GuideContext = createContext<GuideContextValue | null>(null);

export function useGuide(): GuideContextValue {
  const value = useContext(GuideContext);
  if (!value) throw new Error("useGuide must be used within a GuideProvider");
  return value;
}

function parseHash(hash: string): Open | null {
  const raw = hash.replace(/^#/, "");
  if (!raw) return null;
  const params = new URLSearchParams(raw);
  const milestoneId = params.get("m");
  if (!milestoneId) return null;
  return { milestoneId, sectionId: params.get("s") };
}

export default function GuideProvider({
  steps,
  children,
}: {
  steps: PlanStep[];
  children: ReactNode;
}) {
  const [open, setOpen] = useState<Open | null>(null);
  const [loaded, setLoaded] = useState<{ id: string; guide: Guide | null } | null>(null);
  const pushed = useRef(false);

  const openGuide = useCallback((milestoneId: string, sectionId?: string | null) => {
    const next: Open = { milestoneId, sectionId: sectionId ?? null };
    pushed.current = true;
    const hash = `#m=${encodeURIComponent(milestoneId)}${
      sectionId ? `&s=${encodeURIComponent(sectionId)}` : ""
    }`;
    window.history.pushState(null, "", hash);
    setOpen(next);
  }, [pushed]);

  const closeGuide = useCallback(() => {
    if (pushed.current) {
      pushed.current = false;
      window.history.back();
      return;
    }
    setOpen(null);
  }, [pushed]);

  // A link that lands on a page with a section hash opens that section.
  useEffect(() => {
    const sync = () => {
      const parsed = parseHash(window.location.hash);
      if (parsed) setOpen(parsed);
      else setOpen(null);
    };
    sync();
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, []);

  // The dossier text is a lot of static content, so it is fetched the first
  // time a student opens one rather than on every page load.
  useEffect(() => {
    if (!open) return;
    const milestoneId = open.milestoneId;
    let cancelled = false;
    import("@/lib/engine/guides/content")
      .then((mod) => mod.guideFor(milestoneId))
      .then((guide) => {
        if (cancelled) return;
        setLoaded({ id: milestoneId, guide });
      })
      .catch(() => {
        if (cancelled) return;
        setLoaded({ id: milestoneId, guide: null });
      });
    return () => {
      cancelled = true;
    };
  }, [open]);

  const guide = loaded && open && loaded.id === open.milestoneId ? loaded.guide : null;
  const loading = Boolean(open) && (!loaded || loaded.id !== open?.milestoneId);

  // The page behind the sheet must not scroll under it.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const value = useMemo(
    () => ({ open, openGuide, closeGuide }),
    [open, openGuide, closeGuide],
  );

  return (
    <GuideContext.Provider value={value}>
      {children}
      <GuideSheet
        open={open}
        guide={guide}
        loading={loading}
        steps={steps}
        onClose={closeGuide}
      />
    </GuideContext.Provider>
  );
}
