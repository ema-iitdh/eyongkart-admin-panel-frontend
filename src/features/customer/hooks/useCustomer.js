import { customerService } from '@/api/services/customer.service';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useGetAllCustomers = () => {
  return useQuery({
    queryKey: ['customers'],
    queryFn: () => customerService.getAllCustomers(),
    select: (data) => data.data,
  });
};

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (customerId) => customerService.deleteCustomer(customerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });
};
