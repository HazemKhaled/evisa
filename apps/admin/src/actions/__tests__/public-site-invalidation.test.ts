import { revalidatePath } from "next/cache";

import { createBlogPost, deleteBlogPost, updateBlogPost } from "../blog-posts";
import { createCountry, deleteCountry, updateCountry } from "../countries";
import { createVisaType, deleteVisaType, updateVisaType } from "../visa-types";

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
  revalidateTag: jest.fn(),
}));

jest.mock("@repo/auth/server", () => ({
  requireAdminAuth: jest.fn(async () => ({ success: true })),
}));

jest.mock("@repo/utils", () => ({}));

jest.mock("../../lib/public-site-cache", () => ({
  invalidatePublicBlog: jest.fn(),
  invalidatePublicDestinations: jest.fn(),
  invalidatePublicVisaTypes: jest.fn(),
}));

// Everything the actions import from `@repo/database` other than `getDb` is
// only ever passed back into the query builder, so a stub per name is enough.
jest.mock("@repo/database", () => {
  const chain: Record<string, unknown> = {
    values: () => chain,
    set: () => chain,
    where: () => chain,
    returning: async () => [{ id: 1 }],
  };

  return new Proxy(
    {
      __esModule: true,
      getDb: () => ({
        insert: () => chain,
        update: () => chain,
        delete: () => chain,
      }),
    },
    {
      get(target: Record<string, unknown>, prop: string) {
        return prop in target ? target[prop] : jest.fn();
      },
    }
  );
});

const {
  invalidatePublicBlog,
  invalidatePublicDestinations,
  invalidatePublicVisaTypes,
} = jest.requireMock<{
  invalidatePublicBlog: jest.Mock;
  invalidatePublicDestinations: jest.Mock;
  invalidatePublicVisaTypes: jest.Mock;
}>("../../lib/public-site-cache");

const mockedRevalidatePath = revalidatePath as jest.Mock;

const blogInput = {
  slug: "a-post",
  author: "Author",
  publishedAt: new Date("2026-01-01"),
  i18n: [{ locale: "en", title: "T", description: "D", content: "C" }],
};

const countryInput = {
  code: "JP",
  continent: "Asia",
  i18n: [{ locale: "en", name: "Japan" }],
};

const visaTypeInput = {
  destinationCode: "JP",
  type: "tourist",
  duration: 30,
  processingTime: 5,
  fee: 20,
  i18n: [{ locale: "en", name: "Tourist" }],
};

describe("admin mutations invalidate the public site", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("invalidates the public site when a blog post is created", async () => {
    await expect(createBlogPost(blogInput)).resolves.toEqual({ success: true });

    expect(invalidatePublicBlog).toHaveBeenCalledTimes(1);
    expect(mockedRevalidatePath).toHaveBeenCalledWith("/blog-posts");
  });

  it("invalidates the public site when a blog post is updated", async () => {
    await expect(updateBlogPost({ ...blogInput, id: 1 })).resolves.toEqual({
      success: true,
    });

    expect(invalidatePublicBlog).toHaveBeenCalledTimes(1);
  });

  it("invalidates the public site when a blog post is deleted", async () => {
    await expect(deleteBlogPost(1)).resolves.toEqual({ success: true });

    expect(invalidatePublicBlog).toHaveBeenCalledTimes(1);
  });

  it("invalidates the public site when a country is created", async () => {
    await expect(createCountry(countryInput)).resolves.toEqual({
      success: true,
    });

    expect(invalidatePublicDestinations).toHaveBeenCalledTimes(1);
  });

  it("invalidates the public site when a country is updated", async () => {
    await expect(
      updateCountry({ ...countryInput, originalCode: "JP" })
    ).resolves.toEqual({ success: true });

    expect(invalidatePublicDestinations).toHaveBeenCalledTimes(1);
  });

  it("invalidates the public site when a country is deleted", async () => {
    await expect(deleteCountry("JP")).resolves.toEqual({ success: true });

    expect(invalidatePublicDestinations).toHaveBeenCalledTimes(1);
  });

  it("invalidates the public site when a visa type is created", async () => {
    await expect(createVisaType(visaTypeInput)).resolves.toEqual({
      success: true,
    });

    expect(invalidatePublicVisaTypes).toHaveBeenCalledTimes(1);
  });

  it("invalidates the public site when a visa type is updated", async () => {
    await expect(updateVisaType({ ...visaTypeInput, id: 1 })).resolves.toEqual({
      success: true,
    });

    expect(invalidatePublicVisaTypes).toHaveBeenCalledTimes(1);
  });

  it("invalidates the public site when a visa type is deleted", async () => {
    await expect(deleteVisaType(1)).resolves.toEqual({ success: true });

    expect(invalidatePublicVisaTypes).toHaveBeenCalledTimes(1);
  });
});
