"use client";

import { Button, Input } from "@repo/ui";
import { cn } from "@repo/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";

import { useTranslation } from "@/app/i18n/client";

interface BlogSearchProps {
  locale: string;
  className?: string;
  searchPlaceholder?: string;
  searchValue?: string;
}

export function BlogSearch({
  locale,
  className,
  searchPlaceholder,
  searchValue,
}: BlogSearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchValue ?? "");
  const [isPending, startTransition] = useTransition();

  const { t } = useTranslation(locale, "blog");

  useEffect(() => {
    const trimmed = query.trim();
    const params = new URLSearchParams(searchParams.toString());

    if (trimmed) {
      params.set("search", trimmed);
    } else {
      params.delete("search");
    }
    params.delete("page");

    const nextQuery = params.toString();
    const nextUrl = nextQuery ? `${pathname}?${nextQuery}` : pathname;
    const currentQuery = searchParams.toString();
    const currentUrl = currentQuery ? `${pathname}?${currentQuery}` : pathname;

    if (nextUrl === currentUrl) {
      return;
    }

    const timeoutId = setTimeout(() => {
      startTransition(() => {
        router.push(nextUrl);
      });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, pathname, router, searchParams]);

  const handleClear = () => {
    setQuery("");
  };

  return (
    <div className={cn("w-full", className)}>
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
          <Input
            type="text"
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(e.target.value)
            }
            placeholder={searchPlaceholder || t("search.placeholder")}
            className="block w-full rounded-lg border border-gray-300 bg-white px-10 py-3 text-sm placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
          {query && (
            <Button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              aria-label={t("aria.clearSearch")}
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
            </Button>
          )}
        </div>

        {isPending && (
          <div className="mt-2 text-center text-sm text-gray-500">
            {t("search.loading")}
          </div>
        )}
      </div>
    </div>
  );
}
