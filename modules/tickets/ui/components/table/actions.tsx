"use client"
import React, { useState } from 'react'

import { Edit, MoreHorizontal, MoreHorizontalIcon, Power, PowerOff, Trash, Trash2, User, UserRoundPen } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useConfirm } from '@/hooks/use-confirm';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';

import { useOpenUser } from '@/modules/users/hooks/use-open-user';

type Props = {
    id: string;
}

export const Actions = ({ id }: Props) => {
    const { onOpen, onClose } = useOpenUser();

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className='size-8 p-0'>
                        <MoreHorizontal className='size-4' />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                    <DropdownMenuItem
                        disabled={true}
                        onClick={()=> {}}
                    >
                        <MoreHorizontalIcon className="mr-2 size-4" />
                        View more
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </>
    )
}
