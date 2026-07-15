"use client";

import { ShieldCheck } from "@phosphor-icons/react";
import Link from "next/link";

export function Brand({
  href = "/",
  compact = false,
}: {
  href?: string;
  compact?: boolean;
}) {
  return (
    <Link href={href} className="brand" aria-label="CamSentinel AI home">
      <span className="brand-mark">
        <ShieldCheck size={22} weight="bold" />
      </span>
      {!compact && <span>CamSentinel AI</span>}
    </Link>
  );
}
