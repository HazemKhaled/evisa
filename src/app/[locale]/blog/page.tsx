import { type Metadata } from "next";
import {
  getBlogPostsForLocalePaginated,
  getBlogPostsByTagPaginated,
  getBlogPostsByDestinationPaginated,
  getAllBlogPosts,
} from "@/lib/services/blog-service";
import { env } from "@/lib/consts";
import { generateAlternatesMetadata } from "@/lib/utils";
import { StaticPageLayout } from "@/components/static-page-layout";
import { BlogPostList } from "@/components/blog/blog-post-list";
import { BlogSearch } from "@/components/blog/blog-search";
import { getTranslation } from "@/app/i18n";
import { languages } from "@/app/i18n/settings";
import { JsonLd } from "@/components/json-ld";
import {
  generateWebPageJsonLd,
  generateBreadcrumbListJsonLd,
  generateBreadcrumbData,
} from "@/lib/json-ld";
import { PageBreadcrumb } from "@/components/ui/page-breadcrumb";

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
  const { page = "1", tag, destination } = await searchParams;
  const { t } = await getTranslation(locale, "blog");
  const { t: tNav } = await getTranslation(locale, "navigation");

  const currentPage = parseInt(page, 10);
  const postsPerPage = 9;
  const offset = (currentPage - 1) * postsPerPage;

  // Get blog posts with database-level pagination
  let paginatedResponse;

  if (tag) {
    // Filter by tag with pagination
    paginatedResponse = await getBlogPostsByTagPaginated(
      tag,
      locale,
      postsPerPage,
      offset
    );
  } else if (destination) {
    // Filter by destination with pagination
    paginatedResponse = await getBlogPostsByDestinationPaginated(
      destination,
      locale,
      postsPerPage,
      offset
    );
  } else {
    // No filter - get posts for the locale with pagination
    paginatedResponse = await getBlogPostsForLocalePaginated(
      locale,
      postsPerPage,
      offset
    );
  }

  const { posts, totalPages } = paginatedResponse;

  // Get recent posts for search functionality (limited to 100 most recent)
  const allPostsForSearch = await getAllBlogPosts(locale, 100);

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

  // Create breadcrumb items based on current page state
  let breadcrumbItems: Array<{
    label: string;
    href?: string;
    isCurrentPage?: boolean;
  }> = [
    { label: tNav("breadcrumb.home"), href: `/${locale}` },
    { label: tNav("breadcrumb.blog"), href: `/${locale}/blog` },
  ];

  if (destination) {
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

  if (posts.length === 0) {
    return (
      <>
        <JsonLd data={webpageJsonLd} />
        <JsonLd data={breadcrumbJsonLd} />
        <StaticPageLayout>
          <div className="mx-auto max-w-7xl">
            {/* Breadcrumb */}
            <PageBreadcrumb
              items={breadcrumbItems}
              locale={locale}
              className="mb-8"
            />
            <div className="py-16 text-center">
              <h1 className="mb-4 text-4xl font-bold text-gray-900">
                {pageTitle}
              </h1>
              <p className="text-lg text-gray-600">
                {tag
                  ? `No posts found with tag "${tag}"`
                  : destination
                    ? `No posts found for destination "${destination}"`
                    : t("empty_state")}
              </p>
            </div>
          </div>
        </StaticPageLayout>
      </>
    );
  }

  return (
    <>
      <JsonLd data={webpageJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <StaticPageLayout>
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <PageBreadcrumb
            items={breadcrumbItems}
            locale={locale}
            className="mb-8"
          />

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
              allPosts={allPostsForSearch}
              locale={locale}
              searchPlaceholder={t("search.placeholder")}
            />
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
