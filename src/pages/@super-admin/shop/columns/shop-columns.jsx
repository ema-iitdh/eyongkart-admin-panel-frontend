import { ROUTES } from '@/constants/routes';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import CopyableText from '@/components/common/CopyableText';

export const shopColumns = [
  {
    accessorKey: 'name',
    header: 'Shop Name',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'owner.name',
    header: 'Owner',
  },
  {
    accessorKey: 'contactEmail',
    header: 'Email',
  },
  {
    accessorKey: 'contactPhone',
    header: 'Phone',
    cell: ({ row }) => (
      <span className='flex items-center gap-1'>
        <Phone size={18} />
        <CopyableText text={row.original.contactPhone} />
      </span>
    ),
  },
  {
    accessorKey: '_id',
    header: 'Shop ID',
    cell: ({ row }) => <CopyableText text={row.original._id} />,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <Link to={ROUTES.SHOP.getDetailsLink(row.original._id)}>
        <Button variant='outline' size='sm' className='flex items-center gap-2'>
          View
        </Button>
      </Link>
    ),
  },
];
