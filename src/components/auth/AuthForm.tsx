"use client";

import { useActionState, useEffect, useId, useRef, type ReactNode } from "react";
import { INITIAL_AUTH_STATE, type AuthAction } from "@/lib/auth/action-state";
import styles from "./auth.module.css";

export type AuthField = {
  name: string; label: string; type?: "text" | "email" | "password" | "select";
  autoComplete?: string; required?: boolean; minLength?: number; maxLength?: number;
  hint?: string; inputMode?: "numeric"; pattern?: string;
  options?: { value: string; label: string }[];
};

export function ActionFeedback({ status, message }: { status: string; message: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => { if (message) ref.current?.focus(); }, [message]);
  return message ? <p ref={ref} tabIndex={-1} className={styles.feedback} role={status === "error" ? "alert" : "status"}>{message}</p> : null;
}

export function DocumentNavigation({ destination }: { destination?: string }) {
  useEffect(() => {
    if (!destination) return;
    const target = new URL(destination, window.location.origin);
    if (target.origin === window.location.origin) window.location.assign(target.href);
  }, [destination]);
  return destination ? <p className={styles.hint}><a className={styles.link} href={destination}>Continue if you are not redirected.</a></p> : null;
}

export default function AuthForm({ action, fields = [], hidden = {}, submitLabel, disabled = false, children, secondary = false }: {
  action: AuthAction; fields?: AuthField[]; hidden?: Record<string, string>;
  submitLabel: string; disabled?: boolean; children?: ReactNode; secondary?: boolean;
}) {
  const [state, formAction, pending] = useActionState(action, INITIAL_AUTH_STATE);
  const id = useId();
  return (
    <>
      <form className={styles.form} action={formAction} aria-busy={pending}>
        {Object.entries(hidden).map(([name, value]) => <input key={name} type="hidden" name={name} value={value} />)}
        <fieldset className={styles.fields} disabled={disabled || pending}>
          {fields.map((field) => {
            const fieldId = `${id}-${field.name}`;
            const error = state.fields?.[field.name];
            const describedBy = [field.hint ? `${fieldId}-hint` : "", error ? `${fieldId}-error` : ""].filter(Boolean).join(" ") || undefined;
            return (
              <div className={styles.field} key={field.name}>
                <label className={styles.label} htmlFor={fieldId}>{field.label}{field.required === false ? " (optional)" : ""}</label>
                {field.type === "select" ? (
                  <select id={fieldId} name={field.name} className={styles.select} aria-invalid={Boolean(error)} aria-describedby={describedBy} required={field.required !== false}>
                    {field.options?.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                  </select>
                ) : (
                  <input id={fieldId} name={field.name} type={field.type ?? "text"} className={styles.input} autoComplete={field.autoComplete}
                    required={field.required !== false} minLength={field.minLength} maxLength={field.maxLength} inputMode={field.inputMode} pattern={field.pattern}
                    aria-invalid={Boolean(error)} aria-describedby={describedBy} autoCapitalize="none" spellCheck={field.type === "password" ? false : undefined} />
                )}
                {field.hint && <p className={styles.hint} id={`${fieldId}-hint`}>{field.hint}</p>}
                {error && <p className={styles.fieldError} id={`${fieldId}-error`}>{error}</p>}
              </div>
            );
          })}
          {children}
          <button className={`${styles.button} ${secondary ? styles.secondary : ""}`} type="submit">{pending ? "Please wait…" : submitLabel}</button>
        </fieldset>
      </form>
      <ActionFeedback status={state.status} message={state.message} />
      <DocumentNavigation destination={state.redirectTo} />
    </>
  );
}
