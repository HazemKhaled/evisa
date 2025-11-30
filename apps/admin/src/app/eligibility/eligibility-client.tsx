"use client";

import {
  type Country,
  type VisaEligibility,
  type VisaType,
} from "@repo/database";
import { Button } from "@repo/ui";
import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

import { deleteEligibility } from "@/actions/eligibility";
import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { EnhancedDataTable } from "@/components/data-table/enhanced-data-table";

import { BulkCreateDialog } from "./bulk-create-dialog";
import { EligibilityDialog } from "./eligibility-dialog";

interface PaginatedEligibility {
  data: VisaEligibility[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

interface EligibilityClientProps {
  paginatedData: PaginatedEligibility;
  countries: Country[];
  visaTypes: VisaType[];
}

export function EligibilityClient({
  paginatedData,
  countries,
  visaTypes,
}: EligibilityClientProps): React.JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [bulkDialogOpen, setBulkDialogOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<VisaEligibility | null>(null);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const currentSearch = searchParams.get("search") || "";

  const handlePageChange = (page: number): void => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page + 1));
    startTransition(() => {
      router.push(`/eligibility?${params.toString()}`);
    });
  };

  const handlePageSizeChange = (pageSize: number): void => {
    const params = new URLSearchParams(searchParams);
    params.set("pageSize", String(pageSize));
    params.set("page", "1");
    startTransition(() => {
      router.push(`/eligibility?${params.toString()}`);
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
      router.push(`/eligibility?${params.toString()}`);
    });
  };

  const handleEdit = (rule: VisaEligibility): void => {
    setEditingRule(rule);
    setDialogOpen(true);
  };

  const handleDelete = async (id: number): Promise<void> => {
    if (!confirm("Are you sure you want to delete this eligibility rule?")) {
      return;
    }

    setIsDeleting(id);
    const result = await deleteEligibility(id);

    if (!result.success) {
      alert(result.error ?? "Failed to delete eligibility rule");
    }

    setIsDeleting(null);
    router.refresh();
  };

  const handleDialogClose = (): void => {
    setDialogOpen(false);
    setEditingRule(null);
  };

  const getStatusBadge = (status: string): React.JSX.Element => {
    const colors: Record<string, string> = {
      required: "bg-red-100 text-red-800",
      visa_free: "bg-green-100 text-green-800",
      on_arrival: "bg-blue-100 text-blue-800",
      eta: "bg-yellow-100 text-yellow-800",
      not_allowed: "bg-gray-100 text-gray-800",
    };

    return (
      <span
        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${colors[status] ?? "bg-gray-100 text-gray-800"}`}
      >
        {status.replace("_", " ").toUpperCase()}
      </span>
    );
  };

  const columns: ColumnDef<VisaEligibility>[] = [
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
      accessorKey: "passportCode",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Passport" />
      ),
      cell: ({ row }) => (
        <div className="font-mono font-medium">
          {row.getValue("passportCode")}
        </div>
      ),
    },
    {
      accessorKey: "visaTypeId",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Visa Type" />
      ),
      cell: ({ row }) => {
        const visaType = visaTypes.find(
          vt => vt.id === row.getValue("visaTypeId")
        );
        return visaType ? (
          <div className="capitalize">{visaType.type}</div>
        ) : (
          <div>—</div>
        );
      },
    },
    {
      accessorKey: "eligibilityStatus",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => getStatusBadge(row.getValue("eligibilityStatus")),
    },
    {
      accessorKey: "maxStayDays",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Max Stay" />
      ),
      cell: ({ row }) => {
        const days = row.getValue("maxStayDays") as number | null;
        return days ? `${days} days` : "—";
      },
    },
    {
      accessorKey: "lastUpdated",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Last Updated" />
      ),
      cell: ({ row }) =>
        format(new Date(row.getValue("lastUpdated")), "MMM d, yyyy"),
    },
    {
      accessorKey: "isActive",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Active" />
      ),
      cell: ({ row }) => (
        <span
          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
            row.getValue("isActive")
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {row.getValue("isActive") ? "Yes" : "No"}
        </span>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const rule = row.original;
        const isCurrentlyDeleting = isDeleting === rule.id;

        return (
          <div className="flex gap-2">
            <Button
              onClick={() => handleEdit(rule)}
              variant="ghost"
              size="sm"
              disabled={isCurrentlyDeleting}
            >
              Edit
            </Button>
            <Button
              onClick={() => handleDelete(rule.id)}
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
      <div className="mb-4 flex justify-end gap-2">
        <Button onClick={() => setBulkDialogOpen(true)} variant="outline">
          Bulk Create
        </Button>
        <Button onClick={() => setDialogOpen(true)}>
          Add Eligibility Rule
        </Button>
      </div>

      <EnhancedDataTable
        columns={columns}
        data={paginatedData.data}
        pageCount={paginatedData.totalPages}
        pageIndex={paginatedData.page - 1}
        pageSize={paginatedData.pageSize}
        total={paginatedData.total}
        searchValue={currentSearch}
        searchPlaceholder="Search by destination, passport, or status..."
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        onSearchChange={handleSearchChange}
      />

      <EligibilityDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        rule={editingRule}
        countries={countries}
        visaTypes={visaTypes}
      />

      <BulkCreateDialog
        open={bulkDialogOpen}
        onClose={() => setBulkDialogOpen(false)}
        countries={countries}
        visaTypes={visaTypes}
      />
    </>
  );
}
