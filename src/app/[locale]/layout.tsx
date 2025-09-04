import { getTextDirection } from "@/lib/utils";
import { languages } from "../i18n/settings";
import { Header, Footer } from "@/components/layout";
import { JsonLd } from "@/components/json-ld";
import { generateWebSiteJsonLd, defaultWebSite } from "@/lib/json-ld";

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

  const websiteJsonLd = generateWebSiteJsonLd({
    ...defaultWebSite,
    url: `${defaultWebSite.url}/${locale}`,
  });

  return (
    <div lang={locale} dir={direction} className="min-h-screen">
      <JsonLd data={websiteJsonLd} />
      <Header locale={locale} />
      {children}
      <Footer locale={locale} />
    </div>
  );
}
