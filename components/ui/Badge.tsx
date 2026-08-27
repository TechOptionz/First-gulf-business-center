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
    brass: "bg-brass-100/80 text-brass-900 border-brass-400 font-bold",
    maroon: "bg-maroon-100/90 text-maroon-950 border-maroon-300 font-bold",
    dark: "bg-charcoal-950 text-brass-300 border-brass-400/40 font-bold",
    outline: "bg-white text-charcoal-950 border-charcoal-300 font-bold",
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
        "inline-flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-sm border shadow-xs transition-colors select-none max-w-full leading-snug",
        variantStyles[variant],
        className
      )}
    >
      {dot && <span className={cn("w-2 h-2 rounded-full animate-pulse shrink-0", dotStyles[variant])} />}
      <span>{children}</span>
    </span>
  );
}
