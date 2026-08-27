"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import ImageReveal from "@/components/motion/ImageReveal";
import CardTilt from "@/components/motion/CardTilt";
import FadeUp from "@/components/motion/FadeUp";
import { WORKSPACE_SERVICES } from "@/data/content";

export default function WorkspaceGrid() {
  return (
    <section className="py-20 lg:py-28 bg-cream-100/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Workspaces"
          title="Flexible Office Solutions Designed for Growth"
          subtitle="From single high-performance coworking desks to private executive serviced office suites and virtual registrations with authentic EJARI contracts."
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {WORKSPACE_SERVICES.map((space) => (
            <StaggerItem key={space.id}>
              <CardTilt>
                <Card
                  brassAccent
                  className="flex flex-col h-full bg-white border-[#E2DAD0] hover:border-brass-400 p-0 overflow-hidden group transition-all duration-300 hover:shadow-luxury-hover"
                >
                  {/* Image Preview Container */}
                  <div className="relative h-60 w-full overflow-hidden bg-charcoal-900">
                    <ImageReveal className="w-full h-full">
                      <Image
                        src={space.image}
                        alt={space.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-108"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </ImageReveal>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
                      <Badge variant="maroon" className="bg-white/95 shadow-sm font-bold">
                        {space.id === "coworking"
                          ? "Hourly / Monthly"
                          : space.id === "virtual-office"
                          ? "EJARI & Estidama"
                          : "100% Ownership"}
                      </Badge>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-950 mb-2 group-hover:text-maroon-800 transition-colors">
                        {space.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-bold text-brass-800 uppercase tracking-wider mb-3">
                        {space.tagline}
                      </p>
                      <p className="text-base text-charcoal-800 leading-relaxed mb-6 font-normal">
                        {space.shortDesc}
                      </p>

                      {/* Feature Bullets */}
                      <div className="space-y-3 mb-8 border-t border-cream-200 pt-5">
                        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-charcoal-900 block mb-1">
                          Key Highlights:
                        </span>
                        {space.features.slice(0, 4).map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-charcoal-900 font-medium">
                            <Check className="w-4 h-4 text-maroon-800 shrink-0 mt-1" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="pt-4 border-t border-cream-200">
                      <div className="text-xs sm:text-sm text-charcoal-700 mb-4 font-medium italic">
                        💡 {space.pricingNote}
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Button
                          href={space.href}
                          variant="primary"
                          size="sm"
                          fullWidth
                          icon={<ArrowRight className="w-4 h-4" />}
                        >
                          View Details
                        </Button>
                        <Button
                          href={`/book-a-tour?workspace=${space.id}`}
                          variant="secondary"
                          size="sm"
                          className="px-4"
                        >
                          Book
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </CardTilt>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Comparison CTA Box */}
        <FadeUp delay={0.2} className="mt-14">
          <div className="p-6 sm:p-8 bg-white rounded-sm border-2 border-brass-300 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm hover:shadow-luxury transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brass-100 flex items-center justify-center text-brass-900 shrink-0">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h4 className="font-serif text-xl font-bold text-charcoal-950">
                  Not sure which workspace fits your Dubai trade license?
                </h4>
                <p className="text-sm sm:text-base text-charcoal-800 font-normal">
                  Our corporate consultants evaluate your business activities and provide immediate recommendations.
                </p>
              </div>
            </div>
            <Button href="/contact" variant="gold" size="md">
              Consult a Specialist
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
