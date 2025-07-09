"use client"
import PageContainer from '@/components/layout/page-container';
import { useCreateWorkflow } from '@/modules/workflows/api/use-create-workflow';
import { formSchema } from '@/modules/workflows/components/workflow-schema';
import { WorkflowStepForm } from '@/modules/workflows/components/workflow-step-form'
import { useRouter } from 'next/navigation';
import React from 'react'
import { z } from "zod";

type FormValues = z.input<typeof formSchema>;

const Page = () => {
  const router = useRouter();

  const mutation = useCreateWorkflow();

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: (data) => {
        router.push(`/admin/workflow/${data.id}/steps/new`);
      },
    });
  }

  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <WorkflowStepForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          id={undefined}
          defaultValues={{
            name: '',
            description: '',
            isActive: true,
          }}
          onAction={undefined}
          onDelete={undefined}
        />
      </div>
    </PageContainer>
  )
}

export default Page