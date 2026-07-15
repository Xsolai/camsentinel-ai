import type { Incident, IncidentSeverity, PricingPlan, UserProfile } from "./types";

export function isValidEmail(value: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); }
export function annualMonthlyPrice(monthly: number) { return Math.round(monthly * .8); }
export function filterIncidents(incidents: Incident[], severity: "all" | IncidentSeverity) { return severity === "all" ? incidents : incidents.filter((incident) => incident.severity === severity); }
export function checkoutTotal(plan: PricingPlan, cameraCount: number, billing: "monthly" | "annual") { const monthly = billing === "annual" ? annualMonthlyPrice(plan.monthly) : plan.monthly; const included = plan.id === "starter" ? 12 : plan.id === "operations" ? 40 : Number.POSITIVE_INFINITY; return monthly + Math.max(0, cameraCount - included) * 3; }
export function isValidProfile(profile: UserProfile) { return Boolean(profile.name.trim() && profile.company.trim() && isValidEmail(profile.email)); }
export function onboardingCanContinue(selectedCameras: boolean[]) { return selectedCameras.some(Boolean); }
