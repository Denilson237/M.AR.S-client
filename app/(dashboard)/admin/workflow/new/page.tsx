import { Suspense } from 'react';
import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';

import WorkflowViewPage from '@/modules/workflows/components/workflow-view-page';
import { EditUserPage } from '@/modules/users/components/edit-user-page';
import { NewWorkflowPage } from '@/modules/workflows/components/new-workflow-page';

export const metadata = {
  title: 'Administration workflow : modération des workflows'
};


export default function Page() {
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <Suspense fallback={<FormCardSkeleton />}>
          {/* <WorkflowViewPage workflowId={params.workflowId} edit={searchParams.e} /> */}
          <NewWorkflowPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
