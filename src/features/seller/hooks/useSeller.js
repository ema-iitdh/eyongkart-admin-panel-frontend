import { sellerService } from "@/api/services/seller.service"
import { useQuery } from "@tanstack/react-query"

export const useGetSellerById = (sellerId) => {
    return useQuery({
        queryKey: ["seller", sellerId],
        queryFn: () => sellerService.getSellerById(sellerId),
        enabled: !!sellerId
    })
}