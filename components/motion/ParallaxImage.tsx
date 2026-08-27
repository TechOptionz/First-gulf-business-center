"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobileViewport } from "@/lib/use-media-query";

interface ParallaxImageProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}

export default function ParallaxImage({
  children,
  offset = 30,
  className = "",
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobileViewport();
  const shouldReduceMotion = useReducedMotion();


  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  if (shouldReduceMotion || isMobile) {
    return <div className={cn("overflow-hidden relative", className)}>{children}</div>;
  }

  return (
    <div ref={ref} className={cn("overflow-hidden relative", className)}>
      <motion.div style={{ y }} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
}
