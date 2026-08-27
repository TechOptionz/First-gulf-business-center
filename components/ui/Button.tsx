import React from "react";
import Link from "next/link";
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
  fullWidth = false,
  className,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-bold tracking-wider transition-all duration-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-maroon-700 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer group select-none";

  const sizeStyles = {
    sm: "px-4 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider gap-2 min-h-[42px]",
    md: "px-6 py-3.5 text-sm sm:text-base font-bold tracking-wider uppercase gap-2.5 min-h-[48px]",
    lg: "px-8 py-4.5 text-base sm:text-lg font-bold tracking-wider uppercase gap-3 min-h-[54px]",
  };

  const variantStyles = {
    primary:
      "bg-maroon-800 text-white shadow-luxury hover:bg-maroon-900 hover:shadow-luxury-hover border border-maroon-700 active:translate-y-0.5",
    secondary:
      "bg-cream-100 text-maroon-900 border-2 border-brass-400 hover:bg-cream-200 hover:border-brass-500 shadow-xs active:translate-y-0.5",
    gold:
      "bg-brass-400 text-charcoal-950 font-bold hover:bg-brass-300 shadow-luxury hover:shadow-luxury-hover border border-brass-300 active:translate-y-0.5",
    dark:
      "bg-charcoal-950 text-white border border-brass-400/50 hover:bg-black hover:border-brass-400 active:translate-y-0.5",
    outline:
      "bg-transparent text-maroon-900 border-2 border-maroon-800 hover:bg-maroon-800 hover:text-white active:translate-y-0.5",
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

  const iconElement = icon && (
    <span className="transition-transform duration-300 group-hover:translate-x-0.5 shrink-0">
      {icon}
    </span>
  );

  const content = (
    <>
      {icon && iconPosition === "left" && iconElement}
      <span className="truncate">{children}</span>
      {icon && iconPosition === "right" && iconElement}
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
      {...props}
    >
      {content}
    </button>
  );
}
