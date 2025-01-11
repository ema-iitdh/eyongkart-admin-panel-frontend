import { productService } from "@/api/services/product.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useProducts = ({ filter = "" } = {}, options) => {
  return useQuery({
    queryKey: ["products", filter],
    queryFn: async () => {
      console.log("inside queryFn");
      const response = await productService.getProducts({ filter });
      return {
        products: response.products,
        pagination: response.pagination,
      };
    },
    ...options,
  });
};
export const useProductById = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productService.getProductById(id),
    cacheTime: 0,
    staleTime: 0,
    select: (data) => data.product,
    
  });
};

export const useProductByShopId = (shopId) => {
  return useQuery({
    queryKey: ["product", shopId],
    queryFn: () => productService.getProductByShopId(shopId),
    enabled: !!shopId,
  });
};

export const useCreateProductPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) => productService.createProductPost(formData),
          onSuccess: (data) => {
            queryClient.invalidateQueries('products');
          },
  })
}