"use client"

import { format } from "date-fns";
import { Zap, ZapOff } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { columnsFilter } from "@/components/data-table-with-advance-filter"
import { ActionsValidations } from "./actions-validation";



export const columnsFilters: columnsFilter[] = [
  { accessorKey: 'reference', title: 'reference' },
  { accessorKey: 'unit', title: 'unit' },
  { accessorKey: 'status', title: 'status' },
];

interface ResponseType {
  id: string;
  status: string;
  reference: string;
  unit: string;
  user: string;
}

export const columns: ColumnDef<ResponseType>[] = [
  {
    accessorKey: "reference",
    header: "Reference",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type: string = row.getValue("type");
      return (
        <Badge
          variant={type == 'disconnect' ? "destructive" : "primary"}
          className="px-3.5 py-2.5 text-center">
          {type == 'reconnect'
            ? (<Zap className="h-4 w-4 mr-2" />)
            : (<ZapOff className="h-4 w-4 mr-2" />)
          }
          <span>{type.toUpperCase()}</span>
        </Badge>
      )
    },
  },
  {
    accessorKey: "workflowStatus",
    header: "Workflow status",
  },
  {
    accessorKey: "unpaidCount",
    header: "NB Unpaid Bills",
  },
  {
    accessorKey: "unpaidAmount",
    header: "Total Unpaid Amount",
  },
  {
    accessorKey: "creator",
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
      <ActionsValidations id={row.original.id} />
    ),
    enableSorting: false,
  }
]

