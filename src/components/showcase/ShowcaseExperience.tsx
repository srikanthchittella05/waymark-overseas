"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionPreferences } from "@/components/providers/MotionProvider";

gsap.registerPlugin(ScrollTrigger);

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function scrambleTo(el: HTMLElement, final: string, duration = 900) {
  const start = performance.now();
  const len = final.length;
  const frame = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    let out = "";
    for (let i = 0; i < len; i++) {
      const revealAt = i / len;
      if (t > revealAt + 0.15) out += final[i];
      else out += CHARS[Math.floor(Math.random() * CHARS.length)];
    }
    el.textContent = out;
    if (t < 1) requestAnimationFrame(frame);
    else el.textContent = final;
  };
  requestAnimationFrame(frame);
}

export default function ShowcaseExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { shouldAnimate } = useMotionPreferences();
  const [metrics, setMetrics] = useState({ fps: 0, longTasks: 0 });

  // Kinetic title split + reveal
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // Title chars
      const title = root.querySelector<HTMLElement>("[data-showcase-title]");
      if (title && shouldAnimate) {
        const text = title.dataset.text || title.textContent || "";
        title.textContent = "";
        const chars: HTMLSpanElement[] = [];
        for (const ch of text) {
          const span = document.createElement("span");
          span.className = "showcase-char";
          span.textContent = ch === " " ? "\u00A0" : ch;
          title.appendChild(span);
          chars.push(span);
        }
        gsap.from(chars, {
          yPercent: 120,
          opacity: 0,
          rotateX: -90,
          transformOrigin: "50% 100%",
          duration: 1.1,
          ease: "expo.out",
          stagger: { each: 0.025, from: "start" },
        });
      }

      // Reveal blocks
      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        if (!shouldAnimate) { el.style.opacity = "1"; el.style.transform = "none"; return; }
        gsap.fromTo(el, { y: 60, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
        });
      });

      // Horizontal pinned gallery
      const gallery = root.querySelector<HTMLElement>("[data-hgallery]");
      const track = root.querySelector<HTMLElement>("[data-htrack]");
      if (gallery && track && shouldAnimate) {
        const distance = () => track.scrollWidth - gallery.clientWidth;
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: gallery,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
        return () => { tween.scrollTrigger?.kill(); tween.kill(); };
      }
    }, root);

    return () => ctx.revert();
  }, [shouldAnimate]);

  // Scramble labels on mount
  useEffect(() => {
    if (!shouldAnimate) return;
    const els = rootRef.current?.querySelectorAll<HTMLElement>("[data-scramble]") ?? [];
    els.forEach((el, i) => {
      const final = el.dataset.scramble || el.textContent || "";
      el.textContent = "";
      setTimeout(() => scrambleTo(el, final), 400 + i * 120);
    });
  }, [shouldAnimate]);

  // Count-up metrics
  useEffect(() => {
    if (!shouldAnimate) return;
    const els = rootRef.current?.querySelectorAll<HTMLElement>("[data-count]") ?? [];
    els.forEach((el) => {
      const target = Number(el.dataset.count || 0);
      const obj = { v: 0 };
      gsap.to(obj, {
        v: target, duration: 1.6, ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
        onUpdate: () => { el.textContent = Math.round(obj.v).toLocaleString(); },
      });
    });
  }, [shouldAnimate]);

  // Magnetic buttons
  useEffect(() => {
    if (!shouldAnimate) return;
    const root = rootRef.current;
    if (!root) return;
    const btns = root.querySelectorAll<HTMLElement>("[data-magnetic]");
    const handlers: { el: HTMLElement; move: (e: PointerEvent) => void; leave: () => void }[] = [];
    btns.forEach((el) => {
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * 0.35;
        const y = (e.clientY - (r.top + r.height / 2)) * 0.35;
        el.style.transform = `translate(${x}px,${y}px)`;
      };
      const leave = () => { el.style.transform = "translate(0,0)"; };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      handlers.push({ el, move, leave });
    });
    return () => handlers.forEach(({ el, move, leave }) => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      el.style.transform = "";
    });
  }, [shouldAnimate]);

  // 3D tilt cards
  useEffect(() => {
    if (!shouldAnimate) return;
    const root = rootRef.current;
    if (!root) return;
    const cards = root.querySelectorAll<HTMLElement>("[data-tilt]");
    const cleanups: (() => void)[] = [];
    cards.forEach((card) => {
      const glare = card.querySelector<HTMLElement>("[data-glare]");
      const onMove = (e: PointerEvent) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        const rx = (0.5 - y) * 14;
        const ry = (x - 0.5) * 14;
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
        if (glare) {
          glare.style.opacity = "0.35";
          glare.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,.55), transparent 55%)`;
        }
      };
      const onLeave = () => {
        card.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
        if (glare) glare.style.opacity = "0";
      };
      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerleave", onLeave);
      cleanups.push(() => {
        card.removeEventListener("pointermove", onMove);
        card.removeEventListener("pointerleave", onLeave);
        card.style.transform = "";
      });
    });
    return () => cleanups.forEach((c) => c());
  }, [shouldAnimate]);

  // Perf monitor
  useEffect(() => {
    if (typeof window === "undefined" || !("PerformanceObserver" in window)) return;
    let longTasks = 0;
    let frames = 0; let last = performance.now(); let raf = 0;
    const po = new PerformanceObserver((list) => {
      longTasks += list.getEntries().length;
      setMetrics((m) => ({ ...m, longTasks }));
    });
    try { po.observe({ type: "longtask", buffered: true }); } catch {}
    const tick = (now: number) => {
      frames++;
      if (now - last >= 1000) { setMetrics((m) => ({ ...m, fps: Math.round((frames * 1000) / (now - last)) })); frames = 0; last = now; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); po.disconnect(); };
  }, []);

  const cards = [
    { t: "WebGL Hero", d: "Cursor-reactive shader field" },
    { t: "Kinetic Type", d: "Variable font weight on scroll" },
    { t: "3D Tilt", d: "Perspective + glare" },
    { t: "Magnetic CTA", d: "Spring-following button" },
    { t: "Horizontal Gallery", d: "Pinned scroll choreography" },
    { t: "Noise Grain", d: "Procedural SVG turbulence" },
  ];

  return (
    <div ref={rootRef} className="showcase" style={{ position: "relative", overflow: "hidden" }}>
      {/* grain */}
      <div className="showcase-grain" aria-hidden />

      {/* Hero */}
      <section className="showcase-hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "8vh 6vw" }}>
        <p data-scramble="ELITE UI/UX MOTION LAB" style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.85rem", letterSpacing: ".2em", opacity: .7, marginBottom: "2rem" }} />
        <h1 data-showcase-title data-text="Beat the best." style={{ fontSize: "clamp(3rem, 12vw, 11rem)", lineHeight: .9, letterSpacing: "-.04em", fontWeight: 900, margin: 0 }} />
        <p data-reveal style={{ maxWidth: "42ch", marginTop: "2rem", fontSize: "1.15rem", opacity: .75 }}>
          A live lab of the patterns that win Awwwards — plus the reactivity, physics and depth that go beyond them. Scroll to travel.
        </p>
        <div data-reveal style={{ marginTop: "3rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button data-magnetic className="showcase-btn">Explore</button>
          <button data-magnetic className="showcase-btn showcase-btn--ghost">Source</button>
        </div>
        <div data-reveal style={{ marginTop: "4rem", display: "flex", gap: "3rem", fontFamily: "var(--font-geist-mono)", fontSize: ".8rem" }}>
          <div><div data-count="99" style={{ fontSize: "2rem", fontWeight: 800 }}>0</div><div style={{ opacity: .6 }}>Lighthouse Perf</div></div>
          <div><div data-count="60" style={{ fontSize: "2rem", fontWeight: 800 }}>0</div><div style={{ opacity: .6 }}>FPS target</div></div>
          <div><div data-count="0" style={{ fontSize: "2rem", fontWeight: 800 }}>0</div><div style={{ opacity: .6 }}>Long tasks</div></div>
        </div>
      </section>

      {/* Tilt cards */}
      <section style={{ padding: "8vh 6vw" }}>
        <h2 data-reveal style={{ fontSize: "clamp(2rem,5vw,4rem)", letterSpacing: "-.03em", fontWeight: 800, marginBottom: "3rem" }}>Depth &amp; physics</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
          {cards.map((c) => (
            <div key={c.t} data-tilt data-reveal style={{ position: "relative", borderRadius: "1.25rem", padding: "2rem", background: "linear-gradient(135deg, rgba(255,255,255,.08), rgba(255,255,255,.02))", border: "1px solid rgba(255,255,255,.12)", minHeight: 180, transformStyle: "preserve-3d", transition: "transform .15s ease", cursor: "pointer", overflow: "hidden" }}>
              <div data-glare style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0, transition: "opacity .2s", mixBlendMode: "overlay" }} />
              <h3 style={{ fontSize: "1.4rem", fontWeight: 700, margin: 0 }}>{c.t}</h3>
              <p style={{ opacity: .7, marginTop: ".5rem" }}>{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Horizontal gallery */}
      <section data-hgallery style={{ height: "100vh", overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", top: "6vh", left: "6vw", zIndex: 2 }}>
          <h2 style={{ fontSize: "clamp(2rem,5vw,4rem)", letterSpacing: "-.03em", fontWeight: 800, margin: 0 }}>Horizontal choreography</h2>
        </div>
        <div data-htrack style={{ display: "flex", gap: "2rem", alignItems: "center", height: "100%", paddingLeft: "6vw", willChange: "transform" }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{ flex: "0 0 60vw", maxWidth: 720, aspectRatio: "16/10", borderRadius: "1.5rem", background: `linear-gradient(135deg, hsl(${(i * 47) % 360} 60% 25%), hsl(${(i * 47 + 60) % 360} 50% 12%))`, display: "flex", alignItems: "flex-end", padding: "2rem", fontSize: "2rem", fontWeight: 800, color: "rgba(255,255,255,.9)" }}>
              Project {i + 1}
            </div>
          ))}
        </div>
      </section>

      {/* Marquee */}
      <section style={{ padding: "6vh 0", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,.1)", borderBottom: "1px solid rgba(255,255,255,.1)" }}>
        <div className="showcase-marquee" style={{ display: "flex", gap: "4rem", whiteSpace: "nowrap", fontFamily: "var(--font-geist-mono)", fontSize: "1rem", opacity: .6 }}>
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} style={{ display: "flex", gap: "4rem", animation: shouldAnimate ? "showcase-marquee 28s linear infinite" : "none" }}>
              {["GSAP", "Three.js", "Lenis", "Rive", "WebGL", "View Transitions", "Springs", "Noise", "Kinetic Type"].map((w) => <span key={w}>{w} ✦</span>)}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <section data-reveal style={{ padding: "10vh 6vw 6vh", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(2rem,6vw,5rem)", letterSpacing: "-.03em", fontWeight: 900 }}>Verified, not assumed.</h2>
        <p style={{ opacity: .6, marginTop: "1rem" }}>Build · typecheck · lint · Playwright · Lighthouse · reduced-motion · mobile.</p>
        <div style={{ marginTop: "2rem", fontFamily: "var(--font-geist-mono)", fontSize: ".75rem", opacity: .5 }}>
          FPS {metrics.fps} · Long tasks {metrics.longTasks}
        </div>
      </section>

      <style jsx global>{`
        .showcase { background: #0a0a0f; color: #f5f1e8; min-height: 100vh; }
        .showcase-grain { position: fixed; inset: 0; pointer-events: none; z-index: 1; opacity: .05; mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>"); }
        .showcase-char { display: inline-block; will-change: transform, opacity; }
        .showcase-btn { background: #f5f1e8; color: #0a0a0f; border: none; padding: .9rem 1.6rem; border-radius: 999px; font-weight: 700; cursor: pointer; transition: transform .25s cubic-bezier(.2,.8,.2,1), box-shadow .25s; }
        .showcase-btn--ghost { background: transparent; color: #f5f1e8; border: 1px solid rgba(245,241,232,.3); }
        .showcase-btn:hover { box-shadow: 0 12px 40px rgba(245,241,232,.25); }
        @keyframes showcase-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) {
          .showcase-char { transform: none !important; opacity: 1 !important; }
          [data-tilt] { transform: none !important; }
        }
      `}</style>
    </div>
  );
}
