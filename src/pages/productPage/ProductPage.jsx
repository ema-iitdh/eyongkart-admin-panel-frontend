import React from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "@/features/products/hooks/useProducts";
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
import { Loader } from "@/components/common/loader";

export function ProductPage() {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(() => {
    const savedPage = sessionStorage.getItem("currentPage");
    return savedPage ? parseInt(savedPage, 10) : 1;
  });
  const [sorting, setSorting] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const limit = 100;

  React.useEffect(() => {
    sessionStorage.setItem("currentPage", page.toString());
  }, [page]);

  const { 
    data = { products: [], pagination: {} }, 
    isLoading, 
    error 
  } = useProducts({ 
    filter: `page=${page}&limit=${limit}` 
  });

  const products = data.products;
  const {
    currentPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
  } = data.pagination;

  const columns = React.useMemo(
    () => [
      {
        accessorKey: "_id",
        header: "Product ID",
        cell: ({ row }) => (
          <div className="font-medium">{row.original._id}</div>
        ),
      },
      {
        accessorKey: "name",
        header: "Product Name",
      },
      {
        accessorKey: "productquantity",
        header: "Product Quantity",
        cell: ({ row }) => row.original.productquantity || 0,
      },
      {
        accessorKey: "price",
        header: "Price/item",
        cell: ({ row }) => `₹${row.original.price.toFixed(2)}`,
      },
      {
        accessorKey: "discount",
        header: "Discount",
        cell: ({ row }) => `${row.original.discount}%`,
      },
      {
        accessorKey: "discountedPrice",
        header: "Discounted Price",
        cell: ({ row }) => `₹${row.original.discountedPrice.toFixed(2)}`,
      },
      {
        accessorKey: "gender",
        header: "Gender",
        cell: ({ row }) => row.original.gender || "Unisex",
      },
    ],
    []
  );

  const table = useReactTable({
    data: products,
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
  if (error) return <div className="text-red-500">Error loading products: {error.message}</div>;

  const filteredRows = table.getRowModel().rows;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-xl font-semibold">All Products</h1>
        <Input
          placeholder="Search products..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {filteredRows.length === 0 ? (
        <div className="text-center py-4">No products found</div>
      ) : (
        <>
          {/* Mobile view */}
          <div className="md:hidden space-y-4">
            {filteredRows.map((row) => (
              <div key={row.id} className="bg-white rounded-lg shadow-2xl p-4">
                <h3 className="font-semibold text-lg mb-2">
                  {row.original.name}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  ID: {row.original._id}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  Quantity: {row.original.productquantity || 0}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  Price: ₹{row.original.price.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  Discount: {row.original.discount}%
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  Final Price: ₹{row.original.discountedPrice.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  Gender: {row.original.gender || "Unisex"}
                </p>
                <Button
                  className="w-full"
                  onClick={() => navigate(`/dashboard/products/${row.original._id}`)}
                >
                  View Details
                </Button>
              </div>
            ))}
          </div>

          {/* Desktop view */}
          <div className="rounded-lg border shadow-2xl overflow-hidden hidden md:block">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-200">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id} className="whitespace-nowrap">
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
                    <TableRow
                      key={row.id}
                      onClick={() => navigate(`/dashboard/products/${row.original._id}`)}
                      className="cursor-pointer hover:bg-muted/50"
                    >
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
                Showing {table.getState().pagination.pageSize * table.getState().pagination.pageIndex + 1} to{" "}
                {Math.min(
                  table.getState().pagination.pageSize * (table.getState().pagination.pageIndex + 1),
                  table.getFilteredRowModel().rows.length
                )}{" "}
                of {table.getFilteredRowModel().rows.length} orders
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

export default ProductPage;