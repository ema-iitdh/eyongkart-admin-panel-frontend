import { orderService } from "@/api/services/order.service"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useOrders = () => {
    return useQuery({
        queryKey: ['orders'],
        queryFn: () => orderService.getAllOrders(),
        select:(data) => data.orders,
    });
};

export const useUpdateOrderStatus = () => {
    return useMutation({
        mutationKey: ["order"],
        mutationFn: ({ orderId, status }) => orderService.updateOrderStatus(orderId, status),
    })
};

export const useUpdatePaymnetStatus = () => {
    return useMutation({
        mutationKey: ["order"],
        mutationFn: ({ orderId, paymentStatus }) => orderService.updatePaymentStatus(orderId, paymentStatus),
    })
};