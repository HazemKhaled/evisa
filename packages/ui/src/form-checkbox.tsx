"use client";

import * as React from "react";

import { Checkbox } from "./checkbox";
import { Label } from "./label";

export interface FormCheckboxProps {
  label?: string;
  error?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  name?: string;
  className?: string;
}

const FormCheckbox = React.forwardRef<
  React.ElementRef<typeof Checkbox>,
  FormCheckboxProps
>(
  (
    {
      label,
      error,
      checked,
      onCheckedChange,
      disabled,
      id,
      className,
      ...props
    },
    ref
  ) => {
    // Generate a unique id unconditionally (React Hooks rule)
    const generatedId = React.useId();
    const checkboxId = id ?? generatedId;

    return (
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            ref={ref}
            id={checkboxId}
            checked={checked}
            onCheckedChange={onCheckedChange}
            disabled={disabled}
            className={className}
            {...props}
          />
          {label ? (
            <Label
              htmlFor={checkboxId}
              className="cursor-pointer leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
            </Label>
          ) : null}
        </div>
        {error ? (
          <p className="text-sm text-red-500" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    );
  }
);

FormCheckbox.displayName = "FormCheckbox";

export { FormCheckbox };
