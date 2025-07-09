"use client";

import React from 'react';

import DataTable, { ApiFilters } from '@/components/data-table-with-advance-filter';

import { columns, columnsFilters } from './components/reading-table/columns';
import { useGetReadings } from '../api/use-get-readings';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';


type Props = {}

export default function CustomerMeterReadingView(props: Props) {
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(10);
    const [apiFilters, setApiFilters] = React.useState<ApiFilters | null>(null);

    const query = useGetReadings(page, limit, apiFilters);
    const customers = query.data?.data || []; // getUsersQuery.data?.data || [];
    const isDisabled = query.isLoading;

    const totalItems = query.data?.totalItems || 0;
    const getExportQuery = useGetReadings(page, totalItems, null);
    const exportData = getExportQuery.data?.data || [];

    if (query.isLoading) return <DataTableSkeleton columnCount={5} rowCount={10} />

    return (
        <DataTable
            label={"Customers-meter-reading"}
            columns={columns}
            data={customers}
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
                //const ids = row.map((r) => r.original.SERVICE_NUMBER);
                // deleteUsersQuery.mutate({ ids });
            }}
        />
    )
}

