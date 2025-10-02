"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { type ColumnDef } from "@tanstack/react-table";
import { type VisaType, type Country } from "@repo/database";
import { Button } from "@repo/ui";
import { EnhancedDataTable } from "@/components/data-table/enhanced-data-table";
import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { deleteVisaType } from "@/actions/visa-types";

interface PaginatedVisaTypes {
  data: VisaType[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

interface VisaTypesClientProps {
  paginatedData: PaginatedVisaTypes;
  countries: Country[];
}

export function VisaTypesClient({
  paginatedData,
  countries: _countries,
}: VisaTypesClientProps): React.JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const currentSearch = searchParams.get("search") || "";

  const handlePageChange = (page: number): void => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page + 1));
    startTransition(() => {
      router.push(`/visa-types?${params.toString()}`);
    });
  };

  const handlePageSizeChange = (pageSize: number): void => {
    const params = new URLSearchParams(searchParams);
    params.set("pageSize", String(pageSize));
    params.set("page", "1");
    startTransition(() => {
      router.push(`/visa-types?${params.toString()}`);
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
      router.push(`/visa-types?${params.toString()}`);
    });
  };

  const handleDelete = async (id: number): Promise<void> => {
    if (!confirm("Are you sure you want to delete this visa type?")) {
      return;
    }

    setIsDeleting(id);
    const result = await deleteVisaType(id);

    if (!result.success) {
      alert(result.error ?? "Failed to delete visa type");
    }

    setIsDeleting(null);
    router.refresh();
  };

  const columns: ColumnDef<VisaType>[] = [
    {
      accessorKey: "destinationCode",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Destination" />
      ),
      cell: ({ row }) => (
        <div className="font-mono font-medium">
          {row.getValue("destinationCode")}
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Type" />
      ),
    },
    {
      accessorKey: "duration",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Duration (days)" />
      ),
      cell: ({ row }) => `${row.getValue("duration")} days`,
    },
    {
      accessorKey: "fee",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Fee" />
      ),
      cell: ({ row }) => {
        const visa = row.original;
        return `${visa.currency || "USD"} ${visa.fee}`;
      },
    },
    {
      accessorKey: "processingTime",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Processing" />
      ),
      cell: ({ row }) => `${row.getValue("processingTime")} days`,
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
      id: "actions",
      cell: ({ row }) => {
        const visa = row.original;
        const isCurrentlyDeleting = isDeleting === visa.id;

        return (
          <div className="flex gap-2">
            <Button
              onClick={() => handleDelete(visa.id)}
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
      <EnhancedDataTable
        columns={columns}
        data={paginatedData.data}
        pageCount={paginatedData.totalPages}
        pageIndex={paginatedData.page - 1}
        pageSize={paginatedData.pageSize}
        total={paginatedData.total}
        searchValue={currentSearch}
        searchPlaceholder="Search by destination, type, or currency..."
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        onSearchChange={handleSearchChange}
      />
    </>
  );
}
