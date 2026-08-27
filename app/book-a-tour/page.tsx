import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Sparkles, Phone, CheckCircle, ShieldCheck, MapPin } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Card, { CardTitle, CardText } from "@/components/ui/Card";
import FeatureCard from "@/components/ui/FeatureCard";
import { cardGridClass } from "@/components/ui/CardGrid";
import TextReveal from "@/components/motion/TextReveal";
import FadeUp from "@/components/motion/FadeUp";
import BookTourForm from "@/components/forms/BookTourForm";
import TenantLoungeHighlight from "@/components/sections/TenantLoungeHighlight";
import { COMPANY_DETAILS } from "@/data/content";

export const metadata: Metadata = {
  title: "Book an Executive Tour | First Gulf Business Center Dubai",
  description:
    "Schedule a private walkthrough of First Gulf Business Center in Madina Mall, Dubai. Inspect luxury serviced offices, coworking desks, and meeting rooms.",
};

const TOUR_INCLUSIONS = [
  "Walkthrough of private cabins, hot desks & meeting rooms",
  "Direct consultation on DED EJARI virtual office contracts",
  "Complimentary trial day-pass in our coworking zone",
  "Barista coffee & access to our pool & lounge breakout zone",
];

export default function BookTourPage() {
  return (
    <div className="bg-cream-100/50">
      {/* Full Width Photo Hero Section */}
      <section className="relative min-h-[480px] sm:min-h-[540px] flex items-center bg-charcoal-950 text-white py-16 sm:py-24 lg:py-28 overflow-hidden w-full">
        <div className="absolute inset-0 z-0 w-full h-full">
          <Image
            src="/images/book-tour-hero.webp"
            alt="Private Executive Office Suite Walkthrough at First Gulf Business Center Dubai"
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
              items={[{ name: "Book a Tour" }]}
              onDark
              className="mb-6"
            />
          </FadeUp>

          <div className="max-w-3xl">
            <FadeUp delay={0.15} distance={15}>
              <span className="mb-3 block text-sm font-bold uppercase tracking-[0.2em] text-brass-400">
                Private Guided Walkthrough
              </span>
            </FadeUp>

            <TextReveal
              as="h1"
              delay={0.2}
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.15]"
            >
              Experience First Gulf Business Center in Person
            </TextReveal>

            <FadeUp delay={0.45} distance={20}>
              <p className="text-lg sm:text-xl md:text-2xl text-cream-100 font-normal leading-relaxed mb-8">
                Tour our private executive serviced suites, test our ergonomic coworking desks, enjoy complimentary artisan espresso, and experience our signature tenant wellbeing lounge.
              </p>
            </FadeUp>

            <FadeUp delay={0.6} distance={20}>
              <div className="flex flex-wrap items-center gap-6 text-sm text-cream-100 font-semibold border-t border-charcoal-800/80 pt-6">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-brass-400" />
                  <span>Zero High-Pressure Sales</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-brass-400" />
                  <span>Free Day-Pass Included</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-brass-400" />
                  <span>Madina Mall 2nd Floor</span>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Booking Form Grid */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: What Your Tour Includes */}
            <div className="lg:col-span-5">
              <div className={cardGridClass("stack")}>
                <Card dark brassAccent hoverEffect={false} className="border-brass-400/50 bg-charcoal-950 shadow-luxury">
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="mb-4 inline-flex flex-wrap items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-brass-300">
                      <Sparkles aria-hidden="true" className="h-4 w-4 shrink-0 text-brass-400" />
                      <span>VIP Tour Experience</span>
                    </div>

                    <CardTitle dark>What to Expect During Your Visit</CardTitle>

                    <CardText dark className="mt-3">
                      Our senior workspace concierge will guide you through our 2nd-floor facilities, answer EJARI &amp; Estidama questions, and customize a package tailored to your budget.
                    </CardText>

                    <ul className="mt-5 space-y-3 border-t border-charcoal-800 pt-5">
                      {TOUR_INCLUSIONS.map((item) => (
                        <li
                          key={item}
                          className="flex min-w-0 items-start gap-3 text-[0.9375rem] leading-[1.55] text-cream-100 sm:text-base"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brass-400/20 text-sm font-bold text-brass-400"
                          >
                            ✓
                          </span>
                          <span className="min-w-0">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>

                {/* Immediate Phone Card */}
                <FeatureCard
                  brassAccent
                  size="compact"
                  title="Need an Immediate Tour Today?"
                  description="Call our concierge directly for same-day walk-in availability at Madina Mall."
                  footer={
                    <a
                      href={`tel:${COMPANY_DETAILS.phonePrimaryTel}`}
                      className="inline-flex min-h-[44px] min-w-0 items-center justify-center gap-2 rounded-sm bg-maroon-900 px-5 py-3 text-[0.9375rem] font-bold uppercase leading-snug tracking-wider text-white transition-colors hover:bg-maroon-950"
                    >
                      <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-brass-300" />
                      <span className="min-w-0">Call {COMPANY_DETAILS.phonePrimary}</span>
                    </a>
                  }
                />
              </div>
            </div>

            {/* Right Column: Interactive Tour Booking Form */}
            <div className="lg:col-span-7">
              <BookTourForm />
            </div>
          </div>
        </div>
      </section>

      {/* Tenant Lounge Highlight Section */}
      <TenantLoungeHighlight />
    </div>
  );
}
