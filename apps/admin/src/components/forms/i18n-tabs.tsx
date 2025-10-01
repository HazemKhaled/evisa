"use client";

import { useState } from "react";

const SUPPORTED_LOCALES = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "ar", name: "العربية" },
  { code: "pt", name: "Português" },
  { code: "ru", name: "Русский" },
  { code: "de", name: "Deutsch" },
  { code: "fr", name: "Français" },
  { code: "it", name: "Italiano" },
] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number]["code"];

interface I18nTabsProps {
  children: (locale: Locale) => React.ReactNode;
  defaultLocale?: Locale;
}

export function I18nTabs({
  children,
  defaultLocale = "en",
}: I18nTabsProps): React.JSX.Element {
  const [activeLocale, setActiveLocale] = useState<Locale>(defaultLocale);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 border-b">
        {SUPPORTED_LOCALES.map(locale => (
          <button
            key={locale.code}
            type="button"
            onClick={() => setActiveLocale(locale.code)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeLocale === locale.code
                ? "border-primary text-primary border-b-2"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {locale.name}
          </button>
        ))}
      </div>
      <div className="pt-4">{children(activeLocale)}</div>
    </div>
  );
}

export { SUPPORTED_LOCALES };
