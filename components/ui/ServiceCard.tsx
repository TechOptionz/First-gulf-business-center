import React from "react";
import { Check } from "lucide-react";
import Card, {
  CardMedia,
  CardBody,
  CardEyebrow,
  CardTitle,
  CardText,
  CardMeta,
  CardFooter,
} from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { CARD_IMAGE_SIZES } from "@/components/ui/CardGrid";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
 * Standard content card: image -> chip -> eyebrow -> title -> description ->
 * feature list -> metadata -> CTA.
 *
 * Used for every workspace and consultancy offering, on the homepage and on
 * the section landing pages, so the same record always renders identically.
 * ------------------------------------------------------------------------- */

interface CardAction {
  href: string;
  label: string;
}

interface ServiceCardProps {
  image: string;
  imageAlt?: string;
  /** Chip laid over the photo. Kept to a single short phrase. */
  chip?: string;
  chipVariant?: "maroon" | "brass" | "dark" | "outline";
  eyebrow?: string;
  title: string;
  tagline?: string;
  description: string;
  features?: string[];
  featuresLabel?: string;
  featureIcon?: React.ReactNode;
  /** Small print above the actions, e.g. a pricing note. */
  note?: string;
  primaryCta: CardAction;
  secondaryCta?: CardAction;
  brassAccent?: boolean;
  className?: string;
  imageSizes?: string;
}

export default function ServiceCard({
  image,
  imageAlt,
  chip,
  chipVariant = "maroon",
  eyebrow,
  title,
  tagline,
  description,
  features,
  featuresLabel,
  featureIcon,
  note,
  primaryCta,
  secondaryCta,
  brassAccent = false,
  className,
  imageSizes = CARD_IMAGE_SIZES.editorial,
}: ServiceCardProps) {
  return (
    <Card brassAccent={brassAccent} padded={false} className={className}>
      <CardMedia
        src={image}
        alt={imageAlt ?? title}
        ratio="4/3"
        sizes={imageSizes}
        overlay={chip ? "soft" : "none"}
        objectPosition="center"
      >
        {chip && (
          // Chips wrap instead of stretching the card, and sit clear of the
          // title, which lives in the body rather than over the photo.
          <div className="absolute inset-x-4 bottom-4 z-20 flex flex-wrap gap-2">
            <Badge variant={chipVariant} className="bg-white/95 shadow-sm">
              {chip}
            </Badge>
          </div>
        )}
      </CardMedia>

      <CardBody>
        {eyebrow && <CardEyebrow tone="maroon">{eyebrow}</CardEyebrow>}

        <CardTitle className="transition-colors group-hover/card:text-maroon-800">
          {title}
        </CardTitle>

        {tagline && (
          <p className="mt-2 text-sm font-semibold uppercase leading-snug tracking-[0.08em] text-brass-800">
            {tagline}
          </p>
        )}

        <CardText className="mt-3">{description}</CardText>

        {features && features.length > 0 && (
          <div className="mt-5 border-t border-cream-200 pt-5">
            {featuresLabel && (
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-charcoal-900">
                {featuresLabel}
              </p>
            )}
            <ul className="space-y-2.5">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex min-w-0 items-start gap-2.5 text-[0.9375rem] font-medium leading-[1.55] text-charcoal-900 sm:text-base"
                >
                  <span className="mt-[3px] shrink-0 text-maroon-800" aria-hidden="true">
                    {featureIcon ?? <Check className="h-4 w-4" />}
                  </span>
                  <span className="min-w-0">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <CardFooter className={cn(note ? "space-y-4" : undefined)}>
          {note && (
            <CardMeta className="italic">
              <span className="min-w-0">{note}</span>
            </CardMeta>
          )}

          <div
            className={cn(
              "flex min-w-0 flex-col gap-2.5",
              secondaryCta && "sm:flex-row sm:items-stretch"
            )}
          >
            <Button
              href={primaryCta.href}
              variant="primary"
              size="sm"
              fullWidth
              withArrow
            >
              {primaryCta.label}
            </Button>

            {secondaryCta && (
              <Button
                href={secondaryCta.href}
                variant="secondary"
                size="sm"
                className="sm:w-auto sm:shrink-0 sm:px-5"
                fullWidth
              >
                {secondaryCta.label}
              </Button>
            )}
          </div>
        </CardFooter>
      </CardBody>
    </Card>
  );
}
