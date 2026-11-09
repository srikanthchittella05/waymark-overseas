"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { PlanStep } from "@/lib/engine/plan";
import type { Guide } from "@/lib/engine/guides/types";
import GuideSheet from "./GuideSheet";
import { parseGuideResponse } from "@/lib/platform/guide-response";

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
type Opening = Open & { requestId: number };

type GuideContextValue = {
  open: Open | null;
  openGuide: (milestoneId: string, sectionId?: string | null) => void;
  closeGuide: () => void;
};

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
  return { milestoneId, sectionId: params.get("s") || null };
}

function historyState(): Record<string, unknown> {
  const state: unknown = window.history.state;
  return state && typeof state === "object" ? state as Record<string, unknown> : {};
}

export default function GuideProvider({
  steps,
  children,
}: {
  steps: PlanStep[];
  children: ReactNode;
}) {
  const [open, setOpen] = useState<Opening | null>(null);
  const [loaded, setLoaded] = useState<{ requestId: number; guide: Guide | null } | null>(null);
  const selectionRef = useRef<Opening | null>(null);
  const sequence = useRef(0);
  const entryId = useRef<string | null>(null);
  const closing = useRef(false);
  const openerRef = useRef<HTMLElement | null>(null);
  const activationRef = useRef<{ trigger: HTMLElement; event: MouseEvent } | null>(null);

  const selectGuide = useCallback((selection: Open | null, repeat = false) => {
    const previous = selectionRef.current;
    if (!selection && !previous) return;
    if (!repeat && selection && previous?.milestoneId === selection.milestoneId && previous.sectionId === selection.sectionId) return;

    if (selection && !previous) {
      const active = document.activeElement;
      const activation = activationRef.current;
      const trigger = activation && activation.event.eventPhase !== Event.NONE ? activation.trigger : null;
      openerRef.current = trigger ?? (
        active instanceof HTMLElement && active !== document.body && active !== document.documentElement ? active : null
      );
    }
    const next = selection ? {
      ...selection,
      requestId: previous?.milestoneId === selection.milestoneId ? previous.requestId : ++sequence.current,
    } : null;
    selectionRef.current = next;
    setOpen(next);
  }, []);

  const openGuide = useCallback((milestoneId: string, sectionId?: string | null) => {
    const next: Open = { milestoneId, sectionId: sectionId ?? null };
    const hash = `#m=${encodeURIComponent(milestoneId)}${
      sectionId ? `&s=${encodeURIComponent(sectionId)}` : ""
    }`;
    if (selectionRef.current) {
      // Section changes belong to this opening; one Back still dismisses it.
      window.history.replaceState(window.history.state, "", hash);
    } else {
      entryId.current = window.crypto.randomUUID();
      window.history.pushState({ ...historyState(), __waymarkGuide: entryId.current }, "", hash);
    }
    selectGuide(next, true);
  }, [selectGuide]);

  const closeGuide = useCallback(() => {
    if (!selectionRef.current || closing.current) return;
    if (entryId.current && historyState().__waymarkGuide === entryId.current) {
      closing.current = true;
      window.history.back();
      return;
    }
    // A shared URL has no locally-created entry to go back to. Clear only the
    // guide parameters, without sending the student to a previous website.
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.hash.slice(1));
    params.delete("m");
    params.delete("s");
    url.hash = params.toString();
    const state = { ...historyState() };
    delete state.__waymarkGuide;
    window.history.replaceState(state, "", `${url.pathname}${url.search}${url.hash}`);
    selectGuide(null);
  }, [selectGuide]);

  // A link that lands on a page with a section hash opens that section.
  useEffect(() => {
    const sync = () => {
      closing.current = false;
      selectGuide(parseHash(window.location.hash));
    };
    // Safari need not focus a button on pointer activation. Capture the actual
    // trigger before React's onClick, rather than restoring an unrelated link.
    const rememberActivation = (event: MouseEvent) => {
      const trigger = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-guide-link]") : null;
      // eventPhase becomes NONE after dispatch; later hash changes must not
      // accidentally reuse this activation. No timer survives a close/unmount.
      activationRef.current = trigger ? { trigger, event } : null;
    };
    sync();
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    document.addEventListener("click", rememberActivation, true);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
      document.removeEventListener("click", rememberActivation, true);
      activationRef.current = null;
    };
  }, [selectGuide]);

  // Fetch each opening without a permanent client cache so admin publications
  // become visible on the next open, not only after a hard reload.
  const milestoneId = open?.milestoneId;
  const requestId = open?.requestId;
  useEffect(() => {
    if (!milestoneId || requestId === undefined) return;
    let cancelled = false;
    const controller = new AbortController();
    fetch(`/api/guides/${encodeURIComponent(milestoneId)}`, { cache: "no-store", credentials: "same-origin", signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Guide request failed.");
        const value: unknown = await response.json();
        return parseGuideResponse(milestoneId, value);
      }).then((guide) => {
        if (cancelled) return;
        setLoaded({ requestId, guide });
      })
      .catch(() => {
        if (cancelled) return;
        setLoaded({ requestId, guide: null });
      });
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [milestoneId, requestId]);

  const guide = open && loaded?.requestId === open.requestId ? loaded.guide : null;
  const loading = Boolean(open) && loaded?.requestId !== requestId;

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
        onSelectSection={openGuide}
        returnFocusRef={openerRef}
      />
    </GuideContext.Provider>
  );
}
