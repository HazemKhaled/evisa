import { useTranslations } from "next-intl";
import { Header } from "@/components/layout/Header";

export default function ArticlesPage() {
  const t = useTranslations("Navigation");

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">{t("articles")}</h1>
          <p className="text-xl text-gray-600 mb-12">
            Travel guides, visa tips, and destination insights to help you plan your journey.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Sample articles - will be replaced with dynamic data later */}
            {[
              {
                title: "Complete Guide to UAE Visa Requirements",
                excerpt:
                  "Everything you need to know about getting a visa for the United Arab Emirates.",
                image: "🇦🇪",
                date: "2024-01-15",
              },
              {
                title: "Travel Tips for First-Time Visa Applicants",
                excerpt:
                  "Essential tips and common mistakes to avoid when applying for your first visa.",
                image: "✈️",
                date: "2024-01-10",
              },
              {
                title: "Understanding Schengen Visa Requirements",
                excerpt: "Navigate the European Schengen area with our comprehensive visa guide.",
                image: "🇪🇺",
                date: "2024-01-05",
              },
            ].map((article, index) => (
              <article
                key={index}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 overflow-hidden"
              >
                <div className="p-6">
                  <div className="text-4xl mb-4 text-center">{article.image}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{article.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{article.date}</span>
                    <button className="text-primary hover:text-primary-dark font-medium">
                      Read More →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
