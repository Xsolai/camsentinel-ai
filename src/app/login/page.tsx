import type { Metadata } from "next";
import { AuthPanel } from "@/components/auth-panel";
export const metadata: Metadata = { title: "Sign in", robots: { index: false, follow: false } };
export default function Page() { return <AuthPanel mode="login" />; }
