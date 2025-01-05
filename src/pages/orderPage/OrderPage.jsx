import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"; // React Query for data fetching
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { useOrders } from "@/features/orders/hooks/useOrders";
import { useUpdateOrderStatus } from "@/features/orders/hooks/useUpdateOrderStatus";

export function OrderPage() {

  const { data: orders, isLoading, error } = useOrders();
  // const updateOrderStatus = useUpdateOrderStatus();

  if (isLoading) return <p>Loading orders...</p>;
  if (error) return <p>Error loading orders: {error.message}</p>;

  // const handleStatusChange = (orderId, status) => {
  //   if (!status) return;
  //   updateOrderStatus.mutate({ orderId, status },
  //     {
  //       onError: (error) => {
  //         alert(`Error: ${error.message}`);
  //       },
  //       onSuccess: () => {
  //         alert("Order status updated successfully.");
  //       }
  //     }
  //   );
  // };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">All Orders</h1>
      
      {/* Orders Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order._id}</TableCell>
              <TableCell>{order.shipping_address.full_name}</TableCell>
              <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <Badge variant={order.status === "Pending" ? "warning" : "success"}>
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>₹{order.amount.toFixed(2)}</TableCell>
              <TableCell>
                <Select onValueChange={(status) => handleStatusChange(order._id, status)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Update Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Canceled">Canceled</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
