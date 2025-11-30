"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormCheckbox, FormInput, FormSelect, FormTextarea } from "@repo/ui";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  createCountry,
  getCountryWithI18n,
  updateCountry,
} from "@/actions/countries";
import {
  I18nTabs,
  type Locale,
  SUPPORTED_LOCALES,
} from "@/components/forms/i18n-tabs";

const countryI18nSchema = z.object({
  locale: z.string(),
  name: z.string().min(1, "Name is required"),
  name_long: z.string().optional(),
  about: z.string().optional(),
});

const countrySchema = z.object({
  code: z
    .string()
    .min(2, "Country code must be at least 2 characters")
    .max(2, "Country code must be 2 characters"),
  continent: z.string().min(1, "Continent is required"),
  region: z.string().optional(),
  heroImage: z.string().url().optional().or(z.literal("")),
  isActive: z.boolean(),
  i18n: z.array(countryI18nSchema),
});

type CountryFormData = z.infer<typeof countrySchema>;

interface CountryDialogProps {
  open: boolean;
  onClose: () => void;
  country?: {
    code: string;
    continent: string;
    region: string | null;
    heroImage: string | null;
    isActive: boolean;
  } | null;
}

const CONTINENTS = [
  { value: "Africa", label: "Africa" },
  { value: "Asia", label: "Asia" },
  { value: "Europe", label: "Europe" },
  { value: "North America", label: "North America" },
  { value: "South America", label: "South America" },
  { value: "Oceania", label: "Oceania" },
  { value: "Antarctica", label: "Antarctica" },
];

export function CountryDialog({
  open,
  onClose,
  country,
}: CountryDialogProps): React.JSX.Element | null {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [i18nData, setI18nData] = useState<
    Record<string, { name: string; name_long?: string; about?: string }>
  >({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(countrySchema),
    defaultValues: {
      code: "",
      continent: "",
      region: "",
      heroImage: "",
      isActive: true,
      i18n: [],
    },
  });

  useEffect(() => {
    if (open && country) {
      let cancelled = false;

      void (async () => {
        setIsLoading(true);
        try {
          const data = await getCountryWithI18n(country.code);
          if (!cancelled && data) {
            setValue("code", data.country.code);
            setValue("continent", data.country.continent);
            setValue("region", data.country.region ?? "");
            setValue("heroImage", data.country.heroImage ?? "");
            setValue("isActive", data.country.isActive);

            const i18nMap: Record<
              string,
              { name: string; name_long?: string; about?: string }
            > = {};
            data.i18n.forEach(item => {
              i18nMap[item.locale] = {
                name: item.name,
                name_long: item.name_long ?? undefined,
                about: item.about ?? undefined,
              };
            });
            setI18nData(i18nMap);
          }
        } finally {
          if (!cancelled) {
            setIsLoading(false);
          }
        }
      })();

      return () => {
        cancelled = true;
      };
    } else if (!open) {
      reset();
      setI18nData({});
    }
  }, [open, country, reset, setValue]);

  const handleI18nChange = (
    locale: Locale,
    field: string,
    value: string
  ): void => {
    setI18nData(prev => ({
      ...prev,
      [locale]: {
        ...prev[locale],
        [field]: value,
      },
    }));
  };

  const onSubmit = async (data: CountryFormData): Promise<void> => {
    setIsSubmitting(true);

    const i18nArray = Object.entries(i18nData)
      .filter(([, value]) => value.name?.trim())
      .map(([locale, value]) => ({
        locale,
        name: value.name,
        name_long: value.name_long,
        about: value.about,
      }));

    const formData = {
      ...data,
      code: data.code.toUpperCase(),
      region: data.region || undefined,
      heroImage: data.heroImage || undefined,
      i18n: i18nArray,
    };

    const result = country
      ? await updateCountry({ ...formData, originalCode: country.code })
      : await createCountry(formData);

    setIsSubmitting(false);

    if (result.success) {
      onClose();
    } else {
      alert(result.error ?? "Failed to save country");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg p-6 shadow-lg">
        <h2 className="mb-6 text-2xl font-bold">
          {country ? "Edit Country" : "Add Country"}
        </h2>

        {isLoading ? (
          <div className="py-8 text-center">Loading...</div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="Country Code (ISO 3166-1 alpha-2)"
                placeholder="US"
                {...register("code")}
                error={errors.code?.message}
                disabled={!!country}
              />
              <FormSelect
                label="Continent"
                options={CONTINENTS}
                placeholder="Select continent"
                {...register("continent")}
                error={errors.continent?.message}
              />
            </div>

            <FormInput
              label="Region"
              placeholder="e.g., Western Europe, Southeast Asia"
              {...register("region")}
              error={errors.region?.message}
            />

            <FormInput
              label="Hero Image URL"
              placeholder="https://..."
              type="url"
              {...register("heroImage")}
              error={errors.heroImage?.message}
            />

            <FormCheckbox label="Active" {...register("isActive")} />

            <div>
              <h3 className="mb-4 text-lg font-semibold">
                Multilingual Content
              </h3>
              <I18nTabs>
                {locale => (
                  <div className="space-y-4">
                    <FormInput
                      label="Country Name"
                      placeholder={`Enter country name in ${SUPPORTED_LOCALES.find(l => l.code === locale)?.name}`}
                      value={i18nData[locale]?.name ?? ""}
                      onChange={e =>
                        handleI18nChange(locale, "name", e.target.value)
                      }
                    />
                    <FormInput
                      label="Official/Long Name (Optional)"
                      placeholder="e.g., United States of America"
                      value={i18nData[locale]?.name_long ?? ""}
                      onChange={e =>
                        handleI18nChange(locale, "name_long", e.target.value)
                      }
                    />
                    <FormTextarea
                      label="About (Optional)"
                      placeholder="2-line catchy description"
                      value={i18nData[locale]?.about ?? ""}
                      onChange={e =>
                        handleI18nChange(locale, "about", e.target.value)
                      }
                      rows={3}
                    />
                  </div>
                )}
              </I18nTabs>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md border px-4 py-2 text-sm font-medium"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : country ? "Update" : "Create"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
