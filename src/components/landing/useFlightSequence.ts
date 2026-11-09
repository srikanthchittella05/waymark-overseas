"use client";

import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { continuousHeading, flightPath, sampleFlightPath, smoothProgress, unitProgress, type FlightPoint } from "@/lib/motion/flight-route";
import type { JourneyMotion } from "./JourneySculpture";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** One mesh shrinks into a traveller, then rides the actual displayed SVG. */
export function useFlightSequence(root: RefObject<HTMLDivElement | null>, motion: RefObject<JourneyMotion>, animate: boolean) {
  useGSAP(() => {
    const page = root.current;
    if (!page || !animate) return;
    const anchor = page.querySelector<HTMLElement>(".hero-art-anchor");
    const flyer = page.querySelector<HTMLElement>(".hero-art-scroll");
    const section = page.querySelector<HTMLElement>(".manifesto");
    const message = page.querySelector<HTMLElement>(".manifesto-message");
    const label = section?.querySelector<HTMLElement>(".section-label");
    const svg = page.querySelector<SVGSVGElement>(".world-route");
    const track = svg?.querySelector<SVGPathElement>(".world-route-track");
    const ink = svg?.querySelector<SVGPathElement>(".world-route-ink");
    const terminal = svg?.querySelector<SVGCircleElement>("circle");
    if (!anchor || !flyer || !section || !message || !label || !svg || !track || !ink || !terminal) return;

    let points: FlightPoint[] = [];
    let smallScale = 1;
    let handoff = 0.35;
    let endScroll = 1;
    let narrow = false;
    const driver = { progress: 0 };
    const original = [svg.getAttribute("viewBox"), track.getAttribute("d"), terminal.getAttribute("cx"), terminal.getAttribute("cy")];
    gsap.set(flyer, { x: 0, y: 0, scale: 1, rotation: 0 });
    const setX = gsap.quickSetter(flyer, "x", "px");
    const setY = gsap.quickSetter(flyer, "y", "px");
    // quickSetter does not expand the scaleX,scaleY alias in this GSAP build.
    const setScaleX = gsap.quickSetter(flyer, "scaleX");
    const setScaleY = gsap.quickSetter(flyer, "scaleY");
    const setRotation = gsap.quickSetter(flyer, "rotation", "deg");
    const setMorph = gsap.quickSetter(motion.current, "scroll");
    gsap.set(motion.current, { resolve: 0 });

    const measure = () => {
      const origin = anchor.getBoundingClientRect();
      const bounds = section.getBoundingClientRect();
      if (origin.width <= 0 || origin.height <= 0 || bounds.height <= 0) return;
      narrow = window.innerWidth < 900;
      const d = flightPath(bounds.width, bounds.height, message.getBoundingClientRect().bottom - bounds.top, label.getBoundingClientRect().bottom - bounds.top, narrow);
      svg.setAttribute("viewBox", `0 0 ${bounds.width} ${bounds.height + 4}`);
      track.setAttribute("d", d);
      ink.setAttribute("d", d);
      const length = track.getTotalLength();
      const matrix = track.getScreenCTM();
      if (!matrix || length <= 0) return;
      points = [];
      for (let i = 0; i <= 320; i++) {
        const distance = length * i / 320;
        const point = track.getPointAtLength(distance).matrixTransform(matrix);
        const before = track.getPointAtLength(Math.max(0, distance - 0.5)).matrixTransform(matrix);
        const after = track.getPointAtLength(Math.min(length, distance + 0.5)).matrixTransform(matrix);
        const angle = Math.atan2(after.y - before.y, after.x - before.x) * 180 / Math.PI;
        points.push({ x: point.x - origin.left - origin.width / 2, y: point.y - origin.top - origin.height / 2,
          angle: i === 0 ? angle : continuousHeading(points[i - 1].angle, angle) });
      }
      const end = track.getPointAtLength(length);
      terminal.setAttribute("cx", String(end.x));
      terminal.setAttribute("cy", String(end.y));
      const start = track.getPointAtLength(0);
      section.style.setProperty("--flight-origin-x", `${start.x}px`);
      section.style.setProperty("--flight-origin-y", `${start.y}px`);
      // Camera frustum + original aircraft span give a 96px/64px aircraft,
      // independently of the much larger infinity's rendering surface.
      const fit = Math.min(1.25, origin.width / origin.height);
      const projectedSpan = 4.32 * fit * origin.height / (2 * 7.8 * Math.tan(21 * Math.PI / 180));
      smallScale = (narrow ? 64 : 96) / projectedSpan;
      const worldTop = page.querySelector(".world-opening")!.getBoundingClientRect().top + window.scrollY;
      // Begin and finish with the traveller comfortably inside the viewport,
      // not below its bottom edge while the right-hand curve is traversed.
      // ScrollTrigger and native scroll positions resolve to CSS pixels. Round
      // our shared boundaries too, so a refresh cannot introduce fractional drift.
      const handoffScroll = Math.round(bounds.top + start.y + window.scrollY - window.innerHeight * 0.65);
      endScroll = Math.round(Math.max(worldTop + 1, bounds.bottom + window.scrollY + 4 - window.innerHeight * 0.65));
      handoff = Math.max(0.18, Math.min(0.65, (handoffScroll - worldTop) / (endScroll - worldTop)));
      page.setAttribute("data-flight-handoff", String(handoffScroll));
      page.setAttribute("data-flight-end", String(endScroll));
    };

    const render = () => {
      if (points.length < 2) return;
      const progress = unitProgress(driver.progress);
      const unfolding = unitProgress(progress / handoff);
      const morph = smoothProgress(unfolding);
      const route = unitProgress((progress - handoff) / (1 - handoff));
      let pose = sampleFlightPath(points, route);
      let scale = smallScale;
      if (progress < handoff) {
        const target = points[0];
        const tangent = target.angle * Math.PI / 180;
        const reach = Math.min(160, Math.abs(target.y) * 0.25);
        const c1x = narrow ? Math.max(0, target.x) : target.x * 0.65;
        const c1y = target.y * 0.15;
        const c2x = target.x - Math.cos(tangent) * reach;
        const c2y = target.y - Math.sin(tangent) * reach;
        const u = 1 - unfolding;
        pose = { x: 3 * u * u * unfolding * c1x + 3 * u * unfolding * unfolding * c2x + unfolding ** 3 * target.x,
          y: 3 * u * u * unfolding * c1y + 3 * u * unfolding * unfolding * c2y + unfolding ** 3 * target.y,
          angle: target.angle * morph };
        scale = 1 + (smallScale - 1) * smoothProgress(unfolding * 1.6);
      }
      setMorph(morph);
      setX(pose.x); setY(pose.y); setScaleX(scale); setScaleY(scale); setRotation(pose.angle);
      ink.style.setProperty("stroke-dashoffset", String(1 - route));
      flyer.setAttribute("data-route-progress", String(route));
      flyer.setAttribute("data-morph-progress", String(morph));
    };

    measure();
    gsap.to(".orbital", { autoAlpha: 0, ease: "none", scrollTrigger: {
        trigger: ".world-opening", start: "top top", end: () => `+=${Math.max(100, endScroll * handoff * 0.35)}`, scrub: true,
    } });
    gsap.to(driver, { progress: 1, ease: "none", onUpdate: render, scrollTrigger: {
        id: "waymark-flight", trigger: ".world-opening", start: "top top", end: () => endScroll, scrub: 0.24,
        invalidateOnRefresh: true, onRefreshInit: measure, onRefresh: render,
    } });
    render();
    let refreshFrame = 0;
    let disposed = false;
    const resize = () => {
      if (disposed || refreshFrame) return;
      refreshFrame = requestAnimationFrame(() => { refreshFrame = 0; ScrollTrigger.refresh(); });
    };
    const observer = new ResizeObserver(resize);
    observer.observe(section); observer.observe(anchor);
    document.fonts.ready.then(resize);
    return () => {
      disposed = true;
      cancelAnimationFrame(refreshFrame);
      observer.disconnect();
      svg.setAttribute("viewBox", original[0]!);
      track.setAttribute("d", original[1]!); ink.setAttribute("d", original[1]!);
      terminal.setAttribute("cx", original[2]!); terminal.setAttribute("cy", original[3]!);
      ink.style.removeProperty("stroke-dashoffset");
      section.style.removeProperty("--flight-origin-x"); section.style.removeProperty("--flight-origin-y");
      page.removeAttribute("data-flight-handoff"); page.removeAttribute("data-flight-end");
      flyer.removeAttribute("data-route-progress"); flyer.removeAttribute("data-morph-progress");
      gsap.set(motion.current, { scroll: 0 });
    };
  }, { scope: root, dependencies: [animate], revertOnUpdate: true });
}
