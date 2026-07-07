import type { Metadata } from "next";
import Script from "next/script";
import { Archivo } from "next/font/google";
import ScrollFx from "./components/ScrollFx";
import SmoothScroll from "./components/SmoothScroll";
import "./globals.css";

const sans = Archivo({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["wdth"],
  variable: "--sans",
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
    images: [{ url: "/img/meta/og-image-heart.png", width: 600, height: 600, alt: "True Love Creative" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "True Love Creative — Design Studio · Dubai",
    description: "High-end digital experiences. Web, graphic & app design. Est. 2015 · Dubai.",
    images: ["/img/meta/og-image-heart.png"],
  },
  alternates: {
    canonical: "https://truelovecreative.es",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "LbyS8xzEGumgwNpp4KhHHcvIM8kX2uyQ3__hqyvMjbs",
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
  sameAs: ["https://www.instagram.com/truelove.creative"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.variable} data-scroll-behavior="smooth">
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-34EPY62YXR"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('consent', 'default', {
              analytics_storage: 'granted',
              ad_storage: 'denied',
            });
            gtag('config', 'G-34EPY62YXR');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ScrollFx />
        <SmoothScroll />
        {children}
        <div className="page-frame" aria-hidden="true" />
      </body>
    </html>
  );
}
