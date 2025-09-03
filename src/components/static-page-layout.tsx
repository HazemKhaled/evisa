interface StaticPageLayoutProps {
  children: React.ReactNode;
}

export async function StaticPageLayout({ children }: StaticPageLayoutProps) {
  return (
    <div className="mx-auto max-w-4xl bg-white px-4 py-16 sm:px-6 lg:px-8">
      <article className="prose prose-lg max-w-none">{children}</article>
    </div>
  );
}
