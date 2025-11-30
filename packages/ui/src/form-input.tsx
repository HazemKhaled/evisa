"use client";

import { cn } from "@repo/utils";
import * as React from "react";

import { Input } from "./input";
import { Label } from "./label";

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    // Generate a unique id unconditionally (React Hooks rule)
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    return (
      <div className="space-y-2">
        {label ? <Label htmlFor={inputId}>{label}</Label> : null}
        <Input
          ref={ref}
          id={inputId}
          className={cn(error ? "border-red-500" : "", className)}
          {...props}
        />
        {error ? (
          <p className="text-sm text-red-500" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export { FormInput };
