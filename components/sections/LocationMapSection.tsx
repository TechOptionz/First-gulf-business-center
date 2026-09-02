"use client";

import React from "react";
import { MapPin, Clock, Car, ExternalLink } from "lucide-react";
import DeferredMapEmbed from "@/components/sections/DeferredMapEmbed";
import Button from "@/components/ui/Button";
import FadeUp from "@/components/motion/FadeUp";
import { COMPANY_DETAILS } from "@/data/content";

export default function LocationMapSection() {
  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Location Details */}
          <div className="lg:col-span-5 space-y-6">
            <FadeUp delay={0.1}>
              <div className="inline-flex flex-wrap items-center gap-2 text-sm font-bold uppercase tracking-widest text-maroon-900">
                <span className="w-6 h-[2px] bg-brass-400" />
                <span>Prime Dubai Location</span>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal-950 leading-[1.15]">
                Strategically Situated in Madina Mall, Dubai
              </h2>
            </FadeUp>

            <FadeUp delay={0.3}>
              <p className="text-base sm:text-lg text-charcoal-800 leading-relaxed font-normal">
                Positioned in the vibrant commercial district of Al Muhaisnah 4, our business center offers seamless access from Dubai and Sharjah, combined with extensive mall amenities and direct covered parking.
              </p>
            </FadeUp>

            <div className="space-y-5 pt-4 border-t border-cream-200 text-base text-charcoal-900 font-medium">
              <FadeUp delay={0.4}>
                <div className="flex min-w-0 items-start gap-4">
                  <div className="w-10 h-10 rounded-sm bg-cream-100 flex items-center justify-center text-maroon-800 shrink-0 border border-cream-300">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-serif font-bold text-lg text-charcoal-950">Official Address</h4>
                    <p className="text-sm sm:text-base text-charcoal-800">
                      2nd Floor, Madina Mall, Offices 2–20 & 2–21, Al Muhaisnah 4, Dubai, UAE (PO Box: 234438)
                    </p>
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={0.5}>
                <div className="flex min-w-0 items-start gap-4">
                  <div className="w-10 h-10 rounded-sm bg-cream-100 flex items-center justify-center text-maroon-800 shrink-0 border border-cream-300">
                    <Car className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-serif font-bold text-lg text-charcoal-950">Covered Parking</h4>
                    <p className="text-sm sm:text-base text-charcoal-800">
                      Direct multi-story covered mall parking with rapid elevator access straight to the 2nd floor offices.
                    </p>
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={0.6}>
                <div className="flex min-w-0 items-start gap-4">
                  <div className="w-10 h-10 rounded-sm bg-cream-100 flex items-center justify-center text-maroon-800 shrink-0 border border-cream-300">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-serif font-bold text-lg text-charcoal-950">Operating Hours</h4>
                    <p className="text-sm sm:text-base text-charcoal-800">
                      Reception: Mon–Sat 8:30 AM – 7:30 PM • 24/7 Biometric Keycard Access for Tenants.
                    </p>
                  </div>
                </div>
              </FadeUp>
            </div>

            <FadeUp delay={0.7} className="pt-3 flex flex-wrap items-center gap-3">
              <Button
                href={COMPANY_DETAILS.mapUrl}
                target="_blank"
                variant="primary"
                size="sm"
                icon={<ExternalLink className="w-4 h-4" />}
              >
                Open in Google Maps
              </Button>
              <Button
                href="/contact"
                variant="secondary"
                size="sm"
              >
                Get Directions
              </Button>
            </FadeUp>
          </div>

          {/* Right Column: Embedded Google Map & Visual Card */}
          <div className="lg:col-span-7">
            <FadeUp distance={30}>
              <div className="relative rounded-sm overflow-hidden border-2 border-[#E2DAD0] shadow-card bg-cream-50 h-[420px] sm:h-[480px]">
                <DeferredMapEmbed
                  title="First Gulf Business Center Location Map"
                  src="https://maps.google.com/maps?q=First%20Gulf%20Business%20Center%20L.L.C%2C%20Madina%20Mall%2C%20Dubai&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full grayscale-[20%] contrast-[1.05]"
                />

                {/* Overlay Location Tag */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md p-4 rounded-sm border border-brass-400 shadow-luxury max-w-xs pointer-events-none z-10">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-maroon-800 animate-ping" />
                    <span className="font-serif font-bold text-sm text-charcoal-950">
                      First Gulf Business Center
                    </span>
                  </div>
                  <p className="text-sm font-medium leading-snug text-charcoal-800">
                    2nd Floor, Madina Mall • Al Muhaisnah 4, Dubai
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
