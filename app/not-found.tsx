import React from "react";
import { Home, Building2, Phone } from "lucide-react";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-cream-100/70 py-16 px-4">
      <div className="max-w-md w-full text-center bg-white p-8 sm:p-12 rounded-sm border border-[#E8E2D8] shadow-card">
        <div className="mb-6 flex justify-center">
          <Logo width={180} height={60} />
        </div>

        <div className="font-serif text-6xl font-bold text-maroon-800 mb-2">
          404
        </div>

        <h1 className="mb-3 font-serif text-2xl font-bold leading-[1.25] text-charcoal-950">
          Page Not Found
        </h1>

        <p className="mb-8 text-base leading-[1.65] text-charcoal-800">
          The requested page could not be located. It may have been moved or updated as part of our platform improvements.
        </p>

        <div className="space-y-3">
          <Button href="/" variant="primary" size="md" fullWidth icon={<Home className="w-4 h-4" />}>
            Return to Homepage
          </Button>
          <Button href="/office-space" variant="secondary" size="md" fullWidth icon={<Building2 className="w-4 h-4" />}>
            View Office Spaces
          </Button>
          <Button href="/contact" variant="ghost" size="sm" fullWidth icon={<Phone className="w-3.5 h-3.5" />}>
            Contact Support Concierge
          </Button>
        </div>
      </div>
    </div>
  );
}
