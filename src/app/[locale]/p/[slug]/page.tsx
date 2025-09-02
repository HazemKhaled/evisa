import { Metadata } from "next";
import { notFound } from "next/navigation";
import { StaticPageLayout } from "@/components/static-page-layout";
import { MDXContent } from "@/components/mdx-content";
import { getMDXPage } from "@/lib/mdx";
import { isRTL } from "@/lib/utils";

interface StaticPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: StaticPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  
  try {
    const mdxData = await getMDXPage(`${slug}.mdx`, locale);
    
    return {
      title: mdxData.frontmatter.title,
      description: mdxData.frontmatter.description,
      keywords: mdxData.frontmatter.keywords,
      authors: mdxData.frontmatter.author ? [{ name: mdxData.frontmatter.author }] : undefined,
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
  const isCurrentRTL = isRTL(locale);

  try {
    const mdxData = await getMDXPage(`${slug}.mdx`, locale);
    
    return (
      <StaticPageLayout locale={locale}>
        <MDXContent data={mdxData} isRTL={isCurrentRTL} />
      </StaticPageLayout>
    );
  } catch {
    // Return 404 if MDX file can't be read
    notFound();
  }
}