"use client";

import { Button, CountryCombobox, Label } from "@repo/ui";
import * as React from "react";

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

  // Generate unique IDs for accessibility
  const passportLabelId = React.useId();
  const destinationLabelId = React.useId();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
                id={passportLabelId}
                htmlFor="passport-combobox"
                className="block text-sm font-medium text-gray-700"
              >
                {passportLabel}
              </Label>
              <CountryCombobox
                id="passport-combobox"
                aria-labelledby={passportLabelId}
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
                id={destinationLabelId}
                htmlFor="destination-combobox"
                className="block text-sm font-medium text-gray-700"
              >
                {destinationLabel}
              </Label>
              <CountryCombobox
                id="destination-combobox"
                aria-labelledby={destinationLabelId}
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
