import DataTable from '@/components/common/data-table';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { Link } from 'react-router-dom';
import { shopColumns } from './columns/shop-columns';
import { useDeleteShop, useGetAllShops } from '@/features/shop/hooks/useShop';
import { Loader } from '@/components/common/loader';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import BatchDeleteButton from '@/components/common/BatchDeleteButton';

export function ShopPage() {
  const { data: shops, isLoading, error } = useGetAllShops();
  const { mutate: deleteShop, isPending: isDeletingShop } = useDeleteShop();
  const [selectedShops, setSelectedShops] = useState([]);

  if (isLoading) return <Loader />;
  if (error) throw error;

  const handleDelete = async () => {
    const results = await Promise.allSettled(
      selectedShops.map((shop) => {
        return new Promise((resolve, reject) => {
          deleteShop(shop._id, {
            onSuccess: resolve,
            onError: reject,
          });
        });
      })
    );

    if (results.some((result) => result.status === 'rejected')) {
      toast({
        title: 'Failed to delete some shops',
        description: 'Please try again',
      });
    } else {
      toast({
        title: 'Shops deleted successfully',
      });
      setSelectedShops([]);
    }
  };

  return (
    <div className='space-y-4'>
      <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
        <h1 className='text-xl font-semibold'>All Shops</h1>
        <div className='self-end'>
          <BatchDeleteButton
            key={selectedShops?.length}
            selectedRows={selectedShops}
            handleBatchDelete={handleDelete}
            isLoading={isDeletingShop}
          />
          <Link to={ROUTES.SHOP.getCreateLink()}>
            <Button className='border border-input shadow-sm  text-white '>
              Create a shop
            </Button>
          </Link>
        </div>
      </div>

      <DataTable
        key={shops.length}
        onSelectionChange={setSelectedShops}
        enableSelection
        columns={shopColumns}
        data={shops}
      />
    </div>
  );
}

export default ShopPage;
