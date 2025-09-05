import { type Metadata } from "next";
import Link from "next/link";
import { getGeneratedBlogPostsForLocale } from "@/lib/generated-blog-data";
import { isRTL, cn } from "@/lib/utils";
import { StaticPageLayout } from "@/components/static-page-layout";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogPagination } from "@/components/blog/blog-pagination";
import { BlogFilter } from "@/components/blog/blog-filter";
import { getTranslation } from "@/app/i18n";
import { languages } from "@/app/i18n/settings";

// Generate static params for basic locale routes only
export async function generateStaticParams() {
  return languages.map(locale => ({ locale }));
}

interface BlogHomeProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; tag?: string; destination?: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Travel Blog - GetTravelVisa.com`,
    description:
      "Expert travel guides, visa tips, and destination insights to help you plan your perfect trip.",
    keywords:
      "travel blog, visa guides, travel tips, destination guides, travel advice",
  };
}

export default async function BlogHome({
  params,
  searchParams,
}: BlogHomeProps) {
  const { locale } = await params;
  const { page = "1", tag, destination } = await searchParams;
  const { t } = await getTranslation(locale, "pages");

  const currentPage = parseInt(page, 10);
  const postsPerPage = 9;

  // Get all blog posts for the locale using generated data
  let allPosts = getGeneratedBlogPostsForLocale(locale);

  // Filter by tag if specified
  if (tag) {
    allPosts = allPosts.filter(post =>
      post.frontmatter.tags?.includes(tag.toLowerCase())
    );
  }

  // Filter by destination if specified
  if (destination) {
    allPosts = allPosts.filter(post =>
      post.frontmatter.destinations?.some(dest =>
        dest.toLowerCase().includes(destination.toLowerCase())
      )
    );
  }

  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const posts = allPosts.slice(startIndex, startIndex + postsPerPage);

  const isCurrentRTL = isRTL(locale);

  // Helper function to build pagination URLs with query parameters
  const buildPaginationUrl = (page: number): string => {
    const searchParams = new URLSearchParams();
    searchParams.set("page", page.toString());

    if (destination) {
      searchParams.set("destination", destination);
    }

    const queryString = searchParams.toString();
    const query = queryString ? `?${queryString}` : "";

    if (tag) {
      // For tag routes, use clean URL format: /en/blog/t/tag-name?page=2
      return `/${locale}/blog/t/${encodeURIComponent(tag)}${query}`;
    }

    // For regular blog routes, use query parameter format: /en/blog?page=2
    return `/${locale}/blog${query}`;
  };

  if (allPosts.length === 0) {
    return (
      <StaticPageLayout>
        <div className="py-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Travel Blog</h1>
          <p className="text-lg text-gray-600">
            No blog posts available yet. Check back soon!
          </p>
        </div>
      </StaticPageLayout>
    );
  }

  return (
    <StaticPageLayout>
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
            Travel Blog
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Expert travel guides, visa tips, and destination insights to help
            you plan your perfect trip.
          </p>
        </div>

        {/* Active Filters */}
        {(tag || destination) && (
          <div className={cn("mb-8 flex flex-wrap gap-2")}>
            {tag && (
              <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                Tag: {tag}
                <Link
                  href={`/${locale}/blog`}
                  className={cn(
                    "ml-2 hover:text-blue-600",
                    isCurrentRTL && "mr-2 ml-0"
                  )}
                >
                  ×
                </Link>
              </span>
            )}
            {destination && (
              <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                Destination: {destination}
                <Link
                  href={`/${locale}/blog`}
                  className={cn(
                    "ml-2 hover:text-green-600",
                    isCurrentRTL && "mr-2 ml-0"
                  )}
                >
                  ×
                </Link>
              </span>
            )}
          </div>
        )}

        {/* Filter Section */}
        <div className="mb-8 border-b border-gray-200 pb-8">
          <BlogFilter locale={locale} currentTag={tag} />
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <BlogCard key={post.slug} post={post} locale={locale} />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12">
          <BlogPagination
            currentPage={currentPage}
            totalPages={totalPages}
            buildPaginationUrl={buildPaginationUrl}
            startIndex={startIndex}
            endIndex={startIndex + postsPerPage}
            totalPosts={totalPosts}
            t={t}
          />
        </div>
      </div>
    </StaticPageLayout>
  );
}
