import { type NextRequest, NextResponse } from "next/server";

import { searchCountries } from "@/lib/services/country-service";

export const runtime = "edge"; // Run on Edge runtime for performance

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || searchParams.get("query") || "";
  const locale = searchParams.get("locale") || "en";
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? parseInt(limitParam, 10) : 10;

  if (!query.trim()) {
    return NextResponse.json([]);
  }

  try {
    const results = await searchCountries(query, locale, limit);
    return NextResponse.json(results);
  } catch (error) {
    console.error("Destination search error:", error);
    return NextResponse.json(
      { error: "Internal server error during destination search." },
      { status: 500 }
    );
  }
}
