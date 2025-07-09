"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { BiShow } from 'react-icons/bi';
import { MoreHorizontal, Power, PowerOff, Trash, UserRoundPen } from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';

import { useConfirm } from '@/hooks/use-confirm';

import { useOpenUser } from '@/modules/users/hooks/use-open-user';
import { useDeleteUser } from '@/modules/users/api/use-delete-user';
import { useDisReactiveUser } from '@/modules/users/api/use-dis-reactivate-user';


type Props = {
    id: string;
    status: boolean;
}

export const Actions = ({ id, status }: Props) => {
    const { onOpen, onClose } = useOpenUser();
    const router = useRouter();

    const [confirmMessage, setconfirmMessage] = useState("Are you sure?");

    const [ConfirmationDialog, confirm] = useConfirm({
        title: "Are you sure?",
        message: confirmMessage,
    });

    const mutation = useDisReactiveUser(id);

    const handleAction = async () => {
        const action = status ? "Deactivation" : "Reactivation";
        setconfirmMessage(`You are about to ${action.toLowerCase()} this user. Are you sure you want to proceed?`)
        const ok = await confirm();
        if (ok) {
            mutation.mutate(undefined, {
                onSuccess: () => {
                    onClose();
                },
            });
        }
    }

    const mutationDelete = useDeleteUser(id);

    const handleDelete = async () => {
        setconfirmMessage(`You are about to delete this user.`)
        const ok = await confirm();
        if (ok) {
            mutationDelete.mutate(undefined, {
                onSuccess: () => {
                    onClose();
                },
            });
        }
    }

    const isPending = mutation.isPending || mutationDelete.isPending

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
                        onClick={() => router.push(`/admin/workflow/${id}`)}
                    >
                        <BiShow className="mr-2 size-4" />
                        <span>View</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        disabled={isPending}
                        //onClick={() => onOpen(id)}
                        onClick={() => router.push(`/admin/workflow/${id}?e=true`)}
                    >
                        <UserRoundPen className="mr-2 size-4" />
                        <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        disabled={isPending}
                        onClick={handleAction}
                    >
                        {status ? <PowerOff className="mr-2 size-4" /> : <Power className="mr-2 size-4" />}
                        <span>{status ? "Deactivation" : "Reactivation"}</span>
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
