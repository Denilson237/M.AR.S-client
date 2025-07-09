"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CheckCircle2, Clock, AlertCircle, Circle } from 'lucide-react';

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { columnsFilter } from "@/components/data-table-with-advance-filter"

import { Actions } from "./actions";


export const columnsFilters: columnsFilter[] = [
  { accessorKey: 'NUMERO_FACTURE', title: 'NUMERO_FACTURE' },
  { accessorKey: 'SERVICE_NUMBER', title: 'Email' },
  { accessorKey: 'status', title: 'Status' },
  { accessorKey: 'unit', title: 'unit' },
  { accessorKey: 'roles', title: 'roles' },
  { accessorKey: 'createdAt', title: 'Created At' },
  { accessorKey: 'updatedAt', title: "Updated At" },
];


interface ResponseType {
  METER_NUMBER: string;
  DATE_B?: string;
  HEURE_B?: string;
  ACTIF_IM_B?: string;
  ACTIF_EX_B?: string;
  REACTIF_IM_B?: string;
  P_MAX_B?: string;
  ALARM?: string;
  DATE_I?: string;
  HEURE_I?: string;
  ACTIF_IM_I?: string;
  ACTIF_EX_I?: string;
  REACTIF_IM_I?: string;
  P_MAX_I?: string;
  CHECK_METER?: string;
  RELAY_STATUS?: string;
  READING_DATE?: string;
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
    accessorKey: "METER_NUMBER",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="-ml-4"
        >
          METER_NUMBER
        </Button>
      )
    },
  },

  {
    accessorKey: "DATE_B",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="-ml-4"
        >
          DATE_B
        </Button>
      )
    },
  },
  {
    accessorKey: "ACTIF_IM_B",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="-ml-4"
        >
          ACTIF_IM_B
        </Button>
      )
    },
  },
  {
    accessorKey: "ACTIF_EX_B",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="-ml-4"
        >
          ACTIF_EX_B
        </Button>
      )
    },

  },
  {
    accessorKey: "REACTIF_IM_B",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="-ml-4"
        >
          REACTIF_IM_B
        </Button>
      )
    },
  },

  {
    accessorKey: "P_MAX_B",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="-ml-4"
        >
          P_MAX_B
          {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
        </Button>
      )
    },
  },
  {
    accessorKey: "DATE_I",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          // onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          DATE_I
          {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
        </Button>
      )
    },
  },

  {
    accessorKey: "HEURE_I",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          // onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          HEURE_I
          {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
        </Button>
      )
    },
  },

  {
    accessorKey: "ACTIF_IM_I",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          // onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          ACTIF_IM_I
          {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
        </Button>
      )
    },
  },

  {
    accessorKey: "ACTIF_EX_I",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          // onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          ACTIF_EX_I
          {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
        </Button>
      )
    },
  },

  
  {
    accessorKey: "REACTIF_IM_I",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          // onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          REACTIF_IM_I
          {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
        </Button>
      )
    },
  },

  {
    accessorKey: "P_MAX_I",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          // onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          P_MAX_I
          {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
        </Button>
      )
    },
  },

  {
    accessorKey: "CHECK_METER",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          // onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          CHECK_METER
          {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
        </Button>
      )
    },
  },

  {
    accessorKey: "RELAY_STATUS",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          // onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          RELAY_STATUS
          {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
        </Button>
      )
    },
  },

  {
    accessorKey: "READING_DATE",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          // onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          READING_DATE
          {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
        </Button>
      )
    },
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => (
  //     <Actions id={ row.original.id }/>
  //   ),
  //   enableSorting: false,
  // }
]
