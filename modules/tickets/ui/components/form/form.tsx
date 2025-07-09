"use client"

import { z } from "zod"
import { useEffect } from 'react';
import { useForm } from "react-hook-form"
import { useDebounce } from "use-debounce";
import { Loader2, Trash } from 'lucide-react';
import { zodResolver } from "@hookform/resolvers/zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from '@/components/ui/textarea';
import { Select } from "@/components/select"

import { useFetchContract } from '@/modules/customersReference/api/use-fetch-contract';


const formSchema = z.object({
    contractNumber: z.string().min(1, "Vous devez saisir un numéro de contrat"),
    type: z.string().min(1, "Vous devez sélectionner un type"),
    reason: z.string().nonempty("Raison requise"),
    comment: z.string().nullable().optional(),
    meterNumber: z.string().optional(),
    customerName: z.string().optional(),
    region: z.string().optional(),
    delegation: z.string().optional(),
    agency: z.string().optional(),
    unpaidCount: z.number().optional(),
    unpaidAmount: z.number().optional(),
});

const apiSchema: any = {}

type FormValues = z.input<typeof formSchema>;
type ApiFormValues = z.input<typeof apiSchema>;

type Props = {
    id?: string;
    defaultValues?: FormValues;
    onSubmit: (value: ApiFormValues) => void;
    onDelete?: () => void;
    disabled?: boolean;
    editable?: boolean;
}

export const FormComponent = (
    {
        id,
        defaultValues,
        onSubmit,
        onDelete,
        disabled,
        editable = true
    }: Props) => {

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    });

    const typeOptions: { label: string; value: string }[] = [
        { label: "COUPURE", value: "disconnect" },
        { label: "REMISE", value: "reconnect" },
    ] as const;

    const reasonsByType: Record<string, { label: string; value: string }[]> = {
        disconnect: [
            {
                label: "Impayée",
                value: "disconnect_unpaid_bill"
            },
            {
                label: "Résiliation",
                value: "disconnect_resiliation"
            },
            {
                label:
                    "CNPC",
                value: "disconnect_cnpc"
            },
            {
                label: "Intervention technique",
                value: "disconnect_technical_intervention"
            },
        ],
        reconnect: [
            {
                label: "Règlement partiel de la dette",
                value: "reconnect_partial_bill_paid"
            },
            {
                label: "Règlement total de la dette",
                value: "reconnect_full_bill_paid"
            },
            {
                label: "Reprise d'abonnement",
                value: "reconnect_subscription"
            },
            {
                label: "Correction anomalie technique",
                value: "reconnect_technical_issue"
            },
        ],
    };

    const type = form.watch("type");
    const reasonOptions = reasonsByType[type] || [];

    const reference = form.watch("contractNumber");
    const [debouncedReference] = useDebounce(reference, 500); // Délai de 500ms

    // Custom hook to fetch contract data
    const { data: contractData, isLoading } = useFetchContract(debouncedReference);

    useEffect(() => {
        if (contractData) {
            // Remplir automatiquement les champs
            form.setValue("meterNumber", contractData.NO_COMPTEUR);
            form.setValue("customerName", contractData.NOM_CLIENT);
            form.setValue("region", contractData.REGION);
            form.setValue("delegation", contractData.DIVISION);
            form.setValue("agency", contractData.AGENCE);
            form.setValue("unpaidCount", contractData.NB_UNPAID_BILLS);
            form.setValue("unpaidAmount", contractData.AMOUNT_UNPAID_BILLS);
        }
    }, [contractData, form]);


    const handleSubmit = (values: FormValues) => {
        onSubmit({
            ...values
        });
    }

    const handleDelete = () => {
        onDelete?.();
    }


    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="w-2/3 space-y-4 pt-4"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-4">
                        <div className="flex gap-2 items-center">
                            <FormField
                                control={form.control}
                                name="contractNumber"
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <FormLabel>Numero de contrat</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={disabled}
                                                placeholder=""
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <FormLabel>
                                            Type de demande
                                        </FormLabel>
                                        <FormControl>
                                            <Select
                                                placeholder="Selectionner l'action"
                                                options={typeOptions}
                                                value={field.value}
                                                // onChange={field.onChange}
                                                onChange={(value) => {
                                                    field.onChange(value);
                                                    //setValue("unitId", ''); // Réinitialiser l'unité sélectionnée
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Motif
                                    </FormLabel>
                                    <FormControl>
                                        <Select
                                            placeholder="Selectionner le motif de votre demande"
                                            options={reasonOptions}
                                            value={field.value}
                                            // onChange={field.onChange}
                                            onChange={(value) => {
                                                field.onChange(value);
                                                //setValue("unitId", ''); // Réinitialiser l'unité sélectionnée
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="meterNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Numéro de compteur
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={true}
                                            {...field}
                                            value={field.value ?? ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex gap-2 items-center">
                            <div>
                                Factures en Impayés
                            </div>
                            <FormField
                                control={form.control}
                                name="unpaidCount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Nombre
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={true}
                                                {...field}
                                                value={field.value ?? ""}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="unpaidAmount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Montant
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={true}
                                                {...field}
                                                value={field.value ?? ""}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <FormField
                            control={form.control}
                            name="customerName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Nom(s) & prénom(s)
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={true}
                                            {...field}
                                            value={field.value ?? ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="region"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Region
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={true}
                                            {...field}
                                            value={field.value ?? ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="delegation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Delegation
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={true}
                                            value={field.value ?? ""}
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="agency"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Agence
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={true}
                                            value={field.value ?? ""}
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                </div>


                <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Comment</FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    value={field.value ?? ""}
                                    disabled={disabled}
                                    placeholder="Optional notes"

                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {
                    editable && (
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={disabled || isLoading}
                        >
                            {disabled ? (<><Loader2 className='animate-spin size-4 mr-2' /> Loading</>) : id ? "Save changes" : "Create request"}
                        </Button>
                    )
                }

                {
                    !!id && editable && (<Button
                        type="button"
                        className="w-full"
                        variant="outline"
                        onClick={handleDelete}
                        disabled={disabled}
                    >
                        <Trash className='size-4 mr-2' />
                        Delete request
                    </Button>)
                }
            </form>
        </Form>
    )
}
