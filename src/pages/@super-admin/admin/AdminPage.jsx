import DataTable from '@/components/common/data-table';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { useGetAllAdmins } from '@/features/admin/hooks/useAdmin';
import { Loader, Plus } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import BatchDeleteButton from './_components/BatchDeleteButton';
import { adminColumns } from './columns/admins-columns';

const AdminPage = () => {
  const { data: admins, isLoading, isError } = useGetAllAdmins();
  const [selectedAdmins, setSelectedAdmins] = useState([]);

  const handleDeleteAdmins = useCallback((selectedAdmins) => {
    setSelectedAdmins(selectedAdmins);
    console.log('Selected Admins:', selectedAdmins);
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
      <div className='text-center text-red-500'>Error fetching admins</div>
    );
  }

  return (
    <div className='p-4 sm:p-6'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6'>
        <h1 className='text-2xl font-bold'>Admin Management</h1>
        <div className='flex gap-2'>
          <BatchDeleteButton
            selectedRows={selectedAdmins}
            handleBatchDelete={handleDeleteAdmins}
          />
          <Link to={ROUTES.ADMIN.getCreateLink()}>
            <Button>
              <Plus className='h-4 w-4 mr-2' />
              Create New Admin
            </Button>
          </Link>
        </div>
      </div>
      <DataTable
        data={admins}
        columns={adminColumns}
        enableSelection={true}
        onSelectionChange={handleDeleteAdmins}
      />
    </div>
  );
};

export default AdminPage;
