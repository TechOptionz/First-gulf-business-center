import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, Clock, Users, Coffee, Wifi, Sparkles, Calendar, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import TextReveal from "@/components/motion/TextReveal";
import FadeUp from "@/components/motion/FadeUp";
import BookTourForm from "@/components/forms/BookTourForm";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Coworking Space Dubai | Flexible Hot Desks & Dedicated Workstations",
  description:
    "Cost-effective, amenity-rich coworking spaces in Madina Mall, Dubai. Hourly, daily, and monthly terms with high-speed fiber internet and free tenant pool lounge access.",
};

export default function CoworkingPage() {
  return (
    <div className="bg-cream-100/50">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumbs
            items={[
              { name: "Office Space", href: "/office-space" },
              { name: "Coworking Space" },
            ]}
          />
        </div>
      </div>

      {/* Hero */}
      <section className="relative py-16 sm:py-24 bg-charcoal-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/coworking-desk.jpg"
            alt="Coworking Space at First Gulf Business Center Dubai"
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
                Hourly • Daily • Monthly Flexible Terms
              </Badge>
            </FadeUp>

            <TextReveal
              as="h1"
              delay={0.2}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] mb-6"
            >
              Flexible Coworking Spaces in Dubai
            </TextReveal>

            <FadeUp delay={0.45} distance={20}>
              <p className="text-lg sm:text-xl md:text-2xl text-cream-100 leading-relaxed font-normal mb-8">
                Cost control is a priority in today&apos;s competitive business landscape. First Gulf Business Center provides cutting-edge, amenity-laden, and customizable coworking spaces designed to accommodate entrepreneurs, freelancers, and agile teams.
              </p>
            </FadeUp>

            <FadeUp delay={0.6} distance={20}>
              <div className="flex flex-wrap gap-4">
                <Button href="#book-desk" variant="gold" size="md">
                  Reserve a Coworking Desk
                </Button>
                <Button href="/book-a-tour" variant="dark" size="md">
                  Take a Free Day Tour
                </Button>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Plan Options: Hot Desk vs Dedicated Desk */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Membership Plans"
            title="Choose Your Way of Working"
            subtitle="Whether you drop in for a few hours of deep focus or require a permanent dedicated desk with storage."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Hot Desk Card */}
            <Card brassAccent className="bg-white border-[#E8E2D8] p-8 flex flex-col justify-between">
              <div>
                <Badge variant="maroon" className="mb-4">
                  Maximum Flexibility
                </Badge>
                <h3 className="font-serif text-2xl font-bold text-charcoal-950 mb-2">
                  Flexi Hot Desk
                </h3>
                <p className="text-xs text-brass-700 font-semibold uppercase tracking-wider mb-4">
                  Hourly, Daily & 10-Day Passes Available
                </p>
                <p className="text-sm text-charcoal-600 mb-6 leading-relaxed">
                  Drop in anytime and grab any open workstation in our bright, ergonomic coworking area. Perfect for remote workers, consultants, and business travelers.
                </p>

                <div className="space-y-2.5 mb-8 border-t border-cream-200 pt-5 text-xs sm:text-sm text-charcoal-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-maroon-800 shrink-0" />
                    <span>High-speed enterprise fiber Wi-Fi access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-maroon-800 shrink-0" />
                    <span>Full central air conditioning and power outlets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-maroon-800 shrink-0" />
                    <span>Unlimited artisan bean-to-cup coffee & tea</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-maroon-800 shrink-0" />
                    <span>Free access to tenant pool table & bean bag lounge</span>
                  </div>
                </div>
              </div>

              <Button href="#book-desk" variant="outline" size="md" fullWidth>
                Inquire for Hot Desk
              </Button>
            </Card>

            {/* Dedicated Desk Card */}
            <Card brassAccent className="bg-cream-50/80 border-brass-400 p-8 flex flex-col justify-between shadow-luxury">
              <div>
                <Badge variant="brass" className="mb-4">
                  Most Popular
                </Badge>
                <h3 className="font-serif text-2xl font-bold text-charcoal-950 mb-2">
                  Dedicated Permanent Desk
                </h3>
                <p className="text-xs text-maroon-800 font-semibold uppercase tracking-wider mb-4">
                  Monthly & Quarterly Retained Terms
                </p>
                <p className="text-sm text-charcoal-600 mb-6 leading-relaxed">
                  Your own reserved desk that remains exclusively yours 24/7. Includes lockable storage pedestal, mail handling, and professional business address privileges.
                </p>

                <div className="space-y-2.5 mb-8 border-t border-cream-200 pt-5 text-xs sm:text-sm text-charcoal-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-maroon-800 shrink-0" />
                    <span>Dedicated permanent desk with lockable storage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-maroon-800 shrink-0" />
                    <span>24/7 Electronic keycard security access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-maroon-800 shrink-0" />
                    <span>Front desk mail & package collection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-maroon-800 shrink-0" />
                    <span>Monthly complimentary meeting room hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-maroon-800 shrink-0" />
                    <span>Free access to pool table & tenant relaxation lounge</span>
                  </div>
                </div>
              </div>

              <Button href="#book-desk" variant="primary" size="md" fullWidth>
                Reserve Dedicated Desk
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="book-desk" className="py-20 bg-cream-100/70 border-t border-cream-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Instant Reservation"
            title="Book Your Coworking Desk"
            subtitle="Fill in your details below and our team will prepare your workstation immediately upon arrival."
          />
          <BookTourForm defaultWorkspace="coworking" />
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </div>
  );
}
