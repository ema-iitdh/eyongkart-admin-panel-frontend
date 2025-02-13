import { useAdminById } from '@/features/admin/hooks/useAdmin';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Pencil } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

export default function AdminDetails() {
  const { adminId } = useParams();
  const { data, isLoading } = useAdminById(adminId);
  const navigate = useNavigate();

  if (isLoading) return <AdminDetailsSkeleton />;

  return (
    <div className='max-w-4xl mx-auto w-full p-4 md:p-6 lg:p-8'>
      <h1 className='text-2xl md:text-3xl font-bold mb-8'>Admin Details</h1>
      {/* Back Button */}
      <div className='flex justify-start mb-4'>
        <div className='flex items-center gap-4'>
          <Button
            onClick={() => navigate(-1)}
            variant='secondary'
            className='flex items-center gap-2 px-4 py-2 hover:bg-gray-200'
          >
            <ArrowLeft />
            Back to Admins
          </Button>
          <Link
            to={ROUTES.ADMIN.getUpdateLink(adminId)}
            className='flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md'
          >
            <Pencil />
            Edit Admin
          </Link>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-lg shadow-lg p-6'>
        <div className='space-y-4'>
          <div>
            <h3 className='text-sm font-medium text-gray-500'>Name</h3>
            <p className='mt-1 text-base font-medium'>{data?.name}</p>
          </div>

          <div>
            <h3 className='text-sm font-medium text-gray-500'>Email</h3>
            <p className='mt-1 text-base'>{data?.email}</p>
          </div>

          <div>
            <h3 className='text-sm font-medium text-gray-500'>Role</h3>
            <p className='mt-1 text-base capitalize'>
              {data?.role?.replace(/_/g, ' ')?.toLowerCase()}
            </p>
          </div>
        </div>

        <div className='space-y-4'>
          <div>
            <h3 className='text-sm font-medium text-gray-500'>Status</h3>
            <div className='mt-1 flex items-center gap-2'>
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  data?.isActive ? 'bg-green-500' : 'bg-red-500'
                }`}
              />
              <span className='text-base'>
                {data?.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>

          <div>
            <h3 className='text-sm font-medium text-gray-500'>Verification</h3>
            <div className='mt-1 flex items-center gap-2'>
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  data?.isVerified ? 'bg-green-500' : 'bg-yellow-500'
                }`}
              />
              <span className='text-base'>
                {data?.isVerified ? 'Verified' : 'Unverified'}
              </span>
            </div>
          </div>

          <div>
            <h3 className='text-sm font-medium text-gray-500'>Created At</h3>
            <p className='mt-1 text-base'>
              {new Date(data?.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminDetailsSkeleton() {
  return (
    <div className='max-w-4xl mx-auto w-full p-4 md:p-6 lg:p-8'>
      <Skeleton className='h-10 w-60 mb-8' />
      <Skeleton className='h-10 w-32 mb-4' />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-lg shadow-lg p-6'>
        <div className='space-y-4'>
          <div>
            <Skeleton className='h-4 w-20 mb-1' />
            <Skeleton className='h-6 w-40' />
          </div>
          <div>
            <Skeleton className='h-4 w-20 mb-1' />
            <Skeleton className='h-6 w-48' />
          </div>
          <div>
            <Skeleton className='h-4 w-20 mb-1' />
            <Skeleton className='h-6 w-36' />
          </div>
        </div>
        <div className='space-y-4'>
          <div>
            <Skeleton className='h-4 w-20 mb-1' />
            <div className='flex items-center gap-2'>
              <Skeleton className='h-2.5 w-2.5 rounded-full' />
              <Skeleton className='h-6 w-24' />
            </div>
          </div>
          <div>
            <Skeleton className='h-4 w-20 mb-1' />
            <div className='flex items-center gap-2'>
              <Skeleton className='h-2.5 w-2.5 rounded-full' />
              <Skeleton className='h-6 w-28' />
            </div>
          </div>
          <div>
            <Skeleton className='h-4 w-20 mb-1' />
            <Skeleton className='h-6 w-44' />
          </div>
        </div>
      </div>
    </div>
  );
}
