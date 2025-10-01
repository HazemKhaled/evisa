"use client";

import { forwardRef } from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className = "", ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label ? (
          <label
            htmlFor={props.id}
            className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        ) : null}
        <select
          ref={ref}
          className={`bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
            error ? "border-red-500" : "border-input"
          } ${className}`}
          {...props}
        >
          {placeholder ? <option value="">{placeholder}</option> : null}
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error ? <p className="text-sm text-red-500">{error}</p> : null}
      </div>
    );
  }
);

Select.displayName = "Select";
