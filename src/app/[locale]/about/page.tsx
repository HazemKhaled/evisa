import { useTranslations } from "next-intl";
import { Header } from "@/components/layout/Header";

export default function AboutPage() {
  const t = useTranslations("Navigation");

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">{t("about")}</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8">
              Welcome to eVisa - your gateway to simplified visa processing and travel planning.
            </p>
            <p className="text-gray-700 mb-6">
              eVisa is a comprehensive platform designed to help travelers navigate the complex
              world of visa requirements with ease. Our mission is to make international travel more
              accessible by providing accurate, up-to-date visa information and streamlined
              processing services.
            </p>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-6">
              We believe that travel should be about discovery and adventure, not paperwork and
              confusion. That&apos;s why we&apos;ve created a platform that simplifies the visa
              application process, provides clear guidance on requirements, and connects travelers
              with trusted service providers.
            </p>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">What We Offer</h2>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Comprehensive visa requirement database for destinations worldwide</li>
              <li>Instant eligibility checking based on your passport country</li>
              <li>Connections to trusted visa service providers</li>
              <li>Up-to-date travel information and destination guides</li>
              <li>Multi-language support including Arabic and English</li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
