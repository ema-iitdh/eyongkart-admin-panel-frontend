import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { PaymentStatus } from "@/constants";
import {useUpdatePaymnetStatus} from "@/features/orders/hooks/useOrders";
import { toast } from "@/hooks/use-toast";

const PaymentStatusSelect = ({ orderId, currentPaymentStatus }) => {
    const { mutate: updatePaymentStatus } = useUpdatePaymnetStatus();

    const handlePaymentStatusChange = (paymentStatus) => {
        if (!paymentStatus) return;
        updatePaymentStatus({ orderId, paymentStatus } , {
            onSuccess: () => {
                toast({
                    title: "Success",
                    description: "Payment status has been successfully updated",
                })
            }
        })
    };

    return (
        <Select onValueChange={handlePaymentStatusChange}>
            <SelectTrigger>
                <SelectValue placeholder={currentPaymentStatus}/>
            </SelectTrigger>
            <SelectContent>
                {Object.keys(PaymentStatus).map((paymentStatus) => (
                    <SelectItem key={paymentStatus} value={paymentStatus}>
                        {paymentStatus}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
};

export default PaymentStatusSelect;