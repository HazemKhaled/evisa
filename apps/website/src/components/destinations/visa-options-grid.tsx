import { getTranslation } from "@/app/i18n";
import { cn } from "@repo/utils";
import type { DestinationWithVisaTypes } from "@/lib/services/country-service";
import type { VisaRequirements } from "@/lib/services/visa-service";
import { VisaTypeDetailCard } from "./visa-type-detail-card";

interface VisaOptionsGridProps {
  destination: DestinationWithVisaTypes;
  visaRequirements: VisaRequirements | null;
  locale: string;
  className?: string;
}

export async function VisaOptionsGrid({
  destination,
  visaRequirements,
  locale,
  className,
}: VisaOptionsGridProps) {
  const { t } = await getTranslation(locale, "destination-page", {
    keyPrefix: "visaOptions",
  });

  // If no visa types available, show empty state
  if (!destination.visaTypes || destination.visaTypes.length === 0) {
    return (
      <div className={cn("py-12 text-center", className)}>
        <div className="bg-muted mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full">
          <svg
            className="text-muted-foreground h-12 w-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-xl font-semibold">{t("noVisaTypesTitle")}</h3>
        <p className="text-muted-foreground mx-auto max-w-md">
          {t("noVisaTypesDescription", {
            destination: destination.localizedName,
          })}
        </p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-8", className)}>
      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="bg-card rounded-lg border p-4 text-center">
          <div className="text-primary text-2xl font-bold">
            {destination.totalVisaTypes}
          </div>
          <div className="text-muted-foreground text-sm">
            {t("totalOptions")}
          </div>
        </div>

        {visaRequirements && (
          <>
            <div className="bg-card rounded-lg border p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {visaRequirements.processingTimeRange.min}-
                {visaRequirements.processingTimeRange.max}
              </div>
              <div className="text-muted-foreground text-sm">
                {t("processingDays")}
              </div>
            </div>

            <div className="bg-card rounded-lg border p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {visaRequirements.feeRange.min === visaRequirements.feeRange.max
                  ? `${visaRequirements.feeRange.min}`
                  : `${visaRequirements.feeRange.min}-${visaRequirements.feeRange.max}`}
              </div>
              <div className="text-muted-foreground text-sm">
                {t("feeRange", {
                  currency: visaRequirements.feeRange.currency,
                })}
              </div>
            </div>
          </>
        )}

        <div className="bg-card rounded-lg border p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {visaRequirements?.visaFreeCountries.length || 0}
          </div>
          <div className="text-muted-foreground text-sm">
            {t("visaFreeCountries")}
          </div>
        </div>
      </div>

      {/* Visa Types Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {await Promise.all(
          destination.visaTypes.map(async visaType => (
            <VisaTypeDetailCard
              key={visaType.id}
              visaType={visaType}
              destination={destination}
              locale={locale}
            />
          ))
        )}
      </div>

      {/* Additional Information */}
      {visaRequirements && (
        <div className="grid gap-8 border-t pt-8 md:grid-cols-2">
          {/* Visa-Free Countries */}
          {visaRequirements.visaFreeCountries.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-green-600">
                {t("visaFreeCountriesTitle")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {visaRequirements.visaFreeCountries
                  .slice(0, 10)
                  .map(country => (
                    <span
                      key={country}
                      className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800"
                    >
                      {country}
                    </span>
                  ))}
                {visaRequirements.visaFreeCountries.length > 10 && (
                  <span className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-sm">
                    +{visaRequirements.visaFreeCountries.length - 10}{" "}
                    {t("more")}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Visa on Arrival Countries */}
          {visaRequirements.visaOnArrivalCountries.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-600">
                {t("visaOnArrivalTitle")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {visaRequirements.visaOnArrivalCountries
                  .slice(0, 10)
                  .map(country => (
                    <span
                      key={country}
                      className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
                    >
                      {country}
                    </span>
                  ))}
                {visaRequirements.visaOnArrivalCountries.length > 10 && (
                  <span className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-sm">
                    +{visaRequirements.visaOnArrivalCountries.length - 10}{" "}
                    {t("more")}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
