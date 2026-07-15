import type { Metadata } from "next";
import { OnboardingClient } from "@/components/onboarding-client";
export const metadata: Metadata = { title: "Set up your workspace", robots: { index: false, follow: false } };
export default function Page() { return <OnboardingClient />; }
