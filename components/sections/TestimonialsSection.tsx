"use client";

import React from "react";
import { Star, CheckCircle, Quote } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
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
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-12 py-3.5 px-4 sm:px-8 bg-cream-50 border-2 border-brass-300 rounded-sm max-w-xl mx-auto text-sm sm:text-base text-charcoal-900 shadow-xs font-bold">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <span className="font-bold font-serif text-maroon-900 text-lg">
              4.9 / 5.0 Rating
            </span>
            <span className="text-charcoal-400">|</span>
            <span className="font-semibold text-charcoal-900">
              Over 100+ Verified 5-Star Google Reviews
            </span>
          </div>
        </FadeUp>

        {/* 3-Column Testimonials Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.slice(0, 3).map((item, idx) => (
            <StaggerItem key={idx}>
              <CardTilt>
                <Card
                  className="flex flex-col justify-between h-full bg-white border-[#E2DAD0] hover:border-brass-400 p-8 relative group transition-all duration-300 hover:shadow-luxury"
                >
                  <Quote className="w-9 h-9 text-brass-300/50 absolute top-6 right-6 pointer-events-none group-hover:text-brass-400/80 transition-colors" />

                  <div>
                    <div className="flex items-center gap-1 text-amber-500 mb-5">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4.5 h-4.5 fill-current" />
                      ))}
                    </div>

                    <p className="text-base sm:text-lg text-charcoal-900 leading-relaxed italic mb-6 font-normal">
                      &ldquo;{item.review}&rdquo;
                    </p>
                  </div>

                  <div className="pt-4 border-t border-cream-200 flex items-center justify-between">
                    <div>
                      <h4 className="font-serif font-bold text-lg text-charcoal-950 group-hover:text-maroon-800 transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-charcoal-700 font-medium">{item.role}</p>
                    </div>
                    {item.verified && (
                      <span className="inline-flex items-center gap-1 text-xs text-green-800 font-bold bg-green-50 px-2.5 py-1 rounded-xs border border-green-300">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Verified
                      </span>
                    )}
                  </div>
                </Card>
              </CardTilt>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
