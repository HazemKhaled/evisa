import type { Metadata } from "next";

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
    <div lang={locale} dir={direction} className="min-h-screen">
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={websiteJsonLd} />
      <Header locale={locale} />
      {children}
      <Footer locale={locale} />
    </div>
  );
}
