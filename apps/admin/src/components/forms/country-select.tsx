"use client";

import { type Country } from "@repo/database";
import { forwardRef } from "react";

interface CountrySelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  countries: Country[];
  error?: string;
  placeholder?: string;
}

export const CountrySelect = forwardRef<HTMLSelectElement, CountrySelectProps>(
  ({ countries, error, placeholder = "Select a country", ...props }, ref) => {
    return (
      <div className="space-y-2">
        <select
          ref={ref}
          className={`bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
            error ? "border-red-500" : "border-input"
          }`}
          {...props}
        >
          <option value="">{placeholder}</option>
          {countries.map(country => (
            <option key={country.code} value={country.code}>
              {country.code}
            </option>
          ))}
        </select>
        {error ? <p className="text-sm text-red-500">{error}</p> : null}
      </div>
    );
  }
);

CountrySelect.displayName = "CountrySelect";
