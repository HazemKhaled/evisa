import { languages } from "@/app/i18n/settings";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes with proper precedence
 * Uses clsx for conditional classes and tailwind-merge for deduplication
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency value for display
 */
export function formatCurrency(
  amount: number,
  currency: string = "USD",
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}

/**
 * Format date for display with internationalization support
 */
export function formatDate(
  date: Date | string,
  locale: string = "en-US",
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, options).format(dateObj);
}

/**
 * Truncate text to specified length with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).replace(/\s+\S*$/, "") + "...";
}

/**
 * Generate initials from a name
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map(word => word.charAt(0))
    .join("")
    .toUpperCase()
    .substring(0, 2);
}

/**
 * Determine text direction for RTL languages
 */
export function getTextDirection(locale: string): "ltr" | "rtl" {
  const rtlLanguages = ["ar", "he", "fa", "ur"];
  const language = locale.split("-")[0];
  return rtlLanguages.includes(language) ? "rtl" : "ltr";
}

/**
 * Check if a locale is RTL
 */
export function isRTL(locale: string): boolean {
  return getTextDirection(locale) === "rtl";
}

/**
 * Get the language code from locale
 */
export function getLanguageFromLocale(locale: string): string {
  return locale.split("-")[0];
}

/**
 * Sleep utility for async operations
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function (...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Check if a string is a valid email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Generate a random ID with guaranteed length
 * Uses a more reliable approach than Math.random().toString(36)
 */
export function generateId(length: number = 8): string {
  if (length <= 0) return "";

  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  // Generate exactly the requested length
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}

/**
 * Safe JSON parse that returns null on error
 */
export function safeJsonParse<T = unknown>(json: string): T | null {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

/**
 * Generate canonical URL for SEO purposes
 * Standardizes URLs to use https://gettravelvisa.com (no www)
 */
export function generateCanonicalUrl(
  baseUrl: string,
  path: string = "",
  locale?: string
): string {
  // Ensure baseUrl doesn't have trailing slash and uses the standard domain
  const standardBaseUrl = baseUrl
    .replace(/\/$/, "")
    .replace(/^https?:\/\/www\./, "https://")
    .replace(/^https?:\/\//, "https://");

  // Ensure path starts with slash if not empty
  const normalizedPath = path && !path.startsWith("/") ? `/${path}` : path;

  // Build the canonical URL
  if (locale) {
    return `${standardBaseUrl}/${locale}${normalizedPath}`;
  }

  return `${standardBaseUrl}${normalizedPath}`;
}

/**
 * Generate language alternates for international SEO
 * Creates hreflang signals for all supported languages
 */
export function generateLanguageAlternates(
  baseUrl: string,
  path: string = ""
): Record<string, string> {
  // Default to the project's supported languages if not provided
  const standardBaseUrl = baseUrl
    .replace(/\/$/, "")
    .replace(/^https?:\/\/www\./, "https://")
    .replace(/^https?:\/\//, "https://");

  const normalizedPath = path && !path.startsWith("/") ? `/${path}` : path;

  const alternates: Record<string, string> = {};

  languages.forEach(lang => {
    alternates[lang] = `${standardBaseUrl}/${lang}${normalizedPath}`;
  });

  return alternates;
}

/**
 * Generate complete alternates object with canonical and languages
 * Combines canonical URL and language alternates for comprehensive SEO
 */
export function generateAlternatesMetadata(
  baseUrl: string,
  path: string = "",
  currentLocale: string
): {
  canonical: string;
  languages: Record<string, string>;
} {
  const canonical = generateCanonicalUrl(baseUrl, path, currentLocale);
  const languages = generateLanguageAlternates(baseUrl, path);

  return {
    canonical,
    languages,
  };
}
