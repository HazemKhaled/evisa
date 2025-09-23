import { type Metadata } from "next";
import { StaticPageLayout } from "@/components/static-page-layout";
import { getTranslation } from "@/app/i18n";
import { cn, generateAlternatesMetadata } from "@/lib/utils";
import { languages } from "@/app/i18n/settings";
import { env } from "@/lib/consts";
import { JsonLd } from "@/components/json-ld";
import {
  generateWebPageJsonLd,
  generateBreadcrumbListJsonLd,
  generateBreadcrumbData,
} from "@/lib/json-ld";

interface TermsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: TermsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getTranslation(locale, "pages");
  const alternates = generateAlternatesMetadata(
    env.baseUrl,
    "terms",
    locale,
    languages
  );

  return {
    title: t("terms.title"),
    description: t("terms.subtitle"),
    alternates,
    openGraph: {
      url: alternates.canonical,
    },
  };
}

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale } = await params;
  const { t } = await getTranslation(locale, "pages");
  const { t: tNav } = await getTranslation(locale, "navigation");

  const baseUrl = env.baseUrl;
  const termsUrl = `${baseUrl}/${locale}/terms`;

  // Generate JSON-LD for the terms page
  const webpageJsonLd = generateWebPageJsonLd({
    name: t("terms.title"),
    description: t("terms.subtitle"),
    url: termsUrl,
    isPartOf: {
      name: t("jsonld.organization.name"),
      url: baseUrl,
    },
  });

  const breadcrumbData = generateBreadcrumbData([
    { name: tNav("breadcrumb.home"), url: `${baseUrl}/${locale}` },
    { name: tNav("breadcrumb.terms"), url: termsUrl },
  ]);
  const breadcrumbJsonLd = generateBreadcrumbListJsonLd(breadcrumbData);

  return (
    <>
      <JsonLd data={webpageJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <StaticPageLayout>
        <div className={cn("space-y-12")}>
          <header>
            <h1 className="mb-8 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {t("terms.title")}
            </h1>
            <p className="text-xl leading-relaxed text-gray-600">
              {t("terms.subtitle")}
            </p>
            <p className="mt-4 text-sm text-gray-500">
              {t("terms.lastUpdated")}
            </p>
          </header>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {t("terms.acceptance.title")}
              </h2>
              <p className="text-gray-600">
                {t("terms.acceptance.description")}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {t("terms.services.title")}
              </h2>
              <p className="mb-4 text-gray-600">
                {t("terms.services.description")}
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>{t("terms.services.item1")}</li>
                <li>{t("terms.services.item2")}</li>
                <li>{t("terms.services.item3")}</li>
                <li>{t("terms.services.item4")}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {t("terms.userResponsibilities.title")}
              </h2>
              <p className="mb-4 text-gray-600">
                {t("terms.userResponsibilities.description")}
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>{t("terms.userResponsibilities.item1")}</li>
                <li>{t("terms.userResponsibilities.item2")}</li>
                <li>{t("terms.userResponsibilities.item3")}</li>
                <li>{t("terms.userResponsibilities.item4")}</li>
                <li>{t("terms.userResponsibilities.item5")}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {t("terms.acceptableUse.title")}
              </h2>
              <p className="mb-4 text-gray-600">
                {t("terms.acceptableUse.description")}
              </p>
              <div className="rounded-lg bg-red-50 p-6">
                <h3 className="mb-2 text-lg font-semibold text-red-900">
                  {t("terms.acceptableUse.prohibited.title")}
                </h3>
                <ul className="space-y-1 text-red-800">
                  <li>{t("terms.acceptableUse.prohibited.item1")}</li>
                  <li>{t("terms.acceptableUse.prohibited.item2")}</li>
                  <li>{t("terms.acceptableUse.prohibited.item3")}</li>
                  <li>{t("terms.acceptableUse.prohibited.item4")}</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {t("terms.intellectualProperty.title")}
              </h2>
              <p className="mb-4 text-gray-600">
                {t("terms.intellectualProperty.description")}
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {t("terms.intellectualProperty.ownership.title")}
                  </h3>
                  <p className="text-gray-600">
                    {t("terms.intellectualProperty.ownership.description")}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {t("terms.intellectualProperty.license.title")}
                  </h3>
                  <p className="text-gray-600">
                    {t("terms.intellectualProperty.license.description")}
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {t("terms.disclaimers.title")}
              </h2>
              <div className="rounded-lg bg-yellow-50 p-6">
                <p className="mb-4 text-yellow-800">
                  {t("terms.disclaimers.description")}
                </p>
                <ul className="space-y-2 text-yellow-800">
                  <li>{t("terms.disclaimers.item1")}</li>
                  <li>{t("terms.disclaimers.item2")}</li>
                  <li>{t("terms.disclaimers.item3")}</li>
                  <li>{t("terms.disclaimers.item4")}</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {t("terms.limitation.title")}
              </h2>
              <p className="text-gray-600">
                {t("terms.limitation.description")}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {t("terms.indemnification.title")}
              </h2>
              <p className="text-gray-600">
                {t("terms.indemnification.description")}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {t("terms.termination.title")}
              </h2>
              <p className="mb-4 text-gray-600">
                {t("terms.termination.description")}
              </p>
              <div className="space-y-2">
                <p className="text-gray-600">{t("terms.termination.item1")}</p>
                <p className="text-gray-600">{t("terms.termination.item2")}</p>
                <p className="text-gray-600">{t("terms.termination.item3")}</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {t("terms.governingLaw.title")}
              </h2>
              <p className="text-gray-600">
                {t("terms.governingLaw.description")}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {t("terms.changes.title")}
              </h2>
              <p className="text-gray-600">{t("terms.changes.description")}</p>
            </section>

            <section className="rounded-lg bg-blue-50 p-6">
              <h2 className="mb-4 text-2xl font-bold text-blue-900">
                {t("terms.contact.title")}
              </h2>
              <p className="mb-4 text-blue-800">
                {t("terms.contact.description")}
              </p>
              <div className="space-y-2">
                <p className="text-blue-800">
                  <strong>{t("terms.contact.email")}:</strong>{" "}
                  {t("terms.contact.emailAddress")}
                </p>
                <p className="text-blue-800">
                  <strong>{t("terms.contact.address")}:</strong>{" "}
                  {t("terms.contact.addressValue")}
                </p>
              </div>
            </section>
          </div>
        </div>
      </StaticPageLayout>
    </>
  );
}
