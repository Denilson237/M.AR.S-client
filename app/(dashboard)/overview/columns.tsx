"use client";
import { ArrowUpDown, ClipboardCheck, TriangleAlert } from "lucide-react";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { cn, formatCurrency } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { status, statuses, statusStyles } from "@/config/status.config";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Actions } from "./actions";


import { columnsFilter } from "@/components/data-table-with-advance-filter"


export const columnsFilters: columnsFilter[] = [
  { accessorKey: 'reference', title: 'reference' },
  { accessorKey: 'name', title: 'name' },
  { accessorKey: 'amount', title: 'amount' },
  { accessorKey: 'unit', title: 'unit' },
  { accessorKey: 'region', title: 'region' },
  { accessorKey: 'status', title: 'status' },
  { accessorKey: 'bank', title: 'bank' },
  { accessorKey: 'branch', title: 'branch' },
  { accessorKey: 'paymentDate', title: 'Payment Date' },
  { accessorKey: 'paymentMode', title: 'Payment Mode' },
  { accessorKey: 'assignTo', title: 'assignTo' },
  { accessorKey: 'validatedBy', title: 'validatedBy' },
];

interface ResponseType {
  id: string;
  reference: string;
  name: string;
  amount: string;
  bank: string;
  payment_date: Date;
  payment_mode: string;
  status: string;
  categoryId: string;
}

export const columns: ColumnDef<ResponseType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "reference",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Reference' />
    ),
    enableHiding: false,
  },

  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue('status')
      )

      if (!status) {
        return null
      }
      const rowStatus: string = row.getValue("status");
      return (
        <div className='flex w-[100px] items-center'>
          <Badge
            variant={statusStyles[rowStatus] || "primary"}
            className="px-3.5 py-2.5 text-center">
            {status.icon && (
              <status.icon className={cn("mr-2 h-4 w-4 text-muted-foreground", status.iconColor)} />
            )}
            <span>{status.label}</span>
          </Badge>

        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },

  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Customer' />
    ),
  },

  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Amount' />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = formatCurrency(amount);

      return <Badge variant={amount < 0 ? "destructive" : "primary"} className="text-md font-medium px-3.5 py-2.5">{formatted}</Badge>
    },
  },

  {
    accessorKey: "bank",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Bank' />
    ),
  },
  {
    accessorKey: "branch",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Branch' />
    ),
  },
  {
    accessorKey: "paymentDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Date' />
    ),
    cell: ({ row }) => {
      const date = row.getValue("paymentDate") as Date;

      return <span>{date ? format(date, "dd/MM/yyyy") : ""}</span>;
    },
  },

  {
    accessorKey: "paymentMode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Mode' />
    ),
  },

  {
    accessorKey: "assignTo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='AssignTo' />
    ),
  },
  {
    accessorKey: "region",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Region' />
    ),
  },
  {
    accessorKey: "unit",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Unit' />
    ),
  },
  {
    accessorKey: "validator",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='validatedBy' />
    ),
  },

  {
    accessorKey: "validatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='validetedAt' />
    ),
    cell: ({ row }) => {
      const date = row.getValue("validatedAt") as Date;
      if (date) {
        return <span>{format(date, "dd/MM/yyyy HH:mm:ss")}</span>;
      } else {
        return null;
      }
    },
  },

  {
    accessorKey: "reasonForRefusal",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Reason For Refusal' />
    ),
  },

  {
    accessorKey: "verificator",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='verifiedBy' />
    ),
  },

  {
    accessorKey: "verifierAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='verifiedAt' />
    ),
    cell: ({ row }) => {
      const date = row.getValue("verifierAt") as Date;
      if (date) {
        return <span>{format(date, "dd/MM/yyyy HH:mm:ss")}</span>;
      } else {
        return null;
      }
    },
  },



  {
    accessorKey: "creator",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Created By' />
    ),
  },


  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Created At' />
    ),
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;

      return <span>{format(date, "dd/MM/yyyy HH:mm:ss")}</span>;
    },
  },


  {
    accessorKey: "modifiedBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Modified By' />
    ),
    cell: ({ row }) => {
      const date = row.getValue("updatedAt") as Date;

      return <span>{format(date, "dd/MM/yyyy HH:mm:ss")}</span>;
    },
  },

  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='updated At' />
    ),
    cell: ({ row }) => {
      const date = row.getValue("updatedAt") as Date;

      return <span>{format(date, "dd/MM/yyyy HH:mm:ss")}</span>;
    },
  },

  {
    id: "actions",
    header: ({ column }) => ("Actions "),
    cell: ({ row }) => <Actions id={row.original.id} />,
  },



];
