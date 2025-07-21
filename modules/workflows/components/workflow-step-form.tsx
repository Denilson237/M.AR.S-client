"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Shield, Trash, User, CheckCircle, Briefcase, DollarSign, PowerOff, Power } from 'lucide-react';

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
import { Textarea } from "@/components/ui/textarea";

import { useGetRoles } from "@/modules/permissions/api/use-get-roles"
import { useGetUnits } from "@/features/unit/api/use-get-units"
import { formSchema } from "./workflow-schema";


type FormValues = z.input<typeof formSchema>;

type Props = {
    id?: string;
    defaultValues?: FormValues;
    onSubmit: (value: FormValues) => void;
    onAction?: () => void;
    onDelete?: () => void;
    disabled?: boolean;
    edit?: boolean;
}

export const WorkflowStepForm = ({
    id,
    defaultValues,
    onSubmit,
    onAction,
    onDelete,
    disabled,
    edit = true
}: Props) => {

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    });

    // Fetch units 
    const unitsQuery = useGetUnits();

    // Process unit options
    const unitOptions = (unitsQuery.data ?? []).map((item: { name: any; id: any; regionId: any }) => ({
        label: item.name,
        value: item.id,
        regionId: item.regionId
    }));

    // Define role icons 
    type RoleName = 'ADMIN' | 'VALIDATOR' | 'ASSIGNATOR' | 'MANAGER' | 'COMMERCIAL';
    const roleIcons: Record<RoleName, React.FC> = {
        ADMIN: Shield,
        VALIDATOR: CheckCircle,
        ASSIGNATOR: Briefcase,
        MANAGER: DollarSign,
        COMMERCIAL: User,
    };

    // Fetch roles
    const rolesQuery = useGetRoles();

    // Process roles options
    const rolesOptions = (rolesQuery.data ?? []).map((item: { name: string; id: string }) => {
        // Obtenir l'icône en fonction du nom du rôle, avec une valeur par défaut
        const icon = roleIcons[item.name.toUpperCase() as RoleName] || User; // Utiliser User comme icône par défaut
        return {
            label: item.name,
            value: item.id,
            icon: icon,
        };
    });

    // Handle form submission
    const handleSubmit = (values: FormValues) => {
        onSubmit(values);
    }

    // Handle actions
    const handleAction = () => {
        onAction?.();
    }

    // Handle deletion
    const handleDelete = () => {
        onDelete?.();
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="w-2/3 space-y-4 pt-4"
            >
                <div className="grid grid-cols-1 gap-6 ">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={disabled}
                                        placeholder="E.g. Denilson Ngoumla."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Order</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={disabled}
                                        placeholder="E.g. Denilson Ngoumla."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        disabled={disabled}
                                        placeholder="E.g. Workflow for the validation of the purchase order."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>



                <div className="my-10" />
                {
                    edit && (
                        <div className="mt-6 flex items-center justify-left gap-4">
                            <Button
                                type="submit"
                                className=""
                                disabled={disabled}
                            >
                                {disabled ? (<><Loader2 className='animate-spin size-4 mr-2' /> Loading</>) : id ? "Save changes" : "Create Workflow"}
                            </Button>
                            {
                                !!id && (<Button
                                    type="button"
                                    className=""
                                    variant={defaultValues?.isActive ? "success" : "destructive"}
                                    onClick={handleAction}
                                    disabled={disabled}
                                >
                                    {defaultValues?.isActive ? <Power className="mr-2 size-4" /> : <PowerOff className="mr-2 size-4" />}
                                    {defaultValues?.isActive ? "Reactivation " : "Deactivation "} User
                                </Button>)

                            }
                            {
                                !!id && (<Button
                                    type="button"
                                    className=""
                                    variant="outline"
                                    onClick={handleDelete}
                                    disabled={disabled}
                                >
                                    <Trash className='size-4 mr-2' />
                                    Delete Workflow
                                </Button>)

                            }
                        </div>
                    )
                }


            </form>
        </Form>
    )
}