"use client"
import React from 'react'
import { MoreHorizontal, ReceiptText} from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';

import { useViewRequest } from '@/features/transactions/hooks/use-view-request';
import { CgMore } from 'react-icons/cg';


type Props = {
    id: string;
}

export const Actions = ({ id }: Props) => {

    const { onOpen } = useViewRequest();

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
                        onClick={() => onOpen(id)}
                    >
                        <ReceiptText className="mr-2 size-4" />
                        <span>View more</span>
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>

        </>
    )

}
