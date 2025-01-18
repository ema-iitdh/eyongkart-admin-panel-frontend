import { useOrders } from "@/features/orders/hooks/useOrders";
import { useMemo } from "react";
import { BARCHART } from "./_components/BarChart";
import { PIECHART } from "./_components/PieChart";
import { Loader } from "@/components/common/loader";

export function Analytics() {
    const { data: orders = [], isLoading, error } = useOrders();
    
    const processedData = useMemo(() => {
        const salesOverTime = {};
        const paymentStatus = {};
        const paymentType = {};
        const deliveryStatus = {};
        const productSales = {};
        const productRevenue = {};

        orders.forEach(order => {
            const date = new Date(order.createdAt).toLocaleDateString();
            salesOverTime[date] = (salesOverTime[date] || 0) + 1;

            paymentStatus[order.payment.status] = (paymentStatus[order.payment.status] || 0) + 1;

            paymentType[order.payment_type] = (paymentType[order.payment_type] || 0) + order.amount;

            deliveryStatus[order.status] = (deliveryStatus[order.status] || 0) + 1;

            order.products.forEach(product => {
                productSales[product.name] = (productSales[product.name] || 0) + product.quantity;
                productRevenue[product.name] = (productRevenue[product.name] || 0) + (product.price * product.quantity);
            });
        });

        return {
            salesOverTime: Object.entries(salesOverTime).map(([date, amount]) => ({date, amount})),
            paymentStatus: Object.entries(paymentStatus).map(([status, count]) => ({status, count})),
            paymentType: Object.entries(paymentType).map(([type, amount]) => ({type, amount})),
            deliveryStatus: Object.entries(deliveryStatus).map(([status, count]) => ({status, count})),
            productSales: Object.entries(productSales).map(([name, quantity]) => ({name, quantity})),
            productRevenue: Object.entries(productRevenue).map(([name, amount]) => ({name, amount})),
        };
    }, [orders]);

    if (isLoading) return <Loader />
    if (error) return <div>Error: {error}</div>

    return (
        <div className="container mx-auto p-4 grid gap-4 md:grid-cols-2">
            <BARCHART data={processedData.salesOverTime} xDataKey="date" yDataKey="amount" title="Total Sales Over Time"/>
            <PIECHART data={processedData.paymentStatus} title="Payment Status" dataKey="count" nameKey="status"/>
            <BARCHART data={processedData.paymentType} xDataKey="type" yDataKey="amount" title="Amount by Payment Type"/>
            <PIECHART data={processedData.deliveryStatus} title="Delivery Status" dataKey="count" nameKey="status"/>
            <BARCHART data={processedData.productSales} title="Top Selling Products" xDataKey="name" yDataKey="quantity"/>
            <BARCHART data={processedData.productRevenue} title="Revenue by Product" xDataKey="name" yDataKey="amount"/>
        </div>
    )
}