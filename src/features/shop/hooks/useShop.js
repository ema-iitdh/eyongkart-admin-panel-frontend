import { shopService } from "@/api/services/shop.service"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useGetAllShops = () => {
    return useQuery({
        queryKey: ['shops'],
        queryFn: () => shopService.getAllShops(),
        select: (data) => data.shops
    })
}
export const useShopById = (id) => {
  return useQuery({
    queryKey: ["shop", id],
    queryFn: () => shopService.getShopById(id),
    cacheTime: 0,
    staleTime: 0,
    select: (data) => data.shop,
  });
};

export const useShopBySellerId = (sellerId) => {
  return useQuery({
    queryKey: ["shop", sellerId],
    queryFn: () => shopService.getShopBySellerId(sellerId),
    cacheTime: 0,
    staleTime: 0,
    select: (data) => data.shop,
  })
}
export const useCreateShopPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn:async (formData) => shopService.createShopPost(formData),
            onSuccess: () => {
              queryClient.invalidateQueries('shops');
            },
    })
  }