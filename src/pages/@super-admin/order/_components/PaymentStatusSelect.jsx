import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { PAYMENT_STATUS, UI_COLORS } from '@/constants';
import { useUpdatePaymnetStatus } from '@/features/orders/hooks/useOrders';
import { CreditCard } from 'lucide-react';

const PaymentStatusSelect = ({ orderId, currentPaymentStatus }) => {
  const { mutate: updatePaymentStatus } = useUpdatePaymnetStatus();

  const handlePaymentStatusChange = (paymentStatus) => {
    if (!paymentStatus) return;
    updatePaymentStatus({ orderId, paymentStatus });
  };

  const selectStyle =
    currentPaymentStatus === PAYMENT_STATUS.PENDING
      ? UI_COLORS.warning
      : currentPaymentStatus === PAYMENT_STATUS.FAILED
      ? UI_COLORS.destructive
      : currentPaymentStatus === PAYMENT_STATUS.COMPLETED
      ? UI_COLORS.success
      : currentPaymentStatus === PAYMENT_STATUS.REFUNDED
      ? UI_COLORS.info
      : UI_COLORS.secondary;

  return (
    <Select onValueChange={handlePaymentStatusChange}>
      <SelectTrigger className={`${selectStyle}`}>
        <SelectValue
          placeholder={
            <span className='flex items-center gap-2'>
              <CreditCard className='mr-1' size={18} />
              {currentPaymentStatus}
            </span>
          }
        />
      </SelectTrigger>
      <SelectContent>
        {Object.values(PAYMENT_STATUS).map((paymentStatus) => (
          <SelectItem key={paymentStatus} value={paymentStatus}>
            {paymentStatus}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default PaymentStatusSelect;
