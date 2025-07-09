"use client"
import { notFound } from 'next/navigation';

//import { EditUserPage } from './edit-workflow-page';
import { ViewWorkflowPage } from './view-workflow-page';
import { NewWorkflowPage } from './new-workflow-page';

type ViewPageProps = {
  workflowId: string;
  edit?: boolean;
};

export default  function WorkflowViewPage({
  workflowId,
  edit = false
}: ViewPageProps) {
  let user = null;

  if (workflowId !== 'new') {
    // if (!userId) {
    //   notFound();
    // }
    if (edit) {
      // return <EditUserPage id={workflowId} />
    }
    return <ViewWorkflowPage id={workflowId} />
  }

  return <NewWorkflowPage/>

}
