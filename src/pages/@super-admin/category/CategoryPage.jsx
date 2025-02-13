import BatchDeleteButton from '@/components/common/BatchDeleteButton';
import DataTable from '@/components/common/data-table';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { Loader, Plus } from 'lucide-react';
import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  useDeleteCategory,
  useGetAllCategories,
} from '@/features/categories/hooks/useCategory';
import { categoryColumns } from './columns/category-columns';
import { toast } from '@/hooks/use-toast';

const CategoryPage = () => {
  const { data: categories = [], isLoading, isError } = useGetAllCategories();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { mutate: deleteCategory, isPending: isDeletingCategory } =
    useDeleteCategory();

  const handleDeleteCategories = useCallback(async () => {
    const results = await Promise.allSettled(
      selectedCategories.map((category) => {
        return new Promise((resolve, reject) => {
          deleteCategory(category._id, {
            onSuccess: resolve,
            onError: reject,
          });
        });
      })
    );

    if (results.some((result) => result.status === 'rejected')) {
      toast({
        title: 'Failed to delete some categories',
        description: 'Please try again',
      });
    } else {
      toast({
        title: 'Categories deleted successfully',
      });
    }
  }, [deleteCategory, selectedCategories]);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loader className='animate-spin h-8 w-8' />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='text-center text-red-500'>Error fetching categories</div>
    );
  }

  return (
    <div className='p-4 sm:p-6'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6'>
        <h1 className='text-2xl font-bold'>Categories Management</h1>
        <div className='flex gap-2'>
          <BatchDeleteButton
            key={selectedCategories?.length}
            selectedRows={selectedCategories}
            handleBatchDelete={handleDeleteCategories}
            isLoading={isDeletingCategory}
          />
          <Link to={ROUTES.CATEGORIES.getCreateLink()}>
            <Button>
              <Plus className='h-4 w-4 mr-2' />
              Create New Category
            </Button>
          </Link>
        </div>
      </div>
      <DataTable
        key={categories?.length}
        data={categories}
        columns={categoryColumns}
        enableSelection={true}
        onSelectionChange={setSelectedCategories}
      />
    </div>
  );
};

export default CategoryPage;
