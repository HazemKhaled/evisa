import { Skeleton } from "@repo/ui";

export default function BlogPostLoading() {
  return (
    <main className="min-h-screen">
      {/* Hero image skeleton */}
      <div className="relative h-64 w-full sm:h-80 lg:h-96">
        <Skeleton className="h-full w-full" />
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-12">
        {/* Tags skeleton */}
        <div className="mb-4 flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>

        {/* Title skeleton */}
        <Skeleton className="mb-3 h-10 w-full max-w-2xl" />
        <Skeleton className="mb-8 h-10 w-3/4 max-w-xl" />

        {/* Author / date row skeleton */}
        <div className="mb-10 flex items-center gap-4 border-b pb-6">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>

        {/* Paragraph skeletons */}
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
