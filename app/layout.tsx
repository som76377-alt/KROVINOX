import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Manrope } from "next/font/google";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: { default: "KROVINOX | Independent Clothing in Development", template: "%s | KROVINOX" },
  description: "An independent clothing label developing utility-led silhouettes, considered layers, and everyday pieces with intent.",
  icons: { icon: "/icon.svg", shortcut: "/icon.svg" },
  openGraph: { title: "KROVINOX | Independent Clothing", description: "Utility-led silhouettes and considered everyday clothing, in development.", type: "website" },
  robots: { index: false, follow: false },
};
export const viewport: Viewport = { themeColor: "#f1efe8", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-IN"><body className={`${manrope.variable} ${plexMono.variable}`}><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader />{children}<SiteFooter /></body></html>;
}
