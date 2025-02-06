import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { ChevronDown, ChevronUp, Eye } from 'lucide-react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useGetAllCustomers } from '@/features/customer/hooks/useCustomer';
import { Loader } from '@/components/common/loader';
import { ROUTES } from '@/constants/routes';

export function CustomerPage() {
  const navigate = useNavigate();
  const { data: customers = [], isLoading, error } = useGetAllCustomers();
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');

  // Columns for the table
  const columns = [
    {
      accessorKey: '_id',
      header: 'Customer ID',
      cell: ({ row }) => <div className='font-medium'>{row.original._id}</div>,
    },
    {
      accessorKey: 'userName',
      header: 'Name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => (
        <div className='lowercase'>{row.getValue('email')}</div>
      ),
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
      cell: ({ row }) => row.original.phone || 'N/A',
    },
    {
      accessorKey: 'address',
      header: 'Default Address',
      cell: ({ row }) => {
        const defaultAddress = row.original.address.find(
          (addr) => addr.isDefault
        );
        return defaultAddress
          ? `${defaultAddress.address}, ${defaultAddress.district}, ${defaultAddress.state} - ${defaultAddress.pincode}`
          : 'No address';
      },
    },
    {
      accessorKey: 'cart',
      header: 'Cart Items',
      cell: ({ row }) => row.original.cart?.length || 0,
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
            e.stopPropagation(); // Prevent event bubbling
            navigate(ROUTES.CUSTOMERS.getDetailsLink(row.original._id));
          }}
        >
          <Eye className='w-4 h-4' />
          View
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data: customers,
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
      <div className='text-red-500'>
        Error loading customers: {error.message}
      </div>
    );

  const filteredRows = table.getRowModel().rows;

  return (
    <div className='space-y-4'>
      <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
        <h1 className='text-xl font-semibold'>All Customers</h1>
        <Input
          placeholder='Search customers...'
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className='max-w-sm'
        />
      </div>

      {filteredRows.length === 0 ? (
        <div className='text-center py-4'>No customers found</div>
      ) : (
        <>
          {/* Mobile view */}
          <div className='md:hidden space-y-4'>
            {filteredRows.map((row) => (
              <div key={row.id} className='bg-white rounded-lg shadow-md p-4'>
                <h3 className='font-semibold text-lg mb-2'>
                  {row.original.userName}
                </h3>
                <p className='text-sm text-gray-600 mb-1'>
                  ID: {row.original._id}
                </p>
                <p className='text-sm text-gray-600 mb-1'>
                  {row.original.email}
                </p>
                <p className='text-sm text-gray-600 mb-1'>
                  Phone: {row.original.phone || 'N/A'}
                </p>
                <p className='text-sm text-gray-600 mb-1'>
                  Cart Items: {row.original.cart?.length || 0}
                </p>
                <Button
                  variant='ghost'
                  size='sm'
                  className='flex items-center gap-2 mt-2'
                  onClick={() =>
                    navigate(ROUTES.CUSTOMERS.getDetailsLink(row.original._id))
                  }
                >
                  <Eye className='w-4 h-4' />
                  View
                </Button>
              </div>
            ))}
          </div>

          {/* Desktop view */}
          <div className='rounded-md border shadow-md overflow-hidden hidden md:block'>
            <div className='overflow-x-auto custom-scrollbar'>
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          {header.isPlaceholder ? null : (
                            <div
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
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
                              {header.column.getIsSorted() === 'asc' && (
                                <ChevronUp className='w-4 h-4' />
                              )}
                              {header.column.getIsSorted() === 'desc' && (
                                <ChevronDown className='w-4 h-4' />
                              )}
                            </div>
                          )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {filteredRows.map((row) => (
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
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </>
      )}

      <div className='flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-2 py-4'>
        <div className='flex-1 text-sm text-muted-foreground text-center sm:text-left'>
          Showing {filteredRows.length} of{' '}
          {table.getFilteredRowModel().rows.length} customers
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

export default CustomerPage;
