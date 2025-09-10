import { type Metadata } from "next";
import { getBlogPostsForLocale } from "@/lib/services/blog-service";
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

interface BlogHomeProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
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
  const { page = "1" } = await searchParams;
  const { t } = await getTranslation(locale, "blog");
  const { t: tNav } = await getTranslation(locale, "navigation");

  const currentPage = parseInt(page, 10);
  const postsPerPage = 9;

  // Get all blog posts for the locale using service layer
  const allPosts = getBlogPostsForLocale(locale);

  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const posts = allPosts.slice(startIndex, startIndex + postsPerPage);

  const baseUrl = env.baseUrl;
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

  const breadcrumbData = generateBreadcrumbData([
    { name: tNav("breadcrumb.home"), url: `${baseUrl}/${locale}` },
    { name: tNav("breadcrumb.blog"), url: blogUrl },
  ]);
  const breadcrumbJsonLd = generateBreadcrumbListJsonLd(breadcrumbData);

  // Helper function to build pagination URLs with query parameters
  const buildPaginationUrl = (page: number): string => {
    const searchParams = new URLSearchParams();
    searchParams.set("page", page.toString());

    const queryString = searchParams.toString();
    const query = queryString ? `?${queryString}` : "";

    // For regular blog routes, use query parameter format: /en/blog?page=2
    return `/${locale}/blog${query}`;
  };

  if (allPosts.length === 0) {
    return (
      <StaticPageLayout>
        <div className="py-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            {t("title")}
          </h1>
          <p className="text-lg text-gray-600">{t("empty_state")}</p>
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
              {t("title")}
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              {t("subtitle")}
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
