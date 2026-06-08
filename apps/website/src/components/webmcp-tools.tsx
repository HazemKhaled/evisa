"use client";

import { useEffect } from "react";

interface WebMcpTool {
  name: string;
  description: string;
  inputSchema: {
    type: string;
    properties: Record<string, { type: string; description?: string }>;
    required: string[];
  };
  execute: (params: Record<string, string>) => Promise<unknown>;
}

interface WebMcpNavigator extends Navigator {
  modelContext?: {
    provideContext: (config: { tools: WebMcpTool[] }) => void;
  };
}

export function WebMcpTools() {
  useEffect(() => {
    const nav =
      typeof window !== "undefined" ? (navigator as WebMcpNavigator) : null;
    if (
      nav?.modelContext &&
      typeof nav.modelContext.provideContext === "function"
    ) {
      try {
        nav.modelContext.provideContext({
          tools: [
            {
              name: "check_visa_eligibility",
              description:
                "Check visa requirements and eligibility between passport country and destination country.",
              inputSchema: {
                type: "object",
                properties: {
                  passportCountry: {
                    type: "string",
                    description:
                      "The ISO 2-letter or 3-letter country code of the passport holder",
                  },
                  destinationCountry: {
                    type: "string",
                    description:
                      "The ISO 2-letter or 3-letter country code of the destination country",
                  },
                },
                required: ["passportCountry", "destinationCountry"],
              },
              execute: async (params: Record<string, string>) => {
                try {
                  const res = await fetch(
                    `/api/eligibility?passport=${encodeURIComponent(params.passportCountry || "")}&destination=${encodeURIComponent(params.destinationCountry || "")}`
                  );
                  return await res.json();
                } catch (e) {
                  return {
                    error:
                      e instanceof Error
                        ? e.message
                        : "Failed to fetch eligibility",
                  };
                }
              },
            },
            {
              name: "search_destinations",
              description:
                "Search for visa destination countries in the catalog.",
              inputSchema: {
                type: "object",
                properties: {
                  query: {
                    type: "string",
                    description: "Search query or country name",
                  },
                },
                required: ["query"],
              },
              execute: async (params: Record<string, string>) => {
                try {
                  const res = await fetch(
                    `/api/search?q=${encodeURIComponent(params.query || "")}`
                  );
                  return await res.json();
                } catch (e) {
                  return {
                    error:
                      e instanceof Error
                        ? e.message
                        : "Failed to search destinations",
                  };
                }
              },
            },
          ],
        });
        console.log("WebMCP tools registered successfully.");
      } catch (err) {
        console.error("Error registering WebMCP tools:", err);
      }
    }
  }, []);

  return null;
}
