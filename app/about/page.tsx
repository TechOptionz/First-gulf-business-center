import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import ImageReveal from "@/components/motion/ImageReveal";
import { CheckCircle2, Shield, Users, Award, MapPin, Building2, Coffee, Sparkles, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import TextReveal from "@/components/motion/TextReveal";
import FadeUp from "@/components/motion/FadeUp";
import AnimatedCounter from "@/components/motion/AnimatedCounter";
import AmenityShowcase from "@/components/sections/AmenityShowcase";
import TenantLoungeHighlight from "@/components/sections/TenantLoungeHighlight";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "About Us | Executive Business Center in Madina Mall, Dubai",
  description:
    "Learn about First Gulf Business Center L.L.C, Dubai's premier provider of luxury serviced offices, coworking space, EJARI virtual offices, and business setup services.",
};

export default function AboutPage() {
  return (
    <div>
      {/* Page Header Hero */}
      <section className="relative min-h-[480px] sm:min-h-[540px] flex items-center bg-charcoal-950 text-white py-16 sm:py-24 lg:py-28 overflow-hidden w-full">
        <div className="absolute inset-0 z-0 w-full h-full">
          <Image
            src="/images/about-hero.webp"
            alt="First Gulf Business Center at Madina Mall Dubai"
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
              items={[{ name: "About Us" }]}
              onDark
              className="mb-6"
            />
          </FadeUp>

          <div className="max-w-3xl">
            <FadeUp delay={0.15} distance={15}>
              <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-brass-400 uppercase block mb-3">
                Established Excellence in Dubai
              </span>
            </FadeUp>

            <TextReveal
              as="h1"
              delay={0.2}
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.15]"
            >
              Empowering Enterprises & Founders Across the UAE
            </TextReveal>

            <FadeUp delay={0.45} distance={20}>
              <p className="text-lg sm:text-xl md:text-2xl text-cream-100 font-normal leading-relaxed mb-8">
                Located on the 2nd Floor of Madina Mall, Al Muhaisnah 4, First Gulf Business Center combines premier commercial real estate with comprehensive corporate advisory to provide seamless business growth.
              </p>
            </FadeUp>

            <FadeUp delay={0.6} distance={20}>
              <div className="flex flex-wrap gap-4">
                <Button href="/book-a-tour" variant="gold" size="md">
                  Schedule a Visit
                </Button>
                <Button href="/contact" variant="dark" size="md">
                  Contact Concierge
                </Button>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Key Stats Bar */}
      <div className="bg-white border-b border-[#E2DAD0] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 border-r border-cream-200 last:border-none">
              <div className="font-serif text-4xl sm:text-5xl font-bold text-maroon-900 mb-1">
                <AnimatedCounter value={500} suffix="+" />
              </div>
              <div className="text-sm sm:text-base text-charcoal-800 font-bold uppercase tracking-wider">
                Companies Established
              </div>
            </div>

            <div className="p-4 border-r border-cream-200 last:border-none">
              <div className="font-serif text-4xl sm:text-5xl font-bold text-maroon-900 mb-1">
                <AnimatedCounter value={100} suffix="%" />
              </div>
              <div className="text-sm sm:text-base text-charcoal-800 font-bold uppercase tracking-wider">
                EJARI & DED Compliance
              </div>
            </div>

            <div className="p-4 border-r border-cream-200 last:border-none">
              <div className="font-serif text-4xl sm:text-5xl font-bold text-maroon-900 mb-1">
                24/7
              </div>
              <div className="text-sm sm:text-base text-charcoal-800 font-bold uppercase tracking-wider">
                Secure Access & Support
              </div>
            </div>

            <div className="p-4">
              <div className="font-serif text-4xl sm:text-5xl font-bold text-maroon-900 mb-1">
                4.9 ★
              </div>
              <div className="text-sm sm:text-base text-charcoal-800 font-bold uppercase tracking-wider">
                Google Review Rating
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Story Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs sm:text-sm font-bold tracking-widest text-maroon-900 uppercase block">
                Our Corporate Vision
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal-950 leading-tight">
                Where Commercial Infrastructure Meets Executive Hospitality
              </h2>
              <p className="text-base sm:text-lg text-charcoal-800 leading-relaxed font-normal">
                First Gulf Business Center was established with a singular objective: to eliminate the operational friction of setting up and expanding a business in Dubai.
              </p>
              <p className="text-base sm:text-lg text-charcoal-800 leading-relaxed font-normal">
                We manage everything—from authentic RERA EJARI lease registrations and Mainland/Freezone commercial permits to fully furnished private office suites equipped with high-speed fiber optics, administrative support, and an exclusive tenant relaxation lounge featuring a tournament pool table.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-cream-200">
                <div className="flex items-start gap-3 text-sm sm:text-base text-charcoal-900 font-semibold">
                  <CheckCircle2 className="w-5 h-5 text-brass-700 shrink-0 mt-0.5" />
                  <span>DED & Freezone Licensing Authority Compliant</span>
                </div>
                <div className="flex items-start gap-3 text-sm sm:text-base text-charcoal-900 font-semibold">
                  <CheckCircle2 className="w-5 h-5 text-brass-700 shrink-0 mt-0.5" />
                  <span>Integrated In-House Legal & PRO Specialists</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-sm overflow-hidden border-2 border-brass-300 shadow-luxury aspect-[4/3] bg-charcoal-900">
                <ImageReveal className="w-full h-full">
                  <Image
                    src="/images/hero-dubai-office.webp"
                    alt="First Gulf Business Center Office Suite Interior"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </ImageReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Showcase */}
      <AmenityShowcase />

      {/* Wellbeing Lounge Highlight */}
      <TenantLoungeHighlight />

      {/* Final CTA Banner */}
      <CTASection />
    </div>
  );
}
