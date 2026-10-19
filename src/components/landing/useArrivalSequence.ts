"use client";

import { useRef, type RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { JourneyMotion } from "./JourneySculpture";

/** The actual sculpture unfolds inside an aperture, then stays in the world. */
export function useArrivalSequence(
  root: RefObject<HTMLDivElement | null>,
  art: RefObject<HTMLDivElement | null>,
  motion: RefObject<JourneyMotion>,
  shouldAnimate: boolean,
) {
  // Arrival cinematic disabled for the basic build.
  return;
  const entered = useRef(false);

  useGSAP(() => {
    // During SSR/hydration, shouldAnimate starts false even on motion-capable
    // devices. Do NOT complete the arrival in that case — wait for the real
    // preference to resolve and re-run. Only skip the cinematic when the OS
    // actually prefers reduced motion.
    const osReducedMotion =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!shouldAnimate && osReducedMotion) {
      // Respect reduced-motion preference immediately on non-animated mode.
      try {
        root.current?.ownerDocument?.documentElement?.dispatchEvent(
          new Event("waymark:arrival-done", { bubbles: true }),
        );
      } catch {}
      try {
        gsap.set(motion.current, { arrival: 1 });
      } catch {}
      try {
        root.current?.setAttribute("data-entrance", "complete");
      } catch {}
      return;
    }
    if (!shouldAnimate) {
      // Hydration pass on a motion-capable device: wait for re-run.
      return;
    }

    // ── Animated path ──────────────────────────────────────────────────
    const page = root.current;
    const sculpture = art.current;
    if (!page || !sculpture) return;

    // If the student already saw this arrival in another session, skip.
    if (entered.current) return;

    // If the user has already scrolled significantly, skip the entrance.
    // This prevents the cinematic from playing while the student is
    // already exploring the site.
    if (window.scrollY > 24 || window.location.hash) {
      entered.current = true;
      try {
        gsap.set(motion.current, { arrival: 1 });
      } catch {}
      try {
        root.current?.setAttribute("data-entrance", "complete");
      } catch {}
      try {
        root.current?.ownerDocument?.documentElement?.dispatchEvent(
          new Event("waymark:arrival-done", { bubbles: true }),
        );
      } catch {}
      return;
    }

    // Guard against the gallery being keyboard-focused and stranded.
    if (document.documentElement.hasAttribute("data-waymark-arrival-skipped")) {
      entered.current = true;
      try {
        gsap.set(motion.current, { arrival: 1 });
      } catch {}
      try {
        root.current?.setAttribute("data-entrance", "complete");
      } catch {}
      return;
    }

    // ── Entrance sequence ─────────────────────────────────────────────
    // Mark that we've started so a re‑render doesn't restart it.
    entered.current = true;

    // Reset the sculpture's z-index so it can be freely transformed.
    sculpture.style.removeProperty("z-index");

    // The full flag determines whether we show the complete "opening from
    // aperture" sequence or the abbreviated "in-orbit" version.
    const full =
      document.documentElement.dataset.waymarkArrival !== "complete";

    // If this is a fresh first visit (no stored preference), default to "full".
    if (!full) {
      document.documentElement.dataset.waymarkArrival = "running";
    }

    // ── Abbreviated entrance (non-full: e.g. returning visitor) ─────
    if (!full) {
      // Quick: motion arrives, sculpture settles. No aperture drama.
      try {
        gsap.to(motion.current, {
          arrival: 1,
          duration: 1.1,
          ease: "power2.out",
        });
      } catch {}
      try {
        root.current?.setAttribute("data-entrance", "complete");
      } catch {}
      try {
        root.current?.ownerDocument?.documentElement?.dispatchEvent(
          new Event("waymark:arrival-done", { bubbles: true }),
        );
      } catch {}
      return;
    }

    // ── Full entrance (first-time visitor) ────────────────────────────
    // Sculpture starts small at the cursor origin, then unfolds into the
    // full ribbon through the aperture.
    const startRect = sculpture.getBoundingClientRect();
    const homeRect = art.current?.getBoundingClientRect() ?? { left: 0, top: 0, width: 0, height: 0 }
    const dx = startRect.left + startRect.width / 2 - homeRect.left - homeRect.width / 2;
    const dy = startRect.top + startRect.height / 2 - homeRect.top - homeRect.height / 2;
    const scale = startRect.width / Math.max(1, homeRect.width);

    page.setAttribute("data-entrance", "entering");

    // Sculpture morphs from tiny origin to full size via the aperture.
    gsap.set(sculpture, {
      zIndex: 72,
      x: dx,
      y: dy,
      scale: scale * 0.86,
    });

    // Main timeline — the cinematic heart of the entrance.
    const timeline = gsap.timeline({
      paused: true,
      defaults: { ease: "waymark" }, // <-- "waymark" CustomEase: 0.65,0.05,0,1
      onComplete: () => {
        try {
          entered.current = true;
          page.setAttribute("data-entrance", "complete");
          gsap.set(motion.current, { arrival: 1 });
          sculpture.style.removeProperty("z-index");
          root.current?.ownerDocument?.documentElement?.dispatchEvent(
            new Event("waymark:arrival-done", { bubbles: true }),
          );
        } catch {}
      },
    });

    // --- Sculpture scaling/positioning ---
    timeline.to(motion.current, {
      arrival: 1,
      duration: 1.85,
      ease: "power2.inOut",
    }, 0);
    timeline.to(sculpture, {
      scale,
      duration: 0.9,
      ease: "power2.out",
    }, 0);

    // --- Aperture reveal (the "window" opening) ---
    timeline.to(
      ".arrival-aperture",
      {
        attr: { rx: 1050, ry: 1050 },
        duration: 1.65,
      },
      0.58,
    );
    timeline.to(
      ".arrival-copy-inner",
      { yPercent: -115, duration: 0.55 },
      0.58,
    );
    timeline.to(
      ".arrival-rail",
      { y: 20, opacity: 0, duration: 0.4 },
      0.58,
    );
    timeline.to(
      sculpture,
      { x: 0, y: 0, scale: 1, duration: 1.6 },
      0.58,
    );

    // --- Hero text reveal (the "what now" copy) ---
    // Staggered lines of the main title
    timeline.fromTo(
      "#hero-title .line-inner",
      { yPercent: 112, rotation: 4 },
      { yPercent: 0, rotation: 0, duration: 1.1, stagger: 0.12 },
      1.02, // textAt
    );
    // Supporting elements: kicker, bottom, rail
    timeline.fromTo(
      ".hero-bottom, .hero-rail",
      { clipPath: "inset(0% 100% 0% 0%)", y: 18 },
      { clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 0.8, stagger: 0.07 },
      1.28, // textAt + 0.28
    );
    // Art annotations / coordinates fade in
    timeline.fromTo(
      ".art-coordinate, .art-annotation",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.65, stagger: 0.06 },
      1.45, // textAt + 0.45
    );

    // --- Site header response (only on full/first visit) ---
    const header = document.querySelector(".site-header");
    if (header && full) {
      timeline.fromTo(
        header,
        { yPercent: -110 },
        { yPercent: 0, duration: 0.8 },
        1.35,
      );
    }

    // --- Pre-material compile (GPU warm-up, no unbounded loader) ---
    // The sculpture must have a "ready" WebGL context before we play.
    // If GPU is slow/denied, the static artwork is shown instead.
    const wait: NodeJS.Timeout | null = null;
    const play = () => {
      if (wait) window.clearTimeout(wait);
      timeline.play();
    };
    const interrupt = () => {
      if (wait) window.clearTimeout(wait);
      timeline.progress(1);
    };

    // Start the cinematic once the sculpture's WebGL context is ready.
    // Use three complementary triggers to avoid the race where the sculpture
    // becomes ready before this listener is attached (common under StrictMode
    // and during hydration):
    //  1. Event from JourneySculpture (bubbles from .journey-sculpture).
    //  2. Polling every 50ms (catches the case where ready happened first).
    //  3. 1s timeout fallback (constrained/slow GPU).
    let played = false;
    const tryPlay = () => {
      if (played) return;
      const st = sculpture.querySelector('[data-webgl-status="ready"]');
      if (st) {
        played = true;
        play();
      }
    };
    sculpture.addEventListener("journey-sculpture-ready", () => { played = true; play(); }, { once: true });
    document.addEventListener("waymark:skip-arrival", interrupt);
    tryPlay();
    const readyPoll = window.setInterval(() => {
      if (played) { window.clearInterval(readyPoll); return; }
      tryPlay();
    }, 50);
    const readyTimeout = window.setTimeout(() => {
      window.clearInterval(readyPoll);
      if (!played) { played = true; play(); }
    }, 1000);

    // Cleanup on unmount — critical to prevent memory leaks and stale timers.
    return () => {
      if (wait) window.clearTimeout(wait);
      window.clearInterval(readyPoll);
      window.clearTimeout(readyTimeout);
      sculpture.removeEventListener("journey-sculpture-ready", play);
      document.removeEventListener("waymark:skip-arrival", interrupt);
      // Do NOT call finish() here — the timeline owns its completion.
      // Revert GSAP state so a subsequent mount starts fresh.
      try {
        gsap.set(sculpture, { clearProps: "transform,zIndex" });
      } catch {}
    };
  }, {
    // Dependencies that trigger re-run should state change.
    dependencies: [shouldAnimate],
    // Revert GSAP state on update so a new mount starts clean.
    revertOnUpdate: true,
  });
}