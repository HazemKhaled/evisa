import { type Metadata } from "next";
import {
  getAllUniqueTagsAcrossLocales,
  getAllBlogPostsAcrossLocales,
} from "@/lib/services/blog-service";
import BlogHome from "../../page";
import { JsonLd } from "@/components/json-ld";
import { env } from "@/lib/consts";
import {
  generateWebPageJsonLd,
  generateBreadcrumbListJsonLd,
  generateBreadcrumbData,
} from "@/lib/json-ld";
import { getTranslation } from "@/app/i18n";

// Configure dynamic rendering for search params support
export const dynamic = "force-dynamic";
export const revalidate = 86400; // Revalidate every day

// Generate static params for basic tag routes only
export async function generateStaticParams() {
  const allTags = getAllUniqueTagsAcrossLocales();
  const allBlogPosts = getAllBlogPostsAcrossLocales();

  // Get all unique locale-tag combinations
  const locales = [...new Set(allBlogPosts.map(post => post.locale))];

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
  const { t } = await getTranslation(locale, "blog");
  const decodedTag = decodeURIComponent(tag);

  return {
    title: t("metadata.tag_title_template", {
      tag: decodedTag,
      title: t("title"),
    }),
    description: t("metadata.tag_description_template", { tag: decodedTag }),
    keywords: t("metadata.tag_keywords_template", { tag: decodedTag }),
  };
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const { locale, tag } = await params;
  const { page = "1", destination } = await searchParams;

  // We need to get translations for this component
  const { t } = await getTranslation(locale, "pages");
  const { t: tNav } = await getTranslation(locale, "navigation");

  // Decode the tag parameter
  const decodedTag = decodeURIComponent(tag);

  // Transform the tag parameter into searchParams format and reuse the existing blog component
  const modifiedSearchParams = {
    page,
    tag: decodedTag,
    destination,
  };

  const baseUrl = env.baseUrl;
  const tagUrl = `${baseUrl}/${locale}/blog/t/${tag}`;

  // Generate JSON-LD for the tag page
  const webpageJsonLd = generateWebPageJsonLd({
    name: `${decodedTag} - ${t("jsonld.blog.title")}`,
    description: t("jsonld.blog.description"),
    url: tagUrl,
    isPartOf: {
      name: t("jsonld.website.name"),
      url: baseUrl,
    },
  });

  const breadcrumbData = generateBreadcrumbData([
    { name: tNav("breadcrumb.home"), url: `${baseUrl}/${locale}` },
    { name: tNav("breadcrumb.blog"), url: `${baseUrl}/${locale}/blog` },
    { name: decodedTag, url: tagUrl },
  ]);
  const breadcrumbJsonLd = generateBreadcrumbListJsonLd(breadcrumbData);

  // Use the existing blog page component with the modified search params and tag route flag
  return (
    <>
      <JsonLd data={webpageJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <BlogHome
        params={params}
        searchParams={Promise.resolve(modifiedSearchParams)}
      />
    </>
  );
}
