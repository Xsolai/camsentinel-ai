import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MockStoreProvider } from "@/components/mock-store";

const site = "https://camsentinel.xsol.ai";
const company = "https://xsolai.com";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: {
    default: "CamSentinel AI | AI CCTV Monitoring Software",
    template: "%s | CamSentinel AI",
  },
  description:
    "Turn existing security cameras into searchable, real-time operational intelligence with CamSentinel AI, an AI CCTV monitoring platform by XsolAI.",
  applicationName: "CamSentinel AI",
  authors: [{ name: "Ahsan Inam", url: company }],
  creator: "Ahsan Inam",
  publisher: "XsolAI",
  keywords: [
    "AI CCTV monitoring software",
    "AI video analytics",
    "security camera analytics",
    "warehouse safety monitoring",
    "computer vision security",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site,
    siteName: "CamSentinel AI",
    title: "CamSentinel AI — AI CCTV Monitoring Software",
    description: "Transform existing cameras into a live facility intelligence layer.",
    images: [
      {
        url: "/images/facility-intelligence-map.png",
        width: 1536,
        height: 1024,
        alt: "CamSentinel AI facility intelligence dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CamSentinel AI — AI CCTV Monitoring Software",
    description: "Real-time operational intelligence from the cameras you already own.",
    images: ["/images/facility-intelligence-map.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>
        <MockStoreProvider>{children}</MockStoreProvider>
      </body>
    </html>
  );
}
