import DataTable from '@/components/common/data-table';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { Loader, Plus } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import BatchDeleteButton from '../../../components/common/BatchDeleteButton';
import { useProducts } from '@/features/products/hooks/useProducts';
import { productColumns } from './columns/product-columns';

const ProductPage = () => {
  const { data: products = [], isLoading, isError } = useProducts({filter: ''});
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleDeleteProducts = useCallback((selectedProducts) => {
    setSelectedProducts(selectedProducts);
    console.log('Selected products:', selectedProducts);
  }, []);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loader className='animate-spin h-8 w-8' />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='text-center text-red-500'>Error fetching products</div>
    );
  }

  return (
    <div className='p-4 sm:p-6'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6'>
        <h1 className='text-2xl font-bold'>Product Management</h1>
        <div className='flex gap-2'>
          <BatchDeleteButton
            selectedRows={selectedProducts}
            handleBatchDelete={handleDeleteProducts}
          />
          <Link to={ROUTES.PRODUCTS.getCreateLink()}>
            <Button>
              <Plus className='h-4 w-4 mr-2' />
              Create New Product
            </Button>
          </Link>
        </div>
      </div>
      <DataTable
        data={products}
        columns={productColumns}
        enableSelection={true}
        onSelectionChange={handleDeleteProducts}
      />
    </div>
  );
};

export default ProductPage;
