"use client";

import { Bell, Buildings, ChartLineUp, Gear, ShieldWarning, SquaresFour } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brand } from "./brand";

const navigation = [
  { href: "/app/overview", label: "Overview", icon: SquaresFour },
  { href: "/app/incidents", label: "Incidents", icon: ShieldWarning },
  { href: "/app/analytics", label: "Analytics", icon: ChartLineUp },
  { href: "/app/sites", label: "Sites & cameras", icon: Buildings },
  { href: "/app/settings", label: "Settings", icon: Gear },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return <div className="app-shell"><aside className="app-sidebar"><Brand href="/app/overview" /> <nav className="app-nav" aria-label="Workspace navigation">{navigation.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className={pathname === href || pathname.startsWith(`${href}/`) ? "active" : ""}><Icon size={20} /><span>{label}</span></Link>)}</nav><div className="sidebar-foot"><strong style={{ color: "white" }}>North Distribution Hub</strong><span style={{ display: "block", marginTop: 6 }}>24 cameras · Demo data</span></div></aside><div className="app-main"><header className="app-topbar"><div><span className="eyebrow">Facility intelligence</span></div><div className="toolbar"><button className="icon-btn" aria-label="Notifications"><Bell size={19} /></button><span className="status success">All systems operational</span></div></header>{children}</div></div>;
}
