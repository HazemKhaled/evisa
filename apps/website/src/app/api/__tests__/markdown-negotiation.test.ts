/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";

import { GET } from "../markdown-negotiation/route";

describe("Markdown Negotiation API Route", () => {
  it("should reject cross-origin target requests with 400 status", async () => {
    const request = new NextRequest(
      "http://localhost/api/markdown-negotiation?url=https://external-site.com/some-page",
      {
        method: "GET",
      }
    );

    const response = await GET(request);
    const text = await response.text();

    expect(response.status).toBe(400);
    expect(text).toContain("Invalid url parameter (cross-origin not allowed)");
  });
});
