"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import type { BlogPostData } from "@/lib/blog";
import { searchBlogPosts } from "@/lib/services/blog-service";
import { ClientBlogPostCard } from "./client-blog-post-card";

interface BlogSearchProps {
  locale: string;
  allPosts: BlogPostData[];
  className?: string;
  translations: {
    searchPlaceholder: string;
    searchResults: string;
    noResults: string;
    searching: string;
    clear: string;
    result: string;
    results: string;
    noPostsFoundFor: string;
  };
  destination?: string;
}

export function BlogSearch({
  locale,
  allPosts: _allPosts,
  className,
  translations,
  destination: _destination,
}: BlogSearchProps) {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<BlogPostData[]>([]);

  // Debounced search effect
  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    // Debounce search
    const timeoutId = setTimeout(async () => {
      try {
        const results = searchBlogPosts(query, locale, 12);
        setSearchResults(results);
      } catch {
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, locale]);

  const handleClear = () => {
    setQuery("");
    setSearchResults([]);
  };

  const showResults = query.trim() && !isSearching;
  const hasResults = searchResults.length > 0;

  return (
    <div className={cn("w-full", className)}>
      {/* Search Input */}
      <div className="relative mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={translations.searchPlaceholder}
            className="block w-full rounded-lg border border-gray-300 bg-white px-10 py-3 text-sm placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={handleClear}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              aria-label={translations.clear}
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Loading indicator */}
        {isSearching && (
          <div className="mt-2 text-center text-sm text-gray-500">
            {translations.searching}...
          </div>
        )}
      </div>

      {/* Search Results */}
      {showResults && (
        <div className="space-y-6">
          {/* Results header */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {translations.searchResults}
            </h2>
            <span className="text-sm text-gray-500">
              {searchResults.length}{" "}
              {searchResults.length === 1
                ? translations.result
                : translations.results}
            </span>
          </div>

          {/* Results grid or empty state */}
          {hasResults ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {searchResults.map(post => (
                <ClientBlogPostCard
                  key={post.slug}
                  post={post}
                  locale={locale}
                />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <div className="mx-auto max-w-md">
                <div className="mb-4 text-6xl opacity-50">🔍</div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  {translations.noResults}
                </h3>
                <p className="text-gray-600">
                  {query.trim() &&
                    translations.noPostsFoundFor.replace("{query}", query)}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
