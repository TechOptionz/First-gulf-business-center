"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface ScrollToTopProps {
  /** Distance scrolled (px) before the button appears. */
  threshold?: number;
}

export default function ScrollToTop({ threshold = 400 }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > threshold);

    handleScroll(); // account for a restored scroll position on mount
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  };

  const hidden = shouldReduceMotion
    ? { opacity: 0 }
    : { opacity: 0, scale: 0.8, y: 8 };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          initial={hidden}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={hidden}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="mb-3 w-12 h-12 rounded-full bg-maroon-800 text-white border border-brass-400/50 shadow-luxury-hover flex items-center justify-center cursor-pointer transition-colors duration-300 hover:bg-maroon-900 hover:border-brass-300 focus:outline-none focus:ring-2 focus:ring-brass-400 focus:ring-offset-2"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
