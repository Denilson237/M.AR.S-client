"use client";

import React from 'react';

import DataTable, { ApiFilters } from '@/components/data-table-with-advance-filter';
import { columns, columnsFilters } from './columns';

import { useGetAssignmentRequests } from '@/modules/tickets/hooks/use-get-tickets';
import { useGetMyAssignmentRequests } from '@/modules/tickets/hooks/use-get-my-tickets';
import { useGetPendingValidationTickets } from '@/modules/tickets/hooks/use-get-ticket-pending-validation';

interface RequestsListingTableProps {
    isPersonal?: boolean; // Prop pour choisir entre "toutes les requêtes" ou "mes requêtes"
}

export const RequestsListingTable = ({ isPersonal = false }: RequestsListingTableProps) => {

    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(10);
    const [apiFilters, setApiFilters] = React.useState<ApiFilters | null>(null);

    const query = useGetPendingValidationTickets(page, limit, apiFilters); // Hook pour toutes les requêtes

    const users = query.data?.data || [];
    const isDisabled = query.isLoading

    const totalItems = query.data?.totalItems || 0;
    const getExportQuery = useGetPendingValidationTickets(page, totalItems, null);
    const exportData = getExportQuery.data?.data || [];

    return (
        <DataTable
            label={"requests"}
            columns={columns}
            data={users}
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

