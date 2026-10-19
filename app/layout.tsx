import type { Metadata, Viewport } from "next";
import { DM_Sans, IBM_Plex_Mono, Syne } from "next/font/google";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import SiteMotionField from "@/components/site-motion-field";
import { BagProvider } from "@/components/preview-bag";
import "./globals.css";
import "./premium.css";
import "./kinetic.css";

const syne = Syne({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-syne", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-dm-sans", display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: { default: "KROVINOX | Independent Clothing in Development", template: "%s | KROVINOX" },
  description: "An independent clothing label developing utility-led silhouettes, considered layers, and everyday pieces with intent.",
  icons: { icon: "/icon.svg", shortcut: "/icon.svg" },
  openGraph: { title: "KROVINOX | Independent Clothing", description: "Utility-led silhouettes and considered everyday clothing, in development.", type: "website" },
  robots: { index: false, follow: false },
};
export const viewport: Viewport = { themeColor: "#14251F", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-IN"><body className={`${syne.variable} ${dmSans.variable} ${plexMono.variable}`}>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <SiteMotionField />
    <BagProvider><SiteHeader />{children}<SiteFooter /></BagProvider>
  </body></html>;
}
