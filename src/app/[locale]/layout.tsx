import { getTextDirection } from "@/lib/utils";
import { languages } from "../i18n/settings";
import { Header, Footer } from "@/components/layout";
import { JsonLd } from "@/components/json-ld";
import { generateWebSiteJsonLd, generateWebSiteData } from "@/lib/json-ld";
import { getTranslation } from "../i18n";

export async function generateStaticParams() {
  return languages.map(locale => ({ locale }));
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

  return (
    <div lang={locale} dir={direction} className="min-h-screen">
      <JsonLd data={websiteJsonLd} />
      <Header locale={locale} />
      {children}
      <Footer locale={locale} />
    </div>
  );
}
