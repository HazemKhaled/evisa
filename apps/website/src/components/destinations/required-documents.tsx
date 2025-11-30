import { cn } from "@repo/utils";

import { getTranslation } from "@/app/i18n";
import type { VisaTypeInfo } from "@/lib/services/country-service";

interface RequiredDocumentsProps {
  visaType: VisaTypeInfo;
  compact?: boolean;
  locale: string;
  className?: string;
}

export async function RequiredDocuments({
  visaType,
  compact = false,
  locale,
  className,
}: RequiredDocumentsProps) {
  const { t } = await getTranslation(locale, "destination-page", {
    keyPrefix: "documents",
  });

  // Default document requirements for most visa types
  const defaultDocuments = [
    t("passport"),
    t("application"),
    t("photo"),
    t("financialProof"),
  ];

  // Use default documents as actual requirements property doesn't exist in current schema
  const documents = defaultDocuments;

  if (compact) {
    return (
      <div className={cn("text-sm", className)}>
        <div className="text-muted-foreground">
          {t("commonRequirements")}: {documents.slice(0, 3).join(", ")}
          {documents.length > 3 && (
            <span className="text-primary ml-1">
              +{documents.length - 3} {t("more")}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <h4 className="text-foreground font-semibold">{t("title")}</h4>

      <div className="grid gap-3">
        {documents.map((document: string, index: number) => (
          <div
            key={index}
            className="bg-muted/50 flex items-start gap-3 rounded-lg p-3"
          >
            {/* Document Icon */}
            <div className="bg-primary/10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg">
              {getDocumentIcon(document)}
            </div>

            {/* Document Details */}
            <div className="min-w-0 flex-1">
              <div className="text-foreground font-medium">{document}</div>
              <div className="text-muted-foreground mt-1 text-sm">
                {getDocumentDescription(document, t)}
              </div>
            </div>

            {/* Status/Requirement Indicator */}
            <div className="flex-shrink-0">
              <span className="bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs">
                {t("required")}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Requirements */}
      {visaType.requiresInterview && (
        <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
          <div className="flex items-start gap-3">
            <svg
              className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.959 8.959 0 01-4.906-1.426L3 21l2.426-5.094A8.959 8.959 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z"
              />
            </svg>
            <div>
              <div className="font-medium text-orange-800">
                {t("interviewRequired")}
              </div>
              <div className="mt-1 text-sm text-orange-700">
                {t("interviewDescription")}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Important Notes */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <div className="flex items-start gap-3">
          <svg
            className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <div className="font-medium text-blue-800">
              {t("importantNote")}
            </div>
            <div className="mt-1 text-sm text-blue-700">
              {t("documentNote")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to get appropriate icon for document type
function getDocumentIcon(document: string) {
  const iconClass = "w-4 h-4 text-primary";

  // Map document types to icons
  if (document.toLowerCase().includes("passport")) {
    return (
      <svg
        className={iconClass}
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
    );
  }

  if (document.toLowerCase().includes("photo")) {
    return (
      <svg
        className={iconClass}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    );
  }

  if (
    document.toLowerCase().includes("financial") ||
    document.toLowerCase().includes("bank")
  ) {
    return (
      <svg
        className={iconClass}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
        />
      </svg>
    );
  }

  // Default document icon
  return (
    <svg
      className={iconClass}
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
  );
}

// Helper function to get document description
function getDocumentDescription(
  document: string,
  t: (key: string) => string
): string {
  const docType = document.toLowerCase();

  if (docType.includes("passport")) {
    return t("passportDescription");
  }
  if (docType.includes("application")) {
    return t("applicationDescription");
  }
  if (docType.includes("photo")) {
    return t("photoDescription");
  }
  if (docType.includes("financial") || docType.includes("bank")) {
    return t("financialDescription");
  }

  return t("generalDescription");
}
