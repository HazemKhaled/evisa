"use client";

import { Button } from "@repo/ui";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

interface VisaTypeAffiliateCtaProps {
  visaType: string;
  destinationCode: string;
  locale: string;
}

/**
 * VisaTypeAffiliateCta renders the dynamic affiliate routing CTA on a visa
 * detail page. It falls back to a plain "Start Your Application" button when
 * no partner is available for this visa type.
 */
export function VisaTypeAffiliateCta({
  visaType,
  destinationCode,
  locale,
}: VisaTypeAffiliateCtaProps) {
  // Build the affiliate URL client-side so the component stays lightweight
  // and the page stays server-renderable.
  const utmParams = new URLSearchParams({
    utm_source: "gettravelvisa.com",
    utm_medium: "referral",
    utm_campaign: "affiliate_cta",
    utm_term: locale,
    destination_code: destinationCode,
    visa_type: visaType,
  });

  const affiliateUrl = `https://www.ivisa.com/apply?${utmParams.toString()}`;

  return (
    <Link href={affiliateUrl} target="_blank" rel="noopener noreferrer">
      <Button size="lg" className="w-full sm:w-auto">
        Apply Now <ExternalLink className="ml-2 h-4 w-4" />
      </Button>
    </Link>
  );
}
