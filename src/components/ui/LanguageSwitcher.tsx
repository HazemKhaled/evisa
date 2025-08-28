"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface Language {
  code: "en" | "ar";
  name: string;
  flag: string;
  dir: "ltr" | "rtl";
}

const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸", dir: "ltr" },
  { code: "ar", name: "العربية", flag: "🇸🇦", dir: "rtl" },
];

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0];

  const handleLanguageChange = (newLocale: "en" | "ar") => {
    setIsOpen(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    router.replace(pathname as any, { locale: newLocale });

    // Update document direction
    document.documentElement.dir = newLocale === "ar" ? "rtl" : "ltr";
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 rtl:space-x-reverse rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="font-medium">{currentLanguage.name}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

          {/* Dropdown */}
          <div className="absolute right-0 rtl:right-auto rtl:left-0 z-20 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`flex w-full items-center space-x-2 rtl:space-x-reverse px-4 py-3 text-left rtl:text-right hover:bg-gray-50 focus:outline-none focus:bg-gray-50 ${
                  language.code === locale ? "bg-gray-50 text-primary" : "text-gray-700"
                } ${language.code === languages[0].code ? "rounded-t-lg" : ""} ${
                  language.code === languages[languages.length - 1].code ? "rounded-b-lg" : ""
                }`}
              >
                <span className="text-lg">{language.flag}</span>
                <span className="font-medium">{language.name}</span>
                {language.code === locale && (
                  <span className="ml-auto rtl:ml-0 rtl:mr-auto text-primary">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
