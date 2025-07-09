import { z } from "zod";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

import { useCreateUser } from "@/modules/users/api/use-create-user";
import { useNewUser } from "@/modules/users/hooks/use-new-user";
import { UserForm } from "@/modules/users/components/user-form";
import { formSchema } from "@/modules/users/schema/user-schema";


type FormValues = z.input<typeof formSchema>;

export function NewUserSheet() {
    const { isOpen, onClose } = useNewUser();

    const mutation = useCreateUser();

    const onSubmit = (values: FormValues) => {
        mutation.mutate(values, {
            onSuccess: () => {
                onClose();
            },
        });
    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4" side="right_special2">
                <SheetHeader>
                    <SheetTitle>Nouveau Utilisateur</SheetTitle>
                    <SheetDescription>
                        {`Creation d'un nouveau utilisateur`}
                    </SheetDescription>
                </SheetHeader>
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
            </SheetContent>
        </Sheet>
    )
}
