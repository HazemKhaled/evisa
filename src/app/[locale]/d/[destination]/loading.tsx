import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";

export default function DestinationLoading() {
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
              <Skeleton className="h-4 w-20" />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Skeleton className="h-4 w-24" />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

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
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </section>

      {/* Visa Options Section Skeleton */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Skeleton className="mb-4 h-8 w-48" />
          <Skeleton className="h-4 w-96" />
        </div>

        {/* Visa cards grid skeleton */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-card rounded-lg border p-6">
              <Skeleton className="mb-4 h-6 w-32" />
              <div className="mb-6 space-y-3">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-18" />
                  <Skeleton className="h-4 w-14" />
                </div>
              </div>
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </section>

      {/* Related Content Section Skeleton */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Skeleton className="mb-4 h-8 w-56" />
          <Skeleton className="h-4 w-80" />
        </div>

        <div className="py-8 text-center">
          <Skeleton className="mx-auto h-12 w-48" />
        </div>
      </section>
    </main>
  );
}
