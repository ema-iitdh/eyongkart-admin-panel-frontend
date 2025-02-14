import CopyableText from '@/components/common/CopyableText';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';

export const customerColumns = [
  {
    accessorKey: 'userName',
    header: 'Name',
    enableSorting: true,
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: ({ row }) => (
      <span className='flex items-center gap-1'>
        <Phone size={18} />
        <CopyableText text={row.original.phone} />
      </span>
    ),
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
    accessorKey: '_id',
    header: 'Customer ID',
    cell: ({ row }) => <CopyableText text={row.original._id} />,
    enableSorting: true,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <Link to={ROUTES.CUSTOMERS.getDetailsLink(row.original._id)}>
        <Button variant='outline' size='sm'>
          View
        </Button>
      </Link>
    ),
  },
];
