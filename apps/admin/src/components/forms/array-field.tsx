"use client";

import { useState } from "react";

interface ArrayFieldProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  error?: string;
}

export function ArrayField({
  label,
  value,
  onChange,
  placeholder = "Enter item",
  error,
}: ArrayFieldProps): React.JSX.Element {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = (): void => {
    if (inputValue.trim()) {
      onChange([...value, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemove = (index: number): void => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="bg-primary text-primary-foreground ring-offset-background hover:bg-primary/90 focus-visible:ring-ring inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          Add
        </button>
      </div>
      {value.length > 0 ? (
        <ul className="space-y-2">
          {value.map((item, index) => (
            <li
              key={`${item}-${index}`}
              className="border-input bg-background flex items-center justify-between rounded-md border px-3 py-2"
            >
              <span className="text-sm">{item}</span>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {error ? <p className="text-sm text-red-500">{error}</p> : null}
    </div>
  );
}
