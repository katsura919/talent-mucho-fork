
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import JsonLd from "../components/JsonLd";
import { Header } from "../components/navbar";
import CTASection from "@/components/CTASection";
import OffersBanner from "@/components/sticky-banner-demo";
import CookieBanner from "@/components/CookieBanner";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.talentmucho.com";

export const metadata: Metadata = {
  verification: {
    google: "H2MZOp8GTipHVn3XKvDrdnHd3gbh1I0LsMskzJ2GHOE",
  },
  metadataBase: new URL(baseUrl),

  // Primary Meta Tags
  title: {
    default: "Remote Staffing Agency | Virtual Assistants | Talent Mucho",
    template: "%s | Talent Mucho",
  },
  description:
    "Boutique remote staffing agency pairing elite Philippines VAs with web design, branding & marketing strategy. Get a free consultation today.",
  keywords: [
    "remote staffing",
    "global talent",
    "distributed teams",
    "talent sourcing",
    "remote hiring",
    "staffing agency",
    "remote team building",
    "virtual assistants",
    "offshore staffing",
    "talent acquisition",
    "hire remote employees",
    "global workforce solutions",
  ],
  authors: [{ name: "Talent Mucho" }],
  creator: "Talent Mucho",
  publisher: "Talent Mucho",

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Icons
  icons: {
    icon: "/favicon.ico",
    apple: "/tm-logo.png",
  },

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Talent Mucho",
    title: "Talent Mucho | Build Your Dream Team. Anywhere in the World.",
    description:
      "A boutique global talent studio helping companies build meaningful, distributed teams through curated remote staffing and talent sourcing.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Talent Mucho - Global Talent Studio",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Talent Mucho | Build Your Dream Team. Anywhere in the World.",
    description:
      "A boutique global talent studio helping companies build meaningful, distributed teams.",
    images: ["/og-image.png"],
    creator: "@talentmucho",
  },

  // Verification (add your verification codes here later)
  // verification: {
  //   google: "your-google-verification-code",
  //   yandex: "your-yandex-verification-code",
  // },

  // Alternate languages (if you add multi-language support)
  alternates: {
    canonical: baseUrl,
  },

  // Category
  category: "Business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta 
          name="google-site-verification" 
          content="awB_HDh_Zlgw-k74MrU5hfXHWCSxowY5l5Ds3yC5Afk" 
        />
        <JsonLd />
      </head>
      <body className={`${cormorant.variable} ${manrope.variable}`}>
        <div className="fixed top-0 inset-x-0 z-50 flex flex-col w-full">
          {/* <OffersBanner /> */}
          <Header />
        </div>
        {children}
        <CTASection />
        <CookieBanner />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
