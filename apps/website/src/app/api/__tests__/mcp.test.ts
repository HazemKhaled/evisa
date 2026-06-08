/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";

import { searchCountries } from "../../../lib/services/country-service";
import { checkVisaEligibility } from "../../../lib/services/visa-service";
import { GET, POST } from "../mcp/route";

jest.mock("../../../lib/services/country-service");
jest.mock("../../../lib/services/visa-service");

interface McpTestResponse {
  status?: string;
  jsonrpc?: string;
  result?: {
    serverInfo?: {
      name: string;
    };
    tools?: {
      name: string;
    }[];
    content?: {
      text: string;
    }[];
  };
  error?: {
    code: number;
    message: string;
  };
}

describe("MCP API Route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET", () => {
    it("should return ok status", async () => {
      const response = await GET();
      const body = (await response.json()) as McpTestResponse;
      expect(response.status).toBe(200);
      expect(body.status).toBe("ok");
    });
  });

  describe("POST", () => {
    it("should handle initialize request", async () => {
      const request = new NextRequest("http://localhost/api/mcp", {
        method: "POST",
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "initialize",
          id: 1,
        }),
      });

      const response = await POST(request);
      const body = (await response.json()) as McpTestResponse;

      expect(response.status).toBe(200);
      expect(body.jsonrpc).toBe("2.0");
      expect(body.result?.serverInfo?.name).toBe("GetTravelVisa Agent Tools");
    });

    it("should handle tools/list request", async () => {
      const request = new NextRequest("http://localhost/api/mcp", {
        method: "POST",
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "tools/list",
          id: 2,
        }),
      });

      const response = await POST(request);
      const body = (await response.json()) as McpTestResponse;

      expect(response.status).toBe(200);
      expect(body.result?.tools || []).toHaveLength(2);
      expect(body.result?.tools?.[0]?.name).toBe("check_visa_eligibility");
    });

    it("should handle tools/call for check_visa_eligibility", async () => {
      (checkVisaEligibility as jest.Mock).mockResolvedValue({
        allowed: true,
        visaRequirement: "No visa required",
      });

      const request = new NextRequest("http://localhost/api/mcp", {
        method: "POST",
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "tools/call",
          params: {
            name: "check_visa_eligibility",
            arguments: {
              passportCountry: "USA",
              destinationCountry: "FRA",
            },
          },
          id: 3,
        }),
      });

      const response = await POST(request);
      const body = (await response.json()) as McpTestResponse;

      expect(response.status).toBe(200);
      expect(checkVisaEligibility).toHaveBeenCalledWith("USA", "FRA", "en");
      expect(body.result?.content?.[0]?.text).toContain("No visa required");
    });

    it("should handle tools/call for search_destinations", async () => {
      (searchCountries as jest.Mock).mockResolvedValue([
        { code: "FRA", name: "France" },
      ]);

      const request = new NextRequest("http://localhost/api/mcp", {
        method: "POST",
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "tools/call",
          params: {
            name: "search_destinations",
            arguments: {
              query: "France",
            },
          },
          id: 4,
        }),
      });

      const response = await POST(request);
      const body = (await response.json()) as McpTestResponse;

      expect(response.status).toBe(200);
      expect(searchCountries).toHaveBeenCalledWith("France", "en", 10);
      expect(body.result?.content?.[0]?.text).toContain("FRA");
    });

    it("should reject invalid jsonrpc version", async () => {
      const request = new NextRequest("http://localhost/api/mcp", {
        method: "POST",
        body: JSON.stringify({
          jsonrpc: "1.0",
          method: "initialize",
          id: 1,
        }),
      });

      const response = await POST(request);
      expect(response.status).toBe(400);
    });
  });
});
