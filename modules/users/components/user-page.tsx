"use client";

import React from 'react';

import DataTable, { ApiFilters } from '@/components/data-table-with-advance-filter';

// import { useNewUser } from '@/features/users/hooks/use-new-user';
import { useGetUsers } from '@/modules/users/api/use-get-users-list';
import { useUserStore } from '@/modules/users/hooks/use-user-store';
import { columns as columnsUsers, columnsFilters as filterUsers } from './columns';


type Props = {}

export function UserPage(props: Props) {
    const { user } = useUserStore()
    // const newUser = useNewUser();

    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(10);
    const [apiFilters, setApiFilters] = React.useState<ApiFilters | null>(null);

    // const deleteUsersQuery = useBulkDeleteUsers();
    const getUsersQuery = useGetUsers(page, limit, apiFilters);
    const users = getUsersQuery.data?.data || [];
    const isDisabled = getUsersQuery.isLoading //|| deleteUsersQuery.isPending

    const totalItems = getUsersQuery.data?.totalItems || 0;
    const getExportQuery = useGetUsers(page, totalItems, null);
    const exportData = getExportQuery.data?.data || [];

    if (user?.role?.name.toUpperCase() !== 'ADMIN') return null;

    return (
        <>
            {/* <Button onClick={newUser.onOpen} size="sm">
                    <Plus className='size-4 mr-2' />
                    Add New
                </Button> */}
            <DataTable
                label={"Utilisateurs"}
                columns={columnsUsers}
                data={users}
                isLoading={getUsersQuery.isLoading}
                isError={getUsersQuery.isError}
                disabled={isDisabled}
                totalItems={totalItems}
                page={page}
                limit={limit}
                setPage={setPage}
                setLimit={setLimit}
                setApiFilters={setApiFilters}
                // filter feature
                isFilterable={true}
                filterColumns={filterUsers}
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
