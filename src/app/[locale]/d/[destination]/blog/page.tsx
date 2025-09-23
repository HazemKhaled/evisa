import { type Metadata } from "next";
import { getTranslation } from "@/app/i18n";
import { generateAlternatesMetadata } from "@/lib/utils";
import { languages } from "@/app/i18n/settings";
import { env } from "@/lib/consts";
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

// TODO: Use getStaticParams to pre-render this page for top 10 destinations

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
    locale,
    languages
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
