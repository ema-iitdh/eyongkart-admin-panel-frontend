import { useParams, useNavigate, Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  ShoppingCart,
  Calendar,
  Pencil,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useGetAllCustomers } from '@/features/customer/hooks/useCustomer';
import { Loader } from '@/components/common/loader';
import { CloudinaryConfig } from '../../../../../Cloudinary';
import { ROUTES } from '@/constants/routes';
import CopyableText from '@/components/common/CopyableText';
export function CustomerDetail() {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const { data: customers = [], isLoading, error } = useGetAllCustomers();

  if (isLoading) return <Loader />;
  if (error)
    return (
      <div className='flex justify-center items-center h-screen text-destructive'>
        Error loading customer: {error.message}
      </div>
    );

  const customer = customers.find((customer) => customer._id === customerId);

  console.log(customer);

  if (!customer)
    return (
      <div className='flex justify-center items-center h-screen'>
        Customer not found
      </div>
    );

  return (
    <div className='container mx-auto px-4 py-2 space-y-8'>
      <Button
        variant='ghost'
        size='sm'
        onClick={() => navigate(-1)}
        className='flex items-center gap-2 mb-6'
      >
        <ArrowLeft className='w-8 h-8' />{' '}
        <span className='text-lg'>Back to Customers</span>
      </Button>

      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold'>Customer Details</h1>
        <Link
          to={ROUTES.CUSTOMERS.getUpdateLink(customerId)}
          className='flex items-center gap-2'
        >
          <Button
            variant='secondary'
            className='bg-blue-500 hover:bg-blue-600 text-white'
          >
            <Pencil className='w-4 h-4 mr-2' />
            Edit Customer
          </Button>
        </Link>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* Customer Summary Card */}
        <Card className='drop-shadow-2xl shadow-2xl'>
          <CardHeader>
            <CardTitle className='text-2xl flex items-center gap-4'>
              <Avatar className='w-12 h-12'>
                <AvatarImage src={customer?.picture} alt={customer?.userName} />
                <AvatarFallback>{customer?.userName?.charAt(0)}</AvatarFallback>
              </Avatar>
              {customer?.userName}
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center gap-3'>
              <Mail className='w-5 h-5 text-muted-foreground' />
              <span>{customer?.email}</span>
            </div>
            <div className='flex items-center gap-3'>
              <Phone className='w-5 h-5 text-muted-foreground' />
              <span>
                <CopyableText text={customer?.phone} />
              </span>
            </div>
            <div className='flex items-center gap-3'>
              <Calendar className='w-5 h-5 text-muted-foreground' />
              <span>
                Member since:{' '}
                {new Date(customer?.createdAt)?.toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}
              </span>
            </div>
            <Separator />
            <div className='flex justify-between items-center'>
              <span className='text-muted-foreground'>Customer ID</span>
              <span className='font-medium'>
                <CopyableText text={customer?._id} />
              </span>
            </div>
            {customer?.googleId && (
              <div className='flex justify-between items-center'>
                <span className='text-muted-foreground'>Google ID</span>
                <span className='font-medium'>
                  <CopyableText text={customer?.googleId} />
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Addresses Card */}
        <Card className='drop-shadow-2xl shadow-2xl'>
          <CardHeader>
            <CardTitle className='text-2xl'>Addresses</CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            {customer?.address?.map((addr) => (
              <div key={addr?._id} className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <span className='font-medium'>{addr?.deliveredToWhom}</span>
                  {addr?.isDefault && <Badge>Default</Badge>}
                </div>
                <div className='flex items-start gap-3'>
                  <MapPin className='w-5 h-5 mt-1 text-muted-foreground' />
                  <div className='flex-1'>
                    <p className='text-sm'>
                      {addr?.address}, {addr?.street}
                    </p>
                    <p className='text-sm'>
                      {addr?.landmark && `${addr?.landmark}, `}
                      {addr?.district}
                    </p>
                    <p className='text-sm'>
                      {addr?.state} - {addr?.pincode}
                    </p>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <Phone className='w-5 h-5 text-muted-foreground' />
                  <span>{addr?.phone}</span>
                </div>
                <Separator />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Cart Items Card */}
        <Card className='drop-shadow-2xl shadow-2xl lg:col-span-2'>
          <CardHeader>
            <CardTitle className='text-2xl flex items-center gap-2'>
              <ShoppingCart className='w-6 h-6' />
              Cart Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-6'>
              {customer?.cart?.map((item) => (
                <div
                  key={item?._id}
                  className='flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b last:border-0'
                >
                  <div className='flex items-center gap-4 mb-2 sm:mb-0'>
                    <img
                      src={
                        `${CloudinaryConfig.CLOUDINARY_URL}/${
                          item?.product?.variants?.find(
                            (variant) => variant._id === item?.variantId?.[0]
                          )?.images?.[0]?.url || item?.product?.baseImage?.url
                        }` ||
                        `${CloudinaryConfig.CLOUDINARY_URL2}/${
                          item?.product?.variants?.find(
                            (variant) => variant._id === item?.variantId?.[0]
                          )?.images?.[0]?.url || item?.product?.image?.[0]
                        }`
                      }
                      alt={item?.product?.name}
                      className='w-16 h-16 object-cover rounded'
                    />
                    <div>
                      <p className='font-medium'>{item?.product?.name}</p>
                      <p className='text-sm text-muted-foreground'>
                        Quantity: {item.quantity}
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        Variant: {item.variantId.join(', ')}
                      </p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='font-medium'>
                      ₹
                      {item?.product?.variants
                        ?.find(
                          (variant) => variant._id === item?.variantId?.[0]
                        )
                        ?.price?.discountedPrice?.toFixed(2)}
                    </p>
                    {item?.product?.discountedPrice !==
                      item?.product?.price && (
                      <div>
                        <p className='text-sm text-muted-foreground line-through'>
                          ₹{item?.product?.price?.toFixed(2)}
                        </p>
                        <p className='text-sm text-green-600'>
                          {item?.product?.discount}% off
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div className='flex justify-between text-lg font-semibold'>
                <span>Total Items</span>
                <span>
                  {customer?.cart?.reduce(
                    (sum, item) => sum + item.quantity,
                    0
                  )}
                </span>
              </div>
              <div className='flex justify-between text-lg font-semibold'>
                <span>Total Value</span>
                <span>
                  ₹
                  {customer?.cart
                    ?.reduce(
                      (sum, item) =>
                        sum +
                        item?.product?.variants?.find(
                          (variant) => variant._id === item?.variantId?.[0]
                        )?.price?.discountedPrice *
                          item?.quantity,
                      0
                    )
                    ?.toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default CustomerDetail;
