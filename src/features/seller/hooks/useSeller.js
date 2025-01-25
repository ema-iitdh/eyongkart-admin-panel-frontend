import { sellerService } from "@/api/services/seller.service"
import { useQuery } from "@tanstack/react-query"

export const useGetSellerById = (sellerId) => {
    console.log("usequery reached", sellerId)
    return useQuery({
        queryKey: ["seller", sellerId],
        queryFn: async () => {
            console.log("queryFn executing");
            try {
                const data = await sellerService.getSellerById(sellerId);
                console.log("queryFn success", data);
                return data;
            } catch (error) {
                console.error("queryFn error", error);
                throw error;
            }
        },
        enabled: !!sellerId,
        retry: false // Disable retries temporarily for debugging
    })
}