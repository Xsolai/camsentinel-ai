export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "XsolAI",
  url: "https://xsol.ai",
  founder: { "@type": "Person", name: "Ahsan Inam" },
  brand: { "@type": "Brand", name: "CamSentinel AI" },
};

export const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "CamSentinel AI",
  applicationCategory: "SecurityApplication",
  operatingSystem: "Web",
  description: "AI CCTV monitoring software that turns existing cameras into searchable facility intelligence.",
  offers: { "@type": "Offer", price: "99", priceCurrency: "USD" },
  creator: { "@type": "Organization", name: "XsolAI" },
};
