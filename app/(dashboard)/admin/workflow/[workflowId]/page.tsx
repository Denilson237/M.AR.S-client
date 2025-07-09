import { Suspense } from 'react';
import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';

import WorkflowViewPage from '@/modules/workflows/components/workflow-view-page';
import { EditUserPage } from '@/modules/users/components/edit-user-page';
import { EditWorkflowPage } from '@/modules/workflows/components/edit-workflow-page';

export const metadata = {
  title: 'Administration workflow : modération des workflows'
};

type PageProps = {
  readonly params: Promise<{ workflowId: string }>
  readonly searchParams: Promise<{ e?: boolean }>;
};


export default async function Page({ params , searchParams}: PageProps) {
  const param = await params;
  //const searchParam = await searchParams;
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <Suspense fallback={<FormCardSkeleton />}>
          {/* <WorkflowViewPage workflowId={params.workflowId} edit={searchParams.e} /> */}
          <EditWorkflowPage id={param.workflowId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
