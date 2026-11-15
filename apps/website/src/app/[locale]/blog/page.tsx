import { type Metadata } from "next";

import { getTranslation } from "@/app/i18n";
import { languages } from "@/app/i18n/settings";
import { BlogCatalogServer } from "@/components/blog/blog-catalog-server";
import { env } from "@/lib/consts";
import { getCanonicalBlogUrl } from "@/lib/json-ld";
import { generateAlternatesMetadata } from "@/lib/utils";

export const revalidate = 86400;

export function generateStaticParams(): { locale: string }[] {
  return languages.map(locale => ({ locale }));
}

export interface BlogHomeProps {
  params: Promise<{
    locale: string;
    destination?: string;
    tag?: string;
  }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getTranslation(locale, "blog");
  const alternates = generateAlternatesMetadata(env.baseUrl, "blog", locale);
  const canonicalBlogUrl = getCanonicalBlogUrl(env.baseUrl, locale);

  return {
    title: t("title"),
    description: t("subtitle"),
    keywords: t("keywords"),
    alternates: {
      ...alternates,
      canonical: canonicalBlogUrl,
    },
    openGraph: {
      url: canonicalBlogUrl,
    },
  };
}

export default async function BlogHome({ params }: BlogHomeProps) {
  const { locale, destination, tag } = await params;

  return BlogCatalogServer({ locale, destination, tag });
}
