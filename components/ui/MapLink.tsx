import React from "react";
import { COMPANY_DETAILS } from "@/data/content";

interface MapLinkProps {
  className?: string;
  children: React.ReactNode;
}

/**
 * Every mention of the center's location on the site opens the same Google
 * Maps entry, so visitors can get directions from wherever they read it.
 */
export default function MapLink({ className, children }: MapLinkProps) {
  return (
    <a
      href={COMPANY_DETAILS.mapUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open the First Gulf Business Center location in Google Maps"
      className={className}
    >
      {children}
    </a>
  );
}
