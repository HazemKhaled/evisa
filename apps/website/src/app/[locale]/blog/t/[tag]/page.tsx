import { type Metadata } from "next";

import { getTranslation } from "@/app/i18n";
import { languages } from "@/app/i18n/settings";
import { env } from "@/lib/consts";
import { getAllUniqueTagsAcrossLocales } from "@/lib/services/blog-service";
import { generateAlternatesMetadata } from "@/lib/utils";

import BlogHome from "../../page";

// Enable ISR with daily revalidation for tag pages
export const revalidate = 86400; // 24 hours

// Generate static params for basic tag routes only
export async function generateStaticParams(): Promise<
  { locale: string; tag: string }[]
> {
  const allTags = await getAllUniqueTagsAcrossLocales();

  const params = [];
  for (const currentLocale of languages) {
    for (const tag of allTags) {
      // Base tag route only
      params.push({ locale: currentLocale, tag });
    }
  }

  return params;
}

interface TagPageProps {
  params: Promise<{ locale: string; tag: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { locale, tag } = await params;
  const { t } = await getTranslation(locale, "blog");
  const decodedTag = decodeURIComponent(tag);
  const alternates = generateAlternatesMetadata(
    env.baseUrl,
    `blog/t/${encodeURIComponent(tag)}`,
    locale
  );

  return {
    title: t("metadata.tag_title_template", {
      tag: decodedTag,
      title: t("title"),
    }),
    description: t("metadata.tag_description_template", { tag: decodedTag }),
    keywords: t("metadata.tag_keywords_template", { tag: decodedTag }),
    alternates,
    openGraph: {
      url: alternates.canonical,
    },
  };
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const { tag } = await params;
  const { page = "1" } = await searchParams;

  // Decode the tag parameter
  const decodedTag = decodeURIComponent(tag);

  // Transform the tag parameter into searchParams format and reuse the existing blog component
  const modifiedSearchParams = {
    page,
    tag: decodedTag,
  };

  // Use the existing blog page component with the modified search params and tag route flag
  return (
    <BlogHome
      params={params}
      searchParams={Promise.resolve(modifiedSearchParams)}
    />
  );
}
