import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Sparkles, Calendar, Phone, CheckCircle, ShieldCheck, MapPin } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
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
              <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-brass-400 uppercase block mb-3">
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
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-charcoal-950 text-white p-8 rounded-sm border-2 border-brass-400/50 shadow-luxury">
                <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-brass-300 mb-4">
                  <Sparkles className="w-4 h-4 text-brass-400" />
                  <span>VIP Tour Experience</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-white mb-4">
                  What to Expect During Your Visit
                </h3>
                <p className="text-cream-200 text-sm leading-relaxed mb-6">
                  Our senior workspace concierge will guide you through our 2nd-floor facilities, answer EJARI & Estidama questions, and customize a package tailored to your budget.
                </p>

                <ul className="space-y-3.5 text-sm text-cream-100 border-t border-charcoal-800 pt-6">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brass-400/20 text-brass-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      ✓
                    </div>
                    <span>Walkthrough of private cabins, hot desks & meeting rooms</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brass-400/20 text-brass-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      ✓
                    </div>
                    <span>Direct consultation on DED EJARI virtual office contracts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brass-400/20 text-brass-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      ✓
                    </div>
                    <span>Complimentary trial day-pass in our coworking zone</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brass-400/20 text-brass-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      ✓
                    </div>
                    <span>Barista coffee & access to our pool & lounge breakout zone</span>
                  </li>
                </ul>
              </div>

              {/* Immediate Phone Card */}
              <Card brassAccent className="bg-white border-[#E2DAD0] p-6">
                <h4 className="font-serif text-lg font-bold text-charcoal-950 mb-2">
                  Need an Immediate Tour Today?
                </h4>
                <p className="text-xs sm:text-sm text-charcoal-700 mb-4">
                  Call our concierge directly for same-day walk-in availability at Madina Mall.
                </p>
                <a
                  href={`tel:${COMPANY_DETAILS.phonePrimaryTel}`}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold uppercase tracking-wider bg-maroon-900 text-white rounded-sm hover:bg-maroon-950 transition-colors"
                >
                  <Phone className="w-4 h-4 text-brass-300" />
                  <span>Call {COMPANY_DETAILS.phonePrimary}</span>
                </a>
              </Card>
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
