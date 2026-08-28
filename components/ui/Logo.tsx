import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "light" | "dark" | "white" | "white-bg";
  className?: string;
  width?: number;
  height?: number;
  href?: string;
  priority?: boolean;
}

export default function Logo({
  variant = "light",
  className,
  width = 240,
  height = 80,
  href = "/",
  priority = false,
}: LogoProps) {
  const logoSrc =
    variant === "dark" || variant === "white"
      ? "/logo-white.png"
      : variant === "white-bg"
      ? "/logo-white-bg.png"
      : "/logo.png";

  const content = (
    <div
      className={cn("relative inline-flex items-center select-none shrink-0 max-w-full", className)}
      style={className ? undefined : { width: `${width}px` }}
    >
      <Image
        src={logoSrc}
        alt="First Gulf Business Center L.L.C"
        width={width}
        height={height}
        className="h-auto w-full max-w-full object-contain transition-transform duration-300 hover:scale-[1.02]"
        style={{ height: "auto" }}
        priority={priority}
      />
    </div>
  );

  if (href) {
    return (
      <Link href={href} aria-label="First Gulf Business Center Home" className="inline-flex shrink-0 items-center max-w-full">
        {content}
      </Link>
    );
  }

  return content;
}
