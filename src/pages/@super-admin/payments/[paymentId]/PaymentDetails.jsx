import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PAYMENT_STATUS, PaymentStatus } from '@/constants';
import { useGetPaymentById } from '@/features/payments/hooks/usePayment';
import { Loader } from '@/components/common/loader';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { ArrowLeftIcon } from 'lucide-react';
import CopyableText from '@/components/common/CopyableText';

export default function PaymentDetails() {
  const { paymentId } = useParams();
  const { data: payment, isLoading, error } = useGetPaymentById(paymentId);
  const navigate = useNavigate();

  if (isLoading) return <Loader />;
  if (error) throw error;

  const paymentStatus =
    payment?.status === 'Paid' || payment?.status === 'Success'
      ? 'Completed'
      : payment?.status;

  const badgeColor =
    payment?.status?.toLowerCase() === 'paid' ||
    payment?.status?.toLowerCase() === 'success' ||
    payment?.status?.toLowerCase() === PAYMENT_STATUS.COMPLETED.toLowerCase()
      ? 'bg-green-600'
      : payment?.status?.toLowerCase() === PAYMENT_STATUS.FAILED.toLowerCase()
      ? 'bg-red-600'
      : 'bg-yellow-600';

  return (
    <div className='container mx-auto p-4 space-y-6'>
      {/* back button */}
      <div className='flex justify-start'>
        <Button
          onClick={() => navigate(-1)}
          variant={'outline'}
          className='gap-2'
        >
          <ArrowLeftIcon className='w-4 h-4' />
          Back
        </Button>
      </div>
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
        <h1 className='text-2xl font-bold'>Payment Details</h1>
        <Badge
          variant={'outline'}
          className={`${badgeColor} text-white font-bold`}
        >
          {paymentStatus?.toUpperCase()}
        </Badge>
      </div>

      <div className='grid gap-6 lg:grid-cols-2'>
        <Card className='w-full'>
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm break-words'>
              <div className='text-muted-foreground'>Payment ID</div>
              <CopyableText text={payment?._id} />
              <div className='text-muted-foreground'>Transaction ID</div>
              <CopyableText text={payment?.transactionId} />
              <div className='text-muted-foreground'>Amount</div>
              <div>₹{payment?.amount}</div>
              <div className='text-muted-foreground'>Payment Method</div>
              <div>{payment?.paymentMethod}</div>
              <div className='text-muted-foreground'>Payment Gateway</div>
              <div>{payment?.paymentGateway}</div>
              <div className='text-muted-foreground'>Created At</div>
              <div className='flex items-center gap-2'>
                <span>
                  {new Date(payment?.createdAt).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <span>
                  {new Date(payment?.createdAt).toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='w-full'>
          <CardHeader>
            <CardTitle>Order Information</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm break-words'>
              <div className='text-muted-foreground'>Order ID</div>
              <CopyableText text={payment?.order?._id} />
              <div className='text-muted-foreground'>Order Status</div>
              <div>{payment?.order?.status}</div>
              <div className='text-muted-foreground'>Total Items</div>
              <div>{payment?.order?.total_items}</div>
              <div className='text-muted-foreground'>Order Date</div>
              <div className='flex items-center gap-2'>
                <span>
                  {new Date(payment?.order?.createdAt).toLocaleDateString(
                    'en-IN',
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }
                  )}
                </span>
                <span>
                  {new Date(payment?.order?.createdAt).toLocaleTimeString(
                    'en-IN',
                    {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    }
                  )}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='w-full'>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm break-words'>
              <div className='text-muted-foreground'>Customer ID</div>
              <CopyableText text={payment?.userId} />
              <div className='text-muted-foreground'>Name</div>
              <div>{payment?.order?.shipping_address?.full_name}</div>
              <div className='text-muted-foreground'>Phone</div>
              <CopyableText text={payment?.order?.shipping_address?.phone} />
            </div>
          </CardContent>
        </Card>

        <Card className='w-full'>
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm break-words'>
              <div className='text-muted-foreground'>Address</div>
              <div>
                {payment?.order?.shipping_address?.address_line1}
                {payment?.order?.shipping_address?.address_line2 && (
                  <>, {payment?.order?.shipping_address?.address_line2}</>
                )}
              </div>
              <div className='text-muted-foreground'>Landmark</div>
              <div>{payment?.order?.shipping_address?.landmark}</div>
              <div className='text-muted-foreground'>City</div>
              <div>{payment?.order?.shipping_address?.city}</div>
              <div className='text-muted-foreground'>State</div>
              <div>{payment?.order?.shipping_address?.state}</div>
              <div className='text-muted-foreground'>Pincode</div>
              <div>{payment?.order?.shipping_address?.pincode}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
