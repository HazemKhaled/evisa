import { type Metadata } from "next";
import {
  getGeneratedAllUniqueTags,
  getAllBlogPosts,
} from "@/lib/generated-blog-data";
import BlogHome from "../../page";
import { getTranslation } from "@/app/i18n";

// Generate static params for basic tag routes only
export async function generateStaticParams() {
  const allTags = getGeneratedAllUniqueTags();
  const allBlogPosts = getAllBlogPosts();

  // Get all unique locale-tag combinations
  const locales = [
    ...new Set(
      allBlogPosts.map((post: { locale: string; slug: string }) => post.locale)
    ),
  ];

  const params = [];
  for (const currentLocale of locales) {
    for (const tag of allTags) {
      // Base tag route only
      params.push({ locale: currentLocale, tag });
    }
  }

  return params;
}

interface TagPageProps {
  params: Promise<{ locale: string; tag: string }>;
  searchParams: Promise<{ page?: string; destination?: string }>;
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { locale, tag } = await params;
  const { t } = await getTranslation(locale, "pages");
  const decodedTag = decodeURIComponent(tag);

  return {
    title: t("blog.meta.tag_title_template", {
      tag: decodedTag,
      title: t("blog.title"),
    }),
    description: t("blog.meta.tag_description_template", { tag: decodedTag }),
    keywords: t("blog.meta.tag_keywords_template", { tag: decodedTag }),
  };
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const { tag } = await params;
  const { page = "1", destination } = await searchParams;

  // Decode the tag parameter
  const decodedTag = decodeURIComponent(tag);

  // Transform the tag parameter into searchParams format and reuse the existing blog component
  const modifiedSearchParams = {
    page,
    tag: decodedTag,
    destination,
  };

  // Call the existing blog page component with the modified search params and tag route flag
  return BlogHome({
    params,
    searchParams: Promise.resolve(modifiedSearchParams),
  });
}
