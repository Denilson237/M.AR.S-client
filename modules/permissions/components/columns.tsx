"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/checkbox"
import { columnsFilter } from "@/components/data-table-with-advance-filter"
import { Actions } from "./actions";
import { Badge } from "@/components/ui/badge"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { FiInfo } from "react-icons/fi"

export const columnsFilters: columnsFilter[] = [
  { accessorKey: 'role', title: 'Name' },
  { accessorKey: 'permissions', title: 'Permissions' },
  { accessorKey: 'description', title: 'Description' },
];

interface ResponseType {
  id: string;
  role: string;
  description?: string;
  permissions?: string;
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
    accessorKey: "role",
    header: () => <div className="font-semibold">Role</div>,
    cell: ({ row }) => {
      const role = row.original.role
      return (
        <div className="flex items-center gap-2">
          <Badge variant={role === 'ADMIN' ? 'destructive' : 'secondary'}>
            {role}
          </Badge>
        </div>
      )
    },
    size: 80,
  },
  {
    accessorKey: "description",
  
  },
  {
    accessorKey: "permissions",
    header: () => (
      <div className="flex items-center gap-1 font-semibold">
        Permissions
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FiInfo className="w-3 h-3 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent className="max-w-[400px]">
              <p>Liste des permissions associées à ce rôle</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
    cell: ({ row }) => {
      const permissions = row.original.permissions?.split(', ') || []
      return (
        <div className="flex flex-wrap gap-1 max-w-[400px]">
          {permissions.length > 0 ? (
            permissions.slice(0, 8).map((perm, i) => (
              <Badge key={i} variant="outline" className="text-xs">
                {perm}
              </Badge>
            ))
          ) : (
            <span className="text-muted-foreground text-sm">No permissions</span>
          )}
          {permissions.length > 8 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant="outline" className="text-xs">
                    +{permissions.length - 8} more
                  </Badge>
                </TooltipTrigger>
                <TooltipContent className="max-w-[400px] grid grid-cols-2 gap-1">
                  {permissions.slice(8).map((perm, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {perm}
                    </Badge>
                  ))}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      )
    },
    size: 380,
  },
  {
    id: "actions",
    cell: ({ row }) => <Actions id={row.original.id} />,
    enableSorting: false,
    size: 60,
  }
]
