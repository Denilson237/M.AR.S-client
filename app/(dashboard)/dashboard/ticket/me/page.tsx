import Link from 'next/link';
import { Suspense } from 'react';
import { Plus } from 'lucide-react';
import { SearchParams } from 'nuqs/server';

import { cn } from '@/lib/utils';
import { searchParamsCache, serialize } from '@/lib/searchparams';

import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { buttonVariants } from '@/components/ui/button';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';

import { ImportButton } from '@/modules/tickets/ui/components/import';
import { DataTableComponent as DataTable } from '@/modules/tickets/ui/components/table/my-ticket-table';


export const metadata = {
    title: 'MARS: liste de tous les demandes coupures/remises',
};

type pageProps = {
    readonly searchParams: Promise<SearchParams>;
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
                        title={`Mes demandes`}
                        description="Gestion de les demandes coupures/remises"
                    />
                    <div className='flex flex-col md:flex-row gap-2'>
                        <Link
                            href='/dashboard/ticket/me/new'
                            className={cn(buttonVariants(), 'text-xs md:text-sm')}
                        >
                            <Plus className='mr-2 h-4 w-4' />Créer une demande
                        </Link>
                        <ImportButton />
                    </div>

                </div>
                <Separator />
                <Suspense
                    key={key}
                    fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
                >
                    <DataTable  />
                </Suspense>
            </div>
        </PageContainer>
    );
}


