import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "ar"],

  // Used when no locale matches
  defaultLocale: "en",

  // The `pathnames` object holds pairs of internal and
  // external paths. Based on the locale, the external
  // paths are rewritten to the shared, internal ones.
  pathnames: {
    // If all locales use the same pathname, a single
    // string can be provided as a shortcut
    "/": "/",
    "/destinations": "/destinations",
    "/destinations/[country]": "/destinations/[country]",
    "/visa-checker": "/visa-checker",
    "/articles": "/articles",
    "/articles/[slug]": "/articles/[slug]",
    "/about": "/about",
    "/contact": "/contact",
    "/terms": "/terms",
    "/privacy": "/privacy",
    "/d": "/d",
    "/d/[country]": "/d/[country]",
    "/d/[country]/v/[visa]": "/d/[country]/v/[visa]",
    "/d/[country]/p/[passport]": "/d/[country]/p/[passport]",
    "/d/[country]/a": "/d/[country]/a",
    "/d/[country]/a/[slug]": "/d/[country]/a/[slug]",
  },
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
