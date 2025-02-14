import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PAYMENT_STATUS, UI_COLORS } from '@/constants';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import CopyableText from '@/components/common/CopyableText';
import { Phone } from 'lucide-react';

export const paymentColumns = [
  {
    accessorKey: 'order.shipping_address.full_name',
    header: 'User Name',
  },
  {
    accessorKey: 'order.shipping_address.phone',
    header: 'User Phone',
    cell: ({ row }) => (
      <span className='flex items-center gap-1'>
        <Phone size={18} />
        <CopyableText text={row.original.order.shipping_address.phone} />
      </span>
    ),
  },
  {
    accessorKey: 'order.shipping_address.email',
    header: 'User Email',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => (
      <span className='font-bold text-lg tracking-wider'>
        ₹{row.original.amount}
      </span>
    ),
  },
  {
    accessorKey: 'paymentMethod',
    header: 'Payment Method',
  },
  {
    accessorKey: 'status',
    header: 'Payment Status',
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          className={`${
            status === PAYMENT_STATUS.COMPLETED
              ? UI_COLORS.success
              : status === PAYMENT_STATUS.FAILED
              ? UI_COLORS.destructive
              : status === PAYMENT_STATUS.PENDING
              ? UI_COLORS.warning
              : status === PAYMENT_STATUS.REFUNDED
              ? UI_COLORS.info
              : status === PAYMENT_STATUS.CANCELLED
              ? UI_COLORS.destructive
              : UI_COLORS.default
          }`}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) =>
      new Date(row.original.createdAt).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ row }) =>
      new Date(row.original.updatedAt).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
  },
  {
    accessorKey: '_id',
    header: 'Payment ID',
    cell: ({ row }) => <CopyableText text={row.original._id} />,
  },
  {
    accessorKey: 'order._id',
    header: 'Order ID',
    cell: ({ row }) => <CopyableText text={row.original.order._id} />,
  },
  {
    accessorKey: 'userId',
    header: 'User ID',
    cell: ({ row }) => <CopyableText text={row.original.userId} />,
  },
  {
    accessorKey: 'transactionId',
    header: 'Transaction ID',
    cell: ({ row }) => <CopyableText text={row.original.transactionId} />,
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <Link to={ROUTES.PAYMENTS.getDetailsLink(row.original._id)}>
        <Button variant='outline' size='sm'>
          View
        </Button>
      </Link>
    ),
  },
];
