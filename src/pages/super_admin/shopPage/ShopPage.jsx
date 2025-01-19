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
import { ChevronDown, ChevronUp, Eye } from "lucide-react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Loader } from "@/components/common/loader";
import { useGetAllShops } from "@/features/shop/hooks/useShop";
import { ROUTES } from "@/constants/routes";

export function ShopPage() {
  const navigate = useNavigate();
  const { data: shops = [], isLoading, error, refetch } = useGetAllShops();
  const [sorting, setSorting] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const handleViewShop = (shopId) => {
    navigate(`/dashboard/shop/${shopId}`);
  };
  const columns = React.useMemo(
    () => [
      {
        accessorKey: "_id",
        header: "Shop ID",
      },
      {
        accessorKey: "name",
        header: "Shop Name",
      },
      {
        accessorKey: "description",
        header: "Description",
      },
      {
        accessorKey: "owner",
        header: "Owner",
      },
      {
        accessorKey: "contactEmail",
        header: "Email",
      },
      {
        accessorKey: "contactPhone",
        header: "Phone",
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => navigate(`/dashboard/shops/${row.original._id}`)}
          >
            <Eye className="w-4 h-4" />
            View
          </Button>
        ),
      },
    ],
    [navigate]
  );

  const table = useReactTable({
    data: shops,
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

  if (isLoading) return <Loader />;
  if (error)
    return (
      <div className="text-red-500">Error loading shops: {error.message}</div>
    );

  const filteredRows = table.getRowModel().rows;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-xl font-semibold">All Shops</h1>
        <div className="relative w-full max-w-sm flex gap-x-2">
          <Button
            className="border border-input bg-green-500 shadow-sm hover:bg-green-400 text-white"
            onClick={() => navigate(ROUTES.SHOP.CREATE)}
          >
            Create a shop
          </Button>
          <Input
            placeholder="Search shop..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </div>

      {filteredRows.length === 0 ? (
        <div className="text-center py-4">No shops found</div>
      ) : (
        <>
          {/* Mobile view */}
          <div className="md:hidden space-y-4">
            {filteredRows.map((row) => (
              <div key={row.id} className="bg-white rounded-lg shadow-md p-4">
                <h3 className="font-semibold text-lg mb-2">
                  Shop ID: {row.original._id}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  Shop Name: {row.original.name}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  Owner: {row.original.owner}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  Description: {row.original.description}
                </p>
                <div className="text-sm text-gray-600 mb-1">
                  Email: {row.original.contactEmail}
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  Phone: {row.original.contactPhone}
                </div>
                <Button
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => handleViewShop(row.original._id)}
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </Button>
              </div>
            ))}
          </div>

          {/* Desktop view */}
          <div className="rounded-md border shadow-md overflow-hidden hidden md:block">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead
                          key={header.id}
                          className="whitespace-nowrap"
                        >
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
                              {header.column.getIsSorted() === "asc" && (
                                <ChevronUp className="w-4 h-4" />
                              )}
                              {header.column.getIsSorted() === "desc" && (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </div>
                          )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {filteredRows.map((row) => (
                    <TableRow key={row.id} className="hover:bg-gray-50">
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="whitespace-nowrap">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground text-center sm:text-left">
          Showing{" "}
          {table.getState().pagination.pageSize *
            table.getState().pagination.pageIndex +
            1}{" "}
          to{" "}
          {Math.min(
            table.getState().pagination.pageSize *
              (table.getState().pagination.pageIndex + 1),
            table.getFilteredRowModel().rows.length
          )}{" "}
          of {table.getFilteredRowModel().rows.length} shops
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

export default ShopPage;
