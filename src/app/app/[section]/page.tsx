import { notFound } from "next/navigation";
import { WorkspaceView } from "@/components/workspace-view";

const sections = ["overview", "incidents", "analytics", "sites", "settings"] as const;
type Section = (typeof sections)[number];
export function generateStaticParams() { return sections.map((section) => ({ section })); }
export default async function Page({ params }: { params: Promise<{ section: string }> }) { const { section } = await params; if (!sections.includes(section as Section)) notFound(); return <WorkspaceView section={section as Section} />; }
