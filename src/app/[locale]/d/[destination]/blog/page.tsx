import { type Metadata } from "next";
import { getBlogPostsByDestination } from "@/lib/services/blog-service";
import { env } from "@/lib/consts";
import { StaticPageLayout } from "@/components/static-page-layout";
import { BlogPostList } from "@/components/ui/blog-post-list";
import { getTranslation } from "@/app/i18n";
import { languages } from "@/app/i18n/settings";
import { JsonLd } from "@/components/json-ld";
import {
  generateWebPageJsonLd,
  generateBreadcrumbListJsonLd,
  generateBreadcrumbData,
} from "@/lib/json-ld";
import { BlogSearch } from "@/components/ui/blog-search";
import { getDestinationsListWithMetadata } from "@/lib/services";

// Required when use static generation with search params
export const revalidate = 86400; // Revalidate every day

export async function generateStaticParams(): Promise<
  Array<DestinationBlogProps["params"]>
> {
  // Get top 20 popular destinations for SSG
  const popularDestinations = await getDestinationsListWithMetadata(
    "en",
    20,
    "popular"
  );

  // Generate params for each popular destination in each locale
  return languages.flatMap(locale =>
    popularDestinations.map(destination =>
      Promise.resolve({
        locale,
        destination: destination.code.toLowerCase(),
      })
    )
  );
}

interface DestinationBlogProps {
  params: Promise<{ locale: string; destination: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; destination: string }>;
}): Promise<Metadata> {
  const { locale, destination } = await params;
  const { t } = await getTranslation(locale, "blog");

  const destinationName = destination.toUpperCase();

  return {
    title: `${t("title")} - ${destinationName}`,
    description: `${t("subtitle")} for ${destinationName}`,
    keywords: `${t("keywords")}, ${destinationName}, travel, visa`,
  };
}

export default async function DestinationBlog({
  params,
  searchParams,
}: DestinationBlogProps) {
  const { locale, destination } = await params;
  const { page = "1" } = await searchParams;
  const { t } = await getTranslation(locale, "blog");
  const { t: tNav } = await getTranslation(locale, "navigation");

  const currentPage = parseInt(page, 10);
  const postsPerPage = 9;

  // Get all blog posts for the locale using service layer
  const allPosts = await getBlogPostsByDestination(destination, locale);

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

    const queryString = searchParams.toString();
    const query = queryString ? `?${queryString}` : "";

    return `/${locale}/d/${destination}/blog${query}`;
  };

  if (allPosts.length === 0) {
    return (
      <StaticPageLayout>
        <div className="py-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            {t("title")} - {destinationName}
          </h1>
          <p className="text-lg text-gray-600">
            {t("empty_state", {
              destination: destinationName,
            })}
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
              {t("title")} - {destinationName}
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              {t("subtitle", { destination: destinationName })}
            </p>
          </div>

          {/* Search - scoped to destination posts */}
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
