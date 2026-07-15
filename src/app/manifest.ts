import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest { return { name: "CamSentinel AI", short_name: "CamSentinel", description: "AI CCTV monitoring software by XsolAI", start_url: "/", display: "standalone", background_color: "#f7f5ef", theme_color: "#10233f" }; }
