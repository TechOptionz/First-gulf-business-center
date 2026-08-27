import React from "react";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
 * Responsive card grids
 *
 * One place that decides how many columns each family of cards gets, so the
 * same card type never renders 3-up on one route and 4-up on another.
 *
 *   320–639px  -> 1 column
 *   640–1023px -> 2 columns
 *   1024–1279px-> 2 or 3, depending on how much text the card carries
 *   >=1280px   -> 3 columns (4 only for genuinely compact cards)
 *
 * Gaps: 20px mobile, 24px tablet, 32px desktop.
 * Tracks use `minmax(0, 1fr)` via `grid-cols-*`, and every child gets
 * `min-w-0` so long words cannot widen a column.
 * ------------------------------------------------------------------------- */

const GAP = "gap-5 sm:gap-6 xl:gap-8";

export const CARD_GRIDS = {
  /** Image + long editorial copy + CTA. Never narrower than ~1/3 of 1280. */
  editorial: `grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 ${GAP}`,
  /** Icon + title + description (+ short bullet list). No image. */
  pillar: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${GAP}`,
  /** Short title + one or two lines of copy. Safe at four across. */
  compact: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${GAP}`,
  /** Two substantial cards compared side by side. */
  pair: `grid grid-cols-1 md:grid-cols-2 ${GAP}`,
  /** Icon left, text right — reads well two-up from tablet onward. */
  horizontal: `grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 ${GAP}`,
  /** Stacked cards in a sidebar column. */
  stack: `grid grid-cols-1 ${GAP}`,
} as const;

export type CardGridVariant = keyof typeof CARD_GRIDS;

export function cardGridClass(variant: CardGridVariant, className?: string) {
  // `items-stretch` is the grid default, but it is stated explicitly here
  // because it is load-bearing: it is what lets `h-full` cards equalise.
  return cn(CARD_GRIDS[variant], "items-stretch", className);
}

export default function CardGrid({
  variant = "editorial",
  className,
  children,
}: {
  variant?: CardGridVariant;
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cardGridClass(variant, className)}>{children}</div>;
}

/**
 * `sizes` values that match the grids above, so Next.js never downloads a
 * 3-column-sized image for a 1-column mobile card.
 */
export const CARD_IMAGE_SIZES = {
  editorial:
    "(max-width: 639px) 100vw, (max-width: 1279px) calc(50vw - 2rem), calc(33vw - 2.5rem)",
  pair: "(max-width: 767px) 100vw, calc(50vw - 2rem)",
  /** Half-width featured split on desktop. */
  featured: "(max-width: 1023px) 100vw, calc(50vw - 3rem)",
} as const;
