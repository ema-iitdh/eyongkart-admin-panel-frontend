import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useOrders,
  useUpdatateOrderStatus,
} from '@/features/orders/hooks/useOrders';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
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
import { OrderStatus } from '@/constants';
import { Loader } from '@/components/common/loader';

export function OrderPage() {
  const navigate = useNavigate();
  const { data: orders = [], isLoading, error, refetch } = useOrders();
  const { mutate: updateStatus } = useUpdatateOrderStatus();
  const [sorting, setSorting] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState('');

  const handleViewOrder = (orderId) => {
    navigate(`/dashboard/orders/${orderId}`);
  };
  const handleStatusChange = React.useCallback(
    (e, orderId, status) => {
      e.stopPropagation(); // Prevent event bubbling
      if (!status) return;
      updateStatus(
        { orderId, status },
        {
          onSuccess: () => {
            refetch();
          },
        }
      );
    },
    [updateStatus, refetch]
  );

  const columns = React.useMemo(
    () => [
      {
        accessorKey: '_id',
        header: 'Order ID',
      },
      {
        accessorKey: 'shipping_address.full_name',
        header: 'Customer Name',
      },
      {
        accessorKey: 'createdAt',
        header: 'Order Date',
        cell: ({ row }) =>
          new Date(row.original.createdAt).toLocaleDateString(),
      },
      {
        accessorKey: 'payment.status',
        header: 'Payment Status',
        cell: ({ row }) => (
          <Badge
            variant={
              row.original.payment.status === 'Paid' ? 'success' : 'destructive'
            }
          >
            {row.original.payment.status}
          </Badge>
        ),
      },
      {
        accessorKey: 'amount',
        header: 'Total Amount',
        cell: ({ row }) => `₹${row.original.amount.toFixed(2)}`,
      },
      {
        accessorKey: 'status',
        header: 'Order Status',
        cell: ({ row }) => (
          <Select
            onValueChange={(status) =>
              handleStatusChange(event, row.original._id, status)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder={row.original.status} />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(OrderStatus).map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ),
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <Button
            variant='ghost'
            size='sm'
            className='flex items-center gap-2'
            onClick={() => navigate(`/dashboard/orders/${row.original._id}`)}
          >
            <Eye className='w-4 h-4' />
            View
          </Button>
        ),
      },
    ],
    [handleStatusChange, navigate]
  );

  const table = useReactTable({
    data: orders,
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
      <div className='text-red-500'>Error loading orders: {error.message}</div>
    );

  const filteredRows = table.getRowModel().rows;

  return (
    <div className='space-y-4'>
      <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
        <h1 className='text-xl font-semibold'>All Orders</h1>
        <Input
          placeholder='Search orders...'
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className='max-w-sm'
        />
      </div>

      {filteredRows.length === 0 ? (
        <div className='text-center py-4'>No orders found</div>
      ) : (
        <>
          {/* Mobile view */}
          <div className='md:hidden space-y-4'>
            {filteredRows.map((row) => (
              <div key={row.id} className='bg-white rounded-lg shadow-md p-4'>
                <h3 className='font-semibold text-lg mb-2'>
                  Order ID: {row.original._id}
                </h3>
                <p className='text-sm text-gray-600 mb-1'>
                  Customer: {row.original.shipping_address.full_name}
                </p>
                <p className='text-sm text-gray-600 mb-1'>
                  Date: {new Date(row.original.createdAt).toLocaleDateString()}
                </p>
                <div className='text-sm text-gray-600 mb-1'>
                  Payment Status:{' '}
                  <Badge
                    variant={
                      row.original.payment.status === 'Paid'
                        ? 'success'
                        : 'destructive'
                    }
                  >
                    {row.original.payment.status}
                  </Badge>
                </div>
                <p className='text-sm text-gray-600 mb-1'>
                  Amount: ₹{row.original.amount.toFixed(2)}
                </p>
                <Button
                  className='w-full flex items-center justify-center gap-2'
                  onClick={() => handleViewOrder(row.original._id)}
                >
                  <Eye className='w-4 h-4' />
                  View Details
                </Button>
              </div>
            ))}
          </div>

          {/* Desktop view */}
          <div className='rounded-md border shadow-md overflow-hidden hidden md:block'>
            <div className='overflow-x-auto'>
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead
                          key={header.id}
                          className='whitespace-nowrap'
                        >
                          {header.isPlaceholder ? null : (
                            <div
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
                        <TableCell key={cell.id} className='whitespace-nowrap'>
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
          Showing{' '}
          {table.getState().pagination.pageSize *
            table.getState().pagination.pageIndex +
            1}{' '}
          to{' '}
          {Math.min(
            table.getState().pagination.pageSize *
              (table.getState().pagination.pageIndex + 1),
            table.getFilteredRowModel().rows.length
          )}{' '}
          of {table.getFilteredRowModel().rows.length} orders
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

export default OrderPage;
