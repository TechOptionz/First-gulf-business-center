import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import Card, { CardTitle, CardText, CardFooter } from "@/components/ui/Card";
import { cardGridClass } from "@/components/ui/CardGrid";
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

const DESK_PLANS = [
  {
    badge: "Maximum Flexibility",
    title: "Flexi Hot Desk",
    terms: "Hourly, Daily & 10-Day Passes Available",
    description:
      "Drop in anytime and grab any open workstation in our bright, ergonomic coworking area. Perfect for remote workers, consultants, and business travelers.",
    features: [
      "High-speed enterprise fiber Wi-Fi access",
      "Full central air conditioning and power outlets",
      "Unlimited artisan bean-to-cup coffee & tea",
      "Free access to tenant pool table & bean bag lounge",
    ],
    cta: "Inquire for Hot Desk",
    featured: false,
  },
  {
    badge: "Most Popular",
    title: "Dedicated Permanent Desk",
    terms: "Monthly & Quarterly Retained Terms",
    description:
      "Your own reserved desk that remains exclusively yours 24/7. Includes lockable storage pedestal, mail handling, and professional business address privileges.",
    features: [
      "Dedicated permanent desk with lockable storage",
      "24/7 Electronic keycard security access",
      "Front desk mail & package collection",
      "Monthly complimentary meeting room hours",
      "Free access to pool table & tenant relaxation lounge",
    ],
    cta: "Reserve Dedicated Desk",
    featured: true,
  },
];

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
            src="/images/coworking-desk.webp"
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

          <div className={cardGridClass("pair", "mx-auto max-w-4xl")}>
            {DESK_PLANS.map((plan) => (
              <Card
                key={plan.title}
                brassAccent
                className={plan.featured ? "border-brass-400 bg-cream-50/80 shadow-luxury" : undefined}
              >
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="mb-4 flex flex-wrap gap-2">
                    <Badge variant={plan.featured ? "brass" : "maroon"}>{plan.badge}</Badge>
                  </div>

                  <CardTitle>{plan.title}</CardTitle>

                  <p
                    className={`mt-2 text-sm font-semibold uppercase leading-snug tracking-[0.08em] ${
                      plan.featured ? "text-maroon-800" : "text-brass-800"
                    }`}
                  >
                    {plan.terms}
                  </p>

                  <CardText className="mt-3">{plan.description}</CardText>

                  <ul className="mt-5 space-y-2.5 border-t border-cream-200 pt-5">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex min-w-0 items-start gap-2.5 text-[0.9375rem] leading-[1.55] text-charcoal-800 sm:text-base"
                      >
                        <CheckCircle2
                          aria-hidden="true"
                          className="mt-[3px] h-4 w-4 shrink-0 text-maroon-800"
                        />
                        <span className="min-w-0">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <CardFooter>
                  <Button
                    href="#book-desk"
                    variant={plan.featured ? "primary" : "outline"}
                    size="md"
                    fullWidth
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
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
