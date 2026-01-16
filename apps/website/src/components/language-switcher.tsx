"use client";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui";
import { cn, isRTL } from "@repo/utils";
import { Check, ChevronDown, Globe } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";

import { languagesObj } from "@/app/i18n/settings";

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
          className={cn(
            "hover:bg-accent/80 hover:border-primary/20 h-auto gap-2.5 px-3 py-2 font-medium transition-all duration-200",
            isCurrentRTL && "flex-row-reverse"
          )}
          aria-label={languageLabels[currentLocale] || languageLabels.en}
        >
          <span className="text-lg drop-shadow-sm">{currentLanguage.flag}</span>
          <span className="hidden text-sm sm:inline">
            {currentLanguage.nativeName}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 opacity-60 transition-transform duration-200 group-data-[state=open]:rotate-180",
              isCurrentRTL && "order-first scale-x-[-1]"
            )}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={isCurrentRTL ? "start" : "end"}
        side="bottom"
        sideOffset={8}
        className={cn(
          "w-64 p-2",
          "shadow-xl shadow-black/10",
          "border-border/60 border",
          "bg-popover/95 backdrop-blur-md",
          "animate-in fade-in-0 zoom-in-95 duration-200"
        )}
      >
        {/* Header with icon */}
        <DropdownMenuLabel
          className={cn(
            "text-muted-foreground flex items-center gap-2 px-2 py-2 text-xs font-semibold tracking-wider uppercase",
            isCurrentRTL && "flex-row-reverse text-right"
          )}
        >
          <Globe className="h-3.5 w-3.5" />
          {languageLabels[currentLocale] || languageLabels.en}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border/50 mx-1 my-1.5" />

        <DropdownMenuGroup className="space-y-0.5">
          {languagesObj.map(language => {
            const isActive = currentLocale === language.code;
            return (
              <DropdownMenuItem
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={cn(
                  "cursor-pointer gap-3 rounded-lg px-3 py-2.5",
                  "transition-all duration-150 ease-out",
                  "focus:bg-accent focus:text-accent-foreground",
                  "hover:bg-accent/70",
                  isActive && "bg-primary/10 text-primary font-medium",
                  isCurrentRTL && "flex-row-reverse text-right"
                )}
              >
                {/* Flag with subtle container */}
                <span
                  className={cn(
                    "bg-muted/50 flex h-7 w-7 items-center justify-center rounded-md text-xl transition-transform duration-150",
                    "group-hover:scale-110"
                  )}
                >
                  {language.flag}
                </span>

                {/* Language names with better hierarchy */}
                <div
                  className={cn("min-w-0 flex-1", isCurrentRTL && "text-right")}
                >
                  <div
                    className={cn(
                      "text-sm leading-tight font-medium",
                      isActive && "text-primary"
                    )}
                  >
                    {language.nativeName}
                  </div>
                  <div
                    className={cn(
                      "text-muted-foreground/80 mt-0.5 truncate text-xs",
                      isActive && "text-primary/70"
                    )}
                  >
                    {language.name}
                  </div>
                </div>

                {/* Active indicator */}
                {isActive && (
                  <div
                    className={cn(
                      "bg-primary text-primary-foreground flex h-5 w-5 items-center justify-center rounded-full",
                      isCurrentRTL && "order-first"
                    )}
                  >
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </div>
                )}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
