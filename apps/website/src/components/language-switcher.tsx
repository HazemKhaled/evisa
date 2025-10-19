"use client";

import { useParams, useRouter, usePathname } from "next/navigation";
import { ChevronDown, Check } from "lucide-react";
import { cn, isRTL } from "@repo/utils";
import { languagesObj } from "@/app/i18n/settings";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@repo/ui";

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

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

    // Set cookie to remember language preference (using queueMicrotask to avoid purity violations)
    queueMicrotask(() => {
      document.cookie = `i18next=${languageCode}; path=/; max-age=31536000; Secure; SameSite=Strict`; // 1 year
    });

    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn("gap-2", isCurrentRTL && "flex-row-reverse")}
          aria-label={languageLabels[currentLocale] || languageLabels.en}
        >
          <span className="text-lg">{currentLanguage.flag}</span>
          <span className="hidden sm:inline">{currentLanguage.nativeName}</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 opacity-50",
              isCurrentRTL && "order-first scale-x-[-1]"
            )}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={isCurrentRTL ? "start" : "end"}
        side="bottom"
        className="w-56"
      >
        <DropdownMenuLabel className={cn(isCurrentRTL && "text-right")}>
          {languageLabels[currentLocale] || languageLabels.en}
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          {languagesObj.map(language => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={cn(
                "cursor-pointer gap-3",
                isCurrentRTL && "flex-row-reverse text-right"
              )}
            >
              <span className="text-lg">{language.flag}</span>
              <div className={cn("flex-1", isCurrentRTL && "text-right")}>
                <div className="font-medium">{language.nativeName}</div>
                <div className="text-muted-foreground text-xs">
                  {language.name}
                </div>
              </div>
              {currentLocale === language.code && (
                <Check
                  className={cn("h-4 w-4", isCurrentRTL && "order-first")}
                />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
