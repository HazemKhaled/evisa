import { Metadata } from "next";
import { StaticPageLayout } from "@/components/static-page-layout";
import { MDXContent } from "@/components/mdx-content";
import { getMDXPage } from "@/lib/mdx";
import { isRTL } from "@/lib/utils";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params: _params }: AboutPageProps): Promise<Metadata> {
  // const { locale } = await params;
  
  try {
    const mdxData = await getMDXPage('about-us.mdx');
    
    return {
      title: mdxData.frontmatter.title,
      description: mdxData.frontmatter.description,
      keywords: mdxData.frontmatter.keywords,
      authors: mdxData.frontmatter.author ? [{ name: mdxData.frontmatter.author }] : undefined,
    };
  } catch {
    // Fallback metadata if MDX file can't be read
    return {
      title: "About GetTravelVisa.com",
      description: "Learn about our mission to simplify international travel through comprehensive visa information and application services.",
    };
  }
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const isCurrentRTL = isRTL(locale);

  try {
    const mdxData = await getMDXPage('about-us.mdx');
    
    return (
      <StaticPageLayout locale={locale}>
        <MDXContent data={mdxData} isRTL={isCurrentRTL} />
      </StaticPageLayout>
    );
  } catch {
    // Fallback content if MDX file can't be read
    return (
      <StaticPageLayout locale={locale}>
        <div className="space-y-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            About GetTravelVisa.com
          </h1>
          <p className="text-lg text-gray-600">
            We help travelers navigate the complex world of visa requirements with minimal hassle.
          </p>
        </div>
      </StaticPageLayout>
    );
  }
}