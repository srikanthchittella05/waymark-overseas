"use client";

import {
  Component,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
  type RefObject,
} from "react";
import { Canvas, useFrame, useThree, type RootState } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import {
  ACESFilmicToneMapping,
  Group,
  MathUtils,
  SRGBColorSpace,
  type Mesh,
  type WebGLRenderer,
} from "three";
import { createJourneyGeometry } from "@/lib/motion/journey-geometry";

/** Mutate in place; the visible loop samples these without React updates. */
export type JourneyMotion = {
  /** 0: slanted infinity; 1: sculpted aircraft, nose along local +X. */
  scroll: number;
  /** 0: coiled, turned-away entrance; 1: settled infinity. Defaults to 1. */
  arrival?: number;
  /** 0: full sculpture; 1: small aircraft receding into depth. Defaults to 0. */
  resolve?: number;
};

type JourneySculptureProps = {
  paused: boolean;
  onReady?: () => void;
  motion?: RefObject<JourneyMotion>;
};

type WebGLStatus = "loading" | "ready" | "lost" | "unavailable";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const MOBILE = "(max-width: 767px), (pointer: coarse)";

function subscribeVisibility(notify: () => void) {
  document.addEventListener("visibilitychange", notify);
  return () => document.removeEventListener("visibilitychange", notify);
}

function isDocumentVisible() {
  return document.visibilityState === "visible";
}

function subscribeReducedMotion(notify: () => void) {
  const media = window.matchMedia(REDUCED_MOTION);
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
}

function prefersReducedMotion() {
  return window.matchMedia(REDUCED_MOTION).matches;
}

function subscribeDpr(notify: () => void) {
  const media = window.matchMedia(MOBILE);
  media.addEventListener("change", notify);
  window.addEventListener("resize", notify, { passive: true });
  return () => {
    media.removeEventListener("change", notify);
    window.removeEventListener("resize", notify);
  };
}

function cappedDpr() {
  return Math.min(window.devicePixelRatio || 1, window.matchMedia(MOBILE).matches ? 1 : 1.5);
}

const serverHidden = () => false;
const serverReducedMotion = () => true;
const serverDpr = () => 1;

function watchShaderErrors(renderer: WebGLRenderer, onError: () => void) {
  const previous = renderer.debug.onShaderError;
  renderer.debug.onShaderError = onError;
  return () => { renderer.debug.onShaderError = previous; };
}

function unitProgress(value: number | undefined, fallback = 0) {
  return value !== undefined && Number.isFinite(value) ? MathUtils.clamp(value, 0, 1) : fallback;
}

const StudioEnvironment = memo(function StudioEnvironment() {
  return (
    <Environment frames={1} resolution={256} environmentIntensity={0.9}>
      <color attach="background" args={["#263e34"]} />
      <Lightformer form="rect" color="#fffdf4" intensity={2.8} position={[-2, 3, 7]} scale={[6, 7]} />
      <Lightformer form="rect" color="#edf4ee" intensity={3} position={[5, 0, 4]} scale={[1.2, 6]} />
      <Lightformer form="rect" color="#f1f3eb" intensity={2.4} position={[0, 5, 1]} scale={[7, 1.6]} />
      <Lightformer form="rect" color="#dae8df" intensity={1.5} position={[-1, -4, 5]} scale={[6, 2]} />
      <Lightformer form="rect" color="#081e17" intensity={1} position={[1.5, 0.5, 6]} scale={[1.8, 8]} />
      <Lightformer form="rect" color="#10291f" intensity={1} position={[-5, -1, 0]} scale={[4, 6]} />
      <Lightformer form="rect" color="#deedb3" intensity={1.8} position={[4, 2, -3]} scale={[0.45, 5]} />
      <Lightformer form="rect" color="#ead0a2" intensity={1.2} position={[-4, -1, 1]} scale={[0.6, 4]} />
      <Lightformer form="rect" color="#eef2e9" intensity={2.4} position={[0, 1, -5]} scale={[4, 4]} />
    </Environment>
  );
});

type RibbonSceneProps = {
  renderable: boolean;
  animating: boolean;
  generation: number;
  motion?: RefObject<JourneyMotion>;
  onReady: () => void;
  onFailure: () => void;
  onContextLost: () => void;
  onContextRestored: () => void;
};

function RibbonScene({ renderable, animating, generation, motion, onReady, onFailure, onContextLost, onContextRestored }: RibbonSceneProps) {
  const group = useRef<Group>(null);
  const ribbon = useRef<Mesh>(null);
  const pointer = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const elapsed = useRef(0);
  const lost = useRef(false);
  const failed = useRef(false);
  const ready = useRef(false);
  const readyFrame = useRef<number | null>(null);
  const geometry = useMemo(() => createJourneyGeometry(), []);
  const gl = useThree((state) => state.gl);
  const invalidate = useThree((state) => state.invalidate);
  const setFrameloop = useThree((state) => state.setFrameloop);
  const aspect = useThree((state) => state.size.height > 0 ? state.size.width / state.size.height : 1);
  const fitScale = Math.min(1.25, Math.max(0.01, aspect));

  useEffect(() => () => geometry.dispose(), [geometry]);

  useEffect(() => {
    const cancelReady = () => {
      if (readyFrame.current !== null) cancelAnimationFrame(readyFrame.current);
      readyFrame.current = null;
    };
    const handleLost = (event: Event) => {
      event.preventDefault(); // Permit the browser to restore this context.
      lost.current = true;
      ready.current = false;
      cancelReady();
      setFrameloop("never");
      onContextLost();
    };
    const handleRestored = () => {
      lost.current = false;
      onContextRestored(); // Rebuild the one-shot environment's lost render target.
    };
    const restoreShaderErrors = watchShaderErrors(gl, () => {
      failed.current = true;
      cancelReady();
      setFrameloop("never");
      onFailure();
    });
    const canvas = gl.domElement;
    canvas.addEventListener("webglcontextlost", handleLost);
    canvas.addEventListener("webglcontextrestored", handleRestored);
    return () => {
      cancelReady();
      restoreShaderErrors();
      canvas.removeEventListener("webglcontextlost", handleLost);
      canvas.removeEventListener("webglcontextrestored", handleRestored);
    };
  }, [gl, onContextLost, onContextRestored, onFailure, setFrameloop]);

  useEffect(() => {
    if (renderable) invalidate(); // Also draw a first static frame when paused.
  }, [renderable, animating, generation, invalidate]);

  useEffect(() => {
    if (!animating || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const handlePointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      pointer.current.targetX = MathUtils.clamp((event.clientX / window.innerWidth) * 2 - 1, -1, 1);
      pointer.current.targetY = MathUtils.clamp((event.clientY / window.innerHeight) * 2 - 1, -1, 1);
    };
    const resetPointer = () => { pointer.current.targetX = 0; pointer.current.targetY = 0; };
    window.addEventListener("pointermove", handlePointer, { passive: true });
    window.addEventListener("blur", resetPointer);
    return () => {
      window.removeEventListener("pointermove", handlePointer);
      window.removeEventListener("blur", resetPointer);
      resetPointer();
    };
  }, [animating]);

  // Owning the draw lets renderer errors fall back locally, including RAF errors
  // (which a React error boundary alone cannot catch).
  useFrame((state, delta) => {
    if (!renderable || lost.current || failed.current || document.hidden) return;
    try {
      const controls = motion?.current;
      const progress = unitProgress(controls?.scroll);
      const arrival = unitProgress(controls?.arrival, 1);
      const resolve = unitProgress(controls?.resolve);
      const influences = ribbon.current?.morphTargetInfluences;
      // Identity stays infinity during arrival; only its depth/framing unfolds.
      // Scroll reshapes this same mesh into an aircraft; resolve recedes it.
      if (influences) influences[0] = 1 - (1 - progress) * (1 - resolve);
      if (animating) {
        const dt = Math.min(delta, 1 / 30);
        elapsed.current += dt;
        pointer.current.x = MathUtils.damp(pointer.current.x, pointer.current.targetX, 4, dt);
        pointer.current.y = MathUtils.damp(pointer.current.y, pointer.current.targetY, 4, dt);
      }
      if (group.current) {
        const t = elapsed.current;
        const entrance = 1 - arrival;
        // The infinity is slanted from its first draw. Idle/pointer movement
        // settles out during morphing so the small plane's nose follows the line.
        const idle = 1 - progress;
        group.current.rotation.set(
          (0.055 + Math.sin(t * 0.22) * 0.055 + pointer.current.y * 0.035 - entrance * 0.48) * idle + resolve * 0.45,
          (-0.085 + Math.sin(t * 0.19) * 0.07 + pointer.current.x * 0.055 + entrance * 0.72) * idle + resolve * 0.3,
          (-0.22 + Math.sin(t * 0.17) * 0.018 - entrance * 0.32) * idle + resolve * 0.4,
        );
        group.current.position.set(0, Math.sin(t * 0.26) * 0.024 * arrival * (1 - resolve) * idle, -entrance * 0.7 * idle - resolve * 2.4);
        group.current.scale.setScalar(fitScale * MathUtils.lerp(0.72, 1, arrival) * MathUtils.lerp(1, 0.085, resolve));
      }
      gl.render(state.scene, state.camera);
      if (!ready.current && readyFrame.current === null && !failed.current && !gl.getContext().isContextLost() && gl.info.render.calls > 0 && gl.info.render.triangles > 0) {
        readyFrame.current = requestAnimationFrame(() => {
          readyFrame.current = null;
          if (lost.current || failed.current || gl.getContext().isContextLost()) return;
          ready.current = true;
          onReady();
        });
      }
      if (animating && !failed.current) state.invalidate();
    } catch {
      failed.current = true;
      setFrameloop("never");
      onFailure();
    }
  }, 1);

  return (
    <>
      <StudioEnvironment key={generation} />
      <hemisphereLight args={["#f0f3e9", "#102b20", 0.4]} />
      <directionalLight position={[-3, 5, 4]} color="#fff9e9" intensity={1.5} />
      <group ref={group} rotation={[-0.425, 0.635, -0.54]} scale={fitScale * 0.72}>
        <mesh ref={ribbon} args={[geometry]}>
          <meshPhysicalMaterial
            vertexColors
            color="#edf1e9"
            metalness={0.88}
            roughness={0.28}
            clearcoat={0.3}
            clearcoatRoughness={0.3}
            iridescence={0.07}
            iridescenceIOR={1.38}
            iridescenceThicknessRange={[260, 380]}
          />
        </mesh>
      </group>
    </>
  );
}

class SculptureErrorBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function configureRenderer({ gl, setEvents }: RootState) {
  gl.setClearColor(0x000000, 0);
  gl.outputColorSpace = SRGBColorSpace;
  gl.toneMapping = ACESFilmicToneMapping;
  gl.toneMappingExposure = 1;
  setEvents({ enabled: false });
}

/** Parent supplies sizing/positioning and the SVG behind .journey-sculpture. */
export default function JourneySculpture({ paused, onReady, motion }: JourneySculptureProps) {
  const container = useRef<HTMLDivElement>(null);
  const [visibility, setVisibility] = useState({ inView: false, hasEntered: false });
  const [status, setStatus] = useState<WebGLStatus>("loading");
  const [generation, setGeneration] = useState(0);
  const documentVisible = useSyncExternalStore(subscribeVisibility, isDocumentVisible, serverHidden);
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, prefersReducedMotion, serverReducedMotion);
  const dpr = useSyncExternalStore(subscribeDpr, cappedDpr, serverDpr);

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    if (!("IntersectionObserver" in window)) {
      const frame = requestAnimationFrame(() => setVisibility({ inView: true, hasEntered: true }));
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(([entry]) => {
      const inView = entry.isIntersecting && entry.intersectionRatio > 0;
      setVisibility((previous) => previous.inView === inView ? previous : { inView, hasEntered: previous.hasEntered || inView });
    }, { threshold: 0.01 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const reportUnavailable = useCallback((recoverable: boolean) => {
    setStatus(recoverable ? "lost" : "unavailable");
    // onReady is deliberately success-only. This bubbling event lets the parent
    // re-show its SVG if an already-ready GPU context subsequently disappears.
    container.current?.dispatchEvent(new CustomEvent("journey-sculpture-unavailable", {
      bubbles: true,
      detail: { recoverable },
    }));
  }, []);
  const handleFailure = useCallback(() => reportUnavailable(false), [reportUnavailable]);
  const handleContextLost = useCallback(() => reportUnavailable(true), [reportUnavailable]);
  const handleContextRestored = useCallback(() => {
    container.current?.dispatchEvent(new CustomEvent("journey-sculpture-loading", { bubbles: true }));
    setGeneration((previous) => previous + 1);
    setStatus("loading");
  }, []);
  const handleReady = useCallback(() => {
    setStatus("ready");
    onReady?.();
  }, [onReady]);
  const renderable = visibility.inView && documentVisible && status !== "lost";

  return (
    <div ref={container} className="journey-sculpture" data-webgl-status={status} aria-hidden="true" style={{ width: "100%", height: "100%" }}>
      {visibility.hasEntered && status !== "unavailable" && (
        <SculptureErrorBoundary onError={handleFailure}>
          <Canvas
            aria-hidden="true"
            fallback={null}
            dpr={dpr}
            // CSS carries this canvas through scaled spaces. Measure layout size,
            // not the transient transformed bounds, or the GPU surface stays small
            // and off-center after arrival (and resizes on every scroll frame).
            resize={{ offsetSize: true, scroll: false, debounce: 50 }}
            frameloop={renderable ? "demand" : "never"}
            camera={{ position: [0, 0, 7.8], fov: 42, near: 0.1, far: 30 }}
            gl={{ alpha: true, antialias: true, stencil: false, powerPreference: "low-power" }}
            shadows={false}
            onCreated={configureRenderer}
            style={{ width: "100%", height: "100%", pointerEvents: "none" }}
          >
            <RibbonScene
              renderable={renderable}
              animating={renderable && !paused && !reducedMotion}
              generation={generation}
              motion={motion}
              onReady={handleReady}
              onFailure={handleFailure}
              onContextLost={handleContextLost}
              onContextRestored={handleContextRestored}
            />
          </Canvas>
        </SculptureErrorBoundary>
      )}
    </div>
  );
}
