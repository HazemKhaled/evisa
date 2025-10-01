export const languagesObj = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦" },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇵🇹" },
  { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
  { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹" },
];

export const fallbackLng = "en";
export const languages = languagesObj.map(lang => lang.code);
export const defaultNS = "common";
export const cookieName = "i18next";

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}

/**
 * Get locale with region for OpenGraph and other metadata
 */
export function getLocaleWithRegion(locale: string): string {
  const localeMap: Record<string, string> = {
    en: "en_US",
    es: "es_ES",
    ar: "ar_SA",
    pt: "pt_PT",
    ru: "ru_RU",
    de: "de_DE",
    fr: "fr_FR",
    it: "it_IT",
  };

  return localeMap[locale] || "en_US";
}
