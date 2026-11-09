"use client";

import Link from "next/link";
import styles from "@/components/account/account.module.css";

export default function AccountError({ reset }: { reset: () => void }) {
  return <div className={styles.page} role="alert"><header className={styles.header}>
    <h1>Your account could not be loaded.</h1><p>No change has been confirmed. Check your connection and try again.</p>
  </header><div className={styles.actions}><button type="button" className={styles.button} onClick={reset}>Try again</button><Link href="/" className={`${styles.button} ${styles.secondary}`}>Public preview</Link></div></div>;
}
