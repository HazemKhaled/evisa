import type { Metadata } from "next";
import { getTextDirection } from "@/lib/utils";
import { languages } from "../i18n/settings";
import { Header, Footer } from "@/components/layout";
import { generateMetadata as generateSEOMetadata, generateOrganizationStructuredData, generateWebsiteStructuredData } from "@/lib/seo";
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

  return generateSEOMetadata({
    title: t("site.title"),
    description: t("site.description"),
    keywords: [
      "visa application",
      "travel visa",
      "visa checker",
      "visa services",
      "international travel",
      "visa requirements",
      "travel documents",
      "passport services",
      "visa processing",
      "travel assistance",
    ],
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        generateOrganizationStructuredData(locale),
        generateWebsiteStructuredData(locale),
      ],
    },
  }, locale);
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
