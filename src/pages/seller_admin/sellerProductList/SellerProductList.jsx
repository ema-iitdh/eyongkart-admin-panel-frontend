import { useProductBySellerId } from "@/features/products/hooks/useProducts";
import useAuthenticationStore from "@/store/useAuthenticationStore";
import { CloudinaryConfig } from "../../../../Cloudinary";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
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
import { ROUTES } from "@/constants/routes";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

function SellerProductList() {
  const navigate = useNavigate();
  const { user } = useAuthenticationStore();
  const sellerId = user?.id;
  const {
    data: products = [],
    isLoading,
    error,
  } = useProductBySellerId(sellerId);
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const handleViewProduct = useCallback((productId) => {
    navigate(`/dashboard/products/${productId}`);
  });

  const columns = useMemo(
    () => [
      {
        accessorKey: "baseImage",
        header: "Image",
        cell: ({ row }) => (
          <img
            src={`${CloudinaryConfig.CLOUDINARY_URL}/image/upload/${row.original.baseImage?.url}`}
            alt={row.original.baseImage.altText}
            className="w-8 h-8 object-cover"
          ></img>
        ),
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => row.original.category?.name || "N/A",
      },
      {
        accessorKey: "subcategory",
        header: "Subcategory",
        cell: ({ row }) => row.original.subcategory?.name || "N/A",
      },
      {
        accessorKey: "gender",
        header: "Gender",
      },
      {
        accessorKey: "ageGroup",
        header: "Age Group",
      },
      {
        accessorKey: "variants",
        header: "Variants Count",
        cell: ({ row }) => row.original.variants?.length || "0",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <Badge
            variant={
              row.original.status === "published" ? "success" : "destructive"
            }
          >
            {row.original.status}
          </Badge>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2"
            onClick={(e) => {
              e.stopPropagation();
              handleViewProduct(row.original._id);
            }}
          >
            <Eye className="w-4 h-4" />
            View
          </Button>
        ),
      },
    ],
    [handleViewProduct]
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
  if (error) {
    return (
      <p className="text-center text-red-500">
        Error loading products: {error.message}
      </p>
    );
  }

  const filteredRows = table.getRowModel().rows;
  return (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-semibold">All Products</h1>
      <div className="flex gap-x-2">
        <Button
          className="border border-input bg-green-500 shadow-sm hover:bg-green-400 text-white"
          onClick={() => navigate(ROUTES.PRODUCT.CREATE)}
        >
          Create a Product
        </Button>
        <Input 
          placeholder="Search products..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>
    </div>
    {filteredRows.length === 0? (
      <div className="text-center py-4">No products found</div>
    ) : (
      <div>
        {/* mobile view */}
        <div className="md:hidden space-y-4">
          {products.map((product) => (
            <div
            key={product._id}
            className="bg-white rounded-lg shadow-2xl p-4"
            >
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Variants:</span>
                  <span>{product.variants?.length || 0}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Category:</span>
                  <span>{product.category?.name || 'N/A'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Sub Category:</span>
                  <span>{product.subcategory?.name || 'N/A'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Gender:</span>
                  <span>{product.gender}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Age Group:</span>
                  <span>{product.ageGroup}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Status:</span>
                  <Badge
                                        variant={
                                          product.status === "published" ? "success" : "destructive"
                                        }
                                      >
                                        {product.status}
                                      </Badge>
                </div>
              </div>
              <Button
                                className="w-full mt-4 flex items-center justify-center gap-2"
                                onClick={() => handleViewProduct(product._id)}
                              >
                                <Eye className="w-4 h-4" />
                                View Details
                              </Button>
            </div>
          ))}
        </div>
        {/* desktop view */}
        <div className="rounded-md border shadow-md overflow-hidden hidden md:block">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
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
                    {table.getRowModel().rows.map((row) => (
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
      </div>
    )
    }
    <div className="flex items-center justify-between space-x-2 py-4">
            <div className="text-sm text-muted-foreground">
              Showing {filteredRows.length} of {products.length} categories
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

export default SellerProductList;
