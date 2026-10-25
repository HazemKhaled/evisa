import { type Metadata } from "next";
import { Suspense } from "react";

import { getTranslation } from "@/app/i18n";
import { languages } from "@/app/i18n/settings";
import {
  BlogCatalogClient,
  type BlogCatalogTranslations,
  BlogCatalogView,
} from "@/components/blog/blog-catalog-client";
import { MultipleJsonLd } from "@/components/json-ld";
import { StaticPageLayout } from "@/components/static-page-layout";
import { env } from "@/lib/consts";
import {
  generateBlogJsonLd,
  generateBreadcrumbData,
  generateBreadcrumbListJsonLd,
  generateCollectionPageJsonLd,
  getCanonicalBlogUrl,
} from "@/lib/json-ld";
import {
  getAllBlogPosts,
  getBlogPostsByDestination,
  getBlogPostsByTag,
} from "@/lib/services/blog-service";
import type { BlogPostData } from "@/lib/types/blog";
import { generateAlternatesMetadata } from "@/lib/utils";

export const revalidate = 86400;

export function generateStaticParams(): { locale: string }[] {
  return languages.map(locale => ({ locale }));
}

function decodedOrOriginalTag(tag: string): string {
  try {
    return decodeURIComponent(tag);
  } catch {
    return tag;
  }
}

async function fetchRoutePosts(
  routeTag: string | undefined,
  routeDestination: string | undefined,
  locale: string
): Promise<BlogPostData[]> {
  if (routeTag) {
    return await getBlogPostsByTag(decodedOrOriginalTag(routeTag), locale);
  }
  if (routeDestination) {
    return await getBlogPostsByDestination(routeDestination, locale);
  }
  return await getAllBlogPosts(locale);
}

function buildRouteBreadcrumbs(
  destination: string | undefined,
  tag: string | undefined,
  locale: string,
  baseUrl: string,
  canonicalBlogUrl: string,
  tNav: (key: string, params?: Record<string, string>) => string
): { decodedLabel: string; url: string }[] {
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

export interface BlogHomeProps {
  params: Promise<{
    locale: string;
    destination?: string;
    tag?: string;
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
  const canonicalBlogUrl = getCanonicalBlogUrl(env.baseUrl, locale);

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

export default async function BlogHome({ params }: BlogHomeProps) {
  const { locale, destination: routeDestination, tag: routeTag } = await params;
  const decodedRouteTag = routeTag ? decodedOrOriginalTag(routeTag) : undefined;

  const [{ t }, { t: tNav }, posts] = await Promise.all([
    getTranslation(locale, "blog"),
    getTranslation(locale, "navigation"),
    fetchRoutePosts(decodedRouteTag, routeDestination, locale),
  ]);

  const postsPerPage = 9;
  const baseUrl = env.baseUrl;
  const canonicalBlogUrl = getCanonicalBlogUrl(baseUrl, locale, {
    tag: decodedRouteTag,
    destination: routeDestination,
  });

  let pageTitle = t("title");
  let pageSubtitle = t("subtitle");
  if (decodedRouteTag) {
    pageTitle = t("tag.title", { tag: decodedRouteTag });
    pageSubtitle = t("tag.subtitle", { tag: decodedRouteTag });
  } else if (routeDestination) {
    pageTitle = t("destination.title", { destination: routeDestination });
    pageSubtitle = t("destination.subtitle", { destination: routeDestination });
  }

  const jsonLdPosts = posts.slice(0, postsPerPage);

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

  const breadcrumbModel = buildRouteBreadcrumbs(
    routeDestination,
    decodedRouteTag,
    locale,
    baseUrl,
    canonicalBlogUrl,
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

  const catalogTranslations: BlogCatalogTranslations = {
    title: t("title"),
    subtitle: t("subtitle"),
    searchHeading: t("search.heading"),
    searchPlaceholder: t("search.placeholder"),
    emptyState: t("empty_state"),
    emptySearchTemplate: t("emptySearch", { search: "__SEARCH__" }),
    tagTitleTemplate: t("tag.title", { tag: "__TAG__" }),
    tagSubtitleTemplate: t("tag.subtitle", { tag: "__TAG__" }),
    destinationTitleTemplate: t("destination.title", {
      destination: "__DESTINATION__",
    }),
    destinationSubtitleTemplate: t("destination.subtitle", {
      destination: "__DESTINATION__",
    }),
    breadcrumbHome: tNav("breadcrumb.home"),
    breadcrumbBlog: tNav("breadcrumb.blog"),
    breadcrumbDestinations: tNav("breadcrumb.destinations"),
    paginationShowing: t("pagination.showing"),
    paginationPost: t("pagination.post"),
    paginationPosts: t("pagination.posts"),
    paginationOn: t("pagination.on"),
    paginationPage: t("pagination.page"),
    paginationOf: t("pagination.of"),
    paginationPrevious: t("pagination.previous"),
    paginationNext: t("pagination.next"),
  };

  return (
    <>
      <MultipleJsonLd
        data={[collectionPageJsonLd, blogJsonLd, breadcrumbJsonLd]}
      />
      <StaticPageLayout>
        <Suspense
          fallback={
            <BlogCatalogView
              locale={locale}
              posts={posts}
              baseUrl={baseUrl}
              routeDestination={routeDestination}
              routeTag={decodedRouteTag}
              postsPerPage={postsPerPage}
              translations={catalogTranslations}
            />
          }
        >
          <BlogCatalogClient
            locale={locale}
            posts={posts}
            baseUrl={baseUrl}
            routeDestination={routeDestination}
            routeTag={decodedRouteTag}
            postsPerPage={postsPerPage}
            translations={catalogTranslations}
          />
        </Suspense>
      </StaticPageLayout>
    </>
  );
}
