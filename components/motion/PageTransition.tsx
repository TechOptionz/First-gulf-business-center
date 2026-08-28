"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { useIsCompactViewport } from "@/lib/use-media-query";

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsCompactViewport();

  // `useIsCompactViewport` reports desktop during SSR, so this wrapper is what
  // ships every page's markup inside `opacity: 0` — including the LCP hero —
  // leaving it unpainted until framer-motion hydrates. There is nothing to
  // transition *from* on the first render, so only client-side route changes
  // start from transparent; the very first paint begins at the animate state.
  const hasMountedRef = useRef(false);
  useEffect(() => {
    hasMountedRef.current = true;
  }, []);

  if (shouldReduceMotion || isMobile) {
    return <>{children}</>;
  }

  return (
    <motion.div
      key={pathname}
      initial={hasMountedRef.current ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}
