"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Coffee, Sparkles, Users, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import FadeUp from "@/components/motion/FadeUp";
import ParallaxImage from "@/components/motion/ParallaxImage";
import MagneticButton from "@/components/motion/MagneticButton";

export default function TenantLoungeHighlight() {
  return (
    <section className="py-20 lg:py-28 bg-charcoal-950 text-white relative overflow-hidden">
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-maroon-800/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image */}
          <div className="lg:col-span-7 relative">
            <FadeUp distance={30}>
              <div className="relative rounded-sm overflow-hidden border-2 border-brass-400/50 shadow-2xl">
                <ParallaxImage offset={20}>
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src="/images/tenant-lounge-pool.jpg"
                      alt="Exclusive Tenant Wellbeing Lounge with Pool Table at First Gulf Business Center Dubai"
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 55vw"
                    />
                  </div>
                </ParallaxImage>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 bg-charcoal-950/90 backdrop-blur-md p-4 sm:p-5 rounded-sm border border-brass-400/40 text-sm sm:text-base text-cream-100 z-10">
                  <p className="font-serif italic font-semibold text-brass-300">
                    &ldquo;A balanced workplace where executive focus meets genuine wellbeing and camaraderie.&rdquo;
                  </p>
                </div>
              </div>

              {/* Floating Differentiator Badge */}
              <div className="absolute -top-4 -right-4 bg-maroon-900 border-2 border-brass-400 text-white px-5 py-3 rounded-sm shadow-xl hidden sm:flex items-center gap-2.5 z-20">
                <Sparkles className="w-5 h-5 text-brass-300 animate-pulse" />
                <div className="text-left">
                  <div className="text-xs uppercase tracking-widest text-brass-300 font-bold">Signature Feature</div>
                  <div className="text-sm font-bold font-serif">Tournament Pool Table</div>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Right Column: Narrative Copy */}
          <div className="lg:col-span-5 space-y-6">
            <FadeUp delay={0.1}>
              <Badge variant="dark" dot>
                Tenant Wellbeing & Leisure
              </Badge>
            </FadeUp>

            <FadeUp delay={0.2}>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15]">
                Work Hard. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brass-300 to-brass-400">
                  Unwind in Style.
                </span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.3}>
              <p className="text-base sm:text-lg text-cream-100 leading-relaxed font-normal">
                Unlike sterile corporate centers, First Gulf Business Center believes peak productivity requires intentional recovery. We provide a dedicated relaxation sanctuary exclusively for our tenants and their teams.
              </p>
            </FadeUp>

            {/* Feature List */}
            <div className="space-y-4 pt-3 border-t border-charcoal-800">
              <FadeUp delay={0.4}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm bg-maroon-900 border border-brass-500/40 flex items-center justify-center text-brass-300 shrink-0 mt-0.5">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-lg text-white">Full-Size Tournament Pool Table</h4>
                    <p className="text-sm sm:text-base text-cream-200">Challenge colleagues or break the ice with new clients over a friendly game of 8-ball.</p>
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={0.5}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm bg-maroon-900 border border-brass-500/40 flex items-center justify-center text-brass-300 shrink-0 mt-0.5">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-lg text-white">Plush Bean Bags & Designer Sofas</h4>
                    <p className="text-sm sm:text-base text-cream-200">Comfortable breakout zones for casual ideation, phone calls, or afternoon reading.</p>
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={0.6}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm bg-maroon-900 border border-brass-500/40 flex items-center justify-center text-brass-300 shrink-0 mt-0.5">
                    <Coffee className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-lg text-white">Unlimited Artisan Coffee & Refreshments</h4>
                    <p className="text-sm sm:text-base text-cream-200">Bean-to-cup espresso machines, premium herbal teas, and filtered water included with all memberships.</p>
                  </div>
                </div>
              </FadeUp>
            </div>

            <FadeUp delay={0.7} className="pt-4 flex items-center gap-4">
              <MagneticButton>
                <Button
                  href="/book-a-tour"
                  variant="gold"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Experience the Lounge
                </Button>
              </MagneticButton>
              <span className="text-sm text-cream-200 font-medium italic">
                Free 100% access for all tenants
              </span>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
