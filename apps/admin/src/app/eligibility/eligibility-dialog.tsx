"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  type Country,
  type VisaEligibility,
  type VisaType,
} from "@repo/database";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  FormCheckbox,
  FormInput,
  FormSelect,
  FormTextarea,
  toast,
} from "@repo/ui";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  createEligibility,
  getEligibilityWithI18n,
  updateEligibility,
} from "@/actions/eligibility";
import { CountrySelect } from "@/components/forms/country-select";
import {
  I18nTabs,
  type Locale,
  SUPPORTED_LOCALES,
} from "@/components/forms/i18n-tabs";

const eligibilityI18nSchema = z.object({
  locale: z.string(),
  notes: z.string().optional(),
});

const eligibilitySchema = z.object({
  destinationCode: z.string().min(2, "Destination is required"),
  passportCode: z.string().min(2, "Passport country is required"),
  visaTypeId: z.coerce.number().min(1, "Visa type is required"),
  eligibilityStatus: z.string().min(1, "Status is required"),
  maxStayDays: z.coerce.number().optional(),
  isActive: z.boolean(),
  i18n: z.array(eligibilityI18nSchema),
});

type EligibilityFormData = z.infer<typeof eligibilitySchema>;

interface EligibilityDialogProps {
  open: boolean;
  onClose: () => void;
  rule?: VisaEligibility | null;
  countries: Country[];
  visaTypes: VisaType[];
}

const STATUS_OPTIONS = [
  { value: "required", label: "Visa Required" },
  { value: "visa_free", label: "Visa Free" },
  { value: "on_arrival", label: "Visa on Arrival" },
  { value: "eta", label: "eTA Required" },
  { value: "not_allowed", label: "Not Allowed" },
];

export function EligibilityDialog({
  open,
  onClose,
  rule,
  countries,
  visaTypes,
}: EligibilityDialogProps): React.JSX.Element {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [i18nData, setI18nData] = useState<Record<string, { notes?: string }>>(
    {}
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(eligibilitySchema),
    defaultValues: {
      destinationCode: "",
      passportCode: "",
      visaTypeId: 0,
      eligibilityStatus: "required",
      maxStayDays: undefined,
      isActive: true,
      i18n: [],
    },
  });

  // Note: React Hook Form's watch() is incompatible with React Compiler memoization.
  // This is expected behavior and doesn't affect functionality.
  const selectedDestination = watch("destinationCode");
  const destinationVisaTypes = visaTypes.filter(
    vt => vt.destinationCode === selectedDestination
  );

  useEffect(() => {
    if (open && rule) {
      setIsLoading(true);
      getEligibilityWithI18n(rule.id)
        .then(data => {
          if (data) {
            setValue("destinationCode", data.eligibility.destinationCode);
            setValue("passportCode", data.eligibility.passportCode);
            setValue("visaTypeId", data.eligibility.visaTypeId);
            setValue("eligibilityStatus", data.eligibility.eligibilityStatus);
            setValue("maxStayDays", data.eligibility.maxStayDays ?? undefined);
            setValue("isActive", data.eligibility.isActive);

            const i18nMap: Record<string, { notes?: string }> = {};
            data.i18n.forEach(item => {
              i18nMap[item.locale] = {
                notes: item.notes ?? undefined,
              };
            });
            setI18nData(i18nMap);
          }
        })
        .finally(() => setIsLoading(false));
    } else if (!open) {
      reset();
      setI18nData({});
    }
  }, [open, rule, reset, setValue]);

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

  const onSubmit = async (data: EligibilityFormData): Promise<void> => {
    setIsSubmitting(true);

    const i18nArray = Object.entries(i18nData)
      .filter(([, value]) => value.notes?.trim())
      .map(([locale, value]) => ({
        locale,
        notes: value.notes,
      }));

    const formData = {
      ...data,
      destinationCode: data.destinationCode.toUpperCase(),
      passportCode: data.passportCode.toUpperCase(),
      maxStayDays: data.maxStayDays || undefined,
      i18n: i18nArray,
    };

    const result = rule
      ? await updateEligibility({ ...formData, id: rule.id })
      : await createEligibility(formData);

    setIsSubmitting(false);

    if (result.success) {
      onClose();
    } else {
      toast.error(result.error ?? "Failed to save eligibility rule");
    }
  };

  return (
    <Dialog open={open} onOpenChange={isOpen => !isOpen && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {rule ? "Edit Eligibility Rule" : "Add Eligibility Rule"}
          </DialogTitle>
        </DialogHeader>

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
                  disabled={!!rule}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Passport Country
                </label>
                <CountrySelect
                  countries={countries}
                  {...register("passportCode")}
                  error={errors.passportCode?.message}
                  placeholder="Select passport country"
                  disabled={!!rule}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormSelect
                label="Visa Type"
                options={destinationVisaTypes.map(vt => ({
                  value: vt.id.toString(),
                  label: `${vt.type} (${vt.duration} days)`,
                }))}
                placeholder="Select visa type"
                {...register("visaTypeId")}
                error={errors.visaTypeId?.message}
                disabled={!!rule || !selectedDestination}
              />

              <FormSelect
                label="Eligibility Status"
                options={STATUS_OPTIONS}
                {...register("eligibilityStatus")}
                error={errors.eligibilityStatus?.message}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="Max Stay (days) - Optional"
                type="number"
                placeholder="e.g., 90"
                {...register("maxStayDays")}
                error={errors.maxStayDays?.message}
              />
              <div className="flex items-end pb-2">
                <FormCheckbox label="Active" {...register("isActive")} />
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold">
                Additional Notes (Optional)
              </h3>
              <I18nTabs>
                {locale => (
                  <div className="space-y-4">
                    <FormTextarea
                      label={`Notes in ${SUPPORTED_LOCALES.find(l => l.code === locale)?.name}`}
                      placeholder="Additional information about this eligibility rule"
                      value={i18nData[locale]?.notes ?? ""}
                      onChange={e =>
                        handleI18nChange(locale, "notes", e.target.value)
                      }
                      rows={4}
                    />
                  </div>
                )}
              </I18nTabs>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : rule ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
