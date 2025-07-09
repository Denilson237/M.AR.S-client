"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Shield, Trash } from 'lucide-react';

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

import { formSchema } from "../schema/role-schema";
import { Textarea } from "@/components/ui/textarea";
import { MultiSelect } from "@/components/multi-select"
import { useGetPermissions } from "../api/use-get-permissions";


// Define types based on the validation schema
type FormValues = z.input<typeof formSchema>;

type Props = {
    id?: string;
    defaultValues?: FormValues;
    onSubmit: (value: FormValues) => void;
    onDelete?: () => void;
    disabled?: boolean;
    edit?: boolean;
}

export const RoleForm = ({
    id,
    defaultValues,
    onSubmit,
    onDelete,
    disabled,
    edit = true
}: Props) => {

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    });


    // Fetch permissions options
    const permissionsQuery = useGetPermissions();

    // Process permissions options
    const permissionsOptions = (permissionsQuery.data ?? []).map((item: { name: string; id: string }) => {
        return {
            label: item.name,
            value: item.id,
            icon: Shield,
        };
    });

    // Handle form submission
    const handleSubmit = (values: FormValues) => {
        onSubmit(values);
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
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={disabled}
                                    placeholder="E.g. ADMIN."
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
                                    placeholder="Description du role "
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="permissionsId" // Set the name to the correct field
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Select permissions</FormLabel>
                            <FormControl>
                                <MultiSelect
                                    options={permissionsOptions}
                                    onValueChange={field.onChange} // Use field.onChange
                                    defaultValue={field.value} // Use field.value for default selected
                                    placeholder="Select permissions"
                                    variant="default"
                                    animation={2}
                                    maxCount={100}
                                    disabled={disabled}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="my-10" />
                {
                    edit && (
                        <div className="mt-4 w-2/3 space-y-4 pt-4">
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={disabled}
                            >
                                {disabled ? (<><Loader2 className='animate-spin size-4 mr-2' /> Loading</>) : id ? "Save changes" : "Create Role"}
                            </Button>
                            {
                                !!id && (<Button
                                    type="button"
                                    className="w-full"
                                    variant="outline"
                                    onClick={handleDelete}
                                    disabled={disabled}
                                >
                                    <Trash className='size-4 mr-2' />
                                    Delete Role
                                </Button>)

                            }
                        </div>
                    )
                }


            </form>
        </Form>
    )
}