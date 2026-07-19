"use client";

import { Bell, CalendarBlank, CaretDown } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brand } from "./brand";

const navigation = [
  { href: "/app/overview", label: "Overview" },
  { href: "/app/sites", label: "Live Cameras" },
  { href: "/app/incidents", label: "Incidents" },
  { href: "/app/analytics", label: "Analytics" },
  { href: "/app/sites", label: "Sites" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="app-shell app-shell-topnav">
      <header className="workspace-header">
        <div className="workspace-brand">
          <Brand href="/app/overview" />
          <span>AI Video Intelligence Platform</span>
        </div>

        <nav className="workspace-nav" aria-label="workspace navigation">
          {navigation.map(({ href, label }) => {
            const active =
              pathname === href ||
              (label !== "Live Cameras" && pathname.startsWith(`${href}/`));
            return (
              <Link key={label} href={href} className={active ? "active" : ""}>
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="workspace-tools">
          <div className="workspace-date">
            <CalendarBlank size={21} />
            <span>
              <strong>Jul 15, 2026</strong>
              <small>Tue 10:42 AM</small>
            </span>
          </div>
          <button className="workspace-alert" aria-label="Notifications">
            <Bell size={22} />
            <span>3</span>
          </button>
          <button className="workspace-profile" aria-label="Open profile menu">
            <Image
              src="/images/taylor-morgan-avatar.png"
              alt="Taylor Morgan, Security Manager"
              width={42}
              height={42}
              priority
            />
            <span>
              <strong>Taylor Morgan</strong>
              <small>Security Manager</small>
            </span>
            <CaretDown size={14} />
          </button>
        </div>
      </header>
      <div className="app-main">{children}</div>
    </div>
  );
}
