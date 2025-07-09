"use client";

import React from 'react';

import DataTable, { ApiFilters } from '@/components/data-table-with-advance-filter';

import { useUserStore } from '@/modules/users/hooks/use-user-store';
import { columns , columnsFilters } from './columns';
import { useGetWorkflows } from '../api/use-get-workflows';


type Props = {}

export function WorkflowPage(props: Props) {
    const { user } = useUserStore()

    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(10);
    const [apiFilters, setApiFilters] = React.useState<ApiFilters | null>(null);

    // const deleteUsersQuery = useBulkDeleteUsers();
    const query = useGetWorkflows(page, limit, apiFilters);
    const data = query.data?.data || [];
    const isDisabled = query.isLoading //|| deleteUsersQuery.isPending

    const totalItems = query.data?.totalItems || 0;
    const getExportQuery = useGetWorkflows(page, totalItems, null);
    const exportData = getExportQuery.data?.data || [];

    if (user?.role?.name.toUpperCase() !== 'ADMIN') return null;

    return (
        <>
            <DataTable
                label={"Workflow"}
                columns={columns}
                data={data}
                isLoading={query.isLoading}
                isError={query.isError}
                disabled={isDisabled}
                totalItems={totalItems}
                page={page}
                limit={limit}
                setPage={setPage}
                setLimit={setLimit}
                setApiFilters={setApiFilters}
                // filter feature
                isFilterable={true}
                filterColumns={columnsFilters}
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

        </>


    )
}
