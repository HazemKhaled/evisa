import { type Metadata } from "next";
import { StaticPageLayout } from "@/components/static-page-layout";
import { getTranslation } from "@/app/i18n";
import { generateAlternatesMetadata } from "@/lib/utils";
import { env } from "@/lib/consts";
import { JsonLd } from "@/components/json-ld";
import {
  generateWebPageJsonLd,
  generateBreadcrumbListJsonLd,
  generateBreadcrumbData,
} from "@/lib/json-ld";

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getTranslation(locale, "pages");
  const alternates = generateAlternatesMetadata(env.baseUrl, "privacy", locale);

  return {
    title: t("privacy.title"),
    description: t("privacy.subtitle"),
    alternates,
    openGraph: {
      url: alternates.canonical,
    },
  };
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  const { t } = await getTranslation(locale, "pages");
  const { t: tNav } = await getTranslation(locale, "navigation");

  const baseUrl = env.baseUrl;
  const privacyUrl = `${baseUrl}/${locale}/privacy`;

  // Generate JSON-LD for the privacy page
  const webpageJsonLd = generateWebPageJsonLd({
    name: t("privacy.title"),
    description: t("privacy.subtitle"),
    url: privacyUrl,
    isPartOf: {
      name: t("jsonld.organization.name"),
      url: baseUrl,
    },
  });

  const breadcrumbData = generateBreadcrumbData([
    { name: tNav("breadcrumb.home"), url: `${baseUrl}/${locale}` },
    { name: tNav("breadcrumb.privacy"), url: privacyUrl },
  ]);
  const breadcrumbJsonLd = generateBreadcrumbListJsonLd(breadcrumbData);

  return (
    <>
      <JsonLd data={webpageJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <StaticPageLayout>
        <div className="space-y-12">
          <header>
            <h1 className="mb-8 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {t("privacy.title")}
            </h1>
            <p className="text-xl leading-relaxed text-gray-600">
              {t("privacy.subtitle")}
            </p>
            <p className="mt-4 text-sm text-gray-500">
              {t("privacy.lastUpdated")}
            </p>
          </header>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {t("privacy.dataCollection.title")}
              </h2>
              <p className="mb-4 text-gray-600">
                {t("privacy.dataCollection.description")}
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>{t("privacy.dataCollection.item1")}</li>
                <li>{t("privacy.dataCollection.item2")}</li>
                <li>{t("privacy.dataCollection.item3")}</li>
                <li>{t("privacy.dataCollection.item4")}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {t("privacy.dataUsage.title")}
              </h2>
              <p className="mb-4 text-gray-600">
                {t("privacy.dataUsage.description")}
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>{t("privacy.dataUsage.item1")}</li>
                <li>{t("privacy.dataUsage.item2")}</li>
                <li>{t("privacy.dataUsage.item3")}</li>
                <li>{t("privacy.dataUsage.item4")}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {t("privacy.cookies.title")}
              </h2>
              <p className="mb-4 text-gray-600">
                {t("privacy.cookies.description")}
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {t("privacy.cookies.essential.title")}
                  </h3>
                  <p className="text-gray-600">
                    {t("privacy.cookies.essential.description")}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {t("privacy.cookies.analytics.title")}
                  </h3>
                  <p className="text-gray-600">
                    {t("privacy.cookies.analytics.description")}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {t("privacy.cookies.marketing.title")}
                  </h3>
                  <p className="text-gray-600">
                    {t("privacy.cookies.marketing.description")}
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {t("privacy.userRights.title")}
              </h2>
              <p className="mb-4 text-gray-600">
                {t("privacy.userRights.description")}
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>{t("privacy.userRights.item1")}</li>
                <li>{t("privacy.userRights.item2")}</li>
                <li>{t("privacy.userRights.item3")}</li>
                <li>{t("privacy.userRights.item4")}</li>
                <li>{t("privacy.userRights.item5")}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {t("privacy.gdprCompliance.title")}
              </h2>
              <p className="mb-4 text-gray-600">
                {t("privacy.gdprCompliance.description")}
              </p>
              <div className="rounded-lg bg-blue-50 p-6">
                <h3 className="mb-2 text-lg font-semibold text-blue-900">
                  {t("privacy.gdprCompliance.legalBasis.title")}
                </h3>
                <p className="text-blue-800">
                  {t("privacy.gdprCompliance.legalBasis.description")}
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {t("privacy.dataSharing.title")}
              </h2>
              <p className="mb-4 text-gray-600">
                {t("privacy.dataSharing.description")}
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>{t("privacy.dataSharing.item1")}</li>
                <li>{t("privacy.dataSharing.item2")}</li>
                <li>{t("privacy.dataSharing.item3")}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {t("privacy.security.title")}
              </h2>
              <p className="text-gray-600">
                {t("privacy.security.description")}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {t("privacy.changes.title")}
              </h2>
              <p className="text-gray-600">
                {t("privacy.changes.description")}
              </p>
            </section>

            <section className="rounded-lg bg-gray-50 p-6">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {t("privacy.contact.title")}
              </h2>
              <p className="mb-4 text-gray-600">
                {t("privacy.contact.description")}
              </p>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <strong>{t("privacy.contact.email")}:</strong>{" "}
                  {t("privacy.contact.emailAddress")}
                </p>
                <p className="text-gray-600">
                  <strong>{t("privacy.contact.address")}:</strong>{" "}
                  {t("privacy.contact.addressValue")}
                </p>
              </div>
            </section>
          </div>
        </div>
      </StaticPageLayout>
    </>
  );
}
