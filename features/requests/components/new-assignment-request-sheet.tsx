import { useState } from "react";
import { z } from "zod";
import { formatDate } from "date-fns";
import { Loader2 } from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

import { useConfirm } from "@/hooks/use-confirm";
import { useGetUnits } from "@/features/unit/api/use-get-units";
import { useGetRegions } from "@/features/regions/api/use-get-regions";

import { useNewAssignmentRequest } from "../hooks/use-new-assignment-request";
// import { AssignmentRequestForm } from "../../../modules/tickets/ui/components/form/form";
// import { useCreateAssignmentRequest } from "../../../modules/tickets/hooks/use-create-ticket";


// Define the form schema (currently set to any for flexibility)
const formSchema: any = {}

// Type for form values based on schema
type FormValues = z.input<typeof formSchema>;


export function NewAssignmentRequestSheet() {
    // Custom hook for managing the new request sheet state
    const { isOpen, onClose } = useNewAssignmentRequest();

    // State to capture message comming from the server 
    const [message, setMessage] = useState("");

    // Hook to handle confirmation dialogs with a specific title and message
    const [ConfirmationDialog, confirm] = useConfirm({
        title: "Are you sure?",
        message: `You are about to record a request that matches an existing entry in our system.
     ${message} . Please confirm if you wish to proceed with this action, as it may result in duplicate records.`,
    });

    // Mutation for creating a new request
    // const mutation = useCreateAssignmentRequest();

    // Fetch available regions
    const regionQuery = useGetRegions();
    // Map fetched regions to options suitable for a select input
    const regionOptions = (regionQuery.data ?? []).map(
        (item: { name: any; id: any; }) => ({
            label: item.name,
            value: item.id
        })
    );

    // Fetch available units
    const unitQuery = useGetUnits();
    // Map fetched units to options suitable for a select input
    const unitOptions = (unitQuery.data ?? []).map(
        (item: { name: any; id: any; regionId: any }) => ({
            label: item.name,
            value: item.id,
            regionId: item.regionId  // Associated region ID for the unit
        })
    );

    // Check if any mutations are currently pending
    // const isPending =
    //     mutation.isPending

    // Check if any queries are currently loading
    const isLoading =
        regionQuery.isLoading ||
        unitQuery.isLoading;

    // Handle form submission
    const onSubmit = async (values: FormValues) => {
        // mutation.mutate(values, {
        //     onSuccess: onClose, // Close the sheet on successful submission
        //     //onError: (error) => { alert(error.message) }
        // });
    }


    return (
        <>
            {/* Confirmation dialog component for user prompts */}
            <ConfirmationDialog />

            {/* Sheet component that serves as a modal or side panel */}
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className=" sm:w-[540px] space-y-4" side="right_special">
                    <SheetHeader>
                        <SheetTitle>New Assignment Request</SheetTitle>
                        <SheetDescription>
                            Add a new request.
                        </SheetDescription>
                    </SheetHeader>
                    {
                        isLoading
                            ? (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Loader2 className="size-4 text-muted-foreground animate-spin" />
                                </div>
                            )
                            : ( ""
                                // Render the request form when not loading
                                // <AssignmentRequestForm
                                //     onSubmit={onSubmit}                // Handle form submission
                                //     disabled={isPending}               // Disable form while pending
                                
                                // />
                            )
                    }
                </SheetContent>
            </Sheet>
        </>

    )
}
