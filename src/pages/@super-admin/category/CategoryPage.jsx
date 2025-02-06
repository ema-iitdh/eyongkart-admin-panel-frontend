import  BatchDeleteButton from "@/components/common/BatchDeleteButton";
import DataTable from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { Loader, Plus } from "lucide-react";
import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useGetAllCategories } from "@/features/categories/hooks/useCategory";
import { categoryColumns } from "./columns/category-columns";

const CategoryPage = () => {
    const { data: categories = [], isLoading, isError } = useGetAllCategories();
    const [selectedCategories, setSelectedCategories] = useState([]);
    console.log(categories)

    const handleDeleteCategories= useCallback((selectedCategories) => {
        setSelectedCategories(selectedCategories);
        console.log('Selected categories: ', selectedCategories);
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
            <div className="text-center text-red-500">Error fetching categories</div>
        );
    };

    return (
        <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold">Categories Management</h1>
                <div className="flex gap-2">
                    <BatchDeleteButton 
                        selectedRows={selectedCategories}
                        handleBatchDelete={handleDeleteCategories}
                    />
                    <Link to={ROUTES.CATEGORIES.getCreateLink()}>
                        <Button>
                            <Plus className="h-4 w-4 mr-2"/>
                            Create New Category
                        </Button>
                    </Link>
                </div>
            </div>
            <DataTable 
                data={categories}
                columns={categoryColumns}
                enableSelection={true}
                onSelectionChange={handleDeleteCategories}
            />
        </div>
    );
};

export default CategoryPage;