import { type Metadata } from "next";
import { getTranslation } from "@/app/i18n";
import { languages } from "@/app/i18n/settings";
import { getDestinationsListWithMetadata } from "@/lib/services";
import BlogHome from "../../../blog/page";

// Required when use static generation with search params
export const revalidate = 86400; // Revalidate every day

export async function generateStaticParams(): Promise<
  Array<DestinationBlogProps["params"]>
> {
  // Get top 20 popular destinations for SSG
  const popularDestinations = await getDestinationsListWithMetadata(
    "en",
    20,
    "popular"
  );

  // Generate params for each popular destination in each locale
  return languages.flatMap(locale =>
    popularDestinations.map(destination =>
      Promise.resolve({
        locale,
        destination: destination.code.toLowerCase(),
      })
    )
  );
}

interface DestinationBlogProps {
  params: Promise<{ locale: string; destination: string }>;
  searchParams: Promise<{
    page?: string;
    tag?: string;
    destination?: string;
  }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; destination: string }>;
}): Promise<Metadata> {
  const { locale, destination } = await params;
  const { t } = await getTranslation(locale, "blog");

  const destinationName = destination.toUpperCase();

  return {
    title: `${t("title")} - ${destinationName}`,
    description: `${t("subtitle")} for ${destinationName}`,
    keywords: `${t("keywords")}, ${destinationName}, travel, visa`,
  };
}

export default async function DestinationBlog({
  params,
  searchParams,
}: DestinationBlogProps) {
  const { locale, destination } = await params;
  const { page, tag } = await searchParams;

  // Transform params to match BlogHome interface
  const blogParams = Promise.resolve({ locale });
  const blogSearchParams = Promise.resolve({
    page,
    tag,
    destination: destination,
  });

  return <BlogHome params={blogParams} searchParams={blogSearchParams} />;
}
