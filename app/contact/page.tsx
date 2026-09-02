import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Phone, Mail, MapPin, Navigation } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import FeatureCard from "@/components/ui/FeatureCard";
import { cardGridClass } from "@/components/ui/CardGrid";
import Button from "@/components/ui/Button";
import MapLink from "@/components/ui/MapLink";
import TextReveal from "@/components/motion/TextReveal";
import FadeUp from "@/components/motion/FadeUp";
import ContactForm from "@/components/forms/ContactForm";
import LocationMapSection from "@/components/sections/LocationMapSection";
import { COMPANY_DETAILS } from "@/data/content";

export const metadata: Metadata = {
  title: "Contact Us | First Gulf Business Center Madina Mall Dubai",
  description:
    "Get in touch with First Gulf Business Center. 2nd Floor, Madina Mall, Offices 2–20 & 2–21, Dubai, UAE. Call +971 52 790 0335 or send an online message.",
};

export default function ContactPage() {
  return (
    <div className="bg-cream-100/50">
      {/* Full Width Photo Hero Section */}
      <section className="relative min-h-[480px] sm:min-h-[540px] flex items-center bg-charcoal-950 text-white py-16 sm:py-24 lg:py-28 overflow-hidden w-full">
        <div className="absolute inset-0 z-0 w-full h-full">
          <Image
            src="/images/contact-us-hero-v4.webp"
            alt="Executive Concierge & Business Advisory Consultation at First Gulf Business Center Dubai"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-95 w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/85 via-charcoal-950/50 to-charcoal-950/30 w-full h-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp delay={0.1} distance={15}>
            <Breadcrumbs
              items={[{ name: "Contact Us" }]}
              onDark
              className="mb-6"
            />
          </FadeUp>

          <div className="max-w-3xl">
            <FadeUp delay={0.15} distance={15}>
              <span className="mb-3 block text-sm font-bold uppercase tracking-[0.2em] text-brass-400">
                Executive Concierge Desk
              </span>
            </FadeUp>

            <TextReveal
              as="h1"
              delay={0.2}
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.15]"
            >
              Connect with First Gulf Business Center
            </TextReveal>

            <FadeUp delay={0.45} distance={20}>
              <p className="text-lg sm:text-xl md:text-2xl text-cream-100 font-normal leading-relaxed mb-8">
                Our dedicated corporate team is available 24/7 to assist with workspace tours, EJARI contracts, Estidama registrations, and UAE company formation.
              </p>
            </FadeUp>

            <FadeUp delay={0.6} distance={20}>
              <div className="flex flex-wrap gap-4">
                <a
                  href={`tel:${COMPANY_DETAILS.phonePrimaryTel}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-base font-bold uppercase tracking-wider bg-brass-400 text-charcoal-950 rounded-sm hover:bg-brass-300 transition-colors shadow-luxury"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call +971 52 790 0335</span>
                </a>
                <Button href="/book-a-tour" variant="dark" size="md">
                  Schedule a Visit
                </Button>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Main Grid: Contact Cards & Form */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Direct Info Cards */}
            <div className="lg:col-span-5">
              <div className={cardGridClass("stack")}>
                <FeatureCard
                  layout="horizontal"
                  size="compact"
                  brassAccent
                  icon={<Phone className="h-6 w-6" />}
                  title="Direct Phone Lines"
                  description="Call our concierge for immediate leasing availability."
                >
                  <div className="flex flex-col">
                    <a
                      href={`tel:${COMPANY_DETAILS.phonePrimaryTel}`}
                      className="inline-flex min-h-[44px] w-full min-w-0 items-center break-words text-base font-bold text-maroon-900 hover:underline sm:text-lg"
                    >
                      📞 {COMPANY_DETAILS.phonePrimary}
                    </a>
                    <a
                      href={`tel:${COMPANY_DETAILS.phoneSecondaryTel}`}
                      className="inline-flex min-h-[44px] w-full min-w-0 items-center break-words text-[0.9375rem] font-semibold text-charcoal-800 hover:text-maroon-800 sm:text-base"
                    >
                      ☎️ {COMPANY_DETAILS.phoneSecondary}
                    </a>
                  </div>
                </FeatureCard>

                <FeatureCard
                  layout="horizontal"
                  size="compact"
                  brassAccent
                  icon={<Mail className="h-6 w-6" />}
                  title="Email Inquiries"
                  description="Send proposals, RFP documents, or setup inquiries."
                >
                  {/* `overflow-wrap: anywhere` is used here only because an
                      email address has no natural break opportunity at 320px. */}
                  <a
                    href={`mailto:${COMPANY_DETAILS.email}`}
                    className="inline-flex min-h-[44px] w-full min-w-0 items-center text-[0.9375rem] font-bold text-maroon-900 [overflow-wrap:anywhere] hover:underline sm:text-base"
                  >
                    ✉️ {COMPANY_DETAILS.email}
                  </a>
                </FeatureCard>

                <FeatureCard
                  layout="horizontal"
                  size="compact"
                  brassAccent
                  icon={<MapPin className="h-6 w-6" />}
                  title="Headquarters Address"
                  description="2nd Floor, Madina Mall, Offices 2–20 & 2–21, Al Muhaisnah 4, Dubai, United Arab Emirates"
                >
                  <p className="text-sm font-semibold text-charcoal-700">
                    P.O. Box: {COMPANY_DETAILS.poBox}
                  </p>
                  <MapLink className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-maroon-900 underline decoration-brass-400 underline-offset-2 hover:text-maroon-950">
                    <Navigation className="h-4 w-4 text-brass-600" />
                    Get directions on Google Maps
                  </MapLink>
                </FeatureCard>

                <div className="flex flex-col items-start gap-4 rounded-sm border border-brass-400/50 bg-maroon-900 p-5 text-white sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="font-serif text-base font-bold text-brass-300">
                      Instant WhatsApp Support
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-cream-200">
                      Chat with senior workspace management
                    </p>
                  </div>
                  <Button
                    href={COMPANY_DETAILS.socials.whatsapp}
                    target="_blank"
                    variant="gold"
                    size="sm"
                    className="w-full sm:w-auto sm:shrink-0"
                  >
                    WhatsApp Now
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Location Map Section */}
      <LocationMapSection />
    </div>
  );
}
