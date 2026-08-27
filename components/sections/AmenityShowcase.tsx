"use client";

import React from "react";
import {
  Wind,
  Users,
  Coffee,
  ShieldCheck,
  Zap,
  Car,
  Wifi,
  Sparkles,
  Presentation,
  Sparkle,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import { FACILITIES } from "@/data/content";

const iconMap: Record<string, React.ReactNode> = {
  Wind: <Wind className="w-6 h-6 text-maroon-800" />,
  Users: <Users className="w-6 h-6 text-maroon-800" />,
  Coffee: <Coffee className="w-6 h-6 text-maroon-800" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-maroon-800" />,
  Zap: <Zap className="w-6 h-6 text-maroon-800" />,
  Car: <Car className="w-6 h-6 text-maroon-800" />,
  Wifi: <Wifi className="w-6 h-6 text-maroon-800" />,
  Sparkles: <Sparkles className="w-6 h-6 text-brass-700" />,
  Presentation: <Presentation className="w-6 h-6 text-maroon-800" />,
  Sparkle: <Sparkle className="w-6 h-6 text-maroon-800" />,
};

export default function AmenityShowcase() {
  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Comprehensive Facilities"
          title="Designed for Executive Comfort & Zero Distraction"
          subtitle="Every essential business amenity is curated to ensure seamless daily operations for you and your team."
        />

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {FACILITIES.map((amenity) => (
            <StaggerItem key={amenity.id}>
              <Card
                brassAccent={amenity.highlight}
                className={`flex items-start gap-4.5 p-6 transition-all duration-300 ${
                  amenity.highlight
                    ? "border-brass-400 bg-cream-50/90 shadow-luxury hover:border-maroon-800"
                    : "border-[#E2DAD0] bg-white hover:border-brass-300 hover:shadow-md"
                }`}
              >
                <div
                  className={`w-13 h-13 rounded-sm flex items-center justify-center shrink-0 border transition-transform duration-300 group-hover:scale-110 ${
                    amenity.highlight
                      ? "bg-maroon-800 text-brass-300 border-brass-400"
                      : "bg-cream-100 border-cream-200"
                  }`}
                >
                  {amenity.highlight ? (
                    <Sparkles className="w-6 h-6 text-brass-300 animate-pulse" />
                  ) : (
                    iconMap[amenity.icon]
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="font-serif text-xl font-bold text-charcoal-950">
                      {amenity.title}
                    </h3>
                    {amenity.highlight && (
                      <span className="text-[11px] uppercase font-bold tracking-wider px-2 py-0.5 bg-maroon-100 text-maroon-950 rounded-xs border border-maroon-300">
                        Exclusive
                      </span>
                    )}
                  </div>
                  <p className="text-base text-charcoal-800 leading-relaxed font-normal">
                    {amenity.description}
                  </p>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
