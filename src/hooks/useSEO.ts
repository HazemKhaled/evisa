"use client";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { generateMetadata, SEOConfig } from "@/lib/seo";

interface UseSEOProps {
  locale: string;
  pathname?: string;
  customConfig?: Partial<SEOConfig>;
}

export function useSEO({ locale, pathname = "/", customConfig = {} }: UseSEOProps) {
  const { t } = useTranslation("common");

  const seoConfig = useMemo(() => {
    const baseConfig: SEOConfig = {
      title: t("site.title"),
      description: t("site.description"),
      keywords: t("site.keywords").split(", "),
      ...customConfig,
    };

    return baseConfig;
  }, [t, customConfig]);

  const metadata = useMemo(() => {
    return generateMetadata(seoConfig, locale, pathname);
  }, [seoConfig, locale, pathname]);

  const structuredData = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          name: "GetTravelVisa.com",
          url: process.env.NEXT_PUBLIC_BASE_URL || "https://gettravelvisa.com",
          logo: `${process.env.NEXT_PUBLIC_BASE_URL || "https://gettravelvisa.com"}/logo.png`,
          description: t("site.description"),
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+1-800-VISA-HELP",
            contactType: "customer service",
            availableLanguage: ["en", "es", "ar", "pt", "ru", "de", "fr", "it"],
          },
        },
        {
          "@type": "WebSite",
          name: "GetTravelVisa.com",
          url: process.env.NEXT_PUBLIC_BASE_URL || "https://gettravelvisa.com",
          description: t("site.description"),
          inLanguage: ["en", "es", "ar", "pt", "ru", "de", "fr", "it"],
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${process.env.NEXT_PUBLIC_BASE_URL || "https://gettravelvisa.com"}/${locale}/search?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        },
      ],
    };
  }, [t, locale]);

  return {
    metadata,
    structuredData,
    seoConfig,
  };
}