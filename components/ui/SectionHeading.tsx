import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  dark?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  dark = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-4xl mb-12 md:mb-16",
        align === "center" && "mx-auto text-center",
        align === "right" && "ml-auto text-right",
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "mb-3.5 inline-flex max-w-full flex-wrap items-center justify-center gap-2 text-sm font-bold uppercase leading-snug tracking-[0.2em]",
            dark ? "text-brass-300" : "text-maroon-800"
          )}
        >
          <span className="w-8 h-[2px] bg-brass-400 inline-block" />
          <span>{eyebrow}</span>
          <span className="w-8 h-[2px] bg-brass-400 inline-block" />
        </div>
      )}

      <h2
        className={cn(
          "font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.12] mb-5 [text-wrap:balance]",
          dark ? "text-white" : "text-charcoal-950"
        )}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={cn(
            "text-base sm:text-lg md:text-xl leading-relaxed font-medium text-balance max-w-3xl",
            align === "center" && "mx-auto",
            dark ? "text-cream-100" : "text-charcoal-800"
          )}
        >
          {subtitle}
        </p>
      )}

      <div
        className={cn(
          "mt-6 flex items-center gap-1.5",
          align === "center" && "justify-center",
          align === "right" && "justify-end"
        )}
      >
        <span className="w-16 h-[2px] bg-brass-400/70 inline-block" />
        <span className="w-2.5 h-2.5 rotate-45 border-2 border-brass-400 inline-block bg-brass-100" />
        <span className="w-16 h-[2px] bg-brass-400/70 inline-block" />
      </div>
    </div>
  );
}
