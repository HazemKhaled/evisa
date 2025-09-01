import { Suspense } from "react";
import { getTranslation } from "../i18n";
import { LanguageSwitcher } from "@/components/language-switcher";
import { isRTL, cn } from "@/lib/utils";

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { t: tCommon } = await getTranslation(locale, "common");
  const { t: tNav } = await getTranslation(locale, "navigation");
  const { t: tHero } = await getTranslation(locale, "hero");
  const { t: tFeatures } = await getTranslation(locale, "features");

  const isCurrentRTL = isRTL(locale);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
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
              <div className="text-2xl font-bold text-blue-600">
                GetTravelVisa.com
              </div>
            </div>
            <nav
              className={cn(
                "hidden space-x-8 md:flex",
                isCurrentRTL && "space-x-reverse"
              )}
            >
              <a href="#" className="text-gray-900 hover:text-blue-600">
                {tNav("header.home")}
              </a>
              <a href="#" className="text-gray-900 hover:text-blue-600">
                {tNav("header.destinations")}
              </a>
              <a href="#" className="text-gray-900 hover:text-blue-600">
                {tNav("header.blog")}
              </a>
              <a href="#" className="text-gray-900 hover:text-blue-600">
                {tNav("header.about")}
              </a>
              <a href="#" className="text-gray-900 hover:text-blue-600">
                {tNav("header.contact")}
              </a>
            </nav>
            <Suspense fallback={<div>Loading...</div>}>
              <LanguageSwitcher />
            </Suspense>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <div className="relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 lg:px-8 lg:pt-32">
            <div className={cn("text-center", isCurrentRTL && "rtl")}>
              <h1
                className={cn(
                  "text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl",
                  isCurrentRTL && "text-right"
                )}
              >
                {tHero("headline")}
              </h1>
              <p
                className={cn(
                  "mx-auto mt-6 max-w-3xl text-xl text-gray-600",
                  isCurrentRTL && "text-right"
                )}
              >
                {tHero("subheadline")}
              </p>
              <div className="mt-10">
                <button className="rounded-md bg-blue-600 px-8 py-3 text-base font-medium text-white shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none">
                  {tCommon("buttons.startApplication")}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Search Form */}
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2
              className={cn(
                "mb-4 text-lg font-semibold text-gray-900",
                isCurrentRTL && "text-right"
              )}
            >
              {tHero("search.title")}
            </h2>
            <div
              className={cn(
                "grid grid-cols-1 gap-4 sm:grid-cols-3",
                isCurrentRTL && "sm:grid-cols-reverse"
              )}
            >
              <div>
                <label
                  htmlFor="passport"
                  className={cn(
                    "block text-sm font-medium text-gray-700",
                    isCurrentRTL && "text-right"
                  )}
                >
                  {tCommon("forms.passportCountry")}
                </label>
                <select
                  id="passport"
                  className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm"
                >
                  <option>{tHero("search.passportPlaceholder")}</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="destination"
                  className={cn(
                    "block text-sm font-medium text-gray-700",
                    isCurrentRTL && "text-right"
                  )}
                >
                  {tCommon("forms.destinationCountry")}
                </label>
                <select
                  id="destination"
                  className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm"
                >
                  <option>{tHero("search.destinationPlaceholder")}</option>
                </select>
              </div>
              <div
                className={cn(
                  "flex items-end",
                  isCurrentRTL && "justify-start"
                )}
              >
                <button className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none">
                  {tHero("search.checkButton")}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className={cn("text-center", isCurrentRTL && "rtl")}>
              <h2
                className={cn(
                  "text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl",
                  isCurrentRTL && "text-right"
                )}
              >
                {tFeatures("howItWorks.title")}
              </h2>
              <p
                className={cn(
                  "mx-auto mt-4 max-w-2xl text-lg text-gray-600",
                  isCurrentRTL && "text-right"
                )}
              >
                {tFeatures("howItWorks.subtitle")}
              </p>
            </div>

            <div
              className={cn(
                "mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4",
                isCurrentRTL && "rtl"
              )}
            >
              <div className={cn("text-center", isCurrentRTL && "text-right")}>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                  <span className="font-bold text-white">1</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {tFeatures("howItWorks.steps.check.title")}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {tFeatures("howItWorks.steps.check.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900">
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
                  <a
                    href="#"
                    className="text-base text-gray-300 hover:text-white"
                  >
                    {tNav("footer.about")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-base text-gray-300 hover:text-white"
                  >
                    {tNav("footer.contact_us")}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wide text-gray-400 uppercase">
                {tNav("footer.services")}
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-base text-gray-300 hover:text-white"
                  >
                    {tNav("footer.visa_checker")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-base text-gray-300 hover:text-white"
                  >
                    {tNav("footer.travel_blog")}
                  </a>
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
