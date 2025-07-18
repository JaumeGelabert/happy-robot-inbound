"use client";

import { Run } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<Run>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-left">ID</div>,
    cell: ({ row }) => {
      const firstFive = row.original.id.slice(0, 5);
      const lastFive = row.original.id.slice(-5);
      return (
        <Link
          href={`/use-case/${row.original.use_case_id}?run_id=${row.original.id}`}
        >
          <div className="text-left font-mono text-sm text-zinc-600 bg-zinc-100 px-2 py-1 rounded-md hover:bg-zinc-200 hover:text-black transition-colors w-fit">
            {firstFive}...{lastFive}
          </div>
        </Link>
      );
    }
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <div
        className="text-left flex flex-row justify-start items-center cursor-pointer gap-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown className="h-3 w-3 " />
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div
          className={cn(
            "text-left text-xs text-zinc-600 bg-zinc-100 px-2 py-1 rounded-md w-fit font-medium",
            row.original.status === "completed"
              ? "bg-emerald-50 text-emerald-600"
              : "bg-red-50 text-red-600"
          )}
        >
          {row.original.status.charAt(0).toUpperCase() +
            row.original.status.slice(1)}
        </div>
      );
    }
  },
  {
    accessorKey: "completed_at",
    header: ({ column }) => (
      <div
        className="text-left flex flex-row justify-start items-center cursor-pointer gap-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Completed at
        <ArrowUpDown className="h-3 w-3 " />
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-left text-sm">
          {new Date(row.original.completed_at).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          })}
        </div>
      );
    }
  },
  {
    id: "duration",
    accessorFn: (row) =>
      new Date(row.completed_at).getTime() - new Date(row.timestamp).getTime(),
    header: ({ column }) => (
      <div
        className="text-right flex flex-row justify-end items-center cursor-pointer gap-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Duration
        <ArrowUpDown className="h-3 w-3 " />
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-right text-xs text-zinc-600">
          {Math.round(
            (new Date(row.original.completed_at).getTime() -
              new Date(row.original.timestamp).getTime()) /
              1000
          )}
          s
        </div>
      );
    }
  }
];
