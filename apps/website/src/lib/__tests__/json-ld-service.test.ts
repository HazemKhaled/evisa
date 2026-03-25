import { generateVisaServiceJsonLd } from "../json-ld";

describe("generateVisaServiceJsonLd", () => {
  const service = {
    name: "tourist",
    description: "Tourist visa description",
    url: "https://gettravelvisa.com/en/d/CF/v/tourist",
    destinationName: "Central African Republic",
    destinationCode: "CF",
    providerName: "GetTravelVisa.com",
    providerUrl: "https://gettravelvisa.com",
    fee: 0,
    currency: "USD",
    processingDays: 14,
    durationDays: 30,
    localizedProcessingLabel: "Processing Time",
  };

  it("should not include top-level processingTime property", () => {
    const result = generateVisaServiceJsonLd(service);
    expect(result).not.toHaveProperty("processingTime");
  });

  it("should include processing time in additionalProperty with ISO 8601 duration and valueReference", () => {
    const result = generateVisaServiceJsonLd(service);
    const processingTimeProp = result.additionalProperty.find(
      (p: { name: string }) => p.name === "Processing Time"
    ) as { value: string; valueReference: string } | undefined;

    expect(processingTimeProp).toBeDefined();
    expect(processingTimeProp?.value).toBe("P14D");
    expect(processingTimeProp?.valueReference).toBe(
      "https://schema.org/Duration"
    );
  });

  it("should use localizedProcessingTime if provided", () => {
    const localizedService = {
      ...service,
      localizedProcessingTime: "PT24H",
    };
    const result = generateVisaServiceJsonLd(localizedService);
    const processingTimeProp = result.additionalProperty.find(
      (p: { name: string }) => p.name === "Processing Time"
    ) as { value: string } | undefined;

    expect(processingTimeProp?.value).toBe("PT24H");
  });
});
