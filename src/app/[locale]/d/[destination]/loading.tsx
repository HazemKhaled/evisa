export default function DestinationLoading() {
  return (
    <main className="min-h-screen">
      {/* Breadcrumb Skeleton */}
      <nav className="container mx-auto px-4 py-4" aria-label="breadcrumb">
        <ol className="flex items-center space-x-2 text-sm rtl:space-x-reverse">
          <li>
            <div className="bg-muted h-4 w-12 animate-pulse rounded"></div>
          </li>
          <li className="flex items-center">
            <span className="mx-2 ltr:rotate-0 rtl:rotate-180">→</span>
            <div className="bg-muted h-4 w-20 animate-pulse rounded"></div>
          </li>
          <li className="flex items-center">
            <span className="mx-2 ltr:rotate-0 rtl:rotate-180">→</span>
            <div className="bg-muted h-4 w-24 animate-pulse rounded"></div>
          </li>
        </ol>
      </nav>

      {/* Hero Section Skeleton */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-muted relative mb-8 h-96 animate-pulse rounded-lg">
          {/* Hero image placeholder */}
          <div className="from-muted to-muted-foreground/20 absolute inset-0 rounded-lg bg-gradient-to-br"></div>

          {/* Hero content placeholder */}
          <div className="absolute right-6 bottom-6 left-6">
            <div className="mb-2 h-8 w-48 rounded bg-white/20"></div>
            <div className="h-4 w-32 rounded bg-white/20"></div>
          </div>
        </div>

        {/* Description placeholder */}
        <div className="space-y-3">
          <div className="bg-muted h-4 w-full animate-pulse rounded"></div>
          <div className="bg-muted h-4 w-3/4 animate-pulse rounded"></div>
        </div>
      </section>

      {/* Visa Options Section Skeleton */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="bg-muted mb-4 h-8 w-48 animate-pulse rounded"></div>
          <div className="bg-muted h-4 w-96 animate-pulse rounded"></div>
        </div>

        {/* Visa cards grid skeleton */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-card animate-pulse rounded-lg border p-6"
            >
              <div className="bg-muted mb-4 h-6 w-32 rounded"></div>
              <div className="mb-6 space-y-3">
                <div className="flex justify-between">
                  <div className="bg-muted h-4 w-16 rounded"></div>
                  <div className="bg-muted h-4 w-20 rounded"></div>
                </div>
                <div className="flex justify-between">
                  <div className="bg-muted h-4 w-20 rounded"></div>
                  <div className="bg-muted h-4 w-16 rounded"></div>
                </div>
                <div className="flex justify-between">
                  <div className="bg-muted h-4 w-18 rounded"></div>
                  <div className="bg-muted h-4 w-14 rounded"></div>
                </div>
              </div>
              <div className="bg-muted h-10 w-full rounded"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Related Content Section Skeleton */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="bg-muted mb-4 h-8 w-56 animate-pulse rounded"></div>
          <div className="bg-muted h-4 w-80 animate-pulse rounded"></div>
        </div>

        <div className="py-8 text-center">
          <div className="bg-muted mx-auto h-12 w-48 animate-pulse rounded"></div>
        </div>
      </section>
    </main>
  );
}
