import { Suspense } from "react";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { getTranslation } from "@/app/i18n";

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
          <div className="flex items-center">
            <Link
              href={`/${locale}`}
              className="text-2xl font-bold text-blue-600"
            >
              {tCommon("site.name")}
            </Link>
          </div>
          <nav className="hidden space-x-8 md:flex">
            <Link
              href={`/${locale}`}
              className="text-gray-900 hover:text-blue-600"
            >
              {tNav("header.home")}
            </Link>
            <Link
              href={`/${locale}/d`}
              className="text-gray-900 hover:text-blue-600"
            >
              {tNav("header.destinations")}
            </Link>
            <Link
              href={`/${locale}/blog`}
              className="text-gray-900 hover:text-blue-600"
            >
              {tNav("header.blog")}
            </Link>
          </nav>
          <Suspense fallback={<div>Loading...</div>}>
            <LanguageSwitcher />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
