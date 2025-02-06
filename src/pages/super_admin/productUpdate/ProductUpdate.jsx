import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";
import { formSchema } from "@/constants";
import { useProductById } from "@/features/products/hooks/useProducts";
import { Specifications } from "../../@super-admin/products/_components/specifications";
import { TargetAudience } from "../../@super-admin/products/_components/target-audience";
import { StatusVisibility } from "../../@super-admin/products/_components/status-visibility";
import { SEO } from "../../@super-admin/products/_components/seo";
import { Categorization } from "../../@super-admin/products/_components/categorization";
import { BasicDetails } from "../../@super-admin/products/_components/basic-details";
import { EditBasicDetails } from "./_components/edit-basic-details";
import { EditCategorization } from "./_components/edit-categorization";
import { EditSpecifications } from "./_components/edit-specifications";
import { EditTargetAudience } from "./_components/edit-target-audience";
import { EditStatusVisibility } from "./_components/edit-status-visibility";
import { EditSEO } from "./_components/edit-seo";

export function ProductUpdate() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [files, setFiles] = useState({});
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useProductById(productId);
  console.log("here", product);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      shortDescription: "",
      category: "",
      subcategory: "",
      shop: "",
      artisan: "",
      specifications: {
        material: "",
        weaveType: "",
        craftTechnique: "",
        careInstructions: "",
        fabricCount: "",
        borderType: "",
        borderWidth: "",
        palluDetails: "",
        threadCount: 0,
        zariType: "",
      },
      gender: "Unisex",
      ageGroup: "Adult",
      status: "draft",
      isVisible: true,
      metaTitle: "",
      metaDescription: "",
      keywords: [],
      variants: [],
    },
  });

  useEffect(() => {
    if (product) {
      const baseImage = product.baseImage?.url || "";
      const variantsWithIds = product.variants.map((variant, index) => ({
        ...variant,
        id: index + 1,
        _id: variant._id,
      }));

      form.reset({
        ...product,
        category: product.category?._id,
        subcategory: product.subcategory?._id,
        shop: product.shop?._id,
        artisan: product.artisan?._id,
        specifications: product.specifications || {},
        variants: variantsWithIds,
      });

      setFiles((prev) => ({
        ...prev,
        baseImage: baseImage ? [baseImage] : [], //baseImageUrl
        variants: variantsWithIds.reduce(
          (acc, variant) => ({
            ...acc,
            [variant.id]: variant.images.map((img) => img.url), // 1 : [url1, url2]
          }),
          {}
        ),
      }));
    }
  }, [product]);

  const onDrop = (acceptedFiles, variantId) => {
    setFiles((prev) => ({
      ...prev,
      [variantId]: [...(prev[variantId] || []), ...acceptedFiles],
    }));
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      const payload = {
        ...data,
        variants: data.variants.map((variant) => ({
          ...variant,
          // Preserve existing _id for updates
          ...(variant._id && { _id: variant._id }),
        })),
      };

      formData.append("product", JSON.stringify(payload));

      // Handle image uploads
      if (files.baseImage) {
        formData.append("baseImage", files.baseImage[0]);
      }

      data.variants.forEach((variant) => {
        const variantFiles = files[`variant_${variant.id}`] || [];
        variantFiles.forEach((file) => {
          formData.append(`variant_${variant.id}`, file);
        });
      });

      await updateProduct(productId, formData);
      toast({ title: "Success", description: "Product updated successfully" });
      navigate("/products");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const ImageUploader = ({ variantId }) => {
    const { getRootProps, getInputProps } = useDropzone({
      accept: "image/*",
      onDrop: (acceptedFiles) => onDrop(acceptedFiles, variantId),
    });

    return (
      <div
        {...getRootProps()}
        className="border-2 border-dashed p-4 rounded-lg cursor-pointer"
      >
        <input {...getInputProps()} />
        <p>Drag & drop images here, or click to select</p>
        <div className="flex gap-2 mt-2">
          {files[variantId]?.map((file, index) => (
            <img
              key={index}
              src={typeof file === "string" ? file : URL.createObjectURL(file)}
              className="h-20 w-20 object-cover"
              alt="Preview"
            />
          ))}
        </div>
      </div>
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information Card */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <EditBasicDetails form={form} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Categorization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <EditCategorization form={form} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <EditSpecifications form={form} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Target Audience</CardTitle>
              </CardHeader>
              <CardContent>
                <EditTargetAudience form={form} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Visibility</CardTitle>
              </CardHeader>
              <CardContent>
                <EditStatusVisibility form={form} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>SEO</CardTitle>
              </CardHeader>
              <CardContent>
                <EditSEO form={form} />
              </CardContent>
            </Card>

            {/* Variants Section */}
            <Card>
              <CardHeader>
                <CardTitle>Product Variants</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {form.watch("variants").map((variant, index) => (
                  <div key={variant.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Variant {index + 1}</h3>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          const variants = form.getValues("variants");
                          variants.splice(index, 1);
                          form.setValue("variants", variants);
                        }}
                      >
                        Remove Variant
                      </Button>
                    </div>

                    {/* Variant Color */}
                    <FormField
                      control={form.control}
                      name={`variants.${index}.color.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Color Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Variant Images */}
                    <FormField
                      control={form.control}
                      name={`variants.${index}.images`}
                      render={() => (
                        <FormItem>
                          <FormLabel>Variant Images</FormLabel>
                          <ImageUploader variantId={`variant_${variant.id}`} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    form.setValue("variants", [
                      ...form.getValues("variants"),
                      {
                        id: form.getValues("variants").length + 1,
                        color: { name: "" },
                        price: { basePrice: 0, discount: 0 },
                        stock: { quantity: 0, status: "in_stock" },
                        isActive: true,
                        showInCarousel: false,
                      },
                    ]);
                  }}
                >
                  Add Variant
                </Button>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button type="submit">Update Product</Button>
            </div>
          </form>
        </Form>
      </div>
    </ScrollArea>
  );
}

export default ProductUpdate;
