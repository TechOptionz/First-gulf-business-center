"use client";

import React from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import FadeUp from "@/components/motion/FadeUp";
import { FAQS } from "@/data/content";

export default function FAQSection() {
  return (
    <section className="py-20 lg:py-28 bg-cream-100/60 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Frequently Answered Inquiries"
          title="Everything You Need to Know About Dubai Workspaces & Setup"
          subtitle="Clear, transparent answers regarding EJARI certificates, Estidama compliance, move-in timelines, and facility amenities."
        />

        <FadeUp delay={0.2}>
          <Accordion items={FAQS} />
        </FadeUp>
      </div>
    </section>
  );
}
