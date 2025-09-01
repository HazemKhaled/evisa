/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es", "ar", "pt", "ru", "de", "fr", "it"],
    localeDetection: true,
  },
  fallbackLng: {
    "es-ES": ["es", "en"],
    "es-MX": ["es", "en"],
    "ar-SA": ["ar", "en"],
    "ar-EG": ["ar", "en"],
    "pt-BR": ["pt", "en"],
    "pt-PT": ["pt", "en"],
    "ru-RU": ["ru", "en"],
    "de-DE": ["de", "en"],
    "fr-FR": ["fr", "en"],
    "it-IT": ["it", "en"],
    default: ["en"],
  },
  ns: ["common", "navigation", "hero", "features", "footer"],
  defaultNS: "common",
  reloadOnPrerender: process.env.NODE_ENV === "development",
  localePath: "./public/locales",
  saveMissing: false,
  strictMode: true,
  serializeConfig: false,
  react: { useSuspense: false },
};
