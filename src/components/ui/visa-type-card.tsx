import Link from "next/link";
import { cn } from "@/lib/utils";
import type { VisaTypeWithI18n } from "@/lib/services/visa-service";

interface VisaTypeCardProps {
  visaType: VisaTypeWithI18n;
  locale: string;
  className?: string;
  tCommon: (key: string) => string;
}

export function VisaTypeCard({
  visaType,
  locale,
  className,
  tCommon,
}: VisaTypeCardProps) {
  const visaUrl = `/${locale}/d/${visaType.destinationCode.toLowerCase()}/v/${visaType.type}`;

  return (
    <Link href={visaUrl} className={cn("group", className)}>
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg">
        <div className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
              {visaType.name}
            </h3>
            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
              {visaType.type}
            </span>
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>{tCommon("labels.destination")}:</span>
              <span className="font-medium text-gray-900">
                {visaType.destinationName}
              </span>
            </div>

            <div className="flex justify-between">
              <span>{tCommon("labels.processingTime")}:</span>
              <span className="font-medium text-gray-900">
                {visaType.processingTime}{" "}
                {visaType.processingTime === 1
                  ? tCommon("labels.day")
                  : tCommon("labels.days")}
              </span>
            </div>

            <div className="flex justify-between">
              <span>{tCommon("labels.duration")}:</span>
              <span className="font-medium text-gray-900">
                {visaType.duration}{" "}
                {visaType.duration === 1
                  ? tCommon("labels.day")
                  : tCommon("labels.days")}
              </span>
            </div>

            <div className="flex justify-between">
              <span>{tCommon("labels.fee")}:</span>
              <span className="font-medium text-gray-900">
                {visaType.fee} {visaType.currency}
              </span>
            </div>

            {visaType.maxStay && (
              <div className="flex justify-between">
                <span>{tCommon("labels.maxStay")}:</span>
                <span className="font-medium text-gray-900">
                  {visaType.maxStay}{" "}
                  {visaType.maxStay === 1
                    ? tCommon("labels.day")
                    : tCommon("labels.days")}
                </span>
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center space-x-4">
            {visaType.isMultiEntry && (
              <span className="inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                {tCommon("labels.multiEntry")}
              </span>
            )}
            {visaType.requiresInterview && (
              <span className="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                {tCommon("labels.interviewRequired")}
              </span>
            )}
          </div>

          {visaType.description && (
            <p className="mt-3 line-clamp-2 text-sm text-gray-600">
              {visaType.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
