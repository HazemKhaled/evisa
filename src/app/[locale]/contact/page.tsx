import { Metadata } from "next";
import { StaticPageLayout } from "@/components/static-page-layout";
import { getTranslation } from "@/app/i18n";
import { cn } from "@/lib/utils";
import { getBaseUrl } from "@/lib/utils/urls";
import { JsonLd } from "@/components/json-ld";
import {
  generateWebPageJsonLd,
  generateBreadcrumbListJsonLd,
  generateFAQJsonLd,
  generateBreadcrumbData,
} from "@/lib/json-ld";

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getTranslation(locale, "pages");

  return {
    title: t("contact.title"),
    description: t("contact.subtitle"),
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const { t } = await getTranslation(locale, "pages");
  const { t: tNav } = await getTranslation(locale, "navigation");

  const baseUrl = getBaseUrl();
  const contactUrl = `${baseUrl}/${locale}/contact`;

  // Generate JSON-LD for the contact page
  const webpageJsonLd = generateWebPageJsonLd({
    name: t("contact.title"),
    description: t("contact.subtitle"),
    url: contactUrl,
    isPartOf: {
      name: t("jsonld.organization.name"),
      url: baseUrl,
    },
  });

  const breadcrumbData = generateBreadcrumbData(
    [
      { name: tNav("breadcrumb.home"), url: `${baseUrl}/${locale}` },
      { name: tNav("breadcrumb.contact"), url: contactUrl },
    ],
    tNav
  );
  const breadcrumbJsonLd = generateBreadcrumbListJsonLd(breadcrumbData);

  const faqJsonLd = generateFAQJsonLd([
    {
      question: t("contact.questions.title"),
      answer: t("contact.questions.description"),
    },
    {
      question: t("contact.partnerships.title"),
      answer: t("contact.partnerships.description"),
    },
  ]);

  return (
    <>
      <JsonLd data={webpageJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
      <StaticPageLayout>
        <div className={cn("space-y-12")}>
          <header>
            <h1 className="mb-8 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {t("contact.title")}
            </h1>
            <p className="text-xl leading-relaxed text-gray-600">
              {t("contact.subtitle")}
            </p>
          </header>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                {t("contact.form.title")}
              </h2>
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    {t("contact.form.name_label")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder={t("contact.form.name_placeholder")}
                    className="w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    {t("contact.form.email_label")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder={t("contact.form.email_placeholder")}
                    className="w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    {t("contact.form.phone_label")}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder={t("contact.form.phone_placeholder")}
                    className="w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="reason"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    {t("contact.form.reason_label")}
                  </label>
                  <select
                    id="reason"
                    name="reason"
                    className="w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="question">
                      {t("contact.form.reason_question")}
                    </option>
                    <option value="partnership">
                      {t("contact.form.reason_partnership")}
                    </option>
                    <option value="other">
                      {t("contact.form.reason_other")}
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    {t("contact.form.subject_label")}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder={t("contact.form.subject_placeholder")}
                    className="w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    {t("contact.form.message_label")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder={t("contact.form.message_placeholder")}
                    className="w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-md bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {t("contact.form.submit")}
                </button>
              </form>
            </section>

            {/* Contact Information */}
            <section className="space-y-8">
              <div>
                <h2 className="mb-6 text-2xl font-bold text-gray-900">
                  {t("contact.info.title")}
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                      <span className="text-lg text-blue-600">📧</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <a
                        href={`mailto:${t("contact.info.email")}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {t("contact.info.email")}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                      <span className="text-lg text-blue-600">📞</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <a
                        href={`tel:${t("contact.info.phone")}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {t("contact.info.phone")}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                      <span className="text-lg text-blue-600">📍</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Address</p>
                      <p className="text-gray-600">
                        {t("contact.info.address")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                      <span className="text-lg text-blue-600">🕒</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Hours</p>
                      <p className="text-gray-600">{t("contact.info.hours")}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Questions Section */}
              <div className="rounded-lg bg-blue-50 p-6">
                <h3 className="mb-3 text-lg font-semibold text-blue-900">
                  {t("contact.questions.title")}
                </h3>
                <p className="text-blue-800">
                  {t("contact.questions.description")}
                </p>
              </div>

              {/* Partnerships Section */}
              <div className="rounded-lg bg-green-50 p-6">
                <h3 className="mb-3 text-lg font-semibold text-green-900">
                  {t("contact.partnerships.title")}
                </h3>
                <p className="text-green-800">
                  {t("contact.partnerships.description")}
                </p>
              </div>
            </section>
          </div>
        </div>
      </StaticPageLayout>
    </>
  );
}
