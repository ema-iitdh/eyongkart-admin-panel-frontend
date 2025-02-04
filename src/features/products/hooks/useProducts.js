import { productService } from '@/api/services/product.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useProducts = ({ filter = '' }, options) => {
  return useQuery({
    queryKey: ['products', filter],
    queryFn: async () => {
      console.log('inside queryFn');
      const response = await productService.getProducts({ filter });
      return {
        products: response.products,
        pagination: response.pagination,
      };
    },
    ...options,
  });
};

/**
 * Hook to fetch a product by ID
 * @param {string} id - The product ID
 * @returns {Object} Query object containing:
 * - data: Product object with properties:
 *   - baseImage: {url: string, altText: string}
 *   - specifications: {material: string}
 *   - _id: string
 *   - name: string
 *   - description: string
 *   - category: {_id: string, name: string, ...}
 *   - subcategory: {_id: string, name: string, ...}
 *   - shop: {_id: string, name: string, ...}
 *   - gender: "male" | "female" | "unisex"
 *   - ageGroup: "kids" | "adults" | "all"
 *   - status: "draft" | "published"
 *   - isVisible: boolean
 *   - variants: Array<{color, pattern, size, price, stock, ...}>
 * - isLoading: boolean
 * - error: Error object if query fails
 */
export const useProductById = (id) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => {
      return productService.getProductById(id);
    },
    cacheTime: 0,
    staleTime: 0,
    select: (data) => data.product, // Returns the product object from response
  });
};

export const useProductByShopId = (shopId) => {
  return useQuery({
    queryKey: ['product', shopId],
    queryFn: () => productService.getProductByShopId(shopId),
    enabled: !!shopId,
  });
};

export const useProductBySellerId = (sellerId) => {
  return useQuery({
    queryKey: ['product', sellerId],
    queryFn: () => productService.getProductBySellerId(sellerId),
    select: (data) => data.products,
    enabled: !!sellerId,
  });
};

export const useCreateProductPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) => productService.createProductPost(formData),
    onSuccess: () => {
      queryClient.invalidateQueries('products');
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) => productService.updateProduct(formData),
    onSuccess: () => {
      queryClient.invalidateQueries('products');
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => productService.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries('products');
    },
  });
};
