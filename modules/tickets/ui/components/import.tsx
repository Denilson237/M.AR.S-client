"use client"
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import React, { useState } from 'react'
import { TicketImportDialog } from './ticket-import-dialog'


type Props = {}

export const ImportButton = (props: Props) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <TicketImportDialog open={open} onOpenChange={setOpen} />
            <Button
                variant='outline'
                className='text-xs md:text-sm'
                onClick={() => setOpen(true)}
            >
                <Download className='mr-2 h-4 w-4' /> Importer demandes
            </Button>
        </>

    )
}

