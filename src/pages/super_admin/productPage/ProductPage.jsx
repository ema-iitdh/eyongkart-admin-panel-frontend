import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProducts } from '@/features/products/hooks/useProducts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Eye } from 'lucide-react';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Loader } from '@/components/common/loader';
import { ROUTES } from '@/constants/routes';
import { Badge } from '@/components/ui/badge';

// Custom debounce hook with cleanup
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export function ProductPage() {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(() => {
    const savedPage = sessionStorage.getItem('currentPage');
    return savedPage ? Number.parseInt(savedPage, 10) : 1;
  });
  const [sorting, setSorting] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const searchInputRef = React.useRef(null);
  const limit = 10;

  // Save current page to session storage
  React.useEffect(() => {
    sessionStorage.setItem('currentPage', page.toString());
  }, [page]);

  const {
    data = { products: [], pagination: {} },
    isLoading,
    error,
  } = useProducts({
    filter: `page=${page}&limit=${limit}${
      debouncedSearchTerm
        ? `&search=${encodeURIComponent(debouncedSearchTerm)}`
        : ''
    }`,
  });

  // Reset to first page when search term changes
  React.useEffect(() => {
    if (debouncedSearchTerm !== searchTerm) {
      setPage(1);
    }
  }, [debouncedSearchTerm, searchTerm]);

  const { products = [], pagination = {} } = data;
  const { currentPage, totalPages, hasNextPage, hasPrevPage, totalProducts } =
    pagination;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const columns = [
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
          <Button variant='ghost' size='sm' className='flex items-center gap-2'>
            <Eye className='w-4 h-4' />
            View
          </Button>
        </Link>
      ),
    },
  ];

  const table = useReactTable({
    data: products,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    pageCount: totalPages,
  });

  if (isLoading) return <Loader />;
  if (error)
    return (
      <div className='text-center text-red-500'>
        Error loading products: {error.message}
      </div>
    );

  return (
    <div className='space-y-4'>
      <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
        <h1 className='text-xl font-semibold'>All Products</h1>
        <div className='relative w-full max-w-sm'>
          <div className='flex gap-x-2'>
            <Button
              className='border border-input bg-green-500 shadow-sm hover:bg-green-400 text-white'
              onClick={() => navigate(`${ROUTES.PRODUCTS.CREATE}`)}
            >
              Create a product
            </Button>
            <Input
              ref={searchInputRef}
              placeholder='Search products...'
              value={searchTerm}
              onChange={handleSearchChange}
              className='w-full'
            />
          </div>
          {isLoading && debouncedSearchTerm && (
            <div className='absolute right-3 top-1/2 -translate-y-1/2'>
              <Loader className='w-4 h-4' />
            </div>
          )}
        </div>
      </div>

      {products.length === 0 ? (
        <div className='text-center py-4'>No products found</div>
      ) : (
        <>
          {/* Mobile view */}
          <div className='md:hidden space-y-4'>
            {products.map((product) => (
              <div
                key={product._id}
                className='bg-white rounded-lg shadow-md p-4'
              >
                <h3 className='font-semibold text-lg mb-2'>{product.name}</h3>
                <div className='space-y-2'>
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>Variants:</span>
                    <span>{product.variants?.length || 0}</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>Category:</span>
                    <span>{product.category?.name || 'N/A'}</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>Subcategory:</span>
                    <span>{product.subcategory?.name || 'N/A'}</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>Gender:</span>
                    <span>{product.gender}</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>Age Group:</span>
                    <span>{product.ageGroup}</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>Status:</span>
                    <Badge
                      variant={
                        product.status === 'published'
                          ? 'success'
                          : 'destructive'
                      }
                    >
                      {product.status}
                    </Badge>
                  </div>
                </div>
                <Link to={ROUTES.PRODUCTS.getDetailsLink(product._id)}>
                  <Button className='w-full mt-4 flex items-center justify-center gap-2'>
                    <Eye className='w-4 h-4' />
                    View Details
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          {/* Desktop view */}
          <div className='rounded-md border shadow-md overflow-hidden hidden md:block'>
            <div className='overflow-x-auto'>
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead
                          key={header.id}
                          className='whitespace-nowrap'
                        >
                          {header.isPlaceholder ? null : (
                            <div
                              onKeyDown={header.column.getToggleSortingHandler()}
                              className={
                                header.column.getCanSort()
                                  ? 'cursor-pointer select-none flex items-center gap-2'
                                  : ''
                              }
                              onClick={header.column.getToggleSortingHandler()}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              {header.column.getIsSorted() === 'asc' && (
                                <ChevronUp className='w-4 h-4' />
                              )}
                              {header.column.getIsSorted() === 'desc' && (
                                <ChevronDown className='w-4 h-4' />
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
                    <TableRow key={row.id} className='hover:bg-gray-50'>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className='whitespace-nowrap'>
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

      <div className='flex flex-col sm:flex-row items-center justify-between gap-4 py-4'>
        <div className='text-sm text-muted-foreground'>
          Showing {products.length} items
          {totalProducts ? ` of ${totalProducts} total products` : ''}
          {totalPages ? ` • Page ${currentPage} of ${totalPages}` : ''}
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={!hasPrevPage || page === 1}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
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
