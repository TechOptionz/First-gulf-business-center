"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsCompactViewport } from "@/lib/use-media-query";

interface ImageRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function ImageReveal({
  children,
  className = "",
  delay = 0,
}: ImageRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsCompactViewport();

  if (shouldReduceMotion) {
    return (
      <div className={cn("overflow-hidden relative w-full h-full", className)}>
        {children}
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden relative", className)}>
      <motion.div
        initial={{ opacity: 0, scale: isMobile ? 1.06 : 1.12 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          opacity: {
            duration: isMobile ? 0.45 : 0.6,
            delay,
            ease: "easeOut",
          },
          scale: {
            duration: isMobile ? 0.7 : 1.1,
            delay,
            ease: [0.16, 1, 0.3, 1] as const,
          },
        }}
        /* `relative` keeps this the containing block for `fill` images so the
           settle actually scales the photo rather than the empty wrapper. */
        className="relative w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
