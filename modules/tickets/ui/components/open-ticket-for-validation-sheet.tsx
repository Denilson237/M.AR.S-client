import { z } from "zod";

import { Loader2 } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

import { useConfirm } from "@/hooks/use-confirm";
import { useGetRequest } from "@/features/transactions/api/use-get-request";
import { useEditRequest } from "@/features/transactions/api/use-edit-request";
import { useOpenRequestValidation } from "@/features/transactions/hooks/use-open-request-for-validation";
import { RequestFormForValidation } from "@/modules/tickets/ui/components/ticket-form-for-validation";
import { status } from "@/config/status.config";
import { useGetAssignmentRequest } from "@/features/requests/api/use-get-assignment-request";
import { useOpenTicketValidation } from "@/modules/tickets/hooks/use-open-ticket-for-validation";
import { useEditAssignmentRequest } from "@/features/requests/api/use-edit-assignment-request";
import { useValidateTicket } from "../../hooks/use-validate-ticket";



export function OpenTicketForValidationSheet() {
    const { isOpen, onClose, id } = useOpenTicketValidation();
    const [ConfirmationDialog, confirm] = useConfirm({
        title: "Are you sure?",
        message: "You are about to validate this request , Are you sure you want to perform this action?",
    });

    const transactionQuery = useGetAssignmentRequest(id);

    const validateMutation = useValidateTicket(id);
    const rejectMutation = useValidateTicket(id);

    const isPending = validateMutation.isPending || rejectMutation.isPending;
    const isLoading = transactionQuery.isLoading;

    const defaultValues = transactionQuery.data
        ? {
            name: transactionQuery.data.NOM_CLIENT,
            amount: transactionQuery.data.unpaidAmount?.toString(),
            count: transactionQuery.data.unpaidCount?.toString(),
            region: transactionQuery.data.REGION,
            division: transactionQuery.data.DIVISION,
            branch: transactionQuery.data.AGENCE,
            tarif: transactionQuery.data.lIBELLE_TARIF_CLIENT,
            // createdAt: transactionQuery.data.createdAt
            //     ? new Date(transactionQuery.data.paymentDate)
            //     : new Date(),
            type: transactionQuery.data.type.toUpperCase(),
            comment: transactionQuery.data.comment ?? "",
        }
        : {
            name: "",
            amount: "",
            count: "",
            region: "",
            division: "",
            branch: "",
            tarif: "",
           // createdAt: new Date(),
            type: "",
            comment: "",
        };

    const onValidate = async () => {
        const ok = await confirm();
        if (ok) {
            validateMutation.mutate({ }, {
                onSuccess: (data) => {
                    console.log(data)
                    onClose();
                },
            });
        }

    }
    const onReject = async (value: any) => {
        rejectMutation.mutate(value, {
            onSuccess: () => {
                onClose();
            },
        });
    }

    if (!id) return

    return (
        <>
            <ConfirmationDialog />
            <Sheet open={isOpen} onOpenChange={onClose} >
                <SheetContent className="space-y-4" side="right_special2">
                    <SheetHeader >
                        <SheetTitle className="text-center">Ticket validation</SheetTitle>
                        <SheetDescription className="text-center">
                            <p className="text-sm text-muted-foreground">Validation de la demande de coupure/remise</p>
                            <p className="text-sm text-muted-foreground">Veuillez vérifier les informations ci-dessous avant de valider la demande.</p>
                        </SheetDescription>
                    </SheetHeader>
                    {isLoading
                        ? (<div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="size-4 text-muted-foreground animate-spin" />
                        </div>)
                        : (
                            <RequestFormForValidation
                                id={id}
                                defaultValues={defaultValues}
                                onValidate={onValidate}
                                onReject={onReject}
                                disabled={isPending}
                                advice={false}
                            />
                        )
                    }

                </SheetContent>
            </Sheet>
        </>
    )
}
