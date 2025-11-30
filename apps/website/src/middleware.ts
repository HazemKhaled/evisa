import { type NextRequest, NextResponse } from "next/server";

import { cookieName, fallbackLng, languages } from "@/app/i18n/settings";

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;

  // Skip if it's a static file or API route
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.includes(".") // This catches files like favicon.ico, etc.
  ) {
    return NextResponse.next();
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
