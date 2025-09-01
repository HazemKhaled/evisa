import { Metadata } from "next";
import { StaticPageLayout } from "@/components/static-page-layout";
import { MDXContent } from "@/components/mdx-content";
import { getMDXPage } from "@/lib/mdx";
import { isRTL } from "@/lib/utils";

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params: _params }: PrivacyPageProps): Promise<Metadata> {
  // const { locale } = await params;
  
  try {
    const mdxData = await getMDXPage('privacy-policy.mdx');
    
    return {
      title: mdxData.frontmatter.title,
      description: mdxData.frontmatter.description,
      keywords: mdxData.frontmatter.keywords,
      authors: mdxData.frontmatter.author ? [{ name: mdxData.frontmatter.author }] : undefined,
    };
  } catch {
    // Fallback metadata if MDX file can't be read
    return {
      title: "Privacy Policy - GetTravelVisa.com",
      description: "Learn how GetTravelVisa.com collects, uses, and protects your personal information.",
    };
  }
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  const isCurrentRTL = isRTL(locale);

  try {
    const mdxData = await getMDXPage('privacy-policy.mdx');
    
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
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600">
            We respect your privacy and are committed to protecting your personal data.
          </p>
        </div>
      </StaticPageLayout>
    );
  }
}