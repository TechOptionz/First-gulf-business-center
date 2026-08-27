import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Shield, Briefcase, Award, Layers, Globe2, Building } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import TextReveal from "@/components/motion/TextReveal";
import FadeUp from "@/components/motion/FadeUp";
import ContactForm from "@/components/forms/ContactForm";
import CTASection from "@/components/sections/CTASection";
import { CONSULTANCY_SERVICES } from "@/data/content";

export const metadata: Metadata = {
  title: "Business Consultancy Dubai | Company Setup, PRO & Corporate Solutions",
  description:
    "End-to-end UAE business setup, PRO services, corporate office administration, and trademark registration with First Gulf Business Center in Dubai.",
};

export default function BusinessConsultancyPage() {
  return (
    <div className="bg-cream-100/50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumbs items={[{ name: "Business Consultancy" }]} />
        </div>
      </div>

      {/* Hero */}
      <section className="relative py-16 sm:py-24 bg-charcoal-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/consultancy/consultancy-overview-hero.webp"
            alt="Business Consultancy Services in Dubai"
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
                Complete Corporate Advisory & PRO Retainers
              </Badge>
            </FadeUp>

            <TextReveal
              as="h1"
              delay={0.2}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] mb-6"
            >
              Comprehensive Corporate Consultancy in Dubai
            </TextReveal>

            <FadeUp delay={0.45} distance={20}>
              <p className="text-lg sm:text-xl md:text-2xl text-cream-100 leading-relaxed font-normal mb-8">
                From Mainland commercial licensing and Free Zone formation to Ministry PRO clearances, ongoing corporate management, and Trademark IP registration—First Gulf provides seamless advisory to protect and accelerate your UAE enterprise.
              </p>
            </FadeUp>

            <FadeUp delay={0.6} distance={20}>
              <div className="flex flex-wrap gap-4">
                <Button href="#consultancy-inquiry" variant="gold" size="md">
                  Request a Consultation
                </Button>
                <Button href="/contact" variant="dark" size="md">
                  Talk to a Senior Advisor
                </Button>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Consultancy Services Detailed Breakdown */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Advisory Verticals"
            title="Strategic Business Solutions Tailored to the UAE"
            subtitle="Designed to relieve business owners from complex regulatory formalities so you can focus entirely on commercial growth."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CONSULTANCY_SERVICES.map((service) => (
              <Card
                key={service.id}
                brassAccent
                className="flex flex-col justify-between h-full bg-white border-[#E8E2D8] hover:border-brass-400 p-8"
              >
                <div>
                  <div className="relative h-48 w-full rounded-sm overflow-hidden mb-6 border border-cream-300">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  <span className="text-xs font-bold text-maroon-800 uppercase tracking-widest block mb-1">
                    Advisory Practice
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-charcoal-950 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs text-brass-700 font-semibold uppercase tracking-wider mb-4">
                    {service.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>

                  <div className="space-y-2 mb-8 border-t border-cream-200 pt-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-400 block mb-1">
                      Key Capabilities:
                    </span>
                    {service.offerings.slice(0, 5).map((offering, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-charcoal-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-maroon-800 shrink-0 mt-0.5" />
                        <span>{offering}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  href={service.href}
                  variant="primary"
                  size="sm"
                  fullWidth
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Explore {service.title}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section id="consultancy-inquiry" className="py-20 bg-cream-100/70 border-t border-cream-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Direct Advisory"
            title="Book a Confidential Consultation"
            subtitle="Speak with a licensed corporate consultant regarding your business formation or trade license requirements in Dubai."
          />
          <ContactForm />
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </div>
  );
}
