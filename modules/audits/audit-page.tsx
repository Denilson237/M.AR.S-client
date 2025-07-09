"use client";

import React from 'react';

import DataTable, { ApiFilters } from '@/components/data-table-with-advance-filter';

import { useGetAudits } from '@/modules/audits/use-get-audits';
import { useNewUser } from '@/modules/users/hooks/use-new-user';
import { useUserStore } from '@/modules/users/hooks/use-user-store';
import { columns as columnsAudits, columnsFilters as filterAudits } from '@/modules/audits/components/columns';


type Props = {}

export function AuditPage(props: Props) {
    const { user } = useUserStore()
    // const newUser = useNewUser();

    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(10);
    const [apiFilters, setApiFilters] = React.useState<ApiFilters | null>(null);

    const getAuditsQuery = useGetAudits(page, limit, apiFilters);
    const audits = getAuditsQuery.data?.data || [];

    const totalItems = getAuditsQuery.data?.totalItems || 0;
    const getExportQuery = useGetAudits(page, totalItems, null);
    const exportData = getExportQuery.data?.data || [];

    // if (getAuditsQuery.isLoading) {
    //     return (
    //         <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
    //             <Card className='border-none drop-shadow-sm'>
    //                 <CardHeader>
    //                     <Skeleton className="w-48 h-8" />
    //                 </CardHeader>
    //                 <CardContent className='h-[500px] w-full flex items-center justify-center'>
    //                     <Loader2 className='size-6 text-slate-300 animate-spin' />
    //                 </CardContent>
    //             </Card>
    //         </div>
    //     )
    // }
    if (user?.role?.name.toUpperCase() !== 'ADMIN') return null;

    return (
        <>
            <DataTable
                label={"Audits"}
                columns={columnsAudits}
                data={audits}
                isLoading={getAuditsQuery.isLoading}
                isError={getAuditsQuery.isError}
                disabled={getAuditsQuery.isLoading}
                totalItems={totalItems}
                page={page}
                limit={limit}
                setPage={setPage}
                setLimit={setLimit}
                setApiFilters={setApiFilters}
                // filter feature
                isFilterable={true}
                filterColumns={filterAudits}
                // Full Export feature
                isExportable={true}
                exportData={exportData}
                // Delete feature
                isDeletable={false}
                onDelete={() => { }}
            />
        </>
    )
}



