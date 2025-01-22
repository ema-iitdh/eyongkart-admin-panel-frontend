"use client";
"use client";

import { useParams, useNavigate, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Tag,
  Layers,
  Hash,
  Calendar,
  Package,
  Edit,
  Trash,
  Trash2,
} from "lucide-react";
import {
  useGetAllCategories,
  useDeleteCategory,
} from "@/features/categories/hooks/useCategory";
import { Loader } from "@/components/common/loader";
import { ROUTES } from "@/constants/routes";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { useDeleteSubCategory } from "@/features/subcategories/hooks/useSubcategory";

export function CategoryDetail() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const {
    data: categories = [],
    isLoading,
    error,
    refetch,
  } = useGetAllCategories();
  const { mutateAsync: deleteCategory } = useDeleteCategory();
  const { mutateAsync: deleteSubCategory } = useDeleteSubCategory();

  useEffect(() => {
    refetch();
  }, [categoryId, refetch]);

  const navigateToAddSubCategory = () => {
    navigate(ROUTES.ADD_SUBCATEGORY.replace(":categoryId", categoryId));
  };

  const handleDeleteCategory = async () => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const response = await deleteCategory(categoryId);
        if (response.success) {
          toast({
            title: "Success",
            description: "Category deleted successfully",
          });
          navigate(ROUTES.ALLCATEGORIES);
        } else {
          toast({
            title: "Error",
            description: response?.message || "Failed to delete category",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Failed to delete category:", error);
        toast({
          title: "Error",
          description: "An error occurred while deleting the category",
          variant: "destructive",
        });
      }
    }
  };

  const handleDeleteSubCategory = async (subCategoryId) => {
    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      try {
        const response = await deleteSubCategory(subCategoryId);
        if (response.success) {
          toast({
            title: "Success",
            description: "Subcategory deleted successfully",
          });
          refetch();
        } else {
          toast({
            title: "Error",
            description: response?.message || "Failed to delete subcategory",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Failed to delete subcategory:", error);
        toast({
          title: "Error",
          description: "An error occurred while deleting the subcategory",
          variant: "destructive",
        });
      }
    }
  };

  if (isLoading) return <Loader />;
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-destructive">
        Error loading category: {error.message}
      </div>
    );

  const category = categories.find((category) => category._id === categoryId);

  if (!category)
    return (
      <div className="flex justify-center items-center h-screen">
        Category not found
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-2 space-y-8">
      <div className="flex justify-between items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-8 h-8" />{" "}
          <span className="text-lg">Back to Categories</span>
        </Button>
        <div className="flex gap-2 items-center">
          <Link
            to={`/dashboard/categories/${categoryId}/edit`}
            className={
              buttonVariants({ variant: "default" }) +
              " flex items-center gap-2"
            }
          >
            <Edit className="w-4 h-4" /> Edit Category
          </Link>
          <Button
            variant="destructive"
            onClick={handleDeleteCategory}
            className="flex items-center gap-2"
          >
            <Trash className="w-4 h-4" /> Delete Category
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="drop-shadow-2xl shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-4">
              <Tag className="w-6 h-6" />
              {category.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Description</span>
              <span className="font-medium">{category.description}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Category ID</span>
              <span className="font-medium">{category._id}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Gender</span>
              <Badge variant="secondary">{category.gender}</Badge>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Products Count</span>
              <Badge variant="outline" className="flex items-center gap-1">
                <Package className="w-3 h-3" />
                {category.productsCount}
              </Badge>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">For Kids</span>
              <Badge
                variant={category.isProductForKids ? "default" : "secondary"}
              >
                {category.isProductForKids ? "Yes" : "No"}
              </Badge>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Status</span>
              <Badge variant={category.isActive ? "success" : "destructive"}>
                {category.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <span>
                  Created: {new Date(category.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <span>
                  Updated: {new Date(category.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subcategories Card */}
        <Card className="drop-shadow-2xl shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Layers className="w-6 h-6" />
              Subcategories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {category.subCategories.map((subCategory) => (
                <div key={subCategory._id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">
                      {subCategory.subCategoryName}
                    </span>
                    <div className="flex items-center gap-2">
                      <Link
                        to={ROUTES.EDIT_SUBCATEGORY.replace(
                          ":categoryId",
                          category._id
                        ).replace(":subCategoryId", subCategory._id)}
                        className={
                          buttonVariants({ variant: "link" }) +
                          "flex items-center gap-2"
                        }
                      >
                        <Edit className="w-2 h-2" />
                        Edit
                      </Link>
                      <Trash2
                        className="w-4 h-4 cursor-pointer text-destructive"
                        onClick={() => handleDeleteSubCategory(subCategory._id)}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Hash className="w-4 h-4" />
                    {subCategory.keywords.join(", ")}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>ID: {subCategory._id}</span>
                    <Badge
                      variant={subCategory.isActive ? "success" : "destructive"}
                    >
                      {subCategory.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    Created:{" "}
                    {new Date(subCategory.createdAt).toLocaleDateString()}
                  </div>
                  <Separator />
                </div>
              ))}
              <Button onClick={navigateToAddSubCategory}>
                Add Subcategory
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default CategoryDetail;
