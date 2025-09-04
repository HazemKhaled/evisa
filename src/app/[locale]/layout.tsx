import { getTextDirection } from "@/lib/utils";
import { languages } from "../i18n/settings";
import { Header, Footer } from "@/components/layout";

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

  return (
    <div lang={locale} dir={direction} className="min-h-screen">
      <Header locale={locale} />
      {children}
      <Footer locale={locale} />
    </div>
  );
}
