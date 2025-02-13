import { orderService } from '@/api/services/order.service';
import { toast } from '@/hooks/use-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: () => orderService.getAllOrders(),
    select: (data) => data.orders,
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['order'],
    mutationFn: ({ orderId, status }) =>
      orderService.updateOrderStatus(orderId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({
        title: 'Success',
        description: 'Order status has been successfully updated',
      });
    },
  });
};

export const useUpdatePaymnetStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['order'],
    mutationFn: ({ orderId, paymentStatus }) =>
      orderService.updatePaymentStatus(orderId, paymentStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({
        title: 'Success',
        description: 'Payment status has been successfully updated',
      });
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['order'],
    mutationFn: ({ orderId }) => orderService.deleteOrderById(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({
        title: 'Success',
        description: 'Order has been successfully deleted',
      });
    },
  });
};

export const useUpdateEstimatedDeliveryDate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['order'],
    mutationFn: ({ orderId, estimatedDeliveryDate }) =>
      orderService.updateEstimatedDeliveryDate(orderId, estimatedDeliveryDate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({
        title: 'Success',
        description: 'Estimated delivery date has been successfully updated',
      });
    },
  });
};
