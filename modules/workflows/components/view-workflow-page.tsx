import { Loader2 } from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
} from '@/components/ui/card';
import { Heading } from "@/components/ui/heading";
import { WorkflowForm } from "./workflow-form";
import { useGetWorkflow } from "../api/use-get-workflow";


export function ViewWorkflowPage({ id }: { id: string }) {
    const query = useGetWorkflow(id) ;
    const isLoading = query.isLoading;

    const defaultValues = query.data
    ? {
        name: query.data.name ?? "",
        description: query.data.description ?? "",
    }
    : {
        name: "",
        description: "",
    };

    return (
        <>
            <Card className="mx-auto w-full">
                <CardHeader>
                    <Heading
                        title='Workflow'
                        description="Consulter les informations du Workflow"
                    />
                </CardHeader>
                <CardContent>
                    {isLoading
                        ? (<div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="size-4 text-muted-foreground animate-spin" />
                        </div>)
                        : (
                            <WorkflowForm
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
