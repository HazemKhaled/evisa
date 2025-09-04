import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getGeneratedBlogPostsForLocale } from "@/lib/generated-blog-data";
import { isRTL, cn } from "@/lib/utils";
import { getBaseUrl } from "@/lib/utils/urls";
import { StaticPageLayout } from "@/components/static-page-layout";
import { getTranslation } from "@/app/i18n";
import { languages } from "@/app/i18n/settings";
import { JsonLd } from "@/components/json-ld";
import {
  generateWebPageJsonLd,
  generateBreadcrumbListJsonLd,
  generateBreadcrumbData,
} from "@/lib/json-ld";

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
  const { t: tNav } = await getTranslation(locale, "navigation");

  const currentPage = parseInt(page, 10);
  const postsPerPage = 9;

  // Get all blog posts for the locale using generated data
  let allPosts = getGeneratedBlogPostsForLocale(locale);

  // Filter by tag if specified
  if (tag) {
    allPosts = allPosts.filter((post: any) =>
      post.frontmatter.tags?.includes(tag.toLowerCase())
    );
  }

  // Filter by destination if specified
  if (destination) {
    allPosts = allPosts.filter((post: any) =>
      post.frontmatter.destinations?.some((dest: string) =>
        dest.toLowerCase().includes(destination.toLowerCase())
      )
    );
  }

  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const posts = allPosts.slice(startIndex, startIndex + postsPerPage);

  const isCurrentRTL = isRTL(locale);

  const baseUrl = getBaseUrl();
  const blogUrl = `${baseUrl}/${locale}/blog`;

  // Generate JSON-LD for the blog page
  const webpageJsonLd = generateWebPageJsonLd({
    name: t("jsonld.blog.title"),
    description: t("jsonld.blog.description"),
    url: blogUrl,
    isPartOf: {
      name: t("jsonld.organization.name"),
      url: baseUrl,
    },
  });

  const breadcrumbData = generateBreadcrumbData(
    [
      { name: tNav("breadcrumb.home"), url: `${baseUrl}/${locale}` },
      { name: tNav("breadcrumb.blog"), url: blogUrl },
    ],
    tNav
  );
  const breadcrumbJsonLd = generateBreadcrumbListJsonLd(breadcrumbData);

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
    <>
      <JsonLd data={webpageJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
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

          {/* Filters */}
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

          {/* Blog Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any) => (
              <article
                key={post.slug}
                className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg"
              >
                <Link href={`/${locale}/blog/${post.slug}`}>
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={post.frontmatter.image}
                      alt={post.frontmatter.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </Link>

                <div className="p-6">
                  {/* Tags and Destinations */}
                  <div className={cn("mb-3 flex flex-wrap gap-2")}>
                    {post.frontmatter.destinations?.map(
                      (destination: string, index: number) => (
                        <Link
                          key={destination}
                          href={`/${locale}/blog?destination=${encodeURIComponent(destination)}`}
                          className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 hover:bg-blue-200"
                        >
                          📍 {post.destinationNames?.[index] || destination}
                        </Link>
                      )
                    )}
                    {post.frontmatter.tags?.slice(0, 2).map((tag: string) => (
                      <Link
                        key={tag}
                        href={`/${locale}/blog/t/${encodeURIComponent(tag)}`}
                        className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 hover:bg-gray-200"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>

                  {/* Title */}
                  <h2
                    className={cn(
                      "mb-3 line-clamp-2 text-xl font-bold text-gray-900"
                    )}
                  >
                    <Link
                      href={`/${locale}/blog/${post.slug}`}
                      className="hover:text-blue-600"
                    >
                      {post.frontmatter.title}
                    </Link>
                  </h2>

                  {/* Description */}
                  <p className={cn("mb-4 line-clamp-3 text-gray-600")}>
                    {post.frontmatter.description}
                  </p>

                  {/* Meta */}
                  <div
                    className={cn(
                      "flex items-center justify-between text-sm text-gray-500"
                    )}
                  >
                    <span>{post.frontmatter.author}</span>
                    <span>
                      {new Date(
                        post.frontmatter.publishedAt
                      ).toLocaleDateString(locale)}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <nav
                className="flex items-center space-x-2"
                aria-label="Pagination"
              >
                {/* Previous */}
                {currentPage > 1 && (
                  <Link
                    href={buildPaginationUrl(currentPage - 1)}
                    className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    {t("blog.pagination.previous")}
                  </Link>
                )}

                {/* Page Numbers */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum =
                    Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                  if (pageNum > totalPages) return null;

                  return (
                    <Link
                      key={pageNum}
                      href={buildPaginationUrl(pageNum)}
                      className={cn(
                        "rounded-md border px-3 py-2 text-sm font-medium",
                        pageNum === currentPage
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
                      )}
                    >
                      {pageNum}
                    </Link>
                  );
                })}

                {/* Next */}
                {currentPage < totalPages && (
                  <Link
                    href={buildPaginationUrl(currentPage + 1)}
                    className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    {t("blog.pagination.next")}
                  </Link>
                )}
              </nav>
            </div>
          )}

          {/* Blog Stats */}
          <div className="mt-12 text-center text-gray-500">
            <p>
              {t("blog.pagination.showing")} {startIndex + 1}-
              {Math.min(startIndex + postsPerPage, totalPosts)}{" "}
              {t("blog.pagination.of")} {totalPosts}{" "}
              {t("blog.pagination.articles")}
            </p>
          </div>
        </div>
      </StaticPageLayout>
    </>
  );
}
