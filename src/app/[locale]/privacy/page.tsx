import { useTranslations } from "next-intl";
import { Header } from "@/components/layout/Header";

export default function PrivacyPage() {
  const t = useTranslations("Navigation");

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">{t("privacy")}</h1>
          <p className="text-lg text-gray-600 mb-8">Last updated: January 1, 2024</p>

          <div className="prose prose-lg max-w-none">
            <h2>1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create an account,
              use our visa checker, or contact us for support.
            </p>

            <h3>Personal Information</h3>
            <ul>
              <li>Name and contact information</li>
              <li>Passport country and travel destinations</li>
              <li>Email address and communication preferences</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <ul>
              <li>IP address and device information</li>
              <li>Browser type and operating system</li>
              <li>Pages visited and time spent on our platform</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide visa requirement information</li>
              <li>Connect you with appropriate service providers</li>
              <li>Send important updates and notifications</li>
              <li>Improve our platform and services</li>
              <li>Analyze usage patterns and trends</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third
              parties without your consent, except as described in this policy:
            </p>
            <ul>
              <li>With visa service providers when you request their services</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and safety</li>
              <li>With your explicit consent</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect
              your personal information against unauthorized access, alteration, disclosure, or
              destruction.
            </p>

            <h2>5. Cookies and Tracking</h2>
            <p>
              We use cookies and similar technologies to enhance your experience, analyze usage, and
              provide personalized content. You can control cookie settings through your browser.
            </p>

            <h2>6. Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Delete your information</li>
              <li>Restrict processing of your information</li>
              <li>Data portability</li>
            </ul>

            <h2>7. International Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your
              country of residence. We ensure appropriate safeguards are in place for such
              transfers.
            </p>

            <h2>8. Children&apos;s Privacy</h2>
            <p>
              Our service is not intended for children under 18. We do not knowingly collect
              personal information from children under 18.
            </p>

            <h2>9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any
              material changes via email or through our platform.
            </p>

            <h2>10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at
              privacy@evisa.com.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
