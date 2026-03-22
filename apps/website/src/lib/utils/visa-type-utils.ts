import type { LucideIcon } from "lucide-react";
import {
  ArrowRightLeft,
  Briefcase,
  Globe,
  GraduationCap,
  HardHat,
  HeartPulse,
  Home,
  Plane,
} from "lucide-react";

/**
 * Visa category constants used for mapping visa types to visual configurations
 */
export const VISA_CATEGORIES = {
  TOURIST: "tourist",
  BUSINESS: "business",
  STUDENT: "student",
  WORK: "work",
  TRANSIT: "transit",
  RESIDENCE: "residence",
  MEDICAL: "medical",
  OTHER: "other",
} as const;

export type VisaCategory =
  (typeof VISA_CATEGORIES)[keyof typeof VISA_CATEGORIES];

interface VisaCategoryConfig {
  /** Tailwind color key used for dynamic class generation */
  color: string;
  /** Background class for the card header area */
  bgClass: string;
  /** Text color class for the category icon and header */
  textClass: string;
  /** Badge background class */
  badgeBgClass: string;
  /** Badge text class */
  badgeTextClass: string;
  /** Left/right border accent class (RTL-aware via border-s) */
  borderClass: string;
  /** Lucide icon component for this category */
  icon: LucideIcon;
}

/**
 * Visual configuration for each visa category.
 * Uses Tailwind utility classes for consistent theming.
 */
export const VISA_CATEGORY_CONFIG: Record<VisaCategory, VisaCategoryConfig> = {
  [VISA_CATEGORIES.TOURIST]: {
    color: "blue",
    bgClass: "bg-blue-50",
    textClass: "text-blue-600",
    badgeBgClass: "bg-blue-100",
    badgeTextClass: "text-blue-800",
    borderClass: "border-s-blue-500",
    icon: Plane,
  },
  [VISA_CATEGORIES.BUSINESS]: {
    color: "indigo",
    bgClass: "bg-indigo-50",
    textClass: "text-indigo-600",
    badgeBgClass: "bg-indigo-100",
    badgeTextClass: "text-indigo-800",
    borderClass: "border-s-indigo-500",
    icon: Briefcase,
  },
  [VISA_CATEGORIES.STUDENT]: {
    color: "purple",
    bgClass: "bg-purple-50",
    textClass: "text-purple-600",
    badgeBgClass: "bg-purple-100",
    badgeTextClass: "text-purple-800",
    borderClass: "border-s-purple-500",
    icon: GraduationCap,
  },
  [VISA_CATEGORIES.WORK]: {
    color: "amber",
    bgClass: "bg-amber-50",
    textClass: "text-amber-600",
    badgeBgClass: "bg-amber-100",
    badgeTextClass: "text-amber-800",
    borderClass: "border-s-amber-500",
    icon: HardHat,
  },
  [VISA_CATEGORIES.TRANSIT]: {
    color: "teal",
    bgClass: "bg-teal-50",
    textClass: "text-teal-600",
    badgeBgClass: "bg-teal-100",
    badgeTextClass: "text-teal-800",
    borderClass: "border-s-teal-500",
    icon: ArrowRightLeft,
  },
  [VISA_CATEGORIES.RESIDENCE]: {
    color: "emerald",
    bgClass: "bg-emerald-50",
    textClass: "text-emerald-600",
    badgeBgClass: "bg-emerald-100",
    badgeTextClass: "text-emerald-800",
    borderClass: "border-s-emerald-500",
    icon: Home,
  },
  [VISA_CATEGORIES.MEDICAL]: {
    color: "rose",
    bgClass: "bg-rose-50",
    textClass: "text-rose-600",
    badgeBgClass: "bg-rose-100",
    badgeTextClass: "text-rose-800",
    borderClass: "border-s-rose-500",
    icon: HeartPulse,
  },
  [VISA_CATEGORIES.OTHER]: {
    color: "gray",
    bgClass: "bg-gray-50",
    textClass: "text-gray-600",
    badgeBgClass: "bg-gray-100",
    badgeTextClass: "text-gray-800",
    borderClass: "border-s-gray-500",
    icon: Globe,
  },
};

/**
 * Keyword-based mapping from visa type strings to categories.
 * The visa type field is a free-text string (e.g., "tourist", "business_visa", "student").
 * We match by checking if the lowercased type contains any known keyword.
 */
const CATEGORY_KEYWORDS: Record<VisaCategory, string[]> = {
  [VISA_CATEGORIES.TOURIST]: [
    "tourist",
    "tourism",
    "visit",
    "visitor",
    "holiday",
    "vacation",
  ],
  [VISA_CATEGORIES.BUSINESS]: ["business", "commercial", "trade", "conference"],
  [VISA_CATEGORIES.STUDENT]: [
    "student",
    "study",
    "education",
    "academic",
    "scholar",
  ],
  [VISA_CATEGORIES.WORK]: [
    "work",
    "employment",
    "labor",
    "labour",
    "professional",
  ],
  [VISA_CATEGORIES.TRANSIT]: ["transit", "transfer", "stopover", "layover"],
  [VISA_CATEGORIES.RESIDENCE]: [
    "residence",
    "resident",
    "settlement",
    "permanent",
    "immigrant",
    "immigration",
  ],
  [VISA_CATEGORIES.MEDICAL]: ["medical", "health", "treatment", "hospital"],
  [VISA_CATEGORIES.OTHER]: [],
};

/**
 * Determines the visa category from a free-text visa type string.
 *
 * @param visaType - The visa type string from the database (e.g., "tourist", "business_visa")
 * @returns The matching VisaCategory, or "other" if no match is found
 */
export function getVisaCategory(visaType: string): VisaCategory {
  const normalized = visaType.toLowerCase().replace(/[_-]/g, " ");

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.length === 0) continue;
    if (keywords.some(keyword => normalized.includes(keyword))) {
      return category as VisaCategory;
    }
  }

  return VISA_CATEGORIES.OTHER;
}

/**
 * Gets the full visual configuration for a given visa type string.
 *
 * @param visaType - The visa type string from the database
 * @returns The VisaCategoryConfig with icon, colors, and CSS classes
 */
export function getVisaCategoryConfig(visaType: string): VisaCategoryConfig {
  const category = getVisaCategory(visaType);
  return VISA_CATEGORY_CONFIG[category];
}

/**
 * Returns the appropriate Lucide icon component for a visa type.
 *
 * @param visaType - The visa type string from the database
 * @returns A Lucide icon component
 */
export function getVisaTypeIcon(visaType: string): LucideIcon {
  return getVisaCategoryConfig(visaType).icon;
}

/** Threshold in days below which a visa is considered "fast processing" */
const FAST_PROCESSING_THRESHOLD_DAYS = 7;

/**
 * Determines whether a visa has fast processing based on its processing time.
 *
 * @param processingTimeDays - Processing time in days
 * @returns true if processing time is less than 7 days
 */
export function isFastProcessing(processingTimeDays: number): boolean {
  return (
    processingTimeDays > 0 &&
    processingTimeDays < FAST_PROCESSING_THRESHOLD_DAYS
  );
}

/**
 * Derives a flag emoji from an ISO 3166-1 alpha-2 country code.
 * Uses regional indicator symbols to create the flag emoji.
 *
 * @param code - Two-letter ISO country code (e.g., "AE", "TR", "JP")
 * @returns Flag emoji corresponding to the country code (e.g., "🇦🇪", "🇹🇷", "🇯🇵")
 *
 * @example
 * getCountryFlagEmoji("AE") // Returns "🇦🇪"
 * getCountryFlagEmoji("TR") // Returns "🇹🇷"
 */
export function getCountryFlagEmoji(code: string): string {
  return [...code.toUpperCase()]
    .map(c => String.fromCodePoint(c.charCodeAt(0) + 0x1f1a5))
    .join("");
}

/**
 * Formats an enhanced visa display title by combining destination name and visa name.
 * This creates more descriptive titles that provide context for users.
 *
 * @param destinationName - The localized destination country name (e.g., "Turkey", "United Arab Emirates")
 * @param visaName - The localized visa type name (e.g., "Tourist Visa", "Business e-Visa")
 * @returns A formatted title combining both (e.g., "Turkey Tourist Visa", "United Arab Emirates Business e-Visa")
 *
 * @example
 * formatVisaTitle("Turkey", "Tourist e-Visa") // Returns "Turkey Tourist e-Visa"
 * formatVisaTitle("United Arab Emirates", "Multi-Entry Visa") // Returns "United Arab Emirates Multi-Entry Visa"
 */
export function formatVisaTitle(
  destinationName: string,
  visaName: string
): string {
  return `${destinationName} ${visaName}`;
}
