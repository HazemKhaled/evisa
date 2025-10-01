"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { type Country, type VisaType } from "@repo/database";
import {
  I18nTabs,
  SUPPORTED_LOCALES,
  type Locale,
} from "@/components/forms/i18n-tabs";
import { FormInput, FormTextarea, FormCheckbox } from "@repo/ui";
import { CountrySelect } from "@/components/forms/country-select";
import { ArrayField } from "@/components/forms/array-field";
import {
  createVisaType,
  updateVisaType,
  getVisaTypeWithI18n,
} from "@/actions/visa-types";

const visaTypeI18nSchema = z.object({
  locale: z.string(),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

const visaTypeSchema = z.object({
  destinationCode: z.string().min(2, "Destination is required"),
  type: z.string().min(1, "Type is required"),
  duration: z.coerce.number().min(1, "Duration must be at least 1 day"),
  maxStay: z.coerce.number().optional(),
  processingTime: z.coerce
    .number()
    .min(1, "Processing time must be at least 1 day"),
  fee: z.coerce.number().min(0, "Fee must be at least 0"),
  currency: z.string().default("USD"),
  requiresInterview: z.boolean(),
  isMultiEntry: z.boolean(),
  isActive: z.boolean(),
  i18n: z.array(visaTypeI18nSchema),
});

type VisaTypeFormData = z.infer<typeof visaTypeSchema>;

interface VisaTypeDialogProps {
  open: boolean;
  onClose: () => void;
  visaType?: VisaType | null;
  countries: Country[];
}

export function VisaTypeDialog({
  open,
  onClose,
  visaType,
  countries,
}: VisaTypeDialogProps): React.JSX.Element | null {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [i18nData, setI18nData] = useState<
    Record<string, { name: string; description?: string }>
  >({});
  const [requirements, setRequirements] = useState<string[]>([]);
  const [documents, setDocuments] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(visaTypeSchema),
    defaultValues: {
      destinationCode: "",
      type: "",
      duration: 30,
      maxStay: undefined,
      processingTime: 7,
      fee: 0,
      currency: "USD",
      requiresInterview: false,
      isMultiEntry: false,
      isActive: true,
      i18n: [],
    },
  });

  useEffect(() => {
    if (open && visaType) {
      setIsLoading(true);
      getVisaTypeWithI18n(visaType.id)
        .then(data => {
          if (data) {
            setValue("destinationCode", data.visaType.destinationCode);
            setValue("type", data.visaType.type);
            setValue("duration", data.visaType.duration);
            setValue("maxStay", data.visaType.maxStay ?? undefined);
            setValue("processingTime", data.visaType.processingTime);
            setValue("fee", data.visaType.fee);
            setValue("currency", data.visaType.currency);
            setValue("requiresInterview", data.visaType.requiresInterview);
            setValue("isMultiEntry", data.visaType.isMultiEntry);
            setValue("isActive", data.visaType.isActive);

            setRequirements(data.visaType.requirements ?? []);
            setDocuments(data.visaType.documents ?? []);

            const i18nMap: Record<
              string,
              { name: string; description?: string }
            > = {};
            data.i18n.forEach(item => {
              i18nMap[item.locale] = {
                name: item.name,
                description: item.description ?? undefined,
              };
            });
            setI18nData(i18nMap);
          }
        })
        .finally(() => setIsLoading(false));
    } else if (!open) {
      reset();
      setI18nData({});
      setRequirements([]);
      setDocuments([]);
    }
  }, [open, visaType, reset, setValue]);

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

  const onSubmit = async (data: VisaTypeFormData): Promise<void> => {
    setIsSubmitting(true);

    const i18nArray = Object.entries(i18nData)
      .filter(([, value]) => value.name?.trim())
      .map(([locale, value]) => ({
        locale,
        name: value.name,
        description: value.description,
      }));

    const formData = {
      ...data,
      destinationCode: data.destinationCode.toUpperCase(),
      maxStay: data.maxStay || undefined,
      requirements: requirements.length > 0 ? requirements : undefined,
      documents: documents.length > 0 ? documents : undefined,
      i18n: i18nArray,
    };

    const result = visaType
      ? await updateVisaType({ ...formData, id: visaType.id })
      : await createVisaType(formData);

    setIsSubmitting(false);

    if (result.success) {
      onClose();
    } else {
      alert(result.error ?? "Failed to save visa type");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg p-6 shadow-lg">
        <h2 className="mb-6 text-2xl font-bold">
          {visaType ? "Edit Visa Type" : "Add Visa Type"}
        </h2>

        {isLoading ? (
          <div className="py-8 text-center">Loading...</div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Destination Country
                </label>
                <CountrySelect
                  countries={countries}
                  {...register("destinationCode")}
                  error={errors.destinationCode?.message}
                  placeholder="Select destination"
                />
              </div>
              <FormInput
                label="Visa Type"
                placeholder="e.g., tourist, business, transit"
                {...register("type")}
                error={errors.type?.message}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <FormInput
                label="Duration (days)"
                type="number"
                placeholder="30"
                {...register("duration")}
                error={errors.duration?.message}
              />
              <FormInput
                label="Max Stay (days)"
                type="number"
                placeholder="Optional"
                {...register("maxStay")}
                error={errors.maxStay?.message}
              />
              <FormInput
                label="Processing Time (days)"
                type="number"
                placeholder="7"
                {...register("processingTime")}
                error={errors.processingTime?.message}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="Fee"
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("fee")}
                error={errors.fee?.message}
              />
              <FormInput
                label="Currency"
                placeholder="USD"
                {...register("currency")}
                error={errors.currency?.message}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <FormCheckbox
                label="Requires Interview"
                {...register("requiresInterview")}
              />
              <FormCheckbox label="Multi Entry" {...register("isMultiEntry")} />
              <FormCheckbox label="Active" {...register("isActive")} />
            </div>

            <ArrayField
              label="Requirements"
              value={requirements}
              onChange={setRequirements}
              placeholder="e.g., Valid passport"
            />

            <ArrayField
              label="Required Documents"
              value={documents}
              onChange={setDocuments}
              placeholder="e.g., passport_copy"
            />

            <div>
              <h3 className="mb-4 text-lg font-semibold">
                Multilingual Content
              </h3>
              <I18nTabs>
                {locale => (
                  <div className="space-y-4">
                    <FormInput
                      label="Visa Type Name"
                      placeholder={`Enter name in ${SUPPORTED_LOCALES.find(l => l.code === locale)?.name}`}
                      value={i18nData[locale]?.name ?? ""}
                      onChange={e =>
                        handleI18nChange(locale, "name", e.target.value)
                      }
                    />
                    <FormTextarea
                      label="Description (Optional)"
                      placeholder="Visa description"
                      value={i18nData[locale]?.description ?? ""}
                      onChange={e =>
                        handleI18nChange(locale, "description", e.target.value)
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
                {isSubmitting ? "Saving..." : visaType ? "Update" : "Create"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
