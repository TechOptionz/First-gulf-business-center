"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsCompactViewport } from "@/lib/use-media-query";

interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  delay?: number;
  className?: string;
  once?: boolean;
}

export function StaggerContainer({
  children,
  staggerDelay = 0.07,
  delay = 0,
  className = "",
  once = true,
}: StaggerContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-30px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export function StaggerItem({ children, className = "" }: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsCompactViewport();

  // Grid items stretch to the row height, but that height only reaches an
  // `h-full` card if every wrapper in between passes it down. `min-w-0` keeps
  // the animation wrapper from widening its grid column.
  const wrapperClass = cn("flex h-full min-w-0 flex-col", className);


  if (shouldReduceMotion) {
    return <div className={wrapperClass}>{children}</div>;
  }

  const itemVariants = {
    hidden: isMobile
      ? { opacity: 0, y: 16 }
      : { opacity: 0, y: 20, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={wrapperClass}>
      {children}
    </motion.div>
  );
}
