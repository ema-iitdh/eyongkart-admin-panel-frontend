import DataTable from '@/components/common/data-table';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { Link } from 'react-router-dom';
import { shopColumns } from './columns/shop-columns';
import { useGetAllShops } from '@/features/shop/hooks/useShop';
import { Loader } from '@/components/common/loader';

export function ShopPage() {
  const { data: shops, isLoading, error, refetch } = useGetAllShops();

  if (isLoading) return <Loader />;
  if (error) throw error;

  return (
    <div className='space-y-4'>
      <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
        <h1 className='text-xl font-semibold'>All Shops</h1>
        <div className='self-end'>
          <Link to={ROUTES.SHOP.getCreateLink()}>
            <Button className='border border-input shadow-sm  text-white '>
              Create a shop
            </Button>
          </Link>
        </div>
      </div>

      <DataTable columns={shopColumns} data={shops} />
    </div>
  );
}

export default ShopPage;
