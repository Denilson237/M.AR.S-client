import { Loader2 } from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
} from '@/components/ui/card';
import { Heading } from "@/components/ui/heading";

import { useGetUser } from "@/modules/users/api/use-get-user";
import { UserForm } from "@/modules/users/components/user-form";


export function ViewUserPage({ id }: { id: string }) {
    const UserQuery = useGetUser(id);
    const isLoading = UserQuery.isLoading;

    const defaultValues = UserQuery.data
        ? {
            name: UserQuery.data.name,
            email: UserQuery.data.email,
            phone: UserQuery.data.phone,
            unitId: UserQuery.data.unitId,
            ldap: UserQuery.data.ldap,
            password: UserQuery.data.password,
            passwordConfirm: UserQuery.data.password,
            roleId: UserQuery.data.roleId,
            deleted: UserQuery.data.deleted
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

    return (
        <>
            <Card className="mx-auto w-full">
                <CardHeader>
                    <Heading
                        title='Utilisateur'
                        description="Consulter les informations de l'utilisateur"
                    />
                </CardHeader>
                <CardContent>
                    {isLoading
                        ? (<div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="size-4 text-muted-foreground animate-spin" />
                        </div>)
                        : (
                            <UserForm
                                onSubmit={() => { }}
                                disabled={true}
                                id={id}
                                defaultValues={defaultValues}
                                onAction={() => { }}
                                onDelete={() => { }}
                                edit={false}
                            />
                        )
                    }

                </CardContent>
            </Card>

        </>
    )
}
