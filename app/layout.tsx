import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Manrope } from "next/font/google";
import { CartProvider } from "@/components/cart/cart-provider";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { getCatalogueMode, getCatalogueProducts } from "@/lib/products/catalogue";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    default: "KROVINOX — Design Preview",
    template: "%s | KROVINOX",
  },
  description: "A private design preview of the KROVINOX clothing project. Concept fixtures only; no products are for sale.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export const viewport: Viewport = {
  themeColor: "#F4F2ED",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const catalogueMode = getCatalogueMode();
  const catalogueProducts = getCatalogueProducts();

  return (
    <html lang="en-IN">
      <body className={manrope.variable + " " + plexMono.variable}>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <CartProvider mode={catalogueMode} products={catalogueProducts}>
          <SiteHeader />
          {children}
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
