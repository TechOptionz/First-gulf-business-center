"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface FooterLinkProps {
  href: string;
  className?: string;
  "aria-label"?: string;
  children: React.ReactNode;
}

/**
 * Footer navigation link that always lands the reader at the top of the page.
 * A route change already resets the scroll position, but Next.js treats a link
 * to the route you are already on as a no-op - so from the bottom of the page
 * the click appeared to do nothing. Handle that case ourselves.
 */
export default function FooterLink({
  href,
  className,
  "aria-label": ariaLabel,
  children,
}: FooterLinkProps) {
  const pathname = usePathname();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Let the browser handle modified clicks (new tab, download, ...).
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    if (href !== pathname) return;

    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  return (
    <Link href={href} className={className} aria-label={ariaLabel} onClick={handleClick}>
      {children}
    </Link>
  );
}
