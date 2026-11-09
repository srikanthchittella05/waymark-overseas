import type { ReactNode } from "react";
import styles from "./auth.module.css";

export default function AuthShell({ title, description, children, aside }: {
  title: string; description: string; children: ReactNode; aside?: ReactNode;
}) {
  return (
    <section className={styles.page} aria-labelledby="account-title">
      <header className={styles.intro}>
        <p className={styles.eyebrow}>Waymark / Your account</p>
        <h1 id="account-title" className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
      </header>
      <div className={styles.grid}>
        <div className={styles.card}>{children}</div>
        <aside className={styles.aside}>{aside ?? <><h2>Before you sign in</h2><p>The planner is available without an account.</p><p>Browser progress is not automatically imported. You choose what to save.</p><p><a href="/today" className={styles.link}>Continue with the public preview</a></p></>}</aside>
      </div>
    </section>
  );
}

export function AuthSetupNotice() {
  return <div className={styles.notice} role="status"><strong>Account setup is pending.</strong><p>Sign-up, sign-in and cloud saving are disabled until account setup is complete. The public planner remains available.</p></div>;
}

export function LogoutForm() {
  return <form action="/auth/logout" method="post" className={styles.logout}><button type="submit" className={`${styles.button} ${styles.secondary}`}>Sign out of this browser</button></form>;
}
