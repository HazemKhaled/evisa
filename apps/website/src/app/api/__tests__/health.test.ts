/**
 * @jest-environment node
 */
import { GET } from "../health/route";

describe("Health API Route", () => {
  it("should return ok status and no-cache headers", async () => {
    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({ status: "ok" });
    expect(response.headers.get("Cache-Control")).toBe(
      "no-store, no-cache, must-revalidate"
    );
  });
});
