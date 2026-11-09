"use client";

import type { AdminActionState } from "@/lib/admin/types";
import s from "./admin.module.css";

export function FormFeedback({ state, id }: { state: AdminActionState; id?: string }) {
  return <div id={id} role={state.status === "error" || state.status === "conflict" ? "alert" : "status"} aria-live={state.status === "error" || state.status === "conflict" ? "assertive" : "polite"} aria-atomic="true">
    {state.message && <p className={`${s.feedback} ${state.status === "error" || state.status === "conflict" ? s.error : ""}`}>{state.message}</p>}
  </div>;
}
