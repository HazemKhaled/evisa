"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface Country {
  code: string;
  name: string;
  nameAr?: string | null;
  flag: string | null;
}

interface HeroProps {
  destinations: Country[];
  passportCountries: Country[];
}

export function Hero({ destinations, passportCountries }: HeroProps) {
  const [passportCountry, setPassportCountry] = useState<string>("");
  const [destinationCountry, setDestinationCountry] = useState<string>("");
  const [isSearching, setIsSearching] = useState(false);
  const t = useTranslations("Hero");
  const locale = useLocale();

  const handleSearch = async () => {
    if (!passportCountry || !destinationCountry) return;

    setIsSearching(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSearching(false);

    // Navigate to results (will implement routing later)
    console.log("Searching for:", { passportCountry, destinationCountry });
  };

  return (
    <section className="relative min-h-[600px] bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 right-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Headlines */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">{t("headline")}</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12">{t("subheadline")}</p>

          {/* Visa Checker Form */}
          <Card className="max-w-4xl mx-auto p-8 shadow-lg border-0 backdrop-blur-sm bg-white/95">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Passport Country */}
              <div className="text-left rtl:text-right">
                <label
                  htmlFor="passport-country"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t("passportCountry")}
                </label>
                <div className="relative">
                  <select
                    id="passport-country"
                    value={passportCountry}
                    onChange={(e) => setPassportCountry(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white appearance-none cursor-pointer"
                  >
                    <option value="">{t("selectPassport")}</option>
                    {passportCountries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.flag}{" "}
                        {locale === "ar" && country.nameAr ? country.nameAr : country.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 rtl:left-0 rtl:right-auto flex items-center pr-3 rtl:pl-3 rtl:pr-0 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Destination Country */}
              <div className="text-left rtl:text-right">
                <label
                  htmlFor="destination-country"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t("destinationCountry")}
                </label>
                <div className="relative">
                  <select
                    id="destination-country"
                    value={destinationCountry}
                    onChange={(e) => setDestinationCountry(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white appearance-none cursor-pointer"
                  >
                    <option value="">{t("selectDestination")}</option>
                    {destinations.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.flag}{" "}
                        {locale === "ar" && country.nameAr ? country.nameAr : country.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 rtl:left-0 rtl:right-auto flex items-center pr-3 rtl:pl-3 rtl:pr-0 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleSearch}
                disabled={!passportCountry || !destinationCountry}
                isLoading={isSearching}
                className="px-8 py-3 text-lg"
                size="lg"
              >
                <Search className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
                {t("checkEligibility")}
              </Button>

              <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                {t("startApplication")}
                <ArrowRight className="w-5 h-5 ml-2 rtl:mr-2 rtl:ml-0" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
