import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import FeaturedCard from "@/components/ui/FeaturedCard";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import TextReveal from "@/components/motion/TextReveal";
import FadeUp from "@/components/motion/FadeUp";
import AmenityShowcase from "@/components/sections/AmenityShowcase";
import TenantLoungeHighlight from "@/components/sections/TenantLoungeHighlight";
import CTASection from "@/components/sections/CTASection";
import { WORKSPACE_SERVICES } from "@/data/content";
import MapLink from "@/components/ui/MapLink";

export const metadata: Metadata = {
  title: "Office Spaces in Dubai | Serviced Offices, Coworking & Virtual Offices",
  description:
    "Explore executive office spaces at First Gulf Business Center, Madina Mall Dubai. Move-in ready serviced offices, flexible coworking desks, and EJARI virtual offices.",
};

export default function OfficeSpacePage() {
  return (
    <div className="bg-cream-100/50">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumbs items={[{ name: "Office Space" }]} />
        </div>
      </div>

      {/* Hero */}
      <section className="relative py-16 sm:py-24 bg-charcoal-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-dubai-office.webp"
            alt="First Gulf Business Center Office Space Dubai"
            fill
            priority
            className="object-cover object-center opacity-95"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/75 via-charcoal-950/35 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <FadeUp delay={0.1} distance={15}>
              <MapLink className="mb-6 inline-block">
                <Badge variant="dark" dot>
                  Madina Mall, Dubai • Offices 2–20 & 2–21
                </Badge>
              </MapLink>
            </FadeUp>

            <TextReveal
              as="h1"
              delay={0.2}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] mb-6"
            >
              Sophisticated Workspaces Built for Business Growth
            </TextReveal>

            <FadeUp delay={0.45} distance={20}>
              <p className="text-lg sm:text-xl md:text-2xl text-cream-100 leading-relaxed font-normal mb-8">
                Whether you need a dedicated coworking desk for rapid expansion, a certified EJARI contract for DED licensing, or a prestigious private serviced suite, First Gulf delivers tailored workspaces with zero setup friction.
              </p>
            </FadeUp>

            <FadeUp delay={0.6} distance={20}>
              <div className="flex flex-wrap gap-4">
                <Button href="/book-a-tour" variant="gold" size="md">
                  Schedule a Workspace Tour
                </Button>
                <Button href="/contact" variant="dark" size="md">
                  Inquire on Availability
                </Button>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Detailed Categories Breakdown */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Explore Categories"
            title="Choose the Ideal Configuration for Your Team"
            subtitle="All workspaces include high-speed fiber internet, full air conditioning, daily maintenance, and complimentary access to our signature tenant wellbeing lounge."
          />

          <div className="space-y-8 sm:space-y-10 lg:space-y-12">
            {WORKSPACE_SERVICES.map((workspace, index) => (
              <FeaturedCard
                key={workspace.id}
                id={workspace.id}
                reverse={index % 2 === 1}
                image={workspace.image}
                imageAlt={workspace.title}
                eyebrow={`Workspace Option ${index + 1}`}
                title={workspace.title}
                tagline={workspace.tagline}
                description={workspace.shortDesc}
                details={{
                  label: "Included Features & Amenities",
                  items: workspace.features,
                }}
                meta={
                  <span className="min-w-0 italic">
                    🎯 <strong className="font-semibold not-italic">Ideal for:</strong>{" "}
                    {workspace.idealFor}
                  </span>
                }
                actions={
                  <>
                    <Button
                      href={workspace.href}
                      variant="primary"
                      size="sm"
                      withArrow
                      className="w-full sm:w-auto"
                    >
                      Explore {workspace.title}
                    </Button>
                    <Button
                      href={`/book-a-tour?workspace=${workspace.id}`}
                      variant="secondary"
                      size="sm"
                      className="w-full sm:w-auto"
                    >
                      Book This Space
                    </Button>
                  </>
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Matrix Table */}
      <section className="py-20 bg-cream-100/70 border-t border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Side-by-Side Comparison"
            title="Compare Workspace Packages"
            subtitle="Transparent feature comparison across our key workspace categories."
          />

          <div className="bg-white rounded-sm border border-[#E8E2D8] shadow-card overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-left text-sm sm:text-base">
              <thead>
                <tr className="bg-charcoal-950 text-white border-b border-brass-400">
                  <th className="p-4 font-serif font-bold text-brass-300 w-1/4">Feature / Service</th>
                  <th className="p-4 font-serif font-bold text-white w-1/4">Coworking Space</th>
                  <th className="p-4 font-serif font-bold text-white w-1/4">Virtual Office (EJARI)</th>
                  <th className="p-4 font-serif font-bold text-white w-1/4">Freezone Serviced Suite</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-200 text-charcoal-800">
                <tr>
                  <td className="p-4 font-bold bg-cream-50">Physical Desk Allocation</td>
                  <td className="p-4 text-green-700 font-semibold">✓ Hot or Dedicated Desk</td>
                  <td className="p-4 text-charcoal-500">— On-Demand Access</td>
                  <td className="p-4 text-green-700 font-semibold">✓ Private Furnished Office</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold bg-cream-50">EJARI / Estidama Document</td>
                  <td className="p-4 text-charcoal-500">— Optional Add-on</td>
                  <td className="p-4 text-green-700 font-semibold">✓ Included & Certified</td>
                  <td className="p-4 text-green-700 font-semibold">✓ Included & Certified</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold bg-cream-50">Rental Commitment Terms</td>
                  <td className="p-4">Hourly, Daily, Monthly</td>
                  <td className="p-4">Annual Legal Package</td>
                  <td className="p-4">Monthly to Multi-Year</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold bg-cream-50">Tenant Pool Lounge & Coffee</td>
                  <td className="p-4 text-green-700 font-semibold">✓ Unlimited Free Access</td>
                  <td className="p-4 text-charcoal-500">During Scheduled Visits</td>
                  <td className="p-4 text-green-700 font-semibold">✓ Unlimited Free Access</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold bg-cream-50">Front-Desk & Mail Handling</td>
                  <td className="p-4 text-green-700 font-semibold">✓ Included</td>
                  <td className="p-4 text-green-700 font-semibold">✓ Included</td>
                  <td className="p-4 text-green-700 font-semibold">✓ Dedicated Support</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold bg-cream-50">Covered Parking Allocation</td>
                  <td className="p-4">Visitor Mall Parking</td>
                  <td className="p-4">—</td>
                  <td className="p-4 text-green-700 font-semibold">✓ Allocated Tenant Bays</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Signature Wellbeing Lounge */}
      <TenantLoungeHighlight />

      {/* Facilities Grid */}
      <AmenityShowcase />

      {/* CTA */}
      <CTASection />
    </div>
  );
}
