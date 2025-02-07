import { adminServices } from '@/api/services/admin.service';
import { toast } from '@/hooks/use-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetAllAdmins = () => {
  return useQuery({
    queryKey: ['admins'],
    queryFn: () => adminServices.getAllAdmins(),
    select: (data) => data.admins,
  });
};

export const useCreateNewAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createAdmin'],
    mutationFn: (formData) => adminServices.createNewAdmin(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });
      toast({
        title: 'Success',
        description: 'Admin created successfully',
      });
    },
  });
};

export const useDeleteAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['deleteAdmin'],
    mutationFn: (adminId) => adminServices.deleteAdmin(adminId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });
      toast({
        title: 'Success',
        description: 'Admin deleted successfully',
      });
    },
  });
};
