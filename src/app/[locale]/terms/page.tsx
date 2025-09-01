import { Metadata } from "next";
import { StaticPageLayout } from "@/components/static-page-layout";
import { MDXContent } from "@/components/mdx-content";
import { getMDXPage } from "@/lib/mdx";
import { isRTL } from "@/lib/utils";

interface TermsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params: _params }: TermsPageProps): Promise<Metadata> {
  // const { locale } = await params;
  
  try {
    const mdxData = await getMDXPage('terms-n-conditions.mdx');
    
    return {
      title: mdxData.frontmatter.title,
      description: mdxData.frontmatter.description,
      keywords: mdxData.frontmatter.keywords,
      authors: mdxData.frontmatter.author ? [{ name: mdxData.frontmatter.author }] : undefined,
    };
  } catch {
    // Fallback metadata if MDX file can't be read
    return {
      title: "Terms & Conditions - GetTravelVisa.com",
      description: "Read our Terms & Conditions for using GetTravelVisa.com services.",
    };
  }
}

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale } = await params;
  const isCurrentRTL = isRTL(locale);

  try {
    const mdxData = await getMDXPage('terms-n-conditions.mdx');
    
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
            Terms & Conditions
          </h1>
          <p className="text-lg text-gray-600">
            These terms and conditions govern your use of our website and services.
          </p>
        </div>
      </StaticPageLayout>
    );
  }
}