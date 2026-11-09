"use client";

import { useState, type FormEvent } from "react";
import type { PlanStep } from "@/lib/engine/plan";
import { addDays, checkpointSchedule } from "@/lib/engine/plan";
import { usePlanActions, useProfile } from "@/lib/engine/profile";
import { usePlanWriteDisabled } from "@/components/account/PlanPersistenceNotice";
import styles from "./checkpoint.module.css";

const labels = {
  not_started: "Not started",
  in_progress: "In progress",
  evidence_submitted: "Evidence added",
  complete: "Complete",
  skipped_with_reason: "Skipped with reason",
  blocked: "Blocked",
};

export default function CheckpointPanel({ step, lockedByDependents = false, onSkip }: {
  step: PlanStep; lockedByDependents?: boolean; onSkip?: () => void;
}) {
  const workspace = useProfile();
  const { startCheckpoint, addCheckpointEvidence, skipCheckpoint } = usePlanActions();
  const writeDisabled = usePlanWriteDisabled();
  const saved = workspace.checkpoints[step.id];
  const complete = step.status === "done";
  const status = complete ? "complete" : saved?.status === "complete" ? "not_started" : saved?.status ?? "not_started";
  const schedule = checkpointSchedule(step, addDays(step.dueDate, -step.daysUntil));
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const disabled = writeDisabled || busy;

  async function act(action: () => Promise<boolean>, success: string) {
    setBusy(true);
    try {
      setMessage(await action() ? success : "This change could not be confirmed. Check the plan notice and reload before retrying.");
    } finally {
      setBusy(false);
    }
  }

  async function addEvidence(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const evidence = { title: title.trim(), ...(url.trim() ? { url: url.trim() } : {}) };
    if (!evidence.title) return;
    await act(async () => {
      const saved = await addCheckpointEvidence(step.id, evidence);
      if (saved) { setTitle(""); setUrl(""); }
      return saved;
    }, "Evidence recorded.");
  }

  async function skip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!reason.trim()) return;
    await act(async () => {
      const saved = await skipCheckpoint(step.id, reason);
      if (saved) { setReason(""); onSkip?.(); }
      return saved;
    }, "Checkpoint skipped with reason; dependent milestones remain blocked.");
  }

  return (
    <details className={styles.panel}>
      <summary className={styles.summary} aria-label={`${step.title}: checkpoint ${labels[status]}, plan and history`}>
        Checkpoint · {labels[status]} · plan and history
      </summary>
      <div className={styles.content}>
        {step.blockers.length ? (
          <p className={styles.caution}>Waiting on {step.blockers.length} prerequisite{step.blockers.length === 1 ? "" : "s"}. You can prepare and add evidence, but cannot mark this milestone complete yet. Skipping a prerequisite does not unlock it.</p>
        ) : null}
        {status === "skipped_with_reason" && saved?.skippedReason ?
          <p className={styles.caution}>Skipped: {saved.skippedReason}. This does not count as done.</p> : null}
        {lockedByDependents ? <p className={styles.caution}>Reopen completed dependent milestones before skipping this prerequisite.</p> : null}
        <p className={styles.note}>{workspace.user ? "Checkpoint changes save to this intake in your account." : "Preview only — checkpoint changes are temporary in this tab."}</p>
        {!complete && status !== "in_progress" && status !== "evidence_submitted" ? (
          <button type="button" className={styles.button} disabled={disabled}
            onClick={() => void act(() => startCheckpoint(step.id), "Checkpoint started.")}>
            Start checkpoint
          </button>
        ) : null}
        <h4 className={styles.heading}>Suggested pace</h4>
        <p className={styles.note}>{schedule.daysRemaining < 0 ? "The planning date has passed; this is a catch-up outline, not a new deadline." :
          `${schedule.weeksRemaining} ${schedule.weeksRemaining === 1 ? "week" : "weeks"} until the planning date.`} Adjust this outline for your preparation time and confirm actual deadlines.</p>
        <ol className={styles.list}>
          {schedule.stages.map((stage) => <li key={stage.week}>
            <strong>Week {stage.week}</strong> · {stage.focus.join("; ")}
          </li>)}
        </ol>
        <h4 className={styles.heading}>Your evidence</h4>
        {saved?.evidence.length ? <ul className={styles.list}>{saved.evidence.map((item, index) => <li key={`${index}-${item.title}`}>
          {item.url ? <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title} (opens in a new tab)</a> : item.title}
        </li>)}</ul> : <p className={styles.note}>No evidence added yet. A note or link records your work; it is not independently verified by Waymark.</p>}
        <form className={styles.form} onSubmit={(event) => void addEvidence(event)}>
          <label htmlFor={`evidence-title-${step.id}`}>Evidence title</label>
          <input id={`evidence-title-${step.id}`} value={title} onChange={(event) => setTitle(event.target.value)} required maxLength={300} disabled={disabled || (saved?.evidence.length ?? 0) >= 50} placeholder="e.g. Test booking confirmation" />
          <label htmlFor={`evidence-url-${step.id}`}>HTTPS link (optional)</label>
          <input id={`evidence-url-${step.id}`} type="url" pattern="https://.*" value={url} onChange={(event) => setUrl(event.target.value)} disabled={disabled || (saved?.evidence.length ?? 0) >= 50} placeholder="https://…" />
          <button type="submit" className={styles.button} disabled={disabled || (saved?.evidence.length ?? 0) >= 50}>Add evidence</button>
        </form>
        <form className={styles.form} onSubmit={(event) => void skip(event)}>
          <label htmlFor={`skip-reason-${step.id}`}>Reason to skip (does not satisfy dependencies)</label>
          <textarea id={`skip-reason-${step.id}`} value={reason} onChange={(event) => setReason(event.target.value)} required maxLength={2000} rows={2} disabled={disabled || lockedByDependents} />
          <button type="submit" className={styles.button} disabled={disabled || lockedByDependents}>Skip with reason</button>
        </form>
        <h4 className={styles.heading}>Progress history</h4>
        <p className={styles.note}>Recent activity only — up to 100 events, not a permanent audit record.</p>
        {saved?.history.length ? <ol className={styles.list}>{saved.history.map((entry, index) => <li key={`${index}-${entry.at}`}>
          <time dateTime={entry.at}>{entry.at.slice(0, 10)} UTC</time> · {labels[entry.status]}{entry.note ? ` · ${entry.note}` : ""}
        </li>)}</ol> : <p className={styles.note}>{complete ? "Completed before checkpoint history was recorded." : "No activity yet."}</p>}
        <p className={styles.status} role="status">{message}</p>
      </div>
    </details>
  );
}
