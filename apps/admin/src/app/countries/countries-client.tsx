"use client";

import { type Country } from "@repo/database";
import { Button } from "@repo/ui";
import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

import { deleteCountry } from "@/actions/countries";
import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { EnhancedDataTable } from "@/components/data-table/enhanced-data-table";

import { CountryDialog } from "./country-dialog";

interface PaginatedCountries {
  data: Country[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

interface CountriesClientProps {
  paginatedData: PaginatedCountries;
}

export function CountriesClient({
  paginatedData,
}: CountriesClientProps): React.JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCountry, setEditingCountry] = useState<Country | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const currentSearch = searchParams.get("search") || "";

  const handlePageChange = (page: number): void => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page + 1));
    startTransition(() => {
      router.push(`/countries?${params.toString()}`);
    });
  };

  const handlePageSizeChange = (pageSize: number): void => {
    const params = new URLSearchParams(searchParams);
    params.set("pageSize", String(pageSize));
    params.set("page", "1");
    startTransition(() => {
      router.push(`/countries?${params.toString()}`);
    });
  };

  const handleSearchChange = (search: string): void => {
    const params = new URLSearchParams(searchParams);
    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    startTransition(() => {
      router.push(`/countries?${params.toString()}`);
    });
  };

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
    router.refresh();
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
            <Button
              onClick={() => handleEdit(country)}
              variant="ghost"
              size="sm"
              disabled={isCurrentlyDeleting}
            >
              Edit
            </Button>
            <Button
              onClick={() => handleDelete(country.code)}
              variant="ghost"
              size="sm"
              disabled={isCurrentlyDeleting}
            >
              {isCurrentlyDeleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="mb-4 flex justify-end">
        <Button onClick={() => setDialogOpen(true)}>Add Country</Button>
      </div>

      <EnhancedDataTable
        columns={columns}
        data={paginatedData.data}
        pageCount={paginatedData.totalPages}
        pageIndex={paginatedData.page - 1}
        pageSize={paginatedData.pageSize}
        total={paginatedData.total}
        searchValue={currentSearch}
        searchPlaceholder="Search by country code..."
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        onSearchChange={handleSearchChange}
      />

      <CountryDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        country={editingCountry}
      />
    </>
  );
}
