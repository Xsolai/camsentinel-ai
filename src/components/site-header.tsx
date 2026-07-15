"use client";

import { List, X } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";
import { Brand } from "./brand";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Brand />
        <nav className="site-nav" aria-label="Primary navigation">
          <Link href="/#platform">Platform</Link>
          <Link href="/#industries">Industries</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/#faq">FAQ</Link>
        </nav>
        <div className="header-actions">
          <Link href="/login" className="btn btn-secondary">Sign in</Link>
          <Link href="/signup" className="btn btn-primary">Start free trial</Link>
          <button className="icon-btn mobile-trigger" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation" aria-expanded={open}>
            {open ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <nav aria-label="Mobile navigation" style={{ padding: "10px 20px 20px", display: "grid", gap: 8, background: "var(--canvas)" }}>
          <Link href="/#platform" onClick={() => setOpen(false)}>Platform</Link>
          <Link href="/#industries" onClick={() => setOpen(false)}>Industries</Link>
          <Link href="/pricing" onClick={() => setOpen(false)}>Pricing</Link>
          <Link href="/#faq" onClick={() => setOpen(false)}>FAQ</Link>
        </nav>
      )}
    </header>
  );
}
