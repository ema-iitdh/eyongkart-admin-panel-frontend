import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { PAYMENT_STATUS } from '@/constants';
import { useUpdatePaymnetStatus } from '@/features/orders/hooks/useOrders';

const PaymentStatusSelect = ({ orderId, currentPaymentStatus }) => {
  const { mutate: updatePaymentStatus } = useUpdatePaymnetStatus();

  const handlePaymentStatusChange = (paymentStatus) => {
    if (!paymentStatus) return;
    updatePaymentStatus({ orderId, paymentStatus });
  };

  return (
    <Select onValueChange={handlePaymentStatusChange}>
      <SelectTrigger>
        <SelectValue placeholder={currentPaymentStatus} />
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
