import "../globals.css";

import { GoogleTagManager } from "@next/third-parties/google";
import { cn } from "@repo/utils";
import type { Metadata, Viewport } from "next";
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
  const { t } = await getTranslation(locale, "pages");

  const websiteData = generateWebSiteData(t);
  websiteData.url = `${websiteData.url}/${locale}`;
  const websiteJsonLd = generateWebSiteJsonLd(websiteData);

  const organizationData = generateOrganizationData(t);
  const organizationJsonLd = generateOrganizationJsonLd(organizationData);

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      {process.env.NEXT_PUBLIC_GTM_ID && (
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
      )}
      <body
        className={cn(
          cairo.variable,
          geistMono.variable,
          "bg-background text-foreground min-h-screen font-sans antialiased"
        )}
      >
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <Header locale={locale} />
        {children}
        <Footer locale={locale} />
      </body>
    </html>
  );
}
