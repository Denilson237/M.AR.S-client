"use client";

import * as React from "react";
import XLSX from 'xlsx';

import {
    ArrowUpDown,
    FileDown,
    Filter,
    FilterX,
    Loader2,
    Search,
    Settings2,
    Trash,
    X
} from "lucide-react";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { MdDownload } from "react-icons/md";
import {
    ColumnDef,
    Row,
    flexRender,
    SortingState,
    VisibilityState,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

import { getCurrentDateTime } from "@/lib/utils";
import { useConfirm } from "@/hooks/use-confirm";


interface Filter {
    field: string;
    operator: string;
    value: string | number;
    logical: 'AND' | 'OR';
}

interface Condition {
    operator: string;
    filters: Filter[];
}

export interface ApiFilters {
    conditions: Condition[];
}

export type columnsFilter = {
    accessorKey: string,
    title: string
}


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[],
    data: TData[],
    label: string,
    totalItems: number,
    filterColumns: columnsFilter[],
    isExportable?: boolean
    isDeletable?: boolean
    isFilterable?: boolean
    exportData: TData[]
    onDelete: (rows: Row<TData>[]) => void,
    disabled?: boolean,
    isLoading?: boolean,
    isError?: boolean,
    page: number,
    limit: number,
    setPage: {
        (updater: (prev: number) => number): void; // For functional updates
        (page: number): void; // For direct number updates
    }
    setLimit: (limit: number) => void,
    setApiFilters: (filters: ApiFilters | null) => void
}


export default function DataTable<TData, TValue>({
    columns,
    data,
    totalItems,
    disabled,
    isLoading,
    isError,
    page,
    limit,
    setPage,
    setLimit,
    setApiFilters,
    label,
    filterColumns,
    isFilterable = true,
    isDeletable = false,
    onDelete,
    isExportable = false,
    exportData

}: DataTableProps<TData, TValue>) {
    const initialFilterField = { columnKey: '', operator: '', value: '', logical: 'AND' };
    const getDefaultFilterField = () => ({
        columnKey: filterColumns[0]?.accessorKey || '',
        operator: 'equals', // Opérateur par défaut
        value: '',
        logical: 'AND'
    });

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [showFilterForm, setShowFilterForm] = React.useState(false);
    //const [filterFields, setFilterFields] = React.useState([{ ...initialFilterField }]);
    const [filterFields, setFilterFields] = React.useState([getDefaultFilterField()]);
    const [message, setMessage] = React.useState(`You are about to perform a bulk delete`);

    const [ConfirmationDialog, confirm] = useConfirm({
        title: "Are you sure?",
        message,
    });

    const transformFilters = (): ApiFilters | null => {
        const conditions: Condition[] = [];
        const filters: Filter[] = [];

        filterFields.forEach(({ columnKey, operator, value, logical }) => {
            if (columnKey && operator && value) {
                let parsedValue: string | number = value;

                // Convertir en nombre si l'opérateur est gte, lte, gt, ou lt
                if (['gte', 'lte', 'gt', 'lt'].includes(operator)) {
                    parsedValue = parseFloat(value);
                    if (isNaN(parsedValue)) {
                        // Si la conversion échoue, ignorer ce filtre
                        return;
                    }
                } else if (['equals', 'contains'].includes(operator)) {
                    if (columnKey === 'amount') {
                        parsedValue = parseFloat(value);
                        if (isNaN(parsedValue)) {
                            return;
                        }
                    } else {
                        // Pour equals et contains, garder la valeur en tant que chaîne de caractères
                        parsedValue = value.toString().trim(); // Supprimer les espaces blancs inutiles

                        // Si la valeur est vide après trim, ignorer ce filtre
                        if (parsedValue === '') {
                            return;
                        }
                    }

                }

                // filters.push({ field: columnKey, operator, value, logical: logical as 'AND' | 'OR' });
                filters.push({ field: columnKey, operator, value: parsedValue, logical: logical as 'AND' | 'OR' });
            }
        });

        if (filters.length > 0) {
            conditions.push({ operator: filters[0].logical, filters });
        }

        return conditions.length > 0 ? { conditions } : null;
    };

    function handleRemoveField(index: number): void {
        const newFields = filterFields.filter((_, i) => i !== index);
        setFilterFields(newFields);
        setApiFilters(transformFilters());
        setPage(1);
    }

    function handleAddField(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        //setFilterFields(prevFields => [...prevFields, { ...initialFilterField }]);
        setFilterFields(prevFields => [...prevFields, getDefaultFilterField()]);
    }

    const handleLogicalChange = (index: number, value: 'AND' | 'OR') => {
        const newFields = [...filterFields];
        newFields[index].logical = value;
        setFilterFields(newFields);
    };

    const activeFilters = filterFields.filter(field =>
        field.columnKey
        && field.operator
        // && field.value
        && (field.value !== '' && field.value !== null)
    );



    const getOperatorsForColumn = (columnKey: string) => {
        const column = filterColumns.find(c => c.accessorKey === columnKey);
        const isNumeric = column?.accessorKey === 'amount';

        return [
            { value: 'equals', label: isNumeric ? '=' : 'Equals' },
            { value: 'contains', label: 'Contains', hide: isNumeric },
            { value: 'gte', label: '≥', hide: !isNumeric },
            { value: 'lte', label: '≤', hide: !isNumeric },
            { value: 'gt', label: '>', hide: !isNumeric },
            { value: 'lt', label: '<', hide: !isNumeric },
        ].filter(op => !op.hide);
    };


    const handleFieldChange = (index: number, field: keyof typeof initialFilterField, value: string | number) => {
        const newFields = [...filterFields];
        newFields[index][field] = value.toString();
        setFilterFields(newFields);
    };

    const handleSearch = () => {
        const filters = transformFilters();
        setApiFilters(filters);
        setPage(1);
    };

    const handleReset = () => {
        setFilterFields([]);
        setApiFilters(null);
        setPage(1);
    };

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
        },
        enableRowSelection: true,
        onSortingChange: setSorting,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        manualPagination: true,
        pageCount: Math.ceil(totalItems / limit),
    });

    const exportToXLSX = async (data: any) => {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(workbook, worksheet, label);

        const filename: string = `mars-export-${label.toLowerCase()}-${getCurrentDateTime()}.xlsx`;
        XLSX.writeFile(workbook, filename);
    };

    // Feature de sauvegarde des filtres
    interface SavedFilter {
        id: string;
        name: string;
        filters: typeof initialFilterField[];
    }
    const [savedFilters, setSavedFilters] = React.useState<SavedFilter[]>([]);
    const [filterName, setFilterName] = React.useState('');

    React.useEffect(() => {
        const saved = localStorage.getItem(`savedFilters-${label}`);
        if (saved) {
            try {
                setSavedFilters(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse saved filters", e);
            }
        }
    }, [label]);

    // Effet pour sauvegarder quand les filtres changent
    React.useEffect(() => {
        if (savedFilters.length > 0) {
            localStorage.setItem(`savedFilters-${label}`, JSON.stringify(savedFilters));
        }
    }, [savedFilters, label]);
    const saveCurrentFilter = () => {
        if (!filterName.trim()) return;

        const newSavedFilter: SavedFilter = {
            id: Date.now().toString(),
            name: filterName,
            filters: [...filterFields]
        };

        setSavedFilters(prev => [...prev, newSavedFilter]);
        setFilterName('');
    };

    const loadFilter = (filter: SavedFilter) => {
        setFilterFields(filter.filters);
        setShowFilterForm(true);
    };

    const deleteSavedFilter = (id: string) => {
        setSavedFilters(prev => prev.filter(f => f.id !== id));
    };
    // Feature de sauvegarde des filtres

    return (
        <>
            <ConfirmationDialog />
            <div className='gap-x-2 flex items-center justify-between mb-4'>
                <div className="flex flex-row-reverse gap-2">
                    {
                        isDeletable && table.getFilteredSelectedRowModel().rows.length > 0 && (
                            <Button
                                onClick={async () => {
                                    setMessage(`You are about to bulk delete "${table.getFilteredSelectedRowModel().rows.length}" entries selected.
This action cannot be undone. Please confirm if you wish to proceed with the deletion`);

                                    const ok = await confirm();
                                    if (ok) {
                                        // Logique for delete
                                        onDelete(table.getFilteredSelectedRowModel().rows);
                                        table.resetRowSelection();
                                    }
                                }}
                                disabled={disabled}
                                size="sm"
                                variant="destructive"
                                className="ml-auto font-normal text-xs"
                            >
                                <Trash className="size-4 mr-2" />
                                Delete ({table.getFilteredSelectedRowModel().rows.length})
                            </Button>
                        )
                    }
                    {
                        table.getFilteredSelectedRowModel().rows.length > 0 && (< Button
                            onClick={async () => {
                                const selectedData = table.getFilteredSelectedRowModel().rows.map(row => row.original);
                                exportToXLSX(selectedData);
                            }}
                            disabled={disabled}
                            size="sm"
                            variant="default"
                            className="ml-auto font-normal text-xs bg-green-700 hover:bg-green-900">
                            <MdDownload className="size-4 mr-2" />Export  ({table.getFilteredSelectedRowModel().rows.length})
                        </Button>)
                    }
                </div>
                <div className='flex gap-2'>
                    {
                        isFilterable && (
                            <Button onClick={() => setShowFilterForm(prev => !prev)} size={'sm'}>
                                {showFilterForm ? <FilterX className='size-4 mr-2' /> : <Filter className='size-4 mr-2' />}
                                {showFilterForm ? 'Hide filters' : 'Show filters'}
                            </Button>
                        )
                    }
                    {
                        isExportable && (
                            <Button onClick={() => exportToXLSX(exportData)} size="sm" variant="outline">
                                <FileDown className='size-4 mr-2' />
                                Export to XLSX
                            </Button>
                        )
                    }

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                <Settings2 className='size-4 mr-2' /> Columns
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div >

            {isFilterable && showFilterForm && (
                <div className="bg-white shadow-lg w-full rounded-lg p-4 md:p-6 lg:p-8 mx-auto my-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">{`Filter ${label}`}</h2>

                        <div className="flex gap-2">
                            <Input
                                placeholder="Nom du filtre"
                                value={filterName}
                                onChange={(e) => setFilterName(e.target.value)}
                                className="h-10 w-40"
                            />
                            <Button
                                onClick={saveCurrentFilter}
                                disabled={!filterName.trim() || filterFields.length === 0}
                                size="sm"
                            >
                                Sauvegarder
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        {filterFields.map((filterField, index) => (
                            <div key={index} className="flex gap-2">
                                <Select
                                    value={filterField.columnKey}
                                    onValueChange={(value) => handleFieldChange(index, 'columnKey', value)}
                                >
                                    <SelectTrigger className="h-10 w-1/4">
                                        <SelectValue placeholder="Select column" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {filterColumns.map(column => (
                                            <SelectItem key={column.accessorKey} value={column.accessorKey}>
                                                {column.title}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select
                                    value={filterField.operator}
                                    onValueChange={(value) => handleFieldChange(index, 'operator', value)}
                                >
                                    <SelectTrigger className="h-10 w-1/4">
                                        <SelectValue placeholder="Select operator" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {getOperatorsForColumn(filterField.columnKey).map(op => (
                                            <SelectItem key={op.value} value={op.value}>
                                                {op.label}
                                            </SelectItem>
                                        ))}
                                        {/* <SelectItem value="equals">Equals</SelectItem>
                                        <SelectItem value="contains">Contains</SelectItem>
                                        <SelectItem value="gte">{`≥ (Greater or Equal)`}</SelectItem>
                                        <SelectItem value="lte">{`≤ (Less or Equal)`}</SelectItem>
                                        <SelectItem value="gt">{`> (Greater Than)`}</SelectItem>
                                        <SelectItem value="lt">{`< (Less Than)`}</SelectItem> */}
                                    </SelectContent>
                                </Select>

                                <Input
                                    placeholder={`Value...`}
                                    value={filterField.value}
                                    onChange={(e) => handleFieldChange(index, 'value', e.target.value)}
                                    className="h-10 w-1/4"
                                />

                                <Select
                                    value={filterField.logical}
                                    onValueChange={(value) => handleLogicalChange(index, value as 'AND' | 'OR')}
                                >
                                    <SelectTrigger className="h-10 w-1/4">
                                        <SelectValue placeholder="" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="AND">AND</SelectItem>
                                        <SelectItem value="OR">OR</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Button onClick={() => handleRemoveField(index)} size="sm" variant="outline">
                                    Remove
                                </Button>
                            </div>
                        ))}
                        <Button onClick={handleAddField} size="sm">Add Filter Field</Button>
                        <div className="flex gap-2 mt-1 justify-between">
                            {activeFilters.length > 0 && (
                                <div className="mt-1">
                                    <h3 className="font-semibold">Active Filters:</h3>
                                    <div className="flex flex-wrap gap-2 items-center justify-center">
                                        {activeFilters.map((filter, index) => (
                                            <React.Fragment key={index}>
                                                {index > 0 && (
                                                    <span className="text-sm text-gray-500">
                                                        {filterFields[index - 1]?.logical}
                                                    </span>
                                                )}
                                                <span className="bg-gray-200 rounded-md px-3 py-1 text-sm flex items-center">
                                                    <span>
                                                        {/* {`${filter.columnKey} ${filter.operator} ${filter.value}`} */}
                                                        {`${filterColumns.find(c => c.accessorKey === filter.columnKey)?.title || filter.columnKey} 
                                                            ${filter.operator} 
                                                            ${filter.value}`}
                                                        <Button
                                                            className="ml-2 p-0 h-4 w-4"
                                                            size="sm"
                                                            onClick={() => handleRemoveField(index)}
                                                            variant="ghost"
                                                        >
                                                            <X className="h-3 w-3" />
                                                        </Button>
                                                    </span>
                                                </span>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div className="flex gap-2 mt-1">
                                <Button onClick={handleSearch} size="sm">
                                    <Search className="size-4 mr-2" /> Search
                                </Button>
                                <Button onClick={handleReset} size="sm" variant="outline">
                                    <X className="size-4 mr-2" /> Reset
                                </Button>
                            </div>
                        </div>
                    </div>

                    {savedFilters.length > 0 && (
                        <div className="mt-2 flex items-end justify-end">
                            <div className="flex flex-row items-center justify-center  gap-2">
                            <h3 className="font-medium">Filtres sauvegardés</h3>
                            <div className="flex flex-wrap gap-2">
                                {savedFilters.map(filter => (
                                    <div key={filter.id} className="flex items-center bg-gray-100 rounded-md px-3 py-1">
                                        <button
                                            onClick={() => loadFilter(filter)}
                                            className="text-sm hover:underline"
                                        >
                                            {filter.name}
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteSavedFilter(filter.id);
                                            }}
                                            className="ml-2 text-red-500 hover:text-red-700"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            </div>
                        </div>
                    )}
                </div >
            )
            }

            {
                isLoading ? (
                    <div className="flex items-center justify-center min-h-screen">
                        <Loader2 className="animate-spin h-12 w-12 border-4 border-t-transparent border-blue-500 rounded-full" />
                    </div>
                ) : isError ? (
                    <div>{`Something went wrong  ${label.toLowerCase()}.`}</div>
                ) : (
                    <>
                        <div className="rounded-md border">
                            <ScrollArea className="grid h-[calc(80vh-220px)] rounded-md border md:h-[calc(90dvh-240px)]">
                                <Table className="relative">
                                    <TableHeader>
                                        {table.getHeaderGroups().map(headerGroup => (
                                            <TableRow key={headerGroup.id}>
                                                {headerGroup.headers.map(header => (
                                                    <TableHead key={header.id} className="text-left">
                                                        <div
                                                            onClick={header.column.getToggleSortingHandler()}
                                                            className="flex items-center cursor-pointer select-none"
                                                        >
                                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                                            {header.column.getCanSort() && (
                                                                <ArrowUpDown className="ml-2 h-4 w-4" />
                                                            )}
                                                            {header.column.getIsSorted() === 'asc' ? '🔼' :
                                                                header.column.getIsSorted() === 'desc' ? '🔽' : null}
                                                        </div>
                                                    </TableHead>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableHeader>
                                    <TableBody>
                                        {table.getRowModel().rows.length ? (
                                            table.getRowModel().rows.map(row => (
                                                <TableRow key={row.id}>
                                                    {row.getVisibleCells().map(cell => (
                                                        <TableCell key={cell.id}>
                                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                                    No results.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                                <ScrollBar orientation="horizontal" />
                            </ScrollArea>
                        </div>

                        <div className='flex items-center justify-between overflow-auto space-x-2 px-2 py-4'>
                            <div className='hidden flex-1 text-sm text-muted-foreground sm:block'>
                                {table.getFilteredSelectedRowModel().rows.length} of {totalItems} row(s) selected.
                            </div>
                            <div className='flex items-center sm:space-x-6 lg:space-x-8'>
                                <div className='flex items-center space-x-2'>
                                    <p className='hidden text-sm font-medium sm:block'>Rows per page</p>
                                    <Select
                                        value={`${limit}`}
                                        onValueChange={(value) => {
                                            setPage(1); // Reset to first page on page size change
                                            setLimit(Number(value));
                                        }}
                                    >
                                        <SelectTrigger className='h-8 w-[70px]'>
                                            <SelectValue placeholder={`${limit}`} />
                                        </SelectTrigger>
                                        <SelectContent side='top'>
                                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                                    {pageSize}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
                                    Page {page} of {Math.ceil(totalItems / limit)}
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <Button
                                        variant='outline'
                                        className='hidden h-8 w-8 p-0 lg:flex'
                                        onClick={() => setPage(1)}
                                        disabled={page === 1}
                                    >
                                        <span className='sr-only'>Go to first page</span>
                                        <DoubleArrowLeftIcon className='h-4 w-4' />
                                    </Button>
                                    <Button
                                        variant='outline'
                                        className='h-8 w-8 p-0'
                                        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                                        disabled={page === 1}
                                    >
                                        <span className='sr-only'>Go to previous page</span>
                                        <ChevronLeftIcon className='h-4 w-4' />
                                    </Button>
                                    <Button
                                        variant='outline'
                                        className='h-8 w-8 p-0'
                                        onClick={() => setPage(prev => Math.min(prev + 1, Math.ceil(totalItems / limit)))}
                                        disabled={page === Math.ceil(totalItems / limit)}
                                    >
                                        <span className='sr-only'>Go to next page</span>
                                        <ChevronRightIcon className='h-4 w-4' />
                                    </Button>
                                    <Button
                                        variant='outline'
                                        className='hidden h-8 w-8 p-0 lg:flex'
                                        onClick={() => setPage(Math.ceil(totalItems / limit))}
                                        disabled={page === Math.ceil(totalItems / limit)}
                                    >
                                        <span className='sr-only'>Go to last page</span>
                                        <DoubleArrowRightIcon className='h-4 w-4' />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    );
};

