import React from "react";
import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import WorkspaceGrid from "@/components/sections/WorkspaceGrid";
import TenantLoungeHighlight from "@/components/sections/TenantLoungeHighlight";
import AmenityShowcase from "@/components/sections/AmenityShowcase";
import ConsultancyGrid from "@/components/sections/ConsultancyGrid";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import LocationMapSection from "@/components/sections/LocationMapSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "First Gulf Business Center | Luxury Serviced Offices & Setup in Dubai",
  description:
    "Explore luxury serviced offices, flexible coworking spaces, RERA EJARI virtual office contracts, and business setup services in Madina Mall, Dubai. 24/7 access.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WorkspaceGrid />
      <TenantLoungeHighlight />
      <AmenityShowcase />
      <ConsultancyGrid />
      <TestimonialsSection />
      <LocationMapSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
