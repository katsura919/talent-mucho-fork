import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Host_Grotesk, Instrument_Serif } from "next/font/google";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const hostGrotesk = Host_Grotesk({
  variable: "--font-host-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Admin",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${manrope.variable} ${hostGrotesk.variable} ${instrumentSerif.variable} font-sans`}>
      <style>{`
        body > .fixed.top-0,
        body > section { display: none !important; }
      `}</style>
      {children}
    </div>
  );
}
