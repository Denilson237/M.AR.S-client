"use client"
import { notFound } from 'next/navigation';
import { EditWorkflowPage } from '@/modules/workflows/components/edit-workflow-page';
import { ViewWorkflowPage } from './view-workflow-page';
import { NewWorkflowPage } from './new-workflow-page';

type ViewPageProps = {
  workflowId: string;
  edit?: boolean;
};

export default function WorkflowViewPage({
  workflowId,
  edit = false
}: ViewPageProps) {

  if (workflowId !== 'new') {
    if (edit) {
      return <EditWorkflowPage id={workflowId} />
    }
    return <ViewWorkflowPage id={workflowId} />
  }

  return <NewWorkflowPage />;
}
