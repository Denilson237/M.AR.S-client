import { Suspense } from 'react';
import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';

import UserViewPage from '@/modules/users/components/user-view-page';

export const metadata = {
  title: 'Administration Utilisateurs : modération des Comptes'
};

type PageProps = {
  readonly params: Promise<{ userId: string }>;
  readonly searchParams: Promise<{ e?: boolean }>;
};

export default async function Page({ params , searchParams}: PageProps) {
  const param = await params;
  const searchParam = await searchParams;
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <Suspense fallback={<FormCardSkeleton />}>
          <UserViewPage userId={param.userId} edit={searchParam.e} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
