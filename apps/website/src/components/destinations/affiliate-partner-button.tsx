"use client";

import { Button } from "@repo/ui";
import { cn } from "@repo/utils";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

interface AffiliatePartnerButtonProps {
  partnerSlug: string;
  partnerName: string;
  destinationCode: string;
  passportCode?: string;
  visaType?: string;
  size?: "default" | "sm" | "lg";
  variant?: "default" | "outline" | "secondary";
  className?: string;
}

/**
 * AffiliatePartnerButton renders a CTA button that routes the user through an
 * affiliate tracking URL to a partner service (iVisa, Veeza.ai, Airalo, etc.).
 *
 * The button opens in a new tab to preserve the user's research session on
 * GetTravelVisa.com. UTM parameters are injected for commission attribution.
 */
export function AffiliatePartnerButton({
  partnerSlug,
  partnerName,
  destinationCode,
  passportCode,
  visaType,
  size = "default",
  variant = "default",
  className,
}: AffiliatePartnerButtonProps) {
  const url =
    typeof window === "undefined"
      ? ""
      : `https://www.${partnerSlug.toLowerCase()}.com/apply?utm_source=gettravelvisa.com&utm_medium=referral&utm_campaign=affiliate_cta&utm_term=${encodeURIComponent(
          destinationCode
        )}&passport_code=${encodeURIComponent(passportCode ?? "")}&visa_type=${encodeURIComponent(
          visaType ?? ""
        )}`;

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("w-full", className)}
    >
      <Button size={size} variant={variant} className="w-full">
        {partnerName} <ExternalLink className="ml-2 h-4 w-4" />
      </Button>
    </Link>
  );
}
