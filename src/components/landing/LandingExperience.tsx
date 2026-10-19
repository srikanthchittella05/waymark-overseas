"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useMotionPreferences } from "@/components/providers/MotionProvider";
import { DESTINATIONS } from "@/lib/engine/destinations";
import { useArrivalSequence } from "./useArrivalSequence";
import JourneySculpture from "./JourneySculpture";
import "./world-motion.css";

export default function LandingExperience() {
  const root = useRef<HTMLDivElement>(null);
  const art = useRef<HTMLDivElement>(null);
  const { shouldAnimate, reducedMotion } = useMotionPreferences();
  const sculptureMotion = useRef({ scroll: 0, arrival: 1, resolve: 0 });

  useArrivalSequence(root, art, sculptureMotion, shouldAnimate);

  useEffect(() => {
    // Arrival cinematic disabled for the basic build — page shows immediately.
    return;
    const rootEl = document.documentElement;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (rootEl.dataset.waymarkArrival) return;
    if (location.pathname !== "/") return;
    if (location.hash) return;
    if (preference.matches) return;
    const nav = performance.getEntriesByType("navigation")[0] as unknown as { type: string }
      | undefined;
    if (nav?.type === "back_forward") return;

    try { if (sessionStorage.getItem("waymark.arrival.v2")) return; } catch {}

    rootEl.dataset.waymarkArrival = "pending";
    let active = true;
    const events = ["keydown", "pointerdown", "wheel", "touchstart"];
    const finish = (skip: boolean) => {
      if (!active) return;
      active = false;
      try { window.clearTimeout(Number(rootEl.dataset.waymarkArrivalWatchdog || "0")); } catch {}
      events.forEach((name) => window.removeEventListener(name, interrupt, true));
      preference.removeEventListener("change", interrupt);
      rootEl.removeEventListener("waymark:arrival-done", done);
      if (skip) {
        rootEl.dataset.waymarkArrivalSkipped = "";
        rootEl.dispatchEvent(new Event("waymark:skip-arrival"));
      }
      delete rootEl.dataset.waymarkArrival;
      try { sessionStorage.setItem("waymark.arrival.v2", "1"); } catch {}
    };
    const interrupt = () => finish(true);
    const done = () => finish(false);
    const watchdog = setTimeout(interrupt, 4500);
    events.forEach((name) => window.addEventListener(name, interrupt, { capture: true, passive: true }));
    preference.addEventListener("change", interrupt);
    rootEl.addEventListener("waymark:arrival-done", done);
    rootEl.dataset.waymarkArrivalWatchdog = watchdog.toString();
  }, []);

  useEffect(() => {
    const element = art.current;
    const unavailable = () => art.current = null;
    element?.addEventListener("journey-sculpture-unavailable", unavailable);
    return () => element?.removeEventListener("journey-sculpture-unavailable", unavailable);
  }, []);

  return (
    <div className="landing" ref={root} data-motion={shouldAnimate ? "on" : "off"}>
      <div className="arrival-intro" aria-hidden="true">
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <defs>
            <mask id="arrival-window">
              <rect width="1000" height="1000" fill="white" />
              <ellipse className="arrival-aperture" cx="500" cy="460" rx="0" ry="0" fill="black" />
            </mask>
          </defs>
          <rect width="1000" height="1000" fill="var(--color-forest)" mask="url(#arrival-window)" />
        </svg>
        <div className="arrival-copy">
          <div className="arrival-copy-inner">
            <span className="arrival-brand">An open world.</span>
            <span>A way that&apos;s yours.</span>
          </div>
        </div>
        <div className="arrival-rail">
          <span>FROM POSSIBILITY TO A PLAN.</span>
          <span>SCROLL OR PRESS A KEY TO ENTER ↗</span>
        </div>
      </div>

      <div className="world-opening">
        <section className="hero">
          <h1 id="hero-title">
            <span className="title-line line-inner">A bigger</span>
            <span className="title-line line-inner world-word">world.</span>
            <span className="sr-only">A clearer next step.</span>
          </h1>
          <div className="hero-art" ref={art}>
            <SculptureFallback />
            {!reducedMotion && <JourneySculpture paused={!shouldAnimate} motion={sculptureMotion} />}
            <span className="art-annotation">
              Infinite possibilities.<br />One very personal journey.
            </span>
            <span className="art-coordinate">THE FUTURE IS<br />A WORK IN BECOMING.</span>
          </div>
          <div className="hero-bottom">
            <div className="hero-description">
              <p className="hero-subtitle">A clearer next step.</p>
              <p>Your study-abroad journey, untangled.</p>
            </div>
            <Link href="/path" className="pill-button button-dark" data-magnetic>
              Build my route
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <a href="#plan" className="scroll-cue">
              <span className="scroll-orbit" />
              <span className="scroll-down" aria-hidden="true">↓</span>
              <span className="eyebrow">SEE IT TAKE SHAPE</span>
            </a>
          </div>
          <div className="hero-rail">FOR THE CURIOUS. THE RESTLESS. THE BECOMING. YOUR WORLD IS BIGGER THAN YOU THINK. ↗</div>
        </section>
      </div>

      <section className="product-journey section-pad" aria-labelledby="journey-title">
        <div className="section-label eyebrow">01 / THE IDEA</div>
        <div className="manifesto-grid">
          <div>
            <h2 className="manifesto-statement" id="vision-title">
              <span className="mask-line">Big plans.</span>
              <span className="mask-line">Too many tabs.</span>
              <span className="mask-line">Let&apos;s change that.</span>
            </h2>
          </div>
          <div className="manifesto-copy">
            <span className="small-cross" aria-hidden="true">↗</span>
            <p>Less searching in circles.<br />More knowing what comes next.</p>
            <a href="#plan" className="text-link">See a possibility become a plan. ↗</a>
          </div>
        </div>
        <div className="world-resolution eyebrow">INFINITE POSSIBILITIES. ONE WAY FORWARD. ↓</div>
      </section>

      <section
        className="destinations-section"
        id="possibilities"
        aria-labelledby="destinations-title"
      >
        <div className="destinations-heading section-pad">
          <div className="section-label eyebrow">
            <span>03 / CHOOSE YOUR HORIZON</span>
            <span>SEVEN COUNTRIES. YOUR OWN WAY.</span>
          </div>
          <div className="destinations-intro">
            <h2 id="destinations-title">Same you.<br /><span className="serif">New horizons.</span></h2>
            <div>
              <p>Every one of these has a dated plan behind it — and every date says where it came from.</p>
              <span className="eyebrow gallery-hint">
                <span className="desktop-hint">KEEP SCROLLING TO EXPLORE</span>
                <span className="touch-hint">SWIPE TO EXPLORE</span> <span aria-hidden="true">→</span>
              </span>
            </div>
          </div>
        </div>
        <div className="destination-viewport" tabIndex={0} role="group" aria-label="Destination gallery">
          <div className="destination-track">
            {DESTINATIONS.map((destination, index) => (
              <Link
                href={`/path?country=${destination.code}`}
                className="destination-card"
                key={destination.code}
              >
                <Image
                  src={destination.image}
                  alt={destination.alt}
                  fill
                  unoptimized
                  sizes="(max-width: 899px) 82vw, 34vw"
                  loading="lazy"
                />
                <div className="destination-shade" />
                <div className="destination-meta">
                  <span>{destination.coords}</span>
                  <span>0{index + 1} / 0{DESTINATIONS.length}</span>
                </div>
                <div className="destination-copy">
                  <span className="eyebrow">{destination.city}</span>
                  <h3>{destination.line}</h3>
                  <svg
                    className="destination-arrow"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d={false ? "M5 19 19 5M5 5h14v14" : "M4 12h16m-7-7 7 7-7 7"}
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="destination-footnote">Destination inspiration, not a programme directory.</div>
      </section>

      <section
        className="closing-section section-pad"
        aria-labelledby="closing-title"
      >
        <div className="section-label eyebrow">THE NEXT CHAPTER IS YOURS.</div>
        <div className="closing-main">
          <div>
            <h2 id="closing-title">
              <span className="mask-line">You don&apos;t need</span>
              <span className="mask-line">every answer.</span>
              <span className="mask-line serif">Just a next step.</span>
            </h2>
          </div>
          <Link href="/path" className="closing-orb" data-magnetic>
            Build my route
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="sr-only">: choose your destination and intake</span>
          </Link>
        </div>
        <div className="closing-caption">
          <p>No account. Your plan stays in this browser. Four answers. A clearer way forward.</p>
          <Link href="/today" className="text-link">Explore the sample ↗</Link>
        </div>
        <footer className="landing-footer">
          <div className="footer-top">
            <Link href="/" className="footer-wordmark" aria-label="Waymark home">
              waymark<span>.</span>
            </Link>
            <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path d="M16 2v28M2 16h28M6.1 6.1l19.8 19.8M25.9 6.1L6.1 25.9" stroke="currentColor" strokeWidth="3" />
            </svg>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Waymark. Every step, marked.</span>
            <nav aria-label="Footer navigation">
              <Link href="/route">The Route ↗</Link>
              <Link href="/steps">The Steps ↗</Link>
              <a href="#vision">Back to the idea ↑</a>
            </nav>
            <span>MADE FOR WHAT&apos;S NEXT.</span>
          </div>
        </footer>
      </section>
    </div>
  );
}

function SculptureFallback() {
  return (
    <Image
      className="sculpture-fallback"
      src="/journey-infinity.webp"
      alt=""
      aria-hidden="true"
      width={833}
      height={833}
      unoptimized
      preload
    />
  );
}