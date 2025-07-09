"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, ShieldCheck, ShieldX, TriangleAlert } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

import { columnsFilter } from "@/components/data-table-with-advance-filter"
import { Actions } from "./actions";

import { cn } from "@/lib/utils"
import { format } from "date-fns"


export const columnsFilters: columnsFilter[] = [
  { accessorKey: 'reference', title: 'reference' },
  { accessorKey: 'unit', title: 'unit' },
];

interface ResponseType {
  id: string;
  role: string;
  permissions?: string;
}

export const columns: ColumnDef<ResponseType>[] = [

  {
    accessorKey: "reference",
    header: "Reference",
  },
  {
    accessorKey: "unit",
    header: "Benfeciary Unit",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const rowStatus: string = row.getValue("status");
      return (
        <div className='flex w-[100px] items-center'>
          <Badge
            variant={ rowStatus == 'PENDING' ? "primary" :  rowStatus == 'VALIDATE' ? "success" : 'destructive'}
            className="px-3.5 py-2.5 text-center">
            <span>{rowStatus}</span>
          </Badge>

        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "user",
    header: "Created By",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;
      return <span>{format(date, "dd/MM/yyyy")}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Actions id={row.original.id} />
    ),
    enableSorting: false,
  }
]
