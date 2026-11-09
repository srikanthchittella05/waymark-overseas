"use client";

import Link from "next/link";
import styles from "@/components/account/account.module.css";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <div className={styles.page} role="alert">
      <header className={styles.header}>
        <h1>Something went wrong.</h1>
        <p>
          Waymark could not finish loading this page. Your saved target and progress are
          still in this browser when possible. Try again, or return to the public planner.
        </p>
      </header>
      <div className={styles.actions}>
        <button type="button" className={styles.button} onClick={reset}>
          Try again
        </button>
        <Link href="/" className={`${styles.button} ${styles.secondary}`}>
          Open the public planner
        </Link>
      </div>
    </div>
  );
}
