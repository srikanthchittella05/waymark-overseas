"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import s from "./admin.module.css";

const links = [
  ["/admin", "Overview"], ["/admin/users", "Users"], ["/admin/guides", "Guides"],
  ["/admin/deadlines", "Deadlines"], ["/admin/updates", "Announcements"], ["/admin/audit", "Audit log"],
] as const;

export function AdminNavigation() {
  const pathname = usePathname();
  return <nav className={s.sidebar} aria-label="Administration">
    {links.map(([href, title]) => <Link className={s.navLink} key={href} href={href} prefetch={false}
      aria-current={pathname === href || (href !== "/admin" && pathname.startsWith(`${href}/`)) ? "page" : undefined}>{title}</Link>)}
    <p className={s.sidebarNote}>Server-checked access.<br />Two-factor verification required.<br />No private student progress.</p>
  </nav>;
}
