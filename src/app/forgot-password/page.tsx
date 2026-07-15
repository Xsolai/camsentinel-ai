import type { Metadata } from "next";
import { AuthPanel } from "@/components/auth-panel";
export const metadata: Metadata = { title: "Reset password", robots: { index: false, follow: false } };
export default function Page() { return <AuthPanel mode="forgot" />; }
