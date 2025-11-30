import { type Metadata } from "next";

import { getTranslation } from "@/app/i18n";
import { JsonLd } from "@/components/json-ld";
import { StaticPageLayout } from "@/components/static-page-layout";
import { PageBreadcrumb } from "@/components/ui/page-breadcrumb";
import { env } from "@/lib/consts";
import {
  generateBreadcrumbData,
  generateBreadcrumbListJsonLd,
  generateWebPageJsonLd,
} from "@/lib/json-ld";
import { generateAlternatesMetadata } from "@/lib/utils";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getTranslation(locale, "pages");
  const alternates = generateAlternatesMetadata(env.baseUrl, "about", locale);

  return {
    title: t("about.title"),
    description: t("about.subtitle"),
    alternates,
    openGraph: {
      url: alternates.canonical,
    },
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const { t } = await getTranslation(locale, "pages");
  const { t: tNav } = await getTranslation(locale, "navigation");

  const baseUrl = env.baseUrl;
  const aboutUrl = `${baseUrl}/${locale}/about`;

  // Generate JSON-LD for the about page
  const webpageJsonLd = generateWebPageJsonLd({
    name: t("about.title"),
    description: t("about.subtitle"),
    url: aboutUrl,
    isPartOf: {
      name: t("jsonld.organization.name"),
      url: baseUrl,
    },
  });

  const breadcrumbData = generateBreadcrumbData([
    { name: tNav("breadcrumb.home"), url: `${baseUrl}/${locale}` },
    { name: tNav("breadcrumb.about"), url: aboutUrl },
  ]);
  const breadcrumbJsonLd = generateBreadcrumbListJsonLd(breadcrumbData);

  return (
    <>
      <JsonLd data={webpageJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <StaticPageLayout>
        <div className="space-y-12">
          {/* Breadcrumb */}
          <PageBreadcrumb
            items={[
              { label: tNav("breadcrumb.home"), href: `/${locale}` },
              { label: tNav("breadcrumb.about"), isCurrentPage: true },
            ]}
            locale={locale}
          />

          <header>
            <h1 className="mb-8 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {t("about.title")}
            </h1>
            <p className="text-xl leading-relaxed text-gray-600">
              {t("about.subtitle")}
            </p>
          </header>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {t("about.mission.title")}
              </h2>
              <p className="text-gray-600">{t("about.mission.description")}</p>
            </section>

            <section className="mb-8">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                {t("about.solution.title")}
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 text-xl font-medium text-gray-700">
                    {t("about.solution.documentCenter.title")}
                  </h3>
                  <p className="text-gray-600">
                    {t("about.solution.documentCenter.description")}
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-xl font-medium text-gray-700">
                    {t("about.solution.rapidApply.title")}
                  </h3>
                  <p className="text-gray-600">
                    {t("about.solution.rapidApply.description")}
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-xl font-medium text-gray-700">
                    {t("about.solution.visaCatalog.title")}
                  </h3>
                  <p className="text-gray-600">
                    {t("about.solution.visaCatalog.description")}
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {t("about.objectives.title")}
              </h2>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2 text-blue-500">•</span>
                  {t("about.objectives.item1")}
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-blue-500">•</span>
                  {t("about.objectives.item2")}
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-blue-500">•</span>
                  {t("about.objectives.item3")}
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {t("about.whyChooseUs.title")}
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg bg-blue-50 p-6">
                  <h3 className="mb-2 text-lg font-medium text-blue-900">
                    {t("about.whyChooseUs.expertise.title")}
                  </h3>
                  <p className="text-blue-700">
                    {t("about.whyChooseUs.expertise.description")}
                  </p>
                </div>

                <div className="rounded-lg bg-green-50 p-6">
                  <h3 className="mb-2 text-lg font-medium text-green-900">
                    {t("about.whyChooseUs.speed.title")}
                  </h3>
                  <p className="text-green-700">
                    {t("about.whyChooseUs.speed.description")}
                  </p>
                </div>

                <div className="rounded-lg bg-purple-50 p-6">
                  <h3 className="mb-2 text-lg font-medium text-purple-900">
                    {t("about.whyChooseUs.global.title")}
                  </h3>
                  <p className="text-purple-700">
                    {t("about.whyChooseUs.global.description")}
                  </p>
                </div>

                <div className="rounded-lg bg-orange-50 p-6">
                  <h3 className="mb-2 text-lg font-medium text-orange-900">
                    {t("about.whyChooseUs.trust.title")}
                  </h3>
                  <p className="text-orange-700">
                    {t("about.whyChooseUs.trust.description")}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </StaticPageLayout>
    </>
  );
}
