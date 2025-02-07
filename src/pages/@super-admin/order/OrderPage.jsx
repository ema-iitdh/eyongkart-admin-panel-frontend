import DataTable from '@/components/common/data-table';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { Loader, Plus } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import BatchDeleteButton from '../../../components/common/BatchDeleteButton';
import { useDeleteOrder, useOrders } from '@/features/orders/hooks/useOrders';
import { orderColumns } from './columns/orders-columns';

const OrderPage = () => {
  const { data: orders = [], isLoading, isError } = useOrders();
  const { mutate: deleteOrder, isPending: deletingOrder } = useDeleteOrder();
  const [selectedOrders, setSelectedOrders] = useState([]);

  const handleDeleteOrders = useCallback(async () => {
    const results = await Promise.allSettled(
      selectedOrders.map((order) => {
        return new Promise((resolve, reject) => {
          deleteOrder(
            {
              orderId: order._id,
            },
            {
              onSuccess: resolve,
              onError: reject,
            }
          );
        });
      })
    );

    if (results.some((result) => result.status === 'rejected')) {
      return;
    }

    setSelectedOrders([]);
  }, [deleteOrder, selectedOrders]);

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
            isLoading={deletingOrder}
            selectedRows={selectedOrders}
            handleBatchDelete={handleDeleteOrders}
          />
        </div>
      </div>
      <DataTable
        key={orders.length}
        data={orders}
        columns={orderColumns}
        enableSelection={true}
        onSelectionChange={setSelectedOrders}
      />
    </div>
  );
};

export default OrderPage;
