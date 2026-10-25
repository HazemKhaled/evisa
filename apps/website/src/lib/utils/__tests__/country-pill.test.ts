import { toCountryPills } from "../country-pill";

describe("toCountryPills", () => {
  it("prefixes the localized country name with its flag", () => {
    const pills = toCountryPills(
      ["FR", "JP"],
      new Map([
        ["FR", "France"],
        ["JP", "Japon"],
      ])
    );

    expect(pills).toEqual([
      { code: "FR", label: "🇫🇷 France" },
      { code: "JP", label: "🇯🇵 Japon" },
    ]);
  });

  it("falls back to the ISO code when no localized name is available", () => {
    expect(toCountryPills(["FR"], new Map())).toEqual([
      { code: "FR", label: "🇫🇷 FR" },
    ]);
  });

  it("omits the flag when the code is not a valid ISO alpha-2 value", () => {
    expect(toCountryPills(["XYZ"], new Map())).toEqual([
      { code: "XYZ", label: "XYZ" },
    ]);
  });
});
