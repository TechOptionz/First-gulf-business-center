import React from "react";
import { Star, CheckCircle, Quote } from "lucide-react";
import Card, { CardText, CardFooter } from "@/components/ui/Card";

/* ---------------------------------------------------------------------------
 * Testimonial card. Reviews vary in length, so the quote area flexes and the
 * attribution block is pinned to the bottom of the card.
 * ------------------------------------------------------------------------- */

interface TestimonialCardProps {
  review: string;
  name: string;
  role: string;
  rating: number;
  verified?: boolean;
}

export default function TestimonialCard({
  review,
  name,
  role,
  rating,
  verified = false,
}: TestimonialCardProps) {
  return (
    <Card>
      {/* Decorative mark, kept out of the text flow and clear of the copy by
          the padding-right on the rating row. */}
      <Quote
        aria-hidden="true"
        className="pointer-events-none absolute right-5 top-5 h-9 w-9 text-brass-300/50 transition-colors group-hover/card:text-brass-400/80 lg:right-7 lg:top-7"
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <div
          className="mb-4 flex items-center gap-1 pr-12 text-amber-500"
          aria-label={`${rating} out of 5 stars`}
        >
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} aria-hidden="true" className="h-[18px] w-[18px] fill-current" />
          ))}
        </div>

        <CardText className="italic text-charcoal-900">
          &ldquo;{review}&rdquo;
        </CardText>
      </div>

      <CardFooter className="flex min-w-0 flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <div className="min-w-0">
          <p className="font-serif text-lg font-bold leading-snug text-charcoal-950 transition-colors group-hover/card:text-maroon-800">
            {name}
          </p>
          <p className="text-sm font-medium leading-snug text-charcoal-700">{role}</p>
        </div>

        {verified && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-sm border border-green-300 bg-green-50 px-2.5 py-1 text-xs font-bold text-green-800">
            <CheckCircle aria-hidden="true" className="h-3.5 w-3.5" />
            Verified
          </span>
        )}
      </CardFooter>
    </Card>
  );
}
