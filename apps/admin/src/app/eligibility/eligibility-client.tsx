"use client";

import { useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import {
  type Country,
  type VisaType,
  type VisaEligibility,
} from "@repo/database";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { EligibilityDialog } from "./eligibility-dialog";
import { BulkCreateDialog } from "./bulk-create-dialog";
import {
  deleteEligibility,
  bulkDeleteEligibility,
} from "@/actions/eligibility";
import { format } from "date-fns";

interface EligibilityClientProps {
  eligibilityRules: VisaEligibility[];
  countries: Country[];
  visaTypes: VisaType[];
}

export function EligibilityClient({
  eligibilityRules,
  countries,
  visaTypes,
}: EligibilityClientProps): React.JSX.Element {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [bulkDialogOpen, setBulkDialogOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<VisaEligibility | null>(null);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

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
  };

  const handleBulkDelete = async (): Promise<void> => {
    if (selectedRows.length === 0) {
      alert("Please select rows to delete");
      return;
    }

    if (
      !confirm(
        `Are you sure you want to delete ${selectedRows.length} eligibility rules?`
      )
    ) {
      return;
    }

    const result = await bulkDeleteEligibility(selectedRows);

    if (result.errors.length > 0) {
      alert(
        `Deleted ${result.deleted} rules. Errors:\n${result.errors.join("\n")}`
      );
    } else {
      alert(`Successfully deleted ${result.deleted} rules`);
    }

    setSelectedRows([]);
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
      id: "select",
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllPageRowsSelected()}
          onChange={e => {
            table.toggleAllPageRowsSelected(!!e.target.checked);
            if (e.target.checked) {
              setSelectedRows(
                table.getRowModel().rows.map(row => row.original.id)
              );
            } else {
              setSelectedRows([]);
            }
          }}
          className="border-input h-4 w-4 rounded"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={selectedRows.includes(row.original.id)}
          onChange={e => {
            if (e.target.checked) {
              setSelectedRows([...selectedRows, row.original.id]);
            } else {
              setSelectedRows(
                selectedRows.filter(id => id !== row.original.id)
              );
            }
          }}
          className="border-input h-4 w-4 rounded"
        />
      ),
    },
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
            <button
              onClick={() => handleEdit(rule)}
              className="text-sm text-blue-600 hover:text-blue-800"
              disabled={isCurrentlyDeleting}
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(rule.id)}
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
      <div className="mb-4 flex justify-between">
        <div className="flex gap-2">
          {selectedRows.length > 0 ? (
            <button
              onClick={handleBulkDelete}
              className="bg-background inline-flex h-10 items-center justify-center rounded-md border border-red-600 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
            >
              Delete Selected ({selectedRows.length})
            </button>
          ) : null}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setBulkDialogOpen(true)}
            className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors"
          >
            Bulk Create
          </button>
          <button
            onClick={() => setDialogOpen(true)}
            className="bg-primary text-primary-foreground ring-offset-background hover:bg-primary/90 focus-visible:ring-ring inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Add Eligibility Rule
          </button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={eligibilityRules}
        searchKey="destinationCode"
        searchPlaceholder="Search by destination..."
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
