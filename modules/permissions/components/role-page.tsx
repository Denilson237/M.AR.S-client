"use client";

import { DataTable } from '@/components/data-table';

import { useUserStore } from '@/modules/users/hooks/use-user-store';
import { useGetRoles } from '@/modules/permissions/api/use-get-roles';
import { columns } from '@/modules/permissions/components/role/columns';


type Props = {}

export function RolePage(props: Props) {
    const { user } = useUserStore()

    const getQuery = useGetRoles();
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


