import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ROUTES } from "@/constants/routes";
import { ArrowLeft, X } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import {
  useGetSubcategoryByCategoryId,
  useUpdateSubCategory,
} from "@/features/subcategories/hooks/useSubcategory";

const subCategorySchema = z.object({
  name: z
    .string()
    .min(1, "Subcategory name is required")
    .max(50, "Cannot exceed 50 characters"),
  description: z.string().max(200, "Cannot exceed 200 characters").optional(),
  isActive: z.boolean().default(true),
  displayOrder: z.number().default(0).optional(),
  slug: z.string(),
  metaTitle: z
    .string()
    .max(60, "Meta title cannot exceed 60 characters")
    .optional(),
  metaDescription: z
    .string()
    .max(160, "Meta description cannot exceed 160 characters")
    .optional(),
  keywords: z.array(z.string()).optional(),
});

export function EditSubCategory() {
  const { categoryId, subCategoryId } = useParams();
  const navigate = useNavigate();
  const { data: subCategories = [] } =
    useGetSubcategoryByCategoryId(categoryId);
  const { mutate: updateSubCategory } = useUpdateSubCategory();

  const subCategory = subCategories.find((sub) => sub._id === subCategoryId);

  const form = useForm({
    resolver: zodResolver(subCategorySchema),
    defaultValues: subCategory || {
      name: "",
      description: "",
      isActive: true,
      displayOrder: 0,
      slug: "",
      metaTitle: "",
      metaDescription: "",
      keywords: [],
    },
  });

  useEffect(() => {
    if (subCategory) {
      form.reset(subCategory);
    }
  }, [subCategory, form]);

  const handleUpdateSubCategory = async (data) => {
    try {
      await updateSubCategory({ ...data, subCategoryId });
      toast({
        title: "Success",
        description: "Subcategory updated successfully",
      });
      navigate(ROUTES.SPECIFICCATEGORY.replace(":categoryId", categoryId));
    } catch (error) {
      console.error("Error updating subcategory:", error);
      toast({
        title: "Error",
        description: "Failed to update subcategory",
        variant: "destructive",
      });
    }
  };

  const subCategoriesData = form.watch("keywords");
  const [newKeyword, setNewKeyword] = useState("");

  const addKeyword = () => {
    form.setValue("keywords", [...subCategoriesData, newKeyword]);
    setNewKeyword("");
  };

  const removeKeyword = (index) => {
    form.setValue(
      "keywords",
      subCategoriesData.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="container mx-auto px-4 py-2 space-y-8">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6"
      >
        <ArrowLeft className="w-8 h-8" />{" "}
        <span className="text-lg">Back to Category Details</span>
      </Button>
      <Card className="drop-shadow-2xl shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Edit Subcategory</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleUpdateSubCategory)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Subcategory Name
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter subcategory name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter description"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Slug<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter slug" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="metaTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter meta title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="metaDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter meta description"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="keywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Keywords</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-2">
                          {field.value.map((keyword, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-1 bg-gray-200 px-2 py-1 rounded-md"
                            >
                              <span>{keyword}</span>
                              <X
                                className="cursor-pointer"
                                size={16}
                                onClick={() => removeKeyword(index)}
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex space-x-2 mt-2">
                          <Input
                            placeholder="Enter keyword"
                            value={newKeyword}
                            onChange={(e) => setNewKeyword(e.target.value)}
                          />
                          <Button size="sm" type="button" onClick={addKeyword}>
                            Add
                          </Button>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base font-medium">
                        Active Status
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="displayOrder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Order</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter display order"
                        value={field.value}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value, 10))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                <Button variant="destructive" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-black text-white hover:bg-gray-800"
                >
                  Update Subcategory
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default EditSubCategory;
