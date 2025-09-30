"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@repo/utils";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover";

interface Country {
  code: string;
  localizedName: string;
}

interface CountryComboboxProps {
  countries: Country[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  emptyText: string;
  searchPlaceholder: string;
  className?: string;
  disabled?: boolean;
}

/**
 * Searchable country selection combobox component
 * Provides autocomplete functionality for country selection
 */
export function CountryCombobox({
  countries,
  value,
  onValueChange,
  placeholder,
  emptyText,
  searchPlaceholder,
  className,
  disabled = false,
}: CountryComboboxProps) {
  const [open, setOpen] = React.useState(false);

  // Find the selected country
  const selectedCountry = countries.find(country => country.code === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
          disabled={disabled}
        >
          {selectedCountry ? selectedCountry.localizedName : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder} className="h-9" />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {countries.map(country => (
                <CommandItem
                  key={country.code}
                  value={country.code}
                  keywords={[country.localizedName, country.code]}
                  onSelect={(currentValue: string) => {
                    onValueChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {country.localizedName}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === country.code ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
