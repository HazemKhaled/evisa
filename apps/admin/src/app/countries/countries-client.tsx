"use client";

import { useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { type Country } from "@repo/database";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { CountryDialog } from "./country-dialog";
import { deleteCountry } from "@/actions/countries";
import { format } from "date-fns";

interface CountriesClientProps {
  countries: Country[];
}

export function CountriesClient({
  countries,
}: CountriesClientProps): React.JSX.Element {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCountry, setEditingCountry] = useState<Country | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleEdit = (country: Country): void => {
    setEditingCountry(country);
    setDialogOpen(true);
  };

  const handleDelete = async (code: string): Promise<void> => {
    if (!confirm("Are you sure you want to delete this country?")) {
      return;
    }

    setIsDeleting(code);
    const result = await deleteCountry(code);

    if (!result.success) {
      alert(result.error ?? "Failed to delete country");
    }

    setIsDeleting(null);
  };

  const handleDialogClose = (): void => {
    setDialogOpen(false);
    setEditingCountry(null);
  };

  const columns: ColumnDef<Country>[] = [
    {
      accessorKey: "code",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Code" />
      ),
      cell: ({ row }) => (
        <div className="font-mono font-medium">{row.getValue("code")}</div>
      ),
    },
    {
      accessorKey: "continent",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Continent" />
      ),
    },
    {
      accessorKey: "region",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Region" />
      ),
      cell: ({ row }) => row.getValue("region") ?? "—",
    },
    {
      accessorKey: "isActive",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => (
        <span
          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
            row.getValue("isActive")
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {row.getValue("isActive") ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created" />
      ),
      cell: ({ row }) =>
        format(new Date(row.getValue("createdAt")), "MMM d, yyyy"),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const country = row.original;
        const isCurrentlyDeleting = isDeleting === country.code;

        return (
          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(country)}
              className="text-sm text-blue-600 hover:text-blue-800"
              disabled={isCurrentlyDeleting}
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(country.code)}
              className="text-sm text-red-600 hover:text-red-800 disabled:opacity-50"
              disabled={isCurrentlyDeleting}
            >
              {isCurrentlyDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setDialogOpen(true)}
          className="bg-primary text-primary-foreground ring-offset-background hover:bg-primary/90 focus-visible:ring-ring inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          Add Country
        </button>
      </div>

      <DataTable
        columns={columns}
        data={countries}
        searchKey="code"
        searchPlaceholder="Search by country code..."
      />

      <CountryDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        country={editingCountry}
      />
    </>
  );
}
