import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, IBM_Plex_Mono, Manrope } from "next/font/google";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import SiteMotionField from "@/components/site-motion-field";
import { BagProvider } from "@/components/preview-bag";
import "./globals.css";
import "./premium.css";
import "./kinetic.css";

const bodoni = Bodoni_Moda({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-bodoni-moda", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-manrope", display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: { default: "KROVINOX | Apparel Research & Design", template: "%s | KROVINOX" },
  description: "An editorial apparel design portfolio: source-attributed garment references, material notes, and scroll-driven product studies.",
  icons: { icon: "/icon.svg", shortcut: "/icon.svg" },
  openGraph: { title: "KROVINOX | Apparel Research & Design", description: "Garment references, material notes and product design studies.", type: "website" },
  robots: { index: false, follow: false },
};
export const viewport: Viewport = { themeColor: "#14251F", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-IN"><body className={`${bodoni.variable} ${manrope.variable} ${plexMono.variable}`}>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <SiteMotionField />
    <BagProvider><SiteHeader />{children}<SiteFooter /></BagProvider>
  </body></html>;
}
