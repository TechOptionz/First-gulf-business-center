import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Sparkles, Building2, ShieldCheck, Briefcase } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import TextReveal from "@/components/motion/TextReveal";
import FadeUp from "@/components/motion/FadeUp";
import AmenityShowcase from "@/components/sections/AmenityShowcase";
import TenantLoungeHighlight from "@/components/sections/TenantLoungeHighlight";
import CTASection from "@/components/sections/CTASection";
import { WORKSPACE_SERVICES } from "@/data/content";

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
            src="/images/hero-dubai-office.jpg"
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
              <Badge variant="dark" dot className="mb-6">
                Madina Mall, Dubai • Offices 2–20
              </Badge>
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

          <div className="space-y-16">
            {WORKSPACE_SERVICES.map((workspace, index) => {
              const isEven = index % 2 === 1;

              return (
                <div
                  key={workspace.id}
                  id={workspace.id}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-6 sm:p-10 rounded-sm border border-[#E8E2D8] bg-cream-50/50 shadow-card ${
                    isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className={`lg:col-span-6 ${isEven ? "lg:order-2" : ""}`}>
                    <div className="relative aspect-[16/10] w-full rounded-sm overflow-hidden border border-brass-300 shadow-md">
                      <Image
                        src={workspace.image}
                        alt={workspace.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </div>

                  <div className={`lg:col-span-6 space-y-5 ${isEven ? "lg:order-1" : ""}`}>
                    <div>
                      <span className="text-xs font-bold text-maroon-800 uppercase tracking-widest block mb-1">
                        Workspace Option {index + 1}
                      </span>
                      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-950">
                        {workspace.title}
                      </h2>
                      <p className="text-xs font-semibold text-brass-700 uppercase tracking-wider mt-1">
                        {workspace.tagline}
                      </p>
                    </div>

                    <p className="text-sm text-charcoal-700 leading-relaxed">
                      {workspace.shortDesc}
                    </p>

                    <div className="bg-white p-4 rounded-sm border border-cream-200">
                      <div className="text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-2.5">
                        Included Features & Amenities:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-charcoal-800">
                        {workspace.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-maroon-800 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-xs text-charcoal-600 italic">
                      🎯 <strong>Ideal for:</strong> {workspace.idealFor}
                    </div>

                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <Button
                        href={workspace.href}
                        variant="primary"
                        size="sm"
                        icon={<ArrowRight className="w-4 h-4" />}
                      >
                        Explore {workspace.title}
                      </Button>
                      <Button
                        href={`/book-a-tour?workspace=${workspace.id}`}
                        variant="secondary"
                        size="sm"
                      >
                        Book This Space
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
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
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[650px]">
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
