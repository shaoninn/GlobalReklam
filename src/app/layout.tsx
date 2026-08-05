import type { Metadata, Viewport } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { getSiteUrl, localBusinessJsonLd, siteNavigationJsonLd, webSiteJsonLd } from "@/lib/seo";
import { Analytics } from "@/components/Analytics";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
};

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
  adjustFontFallback: true,
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
  adjustFontFallback: true,
  preload: true,
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Global Reklam | Antalya Tabela ve Reklam Üreticisi",
    template: "%s | Global Reklam",
  },
  description:
    "Antalya Çakırlar'da profesyonel tabela ve reklam üretimi. Kutu harf, neon LED, CNC kesim, araç kaplama. Ücretsiz keşif ve teklif.",
  keywords: [
    "antalya tabela",
    "çakırlar tabela",
    "ışıklı tabela antalya",
    "kutu harf antalya",
    "neon led tabela",
    "global reklam",
    "cnc kesim antalya",
  ],
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", sizes: "any" },
      { url: "/icon.png?v=2", type: "image/png", sizes: "192x192" },
      { url: "/favicon-32.png?v=2", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png?v=2", sizes: "180x180" }],
    shortcut: "/favicon.ico?v=2",
  },
  openGraph: {
    title: "Global Reklam | Antalya Tabela ve Reklam Üreticisi",
    description: "Markanızı görünür kılan profesyonel tabela çözümleri.",
    locale: "tr_TR",
    type: "website",
    url: siteUrl,
    siteName: "Global Reklam",
    images: [
      {
        url: "/images/logo/logo.png",
        width: 763,
        height: 117,
        alt: "Global Reklam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Global Reklam | Antalya Tabela",
    description: "Markanızı görünür kılan profesyonel tabela çözümleri.",
    images: ["/images/logo/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = [localBusinessJsonLd(), webSiteJsonLd(), siteNavigationJsonLd()];

  return (
    <html lang="tr" className={`${outfit.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased font-sans">
        {jsonLd.map((data, index) => (
          <script
            key={`ld-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
          />
        ))}
        {children}
        <Analytics />
      </body>
    </html>
  );
}
