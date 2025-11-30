import { cn } from "@repo/utils";
import Image from "next/image";

import { getTranslation } from "@/app/i18n";
import type { DestinationWithVisaTypes } from "@/lib/services/country-service";

interface DestinationHeroProps {
  destination: DestinationWithVisaTypes;
  locale: string;
  className?: string;
}

export async function DestinationHero({
  destination,
  locale,
  className,
}: DestinationHeroProps) {
  const { t } = await getTranslation(locale, "destination-page", {
    keyPrefix: "hero",
  });

  return (
    <section className={cn("relative overflow-hidden", className)}>
      {/* Hero Image with Overlay */}
      <div className="relative h-96 sm:h-[500px]">
        {destination.heroImage ? (
          <Image
            src={destination.heroImage}
            alt={`${destination.localizedName} landscape`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
            {/* Pattern overlay for visual interest */}
            <div className="absolute inset-0 opacity-20">
              <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern
                    id="hero-pattern"
                    x="0"
                    y="0"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="20" cy="20" r="2" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hero-pattern)" />
              </svg>
            </div>
          </div>
        )}

        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

        {/* Country Flag */}
        <div className="absolute top-6 ltr:right-6 rtl:left-6">
          <div className="flex h-12 w-16 items-center justify-center rounded-sm bg-white shadow-lg">
            <span className="text-2xl font-bold text-gray-800">
              {destination.code}
            </span>
          </div>
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <div className="max-w-3xl">
              {/* Country Name */}
              <h1 className="mb-4 text-4xl font-bold text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
                {destination.localizedName}
              </h1>

              {/* Quick Stats */}
              <div className="mb-6 flex flex-wrap items-center gap-4">
                <div className="rounded-lg bg-white/20 px-4 py-2 backdrop-blur-sm">
                  <div className="text-sm text-white/80">{t("visaTypes")}</div>
                  <div className="text-lg font-semibold text-white">
                    {destination.totalVisaTypes}
                  </div>
                </div>

                {destination.hasVisaFreeEntry && (
                  <div className="rounded-lg bg-green-500/20 px-4 py-2 backdrop-blur-sm">
                    <div className="text-sm font-medium text-green-100">
                      {t("visaFreeAvailable")}
                    </div>
                  </div>
                )}

                {destination.hasVisaOnArrival && (
                  <div className="rounded-lg bg-blue-500/20 px-4 py-2 backdrop-blur-sm">
                    <div className="text-sm font-medium text-blue-100">
                      {t("visaOnArrivalAvailable")}
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              {destination.about && (
                <p className="max-w-2xl text-lg leading-relaxed text-white/90 drop-shadow-sm">
                  {destination.about}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Bar */}
      <div className="bg-background/95 border-t backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {destination.continent}
              {destination.region && ` • ${destination.region}`}
            </div>

            <div className="flex items-center gap-4 ltr:ml-auto rtl:mr-auto">
              <a
                href={`/${locale}/d/${destination.code}/blog`}
                className="text-primary hover:text-primary/80 text-sm transition-colors"
              >
                {t("viewTravelGuides")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
