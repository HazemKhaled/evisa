"use client";

import { type Column } from "@tanstack/react-table";

interface DataTableColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
}: DataTableColumnHeaderProps<TData, TValue>): React.JSX.Element {
  if (!column.getCanSort()) {
    return <div>{title}</div>;
  }

  return (
    <button
      className="hover:text-foreground flex items-center space-x-2"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      <span>{title}</span>
      <span className="text-xs">
        {column.getIsSorted() === "asc"
          ? "↑"
          : column.getIsSorted() === "desc"
            ? "↓"
            : "↕"}
      </span>
    </button>
  );
}
