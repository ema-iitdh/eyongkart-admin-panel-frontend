import { shopService } from "@/api/services/shop.service"
import { useQuery } from "@tanstack/react-query"

export const useGetAllShops = () => {
    return useQuery({
        queryKey: ['shops'],
        queryFn: () => shopService.getAllShops(),
        select: (data) => data.shops
    })
}