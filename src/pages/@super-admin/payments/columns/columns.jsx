import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PAYMENT_STATUS } from '@/constants';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

export const paymentColumns = [
  {
    accessorKey: '_id',
    header: 'Payment ID',
  },
  {
    accessorKey: 'order._id',
    header: 'Order ID',
  },
  {
    accessorKey: 'userId',
    header: 'User ID',
  },
  {
    accessorKey: 'order.shipping_address.full_name',
    header: 'User Name',
  },
  {
    accessorKey: 'order.shipping_address.phone',
    header: 'User Phone',
  },
  {
    accessorKey: 'order.shipping_address.email',
    header: 'User Email',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
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
          variant={
            status === PAYMENT_STATUS.COMPLETED
              ? 'default'
              : status === PAYMENT_STATUS.FAILED
              ? 'destructive'
              : status === PAYMENT_STATUS.PENDING
              ? 'warning'
              : status === PAYMENT_STATUS.REFUNDED
              ? 'secondary'
              : status === PAYMENT_STATUS.CANCELLED
              ? 'destructive'
              : 'outline'
          }
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
        month: '2-digit',
        year: 'numeric',
      }),
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ row }) =>
      new Date(row.original.updatedAt).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
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
