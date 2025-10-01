"use client";

import { forwardRef } from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <input
            ref={ref}
            type="checkbox"
            className={`border-input ring-offset-background focus-visible:ring-ring h-4 w-4 rounded focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            {...props}
          />
          {label ? (
            <label
              htmlFor={props.id}
              className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
            </label>
          ) : null}
        </div>
        {error ? <p className="text-sm text-red-500">{error}</p> : null}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
