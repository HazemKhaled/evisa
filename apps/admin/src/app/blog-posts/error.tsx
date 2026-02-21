"use client";

interface BlogPostsErrorProps {
  error: Error;
  reset: () => void;
}

export default function BlogPostsError({ error, reset }: BlogPostsErrorProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-red-200 bg-red-50 p-8 text-center">
      <div className="mb-4 text-5xl">⚠️</div>
      <h2 className="mb-2 text-xl font-semibold text-red-800">
        Failed to load blog posts
      </h2>
      <p className="mb-6 max-w-md text-sm text-red-600">
        {error.message || "An unexpected error occurred. Please try again."}
      </p>
      <button
        onClick={reset}
        className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
      >
        Try again
      </button>
    </div>
  );
}
