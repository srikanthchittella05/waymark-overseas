"use client";

import Link from "next/link";
import { usePlanActions, useProfile } from "@/lib/engine/profile";
import styles from "./account.module.css";

export default function PlanPersistenceNotice() {
  const workspace = useProfile();
  const { refresh } = usePlanActions();
  if (!workspace.ready) return <p className={styles.notice} role="status">Checking plan save status…</p>;
  if (workspace.error) return <div className={styles.notice} role="alert" data-state="error">
    <p>{workspace.error}</p>
    <button type="button" onClick={() => void refresh()}>Reload plan</button>
  </div>;
  if (workspace.user) return <p className={styles.notice} role="status">
    {workspace.sync === "saving" ? "Saving this change…" : workspace.hasSavedTarget
      ? "Saved to your account · progress belongs to this intake only."
      : "Your account has no saved target yet. Choose one on Your Path before ticking steps."}
    {" "}<Link href={workspace.hasSavedTarget ? "/account" : "/path"}>{workspace.hasSavedTarget ? "Your account" : "Choose target"}</Link>
  </p>;
  return <p className={styles.notice}>
    Preview only · changes are temporary and are not uploaded. <Link href="/login?next=/path">Sign in to save and sync</Link>.
    {!workspace.configured && <span> Cloud accounts are awaiting setup.</span>}
  </p>;
}

export function usePlanWriteDisabled() {
  const workspace = useProfile();
  return !workspace.ready || workspace.mode === "error" || workspace.sync === "saving" || Boolean(workspace.user && !workspace.planId);
}
