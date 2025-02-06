import DataTable from '@/components/common/data-table';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { Loader, Plus } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import BatchDeleteButton from '../../../components/common/BatchDeleteButton';
import { useOrders } from '@/features/orders/hooks/useOrders';
import { orderColumns } from './columns/orders-columns';

const OrderPage = () => {
  const { data: orders = [], isLoading, isError } = useOrders();
  const [selectedOrders, setSelectedOrders] = useState([]);

  const handleDeleteOrders = useCallback((selectedOrders) => {
    setSelectedOrders(selectedOrders);
    console.log('Selected orders:', selectedOrders);
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
      <div className='text-center text-red-500'>Error fetching orders</div>
    );
  }

  return (
    <div className='p-4 sm:p-6'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6'>
        <h1 className='text-2xl font-bold'>Order Management</h1>
        <div className='flex gap-2'>
          <BatchDeleteButton
            selectedRows={selectedOrders}
            handleBatchDelete={handleDeleteOrders}
          />
          <Link to={ROUTES.ORDERS.getCreateLink()}>
            <Button>
              <Plus className='h-4 w-4 mr-2' />
              Create New Order
            </Button>
          </Link>
        </div>
      </div>
      <DataTable
        data={orders}
        columns={orderColumns}
        enableSelection={true}
        onSelectionChange={handleDeleteOrders}
      />
    </div>
  );
};

export default OrderPage;
