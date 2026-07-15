import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap { return [{ url: "https://camsentinel.ai", lastModified: new Date("2026-07-15"), changeFrequency: "monthly", priority: 1 }, { url: "https://camsentinel.ai/pricing", lastModified: new Date("2026-07-15"), changeFrequency: "monthly", priority: .8 }]; }
