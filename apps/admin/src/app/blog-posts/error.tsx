"use client";

import { ErrorBoundary } from "@/components/error-boundary";

interface BlogPostsErrorProps {
  error: Error;
  reset: () => void;
}

export default function BlogPostsError({ error, reset }: BlogPostsErrorProps) {
  return (
    <ErrorBoundary
      error={error}
      reset={reset}
      title="Failed to load blog posts"
    />
  );
}
