import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import {
  useGetAllCategories,
  useUpdateCategory,
} from "@/features/categories/hooks/useCategory";
import { ROUTES } from "@/constants/routes";
import { toast } from "@/hooks/use-toast";

export function CategoryUpdate() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { data: categories = [], isLoading, error } = useGetAllCategories();
  const { mutateAsync: updateCategory } = useUpdateCategory();

  const category = categories.find((category) => category._id === categoryId);

  const [formData, setFormData] = useState({
    name: category?.name || "",
    displayOrder: category?.displayOrder || 1,
    isActive: category?.isActive || false,
    isProductForKids: category?.isProductForKids || false,
    gender: category?.gender || "Unisex",
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading category details...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-destructive">
        Error loading category: {error.message}
      </div>
    );
  if (!category)
    return (
      <div className="flex justify-center items-center h-screen">
        Category not found
      </div>
    );

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      gender: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateCategory({ categoryId, ...formData });
      if (response.success) {
        toast({
          title: "Success",
          description: "Category updated successfully",
        });
        navigate(ROUTES.CATEGORIES.getDetailsLink(categoryId));
      } else {
        toast({
          title: "Error",
          description: response?.message || "Failed to update category",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to update category:", error);
      toast({
        title: "Error",
        description: "An error occurred while updating the category",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6"
      >
        <ArrowLeft className="w-8 h-8" />{" "}
        <span className="text-lg">Back to Category Details</span>
      </Button>

      <Card className="max-w-2xl mx-auto shadow-2xl drop-shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">
            Edit Category: {category.name}
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="displayOrder">Display Order</Label>
              <Input
                id="displayOrder"
                name="displayOrder"
                type="number"
                value={formData.displayOrder}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={formData.gender}
                onValueChange={handleSelectChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Unisex">Unisex</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                name="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, isActive: checked }))
                }
              />
              <Label htmlFor="isActive">Active</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="isProductForKids"
                name="isProductForKids"
                checked={formData.isProductForKids}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({
                    ...prev,
                    isProductForKids: checked,
                  }))
                }
              />
              <Label htmlFor="isProductForKids">For Kids</Label>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={updateCategory.isLoading}
            >
              {updateCategory.isLoading ? (
                "Updating..."
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" /> Save Changes
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default CategoryUpdate;
