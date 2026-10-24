import { type Metadata } from "next";

import BlogHome from "@/app/[locale]/blog/page";
import { getTranslation } from "@/app/i18n";
import { languages } from "@/app/i18n/settings";
import { env } from "@/lib/consts";
import { getDestinationsListWithMetadata } from "@/lib/services/country-service";
import { generateAlternatesMetadata } from "@/lib/utils";

export const revalidate = 86400;

interface DestinationBlogProps {
  params: Promise<{ locale: string; destination: string }>;
}

export async function generateStaticParams(): Promise<
  { locale: string; destination: string }[]
> {
  const popularDestinations = await getDestinationsListWithMetadata(
    "en",
    10,
    "popular"
  );

  return languages.flatMap(locale =>
    popularDestinations.map(destination => ({
      locale,
      destination: destination.code,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; destination: string }>;
}): Promise<Metadata> {
  const { locale, destination } = await params;
  const { t } = await getTranslation(locale, "blog");
  const alternates = generateAlternatesMetadata(
    env.baseUrl,
    `d/${destination}/blog`,
    locale
  );

  return {
    title: `${t("title")} - ${destination}`,
    description: `${t("subtitle")} for ${destination}`,
    keywords: `${t("keywords")}, ${destination}, travel, visa`,
    alternates,
    openGraph: {
      url: alternates.canonical,
    },
  };
}

export default async function DestinationBlog({
  params,
}: DestinationBlogProps) {
  return BlogHome({ params });
}
