import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumbs"
      className={cn(
        "flex flex-wrap items-center space-x-2 gap-y-1.5 text-xs sm:text-sm font-semibold text-charcoal-700 py-2.5 sm:py-3",
        className
      )}
    >
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 hover:text-maroon-800 transition-colors"
      >
        <Home className="w-4 h-4 text-brass-600" />
        <span>Home</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-4 h-4 text-brass-500 shrink-0" />
            {isLast || !item.href ? (
              <span className="text-maroon-900 font-bold truncate">
                {item.name}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-maroon-800 transition-colors truncate"
              >
                {item.name}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
