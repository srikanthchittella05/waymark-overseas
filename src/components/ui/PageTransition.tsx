"use client";

import { ViewTransition, type ReactNode, type ViewTransitionInstance } from "react";
import "./page-transition.css";

let travelling = 0;
function beginTravel(instance: ViewTransitionInstance, phase: "old" | "new") {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (preference.matches) return;
  // Guard against transitions triggered while the document is hidden (e.g.
  // background tab, automated navigation) — ViewTransition aborts those.
  if (document.visibilityState === "hidden") return;
  travelling += 1;
  document.documentElement.classList.add("waymark-page-travelling");
  // The browser already placed this snapshot in viewport coordinates. Center
  // the iris inside that captured placement, including a scrolled departure;
  // never squeeze a page-height image into a viewport-height box.
  let animation: Animation | null = null;
  try {
    const placement = instance.group.getComputedStyle().transform;
    const top = placement === "none" ? 0 : new DOMMatrixReadOnly(placement).m42;
    const x = window.innerWidth / 2;
    const y = window.innerHeight * 0.54 - top;
    const ellipse = (rx: number, ry: number) => `ellipse(${rx * window.innerWidth}px ${ry * window.innerHeight}px at ${x}px ${y}px)`;
    const keyframes = phase === "old" ? [
      { clipPath: ellipse(0.78, 0.92), offset: 0, easing: "cubic-bezier(0.65,0.05,0,1)" },
      { clipPath: ellipse(0, 0), offset: 0.54 },
      { clipPath: ellipse(0, 0), offset: 1 },
    ] : [
      { clipPath: ellipse(0.07, 0), offset: 0 },
      { clipPath: ellipse(0.07, 0), offset: 0.28, easing: "cubic-bezier(0.65,0.05,0,1)" },
      { clipPath: ellipse(0.78, 0.92), offset: 1 },
    ];
    animation = instance[phase].animate(keyframes, {
      duration: 720, easing: "linear", fill: "both",
    });
  } catch {
    travelling -= 1;
    if (!travelling) document.documentElement.classList.remove("waymark-page-travelling");
    return;
  }
  const reduce = () => { if (preference.matches && animation) animation.finish(); };
  preference.addEventListener("change", reduce);
  return () => {
    preference.removeEventListener("change", reduce);
    if (animation) { try { animation.cancel(); } catch {} }
    travelling -= 1;
    if (!travelling) document.documentElement.classList.remove("waymark-page-travelling");
  };
}

/** React owns navigation timing; the iris follows the browser's real capture. */
// Suppress the benign ViewTransition "Document hidden" abort error that fires
// when a transition is triggered while the tab is not visible (e.g. automated
// navigation, backgrounded tab). It does not affect navigation.
if (typeof window !== "undefined") {
  window.addEventListener("error", (e) => {
    if (e?.message?.includes("Transition was aborted because of invalid state")) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  });
  window.addEventListener("unhandledrejection", (e) => {
    if (String(e?.reason?.message ?? e?.reason ?? "").includes("Transition was aborted because of invalid state")) {
      e.preventDefault();
    }
  });
}

export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="waymark-page" exit="waymark-page" default="none"
      onEnter={(instance) => beginTravel(instance, "new")}
      onExit={(instance) => beginTravel(instance, "old")}>
      <div className="waymark-page-surface">{children}</div>
    </ViewTransition>
  );
}
