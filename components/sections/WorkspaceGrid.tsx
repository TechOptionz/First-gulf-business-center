"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import ServiceCard from "@/components/ui/ServiceCard";
import { cardGridClass } from "@/components/ui/CardGrid";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import CardTilt from "@/components/motion/CardTilt";
import FadeUp from "@/components/motion/FadeUp";
import { WORKSPACE_SERVICES } from "@/data/content";

const WORKSPACE_CHIPS: Record<string, string> = {
  coworking: "Hourly / Monthly",
  "virtual-office": "EJARI & Estidama",
};

export default function WorkspaceGrid() {
  return (
    <section className="py-20 lg:py-28 bg-cream-100/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Workspaces"
          title="Flexible Office Solutions Designed for Growth"
          subtitle="From single high-performance coworking desks to private executive serviced office suites and virtual registrations with authentic EJARI contracts."
        />

        <StaggerContainer className={cardGridClass("editorial")}>
          {WORKSPACE_SERVICES.map((space) => (
            <StaggerItem key={space.id}>
              <CardTilt>
                <ServiceCard
                  brassAccent
                  image={space.image}
                  imageAlt={space.title}
                  chip={WORKSPACE_CHIPS[space.id] ?? "100% Ownership"}
                  chipVariant="maroon"
                  title={space.title}
                  tagline={space.tagline}
                  description={space.shortDesc}
                  features={space.features.slice(0, 4)}
                  featuresLabel="Key Highlights"
                  note={`💡 ${space.pricingNote}`}
                  primaryCta={{ href: space.href, label: "View Details" }}
                  secondaryCta={{
                    href: `/book-a-tour?workspace=${space.id}`,
                    label: "Book",
                  }}
                />
              </CardTilt>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Comparison CTA Box */}
        <FadeUp delay={0.2} className="mt-14">
          <div className="flex flex-col items-start gap-6 rounded-sm border-2 border-brass-300 bg-white p-5 shadow-sm transition-shadow hover:shadow-luxury sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8">
            <div className="flex min-w-0 items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brass-100 text-brass-900">
                <Sparkles aria-hidden="true" className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <h3 className="font-serif text-xl font-bold leading-[1.25] text-charcoal-950 text-balance">
                  Not sure which workspace fits your Dubai trade license?
                </h3>
                <p className="mt-1.5 text-base leading-[1.6] text-charcoal-800">
                  Our corporate consultants evaluate your business activities and provide immediate recommendations.
                </p>
              </div>
            </div>
            <Button
              href="/contact"
              variant="gold"
              size="md"
              className="w-full sm:w-auto lg:shrink-0"
            >
              Consult a Specialist
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
