"use client";

import { useState } from "react";
import { COUNTRY_CYCLES } from "@/lib/engine/country-cycles";
import { usePlanActions, useProfile } from "@/lib/engine/profile";
import { readLegacyCandidate, type LegacyRead } from "@/lib/workspace/legacy";
import styles from "./account.module.css";

export default function LegacyImport() {
  const { importLegacy } = usePlanActions();
  const workspace = useProfile();
  const [legacy, setLegacy] = useState<LegacyRead | null>(null);
  const [intakeId, setIntakeId] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [confirmed, setConfirmed] = useState(false);
  const [message, setMessage] = useState("");
  const value = legacy?.kind === "present" ? legacy.value : null;
  const country = COUNTRY_CYCLES.find((item) => item.code === value?.target.countryCode);
  const busy = workspace.sync === "saving";

  const review = () => {
    let result: LegacyRead;
    try { result = readLegacyCandidate(window.localStorage); }
    catch { result = { kind: "invalid", message: "Browser storage is unavailable. The original data has not been changed." }; }
    setLegacy(result); setConfirmed(false); setMessage("");
    if (result.kind === "present") { setIntakeId(result.value.target.intakeId); setSelected(result.value.completedIds); }
  };

  return <section className={`${styles.card} ${styles.wide}`} aria-labelledby="legacy-title">
    <h2 id="legacy-title">Bring an older browser plan</h2>
    <p>Older versions saved one target and a global tick list in this browser. Those ticks do not prove which intake they belonged to. Review the intake and each completion before importing.</p>
    <button type="button" className={`${styles.button} ${styles.secondary}`} onClick={review} disabled={busy}>Review older browser progress</button>
    {legacy?.kind === "none" && <p role="status">No older browser plan was found.</p>}
    {legacy?.kind === "invalid" && <p role="alert">{legacy.message}</p>}
    {value && country && <form onSubmit={async (event) => {
      event.preventDefault();
      if (!confirmed || !workspace.user || busy) return;
      const ok = await importLegacy({ target: { ...value.target, intakeId }, completedIds: selected, confirmed: true });
      if (ok) { setMessage("Import confirmed. Existing cloud completions were retained, and the original browser data was left unchanged."); setConfirmed(false); }
    }}>
      <div className={styles.field}>
        <label htmlFor="legacy-intake">Reviewed intake for {country.name}</label>
        <select id="legacy-intake" value={intakeId} onChange={(event) => { setIntakeId(event.target.value); setConfirmed(false); }} disabled={busy}>
          {country.intakes.map((intake) => <option key={intake.id} value={intake.id}>{intake.label}</option>)}
        </select>
      </div>
      {value.excludedEntries > 0 && <p>{value.excludedEntries} unknown, invalid or other-country entries were excluded. Nothing has been removed from browser storage.</p>}
      <fieldset className={styles.field} disabled={busy}>
        <legend>Completions to merge into this intake</legend>
        <div className={styles.checks}>
          {value.completedIds.length === 0 && <p>No valid completed steps were found for this country.</p>}
          {value.completedIds.map((id) => <label key={id} className={styles.check}>
            <input type="checkbox" checked={selected.includes(id)} onChange={(event) => {
              setSelected((previous) => event.target.checked ? [...previous, id] : previous.filter((item) => item !== id)); setConfirmed(false);
            }} />
            <span>{country.milestones.find((step) => step.id === id)?.title}</span>
          </label>)}
        </div>
      </fieldset>
      <label className={styles.check}>
        <input type="checkbox" checked={confirmed} disabled={busy} onChange={(event) => setConfirmed(event.target.checked)} />
        <span>I reviewed this intake and the selected completions. Merge them without erasing any existing cloud progress.</span>
      </label>
      <div className={styles.actions}><button type="submit" className={styles.button} disabled={!confirmed || !workspace.user || busy}>{busy ? "Importing…" : "Import reviewed progress"}</button></div>
      <p role="status" className={styles.message}>{message}</p>
      {workspace.error && <p role="alert">{workspace.error}</p>}
    </form>}
  </section>;
}
