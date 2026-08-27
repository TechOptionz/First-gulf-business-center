"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

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
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1024);
    }
  }, []);

  if (shouldReduceMotion || isMobile) {
    return <div className={cn("overflow-hidden relative w-full h-full", className)}>{children}</div>;
  }

  return (
    <div className={cn("overflow-hidden relative", className)}>
      <motion.div
        initial={{ opacity: 0.9 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{
          duration: 0.6,
          delay,
          ease: "easeOut",
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
