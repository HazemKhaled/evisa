import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { AnalyticsProvider } from "@/lib/analytics";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin", "arabic"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "eVisa - Electronic Visa Processing",
    description:
      "Help users travel with minimal visa requirements through our centralized visa processing platform",
    other: {
      "Content-Language": locale,
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages();

  // Set direction based on locale
  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={direction}>
      <body className={`${cairo.variable} font-cairo antialiased`}>
        <AnalyticsProvider
          gtmId={process.env.NEXT_PUBLIC_GTM_ID}
          jitsuHost={process.env.NEXT_PUBLIC_JITSU_HOST}
          jitsuWriteKey={process.env.NEXT_PUBLIC_JITSU_WRITE_KEY}
        >
          <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        </AnalyticsProvider>
      </body>
    </html>
  );
}
