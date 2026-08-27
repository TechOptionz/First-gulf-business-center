"use client";

import React from "react";
import { Star } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import TestimonialCard from "@/components/ui/TestimonialCard";
import { cardGridClass } from "@/components/ui/CardGrid";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import CardTilt from "@/components/motion/CardTilt";
import FadeUp from "@/components/motion/FadeUp";
import { TESTIMONIALS } from "@/data/content";

export default function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Client Endorsements"
          title="Trusted by Dubai's Growing Businesses & Entrepreneurs"
          subtitle="Discover why international founders, local companies, and remote teams choose First Gulf Business Center."
        />

        {/* 5-Star Summary Bar */}
        <FadeUp delay={0.1}>
          <div className="mx-auto mb-12 flex max-w-xl flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-sm border-2 border-brass-300 bg-cream-50 px-4 py-3.5 text-center text-sm font-bold text-charcoal-900 shadow-sm sm:gap-x-6 sm:px-8 sm:text-base">
            <div className="flex items-center gap-1 text-amber-500" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <span className="font-serif text-lg font-bold text-maroon-900">
              4.9 / 5.0 Rating
            </span>
            <span aria-hidden="true" className="hidden text-charcoal-400 sm:inline">
              |
            </span>
            <span className="font-semibold text-charcoal-900">
              Over 100+ Verified 5-Star Google Reviews
            </span>
          </div>
        </FadeUp>

        <StaggerContainer className={cardGridClass("editorial")}>
          {TESTIMONIALS.slice(0, 3).map((item) => (
            <StaggerItem key={item.name}>
              <CardTilt>
                <TestimonialCard
                  review={item.review}
                  name={item.name}
                  role={item.role}
                  rating={item.rating}
                  verified={item.verified}
                />
              </CardTilt>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
