import { Suspense } from 'react';
import { SearchParams } from 'nuqs/server';

import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import PageContainer from '@/components/layout/page-container';

import { searchParamsCache, serialize } from '@/lib/searchparams';

import CustomerNotRemotelyReadableView from '@/modules/customersReference/ui/customer-not-remotely-readable-view';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';


export const metadata = {
  title: 'MARS Customer',
};

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function CustomerPage(props: pageProps) {
  const searchParams = await props.searchParams;
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  const key = serialize({ ...searchParams });

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title="Clients (non lisibles à distance)"
            description="Listes de tous les clients non télémétriques (non lisibles à distance) ayant un compteur non télémetrique."
          />
          <div className='flex flex-col md:flex-row gap-2'>
            <Link
              href='/dashboard/request/me/new'
              className={cn(buttonVariants(), 'text-xs md:text-sm')}
            >
              <Plus className='mr-2 h-4 w-4' /> Ajouter 
            </Link>
          </div>
        </div>
        <Separator />
        <Suspense
          key={key}
          fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
        >
          <CustomerNotRemotelyReadableView />
        </Suspense>
      </div>
    </PageContainer>
  );
}
