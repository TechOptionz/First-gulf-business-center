import React from "react";
import Image from "next/image";
import ImageReveal from "@/components/motion/ImageReveal";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
 * Card system
 *
 * Every card on the site is assembled from these primitives so that same-type
 * cards in a row line up: shell -> media -> body (eyebrow / title / text /
 * meta) -> footer. The shell is always `h-full flex flex-col`, the body is
 * `flex-1 flex flex-col`, and the footer is pushed down with `mt-auto`, which
 * keeps CTAs on a common baseline without absolute positioning or fixed
 * heights.
 *
 * Padding follows the Stitch "Executive Heritage" spec: 20px mobile,
 * 24px tablet, 32px desktop.
 * ------------------------------------------------------------------------- */

export const CARD_PADDING = "p-5 sm:p-6 lg:p-8";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  brassAccent?: boolean;
  dark?: boolean;
  /** Set false for cards whose media is flush with the card edge. */
  padded?: boolean;
}

export default function Card({
  children,
  className,
  hoverEffect = true,
  brassAccent = false,
  dark = false,
  padded = true,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        // `min-w-0` stops long words/URLs from forcing a grid column wider
        // than its track; `h-full` is what actually equalises row heights.
        "group/card relative flex h-full min-w-0 flex-col overflow-hidden rounded-sm border",
        // Only paint/transform properties animate, so hover never reflows
        // neighbouring cards.
        "transition-[border-color,box-shadow,transform] duration-300 will-change-transform",
        padded && CARD_PADDING,
        dark
          ? "bg-charcoal-900/90 text-cream-50 border-charcoal-800 shadow-card"
          : "bg-white text-charcoal-900 border-[#E8E2D8] shadow-card",
        hoverEffect &&
          (dark
            ? "hover:border-brass-400/50 hover:shadow-luxury-hover hover:-translate-y-1 active:translate-y-0 active:border-brass-400"
            : "hover:border-brass-400 hover:shadow-luxury-hover hover:-translate-y-1 active:translate-y-0 active:border-brass-400 active:shadow-luxury"),
        className
      )}
      {...props}
    >
      {brassAccent && (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[3px] bg-gradient-to-r from-brass-400 via-brass-200 to-brass-400" />
      )}
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

const RATIO_CLASS = {
  /** Standard editorial card. */
  "4/3": "aspect-[4/3]",
  /** Wide horizontal / featured card. */
  "16/10": "aspect-[16/10]",
  /** Compact insight card. */
  "3/2": "aspect-[3/2]",
  "1/1": "aspect-square",
} as const;

const OVERLAY_CLASS = {
  none: null,
  /** Enough scrim to keep a chip legible without dimming the photo. */
  soft: "bg-gradient-to-t from-black/60 via-black/10 to-transparent",
  /** For light text sitting directly on the image. */
  strong: "bg-gradient-to-t from-black/80 via-black/30 to-black/10",
} as const;

interface CardMediaProps {
  src: string;
  alt: string;
  ratio?: keyof typeof RATIO_CLASS;
  sizes: string;
  priority?: boolean;
  /** Keeps the meaningful part of the photo in frame after mobile cropping. */
  objectPosition?: string;
  overlay?: keyof typeof OVERLAY_CLASS;
  zoomOnHover?: boolean;
  reveal?: boolean;
  className?: string;
  /** Badges or labels layered over the image. */
  children?: React.ReactNode;
}

export function CardMedia({
  src,
  alt,
  ratio = "4/3",
  sizes,
  priority = false,
  objectPosition = "center",
  overlay = "soft",
  zoomOnHover = true,
  reveal = true,
  className,
  children,
}: CardMediaProps) {
  const overlayClass = OVERLAY_CLASS[overlay];

  const image = (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      style={{ objectPosition }}
      className={cn(
        "object-cover",
        zoomOnHover &&
          "transition-transform duration-700 group-hover/card:scale-[1.04]"
      )}
    />
  );

  return (
    <div
      className={cn(
        // The ratio box guarantees every image in a row is the same height.
        "relative w-full shrink-0 overflow-hidden bg-charcoal-900",
        RATIO_CLASS[ratio],
        className
      )}
    >
      {reveal ? <ImageReveal className="h-full w-full">{image}</ImageReveal> : image}

      {overlayClass && (
        <div className={cn("pointer-events-none absolute inset-0 z-10", overlayClass)} />
      )}

      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

/** Flexible content column. Everything between the media and the footer. */
export function CardBody({
  children,
  className,
  padded = true,
}: {
  children: React.ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 flex-col",
        padded && CARD_PADDING,
        className
      )}
    >
      {children}
    </div>
  );
}

/** Category / label line — 14px semibold per the Stitch `label-md` token. */
export function CardEyebrow({
  children,
  tone = "brass",
  className,
}: {
  children: React.ReactNode;
  tone?: "brass" | "maroon" | "light";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mb-2 text-sm font-semibold uppercase leading-snug tracking-[0.08em]",
        tone === "brass" && "text-brass-800",
        tone === "maroon" && "text-maroon-800",
        tone === "light" && "text-brass-300",
        className
      )}
    >
      {children}
    </p>
  );
}

/** Standard 20–24px title; `featured` steps up to 26–36px. */
export function CardTitle({
  children,
  as: Tag = "h3",
  size = "standard",
  dark = false,
  className,
}: {
  children: React.ReactNode;
  as?: "h2" | "h3" | "h4";
  size?: "compact" | "standard" | "featured";
  dark?: boolean;
  className?: string;
}) {
  return (
    <Tag
      className={cn(
        // `text-balance` avoids the orphaned single-word last line; titles are
        // never truncated, clamped or given a fixed height.
        "font-serif font-bold tracking-tight text-balance break-words hyphens-none",
        size === "compact" && "text-lg leading-[1.3] sm:text-xl",
        size === "standard" && "text-xl leading-[1.25] sm:text-2xl",
        size === "featured" &&
          "text-2xl leading-[1.18] sm:text-3xl lg:text-[2.25rem] lg:leading-[1.15]",
        dark ? "text-white" : "text-charcoal-950",
        className
      )}
    >
      {children}
    </Tag>
  );
}

/** Description copy — 16px mobile, 17px from `sm`, line-height ~1.65. */
export function CardText({
  children,
  dark = false,
  className,
}: {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-base leading-[1.65] text-pretty sm:text-[1.0625rem]",
        dark ? "text-cream-100" : "text-charcoal-800",
        className
      )}
    >
      {children}
    </p>
  );
}

/** Metadata row — never below 14px, wraps safely on mobile. */
export function CardMeta({
  children,
  dark = false,
  className,
}: {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1.5 text-sm leading-snug",
        dark ? "text-cream-200" : "text-charcoal-700",
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * Action area. `mt-auto` pins it to the bottom of the card, so CTAs across a
 * row align regardless of how much text sits above them.
 */
export function CardFooter({
  children,
  divider = true,
  dark = false,
  className,
}: {
  children: React.ReactNode;
  divider?: boolean;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mt-auto min-w-0 pt-5",
        divider && (dark ? "border-t border-charcoal-800" : "border-t border-cream-200"),
        className
      )}
    >
      {children}
    </div>
  );
}

/** Square icon tile used by pillar / feature / contact-pathway cards. */
export function CardIcon({
  children,
  tone = "maroon",
  size = "md",
  className,
}: {
  children: React.ReactNode;
  tone?: "maroon" | "brass" | "cream" | "dark";
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-sm border",
        size === "sm" ? "h-10 w-10" : "h-12 w-12",
        tone === "maroon" && "border-maroon-200 bg-maroon-50 text-maroon-800",
        tone === "brass" && "border-brass-300 bg-brass-100 text-brass-900",
        tone === "cream" && "border-cream-300 bg-cream-100 text-maroon-800",
        tone === "dark" && "border-brass-400 bg-maroon-800 text-brass-300",
        className
      )}
    >
      {children}
    </div>
  );
}
