import { languages } from "@/app/i18n/settings";

import { generateStaticParams } from "../page";

const mockGetDestinationsListWithMetadata = jest.fn();

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
  headers: jest.fn(),
}));

jest.mock("../../../../../lib/services/country-service", () => ({
  getDestinationsListWithMetadata: (...args: unknown[]) =>
    mockGetDestinationsListWithMetadata(...args),
  getDestinationDetails: jest.fn(),
}));

jest.mock("../../../../../lib/services/blog-service", () => ({
  getBlogPostsByDestination: jest.fn(),
}));

jest.mock("../../../../../lib/services/visa-service", () => ({
  checkVisaEligibility: jest.fn(),
  getVisaRequirements: jest.fn(),
}));

jest.mock("../../../../i18n", () => ({
  getTranslation: jest.fn(),
}));

describe("Destination page generateStaticParams", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns plain { locale, destination } param objects (not Promises) for each locale and destination", async () => {
    mockGetDestinationsListWithMetadata.mockResolvedValue([
      { code: "US" },
      { code: "TR" },
    ]);

    const params = await generateStaticParams();

    expect(mockGetDestinationsListWithMetadata).toHaveBeenCalledWith(
      "en",
      20,
      "popular"
    );
    expect(params).toHaveLength(languages.length * 2);

    for (const entry of params) {
      expect(entry).not.toBeInstanceOf(Promise);
      expect(typeof (entry as { then?: unknown }).then).not.toBe("function");
      expect(entry).toEqual({
        locale: expect.any(String),
        destination: expect.stringMatching(/^(US|TR)$/),
      });
    }
  });
});
