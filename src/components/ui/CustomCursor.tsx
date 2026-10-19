"use client";

import { useEffect, useRef } from "react";
import { useMotionPreferences } from "../providers/MotionProvider";

export default function CustomCursor() {
  const auraRef = useRef<HTMLDivElement>(null);
  const { shouldAnimate } = useMotionPreferences();

  useEffect(() => {
    const aura = auraRef.current;
    if (!aura || !shouldAnimate || typeof window.matchMedia !== "function") return;

    const fineHover = window.matchMedia("(pointer: fine) and (hover: hover)");
    let stopTracking: (() => void) | undefined;

    const syncPointer = () => {
      stopTracking?.();
      stopTracking = undefined;
      if (!fineHover.matches) return;

      let rafId = 0;
      let x = 0;
      let y = 0;
      let scale = 1;

      const hide = () => {
        cancelAnimationFrame(rafId);
        rafId = 0;
        aura.style.opacity = "0";
      };

      const onMove = (event: PointerEvent) => {
        if (event.pointerType === "touch") {
          hide();
          return;
        }

        x = event.clientX;
        y = event.clientY;
        scale =
          event.target instanceof Element &&
          event.target.closest("a, button, input, select, textarea, summary, [role='button']")
            ? 1.4
            : 1;

        // Coalesce pointer events; there is no animation loop while the pointer is idle.
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
          rafId = 0;
          aura.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
          aura.style.opacity = "1";
        });
      };

      const onOut = (event: PointerEvent) => {
        if (event.relatedTarget === null) hide();
      };
      const onDown = (event: PointerEvent) => {
        if (event.pointerType === "touch") hide();
      };
      const onVisibilityChange = () => {
        if (document.hidden) hide();
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerout", onOut);
      window.addEventListener("pointerdown", onDown, { passive: true });
      window.addEventListener("pointercancel", hide);
      window.addEventListener("blur", hide);
      document.addEventListener("visibilitychange", onVisibilityChange);

      stopTracking = () => {
        hide();
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerout", onOut);
        window.removeEventListener("pointerdown", onDown);
        window.removeEventListener("pointercancel", hide);
        window.removeEventListener("blur", hide);
        document.removeEventListener("visibilitychange", onVisibilityChange);
      };
    };

    fineHover.addEventListener("change", syncPointer);
    syncPointer();

    return () => {
      fineHover.removeEventListener("change", syncPointer);
      stopTracking?.();
    };
  }, [shouldAnimate]);

  return (
    <div
      ref={auraRef}
      className="pointer-aura"
      aria-hidden="true"
      style={{
        opacity: 0,
        transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)",
      }}
    />
  );
}
