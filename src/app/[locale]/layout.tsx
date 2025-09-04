import type { Metadata } from "next";
import { getTextDirection } from "@/lib/utils";
import { languages } from "../i18n/settings";
import { Header, Footer } from "@/components/layout";
import { getTranslation } from "../i18n";

export async function generateStaticParams() {
  return languages.map(locale => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getTranslation(locale, "common");

  return {
    title: {
      template: `%s | ${t("site.title")}`,
      default: t("site.title"),
    },
    description: t("site.description"),
    keywords: t("site.keywords").split(", "),
    openGraph: {
      type: "website",
      locale: getLocaleWithRegion(locale),
      title: t("site.ogTitle"),
      description: t("site.ogDescription"),
      siteName: "GetTravelVisa.com",
    },
    twitter: {
      card: "summary_large_image",
      title: t("site.twitterTitle"),
      description: t("site.twitterDescription"),
    },
    alternates: {
      languages: generateAlternateLanguages(locale),
    },
  };
}

function getLocaleWithRegion(locale: string): string {
  const localeMap: Record<string, string> = {
    en: "en_US",
    es: "es_ES",
    ar: "ar_SA",
    pt: "pt_PT",
    ru: "ru_RU",
    de: "de_DE",
    fr: "fr_FR",
    it: "it_IT",
  };
  return localeMap[locale] || "en_US";
}

function generateAlternateLanguages(currentLocale: string): Record<string, string> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://gettravelvisa.com";
  const alternates: Record<string, string> = {};
  
  languages.forEach(locale => {
    alternates[locale] = `${baseUrl}/${locale}`;
  });

  alternates["x-default"] = `${baseUrl}/${currentLocale}`;
  return alternates;
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

  return (
    <div lang={locale} dir={direction} className="min-h-screen">
      <Header locale={locale} />
      {children}
      <Footer locale={locale} />
    </div>
  );
}
