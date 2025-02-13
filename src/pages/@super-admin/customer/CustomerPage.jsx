import BatchDeleteButton from '@/components/common/BatchDeleteButton';
import DataTable from '@/components/common/data-table';
import { Loader } from 'lucide-react';
import { useState, useCallback } from 'react';
import {
  useDeleteCustomer,
  useGetAllCustomers,
} from '@/features/customer/hooks/useCustomer';
import { customerColumns } from './columns/customer-columns';

const CustomerPage = () => {
  const { data: customers = [], isLoading, isError } = useGetAllCustomers();
  const { mutate: deleteCustomer, isPending } = useDeleteCustomer();
  const [selectedCustomers, setSelectedCustomers] = useState([]);

  const handleDeleteCustomers = useCallback(async () => {
    const results = await Promise.allSettled(
      selectedCustomers.map((customer) => {
        return new Promise((resolve, reject) => {
          deleteCustomer(customer._id, { onSuccess: resolve, onError: reject });
        });
      })
    );

    if (results.some((result) => result.status === 'rejected')) {
      return;
    }

    setSelectedCustomers([]);
  }, [deleteCustomer, selectedCustomers]);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loader className='animate-spin h-8 w-8' />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='text-center text-red-500'>Error fetching customers</div>
    );
  }

  return (
    <div className='p-4 sm:p-6'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6'>
        <h1 className='text-2xl font-bold'>Customer Management</h1>
        <div className='flex gap-2'>
          <BatchDeleteButton
            selectedRows={selectedCustomers}
            handleBatchDelete={handleDeleteCustomers}
            isLoading={isPending}
          />
        </div>
      </div>
      <DataTable
        key={customers.length}
        data={customers}
        columns={customerColumns}
        enableSelection={true}
        onSelectionChange={setSelectedCustomers}
      />
    </div>
  );
};

export default CustomerPage;
