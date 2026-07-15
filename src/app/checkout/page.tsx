import type { Metadata } from "next";
import { Brand } from "@/components/brand";
import { CheckoutClient } from "@/components/checkout-client";
export const metadata: Metadata = { title: "Demo checkout", robots: { index: false, follow: false } };
export default function Page() { return <><header className="onboarding-header"><Brand /><span className="muted" style={{ fontSize: 13 }}>Encrypted demo checkout</span></header><main><CheckoutClient /></main></>; }
