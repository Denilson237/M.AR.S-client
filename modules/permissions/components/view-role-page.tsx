import { Loader2 } from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
} from '@/components/ui/card';
import { Heading } from "@/components/ui/heading";

import { RoleForm } from "./role-form";
import { useGetRole } from "../api/use-get-role";


export function ViewRolePage({ id }: { id: string }) {
    const query = useGetRole(id);
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

    return (
        <>
            <Card className="mx-auto w-full">
                <CardHeader>
                    <Heading
                        title='Role'
                        description="Consulter le détail d'un role"
                    />
                </CardHeader>
                <CardContent>
                    {isLoading
                        ? (<div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="size-4 text-muted-foreground animate-spin" />
                        </div>)
                        : (
                            <RoleForm
                                onSubmit={() => { }}
                                disabled={true}
                                id={id}
                                defaultValues={defaultValues}
                                onDelete={undefined}
                                edit={false}
                            />
                        )
                    }

                </CardContent>
            </Card>

        </>
    )
}
