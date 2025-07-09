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
  NUMERO_FACTURE: string;
  SERVICE_NUMBER: string;
  MONTANT_HT: string;
  MONTANT_TAXE: string;
  MONTANT_TTC: string;
  MONTANT_IMPAYE_TTC: string;
  CODE_STATUT_FACTURE: string;
  LIBELLE_STATUT_FACTURE: string;
  CODE_TYPE_FACTURE: string;
  LIBELLE_TYPE_FACTURE: string;
  DATE_MAJ_STATUT_FACTURE: string;
  DATE_FACTURATION: string;
  DATE_DISPO_FACTURE: string;
  DATE_LIMITE_PAIEMENT_FACTURE: string;
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
    accessorKey: "SERVICE_NUMBER",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="-ml-4"
        >
          Service N°
        </Button>
      )
    },
  },

  {
    accessorKey: "NUMERO_FACTURE",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="-ml-4"
        >
          Facture
        </Button>
      )
    },
  },
  {
    accessorKey: "MONTANT_HT",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="-ml-4"
        >
          Montant HT
        </Button>
      )
    },
  },
  {
    accessorKey: "MONTANT_TAXE",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="-ml-4"
        >
          Montant Taxe
        </Button>
      )
    },

  },
  {
    accessorKey: "MONTANT_TTC",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="-ml-4"
        >
          Montant TTC
        </Button>
      )
    },
  },

  {
    accessorKey: "MONTANT_IMPAYE_TTC",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="-ml-4"
        >
          Impayé
          {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
        </Button>
      )
    },
  },

  {
    accessorKey: "LIBELLE_STATUT_FACTURE",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          // onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          STATUT_FACTURE
          {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
        </Button>
      )
    },
  },

  {
    accessorKey: "LIBELLE_TYPE_FACTURE",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          // onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          TYPE_FACTURE
          {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
        </Button>
      )
    },
  },

  {
    accessorKey: "DATE_DISPO_FACTURE",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          // onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          DATE_DISPO_FACTURE
          {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
        </Button>
      )
    },
  },

  {
    accessorKey: "DATE_LIMITE_PAIEMENT_FACTURE",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          // onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          DATE_LIMITE_PAIEMENT_FACTURE
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
