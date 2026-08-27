import React from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Building,
} from "lucide-react";
import Logo from "@/components/ui/Logo";
import { COMPANY_DETAILS } from "@/data/content";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-950 text-cream-100 border-t-2 border-brass-500/40 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />

      {/* Top Pre-Footer Bar */}
      <div className="border-b border-charcoal-800 py-8 px-4 sm:px-6 lg:px-8 bg-charcoal-900/80">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-sm bg-maroon-800 border border-brass-400/40 flex items-center justify-center text-brass-300 shrink-0">
              <Building className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide">
                First Gulf Business Center L.L.C
              </h4>
              <p className="text-sm text-cream-200">
                Authorized Commercial Business Center • Al Muhaisnah 4, Dubai, United Arab Emirates
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${COMPANY_DETAILS.phonePrimaryTel}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold uppercase tracking-wider text-brass-300 border border-brass-500/50 rounded-sm hover:bg-brass-500/20 transition-colors"
            >
              <Phone className="w-4 h-4 text-brass-300" />
              <span>{COMPANY_DETAILS.phonePrimary}</span>
            </a>
            <a
              href={`mailto:${COMPANY_DETAILS.email}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold uppercase tracking-wider text-white border border-charcoal-700 rounded-sm hover:bg-charcoal-800 transition-colors"
            >
              <Mail className="w-4 h-4 text-brass-400" />
              <span>{COMPANY_DETAILS.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main 4-Column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1: Brand & Profile */}
          <div className="space-y-4">
            <div className="inline-block">
              <Logo width={220} height={75} variant="white" href="/" />
            </div>
            <p className="text-sm sm:text-base text-cream-200 leading-relaxed font-normal pt-1">
              Dubai&apos;s premier executive workspace destination. Providing DED-compliant serviced offices, high-tech coworking, certified EJARI & Estidama virtual contracts, and seamless business formation.
            </p>
            <div className="pt-2">
              <div className="flex items-center gap-3">
                <a
                  href={COMPANY_DETAILS.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-sm bg-charcoal-900 border border-charcoal-700 flex items-center justify-center text-cream-200 hover:text-white hover:border-brass-400 transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href={COMPANY_DETAILS.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-sm bg-charcoal-900 border border-charcoal-700 flex items-center justify-center text-cream-200 hover:text-white hover:border-brass-400 transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href={COMPANY_DETAILS.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-sm bg-charcoal-900 border border-charcoal-700 flex items-center justify-center text-cream-200 hover:text-white hover:border-brass-400 transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-bold text-brass-300 uppercase tracking-wider mb-5 border-b border-charcoal-800 pb-2">
              Quick Navigation
            </h4>
            <ul className="space-y-3 text-sm sm:text-base text-cream-200 font-medium">
              {[
                { name: "Home", href: "/" },
                { name: "About First Gulf", href: "/about" },
                { name: "Workspace Overview", href: "/office-space" },
                { name: "Business Consultancy", href: "/business-consultancy" },
                { name: "Schedule a Tour", href: "/book-a-tour" },
                { name: "Contact Concierge", href: "/contact" },
                { name: "Privacy Policy", href: "/privacy-policy" },
                { name: "Terms of Service", href: "/terms-of-service" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-brass-300 transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-2 h-2 rounded-full bg-brass-400/70 group-hover:bg-brass-300" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Workspaces & Services */}
          <div>
            <h4 className="font-serif text-lg font-bold text-brass-300 uppercase tracking-wider mb-5 border-b border-charcoal-800 pb-2">
              Workspaces & Solutions
            </h4>
            <ul className="space-y-3 text-sm sm:text-base text-cream-200 font-medium">
              {[
                { name: "Coworking Space", href: "/office-space/coworking" },
                { name: "Virtual Office (EJARI)", href: "/office-space/virtual-office" },
                { name: "Estidama Virtual Leases", href: "/office-space/virtual-office" },
                { name: "Freezone Serviced Offices", href: "/office-space/freezone" },
                { name: "Business Setup & PRO", href: "/business-consultancy/business-setup-pro" },
                { name: "Corporate Solutions & IT", href: "/business-consultancy/corporate-solutions" },
                { name: "Trademark Registration", href: "/business-consultancy/trademark-registration" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-brass-300 transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-2 h-2 rounded-full bg-brass-400/70 group-hover:bg-brass-300" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Reach Us */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-brass-300 uppercase tracking-wider mb-5 border-b border-charcoal-800 pb-2">
              Dubai Headquarters
            </h4>

            <div className="space-y-3.5 text-sm sm:text-base text-cream-200 font-medium">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brass-400 shrink-0 mt-1" />
                <span>
                  2nd Floor, Madina Mall, Offices 2–20, Al Muhaisnah 4, Dubai, United Arab Emirates
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Building className="w-4 h-4 text-brass-400 shrink-0" />
                <span>P.O. Box: {COMPANY_DETAILS.poBox}</span>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-brass-400 shrink-0" />
                <span>24/7 Tenant Access & Support</span>
              </div>

              <div className="pt-3 border-t border-charcoal-800 space-y-2.5">
                <a
                  href={`tel:${COMPANY_DETAILS.phonePrimaryTel}`}
                  className="block text-brass-300 hover:text-white font-bold text-base sm:text-lg"
                >
                  📞 {COMPANY_DETAILS.phonePrimary}
                </a>
                <a
                  href={`tel:${COMPANY_DETAILS.phoneSecondaryTel}`}
                  className="block text-cream-100 hover:text-white font-semibold"
                >
                  ☎️ {COMPANY_DETAILS.phoneSecondary}
                </a>
                <a
                  href={`mailto:${COMPANY_DETAILS.email}`}
                  className="block text-cream-200 hover:text-brass-300 font-medium truncate"
                >
                  ✉️ {COMPANY_DETAILS.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-charcoal-800 py-6 px-4 sm:px-6 lg:px-8 bg-black/60 text-sm text-cream-300 font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-center sm:text-left text-cream-200">
            Copyright &copy; {currentYear} First Gulf Business Center L.L.C. All rights reserved. Registered in Dubai, UAE.
          </p>
          <div className="flex items-center space-x-6 text-cream-200">
            <Link href="/privacy-policy" className="hover:text-brass-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-brass-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-brass-300 transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
