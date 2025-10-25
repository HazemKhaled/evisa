import { type Metadata } from "next";
import { getTranslation } from "@/app/i18n";
import { generateAlternatesMetadata } from "@/lib/utils";
import { env } from "@/lib/consts";
import { getDestinationsListWithMetadata } from "@/lib/services/country-service";
import { languages } from "@/app/i18n/settings";
import BlogHome from "@/app/[locale]/blog/page";

// Required when use static generation with search params
export const revalidate = 86400; // Revalidate every day

interface DestinationBlogProps {
  params: Promise<{ locale: string; destination: string }>;
  searchParams: Promise<{
    page?: string;
    destination?: string;
  }>;
}

// Pre-build top 10 destinations per locale at build time for destination blog pages
export async function generateStaticParams(): Promise<
  DestinationBlogProps["params"][]
> {
  // Get top 10 popular destinations for SSG
  const popularDestinations = await getDestinationsListWithMetadata(
    "en",
    10,
    "popular"
  );

  // Generate params for each popular destination in each locale
  return languages.flatMap(locale =>
    popularDestinations.map(destination =>
      Promise.resolve({
        locale,
        destination: destination.code,
      })
    )
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
  searchParams,
}: DestinationBlogProps) {
  const { locale, destination } = await params;
  const { page } = await searchParams;

  // Transform params to match BlogHome interface
  const blogParams = Promise.resolve({ locale });
  const blogSearchParams = Promise.resolve({
    page,
    destination: destination,
  });

  return <BlogHome params={blogParams} searchParams={blogSearchParams} />;
}
