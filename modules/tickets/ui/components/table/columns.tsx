"use client"

import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"

import { columnsFilter } from "@/components/data-table-with-advance-filter"
import { Actions } from "./actions";
import { Zap, ZapOff } from "lucide-react";


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
    accessorKey: "status",
    header: "Status",
    // cell: ({ row }) => {
    //   const rowStatus: string = row.getValue("status");
    //   return (
    //     <div className='flex w-[300px] items-center'>
    //       <Badge
    //         variant={rowStatus == 'PENDING' ? "primary" : rowStatus == 'VALIDATE' ? "success" : 'destructive'}
    //         className="px-3.5 py-2.5 text-center">
    //         <span>{rowStatus}</span>
    //       </Badge>

    //     </div>
    //   )
    // },
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
    accessorKey: "modifier",
    header: "Updated By",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => {
      const date = row.getValue("updatedAt") as Date;
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
