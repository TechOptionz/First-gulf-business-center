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
  /** Set on dark hero backgrounds so the trail renders in light text. */
  onDark?: boolean;
}

export default function Breadcrumbs({
  items,
  className,
  onDark = false,
}: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumbs"
      className={cn(
        "flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1.5 py-2.5 text-sm font-semibold sm:py-3",
        onDark ? "text-cream-200" : "text-charcoal-700",
        className
      )}
    >
      <Link
        href="/"
        className={cn(
          "inline-flex items-center gap-1.5 transition-colors",
          onDark ? "hover:text-white" : "hover:text-maroon-800"
        )}
      >
        <Home
          className={cn("w-4 h-4", onDark ? "text-brass-300" : "text-brass-600")}
        />
        <span>Home</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={index}>
            <ChevronRight
              className={cn(
                "w-4 h-4 shrink-0",
                onDark ? "text-brass-300" : "text-brass-500"
              )}
            />
            {isLast || !item.href ? (
              <span
                aria-current="page"
                className={cn(
                  "min-w-0 break-words font-bold",
                  onDark ? "text-white" : "text-maroon-900"
                )}
              >
                {item.name}
              </span>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  "min-w-0 break-words transition-colors",
                  onDark ? "hover:text-white" : "hover:text-maroon-800"
                )}
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
