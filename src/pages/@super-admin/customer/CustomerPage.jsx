import  BatchDeleteButton from "@/components/common/BatchDeleteButton";
import DataTable from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { useGetAllCustomers } from "@/features/customer/hooks/useCustomer";
import { Loader, Plus } from "lucide-react";
import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { customerColumns } from "./columns/customer-columns";

const CustomerPage = () => {
    const { data: customers = [], isLoading, isError } = useGetAllCustomers();
    const [selectedCustomers, setSelectedCustomers] = useState([]);

    const handleDeleteCustomers = useCallback((selectedCustomers) => {
        setSelectedCustomers(selectedCustomers);
        console.log('Selected customers: ', selectedCustomers);
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader className="animate-spin h-8 w-8" />
            </div>
        )
    }

    if (isError) {
        return (
            <div className="text-center text-red-500">Error fetching customers</div>
        );
    };

    return (
        <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold">Customer Management</h1>
                <div className="flex gap-2">
                    <BatchDeleteButton 
                        selectedRows={selectedCustomers}
                        handleBatchDelete={handleDeleteCustomers}
                    />
                    <Link to={ROUTES.CUSTOMERS.getCreateLink()}>
                        <Button>
                            <Plus className="h-4 w-4 mr-2"/>
                            Create New Customer
                        </Button>
                    </Link>
                </div>
            </div>
            <DataTable 
                data={customers}
                columns={customerColumns}
                enableSelection={true}
                onSelectionChange={handleDeleteCustomers}
            />
        </div>
    );
};

export default CustomerPage;