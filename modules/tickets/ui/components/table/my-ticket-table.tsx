"use client";

import React from 'react';

import { columns, columnsFilters } from './columns';
import DataTable, { ApiFilters } from '@/components/data-table-with-advance-filter';
import { useGetMyTickets } from '@/modules/tickets/hooks/use-get-my-tickets';


export const DataTableComponent = () => {

    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(10);
    const [apiFilters, setApiFilters] = React.useState<ApiFilters | null>(null);

    const query = useGetMyTickets(page, limit, apiFilters);

    const data = query.data?.data ?? [];
    const isDisabled = query.isLoading

    const totalItems = query.data?.totalItems ?? 0;
    const getExportQuery = useGetMyTickets(page, totalItems, null);
    const exportData = getExportQuery.data?.data ?? [];

    return (
        <DataTable
            label={"My tickets"}
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
            onDelete={(row) => { }}
        />

    )
}

