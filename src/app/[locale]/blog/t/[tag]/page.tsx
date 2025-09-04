import { Metadata } from "next";
import {
  getGeneratedAllUniqueTags,
  getAllBlogPosts,
} from "@/lib/generated-blog-data";
import BlogHome from "../../page";
import { JsonLd } from "@/components/json-ld";
import {
  generateWebPageJsonLd,
  generateBreadcrumbListJsonLd,
} from "@/lib/json-ld";

// Generate static params for basic tag routes only
export async function generateStaticParams() {
  const allTags = getGeneratedAllUniqueTags();
  const allBlogPosts = getAllBlogPosts();

  // Get all unique locale-tag combinations
  const locales = [...new Set(allBlogPosts.map((post: any) => post.locale))];

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
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  return {
    title: `${decodedTag} - Travel Blog - GetTravelVisa.com`,
    description: `Travel guides and visa information related to ${decodedTag}. Expert travel advice and destination insights.`,
    keywords: `${decodedTag}, travel blog, visa guides, travel tips, destination guides`,
  };
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const { locale, tag } = await params;
  const { page = "1", destination } = await searchParams;

  // Decode the tag parameter
  const decodedTag = decodeURIComponent(tag);

  // Transform the tag parameter into searchParams format and reuse the existing blog component
  const modifiedSearchParams = {
    page,
    tag: decodedTag,
    destination,
  };

  const baseUrl = "https://gettravelvisa.com";
  const tagUrl = `${baseUrl}/${locale}/blog/t/${tag}`;

  // Generate JSON-LD for the tag page
  const webpageJsonLd = generateWebPageJsonLd({
    name: `${decodedTag} - Travel Blog - GetTravelVisa.com`,
    description: `Travel guides and visa information related to ${decodedTag}. Expert travel advice and destination insights.`,
    url: tagUrl,
    isPartOf: {
      name: "GetTravelVisa.com",
      url: baseUrl,
    },
  });

  const breadcrumbJsonLd = generateBreadcrumbListJsonLd({
    itemListElement: [
      {
        position: 1,
        name: "Home",
        item: `${baseUrl}/${locale}`,
      },
      {
        position: 2,
        name: "Blog",
        item: `${baseUrl}/${locale}/blog`,
      },
      {
        position: 3,
        name: decodedTag,
        item: tagUrl,
      },
    ],
  });

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
