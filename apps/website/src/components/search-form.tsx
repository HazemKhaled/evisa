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

  // WebMCP tool activated event listener to sync state from pre-filled DOM elements
  React.useEffect(() => {
    const handleToolActivated = (e: Event) => {
      const customEvent = e as CustomEvent<{ toolName: string }> & {
        toolName?: string;
      };
      const toolName = customEvent.detail?.toolName || customEvent.toolName;
      if (toolName === "check_visa_eligibility_form") {
        const passportInput = document.getElementsByName(
          "passportCountry"
        )[0] as HTMLInputElement;
        const destinationInput = document.getElementsByName(
          "destinationCountry"
        )[0] as HTMLInputElement;
        if (passportInput?.value) {
          setPassportCountry(passportInput.value);
        }
        if (destinationInput?.value) {
          setDestinationCountry(destinationInput.value);
        }
      }
    };

    window.addEventListener("toolactivated", handleToolActivated);
    return () => {
      window.removeEventListener("toolactivated", handleToolActivated);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Cast to access WebMCP specific submit event details
    const nativeEvent = e.nativeEvent as SubmitEvent & {
      agentInvoked?: boolean;
      respondWith?: (promise: Promise<unknown>) => void;
    };

    if (
      nativeEvent.agentInvoked &&
      typeof nativeEvent.respondWith === "function"
    ) {
      const fetchEligibility = async () => {
        try {
          const res = await fetch(
            `/api/eligibility?passport=${encodeURIComponent(passportCountry || "")}&destination=${encodeURIComponent(destinationCountry || "")}`
          );
          if (!res.ok) {
            const errData = (await res.json().catch(() => ({}))) as Record<
              string,
              unknown
            >;
            return {
              error:
                errData.error ||
                `Eligibility request failed with status ${res.status}`,
            };
          }
          return await res.json();
        } catch (err) {
          return {
            error:
              err instanceof Error
                ? err.message
                : "Failed to fetch eligibility data",
          };
        }
      };
      nativeEvent.respondWith(fetchEligibility());
    } else {
      // Standard human submission behavior: redirect if fields are selected
      if (passportCountry && destinationCountry) {
        const locale =
          typeof document !== "undefined"
            ? document.documentElement.lang || "en"
            : "en";
        window.location.href = `/${locale}/d/${destinationCountry.toLowerCase()}?passport=${passportCountry.toLowerCase()}`;
      }
    }
  };

  return (
    <div className="mx-auto mb-8 max-w-3xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          {searchTitle}
        </h2>
        <form
          onSubmit={handleSubmit}
          toolname="check_visa_eligibility_form"
          tooldescription="Check visa requirements and eligibility between a passport country and destination country."
          toolautosubmit="true"
        >
          {/* Declarative WebMCP parameters */}
          <input
            type="hidden"
            name="passportCountry"
            value={passportCountry}
            onChange={e => setPassportCountry(e.target.value)}
            toolparamdescription="The ISO 2-letter country code of the passport holder"
          />
          <input
            type="hidden"
            name="destinationCountry"
            value={destinationCountry}
            onChange={e => setDestinationCountry(e.target.value)}
            toolparamdescription="The ISO 2-letter country code of the destination country"
          />

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
