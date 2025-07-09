"use client";

import React from 'react';
import { Loader2 } from 'lucide-react';
import { BiExport } from 'react-icons/bi';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from '@/components/ui/button';

import DataTable, { ApiFilters } from '@/components/data-table-with-advance-filter';
import { columns, columnsFilters } from './columns';

import { useBrouillard } from '@/features/transactions/hooks/use-brouillard';
import { useGetAllRequests } from '@/features/transactions/api/use-get-all-requests';

export default function TransactionsPage() {

    const brouillard = useBrouillard();

    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(10);
    const [apiFilters, setApiFilters] = React.useState<ApiFilters | null>(null);

    const getTransactionsQuery = useGetAllRequests(page, limit, apiFilters);
    const transactions = getTransactionsQuery.data?.data || [];
    const isDisabled = getTransactionsQuery.isLoading

    const totalItems = getTransactionsQuery.data?.totalItems || 0;
    const getExportQuery = useGetAllRequests(page, totalItems, null);
    const exportData = getExportQuery.data?.data || [];

    return (
        <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
            <Card className='border-none drop-shadow-sm'>
                <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
                    <CardTitle className='text-xl line-clamp-1'>ALL TRANSACTIONS </CardTitle>
                    <Button
                        onClick={brouillard.onOpen}
                        className='w-full lg:w-auto'>
                        <BiExport className='size-4 mr-2' />
                        Generated Brouillard
                    </Button>
                </CardHeader>
                <CardContent>
                    <DataTable
                        label={"ACI"}
                        columns={columns}
                        data={transactions}
                        isLoading={getTransactionsQuery.isLoading}
                        isError={getTransactionsQuery.isError}
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
        </div>
    )
}

