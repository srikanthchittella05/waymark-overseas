"use client";

import { createContext, useContext, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const GsapCtx = createContext<{ ready: boolean }>({ ready: true });

export function GsapProvider({ children }: { children: ReactNode }) {
  return <GsapCtx.Provider value={{ ready: true }}>{children}</GsapCtx.Provider>;
}

export function useGsapContext(
  func?: Parameters<typeof useGSAP>[0],
  dependencies?: Parameters<typeof useGSAP>[1]
) {
  useContext(GsapCtx);
  return useGSAP(func as never, dependencies as never);
}
