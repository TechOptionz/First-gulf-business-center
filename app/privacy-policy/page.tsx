import React from "react";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { COMPANY_DETAILS } from "@/data/content";

export const metadata: Metadata = {
  title: "Privacy Policy | First Gulf Business Center Dubai",
  description:
    "Privacy Policy for First Gulf Business Center L.L.C. How we collect, safeguard, and process personal and corporate data in compliance with UAE data protection laws.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-cream-100/50">
      <div className="bg-white border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumbs items={[{ name: "Privacy Policy" }]} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white p-8 sm:p-12 rounded-sm border border-[#E2DAD0] shadow-card space-y-8 text-charcoal-900">
          <div>
            <span className="mb-2 block text-sm font-bold uppercase tracking-widest text-maroon-900">
              Legal Compliance
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal-950 mb-3">
              Privacy Policy
            </h1>
            <p className="text-sm font-semibold text-charcoal-700">
              Last Updated: January 2026 • First Gulf Business Center L.L.C, Dubai, UAE
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-charcoal-950">
              1. Introduction & Scope
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-charcoal-800 font-normal">
              First Gulf Business Center L.L.C (&ldquo;FGBC&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates the executive business center situated on the 2nd Floor of Madina Mall, Offices 2–20, Al Muhaisnah 4, Dubai, UAE. We are committed to safeguarding the privacy and confidentiality of our tenants, clients, and website visitors in full adherence to the United Arab Emirates Federal Decree-Law No. 45 of 2021 on Personal Data Protection (PDPL).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-charcoal-950">
              2. Information We Collect
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-charcoal-800 font-normal">
              In order to provide our commercial office leasing, virtual EJARI registration, and PRO business setup services, we may collect:
            </p>
            <ul className="text-base sm:text-lg text-charcoal-800 space-y-2 list-disc pl-6 font-normal">
              <li><strong>Contact Data:</strong> Full name, professional email address, telephone and WhatsApp number, and corporate job title.</li>
              <li><strong>Corporate Identification:</strong> Trade license copies, Memorandum of Association (MOA), passport copies, and Emirates ID copies for authorized signatories (required for DED / RERA EJARI attestation).</li>
              <li><strong>Inquiry Records:</strong> Notes regarding workspace preferences, tour scheduling requests, and customer support communications.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-charcoal-950">
              3. Purpose of Processing
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-charcoal-800 font-normal">
              We process personal and corporate data strictly for the following purposes:
            </p>
            <ul className="text-base sm:text-lg text-charcoal-800 space-y-2 list-disc pl-6 font-normal">
              <li>Executing commercial tenancy agreements and authenticating official EJARI / Estidama records with the Dubai Land Department (DLD).</li>
              <li>Fulfilling government PRO, visa processing, and Ministry of Economy trademark filing instructions.</li>
              <li>Providing 24/7 biometric keycard access and security monitoring within our business center premises.</li>
              <li>Responding directly to inquiries and scheduling workspace walkthroughs.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-charcoal-950">
              4. Data Confidentiality & Security
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-charcoal-800 font-normal">
              First Gulf Business Center enforces stringent administrative, physical, and technical safeguards. We never sell, trade, or distribute your personal information to third-party commercial marketing entities. Data is only shared with authorized UAE government bodies (such as the DED, RERA, and Ministry of Economy) when necessary to execute regulatory filings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-charcoal-950">
              5. Contact Our Privacy Officer
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-charcoal-800 font-normal">
              For any questions regarding this Privacy Policy or your personal records, please reach out to our administration office:
            </p>
            <div className="bg-cream-50 p-5 rounded-sm border border-cream-300 text-sm sm:text-base text-charcoal-900 space-y-1.5 font-medium">
              <div><strong>First Gulf Business Center L.L.C</strong></div>
              <div>2nd Floor, Madina Mall, Offices 2–20, Al Muhaisnah 4, Dubai, UAE</div>
              <div>Email: <a href={`mailto:${COMPANY_DETAILS.email}`} className="text-maroon-900 font-bold underline">{COMPANY_DETAILS.email}</a></div>
              <div>Telephone: {COMPANY_DETAILS.phonePrimary}</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
