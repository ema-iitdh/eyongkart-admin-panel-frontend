import { orderService } from "@/api/services/order.service"
import { useQuery } from "@tanstack/react-query"

export const useOrders = () => {
    return useQuery({
        queryKey: ['orders'],
        queryFn: () => orderService.getAllOrders(),
        select:(data)=>data.orders,
    });
};