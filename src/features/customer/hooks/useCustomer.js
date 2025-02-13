import { customerService } from '@/api/services/customer.service';
import { toast } from '@/hooks/use-toast';
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

export const useGetCustomerById = (customerId) => {
  return useQuery({
    queryKey: ['customer', customerId],
    queryFn: () => customerService.getCustomerById(customerId),
    select: (data) => data.data,
  });
};

export const useUpdateCustomer = (customerId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (customer) =>
      customerService.updateCustomer(customerId, customer),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customer', customerId] });
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      toast({
        title: 'Customer updated successfully',
        description: 'Customer updated successfully',
      });
    },
  });
};
