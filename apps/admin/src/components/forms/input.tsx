"use client";

import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
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
        <input
          ref={ref}
          className={`bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
            error ? "border-red-500" : "border-input"
          } ${className}`}
          {...props}
        />
        {error ? <p className="text-sm text-red-500">{error}</p> : null}
      </div>
    );
  }
);

Input.displayName = "Input";
