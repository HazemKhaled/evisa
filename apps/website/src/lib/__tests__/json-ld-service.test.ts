import {
  generateGovernmentServiceJsonLd,
  generateVisaServiceJsonLd,
} from "../json-ld";

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

describe("generateGovernmentServiceJsonLd", () => {
  it("generates a GovernmentService schema tailored to the [Passport] -> [Destination] pair", () => {
    const schema = generateGovernmentServiceJsonLd({
      name: "United States to United Arab Emirates Visa Requirements",
      description:
        "United States citizens do not need a visa for United Arab Emirates in 2026.",
      url: "https://gettravelvisa.com/en/d/ae/p/us",
      serviceType: "Visa Eligibility & Application Service",
      destinationName: "United Arab Emirates",
      destinationCode: "AE",
      passportName: "United States",
      passportCode: "US",
      eligibilityStatus: "visa_free",
      maxStayDays: 30,
      processingTimeRange: { min: 2, max: 5 },
      feeRange: { min: 50, max: 120, currency: "USD" },
    });

    expect(schema).toMatchObject({
      "@context": "https://schema.org",
      "@type": "GovernmentService",
      name: "United States to United Arab Emirates Visa Requirements",
      url: "https://gettravelvisa.com/en/d/ae/p/us",
      areaServed: {
        "@type": "Country",
        name: "United Arab Emirates",
        identifier: "AE",
      },
      audience: {
        "@type": "Audience",
        audienceType: "United States",
        geographicArea: {
          "@type": "Country",
          name: "United States",
          identifier: "US",
        },
      },
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "50",
        highPrice: "120",
        priceCurrency: "USD",
      },
    });
    expect(schema.additionalProperty).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "eligibilityStatus",
          value: "visa_free",
        }),
        expect.objectContaining({
          name: "maxStayDays",
          value: "30",
        }),
      ])
    );
  });
});
