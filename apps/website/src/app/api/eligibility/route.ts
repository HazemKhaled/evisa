import { type NextRequest, NextResponse } from "next/server";

import { checkVisaEligibility } from "@/lib/services/visa-service";

export const runtime = "edge"; // Run on Edge runtime for performance

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const passport = searchParams.get("passport")?.toUpperCase().trim() || "";
  const destination =
    searchParams.get("destination")?.toUpperCase().trim() || "";
  const locale = searchParams.get("locale") || "en";

  if (!passport || !destination) {
    return NextResponse.json(
      {
        error:
          "Both 'passport' and 'destination' query parameters are required.",
      },
      { status: 400 }
    );
  }

  try {
    const result = await checkVisaEligibility(passport, destination, locale);
    if (!result) {
      return NextResponse.json(
        {
          error: `Eligibility data not found for passport '${passport}' and destination '${destination}'.`,
        },
        { status: 404 }
      );
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error("Eligibility endpoint error:", error);
    return NextResponse.json(
      { error: "Internal server error during eligibility check." },
      { status: 500 }
    );
  }
}
