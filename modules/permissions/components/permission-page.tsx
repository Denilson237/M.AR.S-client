"use client";

import { DataTable } from '@/components/data-table';

import { useUserStore } from '@/modules/users/hooks/use-user-store';
import { columns } from '@/modules/permissions/components/permission/columns';
import { useGetPermissions } from '@/modules/permissions/api/use-get-permissions';


type Props = {}

export function PermissionPage(props: Props) {
    const { user } = useUserStore()

    const getQuery = useGetPermissions();
    const data = getQuery.data || [];


    if (user?.role?.name.toUpperCase() !== 'ADMIN') return null;

    return (
        <DataTable
            columns={columns}
            data={data}
            filterKey='name'
            filterStatus={false}
           />
    );
}


