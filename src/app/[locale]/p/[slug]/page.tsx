import { Metadata } from "next";
import { notFound } from "next/navigation";
import { StaticPageLayout } from "@/components/static-page-layout";
import { MDXContent } from "@/components/mdx-content";
import { getMDXPage, getAllStaticPages } from "@/lib/mdx";

interface StaticPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  const staticPages = getAllStaticPages();

  return staticPages.map(({ locale, slug }) => ({
    locale,
    slug,
  }));
}

export async function generateMetadata({
  params,
}: StaticPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  try {
    const mdxData = await getMDXPage(`${slug}.mdx`, locale);

    return {
      title: mdxData.frontmatter.title,
      description: mdxData.frontmatter.description,
      keywords: mdxData.frontmatter.keywords,
      authors: mdxData.frontmatter.author
        ? [{ name: mdxData.frontmatter.author }]
        : undefined,
    };
  } catch {
    // Return 404 metadata if page not found
    return {
      title: "Page Not Found",
      description: "The requested page could not be found.",
    };
  }
}

export default async function StaticPage({ params }: StaticPageProps) {
  const { locale, slug } = await params;

  try {
    const mdxData = await getMDXPage(`${slug}.mdx`, locale);

    return (
      <StaticPageLayout>
        <h1 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl">
          {mdxData.frontmatter.title}
        </h1>
        <MDXContent data={mdxData} />
      </StaticPageLayout>
    );
  } catch {
    notFound();
  }
}
