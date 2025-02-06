import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { Link } from "react-router-dom";

export const categoryColumns = [
      {
        accessorKey: 'name',
        header: 'Category Name',
      },
      {
        accessorKey: 'gender',
        header: 'Gender',
      },
      {
        accessorKey: 'productsCount',
        header: 'Products Count',
      },
      {
        accessorKey: 'isActive',
        header: 'Status',
        cell: ({ row }) => (
          <Badge variant={row.original.isActive ? 'success' : 'secondary'}>
            {row.original.isActive ? 'Active' : 'Inactive'}
          </Badge>
        ),
      },
      {
        accessorKey: 'subCategories',
        header: 'Subcategories',
        cell: ({ row }) => {
          const subCategories =
            row.original.subCategories?.map((sub) => sub.name) || [];
          return subCategories.length ? subCategories.join(', ') : '-';
        },
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <Link to={ROUTES.CATEGORIES.getDetailsLink(row.original._id)}>
            <Button variant='outline' size="sm">
                View
            </Button>
          </Link>
        ),
      },
    ];