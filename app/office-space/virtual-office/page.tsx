import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, Building2, PhoneCall, MailCheck } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import FeatureCard from "@/components/ui/FeatureCard";
import { cardGridClass } from "@/components/ui/CardGrid";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import TextReveal from "@/components/motion/TextReveal";
import FadeUp from "@/components/motion/FadeUp";
import BookTourForm from "@/components/forms/BookTourForm";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Virtual Office Dubai with EJARI & Estidama | First Gulf Business Center",
  description:
    "Get certified DED & RERA approved Virtual Office EJARI and Estidama contracts in Madina Mall, Dubai. Instant certificate issuance for trade license renewal & visa processing.",
};

const VIRTUAL_OFFICE_BENEFITS = [
  {
    icon: <Building2 className="h-6 w-6" />,
    title: "Prestigious Registered Address",
    description:
      "Display “2nd Floor, Madina Mall, Offices 2–20 & 2–21, Al Muhaisnah 4, Dubai, UAE” across your trade license, corporate website, bank accounts, and invoices.",
  },
  {
    icon: <PhoneCall className="h-6 w-6" />,
    title: "Dedicated Reception & Call Answering",
    description:
      "Professional multilingual receptionists greet your callers in your company name and forward messages or direct calls to your mobile instantly.",
  },
  {
    icon: <MailCheck className="h-6 w-6" />,
    title: "Mail & Courier Management",
    description:
      "Receive business mail, government notices, and bank letters with immediate email/WhatsApp photo notifications and secure physical holding.",
  },
];

export default function VirtualOfficePage() {
  return (
    <div className="bg-cream-100/50">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumbs
            items={[
              { name: "Office Space", href: "/office-space" },
              { name: "Virtual Office (EJARI / Estidama)" },
            ]}
          />
        </div>
      </div>

      {/* Hero */}
      <section className="relative py-16 sm:py-24 bg-charcoal-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/virtual-office.webp"
            alt="Virtual Office and EJARI Services in Dubai"
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
                100% RERA & DED Certified Legal Address
              </Badge>
            </FadeUp>

            <TextReveal
              as="h1"
              delay={0.2}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] mb-6"
            >
              Virtual Office with Authentic EJARI & Estidama
            </TextReveal>

            <FadeUp delay={0.45} distance={20}>
              <p className="text-lg sm:text-xl md:text-2xl text-cream-100 leading-relaxed font-normal mb-8">
                Secure an official corporate business address in Madina Mall, Dubai, backed by valid government registration. Fulfill mandatory Department of Economy & Tourism (DED) licensing criteria without the prohibitive cost of physical leasing.
              </p>
            </FadeUp>

            <FadeUp delay={0.6} distance={20}>
              <div className="flex flex-wrap gap-4">
                <Button href="#apply-ejari" variant="gold" size="md">
                  Apply for EJARI Virtual Office
                </Button>
                <Button href="/contact" variant="dark" size="md">
                  Inquire on Estidama Rules
                </Button>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* EJARI & Estidama Detailed Explanation */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex flex-wrap items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-maroon-800">
                <span className="w-6 h-[1.5px] bg-brass-400" />
                <span>Dubai Regulatory Compliance</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-950 leading-tight">
                Understanding EJARI & Estidama Compliance in Dubai
              </h2>

              <p className="text-base leading-[1.7] text-charcoal-800 sm:text-[1.0625rem]">
                Initiated by the Real Estate Regulatory Agency (RERA) in 2007, <strong>EJARI</strong> (meaning &ldquo;My Rent&rdquo; in Arabic) is the mandatory government system that authenticates all commercial rental contracts across Dubai. Every business entity holding a commercial, professional, or industrial license must provide an attested contract to the DED.
              </p>

              <p className="text-base leading-[1.7] text-charcoal-800 sm:text-[1.0625rem]">
                <strong>Estidama</strong> represents the modern sustainable virtual office model recognized by the Dubai DED. It allows entrepreneurs and international holding companies to obtain legitimate commercial tenancy agreements, sponsor employee visas, and establish local banking credentials without leasing massive square footage.
              </p>

              <div className="space-y-2.5 rounded-sm border border-brass-300 bg-cream-100 p-4 text-[0.9375rem] leading-[1.55] text-charcoal-800 sm:p-5 sm:text-base">
                <div className="font-bold text-maroon-800 font-serif text-base">
                  What You Receive with First Gulf:
                </div>
                <div className="flex min-w-0 items-start gap-2">
                  <CheckCircle2 aria-hidden="true" className="mt-[3px] h-4 w-4 shrink-0 text-green-700" />
                  <span>Official RERA attested EJARI certificate document</span>
                </div>
                <div className="flex min-w-0 items-start gap-2">
                  <CheckCircle2 aria-hidden="true" className="mt-[3px] h-4 w-4 shrink-0 text-green-700" />
                  <span>DED approved sustainable Estidama tenancy contract</span>
                </div>
                <div className="flex min-w-0 items-start gap-2">
                  <CheckCircle2 aria-hidden="true" className="mt-[3px] h-4 w-4 shrink-0 text-green-700" />
                  <span>Building inspection clearance and municipal approvals</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className={cardGridClass("stack")}>
                {VIRTUAL_OFFICE_BENEFITS.map((benefit) => (
                  <FeatureCard
                    key={benefit.title}
                    layout="horizontal"
                    size="compact"
                    brassAccent
                    icon={benefit.icon}
                    title={benefit.title}
                    description={benefit.description}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application / Booking Form */}
      <section id="apply-ejari" className="py-20 bg-cream-100/70 border-t border-cream-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Instant Application"
            title="Apply for EJARI / Virtual Office Contract"
            subtitle="Submit your business details for rapid documentation processing and DED certification."
          />
          <BookTourForm defaultWorkspace="virtual-office" />
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </div>
  );
}
