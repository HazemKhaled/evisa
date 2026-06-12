import { type NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  const origin = request.nextUrl.origin;

  const card = {
    $schema:
      "https://static.modelcontextprotocol.io/schemas/mcp-server-card/v1.json",
    version: "1.0.0",
    protocolVersion: "2025-06-18",
    serverInfo: {
      name: "GetTravelVisa Agent Tools",
      version: "1.0.0",
      description:
        "Exposes visa catalog tools to retrieve visa requirements and eligibility statuses.",
    },
    transport: {
      type: "streamable-http",
      endpoint: `${origin}/api/mcp`,
    },
    capabilities: {
      tools: true,
      resources: false,
      prompts: false,
    },
    tools: [
      {
        name: "check_visa_eligibility",
        description:
          "Check visa requirements and eligibility between a passport country and destination country.",
        inputSchema: {
          type: "object",
          properties: {
            passportCountry: {
              type: "string",
              description:
                "The ISO 2-letter country code of the passport holder's country",
            },
            destinationCountry: {
              type: "string",
              description:
                "The ISO 2-letter country code of the destination country",
            },
          },
          required: ["passportCountry", "destinationCountry"],
        },
      },
      {
        name: "search_destinations",
        description:
          "Search the visa catalog for available destination countries.",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "The country name or query string to search for",
            },
          },
          required: ["query"],
        },
      },
    ],
  };

  return new NextResponse(JSON.stringify(card, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
