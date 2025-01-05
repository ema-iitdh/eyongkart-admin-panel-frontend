import { orderService } from "@/api/services/order.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ orderId, status }) =>
        orderService.updateOrderStatus(orderId, status),
    {
      onMutate: async ({ orderId, status }) => {
        await queryClient.cancelQueries(['orders']);
        
        const previousOrders = queryClient.getQueryData(['orders']);

        queryClient.setQueryData(['orders'], (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            orders: oldData.orders.map((order) =>
              order._id === orderId ? { ...order, status } : order
            ),
          };
        });

        return { previousOrders };
      },
      onError: (err, variables, context) => {
        console.error("Failed to update order status", err);
        queryClient.setQueryData(['orders'], context.previousOrders);
        alert("Failed to update order status. Please try again.");
      },
      onSettled: () => {
        queryClient.invalidateQueries(['orders']);
      },
    }
  );

  return mutation;
}
