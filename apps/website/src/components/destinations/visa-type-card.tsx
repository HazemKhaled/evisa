import { cn } from "@repo/utils";
import {
  ArrowLeftRight,
  ArrowRight,
  Calendar,
  ClipboardList,
  Clock,
  DollarSign,
  Hourglass,
  MessageSquare,
  Zap,
} from "lucide-react";
import Link from "next/link";

import type { VisaTypeWithI18n } from "@/lib/services/visa-service";
import {
  getCountryFlagEmoji,
  getVisaCategoryConfig,
  isFastProcessing,
  toVisaSlug,
} from "@/lib/utils/visa-type-utils";

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
  const visaUrl = `/${locale}/d/${visaType.destinationCode}/v/${toVisaSlug(visaType.type)}`;
  const descriptionId = `visa-desc-${visaType.id}`;
  const config = getVisaCategoryConfig(visaType.type);
  const flagEmoji = getCountryFlagEmoji(visaType.destinationCode);
  const fastProcessing = isFastProcessing(visaType.processingTime);
  const hasDocuments = visaType.documents && visaType.documents.length > 0;

  return (
    <Link href={visaUrl} className={cn("group", className)}>
      <div
        className={cn(
          "overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300",
          "hover:-translate-y-1 hover:shadow-lg",
          "border-s-4",
          config.borderClass
        )}
        aria-describedby={visaType.description ? descriptionId : undefined}
      >
        {/* Header with category color */}
        <div className={cn("px-5 pt-5 pb-3", config.bgClass)}>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/80 text-lg shadow-sm",
                  config.textClass
                )}
                aria-hidden="true"
              >
                {flagEmoji}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-gray-600">
                  {visaType.destinationName}
                </span>
                <h3 className="group-hover:text-primary-600 text-lg font-bold text-gray-900 transition-colors">
                  {visaType.name}
                </h3>
              </div>
            </div>
            <span
              className={cn(
                "inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
                config.badgeBgClass,
                config.badgeTextClass
              )}
            >
              {visaType.type}
            </span>
          </div>
        </div>

        {/* Badges row */}
        <div className="flex flex-wrap gap-2 px-5 pt-3">
          {fastProcessing && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
              <Zap className="h-3 w-3" aria-hidden="true" />
              {tCommon("labels.fastProcessing")}
            </span>
          )}
          {visaType.requiresInterview && (
            <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2.5 py-1 text-xs font-medium text-orange-700">
              <MessageSquare className="h-3 w-3" aria-hidden="true" />
              {tCommon("labels.interviewRequired")}
            </span>
          )}
          {hasDocuments && (
            <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-700">
              <ClipboardList className="h-3 w-3" aria-hidden="true" />
              {tCommon("labels.documentsRequired")}
            </span>
          )}
          {visaType.isMultiEntry && (
            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
              <ArrowLeftRight className="h-3 w-3" aria-hidden="true" />
              {tCommon("labels.multiEntry")}
            </span>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 px-5 pt-4 pb-4">
          {/* Processing Time */}
          <div className="bg-muted/50 rounded-lg p-3 text-center">
            <div className="mb-1 flex items-center justify-center gap-1 text-xs text-gray-500">
              <Clock className="h-3 w-3" aria-hidden="true" />
              <span>{tCommon("labels.processingTime")}</span>
            </div>
            <div className="text-sm font-bold text-gray-900">
              {visaType.processingTime}{" "}
              {visaType.processingTime === 1
                ? tCommon("labels.day")
                : tCommon("labels.days")}
            </div>
          </div>

          {/* Duration */}
          <div className="bg-muted/50 rounded-lg p-3 text-center">
            <div className="mb-1 flex items-center justify-center gap-1 text-xs text-gray-500">
              <Calendar className="h-3 w-3" aria-hidden="true" />
              <span>{tCommon("labels.duration")}</span>
            </div>
            <div className="text-sm font-bold text-gray-900">
              {visaType.duration}{" "}
              {visaType.duration === 1
                ? tCommon("labels.day")
                : tCommon("labels.days")}
            </div>
          </div>

          {/* Fee */}
          <div className="bg-muted/50 rounded-lg p-3 text-center">
            <div className="mb-1 flex items-center justify-center gap-1 text-xs text-gray-500">
              <DollarSign className="h-3 w-3" aria-hidden="true" />
              <span>{tCommon("labels.fee")}</span>
            </div>
            <div className="text-sm font-bold text-gray-900">
              {visaType.fee === 0
                ? tCommon("labels.free")
                : `${visaType.fee} ${visaType.currency}`}
            </div>
          </div>

          {/* Max Stay or Entry Type */}
          {visaType.maxStay ? (
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <div className="mb-1 flex items-center justify-center gap-1 text-xs text-gray-500">
                <Hourglass className="h-3 w-3" aria-hidden="true" />
                <span>{tCommon("labels.maxStay")}</span>
              </div>
              <div className="text-sm font-bold text-gray-900">
                {visaType.maxStay}{" "}
                {visaType.maxStay === 1
                  ? tCommon("labels.day")
                  : tCommon("labels.days")}
              </div>
            </div>
          ) : (
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <div className="mb-1 flex items-center justify-center gap-1 text-xs text-gray-500">
                <ArrowLeftRight className="h-3 w-3" aria-hidden="true" />
                <span>{tCommon("labels.entryType")}</span>
              </div>
              <div className="text-sm font-bold text-gray-900">
                {visaType.isMultiEntry
                  ? tCommon("labels.multiple")
                  : tCommon("labels.single")}
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        {visaType.description && (
          <div className="border-t border-gray-100 px-5 pt-3 pb-4">
            <p
              id={descriptionId}
              className="line-clamp-2 text-sm leading-relaxed text-gray-500"
            >
              {visaType.description}
            </p>
          </div>
        )}

        {/* Footer Strip */}
        <div
          className={cn(
            "flex items-center justify-end border-t px-5 py-3",
            config.bgClass
          )}
        >
          <span
            className={cn(
              "inline-flex items-center gap-1 text-xs font-medium",
              config.textClass
            )}
          >
            {tCommon("buttons.learnMore")}
            <ArrowRight
              className="h-3.5 w-3.5 rtl:rotate-180"
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
