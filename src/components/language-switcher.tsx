"use client";

import { useParams, useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { cn, isRTL } from "@/lib/utils";
import { languagesObj } from "@/app/i18n/settings";
import { Button } from "./ui/button";

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const currentLocale = (params?.locale as string) || "en";

  const currentLanguage =
    languagesObj.find(lang => lang.code === currentLocale) || languagesObj[0];
  const isCurrentRTL = isRTL(currentLocale);

  // Static labels to avoid hydration mismatch
  const languageLabels: Record<string, string> = {
    en: "Language",
    es: "Idioma",
    ar: "اللغة",
    pt: "Idioma",
    ru: "Язык",
    de: "Sprache",
    fr: "Langue",
    it: "Lingua",
  };

  const handleLanguageChange = (languageCode: string) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${languageCode}`);
    router.push(newPath);
    setIsOpen(false);

    // Set cookie to remember language preference
    document.cookie = `i18next=${languageCode}; path=/; max-age=31536000; Secure; SameSite=Strict`; // 1 year
  };

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="items-center gap-2 rounded-md border border-gray-300 bg-gray-50 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        aria-label={languageLabels[currentLocale] || languageLabels.en}
        aria-expanded={isOpen}
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="hidden sm:inline">{currentLanguage.nativeName}</span>
        <svg
          className={cn(
            "h-5 w-5 text-gray-400 transition-transform",
            isOpen && "rotate-180",
            isCurrentRTL && "scale-x-[-1]"
          )}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div
            className={cn(
              "ring-opacity-5 absolute z-20 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-none",
              isCurrentRTL ? "left-0" : "right-0"
            )}
          >
            <div className="py-1">
              {languagesObj.map(language => (
                <Button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={cn(
                    "flex w-full items-center gap-3 bg-gray-50 px-4 py-2 text-left text-sm text-gray-400 hover:bg-gray-300 hover:text-gray-900",
                    currentLocale === language.code &&
                      "bg-gray-100 text-gray-900",
                    isCurrentRTL && "text-right"
                  )}
                >
                  <span className="text-lg">{language.flag}</span>
                  <div className="flex-1">
                    <div className="font-medium">{language.nativeName}</div>
                    <div className="text-xs text-gray-500">{language.name}</div>
                  </div>
                  {currentLocale === language.code && (
                    <svg
                      className="h-4 w-4 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </Button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
