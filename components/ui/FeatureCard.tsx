import React from "react";
import Card, {
  CardTitle,
  CardText,
  CardIcon,
  CardFooter,
} from "@/components/ui/Card";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
 * Imageless card used for pillars, value props, amenities, process steps and
 * contact pathways.
 *
 *   layout="stacked"    icon above the title (pillar / value card)
 *   layout="horizontal" icon beside the text (amenity / contact-pathway card)
 *
 * Both layouts share the same padding, radius, border and CTA baseline as the
 * image cards, so mixed sections still line up.
 * ------------------------------------------------------------------------- */

interface FeatureCardProps {
  icon?: React.ReactNode;
  iconTone?: "maroon" | "brass" | "cream" | "dark";
  eyebrow?: string;
  title: string;
  description?: string;
  /** Short supporting points. Rendered as a bulleted list. */
  points?: string[];
  /** Small chip shown next to the title. Wraps rather than overlapping it. */
  tag?: string;
  layout?: "stacked" | "horizontal";
  size?: "compact" | "standard";
  brassAccent?: boolean;
  highlight?: boolean;
  className?: string;
  /** Extra content below the description (links, phone numbers, addresses). */
  children?: React.ReactNode;
  /** Pinned to the bottom of the card. */
  footer?: React.ReactNode;
}

export default function FeatureCard({
  icon,
  iconTone = "maroon",
  eyebrow,
  title,
  description,
  points,
  tag,
  layout = "stacked",
  size = "standard",
  brassAccent = false,
  highlight = false,
  className,
  children,
  footer,
}: FeatureCardProps) {
  const heading = (
    <>
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase leading-snug tracking-[0.08em] text-maroon-800">
          {eyebrow}
        </p>
      )}

      {/* Title and tag share a wrapping row so a long title pushes the tag to
          the next line instead of colliding with it. */}
      <div className="flex min-w-0 flex-wrap items-baseline gap-x-2.5 gap-y-1.5">
        <CardTitle size={size} className="min-w-0">
          {title}
        </CardTitle>
        {tag && (
          <span className="shrink-0 rounded-sm border border-maroon-300 bg-maroon-100 px-2 py-0.5 text-sm font-bold uppercase leading-snug tracking-wider text-maroon-950">
            {tag}
          </span>
        )}
      </div>

      {description && <CardText className="mt-2.5">{description}</CardText>}

      {points && points.length > 0 && (
        <ul className="mt-4 space-y-2 border-t border-cream-200 pt-4">
          {points.map((point) => (
            <li
              key={point}
              className="flex min-w-0 items-start gap-2.5 text-[0.9375rem] leading-[1.55] text-charcoal-800 sm:text-base"
            >
              <span
                className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-brass-500"
                aria-hidden="true"
              />
              <span className="min-w-0">{point}</span>
            </li>
          ))}
        </ul>
      )}

      {children && <div className="mt-4 min-w-0">{children}</div>}
    </>
  );

  return (
    <Card
      brassAccent={brassAccent}
      className={cn(
        highlight && "border-brass-400 bg-cream-50/90 shadow-luxury hover:border-maroon-800",
        className
      )}
    >
      {layout === "horizontal" ? (
        <div className="flex min-w-0 flex-1 items-start gap-4">
          {icon && (
            <CardIcon tone={iconTone} className="mt-0.5">
              {icon}
            </CardIcon>
          )}
          <div className="flex min-w-0 flex-1 flex-col">{heading}</div>
        </div>
      ) : (
        <div className="flex min-w-0 flex-1 flex-col">
          {icon && (
            <CardIcon tone={iconTone} className="mb-5">
              {icon}
            </CardIcon>
          )}
          {heading}
        </div>
      )}

      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}
