import { subcategoryServices } from "@/api/services/subcategory.service"
import { useQuery } from "@tanstack/react-query"

export const useGetSubcategoryByCategoryId = (categoryId) => {
    return useQuery({
        queryKey: ['subcategories', categoryId],
        queryFn: () => subcategoryServices.getSubcategoryByCategoryId(categoryId),
        enabled: !!categoryId,
        select: (data) => data.subCategories
    })
}