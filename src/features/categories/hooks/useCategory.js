import { categoryServices } from "@/api/services/category.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { categoryServices } from "@/api/services/category.service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryServices.getAllCategories(),
    select: (data) => data.categories,
  });
};
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryServices.getAllCategories(),
    select: (data) => data.categories,
  });
};

export const useUpdateCategory = () => {
  return useMutation({
    mutationKey: ["category"],
    mutationFn: ({ categoryId, formData }) =>
      categoryServices.updateCategory(categoryId, formData),
  });
};

export const useCreateCategory = () => {
  return useMutation({
    mutationKey: ["createCategory"],
    mutationFn: (formData) => categoryServices.createCategory(formData),
  });
};

export const useCreateSubCategory = () => {
  return useMutation({
    mutationKey: ["createSubCategory"],
    mutationFn: (formData) => categoryServices.createSubCategory(formData),
  });
};
