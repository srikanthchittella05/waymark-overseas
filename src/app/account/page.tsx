import type { Metadata } from "next";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { getAuthContext } from "@/lib/auth/session";
import { planRecordSchema } from "@/lib/platform/validation";
import { COUNTRY_CYCLES } from "@/lib/engine/country-cycles";
import { databaseError } from "@/lib/platform/errors";
import { formatPlanDate } from "@/lib/format-date";
import LegacyImport from "@/components/account/LegacyImport";
import NotificationReadButton from "@/components/account/NotificationReadButton";
import styles from "@/components/account/account.module.css";
import { LogoutForm } from "@/components/auth/AuthShell";

export const instant = false;
export const metadata: Metadata = { title: "Your Account — Waymark", robots: { index: false, follow: false } };

const notificationSchema = z.object({ id: z.uuid(), title: z.string(), body: z.string(), published_at: z.string() });

export default async function AccountPage() {
  await connection();
  let context;
  try { context = await getAuthContext(); }
  catch { return <div className={styles.page}><h1>Account access unavailable</h1><p>Your session could not be verified. No private plan has been loaded. Reload or return to the <Link href="/">public preview</Link>.</p></div>; }
  if (!context.configured) return <div className={styles.page}><header className={styles.header}><h1>Accounts are awaiting setup.</h1><p>Account creation and cloud saving are not available yet. Preview changes are not uploaded.</p></header><Link href="/path" className={styles.button}>Try the public preview</Link></div>;
  if (!context.user || !context.client) redirect("/login?next=/account");
  const { client, user } = context;
  const [plansResult, announcementsResult, readsResult] = await Promise.all([
    client.from("plans").select("*").eq("user_id", user.id).order("updated_at", { ascending: false }).limit(100),
    client.from("announcements").select("id,title,body,published_at").not("published_at", "is", null).is("archived_at", null).order("published_at", { ascending: false }).limit(50),
    client.from("notification_reads").select("announcement_id").eq("user_id", user.id).limit(1000),
  ]);
  if (plansResult.error) databaseError(plansResult.error);
  if (announcementsResult.error) databaseError(announcementsResult.error);
  if (readsResult.error) databaseError(readsResult.error);
  const plans = z.array(planRecordSchema).parse(plansResult.data ?? []);
  const announcements = z.array(notificationSchema).parse(announcementsResult.data ?? []);
  const readIds = new Set(z.array(z.object({ announcement_id: z.uuid() })).parse(readsResult.data ?? []).map((row) => row.announcement_id));
  return <div className={styles.page}>
    <header className={styles.header}>
      <p className="eyebrow">Your Waymark account</p>
      <h1>A route you can return to.</h1>
      <p>{user.displayName || "Welcome"} · {user.email}. Each saved intake has its own checklist. Preview changes made while signed out are not uploaded.</p>
       <div className={styles.actions}><Link href="/path" className={styles.button}>Choose a target</Link><Link href="/today" className={`${styles.button} ${styles.secondary}`}>Continue your plan</Link>{user.isAdmin && <Link href="/admin" className={`${styles.button} ${styles.secondary}`}>Administration</Link>}</div>
       <LogoutForm />
    </header>
    <div className={styles.grid}>
      <section className={styles.card} aria-labelledby="account-plans"><h2 id="account-plans">Saved plans</h2>
        {plans.length === 0 ? <p>No saved plans yet. Choose and confirm a target on Your Path.</p> : <ul>{plans.map((plan) => {
          const country = COUNTRY_CYCLES.find((item) => item.code === plan.country_code);
          const intake = country?.intakes.find((item) => item.id === plan.intake_id);
          return <li key={plan.id}><strong>{country?.name ?? plan.country_code} · {intake?.label ?? plan.intake_id}</strong><p className={styles.muted}>Last updated {formatPlanDate(plan.updated_at.slice(0, 10))}</p><Link href={`/path?country=${encodeURIComponent(plan.country_code)}&intake=${encodeURIComponent(plan.intake_id)}`}>Select this intake</Link></li>;
        })}</ul>}
      </section>
      <section className={styles.card} aria-labelledby="account-updates"><h2 id="account-updates">Updates for you</h2>
        {announcements.length === 0 ? <p>No in-app updates for your account yet.</p> : <ul>{announcements.map((announcement) => <li key={announcement.id}>
          <h3>{announcement.title}</h3><p style={{ whiteSpace: "pre-wrap" }}>{announcement.body}</p><p className={styles.muted}>{formatPlanDate(announcement.published_at.slice(0, 10))}</p>
          {readIds.has(announcement.id) ? <p className={styles.muted}>Read</p> : <NotificationReadButton id={announcement.id} />}
        </li>)}</ul>}
        <p className={styles.muted}>Updates are delivered inside Waymark, not by bulk email.</p>
      </section>
      <LegacyImport />
    </div>
  </div>;
}
