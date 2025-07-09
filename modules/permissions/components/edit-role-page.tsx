import { z } from "zod";
import { Loader2 } from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
} from '@/components/ui/card';

import { useGetUser } from "@/modules/users/api/use-get-user";
import { useUpdateUser } from "@/modules/users/api/use-edit-user";
import { useDisReactiveUser } from "@/modules/users/api/use-dis-reactivate-user";


import { UserForm } from "@/modules/users/components/user-form";

import { useConfirm } from "@/hooks/use-confirm";


import { useRouter } from "next/navigation";
import { Heading } from "@/components/ui/heading";
import { formSchema } from "../schema/role-schema";
import { useDeleteUser } from "@/modules/users/api/use-delete-user";
import { useGetRole } from "../api/use-get-role";
import { useDeleteRole } from "../api/use-delete-role";
import { RoleForm } from "./role-form";
import { useUpdateRole } from "../api/use-edit-role";


type FormValues = z.input<typeof formSchema>;

export function EditRolePage({ id }: { id: string }) {
    const router = useRouter();

    const query = useGetRole(id);
    const editMutation = useUpdateRole(id);
    const deleteMutation = useDeleteRole(id);

    const isPending = editMutation.isPending
        || deleteMutation.isPending;

    const isLoading = query.isLoading;

    const defaultValues = query.data
        ? {
            name: query.data.name,
            description: query.data.description,
            permissionsId: query.data.permissionsId,
        }
        : {
            name: '',
            description: '',
            permissionsId: [],
        };


    const [ConfirmationDialog, confirm] = useConfirm({
        title: "Are you sure?",
        message: `You are about to delete this role.?`,
    });

    const onSubmit = (values: FormValues) => {
        editMutation.mutate(values, {
            onSuccess: () => {
                router.push('/admin/role-permission');
            },
        });
    }

    const onDelete = async () => {
        const ok = await confirm();
        if (ok) {
            deleteMutation.mutate(undefined, {
                onSuccess: () => {
                    router.push('/admin/role-permission');
                },
            });
        }
    }

    return (
        <>
            <ConfirmationDialog />
            <Card className="mx-auto w-full">
                <CardHeader>
                    <Heading
                        title='Role'
                        description="Modification des informations du role"
                    />
                </CardHeader>
                <CardContent>
                    {isLoading
                        ? (<div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="size-4 text-muted-foreground animate-spin" />
                        </div>)
                        : (
                            <RoleForm
                                onSubmit={onSubmit}
                                disabled={isPending}
                                id={id}
                                defaultValues={defaultValues}
                                onDelete={onDelete}
                                edit={true}
                            />
                        )
                    }

                </CardContent>
            </Card>

        </>
    )
}
