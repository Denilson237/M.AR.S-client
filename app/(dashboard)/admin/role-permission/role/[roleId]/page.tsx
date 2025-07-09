import { Suspense } from 'react';
import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';

import RoleViewPage from '@/modules/permissions/components/role-view-page';

export const metadata = {
  title: 'Administration Utilisateurs : modération des Comptes'
};

type PageProps = {
  params: Promise<{ roleId: string }>,
  searchParams: Promise<{ e?: boolean }>;
};


export default async function Page({ params , searchParams}: PageProps) {
  const paramsData = await params;
  const searchParamsData = await searchParams;  
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <Suspense fallback={<FormCardSkeleton />}>
          <RoleViewPage roleId={paramsData.roleId} edit={searchParamsData.e} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
