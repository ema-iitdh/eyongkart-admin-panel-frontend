import DataTable from '@/components/common/data-table';
import { Loader } from '@/components/common/loader';
import {
  useDeletePayment,
  useGetPayments,
} from '@/features/payments/hooks/usePayment';
import { paymentColumns } from './columns/columns';
import { useState, useCallback } from 'react';
import BatchDeleteButton from '@/components/common/BatchDeleteButton';
import { toast } from '@/hooks/use-toast';

export default function PaymentPage() {
  const { data: payments, isLoading, error } = useGetPayments();
  const { mutate: deletePayment, isPending: isDeleting } = useDeletePayment();
  const [selectedPayments, setSelectedPayments] = useState([]);

  const handleDeletePayments = useCallback(async () => {
    const results = await Promise.all(
      selectedPayments.map((payment) => {
        return new Promise((resolve, reject) => {
          deletePayment(payment._id, {
            onSuccess: resolve,
            onError: reject,
          });
        });
      })
    );

    if (results.some((result) => result === 'rejected')) {
      toast({
        title: 'Error deleting payments',
        description: 'Some payments were not deleted',
      });
      return;
    }

    toast({
      title: 'Payments deleted successfully',
      description: 'Payments have been deleted successfully',
    });
    setSelectedPayments([]);
  }, [selectedPayments, deletePayment]);

  if (isLoading) return <Loader />;
  if (error) throw error;

  return (
    <div className='space-y-4'>
      <h1 className='text-xl font-semibold'>Payment History</h1>
      {/* info */}
      <div className='flex flex-col gap-2'>
        <p className='text-sm text-muted-foreground'>
          The date is not the exact date of the payment, it is migrated from the
          orders on 13th Feb 2025. Please check the order page to see the exact
          date of the payment.
        </p>
      </div>

      <div className='flex gap-2'>
        <BatchDeleteButton
          key={selectedPayments.length}
          isLoading={isDeleting}
          selectedRows={selectedPayments}
          handleBatchDelete={handleDeletePayments}
        />
      </div>

      <DataTable
        key={payments?.length}
        enableSelection
        onSelectionChange={setSelectedPayments}
        columns={paymentColumns}
        data={payments}
      />
    </div>
  );
}
