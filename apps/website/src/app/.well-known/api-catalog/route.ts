import { type NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  const origin = request.nextUrl.origin;

  const catalog = {
    linkset: [
      {
        anchor: `${origin}/`,
        "service-desc": [
          {
            href: `${origin}/openapi.json`,
            type: "application/json",
          },
        ],
        "service-doc": [
          {
            href: `${origin}/`,
            type: "text/html",
          },
        ],
        status: [
          {
            href: `${origin}/api/health`,
            type: "application/json",
          },
        ],
      },
    ],
  };

  return new NextResponse(JSON.stringify(catalog, null, 2), {
    headers: {
      "Content-Type": "application/linkset+json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
