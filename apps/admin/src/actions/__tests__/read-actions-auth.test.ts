import { requireAdminAuth } from "@repo/auth/server";
import { getDb } from "@repo/database";

import {
  getAllTags,
  getBlogPosts,
  getBlogPostsPaginated,
  getBlogPostWithI18n,
} from "../blog-posts";
import {
  getCountries,
  getCountriesPaginated,
  getCountryWithI18n,
} from "../countries";
import {
  getEligibilityPaginated,
  getEligibilityRules,
  getEligibilityWithI18n,
} from "../eligibility";
import {
  getVisaTypes,
  getVisaTypesPaginated,
  getVisaTypeWithI18n,
} from "../visa-types";

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
  revalidateTag: jest.fn(),
}));

jest.mock("@repo/auth/server", () => ({
  requireAdminAuth: jest.fn(),
}));

jest.mock("@repo/utils", () => ({}));

jest.mock("../../lib/public-site-cache", () => ({
  invalidatePublicBlog: jest.fn(),
  invalidatePublicDestinations: jest.fn(),
  invalidatePublicVisaTypes: jest.fn(),
}));

jest.mock("@repo/database", () => {
  return new Proxy(
    { __esModule: true, getDb: jest.fn() },
    {
      get(target: Record<string, unknown>, prop: string) {
        return prop in target ? target[prop] : jest.fn();
      },
    }
  );
});

const mockedRequireAdminAuth = requireAdminAuth as jest.Mock;
const mockedGetDb = getDb as jest.Mock;

const readActions: [string, () => Promise<unknown>][] = [
  ["getBlogPosts", () => getBlogPosts()],
  ["getBlogPostsPaginated", () => getBlogPostsPaginated()],
  ["getBlogPostWithI18n", () => getBlogPostWithI18n(1)],
  ["getAllTags", () => getAllTags()],
  ["getCountries", () => getCountries()],
  ["getCountriesPaginated", () => getCountriesPaginated()],
  ["getCountryWithI18n", () => getCountryWithI18n("JP")],
  ["getEligibilityRules", () => getEligibilityRules()],
  ["getEligibilityPaginated", () => getEligibilityPaginated()],
  ["getEligibilityWithI18n", () => getEligibilityWithI18n(1)],
  ["getVisaTypes", () => getVisaTypes()],
  ["getVisaTypesPaginated", () => getVisaTypesPaginated()],
  ["getVisaTypeWithI18n", () => getVisaTypeWithI18n(1)],
];

describe("admin read actions require an authenticated admin", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedRequireAdminAuth.mockResolvedValue({
      success: false,
      error: "Unauthorized: You must be logged in to perform this action",
    });
  });

  it.each(readActions)(
    "%s rejects unauthenticated callers without querying the database",
    async (_name, action) => {
      await expect(action()).rejects.toThrow(/Unauthorized/);

      expect(mockedRequireAdminAuth).toHaveBeenCalledTimes(1);
      expect(mockedGetDb).not.toHaveBeenCalled();
    }
  );

  it("queries the database once the admin is authenticated", async () => {
    mockedRequireAdminAuth.mockResolvedValue({ success: true });
    const rows = [{ id: 1, name: "tag" }];
    mockedGetDb.mockReturnValue({
      select: () => ({ from: () => ({ orderBy: async () => rows }) }),
    });

    await expect(getAllTags()).resolves.toEqual(rows);
    expect(mockedGetDb).toHaveBeenCalledTimes(1);
  });
});
