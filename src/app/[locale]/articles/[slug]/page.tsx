import { getTranslations, getLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { getDatabase, schema } from "@/lib/db";
import { fallbackArticles } from "@/lib/db/fallback";
import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

// Make this page dynamic
export const dynamic = "force-dynamic";

async function getArticle(slug: string) {
  try {
    const db = await getDatabase();

    if (!db) {
      // Use fallback data in development
      return fallbackArticles.find((a) => a.slug === slug) || null;
    }

    const article = await db
      .select({
        id: schema.articles.id,
        title: schema.articles.title,
        titleAr: schema.articles.titleAr,
        content: schema.articles.content,
        contentAr: schema.articles.contentAr,
        featuredImage: schema.articles.featuredImage,
        author: schema.articles.author,
        publishedAt: schema.articles.publishedAt,
        destinationName: schema.destinations.name,
        destinationNameAr: schema.destinations.nameAr,
        destinationFlag: schema.destinations.flag,
      })
      .from(schema.articles)
      .innerJoin(schema.destinations, eq(schema.articles.destinationId, schema.destinations.id))
      .where(eq(schema.articles.slug, slug))
      .get();

    return article;
  } catch (error) {
    // If database queries fail, use fallback data
    console.warn("Database query failed, using fallback data:", error);
    return fallbackArticles.find((a) => a.slug === slug) || null;
  }
}

interface ArticlePageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const t = await getTranslations("Navigation");
  const locale = await getLocale();
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString(locale === "ar" ? "ar-AE" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <article className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-gray-500">
            <span>{t("articles")}</span>
            <span className="mx-2">/</span>
            <span>
              {locale === "ar" && article.destinationNameAr
                ? article.destinationNameAr
                : article.destinationName}
            </span>
          </nav>

          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3 rtl:ml-3 rtl:mr-0">{article.destinationFlag}</span>
              <span className="text-sm text-gray-500">
                {locale === "ar" && article.destinationNameAr
                  ? article.destinationNameAr
                  : article.destinationName}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {locale === "ar" && article.titleAr ? article.titleAr : article.title}
            </h1>

            <div className="flex items-center text-gray-500 text-sm">
              <time>{formatDate(article.publishedAt)}</time>
              {article.author && (
                <>
                  <span className="mx-2">•</span>
                  <span>By {article.author}</span>
                </>
              )}
            </div>
          </header>

          {/* Featured Image */}
          {article.featuredImage && (
            <div className="mb-8">
              <Image
                src={article.featuredImage}
                alt={locale === "ar" && article.titleAr ? article.titleAr : article.title}
                width={800}
                height={400}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose max-w-none">
            <div
              dangerouslySetInnerHTML={{
                __html: locale === "ar" && article.contentAr ? article.contentAr : article.content,
              }}
            />
          </div>
        </article>
      </main>
    </>
  );
}
