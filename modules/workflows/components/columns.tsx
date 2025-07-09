"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ShieldCheck, ShieldX, TriangleAlert } from "lucide-react"

import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { columnsFilter } from "@/components/data-table-with-advance-filter"
import { Actions } from "./actions";




export const columnsFilters: columnsFilter[] = [
  { accessorKey: 'name', title: 'Name' },
  { accessorKey: 'description', title: 'description' },
  { accessorKey: 'isActive', title: 'isActive' },
];

interface ResponseType {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
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
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
 
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div className='flex w-[100px] items-center'>
          {
            row.getValue("isActive") == 1 ? (<Badge
              className="px-3.5 py-2.5 text-center"
              variant="destructive"
            >
              <ShieldX className="mr-1 h-4 w-4" /> INACTIVE
            </Badge>) : (<Badge
              className="px-3.5 py-2.5 text-center"
              variant="success"
            >
              <ShieldCheck className="mr-1 h-4 w-4" /> ACTIVE
            </Badge>)
          }
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Actions id={row.original.id} status={row.original.isActive} />
    ),
    enableSorting: false,
  }
]
