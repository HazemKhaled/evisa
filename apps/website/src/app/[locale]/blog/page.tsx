import { Skeleton } from "@repo/ui";
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
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getTranslation(locale, "blog");
  const alternates = generateAlternatesMetadata(env.baseUrl, "blog", locale);

  return {
    title: t("title"),
    description: t("subtitle"),
    keywords: t("keywords"),
    alternates,
    openGraph: {
      url: alternates.canonical,
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
  let blogUrl = `${baseUrl}/${locale}/blog`;

  if (search) {
    pageTitle = t("search.heading");
    blogUrl = `${baseUrl}/${locale}/blog?search=${encodeURIComponent(search)}`;
  } else if (tag) {
    pageTitle = t("tag.title", { tag });
    pageSubtitle = t("tag.subtitle", { tag });
    blogUrl = `${baseUrl}/${locale}/blog/t/${encodeURIComponent(tag)}`;
  } else if (destination) {
    pageTitle = t("destination.title", { destination });
    pageSubtitle = t("destination.subtitle", { destination });
    blogUrl = `${baseUrl}/${locale}/d/${encodeURIComponent(destination)}/blog`;
  }

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

  const paginatedResponse = search
    ? {
        posts: await searchBlogPosts(search, locale, postsPerPage),
        totalPages: 1,
      }
    : tag
      ? await getBlogPostsByTagPaginated(tag, locale, postsPerPage, offset)
      : destination
        ? await getBlogPostsByDestinationPaginated(
            destination,
            locale,
            postsPerPage,
            offset
          )
        : await getBlogPostsForLocalePaginated(locale, postsPerPage, offset);

  const { posts: jsonLdPosts, totalPages } = paginatedResponse;

  const collectionPageJsonLd = generateCollectionPageJsonLd({
    name: pageTitle,
    description: pageSubtitle,
    url: blogUrl,
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
    url: blogUrl,
    posts: jsonLdPosts.map(post => ({
      headline: post.title,
      url: `${baseUrl}/${locale}/blog/${post.slug}`,
      image: post.image,
      datePublished: post.publishedAt,
    })),
  });

  // Create breadcrumb items based on current page state
  let breadcrumbItems: {
    label: string;
    href?: string;
    isCurrentPage?: boolean;
  }[] = [
    { label: tNav("breadcrumb.home"), href: `/${locale}` },
    { label: tNav("breadcrumb.blog"), href: `/${locale}/blog` },
  ];

  if (search) {
    breadcrumbItems = [
      { label: tNav("breadcrumb.home"), href: `/${locale}` },
      { label: tNav("breadcrumb.blog"), href: `/${locale}/blog` },
      { label: t("search.heading"), isCurrentPage: true },
    ];
  } else if (destination) {
    breadcrumbItems = [
      { label: tNav("breadcrumb.home"), href: `/${locale}` },
      { label: tNav("breadcrumb.destinations"), href: `/${locale}/d` },
      { label: destination, href: `/${locale}/d/${destination}` },
      { label: tNav("breadcrumb.blog"), isCurrentPage: true },
    ];
  } else if (tag) {
    breadcrumbItems = [
      { label: tNav("breadcrumb.home"), href: `/${locale}` },
      { label: tNav("breadcrumb.blog"), href: `/${locale}/blog` },
      { label: tNav("breadcrumb.tag", { tagName: tag }), isCurrentPage: true },
    ];
  } else {
    breadcrumbItems = [
      { label: tNav("breadcrumb.home"), href: `/${locale}` },
      { label: tNav("breadcrumb.blog"), isCurrentPage: true },
    ];
  }

  const breadcrumbData = search
    ? generateBreadcrumbData([
        { name: tNav("breadcrumb.home"), url: `${baseUrl}/${locale}` },
        { name: tNav("breadcrumb.blog"), url: `${baseUrl}/${locale}/blog` },
        { name: t("search.heading"), url: blogUrl },
      ])
    : destination
      ? generateBreadcrumbData([
          { name: tNav("breadcrumb.home"), url: `${baseUrl}/${locale}` },
          {
            name: tNav("breadcrumb.destinations"),
            url: `${baseUrl}/${locale}/d`,
          },
          {
            name: destination,
            url: `${baseUrl}/${locale}/d/${encodeURIComponent(destination)}`,
          },
          { name: tNav("breadcrumb.blog"), url: blogUrl },
        ])
      : tag
        ? generateBreadcrumbData([
            { name: tNav("breadcrumb.home"), url: `${baseUrl}/${locale}` },
            { name: tNav("breadcrumb.blog"), url: `${baseUrl}/${locale}/blog` },
            { name: decodedOrOriginalTag(tag), url: blogUrl },
          ])
        : generateBreadcrumbData([
            { name: tNav("breadcrumb.home"), url: `${baseUrl}/${locale}` },
            { name: tNav("breadcrumb.blog"), url: blogUrl },
          ]);
  const breadcrumbJsonLd = generateBreadcrumbListJsonLd(breadcrumbData);

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
            <BlogSearch
              locale={locale}
              searchValue={search}
              searchPlaceholder={t("search.placeholder")}
            />
          </div>

          <Suspense fallback={<BlogPostsSectionSkeleton />}>
            <BlogPostsSection
              locale={locale}
              posts={jsonLdPosts}
              totalPages={totalPages}
              search={search}
              currentPage={currentPage}
              buildPaginationUrl={buildPaginationUrl}
            />
          </Suspense>
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

async function BlogPostsSection({
  locale,
  posts,
  totalPages,
  search,
  currentPage,
  buildPaginationUrl,
}: {
  locale: string;
  posts: BlogPostData[];
  totalPages: number;
  search?: string;
  currentPage: number;
  buildPaginationUrl: (page: number) => string;
}) {
  const { t } = await getTranslation(locale, "blog");

  if (posts.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg text-gray-600">
          {search ? t("emptySearch", { search }) : t("empty_state")}
        </p>
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

function BlogPostsSectionSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg border bg-white p-4">
            <Skeleton className="mb-4 aspect-video w-full rounded-md" />
            <Skeleton className="mb-2 h-5 w-3/4" />
            <Skeleton className="mb-4 h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ))}
      </div>
    </div>
  );
}
