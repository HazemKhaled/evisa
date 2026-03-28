import { type Metadata } from "next";
import { Suspense } from "react";

import { getTranslation } from "@/app/i18n";
import { languages } from "@/app/i18n/settings";
import { BlogPostList } from "@/components/blog/blog-post-list";
import { BlogSearch } from "@/components/blog/blog-search";
import { MultipleJsonLd } from "@/components/json-ld";
import { StaticPageLayout } from "@/components/static-page-layout";
import { PageBreadcrumb } from "@/components/ui/page-breadcrumb";
import { env } from "@/lib/consts";
import {
  generateBlogJsonLd,
  generateBreadcrumbData,
  generateBreadcrumbListJsonLd,
  generateCollectionPageJsonLd,
  getCanonicalBlogUrl,
} from "@/lib/json-ld";
import {
  getBlogPostsByDestinationPaginated,
  getBlogPostsByTagPaginated,
  getBlogPostsForLocalePaginated,
  searchBlogPosts,
} from "@/lib/services/blog-service";
import type { BlogPostData } from "@/lib/types/blog";
import { generateAlternatesMetadata } from "@/lib/utils";

// Enable ISR with daily revalidation for blog list
export const revalidate = 86400; // 24 hours

// Generate static params for basic locale routes only
export function generateStaticParams(): { locale: string }[] {
  return languages.map(locale => ({ locale }));
}

/**
 * Fetch paginated blog posts based on filter type
 * Routes to the appropriate service function based on search/tag/destination parameters
 */
async function fetchPaginatedPosts(
  search: string | undefined,
  tag: string | undefined,
  destination: string | undefined,
  locale: string,
  postsPerPage: number,
  offset: number
) {
  if (search) {
    return {
      posts: await searchBlogPosts(search, locale, postsPerPage),
      totalPages: 1,
    };
  }

  if (tag) {
    return await getBlogPostsByTagPaginated(tag, locale, postsPerPage, offset);
  }

  if (destination) {
    return await getBlogPostsByDestinationPaginated(
      destination,
      locale,
      postsPerPage,
      offset
    );
  }

  return await getBlogPostsForLocalePaginated(locale, postsPerPage, offset);
}

/**
 * Build normalized breadcrumb model based on current filter state
 * Returns array of breadcrumb items with decoded labels and canonical URLs
 */
function buildBlogBreadcrumbs(
  search: string | undefined,
  destination: string | undefined,
  tag: string | undefined,
  locale: string,
  baseUrl: string,
  canonicalBlogUrl: string,
  t: (key: string, params?: Record<string, string>) => string,
  tNav: (key: string, params?: Record<string, string>) => string
): { decodedLabel: string; url: string }[] {
  if (search) {
    return [
      { decodedLabel: tNav("breadcrumb.home"), url: `${baseUrl}/${locale}` },
      {
        decodedLabel: tNav("breadcrumb.blog"),
        url: `${baseUrl}/${locale}/blog`,
      },
      { decodedLabel: t("search.heading"), url: canonicalBlogUrl },
    ];
  }

  if (destination) {
    return [
      { decodedLabel: tNav("breadcrumb.home"), url: `${baseUrl}/${locale}` },
      {
        decodedLabel: tNav("breadcrumb.destinations"),
        url: `${baseUrl}/${locale}/d`,
      },
      {
        decodedLabel: destination,
        url: `${baseUrl}/${locale}/d/${encodeURIComponent(destination)}`,
      },
      { decodedLabel: tNav("breadcrumb.blog"), url: canonicalBlogUrl },
    ];
  }

  if (tag) {
    return [
      { decodedLabel: tNav("breadcrumb.home"), url: `${baseUrl}/${locale}` },
      {
        decodedLabel: tNav("breadcrumb.blog"),
        url: `${baseUrl}/${locale}/blog`,
      },
      { decodedLabel: decodedOrOriginalTag(tag), url: canonicalBlogUrl },
    ];
  }

  return [
    { decodedLabel: tNav("breadcrumb.home"), url: `${baseUrl}/${locale}` },
    { decodedLabel: tNav("breadcrumb.blog"), url: canonicalBlogUrl },
  ];
}

interface BlogHomeProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    page?: string;
    tag?: string;
    destination?: string;
    search?: string;
  }>;
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    page?: string;
    tag?: string;
    destination?: string;
    search?: string;
  }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { tag, destination, search } = await searchParams;
  const { t } = await getTranslation(locale, "blog");
  const alternates = generateAlternatesMetadata(env.baseUrl, "blog", locale);
  const canonicalBlogUrl = getCanonicalBlogUrl(env.baseUrl, locale, {
    search,
    tag,
    destination,
  });

  return {
    title: t("title"),
    description: t("subtitle"),
    keywords: t("keywords"),
    alternates: {
      ...alternates,
      canonical: canonicalBlogUrl,
    },
    openGraph: {
      url: canonicalBlogUrl,
    },
  };
}

export default async function BlogHome({
  params,
  searchParams,
}: BlogHomeProps) {
  const { locale } = await params;
  const { page = "1", tag, destination, search } = await searchParams;

  // Parallel fetch: both translations
  const [{ t }, { t: tNav }] = await Promise.all([
    getTranslation(locale, "blog"),
    getTranslation(locale, "navigation"),
  ]);

  const currentPage = search ? 1 : parseInt(page, 10);
  const postsPerPage = 9;
  const offset = (currentPage - 1) * postsPerPage;

  // Dynamic page title and URL based on filters
  let pageTitle = t("title");
  let pageSubtitle = t("subtitle");
  const baseUrl = env.baseUrl;
  const canonicalBlogUrl = getCanonicalBlogUrl(baseUrl, locale, {
    search,
    tag,
    destination,
  });

  if (search) {
    pageTitle = t("search.heading");
  } else if (tag) {
    pageTitle = t("tag.title", { tag });
    pageSubtitle = t("tag.subtitle", { tag });
  } else if (destination) {
    pageTitle = t("destination.title", { destination });
    pageSubtitle = t("destination.subtitle", { destination });
  }

  // Compute empty state message once for later use
  const emptyStateMessage = search
    ? t("emptySearch", { search })
    : t("empty_state");

  // Fetch paginated posts based on filter type
  const paginatedResponse = await fetchPaginatedPosts(
    search,
    tag,
    destination,
    locale,
    postsPerPage,
    offset
  );

  // Helper function to build pagination URLs with query parameters
  const buildPaginationUrl = (page: number): string => {
    const searchParams = new URLSearchParams();
    searchParams.set("page", page.toString());

    // Preserve filter parameters in pagination URLs
    if (tag) {
      searchParams.set("tag", tag);
    }
    if (destination) {
      searchParams.set("destination", destination);
    }
    if (search) {
      searchParams.set("search", search);
    }

    const queryString = searchParams.toString();
    const query = queryString ? `?${queryString}` : "";

    // For tag routes, maintain the tag route structure
    if (tag) {
      return `/${locale}/blog/t/${encodeURIComponent(tag)}${query}`;
    }
    // For destination routes, use destination route structure if implemented
    if (destination) {
      return `/${locale}/d/${encodeURIComponent(destination)}/blog${query}`;
    }
    // For regular blog routes, use query parameter format: /en/blog?page=2
    return `/${locale}/blog${query}`;
  };

  const { posts: jsonLdPosts, totalPages } = paginatedResponse;

  const collectionPageJsonLd = generateCollectionPageJsonLd({
    name: pageTitle,
    description: pageSubtitle,
    url: canonicalBlogUrl,
    items: jsonLdPosts.map(post => ({
      name: post.title,
      url: `${baseUrl}/${locale}/blog/${post.slug}`,
      image: post.image,
      description: post.description,
    })),
  });

  const blogJsonLd = generateBlogJsonLd({
    name: pageTitle,
    description: pageSubtitle,
    url: canonicalBlogUrl,
    posts: jsonLdPosts.map(post => ({
      headline: post.title,
      url: `${baseUrl}/${locale}/blog/${post.slug}`,
      image: post.image,
      datePublished: post.publishedAt,
    })),
  });

  // Build normalized breadcrumb model and generate JSON-LD
  const breadcrumbModel = buildBlogBreadcrumbs(
    search,
    destination,
    tag,
    locale,
    baseUrl,
    canonicalBlogUrl,
    t,
    tNav
  );
  const breadcrumbJsonLd = generateBreadcrumbListJsonLd(
    generateBreadcrumbData(
      breadcrumbModel.map(item => ({
        name: item.decodedLabel,
        url: item.url,
      }))
    )
  );

  // Create breadcrumb items for UI display from normalized model
  const breadcrumbItems = breadcrumbModel.map((item, index) => ({
    label: item.decodedLabel,
    href: index === breadcrumbModel.length - 1 ? undefined : item.url,
    isCurrentPage: index === breadcrumbModel.length - 1,
  }));

  return (
    <>
      <MultipleJsonLd
        data={[collectionPageJsonLd, blogJsonLd, breadcrumbJsonLd]}
      />
      <StaticPageLayout>
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <PageBreadcrumb items={breadcrumbItems} className="mb-8" />

          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
              {pageTitle}
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              {pageSubtitle}
            </p>
          </div>

          {/* Search */}
          <div className="mb-12">
            <Suspense
              fallback={
                <div className="h-14 w-full rounded-lg border bg-white" />
              }
            >
              <BlogSearch
                locale={locale}
                searchValue={search}
                searchPlaceholder={t("search.placeholder")}
              />
            </Suspense>
          </div>

          <BlogPostsSection
            locale={locale}
            posts={jsonLdPosts}
            totalPages={totalPages}
            search={search}
            currentPage={currentPage}
            buildPaginationUrl={buildPaginationUrl}
            emptyStateMessage={emptyStateMessage}
          />
        </div>
      </StaticPageLayout>
    </>
  );
}

function decodedOrOriginalTag(tag: string): string {
  try {
    return decodeURIComponent(tag);
  } catch {
    return tag;
  }
}

function BlogPostsSection({
  locale,
  posts,
  totalPages,
  search,
  currentPage,
  buildPaginationUrl,
  emptyStateMessage,
}: {
  locale: string;
  posts: BlogPostData[];
  totalPages: number;
  search?: string;
  currentPage: number;
  buildPaginationUrl: (page: number) => string;
  emptyStateMessage: string;
}) {
  if (posts.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg text-gray-600">{emptyStateMessage}</p>
      </div>
    );
  }

  return (
    <BlogPostList
      posts={posts}
      locale={locale}
      currentPage={currentPage}
      totalPages={totalPages}
      buildPaginationUrl={buildPaginationUrl}
      gridCols="3"
      showPagination={!search}
    />
  );
}
