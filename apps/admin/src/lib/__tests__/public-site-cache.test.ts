import { revalidatePath, revalidateTag } from "next/cache";

import {
  invalidatePublicBlog,
  invalidatePublicDestinations,
  invalidatePublicVisaTypes,
} from "../public-site-cache";

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
  revalidateTag: jest.fn(),
}));

const mockedRevalidateTag = revalidateTag as jest.Mock;
const mockedRevalidatePath = revalidatePath as jest.Mock;

function tagsWritten(): string[] {
  return mockedRevalidateTag.mock.calls.map(call => call[0]);
}

function pathsWritten(): string[] {
  return mockedRevalidatePath.mock.calls.map(call => call[0]);
}

describe("public site invalidation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("uses the profile OpenNext reads as an immediate invalidation", () => {
    invalidatePublicBlog();

    expect(mockedRevalidateTag).toHaveBeenCalled();
    for (const call of mockedRevalidateTag.mock.calls) {
      expect(call[1]).toEqual({ expire: 0 });
    }
  });

  it("revalidates blog routes for every locale in one call each", () => {
    invalidatePublicBlog();

    expect(tagsWritten()).toContain("blog");
    expect(mockedRevalidatePath).toHaveBeenCalledWith(
      "/[locale]/blog/[slug]",
      "page"
    );
    expect(mockedRevalidatePath).toHaveBeenCalledWith("/[locale]", "page");
    // The `[locale]` pattern replaces per-locale calls, so no concrete locale
    // path should be emitted.
    expect(pathsWritten().some(path => path.startsWith("/en"))).toBe(false);
  });

  it("revalidates both destination umbrellas", () => {
    invalidatePublicDestinations();

    expect(tagsWritten()).toEqual(
      expect.arrayContaining(["countries", "destinations", "continents"])
    );
    expect(mockedRevalidatePath).toHaveBeenCalledWith(
      "/[locale]/d/[destination]",
      "page"
    );
  });

  it("revalidates the visa tags and the visa type route", () => {
    invalidatePublicVisaTypes();

    expect(tagsWritten()).toEqual(expect.arrayContaining(["visas"]));
    expect(mockedRevalidatePath).toHaveBeenCalledWith(
      "/[locale]/d/[destination]/v/[visaType]",
      "page"
    );
  });
});
