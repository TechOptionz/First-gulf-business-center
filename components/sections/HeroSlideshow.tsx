"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useIsCompactViewport } from "@/lib/use-media-query";

const HERO_SLIDES = [
  {
    id: "reception",
    src: "/images/hero/hero-premium-reception.webp",
    alt: "First Gulf Business Center Executive Reception Lobby in Dubai",
  },
  {
    id: "coworking",
    src: "/images/hero/hero-coworking-space.webp",
    alt: "Modern Coworking Space and Hot Desks at Madina Mall Dubai",
  },
  {
    id: "team-workspace",
    src: "/images/hero/hero-team-workspace.webp",
    alt: "Move-In-Ready Dedicated Team Office Suite in Dubai",
  },
  {
    id: "private-office",
    src: "/images/hero/hero-private-office.webp",
    alt: "Private Executive Serviced Office Suite overlooking Dubai Towers",
  },
  {
    id: "meeting-room",
    src: "/images/hero/hero-meeting-room.webp",
    alt: "High-Tech Boardroom and Conference Meeting Facility",
  },
];

export default function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  // The first slide is the LCP element. framer-motion serialises `initial` into
  // the SSR markup, so an `opacity: 0` start ships the hero photo already
  // downloaded but invisible until hydration finishes. Tracking whether the
  // deck has moved yet lets slide 0 render opaque on the server while every
  // later transition keeps its cross-fade.
  const [hasChangedSlide, setHasChangedSlide] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const isMobile = useIsCompactViewport();
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const nextSlide = useCallback(() => {
    setHasChangedSlide(true);
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setHasChangedSlide(true);
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setHasChangedSlide(true);
    setCurrentSlide(index);
  }, []);


  // IntersectionObserver: Pause when slideshow is outside viewport
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Page visibility API: Pause when browser tab is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(document.visibilityState === "visible");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Continuous auto-play slideshow timer (3.2s interval)
  useEffect(() => {
    if (shouldReduceMotion || !isInView || !isTabVisible) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 3200);

    return () => clearInterval(timer);
  }, [nextSlide, shouldReduceMotion, isInView, isTabVisible]);

  // Touch Swipe Gesture Handler
  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number } }
  ) => {
    if (info.offset.x < -40) {
      nextSlide();
    } else if (info.offset.x > 40) {
      prevSlide();
    }
  };

  // Only the untouched first slide skips the fade-in; once the deck has moved,
  // slide 0 cross-fades back in like every other slide.
  const isFirstPaint = currentSlide === 0 && !hasChangedSlide;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden select-none"
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          key={HERO_SLIDES[currentSlide].id}
          drag={isMobile ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          initial={
            isFirstPaint
              ? { opacity: 1, scale: 1.0 }
              : shouldReduceMotion
              ? { opacity: 0.9, scale: 1.0 }
              : { opacity: 0, scale: 1.0 }
          }
          animate={{ opacity: 1, scale: 1.10 }}
          exit={{ opacity: 0, scale: 1.12 }}
          transition={{
            opacity: { duration: 0.45, ease: "easeInOut" },
            scale: { duration: 3.6, ease: [0.25, 0.1, 0.25, 1.0] },
          }}
          className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing"
        >
          <Image
            src={HERO_SLIDES[currentSlide].src}
            alt={HERO_SLIDES[currentSlide].alt}
            fill
            priority={currentSlide === 0}
            className="object-cover object-center opacity-95 pointer-events-none"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Scrim Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/85 via-charcoal-950/45 to-transparent z-[1] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/50 via-transparent to-black/20 z-[1] pointer-events-none" />

      {/* Accessible Interactive Slide Navigation Dots */}
      <div className="absolute bottom-6 right-6 z-[10] flex items-center gap-2 pointer-events-auto">
        {HERO_SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => goToSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center`}
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                currentSlide === idx
                  ? "w-7 h-2 bg-brass-400"
                  : "w-2 h-2 bg-white/50 hover:bg-white/90"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
