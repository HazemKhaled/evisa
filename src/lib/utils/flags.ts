/**
 * Utility functions for country flag handling
 * Flags are stored as SVG files in public/flags directory
 */

/**
 * Get the flag URL for a country code
 * @param countryCode - ISO 3166-1 alpha-3 country code (e.g., "USA", "ARE")
 * @returns URL to the flag SVG file
 */
export function getFlagUrl(countryCode: string): string {
  return `/flags/${countryCode.toLowerCase()}.svg`;
}

/**
 * Get the flag path for server-side usage
 * @param countryCode - ISO 3166-1 alpha-3 country code (e.g., "USA", "ARE")
 * @returns Path to the flag SVG file
 */
export function getFlagPath(countryCode: string): string {
  return `public/flags/${countryCode.toLowerCase()}.svg`;
}

/**
 * Check if a flag exists for a country code
 * @param countryCode - ISO 3166-1 alpha-3 country code
 * @returns true if flag SVG exists, false otherwise
 */
export async function flagExists(countryCode: string): Promise<boolean> {
  try {
    const response = await fetch(getFlagUrl(countryCode), { method: "HEAD" });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Get flag URL with fallback to a default flag
 * @param countryCode - ISO 3166-1 alpha-3 country code
 * @param fallbackUrl - Optional fallback URL (defaults to a generic flag)
 * @returns URL to flag or fallback
 */
export function getFlagUrlWithFallback(
  countryCode: string,
  fallbackUrl: string = "/flags/default.svg"
): string {
  return getFlagUrl(countryCode) || fallbackUrl;
}
