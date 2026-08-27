import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingContact from "@/components/layout/FloatingContact";
import ScrollProgress from "@/components/motion/ScrollProgress";
import PageTransition from "@/components/motion/PageTransition";
import { COMPANY_DETAILS } from "@/data/content";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "First Gulf Business Center | Premier Executive Workspaces & Setup in Dubai",
    template: "%s | First Gulf Business Center Dubai",
  },
  description:
    "First Gulf Business Center provides luxury serviced offices, flexible coworking desks, certified EJARI & Estidama virtual offices, and business setup services in Madina Mall, Dubai.",
  keywords: [
    "Business Center Dubai",
    "Serviced Offices Dubai",
    "Coworking Space Dubai",
    "Virtual Office EJARI Dubai",
    "Estidama Virtual Office Contract",
    "Freezone Office Space Dubai",
    "Business Setup Dubai",
    "PRO Services Dubai",
    "Madina Mall Office Space",
    "First Gulf Business Center",
  ],
  authors: [{ name: "First Gulf Business Center L.L.C" }],
  creator: "First Gulf Business Center L.L.C",
  metadataBase: new URL("https://firstgulfbusiness.ae"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: "https://firstgulfbusiness.ae",
    title: "First Gulf Business Center | Premier Executive Workspaces in Dubai",
    description:
      "Luxury serviced offices, coworking workstations, EJARI certified virtual offices, and company setup in Madina Mall, Dubai. 24/7 access and wellbeing lounge.",
    siteName: "First Gulf Business Center",
    images: [
      {
        url: "/images/hero-dubai-office.webp",
        width: 1200,
        height: 630,
        alt: "First Gulf Business Center Dubai",
      },
    ],
  },
  icons: {
    icon: "/logo-icon.svg",
    apple: "/logo-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: COMPANY_DETAILS.legalName,
    alternateName: "First Gulf Business Center",
    image: "https://firstgulfbusiness.ae/images/hero-dubai-office.webp",
    logo: "https://firstgulfbusiness.ae/logo.png",
    "@id": "https://firstgulfbusiness.ae/#organization",
    url: "https://firstgulfbusiness.ae",
    telephone: COMPANY_DETAILS.phonePrimary,
    email: COMPANY_DETAILS.email,
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "2nd Floor, Madina Mall, Offices 2–20, Al Muhaisnah 4",
      addressLocality: "Dubai",
      postalCode: COMPANY_DETAILS.poBox,
      addressCountry: "AE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: COMPANY_DETAILS.mapCoordinates.lat,
      longitude: COMPANY_DETAILS.mapCoordinates.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    sameAs: [
      COMPANY_DETAILS.socials.facebook,
      COMPANY_DETAILS.socials.instagram,
      COMPANY_DETAILS.socials.linkedin,
      COMPANY_DETAILS.socials.tiktok,
    ],
  };

  return (
    <html lang="en" className={`${playfair.variable} ${plusJakarta.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Entrance animations render with an inline `opacity: 0` that only
            the motion runtime clears. Without JS every animated card would
            stay invisible, so force the final state instead. */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html:
                "[style*='opacity:0']{opacity:1!important;transform:none!important}",
            }}
          />
        </noscript>
      </head>
      <body className="min-h-screen flex flex-col bg-cream-100 text-charcoal-900 selection:bg-maroon-800 selection:text-white">
        <ScrollProgress />
        <Navbar />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
