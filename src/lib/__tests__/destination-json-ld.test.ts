import { generateDestinationJsonLd } from "../json-ld";
import type { DestinationWithVisaTypes } from "../services/country-service";

// Mock environment
jest.mock("../consts", () => ({
  env: {
    baseUrl: "https://gettravelvisa.com",
  },
}));

const mockDestinationData: DestinationWithVisaTypes = {
  id: 1,
  code: "UAE",
  name: "UAE",
  localizedName: "United Arab Emirates",
  heroImage: "https://example.com/uae.jpg",
  about: "A modern Middle Eastern country known for luxury and innovation.",
  continent: "Asia",
  region: "Middle East",
  visaTypes: [
    {
      id: 1,
      type: "tourist",
      name: "Tourist Visa",
      duration: 30,
      fee: 100,
      currency: "USD",
      processingTime: 3,
      requiresInterview: false,
      isMultiEntry: false,
    },
    {
      id: 2,
      type: "business",
      name: "Business Visa",
      duration: 90,
      fee: 200,
      currency: "USD",
      processingTime: 7,
      requiresInterview: true,
      isMultiEntry: true,
    },
  ],
  totalVisaTypes: 2,
  hasVisaFreeEntry: false,
  hasVisaOnArrival: true,
};

describe("generateDestinationJsonLd", () => {
  it("should generate valid JSON-LD structure", () => {
    const result = generateDestinationJsonLd(mockDestinationData, "en");

    expect(result).toHaveProperty("@context", "https://schema.org");
    expect(result).toHaveProperty("@type", "Place");
    expect(result).toHaveProperty("name", "United Arab Emirates");
    expect(result).toHaveProperty("url", "https://gettravelvisa.com/en/d/uae");
  });

  it("should include destination image when provided", () => {
    const result = generateDestinationJsonLd(mockDestinationData, "en");

    expect(result).toHaveProperty("image", "https://example.com/uae.jpg");
  });

  it("should include address information", () => {
    const result = generateDestinationJsonLd(mockDestinationData, "en");

    expect(result).toHaveProperty("address");
    const address = result.address as any;
    expect(address).toHaveProperty("@type", "PostalAddress");
    expect(address).toHaveProperty("addressCountry", "UAE");
    expect(address).toHaveProperty("addressRegion", "Middle East");
  });

  it("should include continent information", () => {
    const result = generateDestinationJsonLd(mockDestinationData, "en");

    expect(result).toHaveProperty("containedInPlace");
    const containedInPlace = result.containedInPlace as any;
    expect(containedInPlace).toHaveProperty("@type", "AdministrativeArea");
    expect(containedInPlace).toHaveProperty("name", "Asia");
  });

  it("should include visa services when visa types exist", () => {
    const result = generateDestinationJsonLd(mockDestinationData, "en");

    expect(result).toHaveProperty("containsPlace");
    const services = result.containsPlace as any[];
    expect(services).toHaveLength(2);

    const touristVisa = services[0];
    expect(touristVisa).toHaveProperty("@type", "Service");
    expect(touristVisa).toHaveProperty("name", "Tourist Visa");
    expect(touristVisa).toHaveProperty(
      "serviceType",
      "Visa Application Service"
    );
  });

  it("should include offer information for visa services", () => {
    const result = generateDestinationJsonLd(mockDestinationData, "en");

    const services = result.containsPlace as any[];
    const touristVisa = services[0];

    expect(touristVisa).toHaveProperty("offers");
    const offer = touristVisa.offers;
    expect(offer).toHaveProperty("@type", "Offer");
    expect(offer).toHaveProperty("price", "100");
    expect(offer).toHaveProperty("priceCurrency", "USD");
    expect(offer).toHaveProperty("availability", "https://schema.org/InStock");
  });

  it("should include travel action information", () => {
    const result = generateDestinationJsonLd(mockDestinationData, "en");

    expect(result).toHaveProperty("mainEntity");
    const mainEntity = result.mainEntity as any;
    expect(mainEntity).toHaveProperty("@type", "TravelAction");
    expect(mainEntity).toHaveProperty("name", "Travel to United Arab Emirates");
  });

  it("should include visa-free travel type when applicable", () => {
    const visaFreeDestination = {
      ...mockDestinationData,
      hasVisaFreeEntry: true,
    };
    const result = generateDestinationJsonLd(visaFreeDestination, "en");

    const mainEntity = result.mainEntity as any;
    expect(mainEntity).toHaveProperty(
      "additionalType",
      "https://schema.org/VisaFreeTravel"
    );
  });

  it("should include additional properties", () => {
    const result = generateDestinationJsonLd(mockDestinationData, "en");

    expect(result).toHaveProperty("additionalProperty");
    const properties = result.additionalProperty as any[];
    expect(properties).toHaveLength(3);

    const visaTypesProperty = properties.find(
      p => p.name === "Total Visa Types"
    );
    expect(visaTypesProperty).toHaveProperty("value", "2");

    const visaFreeProperty = properties.find(p => p.name === "Visa Free Entry");
    expect(visaFreeProperty).toHaveProperty("value", "false");

    const visaOnArrivalProperty = properties.find(
      p => p.name === "Visa on Arrival"
    );
    expect(visaOnArrivalProperty).toHaveProperty("value", "true");
  });

  it("should handle destination without image", () => {
    const destinationWithoutImage = { ...mockDestinationData, heroImage: null };
    const result = generateDestinationJsonLd(destinationWithoutImage, "en");

    expect(result).not.toHaveProperty("image");
  });

  it("should handle destination without region", () => {
    const destinationWithoutRegion = { ...mockDestinationData, region: null };
    const result = generateDestinationJsonLd(destinationWithoutRegion, "en");

    const address = result.address as any;
    expect(address).not.toHaveProperty("addressRegion");
  });

  it("should handle destination without continent", () => {
    const destinationWithoutContinent = {
      ...mockDestinationData,
      continent: "",
    };
    const result = generateDestinationJsonLd(destinationWithoutContinent, "en");

    expect(result).not.toHaveProperty("containedInPlace");
  });

  it("should handle destination with no visa types", () => {
    const destinationWithoutVisas = { ...mockDestinationData, visaTypes: [] };
    const result = generateDestinationJsonLd(destinationWithoutVisas, "en");

    expect(result).not.toHaveProperty("containsPlace");
  });

  it("should generate correct URL for different locales", () => {
    const locales = ["en", "ar", "es", "fr"];

    locales.forEach(locale => {
      const result = generateDestinationJsonLd(mockDestinationData, locale);
      expect(result).toHaveProperty(
        "url",
        `https://gettravelvisa.com/${locale}/d/uae`
      );
    });
  });

  it("should handle business visa with interview requirement", () => {
    const result = generateDestinationJsonLd(mockDestinationData, "en");

    const services = result.containsPlace as any[];
    const businessVisa = services.find(s => s.name === "Business Visa");

    expect(businessVisa).toBeDefined();
    expect(businessVisa).toHaveProperty("name", "Business Visa");
    expect(businessVisa.offers).toHaveProperty("price", "200");
    expect(businessVisa.offers).toHaveProperty(
      "description",
      "Processing time: 7 days, Valid for: 90 days"
    );
  });

  it("should include service provider information", () => {
    const result = generateDestinationJsonLd(mockDestinationData, "en");

    const services = result.containsPlace as any[];
    const service = services[0];

    expect(service).toHaveProperty("provider");
    const provider = service.provider;
    expect(provider).toHaveProperty("@type", "Organization");
    expect(provider).toHaveProperty("name", "GetTravelVisa.com");
    expect(provider).toHaveProperty("url", "https://gettravelvisa.com");
  });

  it("should include area served information", () => {
    const result = generateDestinationJsonLd(mockDestinationData, "en");

    const services = result.containsPlace as any[];
    const service = services[0];

    expect(service).toHaveProperty("areaServed");
    const areaServed = service.areaServed;
    expect(areaServed).toHaveProperty("@type", "Country");
    expect(areaServed).toHaveProperty("name", "United Arab Emirates");
  });

  it("should validate JSON-LD structure follows schema.org standards", () => {
    const result = generateDestinationJsonLd(mockDestinationData, "en");

    // Verify required schema.org fields for Place
    expect(result).toHaveProperty("@context");
    expect(result).toHaveProperty("@type");
    expect(result).toHaveProperty("name");
    expect(result).toHaveProperty("address");

    // Verify structured data doesn't contain undefined values
    const jsonString = JSON.stringify(result);
    expect(jsonString).not.toContain("undefined");
    expect(jsonString).not.toContain("null");
  });
});
