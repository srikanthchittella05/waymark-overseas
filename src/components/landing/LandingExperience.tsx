"use client";

import { useCallback, useEffect, useRef, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useMotionPreferences } from "@/components/providers/MotionProvider";
import { BrandMark } from "./SiteNavigation";
import { DESTINATIONS, SUPPORTED_COUNTRIES } from "@/lib/engine/destinations";
import PlanStory from "./PlanStory";
import { useArrivalSequence } from "./useArrivalSequence";
import type { JourneyMotion } from "./JourneySculpture";
import "./world-motion.css";

gsap.registerPlugin(useGSAP, ScrollTrigger, CustomEase, SplitText);
CustomEase.create("waymark", "0.65,0.05,0,1");

// JourneySculpture (3D infinity) replaced by an inline aeroplane that travels
// along the route path below — see the world-opening motion in useGSAP.

const PRODUCT_VIEWS = [
  { href: "/today", name: "Today", promise: "One next move.", copy: "What to do next, why it matters now, and what needs to happen first.", detail: "PRIORITY / CONTEXT / BLOCKERS" },
  { href: "/route", name: "The route", promise: "See the whole journey.", copy: "Milestones dated backwards from your intake. Follow the connections, not a pile of tabs.", detail: "DATES / DEPENDENCIES / EVIDENCE" },
  { href: "/steps", name: "The steps", promise: "Make progress tangible.", copy: "A checklist by phase, with the source and confidence behind each milestone.", detail: "CHECKLIST / SOURCES / PROGRESS" },
  { href: "/path", name: "Your path", promise: "Make it your own.", copy: "Choose a destination and intake. See what changes before you save the new target.", detail: "DESTINATION / INTAKE / CONSEQUENCES" },
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


export default function LandingExperience() {
  const root = useRef<HTMLDivElement>(null);
  const art = useRef<HTMLDivElement>(null);
  const gallery = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const galleryTrigger = useRef<ScrollTrigger | null>(null);
  const sculptureMotion = useRef<JourneyMotion>({ scroll: 0, arrival: 1, resolve: 0 });
  const aeroplaneRef = useRef<HTMLDivElement>(null);
  const { shouldAnimate } = useMotionPreferences();
  useArrivalSequence(root, art, sculptureMotion, shouldAnimate);

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


  useGSAP((_context, contextSafe) => {
    if (!shouldAnimate) return;
    const media = gsap.matchMedia();

    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
      gsap.fromTo(element, { clipPath: "inset(0% 100% 0% 0%)", y: 16 }, {
        clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 0.75, ease: "waymark",
        scrollTrigger: { trigger: element, start: "top 91%", once: true },
      });
    });

    media.add("(min-width: 900px) and (min-height: 550px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.set(".world-opening", { attr: { "data-world-active": "" } });
      // A single clock carries the SAME mesh across two chapters. It opens into
      // an orbit, then resolves to the point from which the dated route is drawn.
      const world = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: {
        trigger: ".world-opening", start: "top top", end: "bottom bottom", scrub: 0.28,
        invalidateOnRefresh: true,
      } });
      world
        .fromTo(sculptureMotion.current, { scroll: 0, resolve: 0 }, { scroll: 1, duration: 0.72 }, 0)
        .to(sculptureMotion.current, { resolve: 1, duration: 0.25 }, 0.75)
        .to(".hero-art-scroll", {
          x: () => window.innerWidth * 0.055,
          y: () => (root.current?.querySelector<HTMLElement>(".hero")?.offsetHeight ?? window.innerHeight) * 0.92,
          scale: 1.25, duration: 1,
        }, 0)
        .fromTo(".world-horizon-shape", { attr: { rx: 0, ry: 0 } },
          { attr: { rx: 1450, ry: 1700 }, duration: 0.82 }, 0.06)
        .to(".hero-title .title-line:first-child", { xPercent: -12, yPercent: -10, duration: 0.8 }, 0)
        .to(".hero-title .title-line:nth-child(2)", { xPercent: 9, yPercent: -16, duration: 0.8 }, 0)
        .to(".hero-title", { yPercent: -38, duration: 0.38 }, 0)
        .to(".hero-bottom, .hero-rail", { y: () => -window.innerHeight * 0.58, duration: 0.38 }, 0)
        .to(".art-coordinate, .art-annotation", { autoAlpha: 0, duration: 0.18 }, 0)
        .to(".orbital-one", { rotation: 125, scale: 1.25, duration: 0.8 }, 0)
        .to(".orbital-two", { rotation: -95, scaleX: 0.8, duration: 0.8 }, 0)
        .to(".orbital", { autoAlpha: 0, duration: 0.22 }, 0.73)
        .fromTo(".world-route-ink", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.35 }, 0.65);
      gsap.fromTo(".manifesto-word", { yPercent: 103, rotation: 2 }, {
        yPercent: 0, rotation: 0, stagger: 0.13, duration: 0.75, ease: "waymark",
        scrollTrigger: { trigger: ".manifesto-statement", start: "top 86%", end: "top 35%", scrub: 0.35 },
      });
      gsap.fromTo(".ps-stage", { clipPath: "inset(0% 8% round 3rem)" }, {
        clipPath: "inset(0% 0% round 0rem)", ease: "none",
        scrollTrigger: { trigger: ".ps-story", start: "top 85%", end: "top 25%", scrub: 0.4 },
      });
      gsap.fromTo(".closing-section", { clipPath: "ellipse(100% 0% at 50% 0%)" }, {
        clipPath: "ellipse(100% 150% at 50% 0%)", ease: "none",
        scrollTrigger: { trigger: ".closing-section", start: "top 95%", end: "top 25%", scrub: 0.35 },
      });
    });

    // Touch is a different choreography, not a motion-off mode. It never pins
    // or substitutes for native scrolling, and every paragraph has a rest state.
    media.add("(max-width: 899px), (max-height: 549px)", () => {
      gsap.fromTo(sculptureMotion.current, { scroll: 0 }, { scroll: 0.8, ease: "none",
        scrollTrigger: { trigger: ".hero-art", start: "center 55%", end: "bottom top", scrub: 0.25 } });
      gsap.to(".hero-art-scroll", { rotate: 12, yPercent: -8, ease: "none",
        scrollTrigger: { trigger: ".hero-art", start: "top 75%", end: "bottom top", scrub: 0.25 } });
      gsap.fromTo(".manifesto-word", { yPercent: 108 }, { yPercent: 0, stagger: 0.1,
        duration: 0.9, ease: "waymark", scrollTrigger: { trigger: ".manifesto-statement", start: "top 86%", once: true } });
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

    let active = true;
    let signature: SplitText | undefined;
    const typeReady = contextSafe?.(() => {
      if (!active) return;
      signature = SplitText.create(".footer-wordmark", {
        type: "chars", mask: "chars", charsClass: "signature-char", aria: "auto",
      });
      gsap.fromTo(signature.chars, { yPercent: 103 }, { yPercent: 0, duration: 0.8,
        stagger: 0.045, ease: "waymark", scrollTrigger: { trigger: ".footer-top", start: "top 94%", once: true } });
      ScrollTrigger.refresh();
    });
    document.fonts.ready.then(() => typeReady?.());

    // Aeroplane travels along the route path. Desktop: cursor drives it.
    // Mobile (no hover): scroll through the world-opening drives it. It is
    // clamped to [0,1] so it never leaves the idea section.
    const moveAeroplane = (progress: number) => {
      const plane = aeroplaneRef.current;
      const pathEl = root.current?.querySelector<SVGPathElement>("#world-route-path");
      if (!plane || !pathEl) return;
      const len = pathEl.getTotalLength();
      const pt = pathEl.getPointAtLength(Math.max(0, Math.min(1, progress)) * len);
      const ctm = pathEl.getScreenCTM();
      if (!ctm) return;
      const screen = pt.matrixTransform(ctm);
      const parent = plane.offsetParent as HTMLElement | null;
      if (!parent) return;
      const prect = parent.getBoundingClientRect();
      const px = screen.x - prect.left - plane.offsetWidth / 2;
      const py = screen.y - prect.top - plane.offsetHeight / 2;
      plane.style.transform = `translate3d(${px}px, ${py}px, 0)`;
    };

    const isHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (isHover) {
      const onMove = (event: MouseEvent) => {
        const worldOpening = root.current?.querySelector<HTMLElement>(".world-opening");
        if (!worldOpening) return;
        const rect = worldOpening.getBoundingClientRect();
        const p = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
        moveAeroplane(p);
      };
      window.addEventListener("mousemove", onMove);
      magnets.push(() => window.removeEventListener("mousemove", onMove));
      // Place it at the start until the first move.
      requestAnimationFrame(() => moveAeroplane(0));
    } else {
      const proxy = { p: 0 };
      const tween = gsap.to(proxy, {
        p: 1, ease: "none",
        scrollTrigger: {
          trigger: ".world-opening", start: "top top", end: "bottom bottom",
          scrub: 0.28, invalidateOnRefresh: true,
        },
        onUpdate: () => moveAeroplane(proxy.p),
      });
      magnets.push(() => tween.kill());
    }

    return () => {
      active = false;
      media.revert();
      signature?.revert();
      magnets.forEach((cleanup) => cleanup());
      galleryTrigger.current = null;
      sculptureMotion.current.scroll = 0;
      sculptureMotion.current.resolve = 0;
    };
  }, { scope: root, dependencies: [shouldAnimate], revertOnUpdate: true });

  return (
    <div className="landing" ref={root} data-motion={shouldAnimate ? "on" : "off"}>
      <div className="arrival-intro" aria-hidden="true">
        <svg className="arrival-veil" viewBox="0 0 1000 1000" preserveAspectRatio="none"><defs><mask id="arrival-window"><rect width="1000" height="1000" fill="white" /><ellipse className="arrival-aperture" cx="500" cy="460" rx="0" ry="0" fill="black" /></mask></defs><rect width="1000" height="1000" fill="var(--color-forest)" mask="url(#arrival-window)" /></svg>
        <div className="arrival-copy"><div className="arrival-copy-inner"><span className="arrival-brand">An open world.</span><span>A way that’s yours.</span></div></div>
        <div className="arrival-rail eyebrow"><span>FROM POSSIBILITY TO A PLAN.</span><span>SCROLL OR PRESS A KEY TO ENTER ↗</span></div>
      </div>
      <div className="world-opening">
      <svg className="world-horizon" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true"><ellipse className="world-horizon-shape" cx="720" cy="650" rx="0" ry="0" fill="var(--field)" /></svg>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-kicker eyebrow"><span className="status-spark" /> A little direction. A world of possibility.</div>
        <h1 className="hero-title" id="hero-title">
          <span className="title-line"><span className="line-inner">A bigger</span></span>
          <span className="title-line"><span className="line-inner world-word">world<span className="world-period">.</span></span></span>
          <span className="sr-only"> A clearer next step.</span>
        </h1>
        <div className="hero-art" ref={art}>
          <div className="hero-art-scroll">
            <div className="orbital orbital-one" /><div className="orbital orbital-two" />
            <div className="aeroplane" ref={aeroplaneRef} aria-hidden="true">
              <svg viewBox="0 0 64 64" width="64" height="64">
                <path d="M4 32 L60 10 L40 32 L60 54 L30 40 Z" fill="var(--color-acid)" />
              </svg>
            </div>
          </div>
          <span className="art-annotation"><span /> Infinite possibilities.<br />One very personal journey.</span>
          <span className="art-coordinate eyebrow">THE FUTURE IS<br />A WORK IN BECOMING.</span>
        </div>
        <div className="hero-bottom">
          <div className="hero-description"><p className="hero-subtitle">A clearer next step.</p><p>Your study-abroad journey, untangled.<br />From the first what-if to the next right move.</p></div>
          <Link href="/path" className="pill-button button-dark hero-cta" data-magnetic><span>Build my route</span><span className="button-arrow"><Arrow diagonal /></span></Link>
          <a href="#plan" className="scroll-cue"><span className="scroll-orbit" /><span className="scroll-down" aria-hidden="true">↓</span><span className="eyebrow">SEE IT<br />TAKE SHAPE</span></a>
        </div>
        <div className="hero-rail eyebrow"><span>FOR THE CURIOUS. THE RESTLESS. THE BECOMING.</span><span>YOUR WORLD IS BIGGER THAN YOU THINK. ↗</span></div>
      </section>

      <section className="manifesto section-pad" id="vision" aria-labelledby="vision-title">
        <div className="section-label eyebrow" data-reveal><span>01 / THE IDEA</span><span>GOING PLACES STARTS HERE</span></div>
        <div className="manifesto-grid">
          <div><h2 className="manifesto-statement" id="vision-title"><span className="mask-line"><span className="manifesto-word">A hundred deadlines.</span></span><span className="mask-line"><span className="manifesto-word">One clear order.</span></span><span className="mask-line"><span className="manifesto-word serif">Your next move.</span></span></h2></div>
          <div className="manifesto-copy" data-reveal><span className="small-cross" aria-hidden="true">↗</span><p>Every date is counted back from your intake, sourced and labelled.<br />One plan. One next step.</p><a href="#plan" className="text-link">See a possibility become a plan. <Arrow diagonal /></a></div>
        </div>
      </section>
      <svg className="world-route" viewBox="0 0 1440 560" preserveAspectRatio="none" fill="none" aria-hidden="true"><path id="world-route-path" className="world-route-ink" d="M1050 20C1260 240 90 120 90 420L90 560" pathLength="1" /><circle cx="90" cy="555" r="5" /></svg>
      </div>

      <PlanStory />

      <section className="product-journey section-pad" aria-labelledby="journey-title">
        <div className="section-label eyebrow" data-reveal><span>THE JOURNEY, IN FOCUS.</span><span>FOUR VIEWS. NOTHING LOST BETWEEN THEM.</span></div>
        <h2 className="journey-heading" id="journey-title" data-reveal>All the moving parts.<br /><span className="serif">One clear picture.</span></h2>
        <div className="journey-views">{PRODUCT_VIEWS.map((view, index) => <Link className="journey-view" href={view.href} key={view.href}>
          <span className="journey-view-index eyebrow">0{index + 1}</span>
          <div className="journey-view-title"><p className="eyebrow">{view.name}</p><h3>{view.promise}</h3></div>
          <div className="journey-view-copy"><p>{view.copy}</p></div>
          <span className="journey-view-arrow" aria-hidden="true"><Arrow diagonal /></span>
        </Link>)}</div>
        <p className="journey-local">Your target and ticks stay in this browser. No account, cross-device sync, or application submission.</p>
      </section>

      <section className="destinations-section" id="possibilities" aria-labelledby="destinations-title">
        <div className="destinations-heading section-pad"><div className="section-label eyebrow"><span>03 / CHOOSE YOUR HORIZON</span><span>SEVEN COUNTRIES. YOUR OWN WAY.</span></div><div className="destinations-intro"><h2 id="destinations-title">Same you.<br /><span className="serif">New horizons.</span></h2><div><p>Every one of these has a dated plan<br />behind it — and every date says where it came from.</p><span className="eyebrow gallery-hint"><span className="desktop-hint">KEEP SCROLLING TO EXPLORE</span><span className="touch-hint">SWIPE TO EXPLORE</span> <span aria-hidden="true">→</span></span></div></div></div>
        <div className="destination-viewport" ref={gallery} tabIndex={0} role="group" aria-label="Destination inspiration. Focus this gallery, then use the arrow keys, Home or End to explore sideways." onKeyDown={galleryKeys} onFocus={() => setGalleryKeyboardMode(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setGalleryKeyboardMode(false); }}>
          <div className="destination-track" ref={track}>
            {DESTINATIONS.map((destination, index) => (
              <Link href={`/path?country=${destination.code}`} className="destination-card" key={destination.code}><Image src={destination.image} alt={destination.alt} fill unoptimized sizes="(max-width: 899px) 82vw, 34vw" loading="lazy" /><div className="destination-shade" /><div className="destination-meta eyebrow"><span>{destination.coords}</span><span>0{index + 1} / 0{DESTINATIONS.length}</span></div><div className="destination-copy"><h3>{countryName(destination.code)}</h3><div><p>{destination.line}</p><span className="destination-arrow" aria-hidden="true"><Arrow diagonal /></span></div></div></Link>
            ))}
          </div>
        </div>
        <div className="destination-footnote section-pad"><span>Destination inspiration, not a programme directory.</span><Link className="text-link" href="/path">Choose my destination <Arrow diagonal /></Link></div>
      </section>

      <section className="closing-section section-pad" aria-labelledby="closing-title">
        <div className="section-label eyebrow" data-reveal><span>THE NEXT CHAPTER IS YOURS.</span><span>LET’S GIVE IT A LITTLE DIRECTION. ↗</span></div>
        <div className="closing-main"><Link className="closing-orb" href="/path" data-magnetic><span>Build<br />my route</span><Arrow diagonal /><span className="sr-only">: choose your destination and intake</span></Link></div>
        <div className="closing-caption"><p>No account. Your plan stays in this browser.<br />Four answers. A clearer way forward.</p><Link href="/today" className="text-link">See a finished plan <Arrow diagonal /></Link></div>
        <footer className="landing-footer"><div className="footer-top"><Link href="/" className="footer-wordmark" aria-label="Waymark home">waymark<span>.</span></Link><BrandMark className="footer-mark" /></div><div className="footer-bottom"><span>© 2026 Waymark. Every step, marked.</span><nav aria-label="Footer navigation"><Link href="/route">The Route ↗</Link><Link href="/steps">The Steps ↗</Link><a href="#vision">Back to the idea ↑</a></nav><span>MADE FOR WHAT’S NEXT.</span></div></footer>
      </section>
    </div>
  );
}
