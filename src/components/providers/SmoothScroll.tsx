"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useMotionPreferences } from "./MotionProvider";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const { shouldAnimate } = useMotionPreferences();

  useEffect(() => {
    if (!shouldAnimate || typeof window.matchMedia !== "function") return;

    const finePointer = window.matchMedia("(pointer: fine)");
    let destroyLenis: (() => void) | undefined;

    const syncPointer = () => {
      destroyLenis?.();
      destroyLenis = undefined;
      if (!finePointer.matches) return;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        autoRaf: false,
        anchors: true,
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
        respectReducedMotion: true,
        prevent: (node) =>
          node.matches("[data-lenis-prevent], dialog, [role='dialog'], [aria-modal='true']"),
      });
      // Use real milliseconds without changing GSAP's global lag-smoothing policy.
      const tick = () => lenis.raf(performance.now());
      const resize = () => lenis.resize();
      const restoreGallery = (event: Event) => {
        const top = (event as CustomEvent<{ top: number }>).detail?.top;
        if (Number.isFinite(top)) lenis.scrollTo(top, { immediate: true, force: true });
      };
      const unsubscribeScroll = lenis.on("scroll", () => ScrollTrigger.update());

      gsap.ticker.add(tick, false, true);
      ScrollTrigger.addEventListener("refresh", resize);
      window.addEventListener("waymark:scroll-to", restoreGallery);
      ScrollTrigger.refresh();

      destroyLenis = () => {
        gsap.ticker.remove(tick);
        ScrollTrigger.removeEventListener("refresh", resize);
        window.removeEventListener("waymark:scroll-to", restoreGallery);
        unsubscribeScroll();
        lenis.destroy();
        ScrollTrigger.update();
      };
    };

    finePointer.addEventListener("change", syncPointer);
    syncPointer();

    return () => {
      finePointer.removeEventListener("change", syncPointer);
      destroyLenis?.();
    };
  }, [shouldAnimate]);

  return <>{children}</>;
}
