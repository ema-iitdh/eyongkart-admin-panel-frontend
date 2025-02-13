import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsService } from '@/api/services/settings.service';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

export const useEyongkartInfo = () => {
  return useQuery({
    queryKey: ['eyongkartInfo'],
    queryFn: () => settingsService.getEyongkartInfo(),
    select: (data) => data.eyongkartInfo,
  });
};

export const useCreateEyongkartInfo = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data) => settingsService.createEyongkartInfo(data),
    onSuccess: () => {
      toast({
        title: 'EyongkartInfo created successfully',
      });
      queryClient.invalidateQueries({ queryKey: ['eyongkartInfo'] });
    },
  });
};

export const useUpdateEyongkartInfo = () => {
  const queryClient = useQueryClient();
  // const navigate = useNavigate();

  return useMutation({
    mutationFn: (data) => settingsService.updateEyongkartInfo(data),
    onSuccess: () => {
      toast({
        title: 'EyongkartInfo updated successfully',
      });
      queryClient.invalidateQueries({ queryKey: ['eyongkartInfo'] });
    },
  });
};

export const useDeleteEyongkartInfo = () => {
  const queryClient = useQueryClient();
  // const navigate = useNavigate();

  return useMutation({
    mutationFn: (data) => settingsService.deleteEyongkartInfo(data),
    onSuccess: () => {
      toast({
        title: 'EyongkartInfo deleted successfully',
      });
      queryClient.invalidateQueries({ queryKey: ['eyongkartInfo'] });
    },
  });
};
