import { getTranslations, getLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { getDatabase, schema } from "@/lib/db";
import { fallbackArticles } from "@/lib/db/fallback";
import { Link } from "@/i18n/routing";
import { Card } from "@/components/ui/Card";
import { eq } from "drizzle-orm";
import Image from "next/image";

// Make this page dynamic
export const dynamic = "force-dynamic";

async function getPublishedArticles() {
  try {
    const db = await getDatabase();

    if (!db) {
      // Use fallback data in development
      return fallbackArticles.filter((a) => a.isPublished);
    }

    return await db
      .select({
        id: schema.articles.id,
        title: schema.articles.title,
        titleAr: schema.articles.titleAr,
        slug: schema.articles.slug,
        excerpt: schema.articles.excerpt,
        excerptAr: schema.articles.excerptAr,
        featuredImage: schema.articles.featuredImage,
        author: schema.articles.author,
        publishedAt: schema.articles.publishedAt,
        destinationName: schema.destinations.name,
        destinationNameAr: schema.destinations.nameAr,
        destinationFlag: schema.destinations.flag,
      })
      .from(schema.articles)
      .innerJoin(schema.destinations, eq(schema.articles.destinationId, schema.destinations.id))
      .where(eq(schema.articles.isPublished, true))
      .orderBy(schema.articles.publishedAt);
  } catch (error) {
    // If database queries fail, use fallback data
    console.warn("Database query failed, using fallback data:", error);
    return fallbackArticles.filter((a) => a.isPublished);
  }
}

export default async function ArticlesPage() {
  const t = await getTranslations("Navigation");
  const locale = await getLocale();
  const articles = await getPublishedArticles();

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
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">{t("articles")}</h1>
          <p className="text-xl text-gray-600 mb-12">
            Travel guides, visa tips, and destination insights to help you plan your journey.
          </p>

          {articles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No articles available at the moment.</p>
              <p className="text-gray-400 mt-2">Check back soon for travel guides and visa tips!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <Card
                  key={article.id}
                  className="hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <Link href={{ pathname: "/articles/[slug]", params: { slug: article.slug } }}>
                    {article.featuredImage && (
                      <div className="h-48 overflow-hidden">
                        <Image
                          src={article.featuredImage}
                          alt={locale === "ar" && article.titleAr ? article.titleAr : article.title}
                          width={400}
                          height={200}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <span className="text-lg mr-2 rtl:ml-2 rtl:mr-0">
                          {article.destinationFlag}
                        </span>
                        <span className="text-sm text-gray-500">
                          {locale === "ar" && article.destinationNameAr
                            ? article.destinationNameAr
                            : article.destinationName}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                        {locale === "ar" && article.titleAr ? article.titleAr : article.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {locale === "ar" && article.excerptAr ? article.excerptAr : article.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          <p>{formatDate(article.publishedAt)}</p>
                          {article.author && <p className="mt-1">By {article.author}</p>}
                        </div>
                        <span className="text-primary hover:text-primary-dark font-medium">
                          Read More →
                        </span>
                      </div>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
