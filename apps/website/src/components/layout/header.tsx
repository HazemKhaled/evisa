import { Suspense } from "react";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { getTranslation } from "@/app/i18n";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@repo/ui";
import { MobileNav } from "./mobile-nav";

interface HeaderProps {
  locale: string;
}

export async function Header({ locale }: HeaderProps) {
  const { t: tNav } = await getTranslation(locale, "navigation");
  const { t: tCommon } = await getTranslation(locale, "common");

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile Navigation - positioned on the left */}
            <div className="md:hidden">
              <MobileNav
                locale={locale}
                navigationLabels={{
                  home: tNav("header.home"),
                  destinations: tNav("header.destinations"),
                  blog: tNav("header.blog"),
                }}
              />
            </div>

            <Link
              href={`/${locale}`}
              className="text-2xl font-bold text-blue-600"
            >
              {tCommon("site.name")}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href={`/${locale}`}>{tNav("header.home")}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href={`/${locale}/d`}>
                    {tNav("header.destinations")}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href={`/${locale}/blog`}>{tNav("header.blog")}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Suspense fallback={<div>Loading...</div>}>
            <LanguageSwitcher />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
