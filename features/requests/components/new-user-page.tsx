import { z } from "zod";

import { useRouter } from "next/navigation";

import {
    Card,
    CardContent,
    CardHeader
} from '@/components/ui/card';
import { Heading } from "@/components/ui/heading";


import { UserForm } from "@/modules/users/components/user-form";
import { formSchema } from "@/modules/users/schema/user-schema";
import { useCreateUser } from "@/modules/users/api/use-create-user";


type FormValues = z.input<typeof formSchema>;

export function NewUserPage() {
    const router = useRouter();

    const mutation = useCreateUser();

    const onSubmit = (values: FormValues) => {
        mutation.mutate(values, {
            onSuccess: () => {
                router.push('/admin/user');
            },
        });
    }

    return (
        <Card className="mx-auto w-full">
            <CardHeader>
                <Heading
                    title='Utilisateur'
                    description="Creation d'un nouveau utilisateur"
                />
            </CardHeader>
            <CardContent>
                <UserForm
                    onSubmit={onSubmit}
                    disabled={mutation.isPending}
                    id={undefined}
                    defaultValues={{
                        name: '',
                        email: '',
                        phone: '',
                        ldap: true,
                        roleId: [],  // fe91303b-9577-4638-aa2a-fd1f8c22b28e is the id of role: USER FOR DEFAULT SELECT USER
                        password: '',
                        passwordConfirm: '',
                        unitId: ''
                    }}
                    onAction={undefined}
                    onDelete={undefined}
                />
            </CardContent>
        </Card>

    )
}
