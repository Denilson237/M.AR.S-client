import React from 'react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import DataTable, { ApiFilters } from '@/components/data-table-with-advance-filter';

// import { useCreateAssignmentRequest } from '../../../modules/tickets/hooks/use-create-ticket';
import { useUnAssignmentRequest } from '../hooks/use-new-unassignment-request';
//import { columns, columnsFilters } from '@/app/(dashboard)/transactions/_components/disassign/columns';

// import { useGetAllRequests } from '@/features/transactions/api/use-get-all-requests';
import { useGetRequestsEligibleUnAssignments } from '@/features/transactions/api/use-get-requests-eligible-unassignments';
type Props = {}

const NewUnAssignmentRequestSheet = (props: Props) => {

    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(10);
    const [apiFilters, setApiFilters] = React.useState<ApiFilters | null>(null);

    const getTransactionsQuery = useGetRequestsEligibleUnAssignments(page, limit, apiFilters);

    const transactions = getTransactionsQuery.data?.data || [];
    const totalItems = getTransactionsQuery.data?.totalItems || 0;

    const getExportQuery = useGetRequestsEligibleUnAssignments(page, totalItems, null);
    const exportData = getExportQuery.data?.data || [];

    const { isOpen, onClose } = useUnAssignmentRequest();
    // const mutation = useCreateAssignmentRequest();

    const handleClose = () => {
        onClose(); // Close the dialog box
    };

    // const isDisabled = mutation.isPending
    //     || getTransactionsQuery.isLoading;

    return (
        <Dialog open={isOpen} onOpenChange={() => { /* Ne rien faire ici */ }}>
            <DialogContent className="w-full h-full mx-auto max-w-full max-h-full overflow-auto">
                <DialogHeader>
                    <DialogTitle>All transactions assign an awaiting Kam input</DialogTitle>
                    <DialogDescription>
                        Unassign many transactions at once.
                    </DialogDescription>
                </DialogHeader>
                {/* <DataTable
                    label={"Requests awaiting KAM input"}
                    columns={columns}
                    data={transactions}
                    isLoading={getTransactionsQuery.isLoading}
                    isError={getTransactionsQuery.isError}
                    disabled={isDisabled}
                    totalItems={totalItems}
                    page={page}
                    limit={limit}
                    setPage={setPage}
                    setLimit={setLimit}
                    setApiFilters={setApiFilters}
                    // filter feature
                    isFilterable={true}
                    filterColumns={columnsFilters}
                    // Full Export feature
                    isExportable={true}
                    exportData={exportData}
                    // Delete feature
                    isDeletable={false}
                    onDelete={(row) => { }}
                /> */}
                <DialogFooter>
                    <Button onClick={handleClose} >Close </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default NewUnAssignmentRequestSheet;