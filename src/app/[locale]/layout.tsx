import type { Metadata } from "next";
import { getTextDirection } from "@/lib/utils";
import { languages, getLocaleWithRegion } from "../i18n/settings";
import { Header, Footer } from "@/components/layout";
import { getTranslation } from "../i18n";
import { env } from "@/lib/consts";

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
      siteName: t("site.title"),
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

function generateAlternateLanguages(
  currentLocale: string
): Record<string, string> {
  const baseUrl = env.baseUrl;
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
