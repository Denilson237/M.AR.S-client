"use client";

import React from 'react';
import { ClipboardX, File, Loader2, Plus } from 'lucide-react';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import DataTable, { ApiFilters } from '@/components/data-table-with-advance-filter';

import { columns, columnsFilters } from './columns';

import { useGetPendingAssignmentRequests } from '@/features/requests/api/use-get-pending-assignment-requests';


export const Pending = () => {

    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(10);
    const [apiFilters, setApiFilters] = React.useState<ApiFilters | null>(null);

    const getAssignmentRequestsQuery = useGetPendingAssignmentRequests(page, limit, apiFilters);
    const requests = getAssignmentRequestsQuery.data?.data || [];
    const isDisabled = getAssignmentRequestsQuery.isLoading //|| deleteUsersQuery.isPending

    const totalItems = getAssignmentRequestsQuery.data?.totalItems || 0;
    const getExportQuery = useGetPendingAssignmentRequests(page, totalItems, null);
    const exportData = getExportQuery.data?.data || [];


    return (
        <Card className='border-none drop-shadow-sm'>
            <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
                <CardTitle className='text-xl line-clamp-1'>Assignment Request Awaiting Approval</CardTitle>
            </CardHeader>
            <CardContent>
                <DataTable
                    label={"assignment-requests"}
                    columns={columns}
                    data={requests}
                    isLoading={getAssignmentRequestsQuery.isLoading}
                    isError={getAssignmentRequestsQuery.isError}
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
            </CardContent>
        </Card>
    )
}

