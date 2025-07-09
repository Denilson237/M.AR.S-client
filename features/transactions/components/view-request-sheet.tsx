import { z } from "zod";
import React from "react";

import { useGetBanks } from "@/features/banks/api/use-get-banks";
import { useGetPayModes } from "@/features/payModes/api/use-get-payModes";

import { useViewRequest } from "@/features/transactions/hooks/use-view-request";
import { ViewRequestForm } from "@/features/transactions/components/view-request-form";
import { useGetRequest } from "@/features/transactions/api/use-get-request";

import { Loader2 } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useGetUsers } from "@/modules/users/api/use-get-users";
import { useGetStatus } from "@/features/status/api/use-get-status";
import { useGetBranches } from "@/features/bankAgencies/api/use-get-branchs";



export function ViewRequestSheet() {
    const { isOpen, onClose, onOpen, id } = useViewRequest();

    const transactionQuery = useGetRequest(id);
   

    const payModeQuery = useGetPayModes();
    const payModeOptions = (payModeQuery.data ?? []).map(
        (payMode: { name: any; id: any; }) => ({
            label: payMode.name,
            value: payMode.id
        })
    );

    const bankQuery = useGetBanks();
    const bankOptions = (bankQuery.data ?? []).map(
        (item: { name: any; id: any; }) => ({
            label: item.name,
            value: item.id
        })
    );

    const branchQuery = useGetBranches();
    const branchOptions = (branchQuery.data ?? []).map(
        (item: { name: any; id: any; }) => ({
            label: item.name,
            value: item.id
        })
    );

    const userQuery = useGetUsers();
    const userOptions = (userQuery.data ?? []).map(
        (item: { name: any; id: any; }) => ({
            label: item.name,
            value: item.id
        })
    );

    const statusQuery =  useGetStatus();
    const statusOptions = (statusQuery.data ?? []).map(
        (item: { name: any; id: any; }) => ({
            label: item.name,
            value: item.id
        })
    );

    const isLoading =
        transactionQuery.isLoading ||
        userQuery.isLoading ||
        bankQuery.isLoading ||
        payModeQuery.isLoading

        const defaultValues = transactionQuery.data
        ? {
            reference: transactionQuery.data.reference as string,
            userId: transactionQuery.data.userId as string | null,  // Assurez-vous que ça peut être null
            name: transactionQuery.data.name as string,
            amount: transactionQuery.data.amount as string,         // Assurez-vous que c'est une chaîne
            bank: transactionQuery.data.bankId ? transactionQuery.data.bankId as string : null, // Peut être null
            branch: transactionQuery.data.branchId ? transactionQuery.data.branchId as string : null, // Peut être null
            paymentDate: transactionQuery.data.paymentDate
                ? new Date(transactionQuery.data.paymentDate)
                : null,
            paymentMode: transactionQuery.data.paymentModeId ? transactionQuery.data.paymentModeId as string : null, // Peut être null
            status: transactionQuery.data.statusId ? transactionQuery.data.statusId as string : null, // Peut être null
            description: "",
            validatedBy: transactionQuery.data.validatorId ? transactionQuery.data.validatorId as string : null, // Peut être null
            validatedAt: transactionQuery.data.validatedAt ? new Date(transactionQuery.data.validatedAt) : null, // Peut être null
            refusal: transactionQuery.data.refusal,
            reasonForRefusal: transactionQuery.data.reasonForRefusal || null, // Peut être null
            createdBy: transactionQuery.data.createdBy,
            createdAt: transactionQuery.data.createdAt
                ? new Date(transactionQuery.data.createdAt)
                : null,
            modifiedBy: transactionQuery.data.modifiedBy || null, // Peut être null
            updatedAt: transactionQuery.data.updatedAt
                ? new Date(transactionQuery.data.updatedAt)
                : null,
        }
        : {
            reference: "",
            userId: null,  // Modifié pour correspondre à string | null
            name: "",
            amount: "",
            bank: null,    // Modifié pour correspondre à string | null
            branch: null,  // Modifié pour correspondre à string | null
            paymentDate: new Date(),
            paymentMode: null, // Modifié pour correspondre à string | null
            status: null,      // Modifié pour correspondre à string | null
            description: "",
            validatedBy: null, // Modifié pour correspondre à string | null
            validatedAt: null, // Modifié pour correspondre à Date | null
            refusal: false,
            reasonForRefusal: null, // Modifié pour correspondre à string | null
            createdBy: "",
            modifiedBy: null, // Modifié pour correspondre à string | null
            createdAt: new Date(),
            updatedAt: new Date(),
        };


    return (
        <>
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className="space-y-4" side="right_special_50">
                    <SheetHeader>
                        <SheetTitle>View Transaction</SheetTitle>
                        <SheetDescription>
                            Transaction informations
                        </SheetDescription>
                    </SheetHeader>
                    {isLoading
                        ? (<div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="size-4 text-muted-foreground animate-spin" />
                        </div>)
                        : (
                            <ViewRequestForm
                                id={id}
                                defaultValues={defaultValues}
                                disabled={true}
                                bankOptions={bankOptions}
                                branchOptions={branchOptions}
                                payModeOptions={payModeOptions}
                                userOptions={userOptions}
                                statusOptions={statusOptions}
                            />
                        )
                    }

                </SheetContent>
            </Sheet>
        </>
    )
}
