import Link from 'next/link';
import { Suspense } from 'react';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { SearchParams } from 'nuqs/server';

import { searchParamsCache, serialize } from '@/lib/searchparams';

import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { buttonVariants } from '@/components/ui/button';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import PageContainer from '@/components/layout/page-container';

import { RolePage } from '@/modules/permissions/components/role-page';


export const metadata = {
  title: 'Administration Utilisateurs',
};

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function AdminPage(props: pageProps) {
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
            title='RBAC (Roles & Permissions)'
            description='Liste des roles'
          />
          <Link
            href='/admin/roles-permissions/role/new'
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            <Plus className='mr-2 h-4 w-4' /> Créer un role
          </Link>
        </div>
        <Separator />
        <Suspense
          key={key}
          fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
        >
          <RolePage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
