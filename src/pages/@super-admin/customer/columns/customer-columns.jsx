import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { Link } from "react-router-dom";

export const customerColumns = [
    {
      accessorKey: '_id',
      header: 'Customer ID',
      enableSorting: true,
    },
    {
      accessorKey: 'userName',
      header: 'Name',
      enableSorting: true,

    },
    {
      accessorKey: 'phone',
      header: 'Phone',
      cell: ({ row }) => row.original.phone || 'N/A',
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
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <Link to={ROUTES.CUSTOMERS.getDetailsLink(row.original._id)}>
            <Button variant="outline" size="sm">
                View
            </Button>
        </Link>
      ),
    },
  ];