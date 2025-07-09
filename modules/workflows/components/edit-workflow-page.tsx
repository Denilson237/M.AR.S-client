"use client"

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
import { useDeleteWorkflow } from "../api/use-delete-workflow";

import { UserForm } from "@/modules/users/components/user-form";

import { useConfirm } from "@/hooks/use-confirm";

import { formSchema } from "./workflow-schema";

import { useRouter } from "next/navigation";
import { Heading } from "@/components/ui/heading";
import { useGetWorkflow } from "../api/use-get-workflow";
import { useUpdateWorkflow } from "../api/use-edit-workflow";
import { WorkflowForm } from "./workflow-form";


type FormValues = z.input<typeof formSchema>;

export function EditWorkflowPage({ id }: { id: string }) {
    const router = useRouter();

    const query = useGetWorkflow(id);
    const editMutation = useUpdateWorkflow(id);
    const actionMutation = useDisReactiveUser(id);
    const deleteMutation = useDeleteWorkflow(id);

    const isPending = editMutation.isPending
        || actionMutation.isPending
        || deleteMutation.isPending;

    const isLoading = query.isLoading;

    const defaultValues = query.data
        ? {
            name: query.data.name,
            email: query.data.email,
            phone: query.data.phone,
            unitId: query.data.unitId,
            ldap: query.data.ldap,
            password: query.data.password,
            passwordConfirm: query.data.password,
            roleId: query.data.roleId,
            deleted: query.data.deleted
        }
        : {
            name: "",
            email: "",
            phone: "",
            unitId: "",
            ldap: true,
            password: "",
            passwordConfirm: "",
            roleId: [],
            deleted: false
        };

    const action = defaultValues.deleted ? "Deactivation" : "Reactivation";
    const [ConfirmationActionDialog, actionConfirm] = useConfirm({
        title: "Are you sure?",
        message: `You are about to ${action.toLowerCase()} this user. Are you sure you want to proceed?`,
    });

    const [ConfirmationDialog, confirm] = useConfirm({
        title: "Are you sure?",
        message: `You are about to delete this user.?`,
    });

    const onSubmit = (values: FormValues) => {
        editMutation.mutate(values, {
            onSuccess: () => {
                router.push('/admin/user');
            },
        });
    }

    const onAction = async () => {
        const ok = await actionConfirm();
        if (ok) {
            actionMutation.mutate(undefined, {
                onSuccess: () => {
                    //router.push(`/admin/user/${id}`);
                },
            });
        }
    }

    const onDelete = async () => {
        const ok = await confirm();
        if (ok) {
            deleteMutation.mutate(undefined, {
                onSuccess: () => {
                    router.push('/admin/user');
                },
            });
        }
    }

    return (
        <>
            <ConfirmationDialog />
            <ConfirmationActionDialog />
            <Card className="mx-auto w-full">
                <CardHeader>
                    <Heading
                        title='Workflow'
                        description="Modification du Workflow"
                    />
                </CardHeader>
                <CardContent>
                    {isLoading
                        ? (<div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="size-4 text-muted-foreground animate-spin" />
                        </div>)
                        : (
                            <WorkflowForm
                                onSubmit={onSubmit}
                                disabled={isPending}
                                id={id}
                                defaultValues={defaultValues}
                                onAction={onAction}
                                onDelete={onDelete}
                            />
                        )
                    }

                </CardContent>
            </Card>

        </>
    )
}
