"use client";

import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface SearchFilterFormProps {
  locale: string;
  continents: string[];
  translations: {
    searchPlaceholder: string;
    allContinents: string;
  };
}

export function SearchFilterForm({
  locale,
  continents,
  translations,
}: SearchFilterFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );
  const [continentValue, setContinentValue] = useState(
    searchParams.get("continent") || "all"
  );

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get("search") as string;

    const params = new URLSearchParams();
    if (search.trim()) {
      params.set("search", search.trim());
    }
    if (continentValue !== "all") {
      params.set("continent", continentValue);
    }

    const queryString = params.toString();
    router.push(`/${locale}/d${queryString ? `?${queryString}` : ""}`);
  };

  const handleContinentChange = (continent: string) => {
    setContinentValue(continent);

    const params = new URLSearchParams();
    if (searchValue.trim()) {
      params.set("search", searchValue.trim());
    }
    if (continent !== "all") {
      params.set("continent", continent);
    }

    const queryString = params.toString();
    router.push(`/${locale}/d${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <div className="bg-background/80 rounded-lg border p-6 shadow-lg backdrop-blur-sm">
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Search Input */}
        <div className="flex-1">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Input
              type="text"
              name="search"
              placeholder={translations.searchPlaceholder}
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              className="border-input bg-background focus:ring-primary focus:border-primary w-full rounded-lg border py-3 pr-4 pl-10 focus:ring-2"
            />
            <svg
              className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform"
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
          </form>
        </div>

        {/* Continent Filter */}
        <div className="sm:w-64">
          <Select value={continentValue} onValueChange={handleContinentChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={translations.allContinents} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{translations.allContinents}</SelectItem>
              {continents.map(cont => (
                <SelectItem key={cont} value={cont.toLowerCase()}>
                  {cont}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
