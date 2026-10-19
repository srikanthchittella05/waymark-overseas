"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useMotionPreferences } from "@/components/providers/MotionProvider";

const menuItems = [
  { href: "/#vision", label: "The idea" },
  { href: "/#plan", label: "The plan" },
  { href: "/#possibilities", label: "Where" },
  { href: "/today", label: "Today" },
  { href: "/route", label: "The Route" },
  { href: "/steps", label: "The Steps" },
  { href: "/path", label: "Your Path" },
] as const;

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

function getScrolledSnapshot() {
  return window.scrollY > 36;
}

function getServerScrolledSnapshot() {
  return false;
}

function canScrollMenu(
  dialog: HTMLDialogElement,
  target: EventTarget | null,
  deltaX: number,
  deltaY: number,
) {
  if (!(target instanceof Element) || !dialog.contains(target)) return false;

  const vertical = Math.abs(deltaY) >= Math.abs(deltaX);
  const delta = vertical ? deltaY : deltaX;
  if (delta === 0) return true;

  for (let node: Element | null = target; node && dialog.contains(node); node = node.parentElement) {
    const style = getComputedStyle(node);
    if (!/^(auto|scroll)$/.test(vertical ? style.overflowY : style.overflowX)) continue;

    const position = vertical ? node.scrollTop : node.scrollLeft;
    const maximum = vertical
      ? node.scrollHeight - node.clientHeight
      : node.scrollWidth - node.clientWidth;
    if (maximum > 1 && (delta < 0 ? position > 0 : position < maximum - 1)) return true;
  }

  return false;
}

function lockPageScroll(dialog: HTMLDialogElement) {
  // Save longhands separately, including priorities, so existing inline styles survive.
  const overflow = [document.documentElement, document.body].flatMap((element) =>
    ["overflow-x", "overflow-y"].map((property) => {
      const value = element.style.getPropertyValue(property);
      const priority = element.style.getPropertyPriority(property);
      element.style.setProperty(property, "hidden", "important");
      return { element, property, value, priority };
    }),
  );

  const onWheel = (event: WheelEvent) => {
    if (event.ctrlKey) return; // Preserve browser zoom / trackpad pinch.
    event.stopPropagation(); // Lenis must not consume the menu's native scrolling.
    if (!canScrollMenu(dialog, event.target, event.deltaX, event.deltaY)) event.preventDefault();
  };
  let touch: { x: number; y: number } | null = null;
  const onTouchStart = (event: TouchEvent) => {
    touch = event.touches.length === 1
      ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
      : null;
  };
  const onTouchMove = (event: TouchEvent) => {
    if (event.touches.length !== 1) {
      touch = null;
      return;
    }
    const next = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    if (touch) {
      event.stopPropagation();
      if (!canScrollMenu(dialog, event.target, touch.x - next.x, touch.y - next.y)) {
        event.preventDefault();
      }
    }
    touch = next;
  };

  document.addEventListener("wheel", onWheel, { capture: true, passive: false });
  document.addEventListener("touchstart", onTouchStart, { capture: true, passive: true });
  document.addEventListener("touchmove", onTouchMove, { capture: true, passive: false });

  let restored = false;
  return () => {
    if (restored) return;
    restored = true;
    document.removeEventListener("wheel", onWheel, true);
    document.removeEventListener("touchstart", onTouchStart, true);
    document.removeEventListener("touchmove", onTouchMove, true);
    overflow.forEach(({ element, property, value, priority }) => {
      if (value) element.style.setProperty(property, value, priority);
      else element.style.removeProperty(property);
    });
  };
}

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M16 2v28M2 16h28M6.1 6.1l19.8 19.8M25.9 6.1L6.1 25.9"
        stroke="currentColor"
        strokeWidth="3"
      />
    </svg>
  );
}

export default function SiteNavigation() {
  const pathname = usePathname();
  const { shouldAnimate } = useMotionPreferences();
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    getScrolledSnapshot,
    getServerScrolledSnapshot,
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const phaseRef = useRef<"closed" | "opening" | "open" | "closing">("closed");
  const openedPathRef = useRef(pathname);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const contextRef = useRef<gsap.Context | null>(null);
  const unlockRef = useRef<(() => void) | null>(null);

  const finishClose = useCallback((returnFocus: boolean) => {
    phaseRef.current = "closed";
    timelineRef.current?.kill();
    timelineRef.current = null;
    if (dialogRef.current?.open) dialogRef.current.close();
    unlockRef.current?.();
    unlockRef.current = null;
    contextRef.current?.revert();
    contextRef.current = null;
    if (returnFocus) toggleRef.current?.focus({ preventScroll: true });
  }, []);

  // Native close events own the React state update; effects only synchronize the dialog.
  useEffect(() => {
    if (dialogRef.current?.open && openedPathRef.current !== pathname) finishClose(false);
  }, [pathname, finishClose]);

  useEffect(() => {
    if (shouldAnimate) return;
    if (phaseRef.current === "closing") finishClose(true);
    else if (phaseRef.current === "opening") timelineRef.current?.progress(1).pause();
  }, [shouldAnimate, finishClose]);

  useEffect(() => {
    const onLocationChange = () => finishClose(false);
    window.addEventListener("popstate", onLocationChange);
    window.addEventListener("hashchange", onLocationChange);
    return () => {
      window.removeEventListener("popstate", onLocationChange);
      window.removeEventListener("hashchange", onLocationChange);
      finishClose(false);
    };
  }, [finishClose]);

  const openMenu = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (dialog.open) {
      if (phaseRef.current === "closing" && timelineRef.current) {
        phaseRef.current = "opening";
        timelineRef.current.timeScale(1).play();
      }
      return;
    }

    // Suppress the UA's implicit trigger restoration; dismissals restore it explicitly.
    // Navigation can then close before Next/Lenis handles its destination and focus.
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    dialog.showModal();
    unlockRef.current = lockPageScroll(dialog);
    openedPathRef.current = pathname;
    phaseRef.current = shouldAnimate ? "opening" : "open";
    setMenuOpen(true);
    closeRef.current?.focus({ preventScroll: true });
    if (!shouldAnimate) return;

    contextRef.current = gsap.context(() => {
      const links = dialog.querySelectorAll(".menu-link");
      const details = dialog.querySelectorAll(".menu-eyebrow, .menu-bottom");
      const timeline = gsap.timeline({
        onComplete: () => {
          if (phaseRef.current === "opening") phaseRef.current = "open";
        },
        onReverseComplete: () => finishClose(true),
      });
      timeline
        .fromTo(dialog,
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.85, ease: "power4.inOut" },
          0,
        )
        .fromTo(links,
          { yPercent: 85, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.75, stagger: 0.075, ease: "expo.out" },
          0.18,
        )
        .fromTo(details,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: "power2.out" },
          0.35,
        );
      timelineRef.current = timeline;
    }, dialog);
  };

  const dismissMenu = () => {
    if (!dialogRef.current?.open || phaseRef.current === "closing") return;
    const timeline = timelineRef.current;
    if (!shouldAnimate || !timeline || timeline.time() === 0) {
      finishClose(true);
      return;
    }
    phaseRef.current = "closing";
    timeline.timeScale(1.65).reverse();
  };

  // Release modality and scroll locks synchronously, before even same-page navigation.
  const closeForNavigation = () => finishClose(false);

  return (
    <>
      <header className={`site-header${scrolled || pathname !== "/" ? " is-scrolled" : ""}`} style={{ viewTransitionName: "site-header" }}>
        <nav className="nav-inner" aria-label="Main navigation">
          <Link href="/" className="brand" aria-label="Waymark home">
            <BrandMark />
            <span>waymark<span className="brand-period">.</span></span>
          </Link>
          <p className="nav-tagline">For the life you haven’t met yet.</p>
          <div className="nav-actions">
            <Link href="/today" className="nav-roadmap">
              See your next step <span aria-hidden="true">↗</span>
            </Link>
            <button
              ref={toggleRef}
              type="button"
              className="menu-toggle"
              aria-label="Open navigation"
              aria-controls="site-menu"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              onClick={openMenu}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      <dialog
        ref={dialogRef}
        id="site-menu"
        className="site-menu"
        aria-label="Navigation"
        data-lenis-prevent=""
        onCancel={(event) => {
          event.preventDefault();
          dismissMenu();
        }}
        onClose={(event) => {
          // A queued close from a previous cycle must not tear down a reopened menu.
          if (event.currentTarget.open) return;
          finishClose(phaseRef.current !== "closed");
          setMenuOpen(false);
        }}
      >
        <div className="menu-top">
          <Link href="/" className="brand" aria-label="Waymark home" onNavigate={closeForNavigation}>
            <BrandMark />
            <span>waymark<span className="brand-period">.</span></span>
          </Link>
          <button
            ref={closeRef}
            type="button"
            className="menu-close"
            aria-label="Close navigation"
            onClick={dismissMenu}
          >
            Close <span aria-hidden="true">×</span>
          </button>
        </div>
        <p className="eyebrow menu-eyebrow">A bigger world starts here.</p>
        <nav className="menu-links" aria-label="Explore Waymark">
          {menuItems.map(({ href, label }, index) => (
            <Link
              key={href}
              href={href}
              className="menu-link"
              aria-current={pathname === href ? "page" : undefined}
              onNavigate={closeForNavigation}
            >
              <span className="menu-number" aria-hidden="true">0{index + 1}</span>
              <span>{label}</span>
              <span className="menu-link-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </nav>
        <div className="menu-bottom">
          <p>For the life you haven’t met yet.</p>
          <p>Study abroad. Find your next step.</p>
        </div>
      </dialog>
    </>
  );
}
