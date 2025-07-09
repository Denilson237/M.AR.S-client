
import { Suspense } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { SearchParams } from 'nuqs/server';

import { cn } from '@/lib/utils';
import { searchParamsCache, serialize } from '@/lib/searchparams';

import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Button, buttonVariants } from '@/components/ui/button';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';


import { useNewAssignmentRequest } from '@/features/requests/hooks/use-new-assignment-request';
import { useNewManyAssignmentRequest } from '@/features/requests/hooks/use-new-many-assignment-request';
import { RequestsListingTable } from '@/modules/tickets/ui/components/validation-listing-table/requests-listing-table';


export const metadata = {
    title: 'MARS: liste de tous les demandes coupures/remises',
};

type pageProps = {
    searchParams: Promise<SearchParams>;
};

export default async function Page(props: pageProps) {
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
                        title={`Demandes en attente de validation`}
                        description="Gestion de les demandes coupures/remises"
                    />
                    <Link
                        href='/dashboard/request/me/new'
                        className={cn(buttonVariants(), 'text-xs md:text-sm')}
                    >
                        <Plus className='mr-2 h-4 w-4' /> validation en masse
                    </Link>
                </div>
                <Separator />
                <Suspense
                    // key={key}
                    fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
                >
                    <RequestsListingTable isPersonal={true} />
                </Suspense>
            </div>
        </PageContainer>
    );
}
