import { Suspense, type ReactNode } from "react";
import Link from "next/link";
import { adminPageAccess } from "@/lib/admin/access";
import { AdminAccessState } from "@/components/admin/chrome";
import { AdminNavigation } from "@/components/admin/navigation";
import s from "@/components/admin/admin.module.css";

export const instant = false;
export const metadata = { title: "Administration · Waymark", robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <Suspense fallback={<div className={s.standalone}><div><p role="status">Verifying administrator access…</p></div></div>}>
    <ProtectedShell>{children}</ProtectedShell>
  </Suspense>;
}

async function ProtectedShell({ children }: { children: ReactNode }) {
  const access = await adminPageAccess();
  if (access.state !== "ready") return <AdminAccessState state={access.state} />;
  return <div className={s.shell}>
    <header className={s.topbar}>
      <div><Link className={s.brand} href="/admin">Waymark / Admin</Link><p className={s.muted}>A clearer route, carefully maintained.</p></div>
      <div className={s.identity}><p>{access.context.user.email}</p><p>Two-factor verified · <Link href="/admin/security">Security</Link> · <Link href="/today">Planner</Link></p></div>
    </header>
    <div className={s.workspace}><AdminNavigation /><div className={s.content}>{children}</div></div>
  </div>;
}
