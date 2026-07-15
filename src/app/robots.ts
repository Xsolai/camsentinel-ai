import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots { return { rules: [{ userAgent: "*", allow: ["/", "/pricing"], disallow: ["/app/", "/login", "/signup", "/forgot-password", "/onboarding", "/checkout"] }], sitemap: "https://camsentinel.ai/sitemap.xml" }; }
