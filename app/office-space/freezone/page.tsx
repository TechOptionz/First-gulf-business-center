import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Percent, Globe, Key } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import FeatureCard from "@/components/ui/FeatureCard";
import { cardGridClass } from "@/components/ui/CardGrid";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import TextReveal from "@/components/motion/TextReveal";
import FadeUp from "@/components/motion/FadeUp";
import BookTourForm from "@/components/forms/BookTourForm";
import TenantLoungeHighlight from "@/components/sections/TenantLoungeHighlight";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Office Spaces for Freezone in Dubai | First Gulf Business Center",
  description:
    "Furnished executive serviced offices for Freezone entities in Dubai. 100% foreign ownership, tax benefits, no trade barriers, and state-of-the-art tech infrastructure.",
};

const FREEZONE_BENEFITS = [
  {
    icon: <Percent className="h-6 w-6" />,
    title: "100% Company Ownership",
    description:
      "Full foreign commercial equity ownership with complete capital and profit repatriation rights, giving your enterprise full sovereign control.",
  },
  {
    icon: <Key className="h-6 w-6" />,
    title: "Turnkey Serviced Suites",
    description:
      "Move in the same day with pre-installed ergonomic Italian furniture, dedicated telephony, high-speed fiber internet, and individual AC controls.",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Zero Trade Barriers",
    description:
      "Seamless regional and global cross-border trading without currency restrictions, supported by our experienced corporate advisory team.",
  },
];

export default function FreezoneOfficePage() {
  return (
    <div className="bg-cream-100/50">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumbs
            items={[
              { name: "Office Space", href: "/office-space" },
              { name: "Office Spaces for Freezone" },
            ]}
          />
        </div>
      </div>

      {/* Hero */}
      <section className="relative py-16 sm:py-24 bg-charcoal-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/freezone-office.webp"
            alt="Serviced Freezone Office Spaces in Dubai"
            fill
            priority
            className="object-cover object-center opacity-95"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/75 via-charcoal-950/35 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <FadeUp delay={0.1} distance={15}>
              <Badge variant="dark" dot className="mb-6">
                100% Foreign Ownership • Move-In Ready
              </Badge>
            </FadeUp>

            <TextReveal
              as="h1"
              delay={0.2}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] mb-6"
            >
              Executive Serviced Offices for Freezone Companies
            </TextReveal>

            <FadeUp delay={0.45} distance={20}>
              <p className="text-lg sm:text-xl md:text-2xl text-cream-100 leading-relaxed font-normal mb-8">
                Take advantage of Dubai Freezone incentives with fully furnished, turnkey executive office suites in Madina Mall. Benefit from 100% company ownership, zero trade barriers, and world-class enterprise technology.
              </p>
            </FadeUp>

            <FadeUp delay={0.6} distance={20}>
              <div className="flex flex-wrap gap-4">
                <Button href="#book-freezone" variant="gold" size="md">
                  Inquire for Freezone Suites
                </Button>
                <Button href="/book-a-tour" variant="dark" size="md">
                  Tour Executive Cabins
                </Button>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Core Freezone Benefits Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Key Strategic Advantages"
            title="Why Establish Your Freezone Entity at First Gulf"
            subtitle="Combine the tax and operational advantages of UAE Freezones with the prestige and comfort of a centrally situated executive business center."
          />

          <div className={cardGridClass("pillar")}>
            {FREEZONE_BENEFITS.map((benefit) => (
              <FeatureCard
                key={benefit.title}
                brassAccent
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Signature Lounge Highlight */}
      <TenantLoungeHighlight />

      {/* Booking Form Section */}
      <section id="book-freezone" className="py-20 bg-cream-100/70 border-t border-cream-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Executive Booking"
            title="Reserve Your Freezone Serviced Suite"
            subtitle="Our leasing consultants will configure an office size suited to your team and visa requirements."
          />
          <BookTourForm defaultWorkspace="freezone-office" />
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </div>
  );
}
