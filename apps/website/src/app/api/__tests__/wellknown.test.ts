/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";

import { GET as getMcpCard } from "../../.well-known/mcp/server-card.json/route";

describe(".well-known Routes", () => {
  describe("MCP Server Card Route", () => {
    it("should return the correct schema and tools at top level", async () => {
      const request = new NextRequest(
        "http://localhost/.well-known/mcp/server-card.json"
      );
      const response = await getMcpCard(request);
      const body = (await response.json()) as {
        $schema: string;
        capabilities: { tools: boolean };
        tools: { name: string }[];
      };

      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toBe(
        "application/json; charset=utf-8"
      );
      expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");

      expect(body.$schema).toBe(
        "https://static.modelcontextprotocol.io/schemas/mcp-server-card/v1.json"
      );
      expect(body.capabilities.tools).toBe(true);
      expect(body.tools).toBeDefined();
      expect(body.tools.length).toBe(2);
      expect(body.tools[0].name).toBe("check_visa_eligibility");
      expect(body.tools[1].name).toBe("search_destinations");
    });
  });
});
