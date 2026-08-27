"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  question: string;
  answer: string;
  category?: string;
  defaultOpen?: boolean;
}

export function AccordionItem({
  question,
  answer,
  category,
  defaultOpen = false,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className={cn(
        "border rounded-sm transition-all duration-200 overflow-hidden",
        isOpen
          ? "border-brass-400 bg-white shadow-luxury"
          : "border-[#E2DAD0] bg-white/90 hover:border-brass-400"
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full py-5 px-6 sm:px-8 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
      >
        <div className="flex flex-col gap-1.5">
          {category && (
            <span className="text-xs font-bold tracking-widest text-brass-800 uppercase">
              {category}
            </span>
          )}
          <span
            className={cn(
              "font-serif text-lg sm:text-xl font-bold tracking-tight transition-colors",
              isOpen ? "text-maroon-800" : "text-charcoal-950"
            )}
          >
            {question}
          </span>
        </div>
        <div
          className={cn(
            "w-9 h-9 rounded-full border border-brass-300 flex items-center justify-center shrink-0 transition-transform duration-300",
            isOpen
              ? "bg-maroon-800 text-white border-maroon-800 rotate-180"
              : "bg-cream-100 text-charcoal-900"
          )}
        >
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>

      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="px-6 sm:px-8 pb-6 pt-2 text-base sm:text-lg text-charcoal-800 leading-relaxed font-normal border-t border-cream-200">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}

interface AccordionProps {
  items: {
    question: string;
    answer: string;
    category?: string;
  }[];
  className?: string;
}

export default function Accordion({ items, className }: AccordionProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          category={item.category}
          defaultOpen={index === 0}
        />
      ))}
    </div>
  );
}
