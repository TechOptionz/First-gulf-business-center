"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/ui/ServiceCard";
import { cardGridClass } from "@/components/ui/CardGrid";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import CardTilt from "@/components/motion/CardTilt";
import { CONSULTANCY_SERVICES } from "@/data/content";

export default function ConsultancyGrid() {
  return (
    <section className="py-20 lg:py-28 bg-cream-100/70 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Corporate Advisory"
          title="UAE Business Setup & Specialized PRO Services"
          subtitle="Navigate Dubai commercial registration, Mainland DED permits, Freezone licensing, and Trademark protection with trusted legal and corporate experts."
        />

        <StaggerContainer className={cardGridClass("editorial")}>
          {CONSULTANCY_SERVICES.map((service) => (
            <StaggerItem key={service.id}>
              <CardTilt>
                <ServiceCard
                  image={service.image}
                  imageAlt={service.title}
                  chip="Corporate Solution"
                  chipVariant="maroon"
                  title={service.title}
                  tagline={service.tagline}
                  description={service.shortDesc}
                  features={service.offerings.slice(0, 4)}
                  featuresLabel="Included Solutions"
                  featureIcon={<CheckCircle2 className="h-4 w-4 text-brass-700" />}
                  primaryCta={{ href: service.href, label: "Learn More" }}
                />
              </CardTilt>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
