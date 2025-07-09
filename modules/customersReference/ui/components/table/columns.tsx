"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CheckCircle2, Clock, AlertCircle, Circle } from 'lucide-react';

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { columnsFilter } from "@/components/data-table-with-advance-filter"

import { Actions } from "./actions";


export const columnsFilters: columnsFilter[] = [
  { accessorKey: 'SERVICE_NUMBER', title: 'SERVICE_N' },
  { accessorKey: 'SUPPLY_POINT', title: 'SUPPLY_POINT' },
  { accessorKey: 'CODE_CLIENT', title: 'CODE_CLIENT' },
  { accessorKey: 'NOM_CLIENT', title: 'NOM_CLIENT' },
  { accessorKey: 'NO_COMPTEUR', title: 'NO_COMPTEUR' },
  { accessorKey: 'CODE_TARIF_CLIENT', title: 'CODE_TARIF_CLIENT' },
  { accessorKey: 'LIBELLE_TARIF_CLIENT', title: "LIBELLE_TARIF_CLIENT" },
  { accessorKey: 'CODE_STATUT_CONTRAT', title: "CODE_STATUT_CONTRAT" },
  { accessorKey: 'LIBELLE_STATUT_CONTRAT', title: "LIBELLE_STATUT_CONTRAT" },
  { accessorKey: 'CODE_TYPE_PHASE', title: "CODE_TYPE_PHASE" },
  { accessorKey: 'LIBELLE_TYPE_PHASE', title: "LIBELLE_TYPE_PHASE" },
  { accessorKey: 'VOLTAGE_CLIENT', title: "VOLTAGE_CLIENT" },
  { accessorKey: 'CODE_REGROUPEMENT', title: "CODE_REGROUPEMENT" },
  { accessorKey: 'NOM_REGROUPEMENT', title: "NOM_REGROUPEMENT" },
  { accessorKey: 'CENTRE_DE_REVE', title: "CENTRE_DE_RELEVE" },
  { accessorKey: 'TYPE_COMPTEUR', title: "TYPE_COMPTEUR" },
  { accessorKey: 'TYPE_CLIENT', title: "TYPE_CLIENT" },
  { accessorKey: 'CATEGORIE_CLIENT', title: "CATEGORIE_CLIENT" },
  { accessorKey: 'REGION', title: "REGION" },
  { accessorKey: 'DIVISION', title: "DIVISION" },
  { accessorKey: 'AGENCE', title: "AGENCE" },
];



interface ResponseType {
  SERVICE_NUMBER: string;
  SUPPLY_POINT: string;
  CODE_CLIENT: string;
  NOM_CLIENT: string;
  NO_COMPTEUR: string;
  ADRESSE_CLIENT: string;
  CONTACT_CLIENT: string;
  CODE_TARIF_CLIENT: string;
  LIBELLE_TARIF_CLIENT: string;
  CODE_STATUT_CONTRAT: string;
  LIBELLE_STATUT_CONTRAT: string;
  CODE_TYPE_PHASE: string;
  LIBELLE_TYPE_PHASE: string;
  VOLTAGE_CLIENT: string;
  CODE_REGROUPEMENT: string;
  NOM_REGROUPEMENT: string;
  CENTRE_DE_REVE: string;
  TYPE_COMPTEUR: string;
  TYPE_CLIENT: string;
  CATEGORIE_CLIENT: string;
  REGION: string;
  DIVISION: string;
  CODE_AGENCE: string;
  AGENCE: string;
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
    accessorKey: "NOM_CLIENT",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="-ml-4"
        >
          Nom(s) & Prenom(s)
        </Button>
      )
    },
  },
  {
    accessorKey: "LIBELLE_STATUT_CONTRAT",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="-ml-4"
        >
          Status CMS
        </Button>
      )
    },
    cell: ({ row }) => {
      const status = row.original.LIBELLE_STATUT_CONTRAT;
      const statusMap: Record<string, { icon: JSX.Element; className: string, variant?: "default" | "success" | "destructive" | "outline" | "secondary" | "primary" | "warning" | null }> = {
        'ACTIVE': {
          icon: <CheckCircle2 className="h-3 w-3 text-green-500" />,
          className: "bg-green-50 text-green-600 border-green-200",
          variant: "primary"
        },
        'ACTIVE (PENDING BILLING)': {
          icon: <Clock className="h-3 w-3 text-amber-500" />,
          className: "bg-amber-50 text-amber-600 border-amber-200",
          variant: "primary"
        },
        'SUSPENDED (DELINQUENT ACCOUNT)': {
          icon: <AlertCircle className="h-3 w-3 text-red-500" />,
          className: "bg-red-50 text-red-600 border-red-200",
          variant: "destructive"
        },
        // Default case
        'default': {
          icon: <Circle className="h-3 w-3 text-gray-500" />,
          className: "bg-gray-50 text-gray-600 border-gray-200",
          variant: "default"
        }
      };

      const currentStatus = statusMap[status] ?? statusMap['default'];

      return (
        <Badge
          variant={currentStatus.variant ?? "outline"}
          className={`text-xs text-center py-2 flex items-center justify-center`}
        >
          {/* {currentStatus.icon} */}
          {status}
        </Badge>
      )
    }
  },
  {
    accessorKey: "TYPE_COMPTEUR",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="-ml-4"
        >
          Type compteur
        </Button>
      )
    },

  },
  {
    accessorKey: "AGENCE",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="-ml-4"
        >
          Agence
        </Button>
      )
    },
  },

  {
    accessorKey: "DIVISION",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="-ml-4"
        >
          Division
          {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
        </Button>
      )
    },
  },

  {
    accessorKey: "REGION",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          // onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          Region
          {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
        </Button>
      )
    },
  },


  {
    accessorKey: "NO_COMPTEUR",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          // onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          Meter
          {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
        </Button>
      )
    },
  },
  {
    accessorKey: "CODE_CLIENT",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          // onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          client COD
          {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
        </Button>
      )
    },
  },



  {
    accessorKey: "CATEGORIE_CLIENT",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          // onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          Category
          {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
        </Button>
      )
    },
  },
  {
    accessorKey: "SUPPLY_POINT",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          // onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          Supply Point
          {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
        </Button>
      )
    },
  },
  {
    accessorKey: "CONTACT_CLIENT",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          // onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          Contact
          {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
        </Button>
      )
    },
  },
  {
    accessorKey: "userId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          // onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          Key Account Manager
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
