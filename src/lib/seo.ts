const site = "https://camsentinel.xsol.ai";
const company = "https://xsolai.com";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "XsolAI",
  url: company,
  founder: { "@type": "Person", name: "Ahsan Inam" },
  brand: { "@type": "Brand", name: "CamSentinel AI" },
};

export const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "CamSentinel AI",
  url: site,
  applicationCategory: "SecurityApplication",
  operatingSystem: "Web",
  description: "AI CCTV monitoring software that turns existing cameras into searchable facility intelligence.",
  offers: { "@type": "Offer", price: "99", priceCurrency: "USD" },
  creator: { "@type": "Organization", name: "XsolAI", url: company },
};
