"use client"

import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { 
    Card, 
    CardContent, 
    CardHeader 
} from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { useConfirm } from "@/hooks/use-confirm";


import {  FormComponent as Form } from "./form";
import { useCreateTicket } from "../../../hooks/use-create-ticket";


const formSchema: any = {}

// Type for form values based on schema
type FormValues = z.input<typeof formSchema>;


export function FormCard() {
    const router = useRouter();
    // State to capture message comming from the server 
    const [message, setMessage] = useState("");

    // Hook to handle confirmation dialogs with a specific title and message
    const [ConfirmationDialog, confirm] = useConfirm({
        title: "Are you sure?",
        message: `You are about to record a request that matches an existing entry in our system.
     ${message} . Please confirm if you wish to proceed with this action, as it may result in duplicate records.`,
    });

    // Mutation for creating a new request
    const mutation = useCreateTicket();

    // Check if any mutations are currently pending
    const isPending =
        mutation.isPending

    // Handle form submission
    const onSubmit = async (values: FormValues) => {
        mutation.mutate(values, {
            onSuccess: () => router.push("/dashboard/request/me"), // Close the sheet on successful submission
            onError: (error) => { alert(error.message) }
        });
    }

    return (
        <>
            {/* Confirmation dialog component for user prompts */}
            <ConfirmationDialog />
            <Card className="mx-auto w-full">
                <CardHeader>
                    <Heading
                        title='Coupure/remise'
                        description="Creer une demande de coupure/remise"
                    />
                </CardHeader>
                <CardContent>
                    <Form
                        onSubmit={onSubmit}
                        disabled={isPending}
                    />
                </CardContent>
            </Card>
        </>

    )
}
