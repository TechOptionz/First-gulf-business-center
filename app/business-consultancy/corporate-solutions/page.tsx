import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Layers, Cpu, PhoneCall, ShieldCheck } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import FeatureCard from "@/components/ui/FeatureCard";
import { cardGridClass } from "@/components/ui/CardGrid";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import TextReveal from "@/components/motion/TextReveal";
import FadeUp from "@/components/motion/FadeUp";
import ContactForm from "@/components/forms/ContactForm";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Corporate Solutions & 24/7 IT Support Dubai | First Gulf Business Center",
  description:
    "Customizable corporate management solutions, 24/7 IT infrastructure support, and administrative services in Dubai for foreign firms and local enterprises.",
};

const CORPORATE_SOLUTIONS = [
  {
    icon: <Layers className="h-6 w-6" />,
    title: "Custom Office Management",
    description:
      "Full-scope facility management, dedicated workspaces, ergonomic interior adjustments, and supplies coordination.",
  },
  {
    icon: <Cpu className="h-6 w-6" />,
    title: "Comprehensive 24/7 IT Support",
    description:
      "On-site and remote IT troubleshooting, enterprise network security, cloud backup configuration, and dedicated server rack management.",
  },
  {
    icon: <PhoneCall className="h-6 w-6" />,
    title: "Administrative Concierge",
    description:
      "Multilingual telephone answering, visitor greeting, executive boardroom scheduling, and courier dispatch management.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Governance & Compliance",
    description:
      "Ongoing trade license maintenance, annual audit coordination, ESR & UBO compliance filings, and corporate legal guidance.",
  },
];

export default function CorporateSolutionsPage() {
  return (
    <div className="bg-cream-100/50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumbs
            items={[
              { name: "Business Consultancy", href: "/business-consultancy" },
              { name: "Corporate Solutions" },
            ]}
          />
        </div>
      </div>

      {/* Hero */}
      <section className="relative py-16 sm:py-24 bg-charcoal-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/consultancy/corporate-solutions-hero.webp"
            alt="Corporate Solutions at First Gulf Business Center Dubai"
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
                24/7 IT Support • Facility & Office Administration
              </Badge>
            </FadeUp>

            <TextReveal
              as="h1"
              delay={0.2}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] mb-6"
            >
              Tailored Corporate Solutions in Dubai
            </TextReveal>

            <FadeUp delay={0.45} distance={20}>
              <p className="text-lg sm:text-xl md:text-2xl text-cream-100 leading-relaxed font-normal mb-8">
                Despite the abundance of business service agencies in the UAE, discerning enterprises choose First Gulf Business Center for reliable management, 24/7 enterprise IT infrastructure, and personalized administration packages.
              </p>
            </FadeUp>

            <FadeUp delay={0.6} distance={20}>
              <div className="flex flex-wrap gap-4">
                <Button href="#inquire-corporate" variant="gold" size="md">
                  Request Corporate Package
                </Button>
                <Button href="/contact" variant="dark" size="md">
                  Consult an Advisor
                </Button>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Core Offerings */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What We Deliver"
            title="Comprehensive Corporate Solutions"
            subtitle="Customizable service packages that keep your Dubai operations smooth, secure, and fully compliant around the clock."
          />

          <div className={cardGridClass("compact")}>
            {CORPORATE_SOLUTIONS.map((solution) => (
              <FeatureCard
                key={solution.title}
                brassAccent
                size="compact"
                icon={solution.icon}
                title={solution.title}
                description={solution.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquire-corporate" className="py-20 bg-cream-100/70 border-t border-cream-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Custom Package"
            title="Design Your Corporate Management Retainer"
            subtitle="Let our operations specialists craft an administration package calibrated to your enterprise headcount and IT demands."
          />
          <ContactForm />
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </div>
  );
}
