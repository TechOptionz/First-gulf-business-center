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
  const isMobile = useIsMobileViewport();
  const shouldReduceMotion = useReducedMotion();

  // `useScroll({ target })` throws "Target ref is defined but not hydrated"
  // when it is handed a ref that never reaches a DOM node. Calling it here
  // and then returning the static branch below did exactly that on phones,
  // so the scroll hook lives in the child that actually renders the ref.
  if (shouldReduceMotion || isMobile) {
    return <div className={cn("overflow-hidden relative", className)}>{children}</div>;
  }

  return (
    <ParallaxLayer offset={offset} className={className}>
      {children}
    </ParallaxLayer>
  );
}

function ParallaxLayer({
  children,
  offset,
  className,
}: Required<Omit<ParallaxImageProps, "children">> & { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <div ref={ref} className={cn("overflow-hidden relative", className)}>
      <motion.div style={{ y }} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
}
