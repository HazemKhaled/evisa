"use client";

import { cn } from "@repo/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

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
          className={cn(
            "w-full justify-between font-normal",
            "transition-all duration-200",
            "hover:bg-accent/80 hover:border-primary/20",
            !selectedCountry && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <span className="truncate">
            {selectedCountry ? selectedCountry.localizedName : placeholder}
          </span>
          <ChevronsUpDown
            className={cn(
              "ml-2 h-4 w-4 shrink-0 opacity-50 transition-transform duration-200",
              open && "rotate-180"
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "w-[--radix-popover-trigger-width] p-0",
          "shadow-xl shadow-black/10",
          "border-border/60 border",
          "bg-popover/95 backdrop-blur-md"
        )}
        align="start"
        sideOffset={4}
      >
        <Command>
          <CommandInput
            placeholder={searchPlaceholder}
            className="h-10 border-0 focus:ring-0"
          />
          <CommandList className="max-h-60">
            <CommandEmpty className="text-muted-foreground py-6 text-center text-sm">
              {emptyText}
            </CommandEmpty>
            <CommandGroup className="p-1.5">
              {countries.map(country => {
                const isSelected = value === country.code;
                return (
                  <CommandItem
                    key={country.code}
                    value={country.code}
                    keywords={[country.localizedName, country.code]}
                    onSelect={(currentValue: string) => {
                      onValueChange(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                    className={cn(
                      "cursor-pointer rounded-lg px-3 py-2.5",
                      "transition-colors duration-150 ease-out",
                      isSelected && "bg-primary/10 text-primary font-medium"
                    )}
                  >
                    <span className="truncate">{country.localizedName}</span>
                    <Check
                      className={cn(
                        "text-primary ml-auto h-4 w-4",
                        isSelected ? "opacity-100" : "opacity-0"
                      )}
                      strokeWidth={2.5}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
