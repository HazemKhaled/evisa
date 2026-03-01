import "../globals.css";

import { GoogleTagManager } from "@next/third-parties/google";
import { DirectionProvider } from "@repo/ui";
import { cn } from "@repo/utils";
import type { Metadata, Viewport } from "next";
import Link from "next/dist/client/link";
import { Cairo, Geist_Mono } from "next/font/google";

import { JsonLd } from "@/components/json-ld";
import { Footer, Header } from "@/components/layout";
import { env } from "@/lib/consts";
import {
  generateOrganizationData,
  generateOrganizationJsonLd,
  generateWebSiteData,
  generateWebSiteJsonLd,
} from "@/lib/json-ld";
import { generateAlternatesMetadata, getTextDirection } from "@/lib/utils";

import { getTranslation } from "../i18n";
import { getLocaleWithRegion, languages } from "../i18n/settings";

// Cairo font for Arabic, English, and other supported languages
const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin", "arabic"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

// Geist Mono for code and monospace text
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export function generateStaticParams(): { locale: string }[] {
  return languages.map(locale => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getTranslation(locale, "common");
  const alternates = generateAlternatesMetadata(env.baseUrl, "", locale);

  return {
    title: {
      template: `%s | ${t("site.title")}`,
      default: t("site.title"),
    },
    description: t("site.description"),
    keywords: t("site.keywords").split(", "),
    alternates,
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
        { url: "/icon.svg", type: "image/svg+xml" },
      ],
      shortcut: "/favicon.ico",
      apple: "/apple-icon.png",
    },
    openGraph: {
      type: "website",
      locale: getLocaleWithRegion(locale),
      title: t("site.ogTitle"),
      description: t("site.ogDescription"),
      siteName: t("site.title"),
      url: alternates.canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: t("site.twitterTitle"),
      description: t("site.twitterDescription"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const direction = getTextDirection(locale);
  const [{ t }, { t: tCommon }] = await Promise.all([
    getTranslation(locale, "pages"),
    getTranslation(locale, "common"),
  ]);

  const websiteData = generateWebSiteData(t);
  websiteData.url = `${websiteData.url}/${locale}`;
  const websiteJsonLd = generateWebSiteJsonLd(websiteData);

  const organizationData = generateOrganizationData(t);
  const organizationJsonLd = generateOrganizationJsonLd(organizationData);

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <head>
        {/* Performance: Early connection hints for third-party resources */}
        <link
          rel="preconnect"
          href="https://images.unsplash.com"
          crossOrigin=""
        />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <>
            <link
              rel="preconnect"
              href="https://www.googletagmanager.com"
              crossOrigin=""
            />
            <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
          </>
        )}
      </head>
      <body
        className={cn(
          cairo.variable,
          geistMono.variable,
          "bg-background text-foreground min-h-screen font-sans antialiased"
        )}
      >
        <Link
          href="#main-content"
          className="focus:bg-primary focus:text-primary-foreground focus:ring-primary sr-only focus:not-sr-only focus:absolute focus:top-4 focus:z-50 focus:rounded-md focus:px-4 focus:py-2 focus:ring-2 focus:ring-offset-2 focus:outline-none ltr:focus:left-4 rtl:focus:right-4"
        >
          {tCommon("accessibility.skipToMain")}
        </Link>
        <DirectionProvider direction={direction}>
          <Header locale={locale} />
          {children}
          <Footer locale={locale} />

          <JsonLd data={organizationJsonLd} />
          <JsonLd data={websiteJsonLd} />
        </DirectionProvider>

        {process.env.NEXT_PUBLIC_GTM_ID && (
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        )}
      </body>
    </html>
  );
}
