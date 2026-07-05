/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";

import { searchCountries } from "../../../lib/services/country-service";
import { GET } from "../search/route";

jest.mock("../../../lib/services/country-service");

describe("Search API Route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if search query is missing", async () => {
    const request = new NextRequest("http://localhost/api/search", {
      method: "GET",
    });

    const response = await GET(request);
    const body = (await response.json()) as { error: string };

    expect(response.status).toBe(400);
    expect(body.error).toContain("required");
  });

  it("should return 400 if search query is blank", async () => {
    const request = new NextRequest("http://localhost/api/search?q=%20%20", {
      method: "GET",
    });

    const response = await GET(request);
    const body = (await response.json()) as { error: string };

    expect(response.status).toBe(400);
    expect(body.error).toContain("required");
  });

  it("should return 200 and country results on success", async () => {
    const mockResults = [
      { code: "FRA", name: "France" },
      { code: "DEU", name: "Germany" },
    ];
    (searchCountries as jest.Mock).mockResolvedValue(mockResults);

    const request = new NextRequest(
      "http://localhost/api/search?q=europe&limit=5",
      {
        method: "GET",
      }
    );

    const response = await GET(request);
    const body = (await response.json()) as { code: string; name: string }[];

    expect(response.status).toBe(200);
    expect(body).toEqual(mockResults);
    expect(searchCountries).toHaveBeenCalledWith("europe", "en", 5);
  });
});
