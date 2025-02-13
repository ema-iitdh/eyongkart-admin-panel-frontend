import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { Link } from 'react-router-dom';
import StatusSelect from '../_components/StatusSelect';
import PaymentStatusSelect from '../_components/PaymentStatusSelect';

export const orderColumns = [
  {
    accessorKey: '_id',
    header: 'Order ID',
    enableSorting: true,
  },
  {
    accessorKey: 'shipping_address.full_name',
    header: 'Customer Name',
    enableSorting: true,
  },
  {
    accessorKey: 'shipping_address.phone',
    header: 'Customer Phone',
    enableSorting: true,
  },
  {
    accessorKey: 'createdAt',
    header: 'Order Date',
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    enableSorting: true,
  },
  {
    accessorKey: 'payment.status',
    header: 'Payment Status',
    cell: ({ row }) => (
      <PaymentStatusSelect
        orderId={row.original._id}
        currentPaymentStatus={row.original.payment.status}
      />
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'amount',
    header: 'Total Amount',
    cell: ({ row }) => `₹${row.original.amount.toFixed(2)}`,
    enableSorting: true,
  },
  {
    accessorKey: 'status',
    header: 'Order Status',
    cell: ({ row }) => (
      <StatusSelect
        orderId={row.original._id}
        currentStatus={row.original.status}
      />
    ),
    enableSortning: true,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <Link to={ROUTES.ORDERS.getDetailsLink(row.original._id)}>
        <Button variant='outline' size='sm'>
          View
        </Button>
      </Link>
    ),
  },
];
