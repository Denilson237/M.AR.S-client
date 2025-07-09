"use client"

import React, { useState } from 'react'
import { BiShow } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import { useConfirm } from '@/hooks/use-confirm';
import { MoreHorizontal, Trash,  UserRoundPen, View } from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useOpenUser } from '@/modules/users/hooks/use-open-user';
import { useDisReactiveUser } from '@/modules/users/api/use-dis-reactivate-user';
import { useDeleteUser } from '@/modules/users/api/use-delete-user';
import { useDeleteRole } from '../api/use-delete-role';



type Props = {
    id: string;
}

export const Actions = ({ id }: Props) => {
    const { onOpen, onClose } = useOpenUser();
    const router = useRouter();

    const [confirmMessage, setconfirmMessage] = useState("Are you sure?");

    const [ConfirmationDialog, confirm] = useConfirm({
        title: "Are you sure?",
        message: confirmMessage,
    });

    const mutationDelete = useDeleteRole(id);

    const handleDelete = async () => {
        setconfirmMessage(`You are about to delete this role.`)
        const ok = await confirm();
        if (ok) {
            mutationDelete.mutate(undefined, {
                onSuccess: () => {
                    onClose();
                },
            });
        }
    }

    const isPending = mutationDelete.isPending

    return (
        <>
            <ConfirmationDialog />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className='size-8 p-0'>
                        <MoreHorizontal className='size-4' />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                    <DropdownMenuItem
                        disabled={isPending}
                        onClick={() => router.push(`/admin/role-permission/role/${id}`)}
                    >
                        <BiShow className="mr-2 size-4" />
                        <span>View</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        disabled={isPending}
                        onClick={() => router.push(`/admin/role-permission/role/${id}?e=true`)}
                    >
                        <UserRoundPen className="mr-2 size-4" />
                        <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        disabled={isPending}
                        onClick={handleDelete}
                    >
                        <Trash className="mr-2 size-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </>
    )
}
