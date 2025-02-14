import {
  Select,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { OrderStatusText, UI_COLORS } from '@/constants';
import { useUpdateOrderStatus } from '@/features/orders/hooks/useOrders';
import { Package } from 'lucide-react';

const StatusSelect = ({ orderId, currentStatus }) => {
  const { mutate: updateStatus } = useUpdateOrderStatus();

  const handleStatusChange = (status) => {
    if (!status) return;
    updateStatus({ orderId, status });
  };

  const selectStyle =
    currentStatus === OrderStatusText.Pending
      ? UI_COLORS.warning
      : currentStatus === OrderStatusText.Processing
      ? UI_COLORS.primary
      : currentStatus === OrderStatusText.Shipped
      ? UI_COLORS.info
      : currentStatus === OrderStatusText.Delivered
      ? UI_COLORS.success
      : currentStatus === OrderStatusText.Cancelled
      ? UI_COLORS.destructive
      : UI_COLORS.secondary;

  return (
    <Select onValueChange={handleStatusChange}>
      <SelectTrigger className={selectStyle}>
        <SelectValue
          placeholder={
            <span className='flex items-center gap-2'>
              <Package className='mr-1' size={18} />
              {currentStatus}
            </span>
          }
        />
      </SelectTrigger>
      <SelectContent>
        {Object.values(OrderStatusText).map((status) => (
          <SelectItem key={status} value={status}>
            {status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default StatusSelect;
