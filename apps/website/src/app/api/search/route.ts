import { type NextRequest, NextResponse } from "next/server";

import { searchCountries } from "@/lib/services/country-service";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || searchParams.get("query") || "";
  const locale = searchParams.get("locale") || "en";
  const limitParam = searchParams.get("limit");
  const parsedLimit = limitParam ? Number.parseInt(limitParam, 10) : 10;
  const limit =
    Number.isFinite(parsedLimit) && parsedLimit > 0
      ? Math.min(parsedLimit, 100)
      : 10;

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
