import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, Award, Shield, FileCheck, Search, Scale, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import TextReveal from "@/components/motion/TextReveal";
import FadeUp from "@/components/motion/FadeUp";
import ContactForm from "@/components/forms/ContactForm";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Trademark Registration in UAE & Dubai | First Gulf Business Center",
  description:
    "Protect your brand name, logo, and intellectual property in the UAE with First Gulf Business Center. Official Ministry of Economy trademark search and filing.",
};

export default function TrademarkRegistrationPage() {
  return (
    <div className="bg-cream-100/50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumbs
            items={[
              { name: "Business Consultancy", href: "/business-consultancy" },
              { name: "Trademark Registration" },
            ]}
          />
        </div>
      </div>

      {/* Hero */}
      <section className="relative py-16 sm:py-24 bg-charcoal-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/consultancy/trademark-registration-hero.webp"
            alt="Trademark Registration Services in Dubai"
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
                Ministry of Economy Certified IP Protection
              </Badge>
            </FadeUp>

            <TextReveal
              as="h1"
              delay={0.2}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] mb-6"
            >
              Trademark Registration in Dubai & UAE
            </TextReveal>

            <FadeUp delay={0.45} distance={20}>
              <p className="text-lg sm:text-xl md:text-2xl text-cream-100 leading-relaxed font-normal mb-8">
                A trademark is what distinguishes your brand from competitors. Protect your brand identity, product names, and intellectual assets from counterfeit exploitation with professional filing through First Gulf Business Center.
              </p>
            </FadeUp>

            <FadeUp delay={0.6} distance={20}>
              <div className="flex flex-wrap gap-4">
                <Button href="#register-trademark" variant="gold" size="md">
                  Register Your Trademark
                </Button>
                <Button href="/contact" variant="dark" size="md">
                  Request Free Brand Search
                </Button>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Strategic Value Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-maroon-800 uppercase">
                <span className="w-6 h-[1.5px] bg-brass-400" />
                <span>Intellectual Property Protection</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-950 leading-tight">
                Why Seek Our Trademark Registration Services?
              </h2>

              <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed">
                To ensure you obtain official approval from the UAE Ministry of Economy, submitting accurate classification documentation is a prerequisite. Any clerical error or prior conflict in the application will delay approval or lead to outright rejection.
              </p>

              <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed">
                With First Gulf Business Center, you can be assured of registering your trademark without delays or bureaucratic friction. We clarify all government official fees and legal costs upfront, guide you through every classification class, and monitor the official gazette for oppositions.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  "Comprehensive pre-filing conflict search across the UAE Ministry database",
                  "Precise Nice Classification mapping for your commercial products & services",
                  "Management of official trademark journal announcements and publication",
                  "10-year validity protection with proactive renewal monitoring",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-charcoal-800">
                    <CheckCircle2 className="w-4 h-4 text-maroon-800 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card brassAccent className="p-6 bg-cream-50/60 border-brass-300">
                  <Search className="w-8 h-8 text-maroon-800 mb-3" />
                  <h4 className="font-serif font-bold text-base text-charcoal-950 mb-1">
                    1. Brand Pre-Check
                  </h4>
                  <p className="text-xs text-charcoal-600">
                    Comprehensive conflict check to guarantee uniqueness before incurring ministry fees.
                  </p>
                </Card>

                <Card brassAccent className="p-6 bg-cream-50/60 border-brass-300">
                  <FileCheck className="w-8 h-8 text-maroon-800 mb-3" />
                  <h4 className="font-serif font-bold text-base text-charcoal-950 mb-1">
                    2. MoE Filing
                  </h4>
                  <p className="text-xs text-charcoal-600">
                    Preparation and submission of official documentation to the Ministry of Economy IP Directorate.
                  </p>
                </Card>

                <Card brassAccent className="p-6 bg-cream-50/60 border-brass-300">
                  <Scale className="w-8 h-8 text-maroon-800 mb-3" />
                  <h4 className="font-serif font-bold text-base text-charcoal-950 mb-1">
                    3. Gazette Publication
                  </h4>
                  <p className="text-xs text-charcoal-600">
                    Official publication in the UAE Trademark Bulletin and mandatory local Arabic newspapers.
                  </p>
                </Card>

                <Card brassAccent className="p-6 bg-cream-50/60 border-brass-300">
                  <Award className="w-8 h-8 text-maroon-800 mb-3" />
                  <h4 className="font-serif font-bold text-base text-charcoal-950 mb-1">
                    4. Certified Issuance
                  </h4>
                  <p className="text-xs text-charcoal-600">
                    Final acquisition and delivery of your 10-year official Trademark Registration Certificate.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trademark Inquiry Section */}
      <section id="register-trademark" className="py-20 bg-cream-100/70 border-t border-cream-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Protect Your Brand"
            title="Start Your UAE Trademark Filing"
            subtitle="Submit your proposed brand name or logo below for an initial feasibility check."
          />
          <ContactForm />
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </div>
  );
}
