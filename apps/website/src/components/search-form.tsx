"use client";

import * as React from "react";
import { Button, Label, CountryCombobox } from "@/components/ui";

interface Country {
  code: string;
  localizedName: string;
}

interface SearchFormProps {
  countries: Country[];
  searchTitle: string;
  passportLabel: string;
  passportPlaceholder: string;
  destinationLabel: string;
  destinationPlaceholder: string;
  checkButtonText: string;
  emptyText: string;
  searchPlaceholder: string;
}

/**
 * Client-side search form with country selection comboboxes
 */
export function SearchForm({
  countries,
  searchTitle,
  passportLabel,
  passportPlaceholder,
  destinationLabel,
  destinationPlaceholder,
  checkButtonText,
  emptyText,
  searchPlaceholder,
}: SearchFormProps) {
  const [passportCountry, setPassportCountry] = React.useState<string>("");
  const [destinationCountry, setDestinationCountry] =
    React.useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - this could navigate to search results
    console.log("Search:", { passportCountry, destinationCountry });
  };

  return (
    <div className="mx-auto mb-8 max-w-3xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          {searchTitle}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <Label
                htmlFor="passport"
                className="block text-sm font-medium text-gray-700"
              >
                {passportLabel}
              </Label>
              <CountryCombobox
                countries={countries}
                value={passportCountry}
                onValueChange={(value: string) => setPassportCountry(value)}
                placeholder={passportPlaceholder}
                searchPlaceholder={searchPlaceholder}
                emptyText={emptyText}
              />
            </div>
            <div>
              <Label
                htmlFor="destination"
                className="block text-sm font-medium text-gray-700"
              >
                {destinationLabel}
              </Label>
              <CountryCombobox
                countries={countries}
                value={destinationCountry}
                onValueChange={(value: string) => setDestinationCountry(value)}
                placeholder={destinationPlaceholder}
                searchPlaceholder={searchPlaceholder}
                emptyText={emptyText}
              />
            </div>
            <div className="flex items-end">
              <Button type="submit" className="w-full">
                {checkButtonText}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
