import React from "react";
import {
  ArrowRight,
  Calendar,
  Shield,
  CheckCircle,
  Award,
  MapPin,
  ChevronDown,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import TextReveal from "@/components/motion/TextReveal";
import FadeUp from "@/components/motion/FadeUp";
import MagneticButton from "@/components/motion/MagneticButton";
import HeroSlideshow from "@/components/sections/HeroSlideshow";

export default function HeroSection() {
  return (
    <section
      aria-label="First Gulf Business Center Executive Workspace Overview"
      className="relative min-h-[85dvh] lg:min-h-[92vh] flex items-center bg-charcoal-950 text-white overflow-hidden"
    >
      {/* Background Continuous Image Slideshow Layer (Isolated Client Component) */}
      <HeroSlideshow />

      {/* Main Hero Stable Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <div className="max-w-3xl">
          {/* Eyebrow / Location Pill */}
          <FadeUp delay={0.1} distance={15}>
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-5 sm:mb-6">
              <Badge variant="dark" dot>
                Madina Mall • Al Muhaisnah 4, Dubai
              </Badge>
              <span className="hidden sm:inline-block text-xs sm:text-sm font-bold tracking-widest text-brass-400 uppercase">
                • DED & RERA Approved
              </span>
            </div>
          </FadeUp>

          {/* Main Editorial Headline */}
          <TextReveal
            as="h1"
            delay={0.2}
            className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.15] mb-5 sm:mb-6"
          >
            Executive Workspaces Tailored for Success in Dubai
          </TextReveal>

          {/* Value Prop Subtext */}
          <FadeUp delay={0.45} distance={20}>
            <p className="text-lg sm:text-xl md:text-2xl text-cream-100 leading-relaxed mb-8 max-w-2xl font-normal">
              Elevate your enterprise with luxury serviced offices, flexible coworking desks, certified EJARI & Estidama virtual leases, and comprehensive UAE company formation services.
            </p>
          </FadeUp>

          {/* Action CTAs */}
          <FadeUp delay={0.6} distance={20}>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
              <MagneticButton>
                <Button
                  href="/book-a-tour"
                  variant="gold"
                  size="lg"
                  icon={<Calendar className="w-5 h-5" />}
                >
                  Book an Executive Tour
                </Button>
              </MagneticButton>

              <MagneticButton>
                <Button
                  href="/office-space"
                  variant="dark"
                  size="lg"
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  Explore Workspaces
                </Button>
              </MagneticButton>
            </div>
          </FadeUp>

          {/* Trust Highlights Strip */}
          <FadeUp delay={0.75} distance={15}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-charcoal-800/80 text-sm sm:text-base">
              <div className="flex items-center gap-2.5">
                <Shield className="w-5 h-5 text-brass-400 shrink-0" />
                <span className="text-cream-100 font-bold">100% EJARI Compliant</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-5 h-5 text-brass-400 shrink-0" />
                <span className="text-cream-100 font-bold">Move-In Same Day</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Award className="w-5 h-5 text-brass-400 shrink-0" />
                <span className="text-cream-100 font-bold">24/7 Operations</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-5 h-5 text-brass-400 shrink-0" />
                <span className="text-cream-100 font-bold">Mall Parking Direct</span>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Tasteful Bottom Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-cream-200 hover:text-brass-300 transition-colors cursor-pointer hidden lg:flex font-semibold text-xs animate-bounce">
        <span className="uppercase tracking-widest mb-1">Scroll to Explore</span>
        <ChevronDown className="w-5 h-5 text-brass-400" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-brass-500/60 to-transparent z-10" />
    </section>
  );
}
