import { categoryServices } from "@/api/services/category.service"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useGetAllCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: () => categoryServices.getAllCategories(),
        select: (data) => data.categories,
    })
}

export const useUpdateCategory = () => {
    return useMutation({
        mutationKey: ["category"],
        mutationFn: ({ categoryId, formData }) => categoryServices.updateCategory(categoryId, formData),
    })
}