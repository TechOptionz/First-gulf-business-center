"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import ImageReveal from "@/components/motion/ImageReveal";
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

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CONSULTANCY_SERVICES.map((service) => (
            <StaggerItem key={service.id}>
              <CardTilt>
                <Card
                  className="flex flex-col h-full bg-white border-[#E2DAD0] hover:border-brass-400 p-0 overflow-hidden group transition-all duration-300 hover:shadow-luxury-hover"
                >
                  <div className="relative h-56 w-full overflow-hidden bg-charcoal-900">
                    <ImageReveal className="w-full h-full">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-108"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </ImageReveal>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none z-10" />
                    <div className="absolute bottom-4 left-4 right-4 z-20">
                      <span className="text-xs font-bold text-brass-300 uppercase tracking-widest block mb-1">
                        Corporate Solution
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-white leading-snug">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-brass-800 uppercase tracking-wider mb-2">
                        {service.tagline}
                      </p>
                      <p className="text-base text-charcoal-800 leading-relaxed mb-6 font-normal">
                        {service.shortDesc}
                      </p>

                      <div className="space-y-2.5 mb-6 border-t border-cream-200 pt-4">
                        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-charcoal-900 block mb-1">
                          Included Solutions:
                        </span>
                        {service.offerings.slice(0, 4).map((offering, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm sm:text-base text-charcoal-900 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-brass-700 shrink-0 mt-1" />
                            <span>{offering}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-cream-200">
                      <Button
                        href={service.href}
                        variant="outline"
                        size="sm"
                        fullWidth
                        icon={<ArrowRight className="w-4 h-4" />}
                      >
                        Learn More
                      </Button>
                    </div>
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
