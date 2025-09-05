import { type Metadata } from "next";
import {
  getGeneratedAllUniqueTags,
  getAllBlogPosts,
} from "@/lib/generated-blog-data";
import BlogHome from "../../page";
import { JsonLd } from "@/components/json-ld";
import { env } from "@/lib/consts";
import {
  generateWebPageJsonLd,
  generateBreadcrumbListJsonLd,
  generateBreadcrumbData,
} from "@/lib/json-ld";
import { getTranslation } from "@/app/i18n";

// Generate static params for basic tag routes only
export async function generateStaticParams() {
  const allTags = getGeneratedAllUniqueTags();
  const allBlogPosts = getAllBlogPosts();

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
  const { locale, tag } = await params;
  const { page = "1", destination } = await searchParams;

  // We need to get translations for this component
  const { getTranslation } = await import("@/app/i18n");
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
    description: `Travel guides and visa information related to ${decodedTag}. Expert travel advice and destination insights.`,
    url: tagUrl,
    isPartOf: {
      name: t("jsonld.organization.name"),
      url: baseUrl,
    },
  });

  const breadcrumbData = generateBreadcrumbData(
    [
      { name: tNav("breadcrumb.home"), url: `${baseUrl}/${locale}` },
      { name: tNav("breadcrumb.blog"), url: `${baseUrl}/${locale}/blog` },
      { name: decodedTag, url: tagUrl },
    ],
    tNav
  );
  const breadcrumbJsonLd = generateBreadcrumbListJsonLd(breadcrumbData);

  // Call the existing blog page component with the modified search params and tag route flag
  return (
    <>
      <JsonLd data={webpageJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      {BlogHome({
        params,
        searchParams: Promise.resolve(modifiedSearchParams),
      })}
    </>
  );
}
