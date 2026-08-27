import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, Shield, FileCheck, Users, Globe2, Building2, Award, ArrowRight } from "lucide-react";
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
  title: "Business Setup & PRO Services Dubai | First Gulf Business Center",
  description:
    "End-to-end business setup in Dubai Mainland, Freezone, and Offshore with First Gulf Business Center. Complete trade license, investor visa, and PRO ministerial services.",
};

export default function BusinessSetupProPage() {
  return (
    <div className="bg-cream-100/50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumbs
            items={[
              { name: "Business Consultancy", href: "/business-consultancy" },
              { name: "Business Setup & PRO Services" },
            ]}
          />
        </div>
      </div>

      {/* Hero */}
      <section className="relative py-16 sm:py-24 bg-charcoal-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/consultancy/business-setup-pro-hero.webp"
            alt="Business Setup and PRO Services in Dubai"
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
                Mainland • Free Zone • Offshore • PRO Clearances
              </Badge>
            </FadeUp>

            <TextReveal
              as="h1"
              delay={0.2}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] mb-6"
            >
              Business Setup & PRO Services in Dubai
            </TextReveal>

            <FadeUp delay={0.45} distance={20}>
              <p className="text-lg sm:text-xl md:text-2xl text-cream-100 leading-relaxed font-normal mb-8">
                Taking your venture into the UAE is one of the most profitable strategic moves in global commerce. First Gulf Business Center handles the nuances of Dubai company formation and ministerial PRO clearances without delays or hassles.
              </p>
            </FadeUp>

            <FadeUp delay={0.6} distance={20}>
              <div className="flex flex-wrap gap-4">
                <Button href="#pro-consultation" variant="gold" size="md">
                  Start Company Formation
                </Button>
                <Button href="/contact" variant="dark" size="md">
                  Speak with a PRO Expert
                </Button>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Jurisdictions Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Company Formation Jurisdictions"
            title="Tailored Solutions Across All UAE Business Structures"
            subtitle="Our expert analysts assess your commercial activities and determine the most cost-effective and legally sound jurisdiction."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card brassAccent className="p-8 bg-white border-[#E8E2D8]">
              <div className="w-12 h-12 rounded-sm bg-maroon-50 border border-maroon-200 flex items-center justify-center text-maroon-800 mb-6">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-charcoal-950 mb-2">
                Dubai Mainland Setup
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed mb-4">
                Trade directly within the local UAE market and execute lucrative government contracts. We secure fast DED approvals and commercial registration.
              </p>
              <ul className="text-xs text-charcoal-700 space-y-1.5 border-t border-cream-200 pt-3">
                <li>• Commercial, Professional & Industrial licenses</li>
                <li>• No limit on employee visa allocation quotas</li>
                <li>• Freedom to operate anywhere across the UAE</li>
              </ul>
            </Card>

            <Card brassAccent className="p-8 bg-white border-[#E8E2D8]">
              <div className="w-12 h-12 rounded-sm bg-maroon-50 border border-maroon-200 flex items-center justify-center text-maroon-800 mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-charcoal-950 mb-2">
                Dubai Freezone Setup
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed mb-4">
                Enjoy 100% foreign company ownership, 0% personal tax, and full profit repatriation in premier free zones with minimal regulatory paperwork.
              </p>
              <ul className="text-xs text-charcoal-700 space-y-1.5 border-t border-cream-200 pt-3">
                <li>• 100% foreign equity & capital repatriation</li>
                <li>• Zero customs duties on import/export goods</li>
                <li>• Combined with our furnished serviced offices</li>
              </ul>
            </Card>

            <Card brassAccent className="p-8 bg-white border-[#E8E2D8]">
              <div className="w-12 h-12 rounded-sm bg-maroon-50 border border-maroon-200 flex items-center justify-center text-maroon-800 mb-6">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-charcoal-950 mb-2">
                Offshore Incorporation
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed mb-4">
                Ideal for international asset holding, intellectual property protection, and tax-efficient global trading entities with multi-currency bank accounts.
              </p>
              <ul className="text-xs text-charcoal-700 space-y-1.5 border-t border-cream-200 pt-3">
                <li>• Confidential international ownership structure</li>
                <li>• Corporate asset & estate protection</li>
                <li>• Multi-currency corporate banking assistance</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Complete PRO Services Breakdown */}
      <section className="py-20 bg-cream-100/70 border-t border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Government Liaison Services"
            title="Complete In-House PRO Service Package"
            subtitle="Time is your most precious asset. Our dedicated PRO specialists liaise directly with UAE ministries to eliminate delays and bureaucracy."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "Trade License Renewal & Amendments",
                desc: "Timely license renewal, trade name modifications, adding commercial activities, and partner share adjustments.",
              },
              {
                title: "Investor & Employee Visa Processing",
                desc: "Complete handling of entry permits, VIP medical fitness tests, Emirates ID biometrics, and residence visa stamping.",
              },
              {
                title: "Legal Document Translation",
                desc: "Certified Ministry of Justice Arabic-English legal document translations for MOA, POA, and official resolutions.",
              },
              {
                title: "Government Ministry Clearances",
                desc: "Fast approvals from MoHRE, GDRFA, Dubai Municipality, Civil Defense, and industry-specific regulating authorities.",
              },
              {
                title: "Immigration & Establishment Cards",
                desc: "Application, renewal, and updates for company Immigration Establishment Cards and Ministry of Labour files.",
              },
              {
                title: "Legal Document Attestation & Insurance",
                desc: "MOFA attestation, embassy notarization, and processing of mandatory corporate health insurance plans.",
              },
            ].map((pro, idx) => (
              <Card key={idx} className="p-6 bg-white border-[#E8E2D8] hover:border-brass-400">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-maroon-800 shrink-0" />
                  <h4 className="font-serif font-bold text-sm sm:text-base text-charcoal-950">
                    {pro.title}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed pl-7">
                  {pro.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Section */}
      <section id="pro-consultation" className="py-20 bg-white border-t border-cream-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Get Started"
            title="Consult with a Business Setup Specialist"
            subtitle="Let our team evaluate your business requirements and furnish a transparent breakdown of government fees and timelines."
          />
          <ContactForm />
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </div>
  );
}
