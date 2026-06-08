import { type NextRequest, NextResponse } from "next/server";

import { cookieName, fallbackLng, languages } from "@/app/i18n/settings";

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;

  // Skip if it's a static file, API route, or well-known metadata
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/.well-known") ||
    pathname.startsWith("/openapi.json") ||
    pathname.startsWith("/llms.txt") ||
    pathname.startsWith("/llms-full.txt") ||
    pathname.startsWith("/auth.md") ||
    pathname.includes(".") // This catches files like favicon.ico, etc.
  ) {
    return NextResponse.next();
  }

  // Intercept requests containing the Accept: text/markdown header
  const acceptHeader = request.headers.get("accept") || "";
  if (acceptHeader.includes("text/markdown")) {
    const url = request.nextUrl.clone();
    url.pathname = "/api/markdown-negotiation";
    url.searchParams.set("url", pathname + request.nextUrl.search);
    return NextResponse.rewrite(url);
  }

  // Check if the pathname already has a supported locale
  const pathnameIsMissingLocale = languages.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    // Try to get locale from cookie first
    const localeCookie = request.cookies.get(cookieName)?.value;
    const locale =
      localeCookie && languages.includes(localeCookie)
        ? localeCookie
        : fallbackLng;

    // Try to get locale from Accept-Language header as fallback
    if (!localeCookie) {
      const acceptLanguage = request.headers.get("accept-language") || "";
      for (const lang of languages) {
        if (acceptLanguage.toLowerCase().includes(lang.toLowerCase())) {
          return NextResponse.redirect(
            new URL(`/${lang}${pathname === "/" ? "" : pathname}`, request.url)
          );
        }
      }
    }

    return NextResponse.redirect(
      new URL(`/${locale}${pathname === "/" ? "" : pathname}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  // Matcher ignoring `/_next/`, `/api/`, and static files
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|icon.svg|apple-icon.png|robots.txt|sitemap.xml).*)",
  ],
};
