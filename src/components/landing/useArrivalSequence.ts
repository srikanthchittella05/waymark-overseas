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
  const entered = useRef(false);
  useGSAP(() => {
    const page = root.current;
    const sculpture = art.current;
    if (!page || !sculpture) return;
    if (!shouldAnimate) {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        document.dispatchEvent(new Event("waymark:arrival-done"));
        gsap.set(motion.current, { arrival: 1 });
        page.setAttribute("data-entrance", "complete");
      }
      return;
    }
    if (entered.current || window.scrollY > 24 || window.location.hash || document.documentElement.hasAttribute("data-waymark-arrival-skipped")) {
      document.dispatchEvent(new Event("waymark:arrival-done"));
      gsap.set(motion.current, { arrival: 1 });
      page.setAttribute("data-entrance", "complete");
      return;
    }

    const full = document.documentElement.dataset.waymarkArrival === "pending";
    const start = sculpture.getBoundingClientRect();
    document.documentElement.dataset.waymarkArrival = full ? "running" : "complete";
    const home = sculpture.getBoundingClientRect();
    const dx = start.left + start.width / 2 - home.left - home.width / 2;
    const dy = start.top + start.height / 2 - home.top - home.height / 2;
    const scale = start.width / Math.max(1, home.width);
    page.setAttribute("data-entrance", "entering");
    gsap.set(motion.current, { arrival: full ? 0 : 0.8 });

    const finish = () => {
      entered.current = true;
      page.setAttribute("data-entrance", "complete");
      gsap.set(motion.current, { arrival: 1 });
      sculpture.style.removeProperty("z-index");
      document.dispatchEvent(new Event("waymark:arrival-done"));
      delete document.documentElement.dataset.waymarkArrival;
    };
    const header = document.querySelector(".site-header");
    const sequence = gsap.timeline({ paused: true, defaults: { ease: "waymark" }, onComplete: finish });
    const textAt = full ? 1.02 : 0.08;
    if (full) {
      gsap.set(sculpture, { zIndex: 72, x: dx, y: dy, scale: scale * 0.86 });
      sequence
        .to(motion.current, { arrival: 1, duration: 1.85, ease: "power2.inOut" }, 0)
        .to(sculpture, { scale, duration: 0.9, ease: "power2.out" }, 0)
        .to(".arrival-aperture", { attr: { rx: 1050, ry: 1050 }, duration: 1.65 }, 0.58)
        .to(".arrival-copy-inner", { yPercent: -115, duration: 0.55 }, 0.58)
        .to(".arrival-rail", { y: 20, opacity: 0, duration: 0.4 }, 0.58)
        .to(sculpture, { x: 0, y: 0, scale: 1, duration: 1.6 }, 0.58);
    } else {
      sequence.to(motion.current, { arrival: 1, duration: 1.1, ease: "power2.out" }, 0);
    }
    sequence
      .fromTo(".hero-title .line-inner", { yPercent: 112, rotation: 4 },
        { yPercent: 0, rotation: 0, duration: 1.1, stagger: 0.12 }, textAt)
      .fromTo(".hero-kicker, .hero-bottom, .hero-rail", { clipPath: "inset(0% 100% 0% 0%)", y: 18 },
        { clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 0.8, stagger: 0.07 }, textAt + 0.28)
      .fromTo(".art-coordinate, .art-annotation", { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.06 }, textAt + 0.45);
    if (header && full) sequence.fromTo(header, { yPercent: -110 }, { yPercent: 0, duration: 0.8 }, 1.35);

    // Compile the real material before the cinematic handoff, without an unbounded
    // loading screen. A slow/denied GPU simply uses the matching static artwork.
    let wait = 0;
    const play = () => { window.clearTimeout(wait); sequence.play(); };
    const interrupt = () => { window.clearTimeout(wait); sequence.progress(1); };
    sculpture.addEventListener("journey-sculpture-ready", play, { once: true });
    document.addEventListener("waymark:skip-arrival", interrupt);
    if (!full || sculpture.querySelector('[data-webgl-status="ready"]')) play();
    else wait = window.setTimeout(play, 1000);
    return () => {
      window.clearTimeout(wait);
      sculpture.removeEventListener("journey-sculpture-ready", play);
      document.removeEventListener("waymark:skip-arrival", interrupt);
      finish();
    };
  }, { scope: root, dependencies: [shouldAnimate], revertOnUpdate: true });
}
