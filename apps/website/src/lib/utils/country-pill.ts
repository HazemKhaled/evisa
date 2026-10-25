import { getCountryFlagEmoji } from "./visa-type-utils";

export interface CountryPill {
  code: string;
  label: string;
}

/**
 * Builds the badge labels for a list of ISO country codes, preferring the
 * localized country name and falling back to the code when no translation
 * exists. The flag emoji is derived from the code itself, so it is available
 * even when the name is not.
 */
export function toCountryPills(
  codes: string[],
  names: Map<string, string>
): CountryPill[] {
  return codes.map(code => {
    const flag = getCountryFlagEmoji(code);
    const name = names.get(code) ?? code;
    return { code, label: flag ? `${flag} ${name}` : name };
  });
}
