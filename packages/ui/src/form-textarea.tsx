"use client";

import { cn } from "@repo/utils";
import * as React from "react";

import { Label } from "./label";
import { Textarea } from "./textarea";

export interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    // Generate a unique id unconditionally (React Hooks rule)
    const generatedId = React.useId();
    const textareaId = id ?? generatedId;

    return (
      <div className="space-y-2">
        {label ? <Label htmlFor={textareaId}>{label}</Label> : null}
        <Textarea
          ref={ref}
          id={textareaId}
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

FormTextarea.displayName = "FormTextarea";

export { FormTextarea };
