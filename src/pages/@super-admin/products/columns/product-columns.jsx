import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { Link } from "react-router-dom";

export const productColumns = [
    {
      accessorKey: 'name',
      header: 'Product Name',
    },
    {
      accessorKey: 'variants',
      header: 'Variants',
      cell: ({ row }) => row.original.variants?.length || 0,
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => row.original.category?.name || 'N/A',
    },
    {
      accessorKey: 'subcategory',
      header: 'Subcategory',
      cell: ({ row }) => row.original.subcategory?.name || 'N/A',
    },
    {
      accessorKey: 'gender',
      header: 'Gender',
    },
    {
      accessorKey: 'ageGroup',
      header: 'Age Group',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <Badge
          variant={
            row.original.status === 'published' ? 'success' : 'destructive'
          }
        >
          {row.original.status}
        </Badge>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <Link to={ROUTES.PRODUCTS.getDetailsLink(row.original._id)}>
          <Button variant='outline' size='sm' className='flex items-center gap-2'>
            View
          </Button>
        </Link>
      ),
    },
  ];