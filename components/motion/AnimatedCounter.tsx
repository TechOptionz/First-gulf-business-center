"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 1.5,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const [displayValue, setDisplayValue] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  // Reduced motion is derived at render time rather than pushed through an
  // effect, so the final value is painted on the first frame.
  useEffect(() => {
    if (shouldReduceMotion || !isInView) return;

    {
      let startTime: number | null = null;
      let animationFrameId: number;

      const updateCounter = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        // Easing out quad
        const easeOutQuad = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeOutQuad * value);

        setDisplayValue(current);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(updateCounter);
        } else {
          setDisplayValue(value);
        }
      };

      animationFrameId = requestAnimationFrame(updateCounter);

      return () => cancelAnimationFrame(animationFrameId);
    }
  }, [isInView, value, duration, shouldReduceMotion]);

  const rendered = shouldReduceMotion ? value : displayValue;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {rendered}
      {suffix}
    </span>
  );
}
