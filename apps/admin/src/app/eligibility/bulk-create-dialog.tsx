"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { type Country, type VisaType } from "@repo/database";
import { FormInput, FormSelect, FormCheckbox } from "@repo/ui";
import { CountrySelect } from "@/components/forms/country-select";
import { bulkCreateEligibility } from "@/actions/eligibility";

const bulkCreateSchema = z.object({
  destinationCode: z.string().min(2, "Destination is required"),
  visaTypeId: z.coerce.number().min(1, "Visa type is required"),
  eligibilityStatus: z.string().min(1, "Status is required"),
  maxStayDays: z.coerce.number().optional(),
  isActive: z.boolean(),
  passportCodes: z.string().min(1, "At least one passport country is required"),
});

type BulkCreateFormData = z.infer<typeof bulkCreateSchema>;

interface BulkCreateDialogProps {
  open: boolean;
  onClose: () => void;
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

export function BulkCreateDialog({
  open,
  onClose,
  countries,
  visaTypes,
}: BulkCreateDialogProps): React.JSX.Element | null {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPassports, setSelectedPassports] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(bulkCreateSchema),
    defaultValues: {
      destinationCode: "",
      visaTypeId: 0,
      eligibilityStatus: "required",
      maxStayDays: undefined,
      isActive: true,
      passportCodes: "",
    },
  });

  // Note: React Hook Form's watch() is incompatible with React Compiler memoization.
  // This is expected behavior and doesn't affect functionality.
  // eslint-disable-next-line react-hooks/incompatible-library
  const selectedDestination = watch("destinationCode");
  const destinationVisaTypes = visaTypes.filter(
    vt => vt.destinationCode === selectedDestination
  );

  const handlePassportToggle = (code: string): void => {
    setSelectedPassports(prev =>
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    );
  };

  const handleSelectAll = (): void => {
    setSelectedPassports(countries.map(c => c.code));
  };

  const handleClearAll = (): void => {
    setSelectedPassports([]);
  };

  const onSubmit = async (data: BulkCreateFormData): Promise<void> => {
    if (selectedPassports.length === 0) {
      alert("Please select at least one passport country");
      return;
    }

    setIsSubmitting(true);

    const formData = {
      destinationCode: data.destinationCode.toUpperCase(),
      passportCodes: selectedPassports,
      visaTypeId: data.visaTypeId,
      eligibilityStatus: data.eligibilityStatus,
      maxStayDays: data.maxStayDays || undefined,
      isActive: data.isActive,
    };

    const result = await bulkCreateEligibility(formData);

    setIsSubmitting(false);

    if (result.success) {
      alert(
        `Successfully created ${result.created} eligibility rules${result.errors.length > 0 ? `\n\nErrors:\n${result.errors.join("\n")}` : ""}`
      );
      onClose();
      reset();
      setSelectedPassports([]);
    } else {
      alert(`Failed to create rules:\n${result.errors.join("\n")}`);
    }
  };

  const handleClose = (): void => {
    onClose();
    reset();
    setSelectedPassports([]);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg p-6 shadow-lg">
        <h2 className="mb-6 text-2xl font-bold">
          Bulk Create Eligibility Rules
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <p className="text-sm text-blue-800">
              <strong>Bulk Create:</strong> This will create multiple
              eligibility rules at once for the selected destination, visa type,
              and all selected passport countries.
            </p>
          </div>

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

            <FormSelect
              label="Visa Type"
              options={destinationVisaTypes.map(vt => ({
                value: vt.id.toString(),
                label: `${vt.type} (${vt.duration} days, ${vt.currency} ${vt.fee})`,
              }))}
              placeholder="Select visa type"
              {...register("visaTypeId")}
              error={errors.visaTypeId?.message}
              disabled={!selectedDestination}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormSelect
              label="Eligibility Status"
              options={STATUS_OPTIONS}
              {...register("eligibilityStatus")}
              error={errors.eligibilityStatus?.message}
            />

            <FormInput
              label="Max Stay (days) - Optional"
              type="number"
              placeholder="e.g., 90"
              {...register("maxStayDays")}
              error={errors.maxStayDays?.message}
            />
          </div>

          <div className="flex items-center gap-2">
            <FormCheckbox label="Active" {...register("isActive")} />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">
                Select Passport Countries ({selectedPassports.length} selected)
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Select All
                </button>
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Clear All
                </button>
              </div>
            </div>

            <div className="max-h-64 overflow-y-auto rounded-lg border p-4">
              <div className="grid grid-cols-3 gap-2">
                {countries.map(country => (
                  <label
                    key={country.code}
                    className="hover:bg-accent flex items-center space-x-2 rounded p-2"
                  >
                    <input
                      type="checkbox"
                      checked={selectedPassports.includes(country.code)}
                      onChange={() => handlePassportToggle(country.code)}
                      className="border-input h-4 w-4 rounded"
                    />
                    <span className="text-sm">
                      {country.code} - {country.continent}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={handleClose}
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
              {isSubmitting
                ? "Creating..."
                : `Create ${selectedPassports.length} Rules`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
