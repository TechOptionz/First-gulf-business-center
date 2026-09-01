import React from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  /**
   * Kept for backwards compatibility with existing call sites.
   * The wrapper no longer tracks the cursor, so this is ignored.
   */
  strength?: number;
  className?: string;
}

/**
 * Hover wrapper for CTAs. Lifts its child a couple of pixels on pointer
 * devices — it deliberately does NOT follow the cursor, so the button stays
 * exactly where the user aimed. The per-variant glow lives on `Button` itself.
 */
export default function MagneticButton({
  children,
  className = "",
}: MagneticButtonProps) {
  return (
    <div
      className={cn(
        "transition-transform duration-300 ease-out",
        "[@media(hover:hover)]:hover:-translate-y-0.5",
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        className
      )}
    >
      {children}
    </div>
  );
}
