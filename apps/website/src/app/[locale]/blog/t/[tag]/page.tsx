import { type Metadata } from "next";

import { getTranslation } from "@/app/i18n";
import { languages } from "@/app/i18n/settings";
import { env } from "@/lib/consts";
import { getAllUniqueTagsAcrossLocales } from "@/lib/services/blog-service";
import { generateAlternatesMetadata } from "@/lib/utils";

import BlogHome from "../../page";

export const revalidate = 86400;

export async function generateStaticParams(): Promise<
  { locale: string; tag: string }[]
> {
  const allTags = await getAllUniqueTagsAcrossLocales();

  const params = [];
  for (const currentLocale of languages) {
    for (const tag of allTags) {
      params.push({ locale: currentLocale, tag });
    }
  }

  return params;
}

interface TagPageProps {
  params: Promise<{ locale: string; tag: string }>;
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { locale, tag } = await params;
  const { t } = await getTranslation(locale, "blog");
  const decodedTag = decodedOrOriginalTag(tag);
  const alternates = generateAlternatesMetadata(
    env.baseUrl,
    `blog/t/${encodeURIComponent(tag)}`,
    locale
  );

  return {
    title: t("metadata.tag_title_template", {
      tag: decodedTag,
      title: t("title"),
    }),
    description: t("metadata.tag_description_template", { tag: decodedTag }),
    keywords: t("metadata.tag_keywords_template", { tag: decodedTag }),
    alternates,
    openGraph: {
      url: alternates.canonical,
    },
  };
}

export default async function TagPage({ params }: TagPageProps) {
  return BlogHome({ params });
}

function decodedOrOriginalTag(tag: string): string {
  try {
    return decodeURIComponent(tag);
  } catch {
    return tag;
  }
}
