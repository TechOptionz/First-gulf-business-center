import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, MessageSquare, ExternalLink, ShieldCheck } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import TextReveal from "@/components/motion/TextReveal";
import FadeUp from "@/components/motion/FadeUp";
import ContactForm from "@/components/forms/ContactForm";
import LocationMapSection from "@/components/sections/LocationMapSection";
import { COMPANY_DETAILS } from "@/data/content";

export const metadata: Metadata = {
  title: "Contact Us | First Gulf Business Center Madina Mall Dubai",
  description:
    "Get in touch with First Gulf Business Center. 2nd Floor, Madina Mall, Offices 2–20, Dubai, UAE. Call +971 52 790 0335 or send an online message.",
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
              <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-brass-400 uppercase block mb-3">
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
            <div className="lg:col-span-5 space-y-6">
              <Card brassAccent className="bg-white border-[#E2DAD0] p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-sm bg-maroon-50 border border-maroon-200 flex items-center justify-center text-maroon-800 shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-charcoal-950 mb-1">
                      Direct Phone Lines
                    </h3>
                    <p className="text-sm text-charcoal-700 mb-3 font-medium">
                      Call our concierge for immediate leasing availability.
                    </p>
                    <div className="space-y-1.5">
                      <a
                        href={`tel:${COMPANY_DETAILS.phonePrimaryTel}`}
                        className="block text-base sm:text-lg font-bold text-maroon-900 hover:underline"
                      >
                        📞 {COMPANY_DETAILS.phonePrimary}
                      </a>
                      <a
                        href={`tel:${COMPANY_DETAILS.phoneSecondaryTel}`}
                        className="block text-sm sm:text-base font-semibold text-charcoal-800 hover:text-maroon-800"
                      >
                        ☎️ {COMPANY_DETAILS.phoneSecondary}
                      </a>
                    </div>
                  </div>
                </div>
              </Card>

              <Card brassAccent className="bg-white border-[#E2DAD0] p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-sm bg-maroon-50 border border-maroon-200 flex items-center justify-center text-maroon-800 shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-charcoal-950 mb-1">
                      Email Inquiries
                    </h3>
                    <p className="text-sm text-charcoal-700 mb-3 font-medium">
                      Send proposals, RFP documents, or setup inquiries.
                    </p>
                    <a
                      href={`mailto:${COMPANY_DETAILS.email}`}
                      className="text-sm sm:text-base font-bold text-maroon-900 hover:underline break-all"
                    >
                      ✉️ {COMPANY_DETAILS.email}
                    </a>
                  </div>
                </div>
              </Card>

              <Card brassAccent className="bg-white border-[#E2DAD0] p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-sm bg-maroon-50 border border-maroon-200 flex items-center justify-center text-maroon-800 shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-charcoal-950 mb-1">
                      Headquarters Address
                    </h3>
                    <p className="text-sm sm:text-base text-charcoal-800 leading-relaxed mb-2 font-medium">
                      2nd Floor, Madina Mall, Offices 2–20, Al Muhaisnah 4, Dubai, United Arab Emirates
                    </p>
                    <p className="text-sm text-charcoal-700 font-semibold">
                      P.O. Box: {COMPANY_DETAILS.poBox}
                    </p>
                  </div>
                </div>
              </Card>

              <div className="p-5 bg-maroon-900 text-white rounded-sm border border-brass-400/50 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold font-serif text-brass-300">
                    Instant WhatsApp Support
                  </div>
                  <div className="text-xs sm:text-sm text-cream-200 font-medium">
                    Chat with senior workspace management
                  </div>
                </div>
                <Button
                  href={COMPANY_DETAILS.socials.whatsapp}
                  target="_blank"
                  variant="gold"
                  size="sm"
                >
                  WhatsApp Now
                </Button>
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
