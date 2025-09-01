import { Metadata } from "next";
import { StaticPageLayout } from "@/components/static-page-layout";
import { getTranslation } from "@/app/i18n";
import { cn, isRTL } from "@/lib/utils";

interface TermsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: TermsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getTranslation(locale, "pages");
  
  return {
    title: t("terms.title"),
    description: t("terms.intro"),
  };
}

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale } = await params;
  const { t } = await getTranslation(locale, "pages");
  const isCurrentRTL = isRTL(locale);

  return (
    <StaticPageLayout locale={locale}>
      <div className={cn("space-y-8", isCurrentRTL && "text-right")}>
        <header>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
            {t("terms.title")}
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            {t("terms.last_updated")}
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            {t("terms.intro")}
          </p>
        </header>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t("terms.acceptance.title")}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {t("terms.acceptance.description")}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t("terms.services.title")}
          </h2>
          <div className="space-y-4">
            <p className="text-gray-600 leading-relaxed">
              {t("terms.services.description")}
            </p>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <strong>Important:</strong> {t("terms.services.information_only")}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">
              {t("terms.services.accuracy")}
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t("terms.user_responsibilities.title")}
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-white text-xs">•</span>
              </span>
              <span className="text-gray-600">{t("terms.user_responsibilities.accurate_info")}</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-white text-xs">•</span>
              </span>
              <span className="text-gray-600">{t("terms.user_responsibilities.compliance")}</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-white text-xs">•</span>
              </span>
              <span className="text-gray-600">{t("terms.user_responsibilities.verification")}</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-white text-xs">•</span>
              </span>
              <span className="text-gray-600">{t("terms.user_responsibilities.prohibited_use")}</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t("terms.disclaimers.title")}
          </h2>
          <div className="bg-red-50 border-l-4 border-red-400 p-6 space-y-3">
            <div className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-white text-xs">!</span>
              </span>
              <span className="text-red-800">{t("terms.disclaimers.no_guarantee")}</span>
            </div>
            <div className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-white text-xs">!</span>
              </span>
              <span className="text-red-800">{t("terms.disclaimers.third_party")}</span>
            </div>
            <div className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-white text-xs">!</span>
              </span>
              <span className="text-red-800">{t("terms.disclaimers.changes")}</span>
            </div>
            <div className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-white text-xs">!</span>
              </span>
              <span className="text-red-800">{t("terms.disclaimers.liability")}</span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t("terms.intellectual_property.title")}
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-white text-xs">©</span>
              </span>
              <span className="text-gray-600">{t("terms.intellectual_property.ownership")}</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-white text-xs">©</span>
              </span>
              <span className="text-gray-600">{t("terms.intellectual_property.restrictions")}</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-white text-xs">©</span>
              </span>
              <span className="text-gray-600">{t("terms.intellectual_property.trademarks")}</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t("terms.limitation_liability.title")}
          </h2>
          <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
            <p className="text-orange-800 leading-relaxed">
              {t("terms.limitation_liability.description")}
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t("terms.governing_law.title")}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {t("terms.governing_law.description")}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t("terms.changes_terms.title")}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {t("terms.changes_terms.description")}
          </p>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            {t("terms.contact_terms.title")}
          </h2>
          <p className="text-blue-800 leading-relaxed">
            {t("terms.contact_terms.description")}
          </p>
        </section>
      </div>
    </StaticPageLayout>
  );
}