import { Metadata } from "next";
import { StaticPageLayout } from "@/components/static-page-layout";
import { getTranslation } from "@/app/i18n";
import { cn, isRTL } from "@/lib/utils";

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
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
  const isCurrentRTL = isRTL(locale);

  return (
    <StaticPageLayout locale={locale}>
      <div className={cn("space-y-12", isCurrentRTL && "text-right")}>
        <header>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-8">
            {t("contact.title")}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {t("contact.subtitle")}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t("contact.form.title")}
            </h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {t("contact.form.name_label")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder={t("contact.form.name_placeholder")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t("contact.form.email_label")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={t("contact.form.email_placeholder")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  {t("contact.form.phone_label")}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder={t("contact.form.phone_placeholder")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                  {t("contact.form.reason_label")}
                </label>
                <select
                  id="reason"
                  name="reason"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="question">{t("contact.form.reason_question")}</option>
                  <option value="partnership">{t("contact.form.reason_partnership")}</option>
                  <option value="other">{t("contact.form.reason_other")}</option>
                </select>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  {t("contact.form.subject_label")}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder={t("contact.form.subject_placeholder")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {t("contact.form.message_label")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder={t("contact.form.message_placeholder")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
              >
                {t("contact.form.submit")}
              </button>
            </form>
          </section>

          {/* Contact Information */}
          <section className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t("contact.info.title")}
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 text-lg">📧</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <a href={`mailto:${t("contact.info.email")}`} className="text-blue-600 hover:text-blue-800">
                      {t("contact.info.email")}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 text-lg">📞</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <a href={`tel:${t("contact.info.phone")}`} className="text-blue-600 hover:text-blue-800">
                      {t("contact.info.phone")}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mt-1">
                    <span className="text-blue-600 text-lg">📍</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Address</p>
                    <p className="text-gray-600">{t("contact.info.address")}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mt-1">
                    <span className="text-blue-600 text-lg">🕒</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Hours</p>
                    <p className="text-gray-600">{t("contact.info.hours")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Questions Section */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                {t("contact.questions.title")}
              </h3>
              <p className="text-blue-800">
                {t("contact.questions.description")}
              </p>
            </div>

            {/* Partnerships Section */}
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-3">
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
  );
}