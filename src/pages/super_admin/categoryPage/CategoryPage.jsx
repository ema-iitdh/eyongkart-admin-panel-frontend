import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, Eye } from 'lucide-react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useGetAllCategories } from '@/features/categories/hooks/useCategory';
import { Loader } from '@/components/common/loader';

export function CategoryPage() {
  const navigate = useNavigate();
  const { data: categories = [], isLoading, error } = useGetAllCategories();
  const [sorting, setSorting] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState('');

  const handleViewCategory = useCallback(
    (categoryId) => {
      navigate(ROUTES.CATEGORIES.getDetailsLink(categoryId));
    },
    [navigate]
  );

  const columns = React.useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Category Name',
      },
      {
        accessorKey: 'gender',
        header: 'Gender',
      },
      {
        accessorKey: 'productsCount',
        header: 'Products Count',
      },
      {
        accessorKey: 'isActive',
        header: 'Status',
        cell: ({ row }) => (
          <Badge variant={row.original.isActive ? 'success' : 'secondary'}>
            {row.original.isActive ? 'Active' : 'Inactive'}
          </Badge>
        ),
      },
      {
        accessorKey: 'subCategories',
        header: 'Subcategories',
        cell: ({ row }) => {
          const subCategories =
            row.original.subCategories?.map((sub) => sub.subCategoryName) || [];
          return subCategories.length ? subCategories.join(', ') : '-';
        },
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <Button
            variant='ghost'
            size='sm'
            className='flex items-center gap-2'
            onClick={(e) => {
              e.stopPropagation();
              handleViewCategory(row.original._id);
            }}
          >
            <Eye className='w-4 h-4' />
            View
          </Button>
        ),
      },
    ],
    [handleViewCategory]
  );

  const table = useReactTable({
    data: categories,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) return <Loader />;
  if (error)
    return (
      <p className='text-center text-red-500'>
        Error loading categories: {error.message}
      </p>
    );

  const filteredRows = table.getRowModel().rows;

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-semibold'>All Categories</h1>
        <div className='flex gap-x-2'>
          <Button
            className='border border-input bg-green-500 shadow-sm hover:bg-green-400 text-white'
            onClick={() => navigate(ROUTES.CATEGORIES.getCreateLink())}
          >
            Create a category
          </Button>
          <Input
            placeholder='Search categories...'
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className='max-w-sm'
          />
        </div>
      </div>

      {filteredRows.length === 0 ? (
        <div className='text-center py-4'>No categories found</div>
      ) : (
        <>
          {/* Mobile view */}
          <div className='md:hidden space-y-4'>
            {filteredRows.map((row) => (
              <div key={row.id} className='bg-white rounded-lg shadow-md p-4'>
                <h3 className='font-semibold text-lg mb-2'>
                  {row.original.name}
                </h3>
                <p className='text-sm text-gray-600 mb-1'>
                  Gender: {row.original.gender || '-'}
                </p>
                <div className='text-sm text-gray-600 mb-1'>
                  Status:{' '}
                  <Badge
                    variant={row.original.isActive ? 'success' : 'secondary'}
                  >
                    {row.original.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <p className='text-sm text-gray-600 mb-1'>
                  Products: {row.original.productsCount || 0}
                </p>
                <p className='text-sm text-gray-600 mb-3'>
                  Subcategories:{' '}
                  {row.original.subCategories
                    ?.map((sub) => sub.subCategoryName)
                    .join(', ') || '-'}
                </p>
                <Button
                  className='w-full flex items-center justify-center gap-2'
                  onClick={() => handleViewCategory(row.original._id)}
                >
                  <Eye className='w-4 h-4' />
                  View Details
                </Button>
              </div>
            ))}
          </div>

          {/* Desktop view */}
          <div className='rounded-md border hidden md:block'>
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : (
                          <div
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                header.column.getToggleSortingHandler();
                              }
                            }}
                            className={
                              header.column.getCanSort()
                                ? 'cursor-pointer select-none flex items-center gap-2'
                                : ''
                            }
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {header.column.getIsSorted() &&
                              (header.column.getIsSorted() === 'asc' ? (
                                <ChevronUp className='w-4 h-4' />
                              ) : (
                                <ChevronDown className='w-4 h-4' />
                              ))}
                          </div>
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {filteredRows.length > 0 ? (
                  filteredRows.map((row) => (
                    <TableRow key={row.id} className='hover:bg-gray-50'>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className='text-center'>
                      No categories found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </>
      )}
      <div className='flex items-center justify-between space-x-2 py-4'>
        <div className='text-sm text-muted-foreground'>
          Showing {filteredRows.length} of {categories.length} categories
        </div>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
