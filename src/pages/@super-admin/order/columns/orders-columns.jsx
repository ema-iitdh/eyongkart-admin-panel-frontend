import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { Link } from 'react-router-dom';
import StatusSelect from '../_components/StatusSelect';
import PaymentStatusSelect from '../_components/PaymentStatusSelect';
import CopyableText from '@/components/common/CopyableText';
import { Phone } from 'lucide-react';

export const orderColumns = [
  {
    accessorKey: 'shipping_address.full_name',
    header: 'Customer Name',
    enableSorting: true,
  },
  {
    accessorKey: 'shipping_address.phone',
    header: 'Customer Phone',
    cell: ({ row }) => (
      <span className='flex items-center gap-1'>
        <Phone size={18} />
        <CopyableText text={row.original.shipping_address.phone} />
      </span>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'createdAt',
    header: 'Order Date',
    cell: ({ row }) =>
      new Date(row.original.createdAt).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
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
    cell: ({ row }) => (
      <span className='font-bold text-lg'>
        ₹{row.original.amount.toFixed(2)}
      </span>
    ),
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
    accessorKey: '_id',
    header: 'Order ID',
    cell: ({ row }) => <CopyableText text={row.original._id} />,
    enableSorting: true,
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
