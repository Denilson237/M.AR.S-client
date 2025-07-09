"use client";

import React from 'react';

import { columns, columnsFilters } from './columns';
import DataTable, { ApiFilters } from '@/components/data-table-with-advance-filter';
import { useGetTickets } from '@/modules/tickets/hooks/use-get-tickets';
import { useGetMyTickets } from '@/modules/tickets/hooks/use-get-my-tickets';

interface RequestsListingTableProps {
    isPersonal?: boolean; // Prop pour choisir entre "toutes les requêtes" ou "mes requêtes"
}

export const RequestsListingTable = ({ isPersonal = false }: RequestsListingTableProps) => {

    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(10);
    const [apiFilters, setApiFilters] = React.useState<ApiFilters | null>(null);

    //const personalRequestsQuery = useGetMyAssignmentRequests(page, limit, apiFilters); // Hook pour les requêtes personnelles
    const allRequestsQuery = useGetTickets(page, limit, apiFilters); // Hook pour toutes les requêtes

    const query = allRequestsQuery
    // isPersonal 
    // ? personalRequestsQuery 
    // : allRequestsQuery; // Choix dynamique du hook en fonction de `isPersonal`

    const data = query.data?.data ?? [];
    const isDisabled = query.isLoading

    const totalItems = query.data?.totalItems ?? 0;
    const getExportQuery = {data:{data:[]}}; //useGetAssignmentRequests(page, totalItems, null);
    const exportData = getExportQuery.data?.data ?? [];

    return (
        <DataTable
            label={"requests"}
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

