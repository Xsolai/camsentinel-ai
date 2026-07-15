"use client";

import { CheckCircle, CreditCard, LockKey } from "@phosphor-icons/react";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { plans } from "@/lib/mock-data";
import { checkoutTotal } from "@/lib/demo-utils";
import { useMockStore } from "./mock-store";

export function CheckoutClient() {
  const { subscription } = useMockStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const plan = plans.find((item) => item.id === subscription.planId) ?? plans[1];
  const monthly = subscription.billing === "annual" ? Math.round(plan.monthly * .8) : plan.monthly;
  const total = checkoutTotal(plan, subscription.cameraCount, subscription.billing);
  const cameraAddon = total - monthly;
  const submit = (event: FormEvent) => { event.preventDefault(); setLoading(true); window.setTimeout(() => { setLoading(false); setSuccess(true); }, 850); };
  if (success) return <div className="panel" style={{ textAlign: "center", padding: 54 }}><CheckCircle size={54} weight="fill" color="var(--emerald)" style={{ margin: "0 auto 18px" }} /><h1 className="section-title" style={{ fontSize: 40 }}>Demo subscription activated.</h1><p className="lede" style={{ margin: "0 auto" }}>No payment was processed. Your simulated plan is ready in the billing workspace.</p><Link className="btn btn-primary" href="/app/overview" style={{ marginTop: 28 }}>Open workspace</Link></div>;
  return <div className="checkout-layout"><form className="panel" onSubmit={submit}><span className="eyebrow">Secure demo checkout</span><h1 className="section-title" style={{ fontSize: 40 }}>Complete your workspace setup.</h1><div className="success-box" style={{ marginBottom: 24 }}><strong>Demo mode:</strong> Payment details stay in this browser and are never transmitted.</div><div className="form-stack"><div className="form-row"><div className="field-wrap"><label htmlFor="first">First name</label><input className="field" id="first" required defaultValue="Ahsan" /></div><div className="field-wrap"><label htmlFor="last">Last name</label><input className="field" id="last" required defaultValue="Inam" /></div></div><div className="field-wrap"><label htmlFor="company">Company</label><input className="field" id="company" required defaultValue="XsolAI" /></div><div className="field-wrap"><label htmlFor="card">Demo card number</label><div style={{ position: "relative" }}><CreditCard size={20} style={{ position: "absolute", left: 14, top: 14, color: "var(--ink-soft)" }} /><input className="field" id="card" inputMode="numeric" pattern="[0-9 ]{19}" required defaultValue="4242 4242 4242 4242" style={{ paddingLeft: 44 }} /></div></div><div className="form-row"><div className="field-wrap"><label htmlFor="expiry">Expiry</label><input className="field" id="expiry" required defaultValue="12/29" /></div><div className="field-wrap"><label htmlFor="cvc">CVC</label><input className="field" id="cvc" inputMode="numeric" required defaultValue="123" /></div></div><button className="btn btn-primary btn-block" disabled={loading}><LockKey size={18} />{loading ? "Simulating payment…" : "Activate demo plan"}</button></div></form><aside className="panel order-summary"><span className="eyebrow">Order summary</span><h2 style={{ fontSize: 28, letterSpacing: "-.04em" }}>{plan.name}</h2><p className="muted">{subscription.cameraCount} cameras · {subscription.billing} billing</p><div className="summary-line"><span>Platform subscription</span><strong>${monthly}</strong></div><div className="summary-line"><span>Camera capacity adjustment</span><strong>${cameraAddon}</strong></div><div className="summary-line"><span>14-day trial credit</span><strong>−${monthly + cameraAddon}</strong></div><div className="summary-total"><span>Due today</span><span>$0</span></div><p className="form-note" style={{ marginTop: 20 }}>This frontend demonstrates the checkout journey only. It does not integrate with Stripe or any payment processor.</p></aside></div>;
}
