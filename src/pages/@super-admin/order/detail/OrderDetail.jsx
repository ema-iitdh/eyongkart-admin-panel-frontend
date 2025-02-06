import { useParams, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, MapPin, Phone, Calendar } from 'lucide-react';
import { OrderStatus } from '@/constants';
import { useOrders } from '@/features/orders/hooks/useOrders';
import { CloudinaryConfig } from '../../../../../Cloudinary';
import { Loader } from '@/components/common/loader';

export function OrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { data: orders = [], isLoading, error } = useOrders();

  if (isLoading) return <Loader />;
  if (error)
    return (
      <div className='flex justify-center items-center h-screen text-destructive'>
        Error loading order: {error.message}
      </div>
    );

  const order = orders.find((order) => order._id === orderId);

  if (!order)
    return (
      <div className='flex justify-center items-center h-screen'>
        Order not found
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
        <span className='text-lg'>Back to Orders</span>
      </Button>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* Order Summary Card */}
        <Card className='drop-shadow-2xl shadow-2xl'>
          <CardHeader>
            <CardTitle className='text-2xl'>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex justify-between items-center'>
              <span className='text-muted-foreground'>Order ID</span>
              <span className='font-medium'>{order?._id}</span>
            </div>
            <Separator />
            <div className='flex justify-between items-center'>
              <span className='text-muted-foreground'>Order Date</span>
              <span className='font-medium'>
                {new Date(order?.createdAt).toLocaleDateString()}
              </span>
            </div>
            <Separator />
            <div className='flex justify-between items-center'>
              <span className='text-muted-foreground'>Payment Status</span>
              <Badge
                variant={
                  order?.payment?.status === 'Pending' ? 'warning' : 'success'
                }
              >
                {order?.payment?.status}
              </Badge>
            </div>
            <Separator />
            <div className='flex justify-between items-center'>
              <span className='text-muted-foreground'>Order Status</span>
              <Badge variant={OrderStatus[order?.status]}>
                {order?.status}
              </Badge>
            </div>
            <Separator />
            <div className='flex justify-between items-center'>
              <span className='text-muted-foreground'>Payment Method</span>
              <span className='font-medium'>{order?.payment_type}</span>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Details Card */}
        <Card className='drop-shadow-2xl shadow-2xl'>
          <CardHeader>
            <CardTitle className='text-2xl'>Shipping Details</CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='flex items-start gap-3'>
              <MapPin className='w-5 h-5 mt-1 text-muted-foreground' />
              <div className='flex-1'>
                <p className='font-medium'>
                  {order?.shipping_address?.full_name}
                </p>
                <p className='text-sm text-muted-foreground'>
                  {order?.shipping_address?.address_line1}
                  {order?.shipping_address?.address_line2 &&
                    `, ${order?.shipping_address?.address_line2}`}
                  {order?.shipping_address?.landmark &&
                    `, ${order?.shipping_address?.landmark}`}
                </p>
                <p className='text-sm text-muted-foreground'>
                  {order?.shipping_address?.city},{' '}
                  {order?.shipping_address?.state} -{' '}
                  {order?.shipping_address?.pincode}
                </p>
              </div>
            </div>
            <Separator />
            <div className='flex items-center gap-3'>
              <Phone className='w-5 h-5 text-muted-foreground' />
              <span>{order?.shipping_address?.phone}</span>
            </div>
            <Separator />
            <div className='flex items-center gap-3'>
              <Calendar className='w-5 h-5 text-muted-foreground' />
              <span>
                Estimated Delivery:{' '}
                {new Date(
                  order?.shipping_details?.estimated_delivery_date
                ).toLocaleDateString()}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Order Items Card */}
        <Card className='drop-shadow-2xl shadow-2xl lg:col-span-2'>
          <CardHeader>
            <CardTitle className='text-2xl'>Order Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-6'>
              {order?.products?.map((product) => (
                <div
                  key={product?._id}
                  className='flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b last:border-0'
                >
                  <div className='flex items-center gap-4 mb-2 sm:mb-0'>
                    <img
                      src={`${CloudinaryConfig.CLOUDINARY_URL}/image/upload/${
                        product?.variant?.images?.[0]?.url ||
                        product?.product?.images?.[0]?.url ||
                        product?.product?.image_id?.[0]
                      }`}
                      alt={product?.name}
                      className='w-16 h-16 object-cover rounded'
                    />
                    <div className='flex flex-col gap-2'>
                      <p className='text-xs text-muted-foreground'>
                        {product?._id}
                      </p>
                      <p className='font-medium'>
                        {product?.variant?.color?.name}
                      </p>
                      <p className='font-medium'>
                        {product?.variant?.size?.value}
                      </p>
                    </div>
                    <div>
                      <p className='font-medium'>{product?.name}</p>
                      <p className='text-sm text-muted-foreground'>
                        Quantity: {product?.quantity}
                      </p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='font-medium'>
                      ₹
                      {product?.variant?.price?.discountedPrice?.toFixed(2) ||
                        product?.price}
                    </p>
                    <p className='text-sm text-muted-foreground'>
                      Total: ₹
                      {(
                        (product?.variant?.price?.discountedPrice ||
                          product?.price) * product.quantity
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
              <Separator />
              <div className='flex justify-between pt-4'>
                <span className='font-medium'>Subtotal</span>
                <span>
                  ₹
                  {(
                    order?.amount - order?.shipping_details?.shipping_charge
                  ).toFixed(2)}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='font-medium'>Shipping</span>
                <span>
                  ₹{order?.shipping_details?.shipping_charge?.toFixed(2)}
                </span>
              </div>
              <Separator />
              <div className='flex justify-between text-lg font-semibold'>
                <span>Total</span>
                <span>₹{order?.amount?.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default OrderDetail;
