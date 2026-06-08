import i18next from "i18next";
import { type NextRequest, NextResponse } from "next/server";

import { fallbackLng } from "@/app/i18n/settings";
import { searchCountries } from "@/lib/services/country-service";
import { checkVisaEligibility } from "@/lib/services/visa-service";

export function GET() {
  return NextResponse.json({
    status: "ok",
    message:
      "MCP streamable endpoint is running. Connect via POST JSON-RPC requests.",
  });
}

interface JsonRpcRequest {
  jsonrpc?: string;
  method?: string;
  params?: {
    name?: string;
    arguments?: Record<string, unknown>;
    locale?: string;
  };
  id?: string | number | null;
}

export async function POST(request: NextRequest) {
  let body: JsonRpcRequest;
  try {
    body = (await request.json()) as JsonRpcRequest;
  } catch {
    return NextResponse.json(
      {
        jsonrpc: "2.0",
        id: null,
        error: {
          code: -32700,
          message: "Parse error (Invalid JSON)",
        },
      },
      { status: 400 }
    );
  }

  try {
    const { jsonrpc, method, params, id } = body;

    if (jsonrpc !== "2.0") {
      return NextResponse.json(
        {
          jsonrpc: "2.0",
          id: id ?? null,
          error: {
            code: -32600,
            message: "Invalid request (only JSON-RPC 2.0 is supported)",
          },
        },
        { status: 400 }
      );
    }

    switch (method) {
      case "initialize":
        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          result: {
            protocolVersion: "2025-06-18",
            capabilities: {
              tools: {},
            },
            serverInfo: {
              name: "GetTravelVisa Agent Tools",
              version: "1.0.0",
            },
          },
        });

      case "tools/list":
        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          result: {
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
                    locale: {
                      type: "string",
                      description:
                        "The language locale for localized content (optional, e.g. en, es, ar)",
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
                      description:
                        "The country name or query string to search for",
                    },
                    locale: {
                      type: "string",
                      description:
                        "The language locale for localized content (optional, e.g. en, es, ar)",
                    },
                  },
                  required: ["query"],
                },
              },
            ],
          },
        });

      case "tools/call": {
        const { name, arguments: args } = params || {};
        if (!name) {
          return NextResponse.json({
            jsonrpc: "2.0",
            id,
            error: {
              code: -32602,
              message: "Invalid params (missing tool name)",
            },
          });
        }

        const urlLocale = request.nextUrl.searchParams.get("locale");
        const jsonRpcLocale = params?.locale;
        const argLocale = args?.locale as string | undefined;
        const i18nCustom = i18next as unknown as Record<string, unknown>;
        const locale = String(
          argLocale ||
            jsonRpcLocale ||
            urlLocale ||
            (typeof i18nCustom.locale === "string" ? i18nCustom.locale : "") ||
            i18next.language ||
            fallbackLng ||
            "en"
        )
          .toLowerCase()
          .trim();

        if (name === "check_visa_eligibility") {
          const passport = String(args?.passportCountry || "")
            .toUpperCase()
            .trim();
          const destination = String(args?.destinationCountry || "")
            .toUpperCase()
            .trim();

          if (!passport || !destination) {
            return NextResponse.json({
              jsonrpc: "2.0",
              id,
              error: {
                code: -32602,
                message:
                  "Both passportCountry and destinationCountry arguments are required",
              },
            });
          }

          const result = await checkVisaEligibility(
            passport,
            destination,
            locale
          );
          if (!result) {
            return NextResponse.json({
              jsonrpc: "2.0",
              id,
              result: {
                content: [
                  {
                    type: "text",
                    text: `Eligibility data not found for passport '${passport}' and destination '${destination}'.`,
                  },
                ],
                isError: true,
              },
            });
          }

          return NextResponse.json({
            jsonrpc: "2.0",
            id,
            result: {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(result, null, 2),
                },
              ],
            },
          });
        }

        if (name === "search_destinations") {
          const query = String(args?.query || "").trim();
          if (!query) {
            return NextResponse.json({
              jsonrpc: "2.0",
              id,
              error: {
                code: -32602,
                message: "The query argument is required",
              },
            });
          }

          const results = await searchCountries(query, locale, 10);
          return NextResponse.json({
            jsonrpc: "2.0",
            id,
            result: {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(results, null, 2),
                },
              ],
            },
          });
        }

        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          error: {
            code: -32601,
            message: `Tool '${name}' not found`,
          },
        });
      }

      default:
        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          error: {
            code: -32601,
            message: `Method '${method}' not found`,
          },
        });
    }
  } catch (error) {
    console.error("MCP endpoint error:", error);
    return NextResponse.json(
      {
        jsonrpc: "2.0",
        error: {
          code: -32603,
          message: "Internal server error during MCP request processing",
        },
      },
      { status: 500 }
    );
  }
}
