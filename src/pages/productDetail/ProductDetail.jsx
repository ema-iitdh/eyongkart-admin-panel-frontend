import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useProductById } from "@/features/products/hooks/useProducts";
import { CloudinaryConfig } from "../../../Cloudinary";
import { Loader } from "@/components/common/loader";

export function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading, error } = useProductById(productId);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? (product?.image_id?.length ?? 1) - 1 : prevIndex - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === (product?.image_id?.length ?? 1) - 1 ? 0 : prevIndex + 1));
  };

  if (isLoading) return <Loader />;
  if (error) return <div className="flex justify-center items-center h-screen text-red-600">Error loading product: {error.message}</div>;
  if (!product) return <div className="flex justify-center items-center h-screen text-gray-500">Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 hover:bg-muted/40 transition-all"
      >
        <ArrowLeft className="w-4 h-4" /> <span className="text-lg">Back to Products</span>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <Card className="space-y-8 shadow-xl drop-shadow-xl p-5">
          <div className="relative aspect-square overflow-hidden rounded-xl shadow-lg">
            {product.image_id && product.image_id.length > 0 ? (
              <>
                <img
                  src={`${CloudinaryConfig.CLOUDINARY_URL}/image/upload/${product.image_id[currentImageIndex]}`}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 flex items-center justify-between p-4">
                  <Button variant="outline" size="icon" onClick={handlePrevImage} className="rounded-full bg-white/80 hover:bg-white">
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Previous image</span>
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleNextImage} className="rounded-full bg-white/80 hover:bg-white">
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Next image</span>
                  </Button>
                </div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {product.image_id.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        currentImageIndex === index ? 'bg-white' : 'bg-white/50'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-100 text-gray-400">
                No image available
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-lg text-gray-600">{product.description}</p>
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-gray-900">₹{product.price.toFixed(2)}</span>
              {product.discount > 0 && (
                <Badge variant="destructive" className="text-sm">
                  {product.discount.toFixed(0)}% Off
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>Size: {product.sizelength} x {product.sizewidth}</span>
              <span>•</span>
              <span>Gender: {product.gender}</span>
            </div>
          </div>
        </Card>

        <Card className="shadow-lg drop-shadow-lg">
          <CardHeader className="bg-muted/50">
            <CardTitle className="text-2xl font-semibold">Product Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Product ID", value: product._id },
              { label: "Price", value: `₹${product.price.toFixed(2)}` },
              { label: "Available Quantity", value: product.productquantity },
              { label: "Material", value: product.specifications?.material },
              { label: "Care Instructions", value: product.specifications?.careInstructions },
              { label: "Age Group", value: product.ageGroup },
              { label: "Gender", value: product.gender },
              { label: "Status", value: product.status },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-500">{item.label}</span>
                  <span className="font-medium text-gray-900">{item.value || "N/A"}</span>
                </div>
                {index < 7 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ProductDetail;

