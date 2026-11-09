"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import { useMotionPreferences } from "@/components/providers/MotionProvider";
import { DESTINATIONS, SUPPORTED_COUNTRIES } from "@/lib/engine/destinations";
import PlanStory from "./PlanStory";
import { useArrivalSequence } from "./useArrivalSequence";
import { useFlightSequence } from "./useFlightSequence";
import type { JourneyMotion } from "./JourneySculpture";
import "./world-motion.css";

gsap.registerPlugin(useGSAP, ScrollTrigger, CustomEase);
CustomEase.create("waymark", "0.65,0.05,0,1");

const JourneySculpture = dynamic(() => import("./JourneySculpture"), { ssr: false });

const PRODUCT_VIEWS = [
  { href: "/today", name: "Today", promise: "One next move.", copy: "Your next action, why it matters now, and what needs to happen first." },
  { href: "/route", name: "The route", promise: "See the whole journey.", copy: "Milestones dated backwards from your intake, with their dependencies." },
  { href: "/steps", name: "The steps", promise: "Make progress tangible.", copy: "A checklist by phase, with sources and confidence for each milestone." },
  { href: "/path", name: "Your path", promise: "Make it your own.", copy: "Compare destinations and intakes before confirming a new target." },
] as const;

// Destinations come from the engine's country list, so the gallery can never
// advertise somewhere we cannot actually build a dated plan for.

/** Country code -> the engine's own name, so the card and the plan agree. */
function countryName(code: string): string {
  return SUPPORTED_COUNTRIES.find((c) => c.code === code)?.name ?? code;
}

function Arrow({ diagonal = false, className = "" }: { diagonal?: boolean; className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h16m-7-7 7 7-7 7"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function SculptureFallback() {
  return (
    // Generated from our own mesh, camera and studio. Static and GPU modes share
    // one silhouette/material instead of switching from a tube to a ribbon.
    <Image className="sculpture-fallback" src="/journey-infinity.webp" alt="" aria-hidden="true"
      width={833} height={833} unoptimized preload />
  );
}

export default function LandingExperience() {
  const root = useRef<HTMLDivElement>(null);
  const art = useRef<HTMLDivElement>(null);
  const gallery = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const galleryTrigger = useRef<ScrollTrigger | null>(null);
  const sculptureMotion = useRef<JourneyMotion>({ scroll: 0, arrival: 0, resolve: 0 });
  const [sceneStatus, setSceneStatus] = useState<"loading" | "ready" | "unavailable">("loading");
  const sceneReady = sceneStatus === "ready";
  const { shouldAnimate, reducedMotion } = useMotionPreferences();
  const handleSceneReady = useCallback(() => {
    art.current?.setAttribute("data-graphics", "ready");
    setSceneStatus("ready");
    art.current?.dispatchEvent(new Event("journey-sculpture-ready"));
  }, []);
  useArrivalSequence(root, art, sculptureMotion, shouldAnimate);
  useFlightSequence(root, sculptureMotion, shouldAnimate && sceneStatus !== "unavailable");

  // Pinned mode drives the track with a scrubbed transform, so keyboard users
  // get real scrollbars while the gallery holds focus.
  const setGalleryKeyboardMode = useCallback((focused: boolean) => {
    const node = gallery.current;
    if (!node) return;

    if (focused) {
      if (!galleryTrigger.current) return; // Native layouts already own scrollLeft.
      if (node.hasAttribute("data-keyboard-gallery")) return;
      const position = Math.max(0, -Number(gsap.getProperty(track.current, "x") || 0));
      node.setAttribute("data-keyboard-gallery", "");
      node.scrollLeft = position;
      return;
    }
    // Nothing to release. Without this guard a window blur would force the
    // pinned scrub back to zero on every focus change that never engaged it.
    if (!node.hasAttribute("data-keyboard-gallery")) return;

    // Reverting overflow resets scrollLeft to 0, so carry the position the
    // keyboard user reached back into the pinned scrub before releasing.
    const reached = node.scrollLeft;
    node.removeAttribute("data-keyboard-gallery");
    // Native and transformed travel are alternatives, never additive. Some
    // browsers retain scrollLeft after overflow is clipped again.
    node.scrollLeft = 0;
    const span = Math.max(1, (track.current?.scrollWidth ?? 0) - node.clientWidth);
    const trigger = galleryTrigger.current;
    if (trigger) {
      const top = trigger.start + reached / span * (trigger.end - trigger.start);
      if (document.documentElement.classList.contains("lenis")) {
        window.dispatchEvent(new CustomEvent("waymark:scroll-to", { detail: { top } }));
      } else trigger.scroll(top);
    }
  }, []);

  const galleryKeys = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    const node = event.currentTarget;
    const maximum = node.scrollWidth - node.clientWidth;
    const direction = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!direction && event.key !== "Home" && event.key !== "End") return;
    event.preventDefault();
    setGalleryKeyboardMode(true);
    node.scrollLeft = event.key === "Home" ? 0 : event.key === "End" ? maximum
      : node.scrollLeft + direction * Math.min(360, node.clientWidth * 0.65);
  };

  const moveGallery = (direction: -1 | 1) => {
    const lane = gallery.current;
    const laneTrack = track.current;
    if (!lane || !laneTrack) return;
    const trigger = galleryTrigger.current;
    const native = !trigger || lane.hasAttribute("data-keyboard-gallery");
    const current = native ? lane.scrollLeft : -Number(gsap.getProperty(laneTrack, "x") || 0);
    const card = laneTrack.querySelector<HTMLElement>(".destination-card");
    const step = (card?.offsetWidth ?? lane.clientWidth * 0.8) + (parseFloat(getComputedStyle(laneTrack).columnGap) || 0);
    const maximum = Math.max(0, laneTrack.scrollWidth - lane.clientWidth);
    const reached = Math.max(0, Math.min(maximum, current + direction * step));
    if (native) lane.scrollTo({ left: reached, behavior: reducedMotion ? "instant" : "smooth" });
    else {
      const top = trigger.start + reached / Math.max(1, maximum) * (trigger.end - trigger.start);
      if (document.documentElement.classList.contains("lenis")) {
        window.dispatchEvent(new CustomEvent("waymark:scroll-to", { detail: { top } }));
      } else trigger.scroll(top);
    }
  };

  // Window blur never fires focusout, which would strand the attribute on and
  // freeze the scroll-driven gallery.
  useEffect(() => {
    const release = () => setGalleryKeyboardMode(false);
    window.addEventListener("blur", release);
    document.addEventListener("visibilitychange", release);
    return () => {
      window.removeEventListener("blur", release);
      document.removeEventListener("visibilitychange", release);
    };
  }, [setGalleryKeyboardMode]);

  useEffect(() => {
    const element = art.current;
    const unavailable = () => { art.current?.setAttribute("data-graphics", "unavailable"); setSceneStatus("unavailable"); };
    const loading = () => { art.current?.removeAttribute("data-graphics"); setSceneStatus("loading"); };
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    element?.addEventListener("journey-sculpture-unavailable", unavailable);
    element?.addEventListener("journey-sculpture-loading", loading);
    // A preference change unmounts the canvas. Its previous ready state must
    // not hide the static artwork while a new GPU context is still compiling.
    preference.addEventListener("change", loading);
    return () => {
      element?.removeEventListener("journey-sculpture-unavailable", unavailable);
      element?.removeEventListener("journey-sculpture-loading", loading);
      preference.removeEventListener("change", loading);
    };
  }, []);

  useGSAP(() => {
    if (!shouldAnimate) return;
    const media = gsap.matchMedia();

    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
      gsap.fromTo(element, { clipPath: "inset(0% 100% 0% 0%)", y: 16 }, {
        clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 0.75, ease: "waymark",
        scrollTrigger: { trigger: element, start: "top 91%", once: true },
      });
    });

    gsap.fromTo(".manifesto-word", { yPercent: 103, rotation: 1.5 }, {
      yPercent: 0, rotation: 0, stagger: 0.12, duration: 0.85, ease: "waymark",
      scrollTrigger: { trigger: ".manifesto-statement", start: "top 88%", once: true },
    });

    media.add("(min-width: 900px) and (min-height: 550px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(".ps-stage", { clipPath: "inset(0% 8% round 3rem)" }, {
        clipPath: "inset(0% 0% round 0rem)", ease: "none",
        scrollTrigger: { trigger: ".ps-story", start: "top 85%", end: "top 25%", scrub: 0.4 },
      });
      gsap.fromTo(".closing-section", { clipPath: "ellipse(100% 0% at 50% 0%)" }, {
        clipPath: "ellipse(100% 150% at 50% 0%)", ease: "none",
        scrollTrigger: { trigger: ".closing-section", start: "top 95%", end: "top 25%", scrub: 0.35 },
      });
    });

    gsap.utils.toArray<HTMLElement>(".journey-view").forEach((row) => {
      gsap.fromTo(row.querySelectorAll(".journey-view-title, .journey-view-copy"),
        { yPercent: 55, clipPath: "inset(0 0 100% 0)" }, { yPercent: 0, clipPath: "inset(0 0 0% 0)",
          duration: 0.85, stagger: 0.09, ease: "waymark",
          scrollTrigger: { trigger: row, start: "top 88%", once: true } });
      gsap.fromTo(row, { "--row-progress": 0 }, { "--row-progress": 1, ease: "none",
        scrollTrigger: { trigger: row, start: "top 85%", end: "bottom 45%", scrub: true } });
    });

    gsap.fromTo(".closing-line", { yPercent: 103 }, { yPercent: 0, duration: 0.85,
      stagger: 0.1, ease: "waymark", scrollTrigger: { trigger: ".closing-main", start: "top 82%", once: true } });

    // Pinning holds a full viewport still, so it only runs where the section
    // actually fits. Short windows scroll the content normally instead.
    media.add("(min-width: 900px) and (min-height: 700px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {

      if (track.current && gallery.current) {
        const distance = () => {
          const lane = gallery.current;
          const laneTrack = track.current;
          if (!lane || !laneTrack) return 0;
          return Math.max(0, laneTrack.scrollWidth - lane.clientWidth);
        };
        galleryTrigger.current = null;
        const travel = gsap.to(track.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: ".destinations-section",
            start: "top top",
            end: () => `+=${Math.max(distance(), 600)}`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onRefresh: (self) => {
              galleryTrigger.current = self;
            },
          },
        });
        // The reveal belongs to each card entering the lens, not a generic fade.
        gsap.utils.toArray<HTMLElement>(".destination-card").forEach((card, index) => {
          gsap.fromTo(card, { clipPath: "ellipse(100% 0% at 50% 0%)" }, {
            clipPath: "ellipse(100% 145% at 50% 0%)", ease: "waymark", duration: 0.9,
            scrollTrigger: index < 2
              ? { trigger: ".destinations-section", start: "top 78%", once: true }
              : { trigger: card, containerAnimation: travel, start: "left 98%", end: "left 45%", scrub: true },
          });
          gsap.fromTo(card.querySelector("img"), { xPercent: -4, scale: 1.12 }, {
            xPercent: 4, scale: 1.12, ease: "none", scrollTrigger: {
              trigger: card, containerAnimation: travel, start: "left right", end: "right left", scrub: true,
            },
          });
        });
      }
    });

    const magnets: Array<() => void> = [];
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      root.current?.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((element) => {
        const xTo = gsap.quickTo(element, "x", { duration: 0.5, ease: "power3.out" });
        const yTo = gsap.quickTo(element, "y", { duration: 0.5, ease: "power3.out" });
        const move = (event: PointerEvent) => {
          const box = element.getBoundingClientRect();
          xTo((event.clientX - box.left - box.width / 2) * 0.12);
          yTo((event.clientY - box.top - box.height / 2) * 0.15);
        };
        const leave = () => { xTo(0); yTo(0); };
        element.addEventListener("pointermove", move);
        element.addEventListener("pointerleave", leave);
        magnets.push(() => { element.removeEventListener("pointermove", move); element.removeEventListener("pointerleave", leave); xTo.tween.kill(); yTo.tween.kill(); gsap.set(element, { clearProps: "transform" }); });
      });
    }

    return () => {
      media.revert();
      magnets.forEach((cleanup) => cleanup());
      galleryTrigger.current = null;
    };
  }, { scope: root, dependencies: [shouldAnimate], revertOnUpdate: true });

  return (
    <div className="landing" ref={root} data-motion={shouldAnimate ? "on" : "off"}>
      <div className="arrival-intro" aria-hidden="true">
        <svg className="arrival-veil" viewBox="0 0 1000 1000" preserveAspectRatio="none"><defs><mask id="arrival-window"><rect width="1000" height="1000" fill="white" /><ellipse className="arrival-aperture" cx="500" cy="460" rx="0" ry="0" fill="black" /></mask></defs><rect width="1000" height="1000" fill="var(--color-forest)" mask="url(#arrival-window)" /></svg>
        <div className="arrival-copy"><div className="arrival-copy-inner"><span className="arrival-brand">An open world.</span><span>A way that’s yours.</span></div></div>
        <div className="arrival-rail eyebrow"><span>SCROLL OR PRESS A KEY TO ENTER ↗</span></div>
      </div>
      <div className={`world-opening${sceneReady && !reducedMotion ? " scene-can-fly" : ""}`}>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-kicker eyebrow"><span className="status-spark" /> Independent study-abroad planning</div>
        <h1 className="hero-title" id="hero-title">
          <span className="title-line"><span className="line-inner">A bigger</span></span>
          <span className="title-line"><span className="line-inner world-word">world<span className="world-period">.</span></span></span>
          <span className="sr-only"> A clearer next step.</span>
        </h1>
        <div className="hero-art-anchor" aria-hidden="true"><div className={`hero-art ${sceneReady && !reducedMotion ? "scene-is-ready" : ""}`} ref={art}>
          <div className="hero-art-scroll">
            <div className="orbital orbital-one" /><div className="orbital orbital-two" />
            <SculptureFallback />
            {!reducedMotion && <JourneySculpture paused={!shouldAnimate} motion={sculptureMotion} onReady={handleSceneReady} />}
          </div>
        </div></div>
        <div className="hero-bottom">
          <div className="hero-description"><p className="hero-subtitle">A clearer next step.</p><p>One destination. A dated plan.<br />Know what comes next—and why.</p></div>
          <Link href="/path" className="pill-button button-dark hero-cta" data-magnetic><span>Build my route</span><span className="button-arrow"><Arrow diagonal /></span></Link>
          <a href="#vision" className="scroll-cue"><span className="scroll-orbit" /><span className="scroll-down" aria-hidden="true">↓</span><span className="eyebrow">WATCH IT<br />TAKE FLIGHT</span></a>
        </div>
      </section>

      <section className="manifesto section-pad" id="vision" aria-labelledby="vision-title">
        <div className="section-label eyebrow" data-reveal><span>01 / THE IDEA</span></div>
        <div className="manifesto-grid">
          <div className="manifesto-message"><h2 className="manifesto-statement" id="vision-title"><span className="mask-line"><span className="manifesto-word">Less circling.</span></span><span className="mask-line"><span className="manifesto-word serif">More going.</span></span></h2>
            <div className="manifesto-copy" data-reveal><p className="manifesto-detail">Choose where you want to go. We connect the steps, dates and sources—so you know what to do next.</p><a href="#plan" className="text-link">See how a plan takes shape <Arrow diagonal /></a></div>
          </div>
          <div className="manifesto-art-slot" aria-hidden="true" />
        </div>
        <svg className="flight-static" viewBox="0 0 400 400" fill="none" aria-hidden="true" focusable="false"><path d="M200 34 218 160 342 250 340 276 218 226 211 324 252 352 252 369 200 348 148 369 148 352 189 324 182 226 60 276 58 250 182 160Z" fill="url(#flight-alloy)" stroke="#dce7b3" strokeWidth="1.2" /><path d="m200 34 0 314m-18-122 18-48 18 48m-29 98 11-98 11 98" stroke="#f1f3eb" strokeOpacity=".6" /><defs><linearGradient id="flight-alloy" x1="80" y1="100" x2="310" y2="300" gradientUnits="userSpaceOnUse"><stop stopColor="#fafbf3"/><stop offset=".45" stopColor="#a3b6a0"/><stop offset=".52" stopColor="#edf1e9"/><stop offset="1" stopColor="#547064"/></linearGradient></defs></svg>
        <svg className="world-route" viewBox="0 0 1440 1064" preserveAspectRatio="none" fill="none" aria-hidden="true"><path className="world-route-track" d="M1123 240C1382 380 1382 728 835 728S32 728 32 800V1064" /><path className="world-route-ink" d="M1123 240C1382 380 1382 728 835 728S32 728 32 800V1064" pathLength="1" /><circle cx="32" cy="1064" r="4" /></svg>
      </section>
      </div>

      <PlanStory />

      <section className="product-journey section-pad" aria-labelledby="journey-title">
        <div className="section-label eyebrow" data-reveal><span>03 / YOUR PLANNING SPACE</span></div>
        <h2 className="journey-heading" id="journey-title" data-reveal>All the moving parts.<br /><span className="serif">One clear picture.</span></h2>
        <div className="journey-views">{PRODUCT_VIEWS.map((view, index) => <Link className="journey-view" href={view.href} key={view.href}>
          <span className="journey-view-index eyebrow">0{index + 1}</span>
          <div className="journey-view-title"><p className="eyebrow">{view.name}</p><h3>{view.promise}</h3></div>
          <div className="journey-view-copy"><p>{view.copy}</p></div>
          <span className="journey-view-arrow" aria-hidden="true"><Arrow diagonal /></span>
        </Link>)}</div>
        <p className="journey-local">Explore without an account. Guest changes are temporary and reset on reload. Sign in to save when accounts are enabled. Waymark plans your next step; it does not submit applications.</p>
      </section>

      <section className="destinations-section" id="possibilities" aria-labelledby="destinations-title">
        <div className="destinations-heading section-pad"><div className="section-label eyebrow"><span>04 / DESTINATIONS</span></div><div className="destinations-intro"><h2 id="destinations-title">Same you.<br /><span className="serif">New horizons.</span></h2><span className="eyebrow gallery-hint"><span className="desktop-hint">KEEP SCROLLING TO EXPLORE</span><span className="touch-hint">SWIPE TO EXPLORE</span> <span aria-hidden="true">→</span></span></div></div>
        <div className="destination-viewport" id="destination-gallery" ref={gallery} tabIndex={0} role="group" aria-label="Destination inspiration. Focus this gallery, then use the arrow keys, Home or End to explore sideways." onKeyDown={galleryKeys} onFocus={() => setGalleryKeyboardMode(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setGalleryKeyboardMode(false); }}>
          <div className="destination-track" ref={track}>
            {DESTINATIONS.map((destination, index) => (
              <Link href={`/path?country=${destination.code}`} className="destination-card" key={destination.code}><Image src={destination.image} alt={destination.alt} fill unoptimized sizes="(max-width: 899px) 82vw, 34vw" loading="lazy" /><div className="destination-shade" /><div className="destination-meta eyebrow"><span>0{index + 1} / 0{DESTINATIONS.length}</span></div><div className="destination-copy"><h3>{countryName(destination.code)}</h3><span className="destination-arrow" aria-hidden="true"><Arrow diagonal /></span></div></Link>
            ))}
          </div>
        </div>
        <div className="destination-footnote section-pad"><span>Destination inspiration, not a programme directory.</span><div className="destination-controls"><button type="button" aria-label="Previous destination" aria-controls="destination-gallery" onClick={() => moveGallery(-1)}>←</button><button type="button" aria-label="Next destination" aria-controls="destination-gallery" onClick={() => moveGallery(1)}>→</button><Link className="text-link" href="/path">Choose my destination <Arrow diagonal /></Link></div></div>
      </section>

      <section className="closing-section section-pad" aria-labelledby="closing-title">
        <div className="section-label eyebrow" data-reveal><span>05 / YOUR NEXT STEP</span></div>
        <div className="closing-main"><h2 id="closing-title"><span className="mask-line"><span className="closing-line">Somewhere new.</span></span><span className="mask-line"><span className="closing-line serif">Starts with you.</span></span></h2><Link className="closing-orb" href="/path" data-magnetic><span>Build<br />my route</span><Arrow diagonal /><span className="sr-only">: choose your destination and intake</span></Link></div>
        <div className="closing-caption"><p>Guest progress is temporary.</p><Link href="/today" className="text-link">Explore the sample plan <Arrow diagonal /></Link></div>
      </section>
    </div>
  );
}
