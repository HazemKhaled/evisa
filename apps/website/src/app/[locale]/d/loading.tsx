import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  Skeleton,
} from "@repo/ui";

export default function DestinationsLoading() {
  return (
    <main className="min-h-screen">
      {/* Breadcrumb Skeleton */}
      <div className="container mx-auto px-4 py-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Skeleton className="h-4 w-12" />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Skeleton className="h-4 w-24" />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Hero Section Skeleton */}
      <section className="from-primary/5 bg-gradient-to-br via-blue-50 to-purple-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            {/* Title Skeleton */}
            <Skeleton className="mx-auto mb-6 h-12 max-w-2xl sm:h-16" />

            {/* Description Skeleton */}
            <div className="mb-8 space-y-2">
              <Skeleton className="mx-auto h-6 max-w-xl" />
              <Skeleton className="mx-auto h-6 max-w-lg" />
            </div>

            {/* Search Bar Skeleton */}
            <div className="bg-background/80 rounded-lg border p-6 shadow-lg backdrop-blur-sm">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1">
                  <Skeleton className="h-12 rounded-lg" />
                </div>
                <div className="sm:w-64">
                  <Skeleton className="h-12 rounded-lg" />
                </div>
              </div>
              <div className="mt-4">
                <Skeleton className="h-4 w-32" />
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
              <Skeleton className="mx-auto mb-4 h-12 w-16" />

              {/* Country Name Skeleton */}
              <Skeleton className="mb-2 h-6" />

              {/* Stats Skeleton */}
              <div className="mb-4 flex items-center justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>

              {/* Region Skeleton */}
              <Skeleton className="mb-4 h-4 w-24" />

              {/* Button Skeleton */}
              <Skeleton className="h-9" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
