import type { AnalyticsSnapshot, Camera, Incident, PricingPlan, Site } from "./types";

export const sites: Site[] = [
  { id: "north-hub", name: "North Distribution Hub", location: "Lahore, PK", cameraCount: 24, health: 98 },
  { id: "central-yard", name: "Central Logistics Yard", location: "Islamabad, PK", cameraCount: 18, health: 96 },
  { id: "south-warehouse", name: "South Fulfilment Center", location: "Karachi, PK", cameraCount: 32, health: 99 },
];

export const cameras: Camera[] = [
  { id: "cam-01", name: "Receiving Dock 01", zone: "Receiving", status: "online", image: "/images/receiving-dock-camera.png", uptime: 99.9 },
  { id: "cam-08", name: "Warehouse Aisle 08", zone: "Warehouse", status: "online", image: "/images/warehouse-aisle-camera.png", uptime: 99.7 },
  { id: "cam-14", name: "Parking Perimeter 14", zone: "Perimeter", status: "online", image: "/images/parking-perimeter-camera.png", uptime: 98.8 },
];

export const initialIncidents: Incident[] = [
  { id: "INC-2841", title: "Vehicle entered restricted lane", cameraId: "cam-14", zone: "Parking perimeter", time: "2 min ago", severity: "critical", status: "new", image: "/images/parking-perimeter-camera.png", description: "A vehicle crossed the configured restricted-lane boundary after operating hours." },
  { id: "INC-2839", title: "Loading bay left obstructed", cameraId: "cam-01", zone: "Receiving dock", time: "18 min ago", severity: "warning", status: "reviewing", image: "/images/receiving-dock-camera.png", description: "Pallets remained inside the marked loading zone beyond the configured dwell threshold." },
  { id: "INC-2837", title: "Forklift idle in pedestrian path", cameraId: "cam-08", zone: "Warehouse aisle", time: "41 min ago", severity: "warning", status: "new", image: "/images/warehouse-aisle-camera.png", description: "A forklift stopped inside the pedestrian safety corridor for more than three minutes." },
];

export const analytics: AnalyticsSnapshot[] = [
  { label: "Mon", incidents: 18, responseMinutes: 9 }, { label: "Tue", incidents: 25, responseMinutes: 8 },
  { label: "Wed", incidents: 16, responseMinutes: 7 }, { label: "Thu", incidents: 31, responseMinutes: 6 },
  { label: "Fri", incidents: 22, responseMinutes: 6 }, { label: "Sat", incidents: 12, responseMinutes: 5 },
  { label: "Sun", incidents: 9, responseMinutes: 5 },
];

export const plans: PricingPlan[] = [
  { id: "starter", name: "Starter", monthly: 99, description: "For a single site proving the value of AI video intelligence.", features: ["Up to 12 cameras", "7-day incident history", "Core safety detections", "Email alerts"] },
  { id: "operations", name: "Operations", monthly: 249, description: "For teams coordinating security and operations across busy facilities.", features: ["Up to 40 cameras", "30-day incident history", "Advanced rules and zones", "Analytics exports", "Priority support"] },
  { id: "enterprise", name: "Enterprise", monthly: 699, description: "For multi-site organizations with governance and custom workflows.", features: ["Unlimited sites", "Custom retention", "SSO and audit controls", "Dedicated success manager", "Custom detection models"] },
];
