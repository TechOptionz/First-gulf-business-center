"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Calendar,
  Clock,
  MapPin,
  Building2,
  Sparkles,
  ShieldCheck,
  Briefcase,
  Layers,
  Award,
} from "lucide-react";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import MagneticButton from "@/components/motion/MagneticButton";
import { NAVIGATION_LINKS, COMPANY_DETAILS } from "@/data/content";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change & manage body scroll lock
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.setAttribute("data-mobile-menu-open", "true");
    } else {
      document.body.style.overflow = "";
      document.body.removeAttribute("data-mobile-menu-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.removeAttribute("data-mobile-menu-open");
    };
  }, [mobileMenuOpen]);

  const toggleMobileSubmenu = (name: string) => {
    setMobileExpanded((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const getSubmenuIcon = (href: string) => {
    if (href.includes("coworking")) return <Building2 className="w-4 h-4 text-brass-700" />;
    if (href.includes("virtual-office")) return <ShieldCheck className="w-4 h-4 text-brass-700" />;
    if (href.includes("freezone")) return <Sparkles className="w-4 h-4 text-brass-700" />;
    if (href.includes("business-setup")) return <Briefcase className="w-4 h-4 text-brass-700" />;
    if (href.includes("corporate-solutions")) return <Layers className="w-4 h-4 text-brass-700" />;
    if (href.includes("trademark")) return <Award className="w-4 h-4 text-brass-700" />;
    return <Building2 className="w-4 h-4 text-brass-700" />;
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-charcoal-950 text-cream-100 text-sm py-2.5 px-4 border-b border-charcoal-800 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-medium">
          <div className="flex items-center space-x-6 text-sm text-cream-200">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brass-400 shrink-0" />
              2nd Floor, Madina Mall, Office 2–20, Al Muhaisnah 4, Dubai
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-brass-400 shrink-0" />
              24/7 Operations & Dedicated Concierge
            </span>
          </div>

          <div className="flex items-center space-x-5">
            <a
              href={`tel:${COMPANY_DETAILS.phonePrimaryTel}`}
              className="flex items-center gap-2 text-brass-300 hover:text-white font-bold transition-colors"
            >
              <Phone className="w-4 h-4 text-brass-400" />
              <span>{COMPANY_DETAILS.phonePrimary}</span>
            </a>
            <span className="text-charcoal-600">|</span>
            <a
              href={`tel:${COMPANY_DETAILS.phoneSecondaryTel}`}
              className="flex items-center gap-2 text-brass-300 hover:text-white font-bold transition-colors"
            >
              <Phone className="w-4 h-4 text-brass-400" />
              <span>{COMPANY_DETAILS.phoneSecondary}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/98 backdrop-blur-md shadow-xs py-3 border-b border-[#E2DAD0] w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex-shrink-0 mr-6 lg:mr-8 xl:mr-12">
            <Logo
              width={180}
              height={62}
              priority
              className="transition-opacity duration-200"
            />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-3 shrink-0">
            {NAVIGATION_LINKS.map((link) => {
              const hasChildren = link.children && link.children.length > 0;
              const isActive =
                pathname === link.href ||
                (hasChildren && pathname.startsWith(link.href) && link.href !== "/");

              if (!hasChildren) {
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "px-3 py-2 text-xs lg:text-sm xl:text-base font-bold tracking-wide uppercase whitespace-nowrap transition-colors rounded-sm relative group",
                      isActive
                        ? "text-maroon-900 bg-maroon-50/90"
                        : "text-charcoal-900 hover:text-maroon-800 hover:bg-cream-100"
                    )}
                  >
                    <span className="whitespace-nowrap">{link.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-maroon-800"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              }

              return (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "px-3 py-2 text-xs lg:text-sm xl:text-base font-bold tracking-wide uppercase whitespace-nowrap transition-colors rounded-sm inline-flex items-center gap-1.5 relative group",
                      isActive
                        ? "text-maroon-900 bg-maroon-50/90"
                        : "text-charcoal-900 hover:text-maroon-800 hover:bg-cream-100"
                    )}
                  >
                    <span className="whitespace-nowrap">{link.name}</span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform duration-200 text-brass-700 shrink-0",
                        activeDropdown === link.name && "rotate-180"
                      )}
                    />
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-maroon-800"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </Link>

                  {/* Desktop Dropdown Animated Mega-Menu */}
                  <AnimatePresence>
                    {activeDropdown === link.name && (
                      <motion.div
                        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
                        className="absolute top-full left-0 w-84 bg-white border border-brass-300 rounded-sm shadow-luxury-hover p-2.5 mt-1 z-50"
                      >
                        <div className="p-2 border-b border-cream-200 mb-1.5 bg-cream-50">
                          <span className="text-xs font-bold tracking-widest text-maroon-900 uppercase">
                            {link.name} Categories
                          </span>
                        </div>
                        <div className="space-y-1">
                          {link.children?.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="p-3 rounded-sm hover:bg-cream-100 transition-colors flex items-start gap-3 group"
                            >
                              <div className="w-8 h-8 rounded-sm bg-maroon-50 border border-maroon-200 flex items-center justify-center shrink-0 group-hover:bg-maroon-800 group-hover:text-white transition-colors">
                                {getSubmenuIcon(subItem.href)}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="font-serif text-base font-bold text-charcoal-950 group-hover:text-maroon-800 transition-colors">
                                    {subItem.name}
                                  </span>
                                  {subItem.badge && (
                                    <span className="text-xs uppercase tracking-wider font-bold px-2 py-0.5 bg-brass-100 text-brass-900 rounded-xs border border-brass-300">
                                      {subItem.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs sm:text-sm text-charcoal-700 mt-1 leading-snug font-normal">
                                  {subItem.description}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Right Header Action: Book a Tour */}
          <div className="hidden sm:flex items-center space-x-3">
            <a
              href={`tel:${COMPANY_DETAILS.phonePrimaryTel}`}
              className="hidden xl:inline-flex items-center gap-1.5 text-sm font-bold text-charcoal-900 hover:text-maroon-800 py-2 px-3 rounded-sm border border-transparent hover:border-cream-300"
            >
              <Phone className="w-4 h-4 text-brass-700" />
              <span>Call Us</span>
            </a>

            <MagneticButton>
              <Button
                href="/book-a-tour"
                variant="primary"
                size="sm"
                icon={<Calendar className="w-4 h-4" />}
              >
                Book a Tour
              </Button>
            </MagneticButton>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <Button
              href="/book-a-tour"
              variant="primary"
              size="sm"
              className="text-xs px-3 py-2 sm:hidden font-bold"
            >
              Book Tour
            </Button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-sm text-charcoal-900 hover:text-maroon-800 hover:bg-cream-100 transition-colors focus:outline-none focus:ring-2 focus:ring-maroon-800"
              aria-label={mobileMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-charcoal-950/70 backdrop-blur-xs"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative ml-auto w-full max-w-sm bg-white h-full shadow-2xl flex flex-col z-50 overflow-y-auto border-l border-brass-300"
            >
              {/* Drawer Header */}
              <div className="p-4 border-b border-cream-200 flex items-center justify-between bg-cream-50">
                <Logo width={160} height={55} />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-charcoal-900 hover:text-maroon-800 rounded-sm"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Quick Contact Header inside Drawer */}
              <div className="p-3.5 bg-maroon-900 text-white text-sm flex items-center justify-between font-medium">
                <a
                  href={`tel:${COMPANY_DETAILS.phonePrimaryTel}`}
                  className="flex items-center gap-2 text-brass-300 font-bold"
                >
                  <Phone className="w-4 h-4 text-brass-300" />
                  <span>{COMPANY_DETAILS.phonePrimary}</span>
                </a>
                <span className="text-xs text-cream-200 font-semibold">Madina Mall, Dubai</span>
              </div>

              {/* Nav Items List */}
              <div className="p-4 space-y-2.5 flex-1">
                {NAVIGATION_LINKS.map((link) => {
                  const hasChildren = link.children && link.children.length > 0;
                  const isExpanded = mobileExpanded[link.name];

                  if (!hasChildren) {
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={cn(
                          "block px-4 py-3.5 text-lg font-serif font-bold uppercase rounded-sm border transition-colors",
                          pathname === link.href
                            ? "bg-maroon-50 text-maroon-900 border-maroon-300"
                            : "text-charcoal-950 border-transparent hover:bg-cream-100"
                        )}
                      >
                        {link.name}
                      </Link>
                    );
                  }

                  return (
                    <div key={link.name} className="border border-cream-200 rounded-sm overflow-hidden">
                      <div className="flex items-center justify-between bg-cream-50 pr-2">
                        <Link
                          href={link.href}
                          className="flex-1 px-4 py-3.5 text-lg font-serif font-bold uppercase text-charcoal-950 hover:text-maroon-800"
                        >
                          {link.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => toggleMobileSubmenu(link.name)}
                          className="p-2.5 text-charcoal-700 hover:text-maroon-800"
                          aria-label={`Toggle ${link.name} sub-menu`}
                        >
                          <ChevronDown
                            className={cn(
                              "w-5 h-5 transition-transform duration-200 text-brass-700",
                              isExpanded && "rotate-180"
                            )}
                          />
                        </button>
                      </div>

                      {isExpanded && (
                        <div className="p-2.5 bg-white space-y-2 border-t border-cream-200">
                          {link.children?.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="p-3 rounded-sm hover:bg-cream-100 flex items-start gap-3 block text-left"
                            >
                              <div className="w-7 h-7 rounded-sm bg-maroon-50 flex items-center justify-center shrink-0 mt-0.5">
                                {getSubmenuIcon(subItem.href)}
                              </div>
                              <div>
                                <div className="font-bold text-sm text-charcoal-950">
                                  {subItem.name}
                                </div>
                                <div className="text-xs text-charcoal-700 line-clamp-1 font-normal">
                                  {subItem.description}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Drawer Footer CTAs */}
              <div className="p-4 border-t border-cream-200 bg-cream-50 space-y-3">
                <Button
                  href="/book-a-tour"
                  variant="primary"
                  size="md"
                  fullWidth
                  icon={<Calendar className="w-4 h-4" />}
                >
                  Schedule Tour
                </Button>
                <Button
                  href={`https://wa.me/971527900335?text=Hello%20First%20Gulf%20Business%20Center%2C%20I%20would%20like%20to%20inquire%20about%20your%20office%20spaces.`}
                  target="_blank"
                  variant="gold"
                  size="md"
                  fullWidth
                >
                  Chat on WhatsApp
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
