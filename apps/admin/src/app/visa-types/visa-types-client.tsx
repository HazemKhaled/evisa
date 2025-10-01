"use client";

import { useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { type Country, type VisaType } from "@repo/database";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { VisaTypeDialog } from "./visa-type-dialog";
import { deleteVisaType } from "@/actions/visa-types";

interface VisaTypesClientProps {
  visaTypes: VisaType[];
  countries: Country[];
}

export function VisaTypesClient({
  visaTypes,
  countries,
}: VisaTypesClientProps): React.JSX.Element {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingVisaType, setEditingVisaType] = useState<VisaType | null>(null);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const handleEdit = (visaType: VisaType): void => {
    setEditingVisaType(visaType);
    setDialogOpen(true);
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
  };

  const handleDialogClose = (): void => {
    setDialogOpen(false);
    setEditingVisaType(null);
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
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("type")}</div>
      ),
    },
    {
      accessorKey: "duration",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Duration" />
      ),
      cell: ({ row }) => `${row.getValue("duration")} days`,
    },
    {
      accessorKey: "fee",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Fee" />
      ),
      cell: ({ row }) => {
        const fee = row.getValue("fee") as number;
        const currency = row.original.currency;
        return `${currency} ${fee.toFixed(2)}`;
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
      accessorKey: "isMultiEntry",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Entry" />
      ),
      cell: ({ row }) => (row.getValue("isMultiEntry") ? "Multi" : "Single"),
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
        const visaType = row.original;
        const isCurrentlyDeleting = isDeleting === visaType.id;

        return (
          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(visaType)}
              className="text-sm text-blue-600 hover:text-blue-800"
              disabled={isCurrentlyDeleting}
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(visaType.id)}
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
          Add Visa Type
        </button>
      </div>

      <DataTable
        columns={columns}
        data={visaTypes}
        searchKey="type"
        searchPlaceholder="Search by visa type..."
      />

      <VisaTypeDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        visaType={editingVisaType}
        countries={countries}
      />
    </>
  );
}
