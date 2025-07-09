"use client"
import React, { useState } from 'react'

import { Loader2, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useConfirm } from '@/hooks/use-confirm';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useOpenUser } from '@/modules/users/hooks/use-open-user';
import { useDisReactiveUser } from '@/modules/users/api/use-dis-reactivate-user';
import { useDeleteUser } from '@/modules/users/api/use-delete-user';
import { useEditAssignmentRequest } from '@/features/requests/api/use-edit-assignment-request';
import { ThickArrowUpIcon } from '@radix-ui/react-icons';


type Props = {
    id: string;
}

export const Actions = ({ id }: Props) => {

    const [confirmMessage, setconfirmMessage] = useState("Are you sure?");

    const [ConfirmationDialog, confirm] = useConfirm({
        title: "Are you sure?",
        message: confirmMessage,
    });

    const mutation = useEditAssignmentRequest(id);

    const onValidate = async () => {
        setconfirmMessage(`You are about to assign this ACI. Are you sure you want to proceed?`)
        const ok = await confirm();
        if (ok) {
            mutation.mutate({ status: "VALIDATE"}, {
                onSuccess: () => {
                      
                },
            });
        }
    }

    const onReject = async () => {
        setconfirmMessage(`You are about to delete this user.`)
        const ok = await confirm();
        if (ok) {
            mutation.mutate({ status: "REJECT"}, {
                onSuccess: () => {
    
                },
            });
        }
    }

    const isPending = mutation.isPending;

    return (
        <>
            <ConfirmationDialog />
            <div className='flex flew-row gap-x-2'>
                <Button
                    type="submit"
                    className="w-[100px]"
                    variant="destructive"
                    disabled={isPending}
                    onClick={onReject}
                >
                    {isPending ?
                        (<><Loader2 className='animate-spin size-4 mr-2' /> Loading</>) :
                        (<><ThumbsDown className="mr-2 h-4 w-4" /> Rejet </>)
                    }
                </Button>

                <Button
                    type="button"
                    className="w-[100px]"
                    variant="success"
                    onClick={onValidate}
                    disabled={isPending}
                >
                    {isPending ?
                        (<><Loader2 className='animate-spin size-4 mr-2' /> Loading</>) :
                        (<>Approve <ThickArrowUpIcon className="ml-2 h-4 w-4" /></>)
                    }
                </Button>

            </div>

        </>
    )
}
