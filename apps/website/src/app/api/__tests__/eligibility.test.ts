/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";

import { checkVisaEligibility } from "../../../lib/services/visa-service";
import { GET } from "../eligibility/route";

jest.mock("../../../lib/services/visa-service");

interface EligibilityTestResponse {
  allowed?: boolean;
  visaRequirement?: string;
  error?: string;
}

describe("Eligibility API Route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if passport is missing", async () => {
    const request = new NextRequest(
      "http://localhost/api/eligibility?destination=FRA",
      {
        method: "GET",
      }
    );

    const response = await GET(request);
    const body = (await response.json()) as EligibilityTestResponse;

    expect(response.status).toBe(400);
    expect(body.error).toContain("required");
  });

  it("should return 400 if destination is missing", async () => {
    const request = new NextRequest(
      "http://localhost/api/eligibility?passport=USA",
      {
        method: "GET",
      }
    );

    const response = await GET(request);
    const body = (await response.json()) as EligibilityTestResponse;

    expect(response.status).toBe(400);
    expect(body.error).toContain("required");
  });

  it("should return 404 if checkVisaEligibility returns null", async () => {
    (checkVisaEligibility as jest.Mock).mockResolvedValue(null);

    const request = new NextRequest(
      "http://localhost/api/eligibility?passport=USA&destination=XYZ",
      {
        method: "GET",
      }
    );

    const response = await GET(request);
    const body = (await response.json()) as EligibilityTestResponse;

    expect(response.status).toBe(404);
    expect(body.error).toContain("not found");
  });

  it("should return 200 and eligibility data on success", async () => {
    const mockResult = {
      allowed: true,
      visaRequirement: "No visa required",
    };
    (checkVisaEligibility as jest.Mock).mockResolvedValue(mockResult);

    const request = new NextRequest(
      "http://localhost/api/eligibility?passport=USA&destination=FRA",
      {
        method: "GET",
      }
    );

    const response = await GET(request);
    const body = (await response.json()) as EligibilityTestResponse;

    expect(response.status).toBe(200);
    expect(body).toEqual(mockResult);
    expect(checkVisaEligibility).toHaveBeenCalledWith("USA", "FRA", "en");
  });
});
