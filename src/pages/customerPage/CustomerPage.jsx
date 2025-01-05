import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useGetAllCustomers } from "@/features/customer/hooks/useCustomer";
import { Loader } from "@/components/common/loader";

export function CustomerPage() {
  const navigate = useNavigate();
  const { data: customers = [], isLoading, error } = useGetAllCustomers();
  const [sorting, setSorting] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  // Define columns for customer data
  const columns = [
    {
      accessorKey: "_id",
      header: "Customer ID",
    },
    {
      accessorKey: "userName",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => row.original.phone || "N/A",
    },
    {
      accessorKey: "address",
      header: "Default Address",
      cell: ({ row }) => {
        const defaultAddress = row.original.address.find((addr) => addr.isDefault);
        return defaultAddress
          ? `${defaultAddress.address}, ${defaultAddress.district}, ${defaultAddress.state} - ${defaultAddress.pincode}`
          : "No address";
      },
    },
    {
      accessorKey: "cart",
      header: "Cart Items",
      cell: ({ row }) => row.original.cart.length,
    },
  ];

  const table = useReactTable({
    data: customers,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) return <Loader />
  if (error) return <p>Error loading customers: {error.message}</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">All Customers</h1>
        <Input
          placeholder="Search customers..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border shadow-2xl">
        <Table>
          <TableHeader className="bg-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? "cursor-pointer select-none flex items-center gap-2"
                            : ""
                        }
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getIsSorted() === "asc" && <ChevronUp className="w-4 h-4" />}
                        {header.column.getIsSorted() === "desc" && <ChevronDown className="w-4 h-4" />}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow 
                key={row.id}
                onClick={() => navigate(`/dashboard/customers/${row.original._id}`)}
                className="cursor-pointer hover:bg-muted/50"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Showing {table.getState().pagination.pageSize * table.getState().pagination.pageIndex + 1} to{" "}
          {Math.min(
            table.getState().pagination.pageSize * (table.getState().pagination.pageIndex + 1),
            table.getFilteredRowModel().rows.length
          )}{" "}
          of {table.getFilteredRowModel().rows.length} customers
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CustomerPage;
