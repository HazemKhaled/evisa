import { Skeleton } from "@repo/ui";

export default function BlogPostsLoading() {
  return (
    <div className="space-y-4">
      {/* Heading skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-9 w-40" />
      </div>

      {/* Table header skeleton */}
      <div className="rounded-lg border">
        <div className="border-b p-4">
          <div className="grid grid-cols-6 gap-4">
            {["ID", "Slug", "Title (EN)", "Author", "Status", "Actions"].map(
              col => (
                <Skeleton key={col} className="h-4 w-full max-w-24" />
              )
            )}
          </div>
        </div>

        {/* Table rows skeleton */}
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="border-b p-4 last:border-0">
            <div className="grid grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, j) => (
                <Skeleton key={j} className="h-5 w-full" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
