export default function DestinationsLoading() {
  return (
    <main className="min-h-screen">
      {/* Breadcrumb Skeleton */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-2">
          <div className="bg-muted h-4 w-12 animate-pulse rounded" />
          <div className="bg-muted h-4 w-4 animate-pulse rounded" />
          <div className="bg-muted h-4 w-24 animate-pulse rounded" />
        </div>
      </nav>

      {/* Hero Section Skeleton */}
      <section className="from-primary/5 bg-gradient-to-br via-blue-50 to-purple-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            {/* Title Skeleton */}
            <div className="bg-muted mx-auto mb-6 h-12 max-w-2xl animate-pulse rounded-lg sm:h-16" />

            {/* Description Skeleton */}
            <div className="mb-8 space-y-2">
              <div className="bg-muted mx-auto h-6 max-w-xl animate-pulse rounded" />
              <div className="bg-muted mx-auto h-6 max-w-lg animate-pulse rounded" />
            </div>

            {/* Search Bar Skeleton */}
            <div className="bg-background/80 rounded-lg border p-6 shadow-lg backdrop-blur-sm">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1">
                  <div className="bg-muted h-12 animate-pulse rounded-lg" />
                </div>
                <div className="sm:w-64">
                  <div className="bg-muted h-12 animate-pulse rounded-lg" />
                </div>
              </div>
              <div className="mt-4">
                <div className="bg-muted h-4 w-32 animate-pulse rounded" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Grid Skeleton */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="bg-card animate-pulse rounded-lg border p-6"
            >
              {/* Flag/Image Skeleton */}
              <div className="bg-muted mx-auto mb-4 h-12 w-16 rounded" />

              {/* Country Name Skeleton */}
              <div className="bg-muted mb-2 h-6 rounded" />

              {/* Stats Skeleton */}
              <div className="mb-4 flex items-center justify-between">
                <div className="bg-muted h-4 w-20 rounded" />
                <div className="bg-muted h-4 w-16 rounded" />
              </div>

              {/* Region Skeleton */}
              <div className="bg-muted mb-4 h-4 w-24 rounded" />

              {/* Button Skeleton */}
              <div className="bg-muted h-9 rounded" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
