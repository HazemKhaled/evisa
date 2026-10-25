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
  searchBlogPosts,
} from "@/lib/services/blog-service";
import { getDestinationsListWithMetadata } from "@/lib/services/country-service";
import type { BlogPostData, PaginatedBlogResponse } from "@/lib/types/blog";
import { generateAlternatesMetadata } from "@/lib/utils";

export const revalidate = 86400;

const EMPTY_PAGINATED_RESPONSE: PaginatedBlogResponse = {
  posts: [],
  total: 0,
  hasMore: false,
  currentPage: 1,
  totalPages: 0,
};

interface DestinationBlogProps {
  params: Promise<{ locale: string; destination: string }>;
  searchParams: Promise<{
    page?: string;
    destination?: string;
    search?: string;
  }>;
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
  const { page = "1", search } = await searchParams;

  const parsedPage = parseInt(page, 10);
  const currentPage =
    Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const postsPerPage = 9;
  const offset = (currentPage - 1) * postsPerPage;

  const [{ t }, { t: tNav }] = await Promise.all([
    getTranslation(locale, "blog"),
    getTranslation(locale, "navigation"),
  ]);

  let paginatedResponse: PaginatedBlogResponse;
  let pageTitle: string;
  let pageSubtitle: string;

  if (search) {
    const results = await searchBlogPosts(search, locale, postsPerPage).catch(
      () => [] as BlogPostData[]
    );
    paginatedResponse = {
      posts: results,
      total: results.length,
      hasMore: results.length > postsPerPage,
      currentPage,
      totalPages: Math.ceil(results.length / postsPerPage),
    };
    pageTitle = t("search.heading");
    pageSubtitle = t("subtitle");
  } else {
    paginatedResponse = await getBlogPostsByDestinationPaginated(
      destination,
      locale,
      postsPerPage,
      offset
    ).catch(() => EMPTY_PAGINATED_RESPONSE);
    pageTitle = t("destination.title", { destination });
    pageSubtitle = t("destination.subtitle", { destination });
  }

  const emptyStateMessage = t("empty_state");
  const baseUrl = env.baseUrl;
  const canonicalBlogUrl = getCanonicalBlogUrl(baseUrl, locale, {
    destination,
    ...(search ? { search } : {}),
  });

  const buildPaginationUrl = (targetPage: number): string => {
    const queryParams = new URLSearchParams();
    queryParams.set("page", targetPage.toString());
    if (search) {
      queryParams.set("search", search);
    } else {
      queryParams.set("destination", destination);
    }
    return `/${locale}/d/${encodeURIComponent(destination)}/blog?${queryParams.toString()}`;
  };

  const { posts, totalPages } = paginatedResponse;

  const collectionPageJsonLd = generateCollectionPageJsonLd({
    name: pageTitle,
    description: pageSubtitle,
    url: canonicalBlogUrl,
    items: posts.map(post => ({
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
    posts: posts.map(post => ({
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
            <BlogPostList
              posts={posts}
              locale={locale}
              currentPage={currentPage}
              totalPages={totalPages}
              buildPaginationUrl={buildPaginationUrl}
              gridCols="3"
              showPagination={true}
            />
          )}
        </div>
      </StaticPageLayout>
    </>
  );
}
