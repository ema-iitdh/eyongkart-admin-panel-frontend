import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CloudinaryConfig } from "../../../../Cloudinary";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import {
  useDeleteProduct,
  useProductById,
} from "@/features/products/hooks/useProducts";
import { ROUTES } from "@/constants/routes";
import useAuthenticationStore from "@/store/useAuthenticationStore";

export function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useProductById(productId);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [currentVariantImageIndex, setCurrentVariantImageIndex] = useState({});
  const { mutate: deleteProduct } = useDeleteProduct();
  const { user } = useAuthenticationStore();
  const userId = user?.id;
  const isOwner = product.shop?.owner === userId;

  const handleUpdate = () => {
    navigate(`/products/update/${productId}`);
  };

  const handleDelete = async () => {
    try {
      deleteProduct(productId);
      toast({
        title: "Product deleted",
        description: "The product has been successfully deleted.",
      });
      navigate(ROUTES.PRODUCT.LIST);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete the product. Please try again.",
        err,
        variant: "destructive",
      });
    }
    setShowDeleteDialog(false);
  };

  const nextImage = (variantId) => {
    setCurrentVariantImageIndex((prev) => {
      const currentIndex = prev[variantId] ?? 0; // Use 0 if undefined
      const totalImages = product.variants.find((v) => v._id === variantId)
        .images.length;

      return {
        ...prev,
        [variantId]: (currentIndex + 1) % totalImages,
      };
    });
  };

  const prevImage = (variantId) => {
    setCurrentVariantImageIndex((prev) => {
      const currentIndex = prev[variantId] ?? 0; // Use 0 if undefined
      const totalImages = product.variants.find((v) => v._id === variantId)
        .images.length;

      return {
        ...prev,
        [variantId]: (currentIndex - 1 + totalImages) % totalImages,
      };
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6"
      >
        <ArrowLeft className="w-8 h-8" />{" "}
        <span className="text-lg">Back to Products</span>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
          <CardDescription>{product.shortDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex justify-center items-center">
              <div className="w-80 h-80 relative overflow-hidden rounded-lg shadow-md">
                <img
                  src={`${CloudinaryConfig.CLOUDINARY_URL}/image/upload/c_fill,w_400,h_400,q_auto,f_auto/${product.baseImage.url}`}
                  alt={product.baseImage.altText}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Product Details</h3>
              <p>
                <strong>Description:</strong> {product.description}
              </p>
              <p>
                <strong>Category:</strong> {product.category.name}
              </p>
              <p>
                <strong>Subcategory:</strong> {product.subcategory.name}
              </p>
              <p>
                <strong>Gender:</strong> {product.gender}
              </p>
              <p>
                <strong>Age Group:</strong> {product.ageGroup}
              </p>
              <p>
                <strong>Status:</strong> <Badge>{product.status}</Badge>
              </p>
              <p>
                <strong>Visibility:</strong>{" "}
                {product.isVisible ? "Visible" : "Hidden"}
              </p>

              <Separator className="my-4" />

              <h3 className="text-lg font-semibold mb-2">Specifications</h3>
              <p>
                <strong>Material:</strong> {product.specifications.material}
              </p>

              <Separator className="my-4" />

              <h3 className="text-lg font-semibold mb-2">Shop Information</h3>
              <p>
                <strong>Shop Name:</strong> {product.shop.name}
              </p>
              <p>
                <strong>Contact Email:</strong> {product.shop.contactEmail}
              </p>
              <p>
                <strong>Contact Phone:</strong> {product.shop.contactPhone}
              </p>
            </div>
          </div>

          <Separator className="my-6" />

          <h3 className="text-xl font-semibold mb-4">Variants</h3>
          {product.variants.map((variant, index) => (
            <Card key={variant._id} className="mb-4">
              <CardHeader>
                <CardTitle>Variant {index + 1}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p>
                      <strong>Color:</strong> {variant.color.name} (
                      {variant.color.code})
                    </p>
                    <p>
                      <strong>Pattern:</strong> {variant.pattern.name}
                    </p>
                    <p>
                      <strong>Size:</strong> {variant.size.value}
                    </p>
                    <p>
                      <strong>Price:</strong> ${variant.price.basePrice}
                    </p>
                    <p>
                      <strong>Discount:</strong> {variant.price.discount}%
                    </p>
                    <p>
                      <strong>Stock:</strong> {variant.stock.quantity} (
                      {variant.stock.status})
                    </p>
                  </div>
                  <div className="flex justify-center items-center">
                    {variant.images && variant.images.length > 0 && (
                      <div className="w-64 h-64 relative overflow-hidden rounded-lg shadow-md">
                        <img
                          src={`${
                            CloudinaryConfig.CLOUDINARY_URL
                          }/image/upload/c_fill,w_300,h_300,q_auto,f_auto/${
                            variant.images[
                              currentVariantImageIndex[variant._id] ?? 0
                            ].url
                          }`}
                          alt={
                            variant.images[
                              currentVariantImageIndex[variant._id] ?? 0
                            ].altText
                          }
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        {variant.images.length > 1 && (
                          <>
                            <Button
                              variant="outline"
                              size="icon"
                              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                              onClick={() => prevImage(variant._id)}
                            >
                              <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                              onClick={() => nextImage(variant._id)}
                            >
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
        {isOwner && (<CardFooter className="flex justify-between">
          <Button onClick={handleUpdate}>Update Product</Button>
          <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <DialogTrigger asChild>
              <Button variant="destructive">Delete Product</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Are you sure you want to delete this product?
                </DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete the
                  product and all associated data.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteDialog(false)}
                >
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>)}
      </Card>
    </div>
  );
}

export default ProductDetail;
