import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { PricingClient } from "@/components/pricing-client";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { plans } from "@/lib/mock-data";

export const metadata: Metadata = { title: "Pricing for AI CCTV Monitoring", description: "Compare CamSentinel AI plans for security camera analytics, incident workflows, and multi-site operational intelligence.", alternates: { canonical: "/pricing" } };

export default function PricingPage() {
  const productLd = { "@context": "https://schema.org", "@type": "Product", name: "CamSentinel AI", description: "AI CCTV monitoring and video intelligence software.", offers: plans.map((plan) => ({ "@type": "Offer", name: plan.name, price: plan.monthly, priceCurrency: "USD", availability: "https://schema.org/InStock" })) };
  return <><JsonLd data={productLd} /><SiteHeader /><main><section className="page-hero"><div className="container"><span className="eyebrow">Simple, camera-based pricing</span><h1 className="section-title">Start with one site. Scale without rebuilding.</h1><p className="lede">Every plan includes the complete simulated customer experience. No real card or camera connection is required.</p><PricingClient /></div></section></main><SiteFooter /></>;
}
