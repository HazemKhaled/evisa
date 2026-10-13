import { createInstance } from "i18next";

import { getTranslation } from "../index";

jest.mock("i18next", () => {
  const createInstance = jest.fn(() => {
    const instance = {
      use: jest.fn(),
      init: jest.fn(() => Promise.resolve()),
      getFixedT: jest.fn(() => (key: string) => key),
    };
    instance.use.mockReturnValue(instance);
    return instance;
  });

  return { __esModule: true, createInstance };
});

jest.mock("i18next-resources-to-backend", () => ({
  __esModule: true,
  default: jest.fn(() => ({})),
}));

jest.mock("react-i18next/initReactI18next", () => ({
  __esModule: true,
  initReactI18next: {},
}));

const mockedCreateInstance = createInstance as unknown as jest.Mock;

// The instance cache is module-level and lives for the whole file, so each test
// uses namespace names no other test touches and sees only its own calls.
describe("getTranslation", () => {
  beforeEach(() => {
    mockedCreateInstance.mockClear();
  });

  it("initialises i18next once per locale and namespace", async () => {
    await getTranslation("en", "repeat");
    await getTranslation("en", "repeat");
    await getTranslation("en", "repeat");

    expect(mockedCreateInstance).toHaveBeenCalledTimes(1);
  });

  it("reuses one initialisation for concurrent callers of the same namespace", async () => {
    await Promise.all([
      getTranslation("en", "concurrent"),
      getTranslation("en", "concurrent"),
      getTranslation("en", "concurrent"),
    ]);

    expect(mockedCreateInstance).toHaveBeenCalledTimes(1);
  });

  it("keeps separate instances per locale and per namespace", async () => {
    await getTranslation("en", "per-locale");
    await getTranslation("fr", "per-locale");
    await getTranslation("en", "per-namespace");

    expect(mockedCreateInstance).toHaveBeenCalledTimes(3);
  });

  it("does not memoise an unsupported locale", async () => {
    await getTranslation("not-a-locale", "unsupported");
    await getTranslation("not-a-locale", "unsupported");

    // The locale reaches here from the `[locale]` route segment, so it must not
    // be able to grow a module-level map.
    expect(mockedCreateInstance).toHaveBeenCalledTimes(2);
  });

  it("still applies the per-call key prefix", async () => {
    const { t } = await getTranslation("en", "key-prefix", {
      keyPrefix: "meta",
    });

    const instance = mockedCreateInstance.mock.results[0].value;
    expect(instance.getFixedT).toHaveBeenCalledWith(
      "en",
      ["key-prefix"],
      "meta"
    );
    expect(t).toBeDefined();
  });

  it("retries instead of caching a failed initialisation", async () => {
    mockedCreateInstance.mockImplementationOnce(() => {
      const instance = {
        use: jest.fn(),
        init: jest.fn(() => Promise.reject(new Error("boom"))),
        getFixedT: jest.fn(),
      };
      instance.use.mockReturnValue(instance);
      return instance;
    });

    await expect(getTranslation("en", "retry")).rejects.toThrow("boom");
    await expect(getTranslation("en", "retry")).resolves.toBeDefined();
    expect(mockedCreateInstance).toHaveBeenCalledTimes(2);
  });
});
