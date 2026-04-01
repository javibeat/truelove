import type { Metadata } from "next";
import { Playfair_Display, IM_Fell_English, Special_Elite } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--playfair",
  display: "swap",
});

const fell = IM_Fell_English({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--fell",
  display: "swap",
});

const elite = Special_Elite({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--elite",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://truelovecreative.es"),
  title: "True Love Creative — Web & Graphic Design Studio · Dubai",
  description: "True Love Creative is a premium web, graphic and app design studio based in Dubai. High-end digital experiences since 2015.",
  keywords: ["web design", "graphic design", "app development", "brand identity", "Dubai", "creative studio", "True Love Creative"],
  authors: [{ name: "True Love Creative" }],
  creator: "True Love Creative",
  openGraph: {
    title: "True Love Creative — Design Studio · Dubai",
    description: "High-end digital experiences. Web, graphic & app design. Est. 2015 · Dubai.",
    url: "https://truelovecreative.es",
    siteName: "True Love Creative",
    locale: "en_US",
    type: "website",
    images: [{ url: "/img/meta/og-image.jpg", width: 1200, height: 630, alt: "True Love Creative" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "True Love Creative — Design Studio · Dubai",
    description: "High-end digital experiences. Web, graphic & app design. Est. 2015 · Dubai.",
    images: ["/img/meta/og-image.jpg"],
  },
  alternates: {
    canonical: "https://truelovecreative.es",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "True Love Creative",
  url: "https://truelovecreative.es",
  logo: "https://truelovecreative.es/img/brand/favicon.png",
  image: "https://truelovecreative.es/img/meta/og-image.jpg",
  description: "Premium web, graphic and app design studio based in Dubai. High-end digital experiences since 2015.",
  foundingDate: "2015",
  email: "info@truelovecreative.es",
  telephone: "+971585324519",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  knowsLanguage: ["Spanish", "English", "Arabic"],
  serviceType: ["Web Design", "Graphic Design", "App Development", "Brand Identity", "Creative Direction"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${fell.variable} ${elite.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
