import { cn } from "@repo/utils";
import Link from "next/link";

import { getTranslation } from "@/app/i18n";
import type { DestinationMetadata } from "@/lib/services/country-service";

interface DestinationsGridProps {
  destinations: DestinationMetadata[];
  locale: string;
  className?: string;
}

export async function DestinationsGrid({
  destinations,
  locale,
  className,
}: DestinationsGridProps) {
  const { t } = await getTranslation(locale, "destinations-list", {
    keyPrefix: "destinationCard",
  });

  return (
    <div
      className={cn(
        "grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
        className
      )}
    >
      {destinations.map(destination => (
        <Link
          key={destination.code}
          href={`/${locale}/d/${destination.code}`}
          className="group block"
        >
          <div className="bg-card hover:border-primary/20 rounded-lg border p-6 transition-all duration-200 group-hover:scale-105 hover:shadow-lg">
            {/* Country Flag/Image */}
            <div className="bg-muted mx-auto mb-4 flex h-12 w-16 items-center justify-center overflow-hidden rounded">
              <div className="from-primary/20 to-primary/10 flex h-full w-full items-center justify-center bg-gradient-to-br">
                <span className="text-primary text-xs font-bold uppercase">
                  {destination.code}
                </span>
              </div>
            </div>

            {/* Country Name */}
            <h3 className="text-foreground group-hover:text-primary mb-2 text-center text-lg font-semibold transition-colors">
              {destination.localizedName}
            </h3>

            {/* Stats */}
            <div className="mb-4 flex items-center justify-between text-sm">
              <div className="text-muted-foreground">
                {t("visaTypes")}:{" "}
                <span className="text-foreground font-medium">
                  {destination.totalVisaTypes || 0}
                </span>
              </div>
              <div className="text-muted-foreground">
                {t("processingTime")}:{" "}
                <span className="text-foreground font-medium">
                  {destination.avgProcessingTime
                    ? `${destination.avgProcessingTime} ${t("days")}`
                    : t("notAvailable")}
                </span>
              </div>
            </div>

            {/* Region */}
            {destination.continent && (
              <div className="mb-4">
                <span className="bg-primary/10 text-primary inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
                  {destination.continent}
                </span>
              </div>
            )}

            {/* View Details Button */}
            <div className="border-t pt-4">
              <span className="text-primary bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground inline-flex w-full items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors">
                {t("viewDetails")}
                <svg
                  className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                    className="ltr:block rtl:hidden"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                    className="ltr:hidden rtl:block"
                  />
                </svg>
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
