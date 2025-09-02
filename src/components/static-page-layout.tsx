import { Suspense } from "react";
import { getTranslation } from "@/app/i18n";
import { LanguageSwitcher } from "@/components/language-switcher";
import { isRTL, cn } from "@/lib/utils";
import Link from "next/link";

interface StaticPageLayoutProps {
  children: React.ReactNode;
  locale: string;
}

export async function StaticPageLayout({
  children,
  locale,
}: StaticPageLayoutProps) {
  const { t: tNav } = await getTranslation(locale, "navigation");
  const { t: tCommon } = await getTranslation(locale, "common");

  const isCurrentRTL = isRTL(locale);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={cn(
              "flex h-16 items-center justify-between",
              isCurrentRTL && "flex-row-reverse"
            )}
          >
            <div
              className={cn(
                "flex items-center",
                isCurrentRTL && "flex-row-reverse"
              )}
            >
              <Link
                href={`/${locale}`}
                className="text-2xl font-bold text-blue-600"
              >
                GetTravelVisa.com
              </Link>
            </div>
            <nav
              className={cn(
                "hidden space-x-8 md:flex",
                isCurrentRTL && "space-x-reverse"
              )}
            >
              <Link
                href={`/${locale}`}
                className="text-gray-900 hover:text-blue-600"
              >
                {tNav("header.home")}
              </Link>
              <Link
                href={`/${locale}/destinations`}
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

      {/* Main Content */}
      <main>
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <article
            className={cn(
              "prose prose-lg max-w-none",
              isCurrentRTL && "rtl prose-headings:text-right prose-p:text-right"
            )}
          >
            {children}
          </article>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div
            className={cn(
              "grid grid-cols-1 gap-8 md:grid-cols-4",
              isCurrentRTL && "text-right"
            )}
          >
            <div className="col-span-1 md:col-span-2">
              <div className="text-2xl font-bold text-white">
                GetTravelVisa.com
              </div>
              <p className="mt-4 text-gray-300">
                {tCommon("site.description")}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wide text-gray-400 uppercase">
                {tNav("footer.company")}
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link
                    href={`/${locale}/p/about-us`}
                    className="text-base text-gray-300 hover:text-white"
                  >
                    {tNav("footer.about")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/contact`}
                    className="text-base text-gray-300 hover:text-white"
                  >
                    {tNav("footer.contact_us")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/p/terms-n-conditions`}
                    className="text-base text-gray-300 hover:text-white"
                  >
                    {tNav("footer.terms")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/p/privacy-policy`}
                    className="text-base text-gray-300 hover:text-white"
                  >
                    {tNav("footer.privacy")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wide text-gray-400 uppercase">
                {tNav("footer.services")}
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link
                    href={`/${locale}/visa-checker`}
                    className="text-base text-gray-300 hover:text-white"
                  >
                    {tNav("footer.visa_checker")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/blog`}
                    className="text-base text-gray-300 hover:text-white"
                  >
                    {tNav("footer.travel_blog")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div
            className={cn(
              "mt-8 border-t border-gray-700 pt-8 text-center text-base text-gray-400",
              isCurrentRTL && "text-right"
            )}
          >
            <p>
              {tNav("footer.copyright", {
                year: new Date().getFullYear(),
              })}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
