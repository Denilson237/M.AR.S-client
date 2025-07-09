import { z } from "zod";

import { useRouter } from "next/navigation";

import {
    Card,
    CardContent,
    CardHeader
} from '@/components/ui/card';
import { Heading } from "@/components/ui/heading";

import { UserForm } from "@/modules/users/components/user-form";

import { RoleForm } from "./role-form";
import { useCreateRole } from "../api/use-create-role";
import { formSchema } from "../schema/role-schema";


type FormValues = z.input<typeof formSchema>;

export function NewRolePage() {
    const router = useRouter();

    const mutation = useCreateRole();

    const onSubmit = (values: FormValues) => {
        mutation.mutate(values, {
            onSuccess: () => {
                router.push('/admin/role-permission');
            },
        });
    }

    return (
        <Card className="mx-auto w-full">
            <CardHeader>
                <Heading
                    title='Role'
                    description="Creation d'un nouveau role"
                />
            </CardHeader>
            <CardContent>
                <RoleForm
                    onSubmit={onSubmit}
                    disabled={mutation.isPending}
                    id={undefined}
                    defaultValues={{
                        name: '',
                        description: '',
                        permissionsId: [],  
                    }}
                    onDelete={undefined}
                />
            </CardContent>
        </Card>

    )
}
