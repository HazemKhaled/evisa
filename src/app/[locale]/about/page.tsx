import { Metadata } from "next";
import { StaticPageLayout } from "@/components/static-page-layout";
import { getTranslation } from "@/app/i18n";
import { cn, isRTL } from "@/lib/utils";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getTranslation(locale, "pages");
  
  return {
    title: t("about.title"),
    description: t("about.mission.description"),
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const { t } = await getTranslation(locale, "pages");
  const isCurrentRTL = isRTL(locale);

  return (
    <StaticPageLayout locale={locale}>
      <div className={cn("space-y-12", isCurrentRTL && "text-right")}>
        <header>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-8">
            {t("about.title")}
          </h1>
        </header>
        
        <section>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
            {t("about.mission.title")}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {t("about.mission.description")}
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
            {t("about.solution.title")}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-900 mb-3">
                {t("about.solution.centralized_title")}
              </h3>
              <p className="text-blue-800">{t("about.solution.centralized_description")}</p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-900 mb-3">
                {t("about.solution.rapid_title")}
              </h3>
              <p className="text-green-800">{t("about.solution.rapid_description")}</p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-900 mb-3">
                {t("about.solution.catalog_title")}
              </h3>
              <p className="text-purple-800">{t("about.solution.catalog_description")}</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
            {t("about.objectives.title")}
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <span className="ml-3 text-lg text-gray-600">{t("about.objectives.help_travelers")}</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <span className="ml-3 text-lg text-gray-600">{t("about.objectives.simplify_process")}</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <span className="ml-3 text-lg text-gray-600">{t("about.objectives.provide_information")}</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <span className="ml-3 text-lg text-gray-600">{t("about.objectives.connect_services")}</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
            {t("about.why_choose.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">⚡</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">{t("about.why_choose.speed")}</h3>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">🛡️</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">{t("about.why_choose.trust")}</h3>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">🌍</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">{t("about.why_choose.global")}</h3>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">🎯</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">{t("about.why_choose.support")}</h3>
              </div>
            </div>
          </div>
        </section>
      </div>
    </StaticPageLayout>
  );
}