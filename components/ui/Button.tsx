import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "gold" | "dark" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  target?: string;
  rel?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  /** Trailing arrow that nudges on hover. Shorthand for the common CTA. */
  withArrow?: boolean;
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  target,
  rel,
  icon,
  iconPosition = "right",
  withArrow = false,
  fullWidth = false,
  className,
  disabled,
  type = "button",
  onClick,
  ...props
}: ButtonProps) {
  const baseStyles =
    // `min-h-[44px]` on every size keeps these usable as touch targets.
    // The label wraps rather than truncating, so long CTA text stays readable.
    "inline-flex items-center justify-center text-center font-bold tracking-wider leading-snug transition-[background-color,border-color,box-shadow,transform,color] duration-300 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-700 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer group/btn select-none min-w-0";

  const sizeStyles = {
    sm: "px-4 py-2.5 text-[0.9375rem] font-bold uppercase tracking-wider gap-2 min-h-[44px]",
    md: "px-6 py-3.5 text-base font-bold tracking-wider uppercase gap-2.5 min-h-[48px]",
    lg: "px-8 py-4 text-base sm:text-lg font-bold tracking-wider uppercase gap-3 min-h-[54px]",
  };

  // Each variant carries its own hover glow, tinted to sit well on the
  // background it is normally used against.
  const variantStyles = {
    primary:
      "bg-maroon-800 text-white shadow-luxury hover:bg-maroon-900 hover:shadow-[0_10px_28px_-8px_rgba(107,17,36,0.55)] border border-maroon-700 active:translate-y-0.5 active:shadow-luxury",
    secondary:
      "bg-cream-100 text-maroon-900 border-2 border-brass-400 hover:bg-cream-200 hover:border-brass-500 shadow-sm hover:shadow-[0_10px_24px_-10px_rgba(180,140,80,0.55)] active:translate-y-0.5",
    gold:
      "bg-brass-400 text-charcoal-950 font-bold hover:bg-brass-300 shadow-luxury hover:shadow-[0_10px_28px_-8px_rgba(197,168,128,0.65)] border border-brass-300 active:translate-y-0.5 active:shadow-luxury",
    dark:
      "bg-charcoal-950 text-white border border-brass-400/50 hover:bg-black hover:border-brass-400 hover:shadow-[0_10px_28px_-8px_rgba(197,168,128,0.45)] active:translate-y-0.5",
    outline:
      "bg-transparent text-maroon-900 border-2 border-maroon-800 hover:bg-maroon-800 hover:text-white hover:shadow-[0_10px_24px_-10px_rgba(107,17,36,0.5)] active:translate-y-0.5",
    ghost:
      "bg-transparent text-charcoal-900 hover:text-maroon-800 hover:bg-cream-200/80 p-0 shadow-none",
  };

  const buttonClasses = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    fullWidth && "w-full",
    className
  );

  const resolvedIcon =
    icon ?? (withArrow ? <ArrowRight className="h-4 w-4" /> : null);

  // Only the arrow slides on hover -- it reads as "go". A literal icon
  // (calendar, phone) drifting sideways just looks like the button is loose.
  const iconElement = resolvedIcon && (
    <span
      aria-hidden="true"
      className={cn(
        "shrink-0",
        withArrow &&
          !icon &&
          "transition-transform duration-300 group-hover/btn:translate-x-0.5"
      )}
    >
      {resolvedIcon}
    </span>
  );

  const content = (
    <>
      {resolvedIcon && iconPosition === "left" && iconElement}
      <span className="min-w-0 text-balance">{children}</span>
      {resolvedIcon && iconPosition === "right" && iconElement}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        className={buttonClasses}
        aria-disabled={disabled}
        // The link branch used to swallow `onClick`, so CTAs that also needed
        // to run a handler (closing the mobile drawer, scrolling to a form
        // when the href points at the page you are already on) silently did
        // nothing on tap.
        onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
}
