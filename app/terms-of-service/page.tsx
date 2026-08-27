import React from "react";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { COMPANY_DETAILS } from "@/data/content";

export const metadata: Metadata = {
  title: "Terms of Service | First Gulf Business Center Dubai",
  description:
    "Terms of Service governing the use of workspace premises, virtual office EJARI contracts, and corporate consultancy provided by First Gulf Business Center L.L.C.",
};

export default function TermsOfServicePage() {
  return (
    <div className="bg-cream-100/50">
      <div className="bg-white border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumbs items={[{ name: "Terms of Service" }]} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white p-8 sm:p-12 rounded-sm border border-[#E2DAD0] shadow-card space-y-8 text-charcoal-900">
          <div>
            <span className="text-xs sm:text-sm font-bold text-maroon-900 uppercase tracking-widest block mb-2">
              Commercial Regulations
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal-950 mb-3">
              Terms of Service
            </h1>
            <p className="text-sm font-semibold text-charcoal-700">
              Effective Date: January 2026 • First Gulf Business Center L.L.C, Dubai, UAE
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-charcoal-950">
              1. Acceptance of Terms
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-charcoal-800 font-normal">
              By accessing our website, reserving workspace memberships, entering into an EJARI commercial lease, or retaining our business setup services, you agree to comply with and be bound by the terms and conditions outlined herein, as well as the laws of the Emirate of Dubai and the Federal Laws of the United Arab Emirates.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-charcoal-950">
              2. Workspace Occupancy & Tenant Conduct
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-charcoal-800 font-normal">
              Tenants holding physical serviced office suites or coworking memberships agree to:
            </p>
            <ul className="text-base sm:text-lg text-charcoal-800 space-y-2 list-disc pl-6 font-normal">
              <li>Maintain professional conduct that respects other center occupants, visitors, and center staff.</li>
              <li>Utilize common facilities, including the tenant wellbeing lounge, tournament pool table, and kitchen, with care and cleanliness.</li>
              <li>Refrain from using business center spaces for illegal, unauthorized, or unlicensed commercial activities.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-charcoal-950">
              3. EJARI & Virtual Office Agreements
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-charcoal-800 font-normal">
              All virtual office packages, including official RERA EJARI contracts and DED Estidama agreements, are issued exclusively to licensed commercial entities or individuals actively completing valid trade license issuance in Dubai. Cancellation or non-renewal of agreements must comply with the terms stipulated in the formal tenancy lease contract.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-charcoal-950">
              4. Governing Law & Jurisdiction
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-charcoal-800 font-normal">
              These terms shall be governed by and construed in accordance with the laws of the Emirate of Dubai and the applicable Federal Laws of the United Arab Emirates. Any disputes arising in connection with our services shall be subject to the exclusive jurisdiction of the competent courts of Dubai.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-charcoal-950">
              5. Legal Inquiries
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-charcoal-800 font-normal">
              For commercial lease clarification or legal inquiries, contact:
            </p>
            <div className="bg-cream-50 p-5 rounded-sm border border-cream-300 text-sm sm:text-base text-charcoal-900 space-y-1 font-medium">
              <div><strong>First Gulf Business Center L.L.C</strong></div>
              <div>Offices 2–20, 2nd Floor, Madina Mall, Dubai, UAE</div>
              <div>Email: {COMPANY_DETAILS.email} • Tel: {COMPANY_DETAILS.phonePrimary}</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
