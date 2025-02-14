import CopyableText from '@/components/common/CopyableText';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { Link } from 'react-router-dom';

export const adminColumns = [
  {
    accessorKey: 'name',
    header: 'Name',
    enableSorting: true,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    filterFn: 'includesString',
    enableSorting: true,
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => (
      <Badge variant={'secondary'} className={'tracking-wider'}>
        {row.original.role?.replace(/_/g, ' ')}
      </Badge>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'isActive',
    header: 'Status',
    enableSorting: true,
    cell: ({ row }) => (
      <Badge
        variant={row.original.isActive ? 'success' : 'destructive'}
        className={'tracking-wider'}
      >
        {row.original.isActive ? 'Active' : 'Inactive'}
      </Badge>
    ),
  },
  {
    accessorKey: 'isVerified',
    header: 'Verified',
    enableSorting: true,
    cell: ({ row }) => (
      <Badge
        variant={row.original.isVerified ? 'success' : 'destructive'}
        className={'tracking-wider'}
      >
        {row.original.isVerified ? 'Verified' : 'Unverified'}
      </Badge>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => (
      <span className='text-sm'>
        {new Date(row.original.createdAt).toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })}
      </span>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <CopyableText text={row.original._id} />,
    enableSorting: true,
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <Link to={ROUTES.ADMIN.getDetailsLink(row?.original?._id)}>
        <Button variant='outline' size='sm'>
          View
        </Button>
      </Link>
    ),
  },
];
