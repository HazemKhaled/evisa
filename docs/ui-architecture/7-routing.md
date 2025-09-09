# 7. Routing

## Route Configuration

```typescript
/**
 * Next.js 15 App Router configuration with internationalized routing
 */

// middleware.ts - Internationalization routing middleware
import { NextRequest, NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const locales = ["en", "ar", "es", "pt", "ru", "de", "fr", "it"];
const defaultLocale = "en";

function getLocale(request: NextRequest): string {
  // Check for locale in pathname
  const pathname = request.nextUrl.pathname;
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return pathname.split("/")[1];
  }

  // Get locale from Accept-Language header
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const headers = { "accept-language": acceptLanguage };
  const languages = new Negotiator({ headers }).languages();

  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle country subdomain redirects (uae.gettravelvisa.com -> /en/d/uae)
  const hostname = request.headers.get("host") || "";
  const subdomain = hostname.split(".")[0];

  if (subdomain && subdomain !== "www" && subdomain !== "gettravelvisa") {
    const locale = getLocale(request);
    const destinationUrl = new URL(`/${locale}/d/${subdomain}`, request.url);

    // Set canonical redirect headers
    const response = NextResponse.redirect(destinationUrl, 301);
    response.headers.set(
      "Cache-Control",
      "public, max-age=31536000, immutable"
    );
    return response;
  }

  // Handle root path redirect to default locale
  if (pathname === "/") {
    const locale = getLocale(request);
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  return NextResponse.next();
}
```

---
