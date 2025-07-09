import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import { FormCard } from '@/modules/tickets/ui/components/form/form-card';

export const metadata = {
  title: 'Demandes : Nouvelle demande de coupure/remise',
  description: 'Créer une nouvelle demande de coupure/remise',
};

export default async function Page() {
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          <FormCard />
        </Suspense>
      </div>
    </PageContainer>
  );
}
