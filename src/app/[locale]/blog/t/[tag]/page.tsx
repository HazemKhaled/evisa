import { Metadata } from "next";
import { getAllUniqueTags, getAllBlogPosts } from "@/lib/blog";
import BlogHome from "../../page";

export const dynamic = "force-static";

interface TagPageProps {
  params: Promise<{ locale: string; tag: string }>;
  searchParams: Promise<{ page?: string; destination?: string }>;
}

export async function generateStaticParams() {
  const allTags = await getAllUniqueTags();
  const allBlogPosts = getAllBlogPosts();

  // Get all unique locale-tag combinations
  const locales = [...new Set(allBlogPosts.map(post => post.locale))];

  const params = [];
  for (const currentLocale of locales) {
    for (const tag of allTags) {
      params.push({ locale: currentLocale, tag });
    }
  }

  return params;
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

  // Call the existing blog page component with the modified search params
  return BlogHome({
    params,
    searchParams: Promise.resolve(modifiedSearchParams),
  });
}
