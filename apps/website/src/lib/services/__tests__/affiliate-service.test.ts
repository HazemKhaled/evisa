import { generateAffiliateUrl } from "../visa-service";

describe("generateAffiliateUrl", () => {
  const defaultArgs = {
    partnerSlug: "iVisa",
    destinationCode: "AE",
    locale: "en",
  };

  it("should generate iVisa URL with default UTM params", () => {
    const url = generateAffiliateUrl(defaultArgs);

    expect(url).toContain("https://www.ivisa.com/apply?");
    expect(url).toContain("utm_source=gettravelvisa.com");
    expect(url).toContain("utm_medium=referral");
    expect(url).toContain("utm_campaign=affiliate_cta");
    expect(url).toContain("utm_term=en");
    expect(url).toContain("destination_code=AE");
  });

  it("should include passport_code when provided", () => {
    const url = generateAffiliateUrl({
      ...defaultArgs,
      passportCode: "US",
    });

    expect(url).toContain("passport_code=US");
  });

  it("should include visa_type when provided", () => {
    const url = generateAffiliateUrl({
      ...defaultArgs,
      visaType: "tourist",
    });

    expect(url).toContain("visa_type=tourist");
  });

  it("should generate Veeza.ai URL", () => {
    const url = generateAffiliateUrl({
      partnerSlug: "veezaportal",
      destinationCode: "AE",
      locale: "en",
    });

    expect(url).toContain("https://veezaportal.com/apply?");
    expect(url).not.toContain("passport_code=");
  });

  it("should generate Airalo URL", () => {
    const url = generateAffiliateUrl({
      partnerSlug: "airalo",
      destinationCode: "AE",
      locale: "en",
    });

    expect(url).toContain("https://airalo.com/apply?");
  });

  it("should fall back to slug-based domain for unknown partners", () => {
    const url = generateAffiliateUrl({
      partnerSlug: "custom-partner",
      destinationCode: "AE",
      locale: "en",
    });

    expect(url).toContain("https://custom-partner.com/apply?");
  });

  it("should encode spaces as + in form-urlencoded format", () => {
    const url = generateAffiliateUrl({
      ...defaultArgs,
      visaType: "tourist visa",
    });

    // URLSearchParams encodes spaces as + (application/x-www-form-urlencoded)
    expect(url).toContain("visa_type=tourist+visa");
  });

  it("should not include optional params when undefined", () => {
    const url = generateAffiliateUrl(defaultArgs);

    expect(url).not.toContain("passport_code=");
    expect(url).not.toContain("visa_type=");
  });
});
