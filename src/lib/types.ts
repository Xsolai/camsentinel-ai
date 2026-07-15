export type IncidentSeverity = "critical" | "warning" | "info";
export type IncidentStatus = "new" | "reviewing" | "resolved";

export interface Site { id: string; name: string; location: string; cameraCount: number; health: number; }
export interface Camera { id: string; name: string; zone: string; status: "online" | "offline"; image: string; uptime: number; }
export interface Incident { id: string; title: string; cameraId: string; zone: string; time: string; severity: IncidentSeverity; status: IncidentStatus; image: string; description: string; }
export interface AnalyticsSnapshot { label: string; incidents: number; responseMinutes: number; }
export interface PricingPlan { id: "starter" | "operations" | "enterprise"; name: string; monthly: number; description: string; features: string[]; }
export interface Subscription { planId: PricingPlan["id"]; cameraCount: number; billing: "monthly" | "annual"; status: "trial" | "active"; }
export interface UserProfile { name: string; email: string; company: string; timezone: string; }

export interface MockAppState {
  selectedSiteId: string;
  incidents: Incident[];
  subscription: Subscription;
  profile: UserProfile;
  onboardingComplete: boolean;
}
