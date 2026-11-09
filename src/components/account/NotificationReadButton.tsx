"use client";

import { useActionState } from "react";
import { markRead } from "@/app/account/actions";
import styles from "./account.module.css";

export default function NotificationReadButton({ id }: { id: string }) {
  const [state, action, pending] = useActionState(markRead, { message: "", ok: false });
  return <form action={action}>
    <input type="hidden" name="announcementId" value={id} />
    <button type="submit" className={`${styles.button} ${styles.secondary}`} disabled={pending || state.ok}>{pending ? "Updating…" : state.ok ? "Read" : "Mark as read"}</button>
    <p className={styles.message} role={state.ok ? "status" : "alert"}>{state.message}</p>
  </form>;
}
