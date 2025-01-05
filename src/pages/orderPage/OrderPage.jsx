import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useOrders, useUpdatateOrderStatus } from "@/features/orders/hooks/useOrders";

export function OrderPage() {

  const { data: orders, isLoading, error, refetch } = useOrders();
  const { mutate: updateStatus } = useUpdatateOrderStatus();

  if (isLoading) return <p>Loading orders...</p>;
  if (error) return <p>Error loading orders: {error.message}</p>;

  const handleStatusChange = (orderId, status) => {
    if (!status) return;
    updateStatus({ orderId, status }, {
      onSuccess: () => {
        refetch();
      }
    });
  };

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
            <TableHead>Payment Status</TableHead>
            <TableHead>Order Status</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Update Order Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order._id}</TableCell>
              <TableCell>{order.shipping_address.full_name}</TableCell>
              <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <Badge variant={order.payment.status === "Pending" ? "warning" : "success"}>
                  {order.payment.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={order.status === "Pending" ? "warning" : "success"}>
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>₹{order.amount.toFixed(2)}</TableCell>
              <TableCell>
                <Select onValueChange={(status) => handleStatusChange(order._id, status)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Update" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
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
