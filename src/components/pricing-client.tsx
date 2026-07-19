"use client";

import { CheckCircle } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";
import { plans } from "@/lib/mock-data";
import { annualMonthlyPrice } from "@/lib/demo-utils";
import { useMockStore } from "./mock-store";

export function PricingClient() {
  const [annual, setAnnual] = useState(true);
  const [cameras, setCameras] = useState(24);
  const { selectPlan, setBilling } = useMockStore();
  const choose = (id: (typeof plans)[number]["id"]) => { selectPlan(id, cameras); setBilling(annual ? "annual" : "monthly"); };
  return (
    <>
      <div className="pricing-toggle" aria-label="Billing frequency"><button className={!annual ? "active" : ""} onClick={() => setAnnual(false)}>Monthly</button><button className={annual ? "active" : ""} onClick={() => setAnnual(true)}>Annual · save 20%</button></div>
      <div className="pricing-grid" style={{ marginTop: 48 }}>
        {plans.map((plan) => {
          const price = annual ? annualMonthlyPrice(plan.monthly) : plan.monthly;
          return <article className={`price-card ${plan.id === "operations" ? "featured" : ""}`} key={plan.id}><span className="eyebrow">{plan.name}</span><div className="price">${price}<small> / month</small></div><p className="muted" style={{ lineHeight: 1.6 }}>{plan.description}</p><ul className="check-list">{plan.features.map((feature) => <li key={feature}><CheckCircle size={17} weight="fill" color="var(--emerald)" />{feature}</li>)}</ul><Link href="/checkout" onClick={() => choose(plan.id)} className={`btn btn-block ${plan.id === "operations" ? "btn-primary" : "btn-secondary"}`}>Choose {plan.name}</Link></article>;
        })}
      </div>
      <div className="estimator"><div><strong>Estimate your camera rollout</strong><p className="muted" style={{ margin: "8px 0 0" }}>This updates the secure checkout summary.</p></div><div style={{ minWidth: 260 }}><label htmlFor="camera-count" style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}><span>Cameras</span><strong>{cameras}</strong></label><input id="camera-count" type="range" min="4" max="100" step="4" value={cameras} onChange={(event) => setCameras(Number(event.target.value))} style={{ width: "100%", accentColor: "var(--ink)" }} /></div></div>
    </>
  );
}
