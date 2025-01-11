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
import { ChevronDown, ChevronUp, Eye } from "lucide-react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Loader } from "@/components/common/loader";
import { ROUTES } from "@/constants/routes";

// Custom debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

export function ProductPage() {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(() => {
    const savedPage = sessionStorage.getItem("currentPage");
    return savedPage ? parseInt(savedPage, 10) : 1;
  });
  const [sorting, setSorting] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms delay
  const searchInputRef = React.useRef(null); // Ref for the search input
  const limit = 10;

  // Save current page to session storage
  React.useEffect(() => {
    sessionStorage.setItem("currentPage", page.toString());
  }, [page]);

  // Fetch products with debounced search
  const { 
    data = { products: [], pagination: {} }, 
    isLoading, 
    error,
  } = useProducts({ 
    filter: `page=${page}&limit=${limit}${debouncedSearchTerm ? `&search=${debouncedSearchTerm}` : ''}` 
  });

  // Reset to first page when search term changes
  React.useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm]);

  // Refocus the search input when debouncedSearchTerm updates
  React.useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [debouncedSearchTerm]);

  const products = data.products;
  const {
    currentPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    totalProducts,
  } = data.pagination;

  const handleViewProduct = (productId) => {
    navigate(`/dashboard/products/${productId}`);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const columns =[
      {
        accessorKey: "name",
        header: "Product Name",
      },
      {
        accessorKey: "productquantity",
        header: "Quantity",
        cell: ({ row }) => row.original.productquantity || 0,
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => `₹${row.original.price.toFixed(2)}`,
      },
      {
        accessorKey: "discount",
        header: "Discount",
        cell: ({ row }) => `${row.original.discount}%`,
      },
      {
        accessorKey: "discountedPrice",
        header: "Final Price",
        cell: ({ row }) => `₹${row.original.discountedPrice?.toFixed(2)}`,
      },
      {
        accessorKey: "gender",
        header: "Gender",
        cell: ({ row }) => row.original.gender || "Unisex",
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
    ]

  const table = useReactTable({
    data: products,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true, // Tell the table we're handling pagination server-side
    pageCount: totalPages,
  });

  if (isLoading) return <Loader />;
  if (error) return <div className="text-center text-red-500">Error loading products: {error.message}</div>;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-xl font-semibold">All Products</h1>
        <div className="relative w-full max-w-sm">
          <div className="flex gap-x-2">
            <Button 
            className="border border-input bg-green-500 shadow-sm hover:bg-green-400 text-white"
            onClick={() => navigate(ROUTES.PRODUCT.CREATE )}
            >
              Create a product
            </Button>
            <Input
              ref={searchInputRef} // Attach ref to the input
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full"
            />
          </div>
          {isLoading && debouncedSearchTerm && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Loader className="w-4 h-4" />
            </div>
          )}
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-4">No products found</div>
      ) : (
        <>
          {/* Mobile view */}
          <div className="md:hidden space-y-4">
            {products.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow-md p-4">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Quantity:</span>
                    <span>{product.productquantity || 0}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Price:</span>
                    <span>₹{product.price?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount:</span>
                    <span>{product.discount}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Final Price:</span>
                    <span>₹{product.discountedPrice?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Gender:</span>
                    <span>{product.gender || "Unisex"}</span>
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

          {/* Desktop view */}
          <div className="rounded-md border shadow-md hidden md:block">
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
                              {header.column.getIsSorted() && (
                                header.column.getIsSorted() === "asc" ? (
                                  <ChevronUp className="w-4 h-4" />
                                ) : (
                                  <ChevronDown className="w-4 h-4" />
                                )
                              )}
                            </div>
                          )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {products.length > 0 ? (
                    products.map((product) => (
                      <TableRow key={product._id} className="hover:bg-gray-50">
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.productquantity || 0}</TableCell>
                        <TableCell>₹{product.price?.toFixed(2)}</TableCell>
                        <TableCell>{product.discount}%</TableCell>
                        <TableCell>₹{product.discountedPrice?.toFixed(2)}</TableCell>
                        <TableCell>{product.gender || "Unisex"}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-2"
                            onClick={() => handleViewProduct(product._id)}
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="text-center">
                        No products found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
        <div className="text-sm text-muted-foreground">
          Showing {products.length} items
          {totalProducts && ` of ${totalProducts} total products`}
          {` • Page ${currentPage} of ${totalPages}`}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={!hasPrevPage || page === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={!hasNextPage || page >= totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
