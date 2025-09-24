import { getTranslation } from "@/app/i18n";
import { cn } from "@/lib/utils";
import type {
  VisaTypeInfo,
  DestinationWithVisaTypes,
} from "@/lib/services/country-service";
import { RequiredDocuments } from "./required-documents";
import { Button } from "./button";
import { Badge } from "./badge";

interface VisaTypeDetailCardProps {
  visaType: VisaTypeInfo;
  destination: DestinationWithVisaTypes;
  locale: string;
  className?: string;
}

export async function VisaTypeDetailCard({
  visaType,
  locale,
  className,
}: VisaTypeDetailCardProps) {
  const { t } = await getTranslation(locale, "destination-page", {
    keyPrefix: "visaCard",
  });

  return (
    <div
      className={cn(
        "bg-card rounded-lg border transition-all duration-200 hover:shadow-lg",
        className
      )}
    >
      {/* Card Header */}
      <div className="border-b p-6">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="text-xl font-semibold">{visaType.name}</h3>
          {visaType.isMultiEntry && (
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {t("multiEntry")}
            </Badge>
          )}
        </div>

        {/* Visa Type Badge */}
        <div className="inline-flex items-center gap-2">
          <Badge variant="secondary">
            {visaType.type}
          </Badge>
          {visaType.requiresInterview && (
            <Badge variant="destructive" className="bg-orange-100 text-orange-800 hover:bg-orange-200">
              {t("interviewRequired")}
            </Badge>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="space-y-4 p-6">
        {/* Key Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Fee */}
          <div className="bg-muted/50 rounded-lg p-3 text-center">
            <div className="text-muted-foreground mb-1 text-sm">{t("fee")}</div>
            <div className="text-lg font-bold">
              {visaType.fee === 0
                ? t("free")
                : `${visaType.fee} ${visaType.currency}`}
            </div>
          </div>

          {/* Processing Time */}
          <div className="bg-muted/50 rounded-lg p-3 text-center">
            <div className="text-muted-foreground mb-1 text-sm">
              {t("processing")}
            </div>
            <div className="text-lg font-bold">
              {visaType.processingTime} {t("days")}
            </div>
          </div>

          {/* Duration */}
          <div className="bg-muted/50 rounded-lg p-3 text-center">
            <div className="text-muted-foreground mb-1 text-sm">
              {t("validFor")}
            </div>
            <div className="text-lg font-bold">
              {visaType.duration} {t("days")}
            </div>
          </div>

          {/* Entry Type */}
          <div className="bg-muted/50 rounded-lg p-3 text-center">
            <div className="text-muted-foreground mb-1 text-sm">
              {t("entryType")}
            </div>
            <div className="text-lg font-bold">
              {visaType.isMultiEntry ? t("multiple") : t("single")}
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="space-y-3 text-sm">
          {/* Requirements Preview */}
          <div className="flex items-start gap-2">
            <svg
              className="text-muted-foreground mt-0.5 h-4 w-4 flex-shrink-0"
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
            <div>
              <div className="text-foreground mb-1 font-medium">
                {t("requirements")}
              </div>
              <RequiredDocuments
                visaType={visaType}
                compact={true}
                locale={locale}
              />
            </div>
          </div>

          {/* Interview Notice */}
          {visaType.requiresInterview && (
            <div className="flex items-start gap-2 rounded-lg border border-orange-200 bg-orange-50 p-3">
              <svg
                className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <div className="text-orange-800">
                <div className="font-medium">{t("interviewNote")}</div>
                <div className="mt-1 text-xs">{t("interviewDescription")}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="bg-muted/20 border-t p-6">
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground text-xs">
            {t("lastUpdated")}: {new Date().toLocaleDateString(locale)}
          </div>

          <Button
            type="button"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
          >
            {t("checkEligibility")}
          </Button>
        </div>
      </div>
    </div>
  );
}
