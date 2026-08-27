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
import FeatureCard from "@/components/ui/FeatureCard";
import { cardGridClass } from "@/components/ui/CardGrid";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import { FACILITIES } from "@/data/content";

const iconMap: Record<string, React.ReactNode> = {
  Wind: <Wind className="h-6 w-6" />,
  Users: <Users className="h-6 w-6" />,
  Coffee: <Coffee className="h-6 w-6" />,
  ShieldCheck: <ShieldCheck className="h-6 w-6" />,
  Zap: <Zap className="h-6 w-6" />,
  Car: <Car className="h-6 w-6" />,
  Wifi: <Wifi className="h-6 w-6" />,
  Sparkles: <Sparkles className="h-6 w-6" />,
  Presentation: <Presentation className="h-6 w-6" />,
  Sparkle: <Sparkle className="h-6 w-6" />,
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

        <StaggerContainer className={cardGridClass("horizontal")}>
          {FACILITIES.map((amenity) => (
            <StaggerItem key={amenity.id}>
              <FeatureCard
                layout="horizontal"
                size="compact"
                brassAccent={amenity.highlight}
                highlight={amenity.highlight}
                icon={
                  amenity.highlight ? (
                    <Sparkles className="h-6 w-6" />
                  ) : (
                    iconMap[amenity.icon]
                  )
                }
                iconTone={amenity.highlight ? "dark" : "cream"}
                title={amenity.title}
                tag={amenity.highlight ? "Exclusive" : undefined}
                description={amenity.description}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
