import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "maroon" | "brass" | "dark" | "outline";
  className?: string;
  dot?: boolean;
}

export default function Badge({
  children,
  variant = "brass",
  className,
  dot = true,
}: BadgeProps) {
  const variantStyles = {
    brass: "bg-brass-100/80 text-brass-900 border-brass-400",
    maroon: "bg-maroon-100/90 text-maroon-950 border-maroon-300",
    dark: "bg-charcoal-950 text-brass-300 border-brass-400/40",
    outline: "bg-white text-charcoal-950 border-charcoal-300",
  };

  const dotStyles = {
    brass: "bg-brass-600",
    maroon: "bg-maroon-700",
    dark: "bg-brass-400",
    outline: "bg-maroon-800",
  };

  return (
    <span
      className={cn(
        // `max-w-full` + `min-w-0` keep a long category name inside the card
        // instead of stretching it; the label wraps onto a second line.
        "inline-flex max-w-full items-center gap-2 rounded-sm border px-3 py-1.5 text-sm font-bold uppercase leading-snug tracking-wider shadow-sm transition-colors select-none sm:px-3.5",
        variantStyles[variant],
        className
      )}
    >
      {dot && (
        <span
          aria-hidden="true"
          className={cn("h-2 w-2 shrink-0 rounded-full", dotStyles[variant])}
        />
      )}
      <span className="min-w-0 break-words">{children}</span>
    </span>
  );
}
