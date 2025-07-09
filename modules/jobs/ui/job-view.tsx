"use client";

import React from 'react';

import DataTable, { ApiFilters } from '@/components/data-table-with-advance-filter';

import { columns, columnsFilters } from './components/table/columns';
import { useGetJobs } from '../api/use-get-jobs';



type Props = {}

export default function JobView(props: Props) {
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(10);
    const [apiFilters, setApiFilters] = React.useState<ApiFilters | null>(null);

    const query = useGetJobs(page, limit, apiFilters);
    const data = query.data?.notifications || []; // getUsersQuery.data?.data || [];
    const isDisabled = query.isLoading;

    const totalItems = query.data?.totalItems || 0;
    const getExportQuery = useGetJobs(page, totalItems, null);
    const exportData = getExportQuery.data?.data || [];

    if (query.isLoading) return

    return (
        <DataTable
            label={"Job"}
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
                const ids = row.map((r) => r.original.SERVICE_NUMBER);
                // deleteUsersQuery.mutate({ ids });
            }}
        />
    )
}

