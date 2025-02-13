// get all payments

import { paymentService } from '@/api/services/payment.service';
import { toast } from '@/hooks/use-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetPayments = () => {
  return useQuery({
    queryKey: ['payments'],
    queryFn: () => paymentService.getAllPayments(),
    select: (data) => data?.data,
  });
};

// get payment by id

export const useGetPaymentById = (id) => {
  return useQuery({
    queryKey: ['payment', id],
    queryFn: () => paymentService.getPaymentById(id),
    select: (data) => data?.data,
  });
};
// update payment

export const useUpdatePayment = (id, data) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => paymentService.updatePayment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      toast({
        title: 'Payment updated successfully',
        description: 'Payment has been updated successfully',
      });
    },
  });
};

// delete payment

export const useDeletePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (paymentId) => paymentService.deletePayment(paymentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      toast({
        title: 'Payment deleted successfully',
        description: 'Payment has been deleted successfully',
      });
    },
  });
};
