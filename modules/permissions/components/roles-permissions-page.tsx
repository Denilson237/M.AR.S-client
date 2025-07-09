"use client";

import React from 'react';

import DataTable, { ApiFilters } from '@/components/data-table-with-advance-filter';

import { useUserStore } from '@/modules/users/hooks/use-user-store';
import {
    useGetRolesPermissions
} from '@/modules/permissions/api/use-get-roles-permissions';
import {
    columns as columnsRolesPermissions,
    columnsFilters as filterolesPermissions
} from '@/modules/permissions/components/columns';


type Props = {}

export function RolesPermissionsPage(props: Props) {
    const { user } = useUserStore()

    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(10);
    const [apiFilters, setApiFilters] = React.useState<ApiFilters | null>(null);

    const getQuery = useGetRolesPermissions(page, limit, apiFilters);
    const data = getQuery.data?.data || [];

    const isDisabled = getQuery.isLoading

    const totalItems = getQuery.data?.totalItems || 0;
    const getExportQuery = useGetRolesPermissions(page, totalItems, null);
    const exportData = getExportQuery.data?.data || [];

    if (user?.role?.name.toUpperCase() !== 'ADMIN') return null;

    return (
        <DataTable
            label={"Roles & Permissions"}
            columns={columnsRolesPermissions}
            data={data}
            isLoading={getQuery.isLoading}
            isError={getQuery.isError}
            disabled={isDisabled}
            totalItems={totalItems}
            page={page}
            limit={limit}
            setPage={setPage}
            setLimit={setLimit}
            setApiFilters={setApiFilters}
            // filter feature
            isFilterable={true}
            filterColumns={filterolesPermissions}
            // Full Export feature
            isExportable={true}
            exportData={exportData}
            // Delete feature
            isDeletable={false}
            onDelete={(row) => {
                const ids = row.map((r) => r.original.id);
                // deleteUsersQuery.mutate({ ids });
            }}
        />

    );
}


