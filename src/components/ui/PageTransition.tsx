"use client";

import { ViewTransition, type ReactNode, type ViewTransitionInstance } from "react";
import "./page-transition.css";

let travelling = 0;
function beginTravel(instance: ViewTransitionInstance, phase: "old" | "new") {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (preference.matches) return;
  travelling += 1;
  document.documentElement.classList.add("waymark-page-travelling");
  // The browser already placed this snapshot in viewport coordinates. Center
  // the iris inside that captured placement, including a scrolled departure;
  // never squeeze a page-height image into a viewport-height box.
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
  const animation = instance[phase].animate(keyframes, {
    duration: 720, easing: "linear", fill: "both",
  });
  const reduce = () => { if (preference.matches) animation.finish(); };
  preference.addEventListener("change", reduce);
  return () => {
    preference.removeEventListener("change", reduce);
    animation.cancel();
    travelling -= 1;
    if (!travelling) document.documentElement.classList.remove("waymark-page-travelling");
  };
}

/** React owns navigation timing; the iris follows the browser's real capture. */
export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="waymark-page" exit="waymark-page" default="none"
      onEnter={(instance) => beginTravel(instance, "new")}
      onExit={(instance) => beginTravel(instance, "old")}>
      <div className="waymark-page-surface">{children}</div>
    </ViewTransition>
  );
}
