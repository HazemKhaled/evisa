import { type Metadata } from "next";
import { Suspense } from "react";

import { getTranslation } from "@/app/i18n";
import { languages } from "@/app/i18n/settings";
import { BlogPostList } from "@/components/blog/blog-post-list";
import { BlogSearch } from "@/components/blog/blog-search";
import { PaginatedBlogList } from "@/components/blog/paginated-blog-list";
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
import { getBlogPostsByDestinationPaginated } from "@/lib/services/blog-service";
import { getDestinationsListWithMetadata } from "@/lib/services/country-service";
import type { BlogPostData } from "@/lib/types/blog";
import { generateAlternatesMetadata } from "@/lib/utils";
import { paginateArray } from "@/lib/utils/pagination";

export const revalidate = 86400;

const POSTS_PER_PAGE = 9;

// Pagination is applied on the client so the route stays statically cacheable,
// which means every page's posts have to be fetched up front. The cap keeps a
// pathological destination from pulling an unbounded list into one render.
const MAX_POSTS = 500;

const EMPTY_PAGINATED_RESPONSE: {
  posts: BlogPostData[];
} = {
  posts: [],
};

interface DestinationBlogProps {
  params: Promise<{ locale: string; destination: string }>;
}

export async function generateStaticParams(): Promise<
  { locale: string; destination: string }[]
> {
  const popularDestinations = await getDestinationsListWithMetadata(
    "en",
    10,
    "popular"
  ).catch(() => []);

  return languages.flatMap(locale =>
    popularDestinations.map(destination => ({
      locale,
      destination: destination.code,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; destination: string }>;
}): Promise<Metadata> {
  const { locale, destination } = await params;
  const { t } = await getTranslation(locale, "blog");
  const alternates = generateAlternatesMetadata(
    env.baseUrl,
    `d/${destination}/blog`,
    locale
  );

  return {
    title: `${t("title")} - ${destination}`,
    description: `${t("subtitle")} for ${destination}`,
    keywords: `${t("keywords")}, ${destination}, travel, visa`,
    alternates,
    openGraph: {
      url: alternates.canonical,
    },
  };
}

export default async function DestinationBlog({
  params,
}: DestinationBlogProps) {
  const { locale, destination } = await params;

  const [{ t }, { t: tNav }, paginatedResponse] = await Promise.all([
    getTranslation(locale, "blog"),
    getTranslation(locale, "navigation"),
    getBlogPostsByDestinationPaginated(destination, locale, MAX_POSTS, 0).catch(
      () => EMPTY_PAGINATED_RESPONSE
    ),
  ]);

  const { posts } = paginatedResponse;
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));

  const pageTitle = t("destination.title", { destination });
  const pageSubtitle = t("destination.subtitle", { destination });
  const emptyStateMessage = t("empty_state");
  const baseUrl = env.baseUrl;
  const canonicalBlogUrl = getCanonicalBlogUrl(baseUrl, locale, {
    destination,
  });

  const buildPaginationUrl = (targetPage: number): string => {
    const queryParams = new URLSearchParams();
    queryParams.set("page", targetPage.toString());
    queryParams.set("destination", destination);
    return `/${locale}/d/${encodeURIComponent(destination)}/blog?${queryParams.toString()}`;
  };

  const firstPagePosts = posts.slice(0, POSTS_PER_PAGE);

  const collectionPageJsonLd = generateCollectionPageJsonLd({
    name: pageTitle,
    description: pageSubtitle,
    url: canonicalBlogUrl,
    items: firstPagePosts.map(post => ({
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
    posts: firstPagePosts.map(post => ({
      headline: post.title,
      url: `${baseUrl}/${locale}/blog/${post.slug}`,
      image: post.image,
      datePublished: post.publishedAt,
    })),
  });

  const breadcrumbModel = [
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

  const breadcrumbJsonLd = generateBreadcrumbListJsonLd(
    generateBreadcrumbData(
      breadcrumbModel.map(item => ({
        name: item.decodedLabel,
        url: item.url,
      }))
    )
  );

  const breadcrumbItems = breadcrumbModel.map((item, index) => ({
    label: item.decodedLabel,
    href: index === breadcrumbModel.length - 1 ? undefined : item.url,
    isCurrentPage: index === breadcrumbModel.length - 1,
  }));

  const renderedPages = Array.from({ length: totalPages }, (_, index) => (
    <BlogPostList
      key={index}
      posts={paginateArray(posts, index + 1, POSTS_PER_PAGE)}
      locale={locale}
      currentPage={index + 1}
      totalPages={totalPages}
      buildPaginationUrl={buildPaginationUrl}
      gridCols="3"
      showPagination={true}
    />
  ));

  return (
    <>
      <MultipleJsonLd
        data={[collectionPageJsonLd, blogJsonLd, breadcrumbJsonLd]}
      />
      <StaticPageLayout>
        <div className="mx-auto max-w-7xl">
          <PageBreadcrumb items={breadcrumbItems} className="mb-8" />

          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
              {pageTitle}
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              {pageSubtitle}
            </p>
          </div>

          <div className="mb-12">
            <Suspense
              fallback={
                <div className="h-14 w-full rounded-lg border bg-white" />
              }
            >
              <BlogSearch
                locale={locale}
                searchPlaceholder={t("search.placeholder")}
              />
            </Suspense>
          </div>

          {posts.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-lg text-gray-600">{emptyStateMessage}</p>
            </div>
          ) : (
            <Suspense fallback={renderedPages[0]}>
              <PaginatedBlogList pages={renderedPages} />
            </Suspense>
          )}
        </div>
      </StaticPageLayout>
    </>
  );
}
