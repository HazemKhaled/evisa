import { useTranslations } from "next-intl";
import { Header } from "@/components/layout/Header";

export default function DestinationsPage() {
  const t = useTranslations("Navigation");

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">{t("destinations")}</h1>
          <p className="text-xl text-gray-600 mb-12">
            Explore visa requirements for destinations around the world.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Popular destinations - will be replaced with dynamic data later */}
            {[
              { name: "United States", flag: "🇺🇸", code: "US" },
              { name: "United Arab Emirates", flag: "🇦🇪", code: "AE" },
              { name: "United Kingdom", flag: "🇬🇧", code: "GB" },
              { name: "Germany", flag: "🇩🇪", code: "DE" },
              { name: "Japan", flag: "🇯🇵", code: "JP" },
              { name: "Australia", flag: "🇦🇺", code: "AU" },
            ].map((destination) => (
              <div
                key={destination.code}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200"
              >
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{destination.flag}</span>
                  <h3 className="text-xl font-semibold text-gray-900">{destination.name}</h3>
                </div>
                <p className="text-gray-600 mb-4">Check visa requirements for {destination.name}</p>
                <button className="text-primary hover:text-primary-dark font-medium">
                  View Details →
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
