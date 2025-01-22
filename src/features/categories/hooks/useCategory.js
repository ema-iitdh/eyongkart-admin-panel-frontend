import { categoryServices } from "@/api/services/category.service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryServices.getAllCategories(),
    select: (data) => data.categories,
  });
};

export const useUpdateCategory = () => {
  return useMutation({
    mutationKey: ["category"],
    mutationFn: ({ categoryId, ...formData }) =>
      categoryServices.updateCategory(categoryId, formData),
  });
};

export const useCreateCategory = () => {
  return useMutation({
    mutationKey: ["createCategory"],
    mutationFn: (formData) => categoryServices.createCategory(formData),
  });
};

export const useDeleteCategory = () => {
  return useMutation({
    mutationKey: ["deleteCategory"],
    mutationFn: (categoryId) => categoryServices.deleteCategory(categoryId),
  });
};
