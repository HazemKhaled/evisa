"use client";

import { cn } from "@repo/utils";
import { useState } from "react";

import type { CountryPill } from "@/lib/utils/country-pill";

interface CountryPillListProps {
  countries: CountryPill[];
  tone: "green" | "blue";
  moreLabel: string;
  lessLabel: string;
  visibleCount?: number;
  className?: string;
}

const TONE_CLASSES = {
  green: "bg-green-100 text-green-800",
  blue: "bg-blue-100 text-blue-800",
} as const;

export function CountryPillList({
  countries,
  tone,
  moreLabel,
  lessLabel,
  visibleCount = 10,
  className,
}: CountryPillListProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasOverflow = countries.length > visibleCount;
  const visibleCountries =
    isExpanded || !hasOverflow ? countries : countries.slice(0, visibleCount);

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {visibleCountries.map(country => (
        <span
          key={country.code}
          className={cn("rounded-full px-3 py-1 text-sm", TONE_CLASSES[tone])}
        >
          {country.label}
        </span>
      ))}
      {hasOverflow && (
        <button
          type="button"
          onClick={() => setIsExpanded(expanded => !expanded)}
          aria-expanded={isExpanded}
          className="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-800 transition-colors hover:bg-gray-300 focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:outline-none"
        >
          {isExpanded
            ? lessLabel
            : `+${countries.length - visibleCount} ${moreLabel}`}
        </button>
      )}
    </div>
  );
}
