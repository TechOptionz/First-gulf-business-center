import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  brassAccent?: boolean;
  dark?: boolean;
}

export default function Card({
  children,
  className,
  hoverEffect = true,
  brassAccent = false,
  dark = false,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "relative rounded-sm p-6 sm:p-8 transition-all duration-300 border active:scale-[0.985] active:border-brass-400",
        dark
          ? "bg-charcoal-900/90 text-cream-50 border-charcoal-800 shadow-card"
          : "bg-white text-charcoal-900 border-[#E8E2D8] shadow-card",
        hoverEffect &&
          (dark
            ? "hover:border-brass-400/50 hover:shadow-luxury-hover hover:-translate-y-1"
            : "hover:border-brass-400 hover:shadow-luxury hover:-translate-y-1"),
        className
      )}
      {...props}
    >
      {brassAccent && (
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brass-400 via-brass-200 to-brass-400 rounded-t-sm" />
      )}
      {children}
    </div>
  );
}
