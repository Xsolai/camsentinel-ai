"use client";

import { CheckCircle, CreditCard, Receipt } from "@phosphor-icons/react";
import Link from "next/link";
import { plans } from "@/lib/mock-data";
import { useMockStore } from "./mock-store";

export function BillingView() {
  const { subscription, selectPlan } = useMockStore();
  const plan = plans.find((item) => item.id === subscription.planId) ?? plans[1];
  return <main className="app-content"><div><span className="eyebrow">Settings · Billing</span><h1 className="app-title" style={{ marginTop: 7 }}>Plan and billing</h1></div><div className="dashboard-grid"><section className="panel"><div className="tabs"><Link href="/app/settings">Profile</Link><button className="active">Billing</button></div><span className="eyebrow">Current plan</span><h2 style={{ fontSize: 34, letterSpacing: "-.045em", marginBottom: 8 }}>{plan.name}</h2><p className="muted">{subscription.cameraCount} cameras · {subscription.billing} billing · trial status</p><div className="success-box" style={{ margin: "22px 0" }}><CheckCircle size={18} weight="fill" style={{ display: "inline", marginRight: 8 }} />Your simulated trial is active. No payment method is charged.</div><div className="pricing-grid">{plans.map((item) => <button key={item.id} className={`panel ${item.id === plan.id ? "selected" : ""}`} style={{ textAlign: "left", borderColor: item.id === plan.id ? "var(--ink)" : undefined }} onClick={() => selectPlan(item.id)}><strong>{item.name}</strong><span className="muted" style={{ display: "block", marginTop: 5 }}>${item.monthly}/mo</span></button>)}</div></section><aside className="panel"><CreditCard size={24} /><h2>Demo payment method</h2><p className="muted">Visa ending in 4242</p><div className="summary-line"><span>Next simulated invoice</span><strong>$0.00</strong></div><div className="summary-line"><span>Billing date</span><strong>29 Jul 2026</strong></div><button className="btn btn-secondary btn-block" style={{ marginTop: 18 }}><Receipt size={17} /> View invoice history</button><p className="form-note" style={{ marginTop: 18 }}>Billing controls are visual and stored locally for this public demo.</p></aside></div></main>;
}
