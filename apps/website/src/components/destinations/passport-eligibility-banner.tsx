"use client";

import { useEffect, useState } from "react";

interface PassportEligibilityBannerProps {
  destinationCode: string;
  destinationName: string;
  locale: string;
}

/**
 * Client component that reads ?passport= via URLSearchParams and shows
 * personalized eligibility status via /api/eligibility.
 */
export function PassportEligibilityBanner({
  destinationCode,
  destinationName,
  locale,
}: PassportEligibilityBannerProps) {
  const [data, setData] = useState<{
    passportName: string;
    eligibilityStatus: string;
    maxStayDays?: number;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchEligibility() {
      if (typeof window === "undefined") return;

      const params = new URLSearchParams(window.location.search);
      const passport = params.get("passport")?.trim().toUpperCase();

      if (!passport || !/^[A-Z]{2}$/.test(passport)) {
        return;
      }

      try {
        const res = await fetch(
          `/api/eligibility?passport=${passport}&destination=${destinationCode}&locale=${locale}`
        );
        if (!res.ok) {
          throw new Error(
            `Eligibility request failed with status ${res.status}`
          );
        }
        const result = (await res.json()) as {
          passportName?: string;
          eligibilityStatus?: string;
          maxStayDays?: number;
        };
        if (cancelled) return;
        setData({
          passportName: result.passportName || passport,
          eligibilityStatus: result.eligibilityStatus || "unknown",
          maxStayDays: result.maxStayDays,
        });
      } catch (err) {
        if (cancelled) return;
        console.error("Eligibility fetch error:", err);
      }
    }

    fetchEligibility();
    return () => {
      cancelled = true;
    };
  }, [destinationCode, destinationName, locale]);

  if (!data) return null;

  const statusColors: Record<
    string,
    { bg: string; text: string; border: string }
  > = {
    visa_free: {
      bg: "bg-green-50",
      text: "text-green-700",
      border: "border-green-200",
    },
    on_arrival: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      border: "border-blue-200",
    },
    eta: {
      bg: "bg-amber-50",
      text: "text-amber-700",
      border: "border-amber-200",
    },
    required: {
      bg: "bg-orange-50",
      text: "text-orange-700",
      border: "border-orange-200",
    },
    not_allowed: {
      bg: "bg-red-50",
      text: "text-red-700",
      border: "border-red-200",
    },
  };

  const style = statusColors[data.eligibilityStatus] || statusColors.required;

  return (
    <section
      id="visa-eligibility"
      className={`mb-8 rounded-lg border p-4 ${style.bg} ${style.border}`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full ${style.text}`}
        >
          {data.eligibilityStatus === "visa_free" ? "✓" : "ℹ"}
        </div>
        <div>
          <h3 className="mb-1 text-sm font-semibold text-gray-900">
            Visa Eligibility for {data.passportName}
          </h3>
          <p className="{style.text} text-xs font-medium tracking-wider uppercase">
            {data.eligibilityStatus.replace(/_/g, " ")}
          </p>
          {data.maxStayDays && (
            <p className="mt-1 text-sm text-gray-700">
              Max stay: {data.maxStayDays} days
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
