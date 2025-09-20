import { type Metadata } from "next";
import {
  getBlogPostsForLocale,
  getBlogPostsByTag,
  getBlogPostsByDestination,
} from "@/lib/services/blog-service";
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
  }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getTranslation(locale, "blog");

  return {
    title: t("title"),
    description: t("subtitle"),
    keywords: t("keywords"),
  };
}

export default async function BlogHome({
  params,
  searchParams,
}: BlogHomeProps) {
  const { locale } = await params;
  const { page = "1", tag, destination } = await searchParams;
  const { t } = await getTranslation(locale, "blog");
  const { t: tNav } = await getTranslation(locale, "navigation");

  const currentPage = parseInt(page, 10);
  const postsPerPage = 9;

  // Get blog posts based on filter parameters
  let allPosts;

  if (tag) {
    // Filter by tag
    allPosts = await getBlogPostsByTag(tag, locale);
  } else if (destination) {
    // Filter by destination
    allPosts = await getBlogPostsByDestination(destination, locale);
  } else {
    // No filter - get all posts for the locale
    allPosts = await getBlogPostsForLocale(locale);
  }

  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const posts = allPosts.slice(startIndex, startIndex + postsPerPage);

  // Dynamic page title and URL based on filters
  let pageTitle = t("title");
  let pageSubtitle = t("subtitle");
  const baseUrl = env.baseUrl;
  let blogUrl = `${baseUrl}/${locale}/blog`;

  if (tag) {
    pageTitle = t("tag.title", { tag }) || `Posts tagged with "${tag}"`;
    pageSubtitle =
      t("tag.subtitle", { tag }) ||
      `Explore all blog posts tagged with "${tag}".`;
    blogUrl = `${baseUrl}/${locale}/blog/t/${encodeURIComponent(tag)}`;
  } else if (destination) {
    pageTitle =
      t("destination.title", { destination }) || `Posts about ${destination}`;
    pageSubtitle =
      t("destination.subtitle", { destination }) ||
      `Discover travel information and guides for ${destination}.`;
    blogUrl = `${baseUrl}/${locale}/blog/d/${encodeURIComponent(destination)}`;
  }

  // Generate JSON-LD for the blog page
  const webpageJsonLd = generateWebPageJsonLd({
    name: pageTitle,
    description: pageSubtitle,
    url: blogUrl,
    isPartOf: {
      name: t("jsonld.organization.name"),
      url: baseUrl,
    },
  });

  const breadcrumbData = generateBreadcrumbData([
    { name: tNav("breadcrumb.home"), url: `${baseUrl}/${locale}` },
    { name: tNav("breadcrumb.blog"), url: blogUrl },
  ]);
  const breadcrumbJsonLd = generateBreadcrumbListJsonLd(breadcrumbData);

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

    const queryString = searchParams.toString();
    const query = queryString ? `?${queryString}` : "";

    // For tag routes, maintain the tag route structure
    if (tag) {
      return `/${locale}/blog/t/${encodeURIComponent(tag)}${query}`;
    }
    // For destination routes, use destination route structure if implemented
    if (destination) {
      return `/${locale}/blog/d/${encodeURIComponent(destination)}${query}`;
    }
    // For regular blog routes, use query parameter format: /en/blog?page=2
    return `/${locale}/blog${query}`;
  };

  if (allPosts.length === 0) {
    return (
      <StaticPageLayout>
        <div className="py-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">{pageTitle}</h1>
          <p className="text-lg text-gray-600">
            {tag
              ? `No posts found with tag "${tag}"`
              : destination
                ? `No posts found for destination "${destination}"`
                : t("empty_state")}
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
              {pageTitle}
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              {pageSubtitle}
            </p>
          </div>

          {/* Search */}
          <div className="mb-12">
            <BlogSearch allPosts={allPosts} locale={locale} />
          </div>

          <BlogPostList
            posts={posts}
            locale={locale}
            currentPage={currentPage}
            totalPages={totalPages}
            buildPaginationUrl={buildPaginationUrl}
            gridCols="3"
            showPagination={true}
          />
        </div>
      </StaticPageLayout>
    </>
  );
}
