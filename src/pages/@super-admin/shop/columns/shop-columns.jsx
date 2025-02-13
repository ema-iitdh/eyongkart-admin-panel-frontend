import { ROUTES } from '@/constants/routes';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export const shopColumns = [
  {
    accessorKey: '_id',
    header: 'Shop ID',
  },
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
