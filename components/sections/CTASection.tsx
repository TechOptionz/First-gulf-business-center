"use client";

import React from "react";
import { Phone, Calendar, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import FadeUp from "@/components/motion/FadeUp";
import MagneticButton from "@/components/motion/MagneticButton";
import { COMPANY_DETAILS } from "@/data/content";

export default function CTASection() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-r from-maroon-950 via-maroon-800 to-maroon-950 text-white relative overflow-hidden">
      {/* Subtle Gold Geometric Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <FadeUp delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-brass-400/20 border border-brass-400/40 text-brass-300 text-xs sm:text-sm font-bold uppercase tracking-widest mb-6">
              ✨ Elevate Your Business Today
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
              Ready to Secure Your Executive Workspace in Madina Mall, Dubai?
            </h2>
          </FadeUp>

          <FadeUp delay={0.3}>
            <p className="text-lg sm:text-xl md:text-2xl text-cream-100 leading-relaxed mb-8 max-w-2xl mx-auto font-normal">
              Book a personalized walkthrough today. Inspect our furnished private suites, coworking stations, and wellbeing lounge with zero obligation.
            </p>
          </FadeUp>

          <FadeUp delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <MagneticButton>
                <Button
                  href="/book-a-tour"
                  variant="gold"
                  size="lg"
                  icon={<Calendar className="w-5 h-5" />}
                >
                  Schedule a Guided Walkthrough
                </Button>
              </MagneticButton>

              <MagneticButton>
                <a
                  href={`tel:${COMPANY_DETAILS.phonePrimaryTel}`}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base sm:text-lg font-bold tracking-wider uppercase rounded-sm border-2 border-cream-100 text-white hover:bg-white/10 hover:border-white hover:shadow-[0_10px_28px_-8px_rgba(255,255,255,0.3)] transition-[background-color,border-color,box-shadow,transform] duration-300 cursor-pointer min-h-[54px]"
                >
                  <Phone className="w-5 h-5 text-brass-300" />
                  <span>Call +971 52 790 0335</span>
                </a>
              </MagneticButton>
            </div>
          </FadeUp>

          <FadeUp delay={0.5}>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm sm:text-base text-cream-100 font-bold pt-6 border-t border-maroon-700/60">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-brass-400" /> Instant EJARI Certification
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-brass-400" /> Fully Furnished & Move-in Ready
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-brass-400" /> Complimentary Lounge & Pool Table Access
              </span>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
