import { useTranslations } from "next-intl";
import { Header } from "@/components/layout/Header";

export default function TermsPage() {
  const t = useTranslations("Navigation");

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">{t("terms")}</h1>
          <p className="text-lg text-gray-600 mb-8">Last updated: January 1, 2024</p>

          <div className="prose prose-lg max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using the eVisa platform, you accept and agree to be bound by the
              terms and provision of this agreement. If you do not agree to abide by the above,
              please do not use this service.
            </p>

            <h2>2. Description of Service</h2>
            <p>
              eVisa provides a platform for checking visa requirements and connecting users with
              visa service providers. We are not a government agency and do not issue visas
              directly. All visa applications are processed by official government agencies or
              authorized service providers.
            </p>

            <h2>3. User Responsibilities</h2>
            <p>Users are responsible for:</p>
            <ul>
              <li>Providing accurate and complete information</li>
              <li>Verifying visa requirements with official sources</li>
              <li>Following all applicable laws and regulations</li>
              <li>Maintaining the confidentiality of their account information</li>
            </ul>

            <h2>4. Information Accuracy</h2>
            <p>
              While we strive to provide accurate and up-to-date visa information, requirements can
              change frequently. We recommend verifying all information with official government
              sources or consulates before making travel plans.
            </p>

            <h2>5. Third-Party Services</h2>
            <p>
              Our platform may connect you with third-party visa service providers. These services
              are independent entities, and we are not responsible for their actions, services, or
              fees.
            </p>

            <h2>6. Limitation of Liability</h2>
            <p>
              eVisa shall not be liable for any indirect, incidental, special, consequential, or
              punitive damages arising out of your use of the service.
            </p>

            <h2>7. Privacy Policy</h2>
            <p>
              Your privacy is important to us. Please review our Privacy Policy, which also governs
              your use of the service.
            </p>

            <h2>8. Modifications</h2>
            <p>
              We reserve the right to modify these terms at any time. Users will be notified of
              significant changes via email or through the platform.
            </p>

            <h2>9. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at
              support@evisa.com.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
