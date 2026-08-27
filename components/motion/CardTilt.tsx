"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsCompactViewport } from "@/lib/use-media-query";

interface CardTiltProps {
  children: React.ReactNode;
  maxTilt?: number;
  className?: string;
}

export default function CardTilt({
  children,
  maxTilt = 2,
  className = "",
}: CardTiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch = useIsCompactViewport();
  const shouldReduceMotion = useReducedMotion();

  // The tilt wrapper sits between the grid item and the card, so it has to
  // forward the stretched row height for `h-full` cards to equalise.
  const wrapperClass = cn("flex h-full min-w-0 flex-col", className);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(x, { stiffness: 300, damping: 25 });
  const rotateY = useSpring(y, { stiffness: 300, damping: 25 });


  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = -((mouseY - centerY) / centerY) * maxTilt;
    const rY = ((mouseX - centerX) / centerX) * maxTilt;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (isTouch || shouldReduceMotion) {
    return <div className={wrapperClass}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // Without an explicit perspective the rotation renders as a flat squash
      // rather than depth, which reads as the card changing size on hover.
      style={{ rotateX, rotateY, transformPerspective: 1200, transformStyle: "preserve-3d" }}
      className={wrapperClass}
    >
      {children}
    </motion.div>
  );
}
