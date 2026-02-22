import { Skeleton } from "@repo/ui";

export default function BlogLoading() {
  return (
    <main className="min-h-screen">
      {/* Hero / Header Skeleton */}
      <section className="from-primary/5 bg-gradient-to-br via-blue-50 to-purple-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Skeleton className="mx-auto mb-6 h-12 max-w-2xl sm:h-16" />
            <div className="mb-8 space-y-2">
              <Skeleton className="mx-auto h-6 max-w-xl" />
              <Skeleton className="mx-auto h-6 max-w-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar Skeleton */}
      <section className="container mx-auto px-4 py-8">
        <Skeleton className="mx-auto h-12 max-w-2xl rounded-lg" />
      </section>

      {/* Blog Grid Skeleton */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="bg-card rounded-lg border p-4">
              {/* Card image skeleton */}
              <Skeleton className="mb-4 aspect-video w-full rounded-md" />
              {/* Tags skeleton */}
              <div className="mb-3 flex gap-2">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-12 rounded-full" />
              </div>
              {/* Title skeleton */}
              <Skeleton className="mb-2 h-6 w-full" />
              <Skeleton className="mb-4 h-6 w-3/4" />
              {/* Description skeleton */}
              <Skeleton className="mb-1 h-4 w-full" />
              <Skeleton className="mb-4 h-4 w-5/6" />
              {/* Author/date skeleton */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
