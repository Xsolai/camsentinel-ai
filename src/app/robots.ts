import type { MetadataRoute } from "next";

const site = "https://camsentinel-ai.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/pricing"],
        disallow: ["/app/", "/login", "/signup", "/forgot-password", "/onboarding", "/checkout"],
      },
    ],
    sitemap: `${site}/sitemap.xml`,
    host: site,
  };
}
