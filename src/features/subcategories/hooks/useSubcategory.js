import { subcategoryServices } from "@/api/services/subcategory.service";
import { useQuery, useMutation } from "@tanstack/react-query";

export const useGetSubcategoryByCategoryId = (categoryId) => {
  return useQuery({
    queryKey: ["subcategories", categoryId],
    queryFn: () => subcategoryServices.getSubcategoryByCategoryId(categoryId),
    enabled: !!categoryId,
    select: (data) => data.subCategories,
  });
};

export const useCreateSubCategory = () => {
  return useMutation({
    mutationKey: ["createSubCategory"],
    mutationFn: (formData) => subcategoryServices.createSubCategory(formData),
  });
};

export const useDeleteSubCategory = () => {
  return useMutation({
    mutationKey: ["deleteSubCategory"],
    mutationFn: (subcategoryId) =>
      subcategoryServices.deleteSubCategory(subcategoryId),
  });
};

export const useUpdateSubCategory = () => {
  return useMutation({
    mutationKey: ["updateSubCategory"],
    mutationFn: (formData) => subcategoryServices.updateSubCategory(formData),
  });
};
