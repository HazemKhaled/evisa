import { type Metadata } from "next";
import Link from "next/link";
import { getGeneratedBlogPostsForLocale } from "@/lib/generated-blog-data";
import { type BlogPostData } from "@/lib/blog";
import { env } from "@/lib/consts";
import { StaticPageLayout } from "@/components/static-page-layout";
import { BlogPostList } from "@/components/ui/blog-post-list";
import { BlogSearch } from "@/components/ui/blog-search";
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

interface DestinationBlogProps {
  params: Promise<{ locale: string; destination: string }>;
  searchParams: Promise<{ page?: string; tag?: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; destination: string }>;
}): Promise<Metadata> {
  const { locale, destination } = await params;
  const { t } = await getTranslation(locale, "pages");

  const destinationName = destination.toUpperCase();

  return {
    title: `${t("blog.title")} - ${destinationName}`,
    description: `${t("blog.subtitle")} for ${destinationName}`,
    keywords: `${t("blog.keywords")}, ${destinationName}, travel, visa`,
  };
}

export default async function DestinationBlog({
  params,
  searchParams,
}: DestinationBlogProps) {
  const { locale, destination } = await params;
  const { page = "1", tag } = await searchParams;
  const { t } = await getTranslation(locale, "pages");
  const { t: tNav } = await getTranslation(locale, "navigation");

  const currentPage = parseInt(page, 10);
  const postsPerPage = 9;

  // Get all blog posts for the locale using generated data
  let allPosts = getGeneratedBlogPostsForLocale(locale);

  // Filter by destination (required for this route)
  allPosts = allPosts.filter((post: BlogPostData) =>
    post.frontmatter.destinations?.some(
      (dest: string) => dest.toLowerCase() === destination.toLowerCase()
    )
  );

  // Filter by tag if specified
  if (tag) {
    allPosts = allPosts.filter((post: BlogPostData) =>
      post.frontmatter.tags?.includes(tag.toLowerCase())
    );
  }

  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const posts = allPosts.slice(startIndex, startIndex + postsPerPage);

  const baseUrl = env.baseUrl;
  const destinationBlogUrl = `${baseUrl}/${locale}/d/${destination}/blog`;
  const destinationName = destination.toUpperCase();

  // Generate JSON-LD for the destination blog page
  const webpageJsonLd = generateWebPageJsonLd({
    name: `${t("jsonld.blog.title")} - ${destinationName}`,
    description: `${t("jsonld.blog.description")} for ${destinationName}`,
    url: destinationBlogUrl,
    isPartOf: {
      name: t("jsonld.organization.name"),
      url: baseUrl,
    },
  });

  const breadcrumbData = generateBreadcrumbData([
    { name: tNav("breadcrumb.home"), url: `${baseUrl}/${locale}` },
    { name: tNav("breadcrumb.blog"), url: `${baseUrl}/${locale}/blog` },
    { name: destinationName, url: destinationBlogUrl },
  ]);
  const breadcrumbJsonLd = generateBreadcrumbListJsonLd(breadcrumbData);

  // Helper function to build pagination URLs with query parameters
  const buildPaginationUrl = (page: number): string => {
    const searchParams = new URLSearchParams();
    searchParams.set("page", page.toString());

    if (tag) {
      searchParams.set("tag", tag);
    }

    const queryString = searchParams.toString();
    const query = queryString ? `?${queryString}` : "";

    return `/${locale}/d/${destination}/blog${query}`;
  };

  if (allPosts.length === 0) {
    return (
      <StaticPageLayout>
        <div className="py-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            {t("blog.title")} - {destinationName}
          </h1>
          <p className="text-lg text-gray-600">
            {t("blog.empty_state_destination", {
              destination: destinationName,
            })}
          </p>
          <Link
            href={`/${locale}/blog`}
            className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            {t("blog.view_all_posts")}
          </Link>
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
              {t("blog.title")} - {destinationName}
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              {t("blog.destination_subtitle", { destination: destinationName })}
            </p>
            <Link
              href={`/${locale}/blog`}
              className="mt-4 inline-block text-blue-600 hover:text-blue-700"
            >
              ← {t("blog.view_all_posts")}
            </Link>
          </div>

          {/* Tag Filter Display */}
          {tag && (
            <div className="mb-8 text-center">
              <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800">
                {t("blog.tag")}: {tag}
                <Link
                  href={`/${locale}/d/${destination}/blog`}
                  className="ml-2 hover:text-blue-900"
                  aria-label={t("blog.clear_tag_filter")}
                >
                  ×
                </Link>
              </span>
            </div>
          )}

          {/* Search - scoped to destination posts */}
          <div className="mb-12">
            <BlogSearch
              allPosts={allPosts}
              locale={locale}
              destination={destination}
              translations={{
                searchPlaceholder:
                  t("blog.search.placeholder_destination", {
                    destination: destinationName,
                  }) || `Search ${destinationName} blog posts...`,
                searchResults: t("blog.search.results") || "Search Results",
                noResults:
                  t("blog.search.no_results_destination", {
                    destination: destinationName,
                  }) ||
                  `No posts found matching your search in ${destinationName}.`,
                searching: t("blog.search.searching") || "Searching...",
                clear: t("blog.search.clear") || "Clear",
                result: t("blog.search.result") || "result",
                results: t("blog.search.results_plural") || "results",
                noPostsFoundFor:
                  t("blog.search.no_posts_for") || "No posts found for",
              }}
            />
          </div>

          <BlogPostList
            posts={posts}
            locale={locale}
            currentPage={currentPage}
            totalPages={totalPages}
            hasNextPage={currentPage < totalPages}
            hasPrevPage={currentPage > 1}
            buildPaginationUrl={buildPaginationUrl}
            gridCols="3"
            showPagination={true}
          />
        </div>
      </StaticPageLayout>
    </>
  );
}
