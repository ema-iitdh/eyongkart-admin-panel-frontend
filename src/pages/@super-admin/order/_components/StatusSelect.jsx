import { Select, SelectValue, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { OrderStatus } from "@/constants";
import { useUpdateOrderStatus } from "@/features/orders/hooks/useOrders";
import { toast } from "@/hooks/use-toast";

const StatusSelect = ({ orderId, currentStatus }) => {
    const { mutate: updateStatus } = useUpdateOrderStatus();

    const handleStatusChange = (status) => {
        if (!status) return;
        updateStatus(
            {orderId, status},
            {
                onSuccess: () => {
                    toast({
                        title: "Success",
                        description: "Order status has been successfully updated."
                    })
                }
            }
        );
    };

    return (
        <Select onValueChange={handleStatusChange}>
            <SelectTrigger>
                <SelectValue placeholder={currentStatus} />
            </SelectTrigger>
            <SelectContent>
                {Object.keys(OrderStatus).map((status) => (
                    <SelectItem key={status} value={status}>
                        {status}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default StatusSelect;