import { useTranslations } from "next-intl";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function ContactPage() {
  const t = useTranslations("Navigation");

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">{t("contact")}</h1>
          <p className="text-xl text-gray-600 mb-12">
            Get in touch with our team for support, partnerships, or general inquiries.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a message</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="What is this regarding?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </Card>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center mr-4 mt-1">
                    <span className="text-primary">📧</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">support@evisa.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center mr-4 mt-1">
                    <span className="text-primary">🕐</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Support Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM UTC</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center mr-4 mt-1">
                    <span className="text-primary">🌍</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Global Service</h3>
                    <p className="text-gray-600">We provide visa assistance worldwide</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Frequently Asked Questions
                </h3>
                <p className="text-gray-600">
                  Before reaching out, check our FAQ section for quick answers to common questions
                  about visa requirements and our services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
