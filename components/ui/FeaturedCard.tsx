import React from "react";
import Card, {
  CardMedia,
  CardEyebrow,
  CardTitle,
  CardText,
  CardMeta,
  CARD_PADDING,
} from "@/components/ui/Card";
import { CARD_IMAGE_SIZES } from "@/components/ui/CardGrid";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
 * Featured editorial card — a balanced image/content split on desktop that
 * stacks image-above-content on mobile.
 *
 * The split is a true 50/50 grid rather than a 12-column span, so neither side
 * can collapse into a sliver. Padding matches the standard cards.
 * ------------------------------------------------------------------------- */

interface FeaturedCardProps {
  image: string;
  imageAlt?: string;
  eyebrow?: string;
  title: string;
  tagline?: string;
  description: string;
  /** Rendered inside a bordered panel under the description. */
  details?: { label: string; items: string[] };
  meta?: React.ReactNode;
  actions?: React.ReactNode;
  /** Flips the desktop column order. DOM order (image first) is unchanged. */
  reverse?: boolean;
  priority?: boolean;
  id?: string;
  className?: string;
}

export default function FeaturedCard({
  image,
  imageAlt,
  eyebrow,
  title,
  tagline,
  description,
  details,
  meta,
  actions,
  reverse = false,
  priority = false,
  id,
  className,
}: FeaturedCardProps) {
  return (
    <Card
      id={id}
      padded={false}
      hoverEffect={false}
      className={cn("bg-cream-50/60", className)}
    >
      <div className="grid min-w-0 grid-cols-1 items-center gap-0 lg:grid-cols-2">
        <div
          className={cn(
            "min-w-0",
            // Image sits first in the DOM so mobile reading order is
            // image -> content on every row, reversed or not.
            reverse ? "lg:order-2" : "lg:order-1"
          )}
        >
          <CardMedia
            src={image}
            alt={imageAlt ?? title}
            ratio="4/3"
            sizes={CARD_IMAGE_SIZES.featured}
            overlay="none"
            zoomOnHover={false}
            priority={priority}
            className="sm:aspect-[16/10] lg:aspect-[4/3]"
          />
        </div>

        <div
          className={cn(
            "flex min-w-0 flex-col",
            CARD_PADDING,
            reverse ? "lg:order-1" : "lg:order-2"
          )}
        >
          {eyebrow && <CardEyebrow tone="maroon">{eyebrow}</CardEyebrow>}

          <CardTitle as="h3" size="featured">
            {title}
          </CardTitle>

          {tagline && (
            <p className="mt-2.5 text-sm font-semibold uppercase leading-snug tracking-[0.08em] text-brass-800">
              {tagline}
            </p>
          )}

          <CardText className="mt-4">{description}</CardText>

          {details && details.items.length > 0 && (
            <div className="mt-5 rounded-sm border border-cream-200 bg-white p-4 sm:p-5">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-charcoal-900">
                {details.label}
              </p>
              <ul className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                {details.items.map((item) => (
                  <li
                    key={item}
                    className="flex min-w-0 items-start gap-2 text-[0.9375rem] leading-[1.5] text-charcoal-800"
                  >
                    <span
                      className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-maroon-800"
                      aria-hidden="true"
                    />
                    <span className="min-w-0">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {meta && <CardMeta className="mt-5">{meta}</CardMeta>}

          {actions && (
            <div className="mt-6 flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              {actions}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
