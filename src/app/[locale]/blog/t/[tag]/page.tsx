import { type Metadata } from "next";
import { getAllUniqueTagsAcrossLocales } from "@/lib/services/blog-service";
import BlogHome from "../../page";
import { JsonLd } from "@/components/json-ld";
import { env } from "@/lib/consts";
import {
  generateWebPageJsonLd,
  generateBreadcrumbListJsonLd,
  generateBreadcrumbData,
} from "@/lib/json-ld";
import { getTranslation } from "@/app/i18n";
import { languages } from "@/app/i18n/settings";
import { generateAlternatesMetadata } from "@/lib/utils";

// Enable ISR with daily revalidation for tag pages
export const revalidate = 86400; // 24 hours

// Generate static params for basic tag routes only
export async function generateStaticParams(): Promise<
  Array<{ locale: string; tag: string }>
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
  const { locale, tag } = await params;
  const { page = "1" } = await searchParams;

  // We need to get translations for this component
  const { t } = await getTranslation(locale, "pages");
  const { t: tNav } = await getTranslation(locale, "navigation");

  // Decode the tag parameter
  const decodedTag = decodeURIComponent(tag);

  // Transform the tag parameter into searchParams format and reuse the existing blog component
  const modifiedSearchParams = {
    page,
    tag: decodedTag,
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
