import { Metadata } from "next";
import { StaticPageLayout } from "@/components/static-page-layout";
import { getTranslation } from "@/app/i18n";
import { cn, isRTL } from "@/lib/utils";

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getTranslation(locale, "pages");
  
  return {
    title: t("privacy.title"),
    description: t("privacy.intro"),
  };
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  const { t } = await getTranslation(locale, "pages");
  const isCurrentRTL = isRTL(locale);

  return (
    <StaticPageLayout locale={locale}>
      <div className={cn("space-y-8", isCurrentRTL && "text-right")}>
        <header>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
            {t("privacy.title")}
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            {t("privacy.last_updated")}
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            {t("privacy.intro")}
          </p>
        </header>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t("privacy.information_collection.title")}
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t("privacy.information_collection.personal_title")}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t("privacy.information_collection.personal_description")}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t("privacy.information_collection.usage_title")}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t("privacy.information_collection.usage_description")}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t("privacy.information_collection.cookies_title")}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t("privacy.information_collection.cookies_description")}
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t("privacy.information_use.title")}
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-white text-xs">•</span>
              </span>
              <span className="text-gray-600">{t("privacy.information_use.provide_services")}</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-white text-xs">•</span>
              </span>
              <span className="text-gray-600">{t("privacy.information_use.communicate")}</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-white text-xs">•</span>
              </span>
              <span className="text-gray-600">{t("privacy.information_use.improve_services")}</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-white text-xs">•</span>
              </span>
              <span className="text-gray-600">{t("privacy.information_use.marketing")}</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-white text-xs">•</span>
              </span>
              <span className="text-gray-600">{t("privacy.information_use.legal_compliance")}</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t("privacy.information_sharing.title")}
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-white text-xs">•</span>
              </span>
              <span className="text-gray-600">{t("privacy.information_sharing.service_providers")}</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-white text-xs">•</span>
              </span>
              <span className="text-gray-600">{t("privacy.information_sharing.legal_requirements")}</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-white text-xs">•</span>
              </span>
              <span className="text-gray-600">{t("privacy.information_sharing.business_transfers")}</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-white text-xs">•</span>
              </span>
              <span className="text-gray-600">{t("privacy.information_sharing.consent")}</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t("privacy.data_security.title")}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {t("privacy.data_security.description")}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t("privacy.your_rights.title")}
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-white text-xs">✓</span>
              </span>
              <span className="text-gray-600">{t("privacy.your_rights.access")}</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-white text-xs">✓</span>
              </span>
              <span className="text-gray-600">{t("privacy.your_rights.correction")}</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-white text-xs">✓</span>
              </span>
              <span className="text-gray-600">{t("privacy.your_rights.deletion")}</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-white text-xs">✓</span>
              </span>
              <span className="text-gray-600">{t("privacy.your_rights.portability")}</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-white text-xs">✓</span>
              </span>
              <span className="text-gray-600">{t("privacy.your_rights.objection")}</span>
            </li>
          </ul>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            {t("privacy.contact_privacy.title")}
          </h2>
          <p className="text-blue-800 leading-relaxed">
            {t("privacy.contact_privacy.description")}
          </p>
        </section>
      </div>
    </StaticPageLayout>
  );
}