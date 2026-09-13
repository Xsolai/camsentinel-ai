import type { MetadataRoute } from "next";

const site = "https://camsentinel-ai.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${site}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];
}
